from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class MessageCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str | None = None
    subject: str | None = None
    message: str


class MessageRead(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    phone: str | None = None
    subject: str | None = None
    message: str
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)