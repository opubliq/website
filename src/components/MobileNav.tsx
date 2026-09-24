import { useEffect, useId, useState } from 'react';
import { icons } from './icons';

interface NavLink {
  href: string;
  label: string;
  current: boolean;
}

interface Props {
  links: NavLink[];
  lang: { href: string; label: string; short: string; hreflang: string };
  openLabel: string;
  closeLabel: string;
}

function Svg({ name }: { name: keyof typeof icons }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: icons[name] }}
    />
  );
}

/** Hamburger menu shown below the `md` breakpoint. */
export default function MobileNav({ links, lang, openLabel, closeLabel }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="-mr-2 inline-flex items-center justify-center rounded-button p-2 text-white hover:text-brand-soft"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
      >
        <Svg name={open ? 'close' : 'menu'} />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-t border-white/10 bg-ink shadow-xl"
      >
        <nav className="container-page flex flex-col py-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={l.current ? 'page' : undefined}
              className={
                'border-b border-white/10 py-3 text-base font-medium ' +
                (l.current ? 'text-brand-soft' : 'text-white hover:text-brand-soft')
              }
            >
              {l.label}
            </a>
          ))}
          <a
            href={lang.href}
            hrefLang={lang.hreflang}
            lang={lang.hreflang}
            className="py-3 text-base font-medium text-on-dark-muted hover:text-brand-soft"
          >
            {lang.label}
          </a>
        </nav>
      </div>
    </div>
  );
}
