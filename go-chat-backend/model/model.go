package model

import (
	"fmt"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
)

func Setup() *gorm.DB {
	print("Setting up database...\n")

	err := godotenv.Load(".env")
	if err != nil {
		panic("Failed to load env file! Error: " + err.Error())
	}

	postgresHost := os.Getenv("POSTGRES_HOST")
	postgresPort := os.Getenv("POSTGRES_PORT")
	postgresDB := os.Getenv("POSTGRES_DB")
	postgresUser := os.Getenv("POSTGRES_USER")
	postgresPassword := os.Getenv("POSTGRES_PASSWORD")
	postgresSSLMode := os.Getenv("POSTGRES_SSL_MODE")
	postgresTimezone := os.Getenv("POSTGRES_TIMEZONE")

	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s TimeZone=%s",
		postgresHost, postgresPort, postgresUser, postgresPassword, postgresDB, postgresSSLMode, postgresTimezone,
	)

	dbCon, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database! Error: " + err.Error())
	}

	print("Database connected!\n")

	return dbCon
}
