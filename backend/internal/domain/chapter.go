package domain

import (
	"time"

	"github.com/google/uuid"
)

type ChapterStatus string

const (
	ChapterStatusRaw         ChapterStatus = "raw"
	ChapterStatusTranslating ChapterStatus = "translating"
	ChapterStatusDraft       ChapterStatus = "draft"
	ChapterStatusPublished   ChapterStatus = "published"
)

type TranslationStatus string

const (
	TranslationStatusDraft       TranslationStatus = "draft"
	TranslationStatusNeedsReview TranslationStatus = "needs_review"
	TranslationStatusPublished   TranslationStatus = "published"
)

type Chapter struct {
	ID        uuid.UUID     `json:"id"`
	NovelID   uuid.UUID     `json:"novelId"`
	Number    int           `json:"number"`
	Title     string        `json:"title,omitempty"`
	SourceKey string        `json:"sourceKey"`
	Status    ChapterStatus `json:"status"`
	CreatedAt time.Time     `json:"createdAt"`
}

type ChapterTranslation struct {
	ID          uuid.UUID         `json:"id"`
	ChapterID   uuid.UUID         `json:"chapterId"`
	Lang        string            `json:"lang"`
	ContentKey  string            `json:"contentKey,omitempty"`
	Status      TranslationStatus `json:"status"`
	JobID       *uuid.UUID        `json:"jobId,omitempty"`
	EditedBy    *uuid.UUID        `json:"editedBy,omitempty"`
	PublishedAt *time.Time        `json:"publishedAt,omitempty"`
	Version     int               `json:"version"`
}

type Comment struct {
	ID        uuid.UUID  `json:"id"`
	ChapterID uuid.UUID  `json:"chapterId"`
	UserID    uuid.UUID  `json:"userId"`
	ParentID  *uuid.UUID `json:"parentId,omitempty"`
	Body      string     `json:"body"`
	Hidden    bool       `json:"hidden"`
	CreatedAt time.Time  `json:"createdAt"`
}
