from fastapi import APIRouter

from app.api.v1.endpoints import auth, bookings, dashboard, leads, messages

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(leads.router, prefix="/leads", tags=["leads"])
api_router.include_router(bookings.router, prefix="/bookings", tags=["bookings"])
api_router.include_router(messages.router, prefix="/messages", tags=["messages"])