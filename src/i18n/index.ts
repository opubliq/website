import fr from '../content/copy/fr.json';
import en from '../content/copy/en.json';

export const locales = ['fr', 'en'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'fr';

/** BCP 47 tags used for <html lang>, hreflang and og:locale. */
export const langTags: Record<Lang, string> = { fr: 'fr-CA', en: 'en-CA' };

export type Copy = typeof fr;
const copies: Record<Lang, Copy> = { fr, en: en as Copy };

/** All translatable text for a locale (edit src/content/copy/<lang>.json). */
export function getCopy(lang: Lang): Copy {
  return copies[lang];
}

/**
 * Route table: every page has one entry with its path in each locale.
 * The FR/EN toggle and hreflang tags use this to link a page to its counterpart.
 * To rename a URL, change it here AND rename the matching file in src/pages/.
 */
export const routes = {
  home: { fr: '/', en: '/en/' },
  services: { fr: '/services/', en: '/en/services/' },
  work: { fr: '/realisations/', en: '/en/work/' },
  team: { fr: '/equipe/', en: '/en/team/' },
  about: { fr: '/a-propos/', en: '/en/about/' },
  contact: { fr: '/contact/', en: '/en/contact/' },
  privacy: { fr: '/confidentialite/', en: '/en/privacy/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

export function path(key: RouteKey, lang: Lang): string {
  return routes[key][lang];
}

export function otherLang(lang: Lang): Lang {
  return lang === 'fr' ? 'en' : 'fr';
}

/** Path of a team member's CV page, e.g. /equipe/hubert-cadieux/ (slug comes from "slug" in the copy files). */
export function personPath(slug: string, lang: Lang): string {
  return `${routes.team[lang]}${slug}/`;
}

/** Main navigation order (header and footer). */
export const navKeys = ['services', 'work', 'team', 'about', 'contact'] as const satisfies readonly RouteKey[];

/** Label/value separator: French typography uses a non-breaking space before the colon. */
export function colon(lang: Lang): string {
  return lang === 'fr' ? ' : ' : ': ';
}
