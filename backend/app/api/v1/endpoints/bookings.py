from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.booking import Booking
from app.schemas.booking import BookingCreate, BookingRead

router = APIRouter()


@router.post("/", response_model=BookingRead, status_code=status.HTTP_201_CREATED)
def create_booking(payload: BookingCreate, db: Session = Depends(get_db)) -> Booking:
    booking = Booking(**payload.model_dump())
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking


@router.get("/", response_model=list[BookingRead])
def list_bookings(db: Session = Depends(get_db)) -> list[Booking]:
    result = db.execute(select(Booking).order_by(Booking.created_at.desc()))
    return list(result.scalars().all())