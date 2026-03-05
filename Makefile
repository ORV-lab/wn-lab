.PHONY: dev test lint build migrate-up migrate-down seed

dev:
	cd backend && go run ./cmd/api & cd backend && go run ./cmd/worker

dev-frontend:
	cd frontend && npm run dev

test:
	cd backend && go test ./... -race -count=1

lint:
	cd backend && golangci-lint run ./...

build:
	cd backend && go build -o bin/api ./cmd/api
	cd backend && go build -o bin/worker ./cmd/worker

migrate-up:
	cd backend && go run ./cmd/migrate up

migrate-down:
	cd backend && go run ./cmd/migrate down

seed:
	cd backend && go run ./cmd/migrate seed
