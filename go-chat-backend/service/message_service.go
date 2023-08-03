package service

import (
	"go-chat-backend/model"
)

type MessageService interface {
	GetAllMessagesForRoom(roomId int64) []model.MessageResponse
	CreateMessage(message model.Message) model.Message
}

type MessageServiceImpl struct {
	Repository model.MessageRepository
}

func (s *MessageServiceImpl) GetAllMessagesForRoom(roomId int64) []model.MessageResponse {
	return s.Repository.GetAllMessagesForRoom(roomId)
}

func (s *MessageServiceImpl) CreateMessage(message model.Message) model.Message {
	return s.Repository.CreateMessage(message)
}
