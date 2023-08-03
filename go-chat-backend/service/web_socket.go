package service

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"go-chat-backend/model"
	"log"
	"net/http"
	"sync"
)

type WebSocketService interface {
	OpenWebSocketConnection(c *gin.Context, chatRoomId int64)
	reader(conn *websocket.Conn, chatRoomId int64)
	createWebSocket(c *gin.Context, chatRoomId int64) *websocket.Conn
	broadcastMessageToChatRoom(chatRoomId int64, payload []byte)
}

type WebSocketServiceImpl struct {
	Ms                     MessageService
	ChatRoomConnectionsMap sync.Map
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (wsImpl *WebSocketServiceImpl) OpenWebSocketConnection(c *gin.Context, chatRoomId int64) {
	wsValue := wsImpl.createWebSocket(c, chatRoomId)

	if wsValue == nil {
		return
	}

	wsImpl.reader(wsValue, chatRoomId)
}

func (wsImpl *WebSocketServiceImpl) reader(conn *websocket.Conn, chatRoomId int64) {
	for {
		_, p, err := conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}

		fmt.Println(string(p))

		message := &model.Message{}
		err = json.Unmarshal(p, message)
		if err != nil {
			log.Println(err)
			return
		}

		messageResponse := wsImpl.Ms.CreateMessage(*message)
		messageResponseBytes, errorMarshal := json.Marshal(messageResponse)
		if errorMarshal != nil {
			log.Println(errorMarshal)
			return
		}

		wsImpl.broadcastMessageToChatRoom(chatRoomId, messageResponseBytes)
	}
}

func (wsImpl *WebSocketServiceImpl) createWebSocket(c *gin.Context, chatRoomId int64) *websocket.Conn {
	w := c.Writer
	r := c.Request

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return nil
	}

	connList, _ := wsImpl.ChatRoomConnectionsMap.LoadOrStore(chatRoomId, []*websocket.Conn{})
	connList = append(connList.([]*websocket.Conn), ws)
	wsImpl.ChatRoomConnectionsMap.Store(chatRoomId, connList)

	return ws
}

func (wsImpl *WebSocketServiceImpl) broadcastMessageToChatRoom(chatRoomID int64, payload []byte) {
	connList, _ := wsImpl.ChatRoomConnectionsMap.Load(chatRoomID)
	for _, conn := range connList.([]*websocket.Conn) {
		if conn != nil {
			err := conn.WriteMessage(websocket.TextMessage, payload)
			if err != nil {
				log.Printf("Error broadcasting message to WebSocket: %v", err)
			}
		}
	}
}
