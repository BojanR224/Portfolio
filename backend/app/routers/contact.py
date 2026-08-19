"""POST /api/contact — validate, rate-limit, persist, optionally notify."""

import logging

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.concurrency import run_in_threadpool
from sqlalchemy.orm import Session

from ..database import get_db
from ..email import send_contact_email
from ..models import ContactMessage
from ..schemas import ContactIn, ContactOut

logger = logging.getLogger("portfolio.contact")

router = APIRouter(tags=["contact"])


def _client_ip(request: Request) -> str:
    """X-Forwarded-For (first hop) when behind a proxy, else the socket peer."""
    settings = request.app.state.settings
    if settings.trust_proxy_headers:
        forwarded = request.headers.get("x-forwarded-for")
        if forwarded:
            return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


@router.post("/contact", response_model=ContactOut)
async def submit_contact(
    payload: ContactIn, request: Request, db: Session = Depends(get_db)
) -> ContactOut:
    limiter = request.app.state.rate_limiter
    ip = _client_ip(request)

    if not limiter.allow(ip):
        raise HTTPException(
            status_code=429,
            detail={
                "code": "rate_limited",
                "message": "Too many messages from this address. Please try again in an hour.",
            },
        )

    # Persist first — a notification failure must never lose a message.
    db.add(
        ContactMessage(
            name=payload.name, email=payload.email, message=payload.message, ip=ip
        )
    )
    db.commit()

    settings = request.app.state.settings
    if settings.smtp_configured:
        try:
            await run_in_threadpool(
                send_contact_email, settings, payload.name, payload.email, payload.message
            )
        except Exception:
            logger.exception(
                "Failed to send contact notification email (message was saved)"
            )
    else:
        logger.info(
            "New contact message (SMTP not configured) — from %s <%s>:\n%s",
            payload.name,
            payload.email,
            payload.message,
        )

    return ContactOut()