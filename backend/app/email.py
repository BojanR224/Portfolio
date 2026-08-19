"""Optional SMTP notifications. A failure here must NEVER fail the request."""

import logging
import smtplib
from email.message import EmailMessage

from .config import Settings

logger = logging.getLogger("portfolio.email")


def send_contact_email(
    settings: Settings, name: str, sender_email: str, message: str
) -> None:
    """Send a plain-text notification. Raises on failure; the caller logs it.

    Port 465 uses implicit SSL; anything else uses STARTTLS when enabled
    (standard for 587). Login is only attempted when credentials are set.
    """
    msg = EmailMessage()
    from_addr = settings.smtp_sender or settings.smtp_user or settings.contact_to_email
    msg["From"] = from_addr
    msg["To"] = settings.contact_to_email
    msg["Subject"] = f"Portfolio contact: {name}"
    msg["Reply-To"] = sender_email
    msg.set_content(f"Name: {name}\nEmail: {sender_email}\n\n{message}\n")

    if settings.smtp_port == 465:
        with smtplib.SMTP_SSL(settings.smtp_host, settings.smtp_port, timeout=10) as server:
            if settings.smtp_user:
                server.login(settings.smtp_user, settings.smtp_password)
            server.send_message(msg)
    else:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=10) as server:
            if settings.smtp_use_tls:
                server.starttls()
            if settings.smtp_user:
                server.login(settings.smtp_user, settings.smtp_password)
            server.send_message(msg)