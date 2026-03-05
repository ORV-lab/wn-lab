-- +goose Up
CREATE TABLE chapters (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    novel_id     UUID REFERENCES novels(id) ON DELETE CASCADE,
    number       INTEGER NOT NULL,
    title        TEXT,
    source_key   TEXT NOT NULL,   -- S3 ключ к оригинальному тексту
    status       TEXT NOT NULL DEFAULT 'raw', -- raw|translating|draft|published
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(novel_id, number)
);

-- +goose Down
DROP TABLE chapters;
