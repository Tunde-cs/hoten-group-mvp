from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class BookingCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str | None = None
    property_address: str
    preferred_date: str
    preferred_time: str | None = None
    service_type: str | None = "inspection"
    message: str | None = None


class BookingRead(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    phone: str | None = None
    property_address: str
    preferred_date: str
    preferred_time: str | None = None
    service_type: str
    message: str | None = None
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)