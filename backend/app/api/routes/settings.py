from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.api.deps.auth import get_current_user
from app.services.demo_store import get_settings, update_settings

router = APIRouter(tags=["settings"])


class ReaderSettingsPayload(BaseModel):
    defaultFont: str
    fontSize: int
    readingMode: str
    emailNotifications: bool


class UpdateSettingsPayload(BaseModel):
    reader: ReaderSettingsPayload


@router.get("/me/settings")
async def settings(_: dict = Depends(get_current_user)) -> dict:
    return get_settings()


@router.patch("/me/settings")
async def patch_settings(payload: UpdateSettingsPayload, _: dict = Depends(get_current_user)) -> dict:
    return update_settings(payload.reader.model_dump())
