package model

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

type ChatRoomRepository interface {
	GetAllChatRoomsForUser(userId int64) []ChatRoom
	CreateChatRoom(chatRoomCreation ChatRoomCreation) ChatRoom
}

type ChatRoomRepositoryImpl struct {
	Db *gorm.DB
	MembershipRepository MembershipRepository
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

func (r *ChatRoomRepositoryImpl) CreateChatRoom(chatRoomCreation ChatRoomCreation) ChatRoom {
	var returnChatRoom ChatRoom

	r.Db.Transaction(func(tx *gorm.DB) error {
		var chatRoom ChatRoom
		chatRoom.CreatorId = 1
		chatRoom.RoomName = chatRoomCreation.RoomName
		chatRoom.CreatedAt = time.Now().Format(time.RFC3339)

		chatroomCreatedResult, error := r.CreateChatRoomPrivate(tx, chatRoom)

		if(error != nil) {
			return error
		}

		result := r.MembershipRepository.JoinChatRoomListTx(tx, chatRoomCreation.Members, chatroomCreatedResult.RoomId)

		if(!result) {
			return errors.New("error adding members into chatRoom")
		}

		returnChatRoom = chatroomCreatedResult

		return nil
	})

	return returnChatRoom
}

func (r *ChatRoomRepositoryImpl) CreateChatRoomPrivate(tx *gorm.DB, chatRoom ChatRoom) (ChatRoom, error) {
	// Use tx instead of r.Db to ensure the operation is part of the transaction
	result := tx.Create(&chatRoom)

	if result.Error != nil {
		return ChatRoom{}, result.Error
	}
	return chatRoom, nil
}

