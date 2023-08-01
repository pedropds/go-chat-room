package model

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Setup() *gorm.DB {
	print("Setting up database...\n")

	var err error
	dsn := "host=localhost user=postgres password=secret dbname=go_chat_room port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	dbCon, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database! Error: " + err.Error())
	}

	print("Database connected!\n")

	return dbCon
}
