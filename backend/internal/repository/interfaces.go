package repository

import (
	"context"

	"github.com/wn-lab/core/internal/domain"
)

type UserRepo interface {
}

type NovelRepo interface {
	Create(ctx context.Context, n *domain.Novel) error
	GetBySlug(ctx context.Context, slug string) (*domain.Novel, error)
}

type ChapterRepo interface {
}
