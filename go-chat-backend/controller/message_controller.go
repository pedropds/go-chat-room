package controller

import (
	"github.com/gin-gonic/gin"
	"go-chat-backend/service"
	"net/http"
	"strconv"
)

type MessageController interface {
	GetAllMessagesForRoom(c *gin.Context)
}

type MessageControllerImpl struct {
	Service service.MessageService
}

func (cnt *MessageControllerImpl) GetAllMessagesForRoom(c *gin.Context) {
	roomId := c.Param("roomId")

	intVar, err := strconv.ParseInt(roomId, 0, 8)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, cnt.Service.GetAllMessagesForRoom(intVar))
}
