"""Pydantic v2 request/response schemas."""

from pydantic import BaseModel, EmailStr, Field


class ProjectOut(BaseModel):
    id: int
    title: str
    description: str
    techStack: list[str]
    repoUrl: str | None
    liveUrl: str | None
    featured: bool


class FieldError(BaseModel):
    field: str
    message: str


class ContactIn(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(min_length=10, max_length=2000)


class ContactOut(BaseModel):
    ok: bool = True
    message: str = "Thanks — your message was received. I'll reply soon."


class ErrorBody(BaseModel):
    code: str
    message: str
    details: list[FieldError] | None = None


class ErrorOut(BaseModel):
    """The single error shape every endpoint returns on failure."""

    error: ErrorBody