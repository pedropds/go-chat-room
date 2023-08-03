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

	// create Message Dependencies
	var messageRepository model.MessageRepository = &model.MessageRepositoryImpl{Db: db}
	var messageService service.MessageService = &service.MessageServiceImpl{Repository: messageRepository}
	var messageController controller.MessageController = &controller.MessageControllerImpl{Service: messageService}

	// create ChatRoom Dependencies
	var chatRoomRepository model.ChatRoomRepository = &model.ChatRoomRepositoryImpl{Db: db}
	var chatRoomService service.ChatRoomService = &service.ChatRoomServiceImpl{Repository: chatRoomRepository}
	var chatRoomController controller.ChatRoomController = &controller.ChatRoomControllerImpl{Service: chatRoomService}

	//User endpoints
	r.POST("/user/login", userController.Login)

	userGroup := r.Group("/user")
	userGroup.Use(Authenticate())
	{
		userGroup.GET("", userController.GetAllUsers)
		userGroup.GET("/:userId", userController.GetUserById)
		userGroup.POST("", userController.CreateUser)
	}

	//Message endpoints
	r.GET("/message/:roomId", messageController.GetAllMessagesForRoom)

	//ChatRoom endpoints
	r.GET("/chatroom/:userId", chatRoomController.GetAllChatRoomsForUser)

	return r
}
