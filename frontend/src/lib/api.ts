import type { ApiErrorBody, FieldError } from '../types';

export class ApiError extends Error {
  readonly code: string;
  readonly details?: FieldError[];

  constructor(code: string, message: string, details?: FieldError[]) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
  }
}

/**
 * Fetch wrapper that speaks the backend's error shape
 * ({"error": {"code", "message", "details"}}) and never throws raw errors.
 * Uses relative paths: Vite's dev proxy handles /api locally,
 * Caddy routes it in production — same origin either way.
 */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, {
      headers: { 'Content-Type': 'application/json' },
      ...init,
    });
  } catch {
    throw new ApiError(
      'network_error',
      'Could not reach the server. Check your connection and try again.',
    );
  }

  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const err = (body as ApiErrorBody | null)?.error;
    throw new ApiError(
      err?.code ?? 'unknown_error',
      err?.message ?? `Request failed with status ${response.status}.`,
      err?.details,
    );
  }
  return body as T;
}