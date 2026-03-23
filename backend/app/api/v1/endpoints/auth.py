from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr

from app.core.security import create_access_token

router = APIRouter()


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


@router.post("/login")
def login(payload: LoginRequest) -> dict:
    if payload.email != "admin@hotengroup.com" or payload.password != "admin123":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token = create_access_token(subject=payload.email)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "email": payload.email,
            "role": "admin",
        },
    }


@router.get("/me")
def me() -> dict:
    return {
        "email": "admin@hotengroup.com",
        "role": "admin",
        "full_name": "Hoten Admin",
    }