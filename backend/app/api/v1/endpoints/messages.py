from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.message import Message
from app.schemas.message import MessageCreate, MessageRead

router = APIRouter()


@router.post("/", response_model=MessageRead, status_code=status.HTTP_201_CREATED)
def create_message(payload: MessageCreate, db: Session = Depends(get_db)) -> Message:
    message = Message(**payload.model_dump())
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


@router.get("/", response_model=list[MessageRead])
def list_messages(db: Session = Depends(get_db)) -> list[Message]:
    result = db.execute(select(Message).order_by(Message.created_at.desc()))
    return list(result.scalars().all())