package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/labstack/echo/v4"
	mdw "github.com/labstack/echo/v4/middleware"
	"github.com/wn-lab/core/internal/handler"
	"github.com/wn-lab/core/internal/middleware"
	"github.com/wn-lab/core/internal/repository/postgres"
	"github.com/wn-lab/core/internal/service"
)

func main() {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Fatal("DATABASE_URL environment variable is not set")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		log.Fatal("JWT_SECRET environment variable is not set")
	}

	ctx := context.Background()

	// 2. Initialize pgxpool
	pool, err := postgres.New(ctx, dbURL)
	if err != nil {
		log.Fatalf("failed to initialize db: %v", err)
	}
	defer pool.Close()

	// 3. Assemble DI container
	repos := service.Repositories{
		Novel: postgres.NewNovelRepo(pool),
	}

	_ = service.New(repos) // Services

	handlers := &handler.Handlers{
		Auth:    handler.NewAuthHandler(),
		Novel:   handler.NewNovelHandler(),
		Chapter: handler.NewChapterHandler(),
	}

	mwBundle := middleware.NewBundle()

	// 4. Create echo instance and add middleware
	e := echo.New()

	e.Use(mdw.Logger())
	e.Use(mdw.Recover())

	e.Use(mdw.CORSWithConfig(mdw.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodPatch, http.MethodDelete, http.MethodOptions, http.MethodPut},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	// 5. Register handlers
	handler.Register(e, handlers, mwBundle)

	// 6. Start server with graceful shutdown
	go func() {
		if err := e.Start(":" + port); err != nil && err != http.ErrServerClosed {
			e.Logger.Fatalf("shutting down the server: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	<-quit

	ctxShutdown, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := e.Shutdown(ctxShutdown); err != nil {
		e.Logger.Fatal(err)
	}
}
