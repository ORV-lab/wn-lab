package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type authHandler struct{}

func NewAuthHandler() AuthHandler {
	return &authHandler{}
}

func (h *authHandler) Register(c echo.Context) error { return c.NoContent(http.StatusNotImplemented) }
func (h *authHandler) Login(c echo.Context) error    { return c.NoContent(http.StatusNotImplemented) }
func (h *authHandler) Refresh(c echo.Context) error  { return c.NoContent(http.StatusNotImplemented) }
func (h *authHandler) Logout(c echo.Context) error   { return c.NoContent(http.StatusNotImplemented) }
