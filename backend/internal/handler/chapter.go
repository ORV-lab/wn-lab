package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type chapterHandler struct{}

func NewChapterHandler() ChapterHandler {
	return &chapterHandler{}
}

func (h *chapterHandler) GetChapters(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *chapterHandler) GetChapter(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *chapterHandler) CreateChapter(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *chapterHandler) UpdateChapter(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *chapterHandler) DeleteChapter(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *chapterHandler) CreateJob(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *chapterHandler) GetJob(c echo.Context) error { return c.NoContent(http.StatusNotImplemented) }
func (h *chapterHandler) DeleteJob(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *chapterHandler) GetDraft(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *chapterHandler) UpdateDraft(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *chapterHandler) PublishChapter(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *chapterHandler) GetComments(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *chapterHandler) CreateComment(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *chapterHandler) DeleteComment(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *chapterHandler) StreamJob(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
