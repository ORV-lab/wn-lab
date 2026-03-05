-- +goose Up
CREATE TABLE translation_jobs (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id   UUID REFERENCES chapters(id),
    provider     TEXT NOT NULL,   -- claude|openai|gemini
    status       TEXT NOT NULL DEFAULT 'pending', -- pending|processing|done|failed|needs_review
    source_lang  TEXT NOT NULL,
    target_lang  TEXT NOT NULL,
    cost_tokens  INTEGER,
    error_msg    TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    finished_at  TIMESTAMPTZ
);

-- +goose Down
DROP TABLE translation_jobs;
