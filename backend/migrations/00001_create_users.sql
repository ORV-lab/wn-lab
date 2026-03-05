-- +goose Up
CREATE TABLE users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email         TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    username      TEXT UNIQUE NOT NULL,
    role          TEXT NOT NULL DEFAULT 'reader', -- reader|translator|admin
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- +goose Down
DROP TABLE users;
