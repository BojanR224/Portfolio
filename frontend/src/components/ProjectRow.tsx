import type { ReactNode } from 'react';

import type { Project } from '../types';
import { ArrowUpRightIcon } from './icons';

interface Props {
  project: Project;
  index: number;
}

export default function ProjectRow({ project, index }: Props) {
  return (
    <li className="group grid gap-3 border-t border-line py-8 transition-colors hover:bg-ink/[0.02] md:grid-cols-[3.5rem_minmax(0,1fr)] md:gap-6 md:py-10">
      <span aria-hidden="true" className="font-mono text-sm text-accent md:pt-2">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h2 className="font-serif text-2xl leading-snug transition-colors group-hover:text-accent sm:text-3xl">
            {project.title}
          </h2>
          {project.featured && (
            <span className="border border-accent/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              Featured
            </span>
          )}
        </div>

        <p className="mt-3 max-w-2xl leading-relaxed text-soft">{project.description}</p>

        {project.techStack.length > 0 && (
          <ul
            className="mt-4 flex flex-wrap gap-2"
            aria-label={`Technologies used in ${project.title}`}
          >
            {project.techStack.map((tech) => (
              <li key={tech} className="border border-line px-2.5 py-1 font-mono text-[11px] text-soft">
                {tech}
              </li>
            ))}
          </ul>
        )}

        {(project.repoUrl || project.liveUrl) && (
          <div className="mt-5 flex flex-wrap gap-6">
            {project.repoUrl && <ExternalLink href={project.repoUrl}>Repository</ExternalLink>}
            {project.liveUrl && <ExternalLink href={project.liveUrl}>Live site</ExternalLink>}
          </div>
        )}
      </div>
    </li>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-soft transition-colors hover:text-accent"
    >
      {children}
      <ArrowUpRightIcon className="h-3.5 w-3.5" />
    </a>
  );
}