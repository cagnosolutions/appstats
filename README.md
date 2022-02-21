# appstats
Go web based application profiler

## Overview
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent libero turpis, aliquam quis consequat ac, volutpat 
et arcu. Nullam varius, ligula eu venenatis dignissim, lectus ligula ullamcorper odio, in rhoncus nisi nisl congue sem. 
In hac habitasse platea dictumst. Donec sem est, rutrum ut libero nec, placerat vehicula neque. Nulla mollis dictum 
nunc, ut viverra ex. Nam ac lacus at quam rhoncus finibus. Praesent efficitur, ante eget eleifend scelerisque, neque 
erat malesuada neque, vel euismod dui leo a nisl. Donec a eleifend dui. Maecenas nec leo odio. In maximus convallis 
ligula eget sodales. Nullam a mi hendrerit, finibus dolor eu, pellentesque ligula. Proin ultricies vitae neque sit amet 
tempus.
Sed a purus enim. Maecenas maximus placerat risus, at commodo libero consectetur sed. Nullam pulvinar lobortis augue in 
pulvinar. Aliquam erat volutpat. Vestibulum eget felis egestas, sollicitudin sem eu, venenatis metus. Nam ac eros vel 
sem suscipit facilisis in ut ligula. Nulla porta eros eu arcu efficitur molestie. Proin tristique eget quam quis 
ullamcorper.

Integer pretium tellus non sapien euismod, et ultrices leo placerat. Suspendisse potenti. Aenean pulvinar pretium diam, 
lobortis pretium sapien congue quis. Fusce tempor, diam id commodo maximus, mi turpis rhoncus orci, ut blandit ipsum 
turpis congue dolor. Aenean lobortis, turpis nec dignissim pulvinar, sem massa bibendum lorem, ut scelerisque nibh odio
sed odio. Sed sed nulla lectus. Donec vitae ipsum dolor. Donec eu gravida lectus. In tempor ultrices malesuada. Cras 
sodales in lacus et volutpat. Vivamus nibh ante, egestas vitae faucibus id, consectetur at augue. Pellentesque habitant 
morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque quis velit non quam convallis 
molestie sit amet sit amet metus.

Aenean eget sapien nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus nisi in nunc 
pellentesque imperdiet. Aliquam erat volutpat. Quisque bibendum tellus ac odio dictum vulputate. Sed imperdiet enim 
eget tortor vehicula, nec vehicula erat lacinia. Praesent et bibendum turpis. Mauris ac blandit nulla, ac dignissim 
quam. Ut ut est placerat quam suscipit sodales a quis lacus. Praesent hendrerit mattis diam et sodales. In a augue sit 
amet odio iaculis tempus sed a erat.

## Technical Notes
Donec quis nisi tellus. Nam hendrerit purus ligula, id bibendum metus pulvinar sed. Nulla eu neque lobortis, porta elit
quis, luctus purus. Vestibulum et ultrices nulla. Curabitur sagittis, sem sed elementum aliquam, dui mauris interdum
libero, ullamcorper convallis urna tortor ornare metus. Integer non nibh id diam accumsan tincidunt. Quisque sed felis
aliquet, luctus dolor vitae, porta nibh. Vestibulum ac est mollis, sodales erat et, pharetra nibh. Maecenas porta diam
in elit venenatis, sed bibendum orci feugiat. Suspendisse diam enim, dictum quis magna sed, aliquet porta turpis. Etiam
scelerisque aliquam neque, vel iaculis nibh laoreet ac. Sed placerat, arcu eu feugiat ullamcorper, massa justo aliquet
lorem, id imperdiet neque ipsum id diam. Vestibulum semper felis urna, sit amet volutpat est porttitor nec. Phasellus
lacinia volutpat orci, id eleifend ipsum semper non.

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
    - [Using pages](#using-pages)
    - [Using records](#using-records)
    - [Swapping pages](#swapping-pages)
    - [Types](#types)
        - [RecordID](#recordid)
        - [Page](#page)
        - [Page Manager](#page-manager)
        - [Page Buffer](#page-buffer)

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
The `*PageManager` is one of the main top-level objects in this package.
It is represented as a single file on your disk. To use the manager use
the `OpenPageManager(path)` method of the pager package.
```go
mgr, err := pager.OpenPageManager("path/data.db")
if err != nil {
    panic(err)
}
defer m.Close()
```