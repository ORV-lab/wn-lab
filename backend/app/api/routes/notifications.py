from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.api.deps.auth import get_current_user
from app.services.demo_store import list_notifications, mark_all_notifications_read, update_notification

router = APIRouter(tags=["notifications"])


class UpdateNotificationPayload(BaseModel):
    isRead: bool


@router.get("/me/notifications")
async def notifications(
    status: str = "all",
    page: int = 1,
    pageSize: int = 24,
    _: dict = Depends(get_current_user),
) -> dict:
    return list_notifications(status=status, page=page, page_size=pageSize)


@router.patch("/me/notifications/{notificationId}")
async def patch_notification(
    notificationId: str,
    payload: UpdateNotificationPayload,
    _: dict = Depends(get_current_user),
) -> dict:
    try:
        return update_notification(notificationId, payload.isRead)
    except StopIteration as exc:
        raise HTTPException(status_code=404, detail="Notification not found") from exc


@router.post("/me/notifications/mark-all-read")
async def mark_all_read(_: dict = Depends(get_current_user)) -> dict:
    return mark_all_notifications_read()
