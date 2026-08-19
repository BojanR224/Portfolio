/* ============================================================================
   ✏️  EDIT ME — YOUR ENTIRE SITE'S CONTENT LIVES IN THIS ONE FILE
   ----------------------------------------------------------------------------
   Name, bio, links, experience, skills: change them here and only here.
   The only other place content appears is `src/config/seedProjects.ts`
   (the offline fallback copy of your project list) — keep those two in
   sync with `backend/app/seed.json` when you edit your work history.
============================================================================ */

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  summary: string;
}

export const site = {
  name: 'Ada Reeves',
  role: 'Full-Stack Engineer',
  location: 'Lisbon, Portugal',
  focus: 'Fast, boring, reliable systems',
  availability: 'Open to select freelance work',
  email: 'hello@adareeves.dev',
  links: {
    github: 'https://github.com/adareeves',
    linkedin: 'https://www.linkedin.com/in/adareeves',
  },

  home: {
    headlineBefore: 'I build quiet,',
    headlineAccent: 'precise',
    headlineAfter: 'software that outlives trends.',
    bio: "I'm a full-stack engineer with nine years of shipped products — bookkeeping tools, offline-first apps, and small durable systems. I care about the parts users never see: correctness, latency, and the absence of surprises.",
  },

  about: {
    intro: 'Engineer of small, dependable software. Reluctant adopter of complexity.',
    paragraphs: [
      "I started out writing Python for a climate research group, where a bug meant a wasted field season — that's where the preference for boring, observable systems comes from. Since then I've built products at a design studio, a fintech, and as an independent contractor.",
      "Most of my work sits in the unglamorous middle: APIs that don't wake anyone at night, data models that survive a pivot, interfaces that stay fast on a three-year-old phone. I prototype quickly, then delete aggressively.",
      'Away from the keyboard I keep a naturalist\u2019s journal, bake sourdough with mixed results, and maintain a stubborn reading habit.',
    ],
    photoUrl: 'https://picsum.photos/seed/adareeves-portrait/640/800.jpg',
    photoAlt: 'Portrait of Ada Reeves',
    photoCaption: 'Lisbon, this spring',
    skills: [
      'TypeScript',
      'React',
      'Python',
      'FastAPI',
      'SQLAlchemy',
      'PostgreSQL',
      'SQLite',
      'Docker',
      'Caddy',
      'Playwright',
    ],
  },

  experience: [
    {
      role: 'Independent Engineer',
      org: 'Contract work',
      period: '2021 — now',
      summary:
        'Designing and shipping full-stack products for small teams. Recent highlights: a bookkeeping platform for design studios and an offline-first field journal.',
    },
    {
      role: 'Senior Backend Engineer',
      org: 'Tally Systems',
      period: '2018 — 2021',
      summary:
        'Led the payments reconciliation service. Cut nightly batch failures by 90% and made the on-call rotation survivable.',
    },
    {
      role: 'Software Engineer',
      org: 'Meridian Studio',
      period: '2016 — 2018',
      summary:
        'Built interactive data stories and editorial tools for newsroom clients; learned that performance budgets are a design constraint.',
    },
  ] as ExperienceItem[],
};