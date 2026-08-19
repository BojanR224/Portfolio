import { site } from '../config/site';

export default function About() {
  const { about, experience } = site;

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-soft">About</p>
      <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
        {about.intro}
      </h1>

      <div className="mt-16 grid gap-12 md:grid-cols-[minmax(0,1fr)_280px]">
        <div className="max-w-prose space-y-6 text-soft leading-relaxed">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <figure>
          <img
            src={about.photoUrl}
            alt={about.photoAlt}
            width={640}
            height={800}
            loading="lazy"
            className="aspect-[4/5] w-full border border-line object-cover"
          />
          <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
            {about.photoCaption}
          </figcaption>
        </figure>
      </div>

      <div className="mt-20">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-soft">Experience</h2>
        <ul className="mt-6">
          {experience.map((job) => (
            <li
              key={`${job.org}-${job.period}`}
              className="grid gap-2 border-t border-line py-7 md:grid-cols-[140px_minmax(0,1fr)] md:gap-6"
            >
              <p className="font-mono text-xs text-faint md:pt-2">{job.period}</p>
              <div>
                <h3 className="font-serif text-2xl leading-snug">
                  {job.role} <span className="text-accent">· {job.org}</span>
                </h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-soft">{job.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-soft">
          Tools I reach for
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {about.skills.map((skill) => (
            <li key={skill} className="border border-line px-3 py-1.5 font-mono text-xs text-soft">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}