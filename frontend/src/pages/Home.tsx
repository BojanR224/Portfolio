import { Link } from 'react-router-dom';

import { site } from '../config/site';

export default function Home() {
  const facts = [
    { term: 'Now', desc: site.role },
    { term: 'Based in', desc: site.location },
    { term: 'Focus', desc: site.focus },
  ];

  return (
    <section className="mx-auto max-w-5xl px-6">
      <div className="py-20 sm:py-28">
        <p className="rise rise-1 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-soft">
          <span
            className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent"
            aria-hidden="true"
          />
          {site.availability}
        </p>

        <h1 className="rise rise-2 mt-8 max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          {site.home.headlineBefore}{' '}
          <em className="text-accent">{site.home.headlineAccent}</em>{' '}
          {site.home.headlineAfter}
        </h1>

        <p className="rise rise-3 mt-8 max-w-xl text-lg leading-relaxed text-soft">
          {site.home.bio}
        </p>

        <div className="rise rise-4 mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/projects"
            className="bg-ink px-7 py-3.5 text-center font-mono text-xs uppercase tracking-[0.22em] text-paper transition-colors hover:bg-accent"
          >
            View Work
          </Link>
          <Link
            to="/contact"
            className="border border-line px-7 py-3.5 text-center font-mono text-xs uppercase tracking-[0.22em] transition-colors hover:border-accent hover:text-accent"
          >
            Contact
          </Link>
        </div>
      </div>

      <dl className="grid gap-8 border-t border-line sm:grid-cols-3">
        {facts.map((fact) => (
          <div
            key={fact.term}
            className="py-6 sm:py-8 sm:border-l sm:border-line sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
          >
            <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
              {fact.term}
            </dt>
            <dd className="mt-2 font-serif text-xl leading-snug">{fact.desc}</dd>
          </div>
        ))}
      </dl>
      <div className="border-t border-line" />
    </section>
  );
}