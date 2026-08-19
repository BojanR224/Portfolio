import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-start justify-center px-6">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">404</p>
      <h1 className="mt-6 font-serif text-4xl tracking-tight sm:text-5xl">
        Nothing lives here.
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-soft">
        The page you&rsquo;re after doesn&rsquo;t exist — the URL may have changed.
      </p>
      <Link
        to="/"
        className="mt-8 border border-line px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] transition-colors hover:border-accent hover:text-accent"
      >
        Back home
      </Link>
    </section>
  );
}