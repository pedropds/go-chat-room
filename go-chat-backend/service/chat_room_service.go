package service

import "go-chat-backend/model"

type ChatRoomService interface {
	GetAllChatRoomsForUser(userId int64) []model.ChatRoom
}

type ChatRoomServiceImpl struct {
	Repository model.ChatRoomRepository
}

func (s *ChatRoomServiceImpl) GetAllChatRoomsForUser(userId int64) []model.ChatRoom {
	return s.Repository.GetAllChatRoomsForUser(userId)
}
