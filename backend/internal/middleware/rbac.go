package middleware

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/wn-lab/core/internal/domain"
	"github.com/wn-lab/core/pkg/jwt"
)

func RequireRole(roles ...domain.Role) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			val := c.Get(ClaimsContextKey)
			claims, ok := val.(*jwt.Claims)
			if !ok || claims == nil {
				return echo.NewHTTPError(http.StatusUnauthorized, "missing user claims")
			}

			hasRole := false
			for _, role := range roles {
				if claims.Role == role {
					hasRole = true
					break
				}
			}

			if !hasRole {
				return echo.NewHTTPError(http.StatusForbidden, "forbidden: insufficient permissions")
			}

			return next(c)
		}
	}
}
