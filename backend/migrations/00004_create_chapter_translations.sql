-- +goose Up
CREATE TABLE chapter_translations (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id   UUID REFERENCES chapters(id) ON DELETE CASCADE,
    lang         TEXT NOT NULL,   -- целевой язык: ru|en|...
    content_key  TEXT,            -- S3 ключ к переведённому тексту
    status       TEXT NOT NULL DEFAULT 'draft', -- draft|needs_review|published
    job_id       UUID,
    edited_by    UUID REFERENCES users(id),
    published_at TIMESTAMPTZ,
    version      INTEGER NOT NULL DEFAULT 1,
    UNIQUE(chapter_id, lang, version)
);

-- +goose Down
DROP TABLE chapter_translations;
