package appstats

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/signal"
	"runtime"
	"strings"
	"sync"
	"syscall"
	"time"

	"github.com/cagnosolutions/appstats/pkg/appstats/internal/static"
)

var defaultRoot = "/debug/appstats"

// HandleIndex returns an index appstats handler rooted at root. It's useful if
// you desire your server to responds with the appstats HTML page at a
func HandleIndex(root string) http.Handler {
	prefix := strings.TrimRight(root, "/") + "/"
	_, err := static.Assets.Open("index.html")
	if err != nil {
		log.Println(err)
	}
	// return handleStatic(prefix)
	return handleStaticDev(prefix)
}

// production static file handler
func handleStatic(prefix string) http.Handler {
	return http.StripPrefix(prefix, http.FileServer(http.FS(static.Assets)))
}

// development static file handler
func handleStaticDev(prefix string) http.Handler {
	staticPath := "pkg/appstats/internal/static/"
	return http.StripPrefix(prefix, http.FileServer(http.Dir(staticPath)))
}

func RegisterDefault() {
	Register(http.DefaultServeMux)
}

func Register(mux *http.ServeMux) {
	mux.Handle(defaultRoot+"/", HandleIndex(defaultRoot))
	mux.Handle(defaultRoot+"/stats", handleStats())
	mux.Handle(defaultRoot+"/api", handleAPI())
}

func Serve(addr string) {
	go func(addr string) {
		RegisterDefault()
		log.Panicln(http.ListenAndServe(addr, nil))
	}(addr)
	HandleSignalInterrupt("Visit [localhost%s%s] to view your appstats\n", addr, defaultRoot)
}

type stat struct {
	GoVersion    string           `json:"go_version"`
	NumGoroutine int              `json:"num_goroutine"`
	NumCPU       int              `json:"num_cpu"`
	CurrentTime  time.Time        `json:"current_time"`
	Memory       runtime.MemStats `json:"memory"`
	LastGC       time.Time        `json:"last_gc"`
}

var stats *stat

var statsPool = sync.Pool{
	New: func() interface{} {
		return &stat{
			GoVersion:    runtime.Version(),
			NumGoroutine: runtime.NumGoroutine(),
			NumCPU:       runtime.NumCPU(),
			CurrentTime:  time.Now(),
		}
	},
}

func getStats() *stat {
	return statsPool.Get().(*stat)
}

func putStats(s *stat) {
	statsPool.Put(s)
}

type buffer struct {
	dat *bytes.Buffer
	enc *json.Encoder
}

var buff *buffer

var buffPool = sync.Pool{
	New: func() interface{} {
		b := &buffer{
			dat: new(bytes.Buffer),
		}
		b.enc = json.NewEncoder(b.dat)
		return b
	},
}

func getBuffer() *buffer {
	return buffPool.Get().(*buffer)
}

func putBuffer(b *buffer) {
	b.dat.Reset()
	buffPool.Put(b)
}

func writeStats(w io.Writer) error {
	stats = getStats()
	defer putStats(stats)
	runtime.ReadMemStats(&stats.Memory)
	stats.LastGC = time.Unix(0, int64(stats.Memory.LastGC))
	buff = getBuffer()
	defer putBuffer(buff)
	err := buff.enc.Encode(stats)
	if err != nil {
		return err
	}
	_, err = buff.dat.WriteTo(w)
	if err != nil {
		return err
	}
	return nil
}

func handleStats() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("content-type", "application/json;utf=8")
		if err := writeStats(w); err != nil {
			code := http.StatusInternalServerError
			http.Error(w, http.StatusText(code), code)
			return
		}
	}
	return http.HandlerFunc(fn)
}

func handleAPI() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			w.Header().Set("content-type", "application/json;utf=8")
			if err := writeStats(w); err != nil {
				log.Printf("got get request, error writing stats")
				code := http.StatusInternalServerError
				http.Error(w, http.StatusText(code), code)
				return
			}
		}
		if r.Method == http.MethodPost {
			r.ParseForm()
			data, err := io.ReadAll(r.Body)
			if err != nil {
				log.Printf("got post request, error reading request body")
				code := http.StatusInternalServerError
				http.Error(w, http.StatusText(code), code)
				return
			}
			var mdata interface{}
			err = json.Unmarshal(data, &mdata)
			if err != nil {
				log.Printf("got post request, error unmarshaling data from request body")
				code := http.StatusInternalServerError
				http.Error(w, http.StatusText(code), code)
				return
			}
			w.Header().Set("content-type", "application/json;utf=8")
			b, err := json.Marshal(
				map[string]interface{}{
					"api": map[string]interface{}{
						"name":         "app stats",
						"version":      1.0,
						"current_time": time.Now(),
						"received":     mdata,
					},
				},
			)
			if err != nil {
				log.Printf("got post request, marshaling map")
				code := http.StatusInternalServerError
				http.Error(w, err.Error(), code)
				return
			}
			fmt.Fprintf(w, "%s", b)
			return
		}
	}
	return http.HandlerFunc(fn)
}

func HandleSignalInterrupt(msg string, args ...interface{}) {
	log.Printf(msg, args...)
	log.Println("Please press ctrl+c to exit.")
	c := make(chan os.Signal)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-c
		os.Exit(1)
	}()
}
