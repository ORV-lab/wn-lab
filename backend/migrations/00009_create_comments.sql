-- +goose Up
CREATE TABLE comments (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id   UUID REFERENCES chapters(id) ON DELETE CASCADE,
    user_id      UUID REFERENCES users(id),
    parent_id    UUID REFERENCES comments(id),
    body         TEXT NOT NULL,
    hidden       BOOLEAN NOT NULL DEFAULT FALSE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- +goose Down
DROP TABLE comments;
