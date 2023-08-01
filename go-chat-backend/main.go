package main

import (
	"go-chat-backend/model"
	"go-chat-backend/router"
)

func main() {
	db := model.Setup()
	routersInit := router.Init(db)

	routersInit.Run(":8080")
}
