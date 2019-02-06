package ts3

import (
	ts3Lib "github.com/multiplay/go-ts3"
)

type Channel struct {
	ID                int    `json:"channel_id" ms:"cid"`
	ParentID          int    `json:"parent_id" ms:"pid"`
	ChannelName       string `json:"channel_name" ms:"channel_name"`
	DefaultChannel    bool   `json:"default_channel" ms:"channel_flag_default"`
	PasswordProtected bool   `json:"password_protected" ms:"channel_flag_password"`
	Permanent         bool   `json:"permanent" ms:"channel_flag_permanent"`
	SemiPermanent     bool   `json:"semi_permanent" ms:"channel_flag_semi_permanent"`

	Clients     []Client  `json:"clients,omitempty"`
	Subchannels []Channel `json:"sub_channels,omitempty"`
}

func ChannelList(s *ts3Lib.ServerMethods) ([]Channel, error) {
	var channels []Channel
	if _, err := s.ExecCmd(ts3Lib.NewCmd("channellist").WithOptions("-voice", "-flags").WithResponse(&channels)); err != nil {
		return nil, err
	}

	return channels, nil
}

func (ch Channel) GetSubchannels(channels []Channel) (result []Channel) {
	for _, channel := range channels {
		if channel.ParentID == ch.ID {
			result = append(result, channel)
		}
	}

	return result
}

func (ch Channel) GetClients(clients []Client) (result []Client) {
	for _, client := range clients {
		if client.ChannelID == ch.ID {
			result = append(result, client)
		}
	}

	return result
}
