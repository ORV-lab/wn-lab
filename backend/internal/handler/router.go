package handler

import (
	"github.com/labstack/echo/v4"
	"github.com/wn-lab/core/internal/domain"
	"github.com/wn-lab/core/internal/middleware"
)

func Register(e *echo.Echo, h *Handlers, mw *middleware.Bundle) {
	v1 := e.Group("/api/v1")

	// Auth
	auth := v1.Group("/auth")
	auth.POST("/register", h.Auth.Register)
	auth.POST("/login", h.Auth.Login)
	auth.POST("/refresh", h.Auth.Refresh)
	auth.DELETE("/logout", h.Auth.Logout)

	// Role checks
	reqReader := middleware.RequireRole(domain.RoleReader, domain.RoleTranslator, domain.RoleAdmin)
	reqTranslator := middleware.RequireRole(domain.RoleTranslator, domain.RoleAdmin)
	reqAdmin := middleware.RequireRole(domain.RoleAdmin)

	// Novels
	novels := v1.Group("/novels")
	novels.GET("", h.Novel.GetNovels)
	novels.GET("/:slug", h.Novel.GetNovel)
	novels.POST("", h.Novel.CreateNovel, middleware.Auth(), reqTranslator)
	novels.PATCH("/:id", h.Novel.UpdateNovel, middleware.Auth(), reqTranslator)
	novels.DELETE("/:id", h.Novel.DeleteNovel, middleware.Auth(), reqAdmin)
	novels.POST("/:id/cover", h.Novel.UploadCover, middleware.Auth(), reqTranslator)

	// Chapters
	novels.GET("/:slug/chapters", h.Chapter.GetChapters)
	novels.GET("/:slug/chapters/:number", h.Chapter.GetChapter)
	novels.POST("/:id/chapters", h.Chapter.CreateChapter, middleware.Auth(), reqTranslator)

	chapters := v1.Group("/chapters")
	chapters.PATCH("/:id", h.Chapter.UpdateChapter, middleware.Auth(), reqTranslator)
	chapters.DELETE("/:id", h.Chapter.DeleteChapter, middleware.Auth(), reqTranslator)

	// Translation
	jobs := v1.Group("/translate/jobs")
	jobs.POST("", h.Chapter.CreateJob, middleware.Auth(), reqTranslator)
	jobs.GET("/:id", h.Chapter.GetJob, middleware.Auth(), reqTranslator)
	jobs.DELETE("/:id", h.Chapter.DeleteJob, middleware.Auth(), reqTranslator)

	chapters.GET("/:id/draft", h.Chapter.GetDraft, middleware.Auth(), reqTranslator)
	chapters.PATCH("/:id/draft", h.Chapter.UpdateDraft, middleware.Auth(), reqTranslator)
	chapters.POST("/:id/publish", h.Chapter.PublishChapter, middleware.Auth(), reqTranslator)

	// Glossary
	novels.GET("/:id/glossary", h.Novel.GetGlossary)
	novels.POST("/:id/glossary", h.Novel.CreateGlossary, middleware.Auth(), reqTranslator)

	glossary := v1.Group("/glossary")
	glossary.PATCH("/:term_id", h.Novel.UpdateGlossaryTerm, middleware.Auth(), reqTranslator)
	glossary.DELETE("/:term_id", h.Novel.DeleteGlossaryTerm, middleware.Auth(), reqTranslator)

	// Search & Social
	v1.GET("/search", h.Novel.Search)
	novels.POST("/:id/subscribe", h.Novel.Subscribe, middleware.Auth(), reqReader)
	novels.DELETE("/:id/subscribe", h.Novel.Unsubscribe, middleware.Auth(), reqReader)

	chapters.GET("/:id/comments", h.Chapter.GetComments)
	chapters.POST("/:id/comments", h.Chapter.CreateComment, middleware.Auth(), reqReader)

	comments := v1.Group("/comments")
	comments.DELETE("/:id", h.Chapter.DeleteComment, middleware.Auth(), reqTranslator)

	// SSE
	v1.GET("/jobs/:id/stream", h.Chapter.StreamJob, middleware.Auth(), reqTranslator)
}
