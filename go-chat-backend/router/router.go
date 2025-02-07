package router

import (
	"go-chat-backend/controller"
	"go-chat-backend/model"
	"go-chat-backend/service"
	"sync"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Init(db *gorm.DB) *gin.Engine {
	r := gin.Default()
	r.Use(cors.Default())

	// create User Dependencies
	var userRepository model.UserRepository = &model.UserRepositoryImpl{Db: db}
	var userService service.UserService = &service.UserServiceImpl{Repository: userRepository}
	var userController controller.UserController = &controller.UserControllerImpl{Service: userService}

	// create Message Dependencies
	var messageRepository model.MessageRepository = &model.MessageRepositoryImpl{Db: db}
	var messageService service.MessageService = &service.MessageServiceImpl{Repository: messageRepository}
	var messageController controller.MessageController = &controller.MessageControllerImpl{Service: messageService}

	//create WebSocket Dependencies
	var webSocketService service.WebSocketService = &service.WebSocketServiceImpl{
		MessageService:         messageService,
		ChatRoomConnectionsMap: sync.Map{},
	}

	// create ChatRoom Dependencies
	var membershipRepository model.MembershipRepository = &model.MembershipRepositoryImpl{Db: db}
	var chatRoomRepository model.ChatRoomRepository = &model.ChatRoomRepositoryImpl{Db: db, MembershipRepository: membershipRepository}
	var chatRoomService service.ChatRoomService = &service.ChatRoomServiceImpl{Repository: chatRoomRepository}
	var membershipService service.MembershipService = &service.MembershipServiceImpl{Repository: membershipRepository}
	var chatRoomController controller.ChatRoomController = &controller.ChatRoomControllerImpl{
		ChatRoomService:   chatRoomService,
		MembershipService: membershipService,
		WebSocketService:  webSocketService,
	}

	//WebSocket endpoint
	r.GET("/chat-connect/:chatRoomId", chatRoomController.OpenChatRoomConnection)

	//User endpoints
	r.POST("/user/login", userController.Login)

	userGroup := r.Group("/user")
	userGroup.Use(Authenticate())
	{
		userGroup.GET("", userController.GetAllUsers)
		userGroup.GET("/:userId", userController.GetUserById)
		userGroup.POST("", userController.CreateUser)
		userGroup.GET("/friends/:userId", userController.GetFriendsForUser)
	}

	//Message endpoints
	r.GET("/message/:roomId", messageController.GetAllMessagesForRoom)

	//ChatRoom endpoints
	r.POST("/chatroom", chatRoomController.CreateChatRoom)
	r.GET("/chatroom/:userId", chatRoomController.GetAllChatRoomsForUser)
	r.POST("/chatroom/join", chatRoomController.JoinChatRoom)

	return r
}
