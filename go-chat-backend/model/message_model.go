package model

import "time"

type Message struct {
	MessageId int        `gorm:"primary_key" json:"messageId,omitempty"`
	RoomId    int        `json:"roomId,omitempty"`
	UserId    int        `json:"userId,omitempty"`
	Content   string     `json:"content,omitempty"`
	CreatedAt *time.Time `json:"createdAt,omitempty"`
}

type MessageResponse struct {
	MessageId int        `json:"messageId,omitempty"`
	RoomId    int        `json:"roomId,omitempty"`
	UserId    int        `json:"userId,omitempty"`
	Username  string     `json:"username,omitempty"`
	Content   string     `json:"content,omitempty"`
	CreatedAt *time.Time `json:"createdAt,omitempty"`
}
