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

	SoundEnabled bool `json:"sound_enabled" ms:"client_output_hardware"`
	SoundMuted   bool `json:"sound_muted" ms:"client_output_muted"`

	MicEnabled bool `json:"mic_enabled" ms:"client_input_hardware"`
	MicMuted   bool `json:"mic_muted" ms:"client_input_muted"`
}

func ClientList(s *ts3Lib.ServerMethods) ([]Client, error) {
	var clients []Client
	if _, err := s.ExecCmd(ts3Lib.NewCmd("clientlist").WithOptions("-voice", "-away").WithResponse(&clients)); err != nil {
		return nil, err
	}

	return clients, nil
}
