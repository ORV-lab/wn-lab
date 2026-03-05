package domain

import (
	"time"

	"github.com/google/uuid"
)

type JobStatus string

const (
	JobStatusPending     JobStatus = "pending"
	JobStatusProcessing  JobStatus = "processing"
	JobStatusDone        JobStatus = "done"
	JobStatusFailed      JobStatus = "failed"
	JobStatusNeedsReview JobStatus = "needs_review"
)

type TranslationJob struct {
	ID         uuid.UUID  `json:"id"`
	ChapterID  uuid.UUID  `json:"chapterId"`
	Provider   string     `json:"provider"`
	Status     JobStatus  `json:"status"`
	SourceLang string     `json:"sourceLang"`
	TargetLang string     `json:"targetLang"`
	CostTokens int        `json:"costTokens,omitempty"`
	ErrorMsg   string     `json:"errorMsg,omitempty"`
	CreatedAt  time.Time  `json:"createdAt"`
	FinishedAt *time.Time `json:"finishedAt,omitempty"`
}
