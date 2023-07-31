package service

import (
	"testProject/model"
)

func Login(loginInfo model.LoginRequest) model.User {
	user := model.Login(loginInfo)
	return user
}

func GetAllUsers() []model.User {
	return model.GetAllUsers()
}

func GetUserById(userId int64) model.User {
	return model.GetUserById(userId)
}

func CreateUser(user model.User) model.User {
	return model.CreateUser(user)
}
