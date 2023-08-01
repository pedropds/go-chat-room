package router

import (
	"github.com/gin-gonic/gin"
	"go-chat-backend/controller"
	"go-chat-backend/model"
	"go-chat-backend/service"
	"gorm.io/gorm"
)

func Init(db *gorm.DB) *gin.Engine {
	r := gin.Default()

	// create User Dependencies
	var userRepository model.UserRepository = &model.UserRepositoryImpl{Db: db}
	var userService service.UserService = &service.UserServiceImpl{Repository: userRepository}
	var userController controller.UserController = &controller.UserControllerImpl{Service: userService}

	//User endpoints
	r.GET("/user", userController.GetAllUsers)
	r.GET("/user/:userId", userController.GetUserById)
	r.POST("/user/login", userController.Login)
	r.POST("/user", userController.CreateUser)

	return r
}
