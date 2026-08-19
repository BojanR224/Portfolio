/* ----------------------------------------------------------------------------
   FALLBACK DATA — a bundled snapshot of backend/app/seed.json.
   Shown only when the API can't be reached (backend restarting, offline).
   Keep in sync with backend/app/seed.json when you edit your work.
---------------------------------------------------------------------------- */

import type { Project } from '../types';

export const seedProjects: Project[] = [
  {
    id: 1,
    title: 'Ledgerline',
    description:
      'Double-entry bookkeeping for small studios and freelancers. Imports bank CSVs, suggests categorisations, and produces clean quarterly reports without a spreadsheet in sight.',
    techStack: ['TypeScript', 'React', 'FastAPI', 'PostgreSQL'],
    repoUrl: 'https://github.com/adareeves/ledgerline',
    liveUrl: 'https://ledgerline.example.com',
    featured: true,
  },
  {
    id: 2,
    title: 'Fieldnote',
    description:
      "An offline-first field journal for naturalists. Records sightings with geotags and weather context, syncs opportunistically, and never loses an entry when the signal drops.",
    techStack: ['React', 'IndexedDB', 'Service Workers', 'Vite'],
    repoUrl: 'https://github.com/adareeves/fieldnote',
    liveUrl: null,
    featured: true,
  },
  {
    id: 3,
    title: 'Riverrun',
    description:
      "A tiny durable workflow engine on top of SQLite. Retries with backoff, a readable event log, and a single-file deployment story for teams that don't want Kafka.",
    techStack: ['Python', 'SQLite', 'asyncio'],
    repoUrl: 'https://github.com/adareeves/riverrun',
    liveUrl: null,
    featured: true,
  },
  {
    id: 4,
    title: 'Hearth',
    description:
      'Self-hosted recipe scaling and meal planning. Paste any recipe URL and get clean, structured ingredients that re-scale without arithmetic crimes.',
    techStack: ['TypeScript', 'React', 'FastAPI'],
    repoUrl: 'https://github.com/adareeves/hearth',
    liveUrl: 'https://hearth.example.com',
    featured: false,
  },
  {
    id: 5,
    title: 'Cadence',
    description:
      'A terminal dashboard for reading habits — sessions, pages, and streaks rendered in braille sparklines straight from a SQLite file.',
    techStack: ['Python', 'Rich', 'SQLite'],
    repoUrl: 'https://github.com/adareeves/cadence',
    liveUrl: null,
    featured: false,
  },
];