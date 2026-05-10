from fastapi import APIRouter

from app.services.demo_store import search

router = APIRouter(tags=["search"])


@router.get("/search")
async def search_endpoint(q: str, scope: str = "all", limit: int = 8) -> dict:
    return search(q, scope=scope, limit=limit)
