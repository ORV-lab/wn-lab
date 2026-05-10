from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile

from app.api.deps.auth import get_current_user
from app.services.demo_store import (
    cancel_translation_job,
    create_translation_job,
    get_translation_dashboard,
    get_translation_job,
    list_translation_jobs,
)

router = APIRouter(tags=["translation"])


@router.get("/translation/dashboard")
async def translation_dashboard(_: dict = Depends(get_current_user)) -> dict:
    return get_translation_dashboard()


@router.post("/translation/jobs")
async def create_job(
    title: str = Form(...),
    author: str | None = Form(None),
    sourceLanguage: str = Form(...),
    targetLanguage: str = Form(...),
    file: UploadFile = File(...),
    _: dict = Depends(get_current_user),
) -> dict:
    return create_translation_job(
        title=title,
        author=author,
        source_language=sourceLanguage,
        target_language=targetLanguage,
        file_name=file.filename or "upload.bin",
        file_size=0,
    )


@router.get("/translation/jobs")
async def translation_jobs(
    status: str | None = None,
    page: int = 1,
    pageSize: int = 24,
    _: dict = Depends(get_current_user),
) -> dict:
    return list_translation_jobs(status=status, page=page, page_size=pageSize)


@router.get("/translation/jobs/{jobId}")
async def translation_job(jobId: str, _: dict = Depends(get_current_user)) -> dict:
    try:
        return get_translation_job(jobId)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail="Job not found") from exc


@router.post("/translation/jobs/{jobId}/cancel")
async def cancel_job(jobId: str, _: dict = Depends(get_current_user)) -> dict:
    result = cancel_translation_job(jobId)
    if not result["cancelled"]:
        raise HTTPException(status_code=404, detail="Job not found")
    return result
