from fastapi import APIRouter
from pydantic import BaseModel

from app.services.demo_store import get_profile, update_profile

router = APIRouter(tags=["profile"])


class UpdateProfilePayload(BaseModel):
    displayName: str | None = None
    bio: str | None = None
    favoriteGenre: str | None = None


@router.get("/me/profile")
async def profile() -> dict:
    return get_profile()


@router.patch("/me/profile")
async def patch_profile(payload: UpdateProfilePayload) -> dict:
    return update_profile(payload.displayName, payload.bio, payload.favoriteGenre)
