package service

import (
	"go-chat-backend/model"
)

type UserService interface {
	GetAllUsers() []model.User
	GetUserById(userId int64) model.User
	CreateUser(user model.User) model.User
	Login(loginInfo model.LoginRequest) model.User
}

type UserServiceImpl struct {
	Repository model.UserRepository
}

func (s *UserServiceImpl) Login(loginInfo model.LoginRequest) model.User {
	user := s.Repository.Login(loginInfo)
	return user
}

func (s *UserServiceImpl) GetAllUsers() []model.User {
	return s.Repository.GetAllUsers()
}

func (s *UserServiceImpl) GetUserById(userId int64) model.User {
	return s.Repository.GetUserById(userId)
}

func (s *UserServiceImpl) CreateUser(user model.User) model.User {
	return s.Repository.CreateUser(user)
}
