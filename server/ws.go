package server

import (
	"encoding/json"
	"log"

	"github.com/RonMelkhior/ts3-viewer/ts3"
	"github.com/olahol/melody"
)

var melodyClient *melody.Melody

func newMelodyClient() *melody.Melody {
	client := melody.New()
	client.HandleConnect(handleMelodyConnect)
}

// TODO: clean-up
func handleMelodyConnect(s *melody.Session) {
	enc, err := json.Marshal(ts3.ViewerData)
	if err != nil {
		log.Printf("error encoding viewer data: %+v\n", err)
		return
	}

	if err = s.Write(enc); err != nil {
		log.Printf("error writing viewer data: %+v\n", err)
		return
	}
}

func BroadcastViewerData() {
	enc, err := json.Marshal(ts3.ViewerData)
	if err != nil {
		log.Printf("error encoding viewer data: %+v\n", err)
		return
	}

	if err = melodyClient.Broadcast(enc); err != nil {
		log.Printf("error writing viewer data: %+v\n", err)
		return
	}
}
