-- +goose Up
CREATE TABLE bookmarks (
    user_id      UUID REFERENCES users(id) ON DELETE CASCADE,
    novel_id     UUID REFERENCES novels(id) ON DELETE CASCADE,
    chapter_id   UUID REFERENCES chapters(id),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY(user_id, novel_id)
);

-- +goose Down
DROP TABLE bookmarks;
