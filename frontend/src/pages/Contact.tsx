import { useState, type FormEvent } from 'react';

import FormField from '../components/FormField';
import { ArrowUpRightIcon, CheckIcon, SpinnerIcon } from '../components/icons';
import { site } from '../config/site';
import { ApiError, apiFetch } from '../lib/api';
import type { FieldError } from '../types';

const EMPTY_FORM = { name: '', email: '', message: '' };

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface ErrorState {
  message: string;
  details?: FieldError[];
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<ErrorState | null>(null);

  const fieldError = (field: string) =>
    error?.details?.find((detail) => detail.field === field)?.message;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setError(null);
    try {
      await apiFetch<{ ok: boolean }>('/api/contact', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setStatus('success');
    } catch (err) {
      setError(
        err instanceof ApiError
          ? { message: err.message, details: err.details }
          : { message: 'Something went wrong. Please try again.' },
      );
      setStatus('error');
    }
  }

  function reset() {
    setForm(EMPTY_FORM);
    setError(null);
    setStatus('idle');
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <div className="grid gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-soft">Contact</p>
          <h1 className="mt-6 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            Let&rsquo;s make something <em className="text-accent">good</em>.
          </h1>
          <p className="mt-6 max-w-sm leading-relaxed text-soft">
            Questions, project ideas, or just a hello — the form is the fastest way to reach
            me. I usually reply within two working days.
          </p>
          <p className="mt-8">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 border-b border-accent pb-0.5 font-mono text-sm text-accent transition-opacity hover:opacity-75"
            >
              {site.email}
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </a>
          </p>
        </div>

        <div>
          {status === 'success' ? (
            <div
              role="status"
              className="flex h-full flex-col items-start justify-center border border-line p-8"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent text-accent">
                <CheckIcon className="h-5 w-5" />
              </span>
              <h2 className="mt-5 font-serif text-3xl tracking-tight">Message received.</h2>
              <p className="mt-3 leading-relaxed text-soft">
                Thanks for writing — I&rsquo;ll get back to you at the address you provided.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 border border-line px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] transition-colors hover:border-accent hover:text-accent"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6" aria-label="Contact form">
              {status === 'error' && (
                <div
                  role="alert"
                  className="border border-accent/60 bg-accent/10 px-4 py-3 text-sm leading-relaxed"
                >
                  {error?.message}
                </div>
              )}

              <FormField
                id="name"
                label="Name"
                value={form.name}
                onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
                error={fieldError('name')}
                placeholder="Ada Lovelace"
                autoComplete="name"
              />
              <FormField
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
                error={fieldError('email')}
                placeholder="ada@example.com"
                autoComplete="email"
              />
              <FormField
                id="message"
                label="Message"
                multiline
                rows={7}
                value={form.message}
                onChange={(value) => setForm((prev) => ({ ...prev, message: value }))}
                error={fieldError('message')}
                hint="10 – 2000 characters"
                placeholder="What are you building?"
              />

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex w-full items-center justify-center gap-2 bg-ink px-7 py-3.5 font-mono text-xs uppercase tracking-[0.22em] text-paper transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === 'submitting' ? (
                  <>
                    <SpinnerIcon className="h-4 w-4" /> Sending…
                  </>
                ) : (
                  'Send message'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}