package main

import (
	"fmt"
	"log"
	"time"

	"github.com/cagnosolutions/appstats/pkg/appstats"
)

func init() {
	// register and run
	appstats.Serve(":8080")
}

func main() {
	// simulate doing some work
	doWork()
}

func doWork() {
	count := 5
	log.Println("Doing some work...")
	for i := 0; i < count; i++ {
		time.Sleep(30 * time.Second)
		doWorkOnceEvery60Seconds()
		time.Sleep(30 * time.Second)
	}
	log.Println("Finished.")
}

func doWorkOnceEvery60Seconds() {
	count := 250
	m := make(map[string]string, 0)
	time.Sleep(1 * time.Millisecond)
	for i := 0; i < count; i++ {
		key := fmt.Sprintf("key-%.4d", i)
		val := fmt.Sprintf("val-%.8d", i)
		m[key] = val
		time.Sleep(64 * time.Millisecond)
	}
	time.Sleep(1 * time.Millisecond)
	for i := 0; i < count; i++ {
		if i%2 == 0 {
			key := fmt.Sprintf("key-%.4d", i)
			delete(m, key)
		}
	}
	time.Sleep(1 * time.Millisecond)
	for i := 0; i < count; i++ {
		if i%2 != 0 {
			key := fmt.Sprintf("key-%.4d", i)
			delete(m, key)
		}
	}
	time.Sleep(1 * time.Second)
}
