"""Shared fixtures: a fresh app with an isolated temp database per test."""

from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.config import Settings
from app.main import create_app


@pytest.fixture()
def client(tmp_path: Path) -> TestClient:
    settings = Settings(
        database_url=f"sqlite:///{tmp_path}/test.db",
        allowed_origins="http://testclient",
        contact_rate_limit=3,
        trust_proxy_headers=False,
    )
    application = create_app(settings)
    with TestClient(application) as test_client:
        yield test_client