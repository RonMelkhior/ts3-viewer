package conn

import (
	"log"
	"time"
)

func runReconnectionChecker() {
	for _ = range reqs {
		if IsConnected() {
			continue
		}

		log.Println("attempting to reconnect...")
		if err := connect(); err != nil {
			log.Println(err)

			go func() {
				time.Sleep(time.Second * 2)
				Timeout()
			}()
		}
	}
}
