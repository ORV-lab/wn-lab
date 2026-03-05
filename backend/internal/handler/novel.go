package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type novelHandler struct{}

func NewNovelHandler() NovelHandler {
	return &novelHandler{}
}

func (h *novelHandler) GetNovels(c echo.Context) error { return c.NoContent(http.StatusNotImplemented) }
func (h *novelHandler) GetNovel(c echo.Context) error  { return c.NoContent(http.StatusNotImplemented) }
func (h *novelHandler) CreateNovel(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *novelHandler) UpdateNovel(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *novelHandler) DeleteNovel(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *novelHandler) UploadCover(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *novelHandler) GetGlossary(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *novelHandler) CreateGlossary(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *novelHandler) UpdateGlossaryTerm(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *novelHandler) DeleteGlossaryTerm(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
func (h *novelHandler) Search(c echo.Context) error    { return c.NoContent(http.StatusNotImplemented) }
func (h *novelHandler) Subscribe(c echo.Context) error { return c.NoContent(http.StatusNotImplemented) }
func (h *novelHandler) Unsubscribe(c echo.Context) error {
	return c.NoContent(http.StatusNotImplemented)
}
