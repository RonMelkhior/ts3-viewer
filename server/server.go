package server

import (
	"context"
	"net/http"
	"time"
)

var server *http.Server

func Start() error {
	if err := newMelodyClient(); err != nil {
		return err
	}

	mux := http.NewServeMux()
	mux.Handle("/ws", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		melodyClient.HandleRequest(w, r)
	}))

	server = &http.Server{
		Handler:      mux,
		Addr:         "localhost:8080",
		ReadTimeout:  time.Second * 5,
		WriteTimeout: time.Second * 5,
	}

	go server.ListenAndServe()

	return nil
}

func Shutdown() {
	server.Shutdown(context.TODO())
	melodyClient.Close()
}
