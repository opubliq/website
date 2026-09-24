# Opubliq website

Static bilingual site for Opubliq inc. (opubliq.com), built with Astro + React + Tailwind CSS v4, deployed to GitHub Pages by `.github/workflows/deploy.yml` on push to `main`.

## Commands
- `npm install` then `npm run dev` (http://localhost:4321)
- `npm run build` -> `dist/`; `npm run preview` to serve it (`npx astro preview stop` to stop)
- `npm run check-links` (after build): broken internal links + FR/EN copy key parity

## Where things live
- Copy (all translatable text): `src/content/copy/fr.json`, `src/content/copy/en.json` (same keys in both)
- Privacy policy: `src/content/legal/{fr,en}/privacy.md`
- Company facts (legal name, NEQ, email, phone, links): `src/data/company.json`
- URLs per locale + nav order: `src/i18n/index.ts` (`routes`); page files in `src/pages/` and `src/pages/en/`
- Page layouts: `src/views/*.astro` (one per page, shared by both locales)
- Design tokens (colours, fonts, radii, widths): `@theme` block in `src/styles/global.css`
- Images: `src/assets/` (optimized at build); static files (CNAME, OG image, legacy redirects) in `public/`
