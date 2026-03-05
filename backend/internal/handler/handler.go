package handler

import "github.com/labstack/echo/v4"

type Handlers struct {
	Auth    AuthHandler
	Novel   NovelHandler
	Chapter ChapterHandler
}

type AuthHandler interface {
	Register(c echo.Context) error
	Login(c echo.Context) error
	Refresh(c echo.Context) error
	Logout(c echo.Context) error
}

type NovelHandler interface {
	GetNovels(c echo.Context) error
	GetNovel(c echo.Context) error
	CreateNovel(c echo.Context) error
	UpdateNovel(c echo.Context) error
	DeleteNovel(c echo.Context) error
	UploadCover(c echo.Context) error
	GetGlossary(c echo.Context) error
	CreateGlossary(c echo.Context) error
	UpdateGlossaryTerm(c echo.Context) error
	DeleteGlossaryTerm(c echo.Context) error
	Search(c echo.Context) error
	Subscribe(c echo.Context) error
	Unsubscribe(c echo.Context) error
}

type ChapterHandler interface {
	GetChapters(c echo.Context) error
	GetChapter(c echo.Context) error
	CreateChapter(c echo.Context) error
	UpdateChapter(c echo.Context) error
	DeleteChapter(c echo.Context) error
	CreateJob(c echo.Context) error
	GetJob(c echo.Context) error
	DeleteJob(c echo.Context) error
	GetDraft(c echo.Context) error
	UpdateDraft(c echo.Context) error
	PublishChapter(c echo.Context) error
	GetComments(c echo.Context) error
	CreateComment(c echo.Context) error
	DeleteComment(c echo.Context) error
	StreamJob(c echo.Context) error
}
