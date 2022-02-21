package appstats

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"runtime"
	"strconv"
	"strings"
	"time"

	"github.com/cagnosolutions/appstats/pkg/appstats/internal/static"
)

var defaultRoot = "/debug/appstats"

// Index responds to a request for /debug/appstats with the appstats HTML page
// which shows a live visualization of the statistics sent by the application.
var handleIndex = HandleIndex(defaultRoot)

var handleStats = HandleStats()

var handleDoWork = HandleDoWork()

var handleGC = HandleGC()

var lastMod time.Time

// HandleIndex returns an index appstats handler rooted at root. It's useful if
// you desire your server to responds with the appstats HTML page at a
func HandleIndex(root string) http.Handler {
	prefix := strings.TrimRight(root, "/") + "/"
	_, err := static.Assets.Open("index.html")
	if err != nil {
		log.Println(err)
	}
	// fi, err := fp.Stat()
	// if err != nil {
	// 	log.Println(err)
	// }
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

func RegisterAppStats() {
	Register(http.DefaultServeMux)
}

func Register(mux *http.ServeMux) {
	mux.Handle(defaultRoot+"/", handleIndex)
	mux.Handle(defaultRoot+"/stats", handleStats)
	mux.Handle(defaultRoot+"/do/work", handleDoWork)
	mux.Handle(defaultRoot+"/do/gc", handleGC)
}

type stats struct {
	GoVersion    string           `json:"go_version"`
	NumGoroutine int              `json:"num_goroutine"`
	NumCPU       int              `json:"num_cpu"`
	CurrentTime  time.Time        `json:"current_time"`
	Memory       runtime.MemStats `json:"memory"`
	LastGC       time.Time        `json:"last_gc"`
}

func writeStatsTicker(w io.Writer, frequency time.Duration) error {
	tick := time.NewTicker(frequency)
	defer tick.Stop()
	stats := stats{
		GoVersion: runtime.Version(),
	}
	for range tick.C {
		runtime.ReadMemStats(&stats.Memory)
		stats.NumGoroutine = runtime.NumGoroutine()
		stats.NumCPU = runtime.NumCPU()
		stats.CurrentTime = time.Now()
		statsData, err := json.Marshal(stats)
		if err != nil {
			return err
		}
		_, err = w.Write(statsData)
		if err != nil {
			return err
		}
	}
	panic("unreachable")
}

func HandleStatsTicker() http.
	Handler {
	frequency := time.Second * 5
	fn := func(w http.ResponseWriter, r *http.Request) {
		if err := writeStatsTicker(w, frequency); err != nil {
			code := http.StatusInternalServerError
			http.Error(w, http.StatusText(code), code)
			return
		}
	}
	return http.HandlerFunc(fn)
}

func writeStats(w io.Writer) error {
	stats := stats{
		GoVersion:    runtime.Version(),
		NumGoroutine: runtime.NumGoroutine(),
		NumCPU:       runtime.NumCPU(),
		CurrentTime:  time.Now(),
	}
	runtime.ReadMemStats(&stats.Memory)
	stats.LastGC = time.Unix(0, int64(stats.Memory.LastGC))
	statsData, err := json.Marshal(stats)
	if err != nil {
		return err
	}
	_, err = w.Write(statsData)
	if err != nil {
		return err
	}
	return nil
}

func HandleStats() http.Handler {
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

func HandleDoWork() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		v, err := url.ParseQuery(r.URL.RawQuery)
		if err != nil {
			code := http.StatusExpectationFailed
			http.Error(w, http.StatusText(code), code)
			return
		}
		count := v.Get("count")
		if count == "" {
			code := http.StatusExpectationFailed
			http.Error(w, "'id' was not found or was empty", code)
			return
		}
		n, err := strconv.Atoi(count)
		if err != nil {
			code := http.StatusExpectationFailed
			http.Error(w, "error converting id string to integer", code)
			return
		}
		go doWork(n)
		http.Redirect(w, r, defaultRoot+"/", http.StatusFound)
	}
	return http.HandlerFunc(fn)
}

func doWork(count int) {
	m := make(map[int]interface{})
	for i := 0; i < count; i++ {

		var obj interface{}
		switch i % 6 {
		case 0:
			obj = &struct {
				_ uint32
				_ uint16
			}{}
		case 1:
			obj = &struct {
				_ [3]uint64
			}{}
		case 2:
			obj = fmt.Sprintf("a relatively long and useless string %d", i)
		case 3:
			obj = make([]byte, i%1024)
		case 4:
			obj = make([]byte, 10*i%1024)
		case 5:
			obj = make([]string, 512)
		}

		if i == 1000 {
			m = make(map[int]interface{})
			i = 0
		}

		m[i] = obj
		time.Sleep(10 * time.Millisecond)
	}
	log.Printf("Worked with %d items. Done.\n", count)
}

func HandleGC() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		runtime.GC()
		http.Redirect(w, r, defaultRoot+"/", http.StatusFound)
	}
	return http.HandlerFunc(fn)
}
