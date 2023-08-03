package model

type Membership struct {
	MembershipId int64  `gorm:"primary_key" json:"membershipId,omitempty"`
	RoomId       int64  `json:"roomId,omitempty"`
	UserId       int64  `json:"userId,omitempty"`
	JoinedAt     string `json:"joinedAt,omitempty"`
}
