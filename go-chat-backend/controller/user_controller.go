package controller

import (
	"github.com/gin-gonic/gin"
	"go-chat-backend/model"
	"go-chat-backend/service"
	"net/http"
	"strconv"
)

func Login(c *gin.Context) {
	var loginInfo model.LoginRequest

	if err := c.ShouldBind(&loginInfo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := service.Login(loginInfo)

	if user == (model.User{}) {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "login failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "login success", "result": user})
}

func GetAllUsers(c *gin.Context) {
	users := service.GetAllUsers()

	c.JSON(http.StatusOK, gin.H{"message": "get all users", "result": users})
}

func GetUserById(c *gin.Context) {
	userId := c.Param("userId")
	intVar, err := strconv.ParseInt(userId, 0, 8)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := service.GetUserById(intVar)
	c.JSON(http.StatusOK, gin.H{"message": "get user by id", "result": user})
}

func CreateUser(c *gin.Context) {
	var user model.User

	if err := c.ShouldBind(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userResult := service.CreateUser(user)

	c.JSON(http.StatusOK, gin.H{"message": "create user success", "result": userResult})
}
