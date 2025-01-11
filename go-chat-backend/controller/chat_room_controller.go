package controller

import (
	"go-chat-backend/model"
	"go-chat-backend/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ChatRoomController interface {
	GetAllChatRoomsForUser(c *gin.Context)
	CreateChatRoom(c *gin.Context)
	JoinChatRoom(c *gin.Context)
	OpenChatRoomConnection(c *gin.Context)
}

type ChatRoomControllerImpl struct {
	ChatRoomService   service.ChatRoomService
	MembershipService service.MembershipService
	WebSocketService  service.WebSocketService
}

func (cnt *ChatRoomControllerImpl) GetAllChatRoomsForUser(c *gin.Context) {
	userId := c.Param("userId")

	intVar, err := strconv.ParseInt(userId, 0, 8)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	chatRooms := cnt.ChatRoomService.GetAllChatRoomsForUser(intVar)
	c.JSON(http.StatusOK, chatRooms)
}

func (cnt *ChatRoomControllerImpl) CreateChatRoom(c *gin.Context) {
	var chatRoomCreation model.ChatRoomCreation

	if err := c.ShouldBind(&chatRoomCreation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	createdChatRoom := cnt.ChatRoomService.CreateChatRoom(chatRoomCreation)
	c.JSON(http.StatusOK, createdChatRoom)
}

func (cnt *ChatRoomControllerImpl) JoinChatRoom(c *gin.Context) {
	var memberShipRequest model.Membership

	if err := c.ShouldBind(&memberShipRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	cnt.MembershipService.JoinChatRoom(memberShipRequest.UserId, memberShipRequest.RoomId)
}

func (cnt *ChatRoomControllerImpl) OpenChatRoomConnection(c *gin.Context) {
	chatRoomIdString := c.Param("chatRoomId")

	chatRoomId, err := strconv.ParseInt(chatRoomIdString, 0, 8)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	cnt.WebSocketService.OpenWebSocketConnection(c, chatRoomId)
}
