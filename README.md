## Overview
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent libero turpis, aliquam quis consequat ac, volutpat 
et arcu. Nullam varius, ligula eu venenatis dignissim, lectus ligula ullamcorper odio, in rhoncus nisi nisl congue sem. 
In hac habitasse platea dictumst. Donec sem est, rutrum ut libero nec, placerat vehicula neque. Nulla mollis dictum 
nunc, ut viverra ex. Nam ac lacus at quam rhoncus finibus. Praesent efficitur, ante eget eleifend scelerisque, neque 
erat malesuada neque, vel euismod dui leo a nisl. Donec a eleifend dui. Maecenas nec leo odio. In maximus convallis 
ligula eget sodales. Nullam a mi hendrerit, finibus dolor eu, pellentesque ligula. Proin ultricies vitae neque sit amet 
tempus.

## Technical Notes
Donec quis nisi tellus. Nam hendrerit purus ligula, id bibendum metus pulvinar sed. Nulla eu neque lobortis, porta elit
quis, luctus purus. Vestibulum et ultrices nulla. Curabitur sagittis, sem sed elementum aliquam, dui mauris interdum
libero, ullamcorper convallis urna tortor ornare metus.

## Requirements
Requires Go version 1.17.x or later, no external dependencies are required.

## Versioning
This package uses [semantic versioning](http://semver.org), so the API may
change between major releases but not for patches and minor releases.

## Table of Contents
- [Overview](#overview)
- [Technical Notes](#overview)
- [Requirements](#requirements)
- [Versioning](#versioning)
- [Getting Started](#getting-started)
    - [Installing](#installing)
    - [Importing](#importing)
    - [How To Use](#how-to-use)

## Getting Started

### Installing
First, make sure you meet the [requirements](#requirements), then simply
run `go get`:
```shell
$ go get github.com/cagnosolutions/appstats 
```

### Importing
To use the appstats package, import as:
```go
import "github.com/cagnosolutions/appstats"
```

### How To Use
If you are already using a http multiplexer simply call the `Register()` any time
before you call `http.ListenAndServe` and navigate to `/debug/appstats/` to start
visualizing your application profile. For example:
```go
func main() {
    // setup a new serve mux
    mux := http.NewServeMux()
    // add your handlers
    ...
    // register appstats with the muxer
    appstats.Register(mux)
    // then serve it up
    log.Panicln(http.ListenAndServe(":8080", mux))
}
```

If you with to use appstats, and you are not currently using a http server, no
problem. Simply call the `Serve()` method in your init or main function and go
about the rest of your program. The `Serve()` method will add a SIGINT handler
which requires you to use Ctrl+C to exit your program, so it will not exit early.
See the example below:
```go
func init() {
    // register and run
    appstats.Serve(":8080")
}

func main() {
    // simulate doing some work
    doWork()
	// use ctrl+c to exit main
}
```