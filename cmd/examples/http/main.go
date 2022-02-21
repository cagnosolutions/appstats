package main

import (
	"log"
	"net/http"

	"github.com/cagnosolutions/appstats/pkg/appstats"
)

func main() {

	// register with the default serve mux
	appstats.RegisterAppStats()

	// call listen and serve as you normally would
	log.Panicln(http.ListenAndServe(":8181", nil))
}
