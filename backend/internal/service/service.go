package service

import "github.com/wn-lab/core/internal/repository"

type Services struct {
	Novel NovelService
}

type Repositories struct {
	Novel repository.NovelRepo
}

func New(repos Repositories) *Services {
	return &Services{
		Novel: NewNovelService(repos.Novel),
	}
}
