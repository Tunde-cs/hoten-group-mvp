from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.api import api_router
from app.core.config import get_settings
from app.core.database import Base, engine

# Import models so SQLAlchemy registers them before create_all
from app.models.user import User
from app.models.lead import Lead
from app.models.booking import Booking
from app.models.message import Message

settings = get_settings()

app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG,
)

allowed_origins = [
    settings.FRONTEND_URL,
    settings.FRONTEND_PROD_URL,
    settings.FRONTEND_PROD_WWW_URL,
    "http://localhost:3005",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin for origin in allowed_origins if origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)


app.include_router(api_router, prefix=settings.API_V1_PREFIX)


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Hoten Group FastAPI backend is running"}