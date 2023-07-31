package model

import "time"

type User struct {
	UserId    int        `gorm:"primary_key" json:"userId,omitempty"`
	Username  string     `json:"username,omitempty"`
	Password  string     `json:"password,omitempty"`
	Email     string     `json:"email,omitempty"`
	CreatedAt *time.Time `json:"createdAt,omitempty"`
}

type LoginRequest struct {
	Username string `json:"username" form:"username" binding:"required"`
	Password string `json:"password" form:"password" binding:"required"`
}

type UserRequest struct {
	Username string `json:"username" form:"username" binding:"required"`
	Password string `json:"password" form:"password" binding:"required"`
	Email    string `json:"email" form:"email" binding:"required"`
}

func (User) TableName() string {
	return "appuser"
}

func GetAllUsers() []User {
	var users []User
	Db.Find(&users)
	return users
}

func GetUserById(userId int64) User {
	var user User
	Db.First(&user, userId)
	return user
}

func CreateUser(user User) User {
	Db.Create(&user)
	return user
}

func Login(loginInfo LoginRequest) User {
	var user User
	Db.Where("username = ? AND password = ?", loginInfo.Username, loginInfo.Password).First(&user)
	if user.UserId > 0 {
		return user
	}
	return User{}
}
