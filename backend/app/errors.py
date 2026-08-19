"""Consistent JSON error responses: {"error": {"code", "message"}}."""

import logging

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

logger = logging.getLogger("portfolio.errors")


def _error(
    code: str, message: str, status_code: int, details: list[dict] | None = None
) -> JSONResponse:
    body: dict = {"error": {"code": code, "message": message}}
    if details:
        body["error"]["details"] = details
    return JSONResponse(status_code=status_code, content=body)


def install_error_handlers(app: FastAPI) -> None:
    """Register handlers so every failure returns the same shape."""

    @app.exception_handler(RequestValidationError)
    async def handle_validation(
        request: Request, exc: RequestValidationError
    ) -> JSONResponse:
        # FastAPI's default is 422; the spec calls for 400 on bad input.
        details = [
            {
                "field": ".".join(str(part) for part in err.get("loc", []) if part != "body")
                or "body",
                "message": err.get("msg", "Invalid value."),
            }
            for err in exc.errors()
        ]
        return _error("validation_error", "Some fields need attention.", 400, details)

    @app.exception_handler(StarletteHTTPException)
    async def handle_http(request: Request, exc: StarletteHTTPException) -> JSONResponse:
        # HTTPException(detail={"code": ..., "message": ...}) is respected.
        if isinstance(exc.detail, dict):
            code = str(exc.detail.get("code", "error"))
            message = str(exc.detail.get("message", "Request failed."))
        else:
            code = f"http_{exc.status_code}"
            message = str(exc.detail) if exc.detail else "Request failed."
        return _error(code, message, exc.status_code)

    @app.exception_handler(Exception)
    async def handle_unexpected(request: Request, exc: Exception) -> JSONResponse:
        logger.exception("Unhandled error on %s %s", request.method, request.url.path)
        return _error("internal_error", "Something went wrong on our side.", 500)