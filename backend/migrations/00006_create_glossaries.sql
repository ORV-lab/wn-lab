-- +goose Up
CREATE TABLE glossaries (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    novel_id     UUID REFERENCES novels(id) ON DELETE CASCADE,
    source_term  TEXT NOT NULL,
    target_term  TEXT NOT NULL,
    term_type    TEXT NOT NULL DEFAULT 'other', -- character|place|skill|item|other
    notes        TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(novel_id, source_term)
);

-- +goose Down
DROP TABLE glossaries;
