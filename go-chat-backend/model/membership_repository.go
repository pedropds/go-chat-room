package model

import "gorm.io/gorm"

type MembershipRepository interface {
	JoinChatRoom(userId int64, chatRoomId int64) bool
}

type MembershipRepositoryImpl struct {
	Db *gorm.DB
}

func (Membership) TableName() string {
	return "membership"
}

func (r *MembershipRepositoryImpl) JoinChatRoom(userId int64, chatRoomId int64) bool {
	membership := Membership{
		RoomId: chatRoomId,
		UserId: userId,
	}

	result := r.Db.Create(&membership)

	if result.Error != nil {
		return false
	}

	return true
}
