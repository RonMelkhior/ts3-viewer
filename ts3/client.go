package ts3

import (
	ts3Lib "github.com/multiplay/go-ts3"
)

type Client struct {
	ID          int    `json:"id" ms:"id"`
	DatabaseID  int    `json:"database_id" ms:"client_database_id"`
	ChannelID   int    `json:"channel_id" ms:"cid"`
	Nickname    string `json:"nickname" ms:"client_nickname"`
	Type        int    `json:"type" ms:"client_type"`
	Away        bool   `json:"away" ms:"client_away"`
	AwayMessage string `json:"away_message" ms:"client_away_message"`
	TalkPower   int    `json:"talk_power" ms:"client_talk_power"`
}

func ClientList(s *ts3Lib.ServerMethods) ([]Client, error) {
	var clients []Client
	if _, err := s.ExecCmd(ts3Lib.NewCmd("clientlist").WithOptions("-voice").WithResponse(&clients)); err != nil {
		return nil, err
	}

	return clients, nil
}
