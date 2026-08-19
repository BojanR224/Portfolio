"""GET /api/projects — the seeded project list."""

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Project
from ..schemas import ProjectOut

router = APIRouter(tags=["projects"])


def _to_out(project: Project) -> ProjectOut:
    return ProjectOut(
        id=project.id,
        title=project.title,
        description=project.description,
        techStack=project.tech_stack or [],
        repoUrl=project.repo_url,
        liveUrl=project.live_url,
        featured=project.featured,
    )


@router.get("/projects", response_model=list[ProjectOut])
def list_projects(db: Session = Depends(get_db)) -> list[BaseModel]:
    """All projects — featured first, seed order preserved within groups."""
    rows = db.execute(
        select(Project).order_by(Project.featured.desc(), Project.position)
    ).scalars().all()
    return [_to_out(row) for row in rows]