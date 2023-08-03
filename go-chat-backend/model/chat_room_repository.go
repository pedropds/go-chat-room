package model

import (
	"gorm.io/gorm"
)

type ChatRoomRepository interface {
	GetAllChatRoomsForUser(userId int64) []ChatRoom
}

type ChatRoomRepositoryImpl struct {
	Db *gorm.DB
}

func (ChatRoom) TableName() string {
	return "chat_room"
}

func (r *ChatRoomRepositoryImpl) GetAllChatRoomsForUser(userId int64) []ChatRoom {
	var chatRooms []ChatRoom

	r.Db.Table("chat_room").
		Select("chat_room.room_id, chat_room.room_name, chat_room.created_at, chat_room.creator_id").
		Joins("inner join membership on chat_room.room_id = membership.room_id").
		Where("membership.user_id = ?", userId).
		Find(&chatRooms)

	return chatRooms
}
