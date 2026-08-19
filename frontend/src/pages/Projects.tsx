import { useEffect, useState } from 'react';

import ProjectRow from '../components/ProjectRow';
import { seedProjects } from '../config/seedProjects';
import { apiFetch } from '../lib/api';
import type { Project } from '../types';

type LoadState = 'loading' | 'live' | 'fallback';

export default function Projects() {
  const [state, setState] = useState<LoadState>('loading');
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let cancelled = false;
    apiFetch<Project[]>('/api/projects')
      .then((data) => {
        if (!cancelled) {
          setProjects(data);
          setState('live');
        }
      })
      .catch(() => {
        // Any failure — network, 5xx, malformed body — falls back to the
        // bundled snapshot so the page always renders real content.
        if (!cancelled) {
          setProjects(seedProjects);
          setState('fallback');
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const ordered = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-soft">Selected work</p>
          <h1 className="mt-6 font-serif text-4xl tracking-tight sm:text-5xl">Projects</h1>
        </div>
        <p className="font-mono text-xs text-faint">
          {ordered.length.toString().padStart(2, '0')} entries
        </p>
      </div>

      {state === 'fallback' && (
        <p
          role="status"
          className="mt-8 border border-line bg-ink/[0.03] px-4 py-3 font-mono text-xs leading-relaxed text-soft"
        >
          Live project data is temporarily unavailable — showing a local snapshot of the same
          list.
        </p>
      )}

      <div className="mt-10">
        {state === 'loading' ? (
          <SkeletonList />
        ) : (
          <ol className="border-b border-line">
            {ordered.map((project, index) => (
              <ProjectRow key={project.id} project={project} index={index} />
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

function SkeletonList() {
  return (
    <div role="status" aria-label="Loading projects" className="border-b border-line">
      {[0, 1, 2, 3].map((row) => (
        <div
          key={row}
          className="border-t border-line py-8 md:grid md:grid-cols-[3.5rem_minmax(0,1fr)] md:gap-6"
        >
          <div className="hidden h-5 w-8 animate-pulse bg-ink/10 md:block" />
          <div className="space-y-3">
            <div className="h-7 w-1/3 animate-pulse bg-ink/10" />
            <div className="h-4 w-full max-w-2xl animate-pulse bg-ink/10" />
            <div className="h-4 w-2/3 animate-pulse bg-ink/10" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading projects…</span>
    </div>
  );
}