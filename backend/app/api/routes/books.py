from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel

from app.services.demo_store import (
    get_book_detail,
    get_reader_chapter,
    list_books,
    list_chapters,
    set_book_favorite,
    update_reader_progress,
)

router = APIRouter(tags=["books"])


class UpdateProgressPayload(BaseModel):
    progressPercent: int
    scrollOffset: int | None = None


@router.get("/books")
async def books(
    q: str | None = None,
    genre: str | None = None,
    status: str | None = None,
    sort: str = Query("popular"),
    page: int = 1,
    pageSize: int = 24,
) -> dict:
    return list_books(q=q, genre=genre, status=status, sort=sort, page=page, page_size=pageSize)


@router.get("/books/{slug}")
async def book_detail(slug: str) -> dict:
    try:
        return get_book_detail(slug)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail="Book not found") from exc


@router.post("/books/{slug}/favorite")
async def add_favorite(slug: str) -> dict:
    try:
        return set_book_favorite(slug, True)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail="Book not found") from exc


@router.delete("/books/{slug}/favorite")
async def remove_favorite(slug: str) -> dict:
    try:
        return set_book_favorite(slug, False)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail="Book not found") from exc


@router.get("/books/{slug}/chapters")
async def chapters(slug: str) -> dict:
    try:
        return list_chapters(slug)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail="Book not found") from exc


@router.get("/books/{slug}/chapters/{chapterNumber}")
async def reader_chapter(slug: str, chapterNumber: int) -> dict:
    try:
        return get_reader_chapter(slug, chapterNumber)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail="Chapter not found") from exc


@router.patch("/books/{slug}/chapters/{chapterNumber}/progress")
async def patch_progress(slug: str, chapterNumber: int, payload: UpdateProgressPayload) -> dict:
    try:
        return update_reader_progress(
            slug,
            chapterNumber,
            progress_percent=payload.progressPercent,
            scroll_offset=payload.scrollOffset,
        )
    except KeyError as exc:
        raise HTTPException(status_code=404, detail="Chapter not found") from exc
