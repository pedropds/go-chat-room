package service

import (
	"github.com/golang-jwt/jwt"
	"go-chat-backend/model"
	"time"
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
	return s.Repository.Login(loginInfo)
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

func GenerateJWT(user model.User) (string, error) {
	key := []byte("secret") //TODO move to config and perhaps use another algorithm
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["exp"] = time.Now().Add(12 * time.Hour)
	claims["userId"] = user.UserId
	claims["username"] = user.Username
	claims["email"] = user.Email

	tokenString, err := token.SignedString(key)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
