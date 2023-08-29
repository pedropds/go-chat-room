package controller

import (
	"github.com/gin-gonic/gin"
	"go-chat-backend/model"
	"go-chat-backend/service"
	"net/http"
	"strconv"
)

type UserController interface {
	GetAllUsers(c *gin.Context)
	GetUserById(c *gin.Context)
	CreateUser(c *gin.Context)
	Login(c *gin.Context)
}

type UserControllerImpl struct {
	Service service.UserService
}

func (cnt *UserControllerImpl) Login(c *gin.Context) {
	var loginInfo model.LoginRequest

	if err := c.ShouldBind(&loginInfo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := cnt.Service.Login(loginInfo)

	if user == (model.User{}) {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "login failed"})
		return
	}

	tokenString, _ := service.GenerateJWT(user)
	token := model.UserToken{Token: tokenString, Username: user.Username}

	c.JSON(http.StatusOK, token)
}

func (cnt *UserControllerImpl) GetAllUsers(c *gin.Context) {
	users := cnt.Service.GetAllUsers()

	c.JSON(http.StatusOK, users)
}

func (cnt *UserControllerImpl) GetUserById(c *gin.Context) {
	userId := c.Param("userId")
	intVar, err := strconv.ParseInt(userId, 0, 8)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := cnt.Service.GetUserById(intVar)
	c.JSON(http.StatusOK, user)
}

func (cnt *UserControllerImpl) CreateUser(c *gin.Context) {
	var user model.User

	if err := c.ShouldBind(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userResult := cnt.Service.CreateUser(user)

	c.JSON(http.StatusOK, userResult)
}
