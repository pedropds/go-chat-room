package model

import (
	"gorm.io/gorm"
)

type MessageRepository interface {
	GetAllMessagesForRoom(roomId int64) []MessageResponse
	CreateMessageWithUserId(message Message) MessageResponse
	CreateMessageWithUsername(message MessageResponse) MessageResponse
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

func (r *MessageRepositoryImpl) CreateMessageWithUserId(message Message) MessageResponse {
	// Create the message record in the database.
	r.Db.Create(&message)

	// Retrieve the corresponding MessageResponse from the database based on the created message's ID.
	messageResponse := r.retrieveMessage(message)
	return messageResponse
}

func (r *MessageRepositoryImpl) CreateMessageWithUsername(message MessageResponse) MessageResponse {
	//get userId from User table
	var user User
	r.Db.Table("appuser").
		Select("user_id").
		Where("username = ?", message.Username).
		First(&user)

	var messageDb = Message{
		RoomId:  message.RoomId,
		UserId:  user.UserId,
		Content: message.Content,
	}

	// Create the message record in the database.
	r.Db.Create(&messageDb)

	// Retrieve the corresponding MessageResponse from the database based on the created message's ID.
	messageResponse := r.retrieveMessage(messageDb)
	return messageResponse
}

func (r *MessageRepositoryImpl) retrieveMessage(message Message) MessageResponse {
	var messageResponse MessageResponse
	r.Db.Table("message").
		Select("message.message_id, message.room_id, message.user_id, message.content, message.created_at, appuser.username").
		Joins("left join appuser on message.user_id = appuser.user_id").
		Where("message.message_id = ?", message.MessageId).
		First(&messageResponse)

	return messageResponse
}
