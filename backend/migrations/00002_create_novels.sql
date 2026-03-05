-- +goose Up
CREATE TABLE novels (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug          TEXT UNIQUE NOT NULL,
    title         TEXT NOT NULL,
    description   TEXT,
    original_lang TEXT NOT NULL,  -- zh|ja|ko|en
    status        TEXT NOT NULL DEFAULT 'ongoing', -- ongoing|completed|hiatus
    cover_url     TEXT,
    owner_id      UUID REFERENCES users(id),
    rating        NUMERIC(3,2) DEFAULT 0,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- +goose Down
DROP TABLE novels;
