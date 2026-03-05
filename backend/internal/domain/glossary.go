package domain

import (
	"time"

	"github.com/google/uuid"
)

type TermType string

const (
	TermTypeCharacter TermType = "character"
	TermTypePlace     TermType = "place"
	TermTypeSkill     TermType = "skill"
	TermTypeItem      TermType = "item"
	TermTypeOther     TermType = "other"
)

type Glossary struct {
	ID         uuid.UUID `json:"id"`
	NovelID    uuid.UUID `json:"novelId"`
	SourceTerm string    `json:"sourceTerm"`
	TargetTerm string    `json:"targetTerm"`
	TermType   TermType  `json:"termType"`
	Notes      string    `json:"notes,omitempty"`
	CreatedAt  time.Time `json:"createdAt"`
}
