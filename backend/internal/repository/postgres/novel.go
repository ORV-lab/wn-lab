package postgres

import (
	"context"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/wn-lab/core/internal/domain"
)

type NovelRepo struct {
	pool *pgxpool.Pool
}

func NewNovelRepo(pool *pgxpool.Pool) *NovelRepo {
	return &NovelRepo{pool: pool}
}

func (r *NovelRepo) Create(ctx context.Context, n *domain.Novel) error {
	query := `
		INSERT INTO novels (
			id, slug, title, description, original_lang, status, cover_url, owner_id, rating, created_at, updated_at
		) VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
		)
	`
	_, err := r.pool.Exec(ctx, query,
		n.ID,
		n.Slug,
		n.Title,
		n.Description,
		n.OriginalLang,
		n.Status,
		n.CoverURL,
		n.OwnerID,
		n.Rating,
		n.CreatedAt,
		n.UpdatedAt,
	)
	if err != nil {
		return fmt.Errorf("postgres.NovelRepo.Create: %w", err)
	}
	return nil
}

func (r *NovelRepo) GetBySlug(ctx context.Context, slug string) (*domain.Novel, error) {
	query := `
		SELECT 
			id, slug, title, description, original_lang, status, cover_url, owner_id, rating, created_at, updated_at
		FROM novels
		WHERE slug = $1
	`

	n := &domain.Novel{}
	var coverUrl *string
	var description *string

	err := r.pool.QueryRow(ctx, query, slug).Scan(
		&n.ID,
		&n.Slug,
		&n.Title,
		&description,
		&n.OriginalLang,
		&n.Status,
		&coverUrl,
		&n.OwnerID,
		&n.Rating,
		&n.CreatedAt,
		&n.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, domain.ErrNotFound
		}
		return nil, fmt.Errorf("postgres.NovelRepo.GetBySlug: %w", err)
	}

	if description != nil {
		n.Description = *description
	}
	if coverUrl != nil {
		n.CoverURL = *coverUrl
	}

	return n, nil
}
