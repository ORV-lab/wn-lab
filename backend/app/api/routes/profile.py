from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.api.deps.auth import get_current_user
from app.services.demo_store import get_profile, update_profile

router = APIRouter(tags=["profile"])


class UpdateProfilePayload(BaseModel):
    displayName: str | None = None
    bio: str | None = None
    favoriteGenre: str | None = None


@router.get("/me/profile")
async def profile(current_user: dict = Depends(get_current_user)) -> dict:
    return get_profile(current_user)


@router.patch("/me/profile")
async def patch_profile(
    payload: UpdateProfilePayload,
    current_user: dict = Depends(get_current_user),
) -> dict:
    return update_profile(current_user, payload.displayName, payload.bio, payload.favoriteGenre)
