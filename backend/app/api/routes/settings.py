from fastapi import APIRouter
from pydantic import BaseModel

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
async def settings() -> dict:
    return get_settings()


@router.patch("/me/settings")
async def patch_settings(payload: UpdateSettingsPayload) -> dict:
    return update_settings(payload.reader.model_dump())
