package controller

import (
	"github.com/gin-gonic/gin"
	"go-chat-backend/service"
	"net/http"
	"strconv"
)

type ChatRoomController interface {
	GetAllChatRoomsForUser(c *gin.Context)
}

type ChatRoomControllerImpl struct {
	Service service.ChatRoomService
}

func (cnt *ChatRoomControllerImpl) GetAllChatRoomsForUser(c *gin.Context) {
	userId := c.Param("userId")

	intVar, err := strconv.ParseInt(userId, 0, 8)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	chatRooms := cnt.Service.GetAllChatRoomsForUser(intVar)
	c.JSON(http.StatusOK, chatRooms)
}