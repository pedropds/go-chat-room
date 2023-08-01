package router

import (
	"github.com/gin-gonic/gin"
	"go-chat-backend/controller"
)

func Init() *gin.Engine {
	r := gin.Default()

	//User endpoints
	r.GET("/user", controller.GetAllUsers)
	r.GET("/user/:userId", controller.GetUserById)
	r.POST("/user/login", controller.Login)
	r.POST("/user", controller.CreateUser)

	return r
}
