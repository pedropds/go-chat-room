package model

import (
	"time"

	"gorm.io/gorm"
)

type MembershipRepository interface {
	JoinChatRoom(userId int64, chatRoomId int64) bool
	JoinChatRoomListTx(tx *gorm.DB, userId []int64, chatRoomId int64) bool
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

	return result.Error == nil
}

func (r *MembershipRepositoryImpl) JoinChatRoomListTx(tx *gorm.DB, userIds []int64, chatRoomId int64) bool {
	// Prepare a slice of Membership for batch insert
	memberships := make([]Membership, len(userIds))
	for i, userId := range userIds {
		memberships[i] = Membership{
			RoomId: chatRoomId,
			UserId: userId,
			JoinedAt: time.Now().Format(time.RFC3339),
		}
	}

	// Perform batch insert
	result := tx.Create(&memberships)

	return result.Error == nil
}
