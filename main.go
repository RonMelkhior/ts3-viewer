package main

import (
	"os"
	"os/signal"
	"syscall"

	"github.com/RonMelkhior/ts3-viewer/conn"
	"github.com/RonMelkhior/ts3-viewer/server"
	"github.com/RonMelkhior/ts3-viewer/viewer"
)

// TODO: fix logging, make it more user-friendly.
// Setup flags for other init() functions.

func main() {
	go server.Start()

	go viewer.RunViewerDataChecker()

	sc := make(chan os.Signal, 1)
	signal.Notify(sc, syscall.SIGINT, syscall.SIGTERM, os.Interrupt, os.Kill)
	<-sc

	server.Shutdown()
	conn.Close()
}
