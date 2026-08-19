"""GET /api/projects — seeding, shape, ordering."""

import json
from pathlib import Path

from fastapi.testclient import TestClient

SEED_PATH = Path(__file__).resolve().parents[1] / "app" / "seed.json"
EXPECTED_FIELDS = {"id", "title", "description", "techStack", "repoUrl", "liveUrl", "featured"}


def test_projects_seeded_from_seed_json(client: TestClient) -> None:
    response = client.get("/api/projects")
    assert response.status_code == 200
    seed_count = len(json.loads(SEED_PATH.read_text(encoding="utf-8"))["projects"])
    assert len(response.json()) == seed_count


def test_projects_field_shape(client: TestClient) -> None:
    body = client.get("/api/projects").json()
    assert body, "expected seeded projects"
    for project in body:
        assert set(project) == EXPECTED_FIELDS
        assert isinstance(project["techStack"], list)
        assert isinstance(project["featured"], bool)
        assert project["repoUrl"] is None or isinstance(project["repoUrl"], str)


def test_featured_projects_listed_first(client: TestClient) -> None:
    flags = [p["featured"] for p in client.get("/api/projects").json()]
    assert flags == sorted(flags, reverse=True)