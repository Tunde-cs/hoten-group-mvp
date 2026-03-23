from app.core.database import Base, engine
from app.models import Booking, Lead, Message, User  # noqa: F401


def main() -> None:
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully.")


if __name__ == "__main__":
    main()