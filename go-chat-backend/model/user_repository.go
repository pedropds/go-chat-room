package model

import "gorm.io/gorm"

type UserRepository interface {
	GetAllUsers() []User
	GetUserById(userId int64) User
	CreateUser(user User) User
	Login(loginInfo LoginRequest) User
}

type UserRepositoryImpl struct {
	Db *gorm.DB
}

func (User) TableName() string {
	return "appuser"
}

func (r *UserRepositoryImpl) GetAllUsers() []User {
	var users []User
	r.Db.Find(&users)
	return users
}

func (r *UserRepositoryImpl) GetUserById(userId int64) User {
	var user User
	r.Db.First(&user, userId)
	return user
}

func (r *UserRepositoryImpl) CreateUser(user User) User {
	r.Db.Create(&user)
	return user
}

func (r *UserRepositoryImpl) Login(loginInfo LoginRequest) User {
	var user User
	r.Db.Where("username = ? AND password = ?", loginInfo.Username, loginInfo.Password).First(&user)
	if user.UserId > 0 {
		return user
	}
	return User{}
}
