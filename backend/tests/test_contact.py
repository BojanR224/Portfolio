"""POST /api/contact — validation (400), persistence, rate limiting (429)."""

from fastapi.testclient import TestClient
from httpx import Response
from sqlalchemy import func, select

from app.models import ContactMessage

VALID = {
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "message": "Hello, I'd love to chat about a project.",
}


def _send(client: TestClient, payload: dict) -> Response:
    return client.post("/api/contact", json=payload)


def test_contact_success_persists(client: TestClient) -> None:
    response = _send(client, VALID)
    assert response.status_code == 200
    assert response.json()["ok"] is True

    engine = client.app.state.engine
    with engine.connect() as conn:
        count = conn.scalar(select(func.count()).select_from(ContactMessage))
    assert count == 1


def test_name_too_short_returns_400(client: TestClient) -> None:
    response = _send(client, {**VALID, "name": "A"})
    assert response.status_code == 400
    error = response.json()["error"]
    assert error["code"] == "validation_error"
    assert any(d["field"] == "name" for d in error.get("details", []))


def test_invalid_email_returns_400(client: TestClient) -> None:
    response = _send(client, {**VALID, "email": "not-an-email"})
    assert response.status_code == 400
    assert response.json()["error"]["code"] == "validation_error"


def test_message_too_short_returns_400(client: TestClient) -> None:
    response = _send(client, {**VALID, "message": "hi"})
    assert response.status_code == 400
    error = response.json()["error"]
    assert any(d["field"] == "message" for d in error.get("details", []))


def test_missing_field_returns_400_not_422(client: TestClient) -> None:
    response = _send(client, {"name": VALID["name"], "message": VALID["message"]})
    assert response.status_code == 400
    assert response.json()["error"]["code"] == "validation_error"


def test_rate_limit_returns_429(client: TestClient) -> None:
    # Fixture sets contact_rate_limit=3.
    for _ in range(3):
        assert _send(client, VALID).status_code == 200

    blocked = _send(client, VALID)
    assert blocked.status_code == 429
    error = blocked.json()["error"]
    assert error["code"] == "rate_limited"
    assert error["message"]