from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.booking import Booking
from app.models.lead import Lead
from app.models.message import Message

router = APIRouter()


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@router.get("/summary")
def summary(db: Session = Depends(get_db)) -> dict:
    total_leads = db.scalar(select(func.count()).select_from(Lead)) or 0
    total_bookings = db.scalar(select(func.count()).select_from(Booking)) or 0
    total_messages = db.scalar(select(func.count()).select_from(Message)) or 0

    return {
        "total_leads": total_leads,
        "total_bookings": total_bookings,
        "total_messages": total_messages,
        "pending_tasks": total_bookings,
        "recent_activity": [],
    }