package service

import (
	"go-chat-backend/model"
)

type MessageService interface {
	GetAllMessagesForRoom(roomId int64) []model.MessageResponse
	CreateMessageWithUserId(message model.Message) model.MessageResponse
	CreateMessageWithUsername(message model.MessageResponse) model.MessageResponse
}

type MessageServiceImpl struct {
	Repository model.MessageRepository
}

func (s *MessageServiceImpl) GetAllMessagesForRoom(roomId int64) []model.MessageResponse {
	return s.Repository.GetAllMessagesForRoom(roomId)
}

func (s *MessageServiceImpl) CreateMessageWithUserId(message model.Message) model.MessageResponse {
	return s.Repository.CreateMessageWithUserId(message)
}

func (s *MessageServiceImpl) CreateMessageWithUsername(message model.MessageResponse) model.MessageResponse {
	return s.Repository.CreateMessageWithUsername(message)
}
