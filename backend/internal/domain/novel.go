package domain

import (
	"time"

	"github.com/google/uuid"
)

type NovelStatus string

const (
	StatusOngoing   NovelStatus = "ongoing"
	StatusCompleted NovelStatus = "completed"
	StatusHiatus    NovelStatus = "hiatus"
)

type Novel struct {
	ID           uuid.UUID   `json:"id"`
	Slug         string      `json:"slug"`
	Title        string      `json:"title"`
	Description  string      `json:"description,omitempty"`
	OriginalLang string      `json:"originalLang"`
	Status       NovelStatus `json:"status"`
	CoverURL     string      `json:"coverUrl,omitempty"`
	OwnerID      uuid.UUID   `json:"ownerId"`
	Rating       float64     `json:"rating"`
	CreatedAt    time.Time   `json:"createdAt"`
	UpdatedAt    time.Time   `json:"updatedAt"`
}

type Bookmark struct {
	UserID    uuid.UUID `json:"userId"`
	NovelID   uuid.UUID `json:"novelId"`
	ChapterID uuid.UUID `json:"chapterId"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type Subscription struct {
	UserID    uuid.UUID `json:"userId"`
	NovelID   uuid.UUID `json:"novelId"`
	CreatedAt time.Time `json:"createdAt"`
}
