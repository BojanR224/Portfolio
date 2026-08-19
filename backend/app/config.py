"""Environment-driven application settings (12-factor style)."""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """All runtime configuration comes from environment variables.

    Every field maps 1:1 to an uppercase env var (see ../.env.example).
    """

    # SQLite by default; overridable with any SQLAlchemy URL.
    database_url: str = "sqlite:///./portfolio.db"

    # Comma-separated origins allowed to call the API (CORS).
    allowed_origins: str = "http://localhost:5173,http://127.0.0.1:5173"

    # Contact form: accepted submissions per client IP per hour.
    contact_rate_limit: int = 5

    # Trust X-Forwarded-For from a reverse proxy (true behind Caddy,
    # false when running uvicorn directly during development).
    trust_proxy_headers: bool = False

    # SMTP is entirely optional — an empty host disables sending and
    # submissions are logged to the console instead.
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    smtp_use_tls: bool = True
    smtp_sender: str = ""
    contact_to_email: str = ""

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    @property
    def origins(self) -> list[str]:
        """ALLOWED_ORIGINS split into a clean, whitespace-free list."""
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]

    @property
    def smtp_configured(self) -> bool:
        """Email is only attempted when host and recipient are both set."""
        return bool(self.smtp_host and self.contact_to_email)


@lru_cache
def get_settings() -> Settings:
    """Cached settings accessor used when no explicit settings are passed."""
    return Settings()