package model

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
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

	// Apply migrations
	err = ApplyMigrations(dbCon)
	if err != nil {
		panic("Failed to apply migrations: " + err.Error())
	}

	print("Migrations applied successfully!\n")

	return dbCon
}

func ApplyMigrations(db *gorm.DB) error {
	// Get the migrations folder path
	migrationsDir := "migrations"

	// Read all the files in the migrations folder
	files, err := os.ReadDir(migrationsDir)
	if err != nil {
		return fmt.Errorf("could not read migrations folder: %v", err)
	}

	// Sort files by name (assuming they follow a naming convention like 001, 002, etc.)
	var sqlFiles []string
	for _, file := range files {
		if !file.IsDir() && strings.HasSuffix(file.Name(), ".sql") {
			sqlFiles = append(sqlFiles, file.Name())
		}
	}

	// Apply each migration in the correct order
	for _, fileName := range sqlFiles {
		filePath := filepath.Join(migrationsDir, fileName)

		// Read the contents of the SQL file
		sqlBytes, err := os.ReadFile(filePath)
		if err != nil {
			return fmt.Errorf("could not read SQL file %s: %v", fileName, err)
		}

		// Execute the SQL statement
		sqlStmt := string(sqlBytes)
		err = db.Exec(sqlStmt).Error
		if err != nil {
			return fmt.Errorf("failed to execute migration %s: %v", fileName, err)
		}

		print(fmt.Sprintf("Applied migration: %s\n", fileName))
	}

	return nil
}
