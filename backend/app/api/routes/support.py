from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.api.deps.auth import get_current_user
from app.services.demo_store import create_support_ticket, get_my_support_tickets, get_support_page

router = APIRouter(tags=["support"])


class SupportTicketPayload(BaseModel):
    type: str
    subject: str
    message: str
    email: str | None = None


@router.get("/support/page")
async def support_page() -> dict:
    return get_support_page()


@router.post("/support/tickets")
async def create_ticket(payload: SupportTicketPayload) -> dict:
    return create_support_ticket(payload.type, payload.subject, payload.message, payload.email)


@router.get("/me/support/tickets")
async def my_support_tickets(_: dict = Depends(get_current_user)) -> dict:
    return get_my_support_tickets()
