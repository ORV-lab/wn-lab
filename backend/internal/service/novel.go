package service

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/gosimple/slug"
	"github.com/wn-lab/core/internal/domain"
	"github.com/wn-lab/core/internal/repository"
)

type NovelService interface {
	Create(ctx context.Context, title, originalLang string, ownerID uuid.UUID) (*domain.Novel, error)
}

type novelService struct {
	repo repository.NovelRepo
}

func NewNovelService(repo repository.NovelRepo) NovelService {
	return &novelService{repo: repo}
}

func (s *novelService) Create(ctx context.Context, title, originalLang string, ownerID uuid.UUID) (*domain.Novel, error) {
	baseSlug := slug.Make(title)
	if baseSlug == "" {
		baseSlug = "novel"
	}

	finalSlug := baseSlug

	for {
		_, err := s.repo.GetBySlug(ctx, finalSlug)
		if err != nil {
			if errors.Is(err, domain.ErrNotFound) {
				break // slug is free
			}
			return nil, fmt.Errorf("service.NovelService.Create: check slug: %w", err)
		}

		// slug exists, append random suffix
		b := make([]byte, 3) // 6 hex characters
		_, _ = rand.Read(b)
		finalSlug = fmt.Sprintf("%s-%s", baseSlug, hex.EncodeToString(b))
	}

	n := &domain.Novel{
		ID:           uuid.New(),
		Slug:         finalSlug,
		Title:        title,
		OriginalLang: originalLang,
		Status:       domain.StatusOngoing,
		OwnerID:      ownerID,
		CreatedAt:    time.Now().UTC(),
		UpdatedAt:    time.Now().UTC(),
	}

	if err := s.repo.Create(ctx, n); err != nil {
		return nil, fmt.Errorf("service.NovelService.Create: %w", err)
	}

	return n, nil
}
