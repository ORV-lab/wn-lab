from fastapi import APIRouter

from app.services.demo_store import get_home_data

router = APIRouter(tags=["home"])


@router.get("/home")
async def home() -> dict:
    return get_home_data()
