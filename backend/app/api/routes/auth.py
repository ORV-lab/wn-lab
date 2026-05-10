from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, Field

from app.api.deps.auth import get_current_user
from app.services.demo_store import login_user, register_user, revoke_token

router = APIRouter(tags=["auth"])
bearer_scheme = HTTPBearer(auto_error=False)


class RegisterPayload(BaseModel):
    username: str = Field(min_length=3, max_length=32)
    displayName: str = Field(min_length=2, max_length=64)
    email: str = Field(min_length=5, max_length=128)
    password: str = Field(min_length=8, max_length=128)


class LoginPayload(BaseModel):
    email: str = Field(min_length=5, max_length=128)
    password: str = Field(min_length=8, max_length=128)


@router.post("/auth/register")
async def register(payload: RegisterPayload) -> dict:
    try:
        return register_user(
            username=payload.username,
            display_name=payload.displayName,
            email=payload.email,
            password=payload.password,
        )
    except ValueError as exc:
        raise HTTPException(status_code=409, detail="Email is already registered") from exc


@router.post("/auth/login")
async def login(payload: LoginPayload) -> dict:
    try:
        return login_user(payload.email, payload.password)
    except ValueError as exc:
        raise HTTPException(status_code=401, detail="Invalid email or password") from exc


@router.get("/auth/me")
async def me(current_user: dict = Depends(get_current_user)) -> dict:
    return {"user": {k: v for k, v in current_user.items() if k != "password"}}


@router.post("/auth/logout")
async def logout(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    _: dict = Depends(get_current_user),
) -> dict:
    if credentials is not None:
        revoke_token(credentials.credentials)
    return {"ok": True}
