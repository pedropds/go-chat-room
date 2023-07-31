package main

import (
	"testProject/model"
	"testProject/router"
)

func main() {
	routersInit := router.Init()
	model.Setup()

	routersInit.Run(":8080")
}
