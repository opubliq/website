// Post-build checks: (1) every internal link/asset in dist/ resolves to a file,
// (2) fr.json and en.json have the same key structure. Run: npm run build && npm run check-links
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

const dist = resolve('dist');
let errors = 0;

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

function resolves(target) {
  const clean = decodeURIComponent(target.split('#')[0].split('?')[0]);
  const p = join(dist, clean);
  if (clean.endsWith('/')) return existsSync(join(p, 'index.html'));
  return existsSync(p) || existsSync(join(p, 'index.html'));
}

const htmlFiles = walk(dist).filter((f) => f.endsWith('.html'));
let checked = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/\s(?:href|src|srcset)="([^"]+)"/g)) {
    for (let url of m[1].split(',').map((s) => s.trim().split(' ')[0])) {
      if (!url || /^(https?:|mailto:|tel:|#|data:)/.test(url)) continue;
      if (!url.startsWith('/')) url = '/' + join(dirname(file.slice(dist.length)), url);
      checked++;
      if (!resolves(url)) {
        errors++;
        console.error(`BROKEN ${url}  (in ${file.slice(dist.length)})`);
      }
    }
  }
  if (html.includes('https://opubliq.com') && /url=(\/[^"]*)"/.test(html)) {
    const target = html.match(/url=(\/[^"]*)"/)[1];
    checked++;
    if (!resolves(target)) { errors++; console.error(`BROKEN redirect ${target} (in ${file})`); }
  }
}

function keys(obj, prefix = '') {
  if (Array.isArray(obj)) return obj.flatMap((v, i) => keys(v, `${prefix}[${i}]`));
  if (obj && typeof obj === 'object')
    return Object.entries(obj).flatMap(([k, v]) => [`${prefix}.${k}`, ...keys(v, `${prefix}.${k}`)]);
  return [];
}
const fr = new Set(keys(JSON.parse(readFileSync('src/content/copy/fr.json', 'utf8'))));
const en = new Set(keys(JSON.parse(readFileSync('src/content/copy/en.json', 'utf8'))));
for (const k of fr) if (!en.has(k)) { errors++; console.error(`en.json missing ${k}`); }
for (const k of en) if (!fr.has(k)) { errors++; console.error(`fr.json missing ${k}`); }

console.log(`${htmlFiles.length} HTML files, ${checked} internal links checked, ${errors} problem(s).`);
process.exit(errors ? 1 : 0);
