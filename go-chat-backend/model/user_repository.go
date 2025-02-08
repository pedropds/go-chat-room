package model

import (
	"gorm.io/gorm"
)

type UserRepository interface {
	GetAllUsers() []User
	GetUserById(userId int64) User
	CreateUser(user User) User
	Login(loginInfo LoginRequest) User
	GetFriendsForUser(userId int64) []User 
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
	r.Db.Where(&User{Username: loginInfo.Username, Password: loginInfo.Password}).First(&user)
	if user.UserId > 0 {
		return user
	}
	return User{}
}

func (r *UserRepositoryImpl) GetFriendsForUser(userId int64) []User {
	var friends []User

	query := `
		SELECT appuser.*
		FROM friendships
		JOIN appuser 
		ON (appuser.user_id = friendships.user1_id AND friendships.user2_id = ?)
		OR (appuser.user_id = friendships.user2_id AND friendships.user1_id = ?)
	`
	r.Db.Raw(query, userId, userId).Scan(&friends)

	return friends
}
