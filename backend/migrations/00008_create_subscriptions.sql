-- +goose Up
CREATE TABLE subscriptions (
    user_id      UUID REFERENCES users(id) ON DELETE CASCADE,
    novel_id     UUID REFERENCES novels(id) ON DELETE CASCADE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY(user_id, novel_id)
);

-- +goose Down
DROP TABLE subscriptions;
