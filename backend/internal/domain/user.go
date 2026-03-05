package domain

import (
	"time"

	"github.com/google/uuid"
)

type Role string

const (
	RoleReader     Role = "reader"
	RoleTranslator Role = "translator"
	RoleAdmin      Role = "admin"
)

type User struct {
	ID           uuid.UUID `json:"id"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"`
	Username     string    `json:"username"`
	Role         Role      `json:"role"`
	CreatedAt    time.Time `json:"createdAt"`
}
