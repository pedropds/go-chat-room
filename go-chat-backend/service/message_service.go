package service

import "go-chat-backend/model"

type MessageService interface {
	GetAllMessagesForRoom(roomId int64) []model.MessageResponse
}

type MessageServiceImpl struct {
	Repository model.MessageRepository
}

func (s *MessageServiceImpl) GetAllMessagesForRoom(roomId int64) []model.MessageResponse {
	return s.Repository.GetAllMessagesForRoom(roomId)
}
