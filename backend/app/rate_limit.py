"""In-memory sliding-window rate limiter, keyed per client IP.

Single-process by design (the deployment runs one uvicorn worker).
Keys accumulate only per unique IP, which is fine at portfolio scale.
"""

import threading
import time
from collections import defaultdict, deque


class RateLimiter:
    """Tracks timestamps of accepted hits per key inside a sliding window."""

    def __init__(self, limit: int, window_seconds: int = 3600) -> None:
        self.limit = limit
        self.window = window_seconds
        self._hits: dict[str, deque[float]] = defaultdict(deque)
        self._lock = threading.Lock()

    def allow(self, key: str, now: float | None = None) -> bool:
        """Record a hit and report whether it was within the limit."""
        now = time.time() if now is None else now
        with self._lock:
            hits = self._hits[key]
            cutoff = now - self.window
            while hits and hits[0] <= cutoff:
                hits.popleft()
            if len(hits) >= self.limit:
                return False
            hits.append(now)
            return True