import { site } from '../config/site';

export default function Footer() {
  const year = new Date().getFullYear();
  const links = [
    { href: site.links.github, label: 'GitHub' },
    { href: site.links.linkedin, label: 'LinkedIn' },
    { href: `mailto:${site.email}`, label: 'Email' },
  ];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-soft">
          © {year} {site.name} · {site.location}
        </p>
        <ul className="flex gap-5">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="font-mono text-xs text-soft transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}