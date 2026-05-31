#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const SITE = 'https://zerk-tool.ru';

const staticPaths = [
  '/',
  '/collection',
  '/nippers',
  '/scissors',
  '/nail-files',
  '/replaceable-files',
  '/nitrile-gloves',
  '/pushers',
  '/about',
  '/contacts',
];

function loadCatalog() {
  const sandbox = { window: {}, console };
  const ctx = vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(root, 'assets/zerk-routes.js'), 'utf8'), ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'assets/catalog-data.js'), 'utf8'), ctx);
  return sandbox.window.ZERK_CATALOG;
}

const catalog = loadCatalog();
const productPaths = (catalog?.products || []).map((p) => p.path || catalog.productUrl(p.id));
const urls = [...new Set([...staticPaths, ...productPaths])].sort();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((loc) => {
    const depth = loc.split('/').filter(Boolean).length;
    const priority = loc === '/' ? '1.0' : depth === 1 ? '0.9' : '0.8';
    return `  <url>
    <loc>${SITE}${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(root, 'sitemap.xml'), xml);
console.log(`sitemap.xml — ${urls.length} URLs`);
