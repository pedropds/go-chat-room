package service

import "go-chat-backend/model"

type MembershipService interface {
	JoinChatRoom(userId int64, chatRoomId int64) bool
}

type MembershipServiceImpl struct {
	Repository model.MembershipRepository
}

func (s *MembershipServiceImpl) JoinChatRoom(userId int64, chatRoomId int64) bool {
	return s.Repository.JoinChatRoom(userId, chatRoomId)
}
