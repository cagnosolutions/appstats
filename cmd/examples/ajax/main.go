package main

import (
	"io"
	"log"
	"net/http"

	"github.com/cagnosolutions/appstats/pkg/appstats"
)

func main() {

	mux := http.NewServeMux()

	// handle post request
	mux.Handle("/root", handleRoot())
	mux.Handle("/example-post", handlePostReq())
	appstats.Register(mux)
	log.Panicln(http.ListenAndServe(":8080", mux))
}

func handleRoot() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		log.Println("got a request from a client")
		return
	}
	return http.HandlerFunc(fn)
}

func handlePostReq() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		// return error if not post
		if r.Method != http.MethodPost {
			code := http.StatusMethodNotAllowed
			http.Error(w, http.StatusText(code), code)
			return
		}
		// otherwise, read the contents of the body
		data, err := io.ReadAll(r.Body)
		if err != nil {
			code := http.StatusInternalServerError
			http.Error(w, err.Error(), code)
			return
		}
		// and do something with them
		log.Printf("got data from client: %q\n", data)
		return
	}
	return http.HandlerFunc(fn)
}
