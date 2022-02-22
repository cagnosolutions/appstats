package main

import (
	"log"
	"net/http"

	"github.com/cagnosolutions/appstats/pkg/appstats"
)

func main() {

	// setup a server mux
	mux := http.NewServeMux()

	// register with the default serve mux
	appstats.Register(mux)

	// call listen and serve as you normally would
	log.Panicln(http.ListenAndServe(":8080", mux))
}
