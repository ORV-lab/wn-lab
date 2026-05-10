from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.demo_store import add_to_library, get_library, remove_from_library, update_library_item

router = APIRouter(tags=["library"])


class AddLibraryPayload(BaseModel):
    bookId: str


class UpdateLibraryPayload(BaseModel):
    isFavorite: bool | None = None
    isCompleted: bool | None = None


@router.get("/me/library")
async def library(
    category: str = "all",
    q: str | None = None,
    page: int = 1,
    pageSize: int = 24,
) -> dict:
    return get_library(category=category, q=q, page=page, page_size=pageSize)


@router.post("/me/library")
async def create_library_item(payload: AddLibraryPayload) -> dict:
    try:
        return add_to_library(payload.bookId)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail="Book not found") from exc


@router.delete("/me/library/{bookId}")
async def delete_library_item(bookId: str) -> dict:
    return remove_from_library(bookId)


@router.patch("/me/library/{bookId}")
async def patch_library_item(bookId: str, payload: UpdateLibraryPayload) -> dict:
    try:
        return update_library_item(bookId, payload.isFavorite, payload.isCompleted)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail="Book not found") from exc
