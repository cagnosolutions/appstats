package main

import (
	"log"
	"net/http"
	"runtime/debug"

	"github.com/cagnosolutions/appstats/pkg/appstats"
)

func main() {

	debug.SetMemoryLimit(16 << 20)

	// setup a server mux
	mux := http.NewServeMux()

	// register with the default serve mux
	appstats.Register(mux)

	hr := appstats.NewHotReloader("cmd/examples", 3)
	hr.Watch()

	// call listen and serve as you normally would
	log.Panicln(http.ListenAndServe(":9090", mux))
}
