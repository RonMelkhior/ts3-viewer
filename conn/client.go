package conn

import (
	"log"

	"github.com/RonMelkhior/ts3-viewer/env"
	ts3Lib "github.com/multiplay/go-ts3"
)

var client *ts3Lib.Client
var reqs = make(chan struct{})

func init() {
	if err := connect(); err != nil {
		log.Fatalln(err)
	}

	go runReconnectionChecker()
}

func connect() error {
	cl, err := ts3Lib.NewClient(env.Get("TEAMSPEAK_QUERY_ADDRESS", "localhost:10011"))
	if err != nil {
		return err
	}

	if err = cl.Use(env.GetInt("TEAMSPEAK_QUERY_SERVER_ID", 1)); err != nil {
		return err
	}

	client = cl

	return nil
}

func Timeout() {
	client = nil
	reqs <- struct{}{}
}

func Get() *ts3Lib.Client {
	return client
}

func Close() {
	if client != nil {
		client.Close()
	}
}

func IsConnected() bool {
	return client != nil
}
