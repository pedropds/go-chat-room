package service

import "go-chat-backend/model"


type ChatRoomService interface {
	GetAllChatRoomsForUser(userId int64) []model.ChatRoom
	CreateChatRoom(chatRoomCreation model.ChatRoomCreation) model.ChatRoom
}

type ChatRoomServiceImpl struct {
	Repository model.ChatRoomRepository
}

func (s *ChatRoomServiceImpl) CreateChatRoom(chatRoomCreation model.ChatRoomCreation) model.ChatRoom {
	return s.Repository.CreateChatRoom(chatRoomCreation)
}

func (s *ChatRoomServiceImpl) GetAllChatRoomsForUser(userId int64) []model.ChatRoom {
	return s.Repository.GetAllChatRoomsForUser(userId)
}
