package appstats

import (
	"fmt"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"time"
)

type HotReloader struct {
	path    string
	rate    int
	changed map[string]struct{}
}

func NewHotReloader(path string, rate int) *HotReloader {
	return &HotReloader{
		path:    path,
		rate:    rate,
		changed: make(map[string]struct{}),
	}
}

func (hr *HotReloader) Watch() {
	err := filepath.WalkDir(
		hr.path, func(path string, d fs.DirEntry, err error) error {
			if err != nil {
				return err
			}
			fmt.Printf("%+v\n", d)
			if !d.IsDir() {
				if hasChanged(d.Name(), int64(hr.rate)) {
					hr.changed[d.Name()] = struct{}{}
				} else {
					delete(hr.changed, d.Name())
				}
			}
			if err != nil {
				if err == fs.SkipDir {
					return fs.SkipDir
				}
				return err
			}
			return nil
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%d files changed, %+v\n", len(hr.changed), hr.changed)
	time.AfterFunc(time.Duration(hr.rate)*time.Second, func() { hr.Watch() })
}

func hasChanged(path string, n int64) bool {
	// gather file status
	fstat, err := os.Stat(path)
	// err check
	if err != nil {
		// if err; print timestamp and err, then panic
		log.Panic(err)
	}
	// no err; eval and return (true) file been modified within the last n seconds
	return fstat.ModTime().Unix() >= time.Now().Unix()-n
}
