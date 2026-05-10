from fastapi import APIRouter

from app.services.demo_store import get_terms

router = APIRouter(tags=["legal"])


@router.get("/legal/terms")
async def terms() -> dict:
    return get_terms()
