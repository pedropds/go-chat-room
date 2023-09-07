package service

import (
	"encoding/json"
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
	closeWebSocket(conn *websocket.Conn, chatRoomId int64)
}

type WebSocketServiceImpl struct {
	MessageService         MessageService
	ChatRoomConnectionsMap sync.Map
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		//see if origin is allowed
		return true
	},
}

func (wsImpl *WebSocketServiceImpl) OpenWebSocketConnection(c *gin.Context, chatRoomId int64) {
	wsValue := wsImpl.createWebSocket(c, chatRoomId)

	if wsValue == nil {
		return
	}

	go wsImpl.reader(wsValue, chatRoomId)
}

func (wsImpl *WebSocketServiceImpl) reader(conn *websocket.Conn, chatRoomId int64) {
	defer func() {
		wsImpl.closeWebSocket(conn, chatRoomId)
	}()

	for {
		_, p, err := conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) && err.(*websocket.CloseError).Code != 1000 {
				log.Printf("error: %v", err)
			}
			break
		}

		message := &model.MessageResponse{}
		err = json.Unmarshal(p, message)
		if err != nil {
			log.Println(err)
			panic("Error unmarshalling message! Error: " + err.Error())
		}

		messageResponse := wsImpl.MessageService.CreateMessageWithUsername(*message)
		messageResponseBytes, errorMarshal := json.Marshal(messageResponse)
		if errorMarshal != nil {
			log.Println(errorMarshal)
			panic("Error marshalling message! Error: " + errorMarshal.Error())
		}

		wsImpl.broadcastMessageToChatRoom(chatRoomId, messageResponseBytes)
	}
}

func (wsImpl *WebSocketServiceImpl) createWebSocket(c *gin.Context, chatRoomId int64) *websocket.Conn {
	w := c.Writer
	r := c.Request

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
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
				log.Fatalf("Error broadcasting message to WebSocket: %v", err)
			}
		}
	}
}

func (wsImpl *WebSocketServiceImpl) closeWebSocket(conn *websocket.Conn, chatRoomId int64) {
	// After the reader function exits, close the WebSocket connection.
	conn.Close()

	// Remove the WebSocket connection from the map when it is closed.
	connectionsInterface, found := wsImpl.ChatRoomConnectionsMap.Load(chatRoomId)
	if !found {
		return // Chat room not found in the map.
	}

	connections, ok := connectionsInterface.([]*websocket.Conn)
	if !ok {
		return // Incorrect type stored in the map.
	}

	// Find and remove the WebSocket connection from the list.
	for i, existingConn := range connections {
		if existingConn == conn {
			connections = append(connections[:i], connections[i+1:]...)
			break
		}
	}

	// Update the map with the new list of connections.
	wsImpl.ChatRoomConnectionsMap.Store(chatRoomId, connections)
	connectionsSize := len(connections)

	log.Printf("One WebSocket connection for chat_room %d closed. %d connections remaining", chatRoomId, connectionsSize)
}
