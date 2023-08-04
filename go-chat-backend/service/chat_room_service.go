package service

import "go-chat-backend/model"

type ChatRoomService interface {
	GetAllChatRoomsForUser(userId int64) []model.ChatRoom
	CreateChatRoom(chatRoom model.ChatRoom) model.ChatRoom
}

type ChatRoomServiceImpl struct {
	Repository model.ChatRoomRepository
}

func (s *ChatRoomServiceImpl) CreateChatRoom(chatRoom model.ChatRoom) model.ChatRoom {
	return s.Repository.CreateChatRoom(chatRoom)
}

func (s *ChatRoomServiceImpl) GetAllChatRoomsForUser(userId int64) []model.ChatRoom {
	return s.Repository.GetAllChatRoomsForUser(userId)
}
