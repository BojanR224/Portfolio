"""Engine/session wiring plus first-run seeding from seed.json."""

import json
import logging
from collections.abc import Generator
from pathlib import Path

from fastapi import Request
from sqlalchemy import create_engine, func, select
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session, sessionmaker

from .models import Base, ContactMessage, Project

logger = logging.getLogger("portfolio.db")

SEED_PATH = Path(__file__).parent / "seed.json"


def make_engine(database_url: str) -> Engine:
    """Create an engine. SQLite needs check_same_thread=False for FastAPI."""
    connect_args = {"check_same_thread": False} if database_url.startswith("sqlite") else {}
    return create_engine(database_url, connect_args=connect_args)


def init_db(engine: Engine) -> None:
    """Create tables and seed projects on first run (idempotent)."""
    Base.metadata.create_all(engine)
    with sessionmaker(bind=engine)() as session:
        _seed_projects(session)


def _seed_projects(session: Session) -> None:
    existing = session.scalar(select(func.count()).select_from(Project))
    if existing:
        return

    try:
        payload = json.loads(SEED_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        logger.exception(
            "Could not read seed file %s — starting with an empty projects table", SEED_PATH
        )
        return

    items = payload.get("projects", [])
    for position, item in enumerate(items):
        session.add(
            Project(
                title=item["title"],
                description=item["description"],
                tech_stack=item.get("techStack", []),
                repo_url=item.get("repoUrl"),
                live_url=item.get("liveUrl"),
                featured=bool(item.get("featured", False)),
                position=position,
            )
        )
    session.commit()
    logger.info("Seeded %d projects from %s", len(items), SEED_PATH.name)


def get_db(request: Request) -> Generator[Session, None, None]:
    """Yield a session bound to this app's engine (set in lifespan)."""
    factory: sessionmaker[Session] = request.app.state.sessionmaker
    db = factory()
    try:
        yield db
    finally:
        db.close()


__all__ = ["make_engine", "init_db", "get_db", "ContactMessage", "Project"]