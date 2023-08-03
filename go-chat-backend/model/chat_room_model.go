package model

type ChatRoom struct {
	RoomId    int64  `gorm:"primary_key" json:"roomId,omitempty"`
	RoomName  string `json:"roomName,omitempty"`
	CreatedAt string `json:"createdAt,omitempty"`
	CreatorId int64  `json:"creatorId,omitempty"`
}
