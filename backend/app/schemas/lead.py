from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class LeadCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str | None = None
    address: str | None = None
    motivation: str | None = None


class LeadRead(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    phone: str | None = None
    address: str | None = None
    motivation: str | None = None
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)