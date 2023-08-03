package model

import (
	"gorm.io/gorm"
)

type MessageRepository interface {
	GetAllMessagesForRoom(roomId int64) []MessageResponse
	CreateMessage(message Message) MessageResponse
}

type MessageRepositoryImpl struct {
	Db *gorm.DB
}

func (Message) TableName() string {
	return "message"
}

func (r *MessageRepositoryImpl) GetAllMessagesForRoom(roomId int64) []MessageResponse {
	var messages []MessageResponse

	r.Db.Table("message").
		Select("message.message_id, message.room_id, message.user_id, message.content, message.created_at, appuser.username").
		Joins("left join appuser on message.user_id = appuser.user_id").
		Where("room_id = ?", roomId).
		Find(&messages)

	return messages
}

func (r *MessageRepositoryImpl) CreateMessage(message Message) MessageResponse {
	// Create the message record in the database.
	r.Db.Create(&message)

	// Retrieve the corresponding MessageResponse from the database based on the created message's ID.
	var messageResponse MessageResponse
	r.Db.Table("message").
		Select("message.message_id, message.room_id, message.user_id, message.content, message.created_at, appuser.username").
		Joins("left join appuser on message.user_id = appuser.user_id").
		Where("message.message_id = ?", message.MessageId).
		First(&messageResponse)

	return messageResponse
}
