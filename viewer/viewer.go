package viewer

import (
	"log"
	"net"
	"reflect"
	"time"

	"github.com/RonMelkhior/ts3-viewer/conn"
	"github.com/RonMelkhior/ts3-viewer/server"
	"github.com/RonMelkhior/ts3-viewer/ts3"
	ts3Lib "github.com/multiplay/go-ts3"
)

// TODO: do we need to pass the client parameter?
func buildViewerData(client *ts3Lib.Client) ([]ts3.Channel, error) {
	channels, err := ts3.ChannelList(client.Server)
	if err != nil {
		return nil, err
	}

	clients, err := ts3.ClientList(client.Server)
	if err != nil {
		return nil, err
	}

	return buildChannels(channels, clients, 0), nil
}

func buildChannels(channels []ts3.Channel, clients []ts3.Client, parentChannelID int) (result []ts3.Channel) {
	tmp := ts3.Channel{ID: parentChannelID}
	subChannels := tmp.GetSubchannels(channels)

	for _, sub := range subChannels {
		sub.Subchannels = buildChannels(channels, clients, sub.ID)
		sub.Clients = sub.GetClients(clients)
		result = append(result, sub)
	}

	return result
}

func checkView() {
	if !conn.IsConnected() {
		return
	}

	data, err := buildViewerData(conn.Get())
	if err != nil {
		if err == ts3Lib.ErrTimeout || err == ts3Lib.ErrNotConnected {
			conn.Timeout()
		} else if netErr, ok := err.(net.Error); ok && (netErr.Timeout() || !netErr.Temporary()) {
			conn.Timeout()
		}

		log.Println(err)
		return
	}

	if !reflect.DeepEqual(ts3.ViewerData, data) {
		ts3.ViewerData = data

		server.BroadcastViewerData()
	}
}

func RunViewerDataChecker() {
	for {
		checkView()
		time.Sleep(time.Second)
	}
}
