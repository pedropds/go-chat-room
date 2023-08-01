package main

import (
	"go-chat-backend/model"
	"go-chat-backend/router"
)

func main() {
	routersInit := router.Init()
	model.Setup()

	routersInit.Run(":8080")
}
