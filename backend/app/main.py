from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.books import router as books_router
from app.api.routes.health import router as health_router
from app.api.routes.home import router as home_router
from app.api.routes.legal import router as legal_router
from app.api.routes.library import router as library_router
from app.api.routes.notifications import router as notifications_router
from app.api.routes.profile import router as profile_router
from app.api.routes.search import router as search_router
from app.api.routes.settings import router as settings_router
from app.api.routes.support import router as support_router
from app.api.routes.translation import router as translation_router

app = FastAPI(
    title="WN-Lab API",
    version="0.1.0",
    description="Backend service for the WN-Lab project.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(home_router, prefix="/api/v1")
app.include_router(books_router, prefix="/api/v1")
app.include_router(library_router, prefix="/api/v1")
app.include_router(profile_router, prefix="/api/v1")
app.include_router(notifications_router, prefix="/api/v1")
app.include_router(settings_router, prefix="/api/v1")
app.include_router(translation_router, prefix="/api/v1")
app.include_router(support_router, prefix="/api/v1")
app.include_router(legal_router, prefix="/api/v1")
app.include_router(search_router, prefix="/api/v1")


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "WN-Lab API is running"}
