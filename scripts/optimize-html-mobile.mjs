import fs from 'fs';
import path from 'path';

const root = process.cwd();
const metrikaDefer = fs.readFileSync('assets/partials/yandex-metrika-defer.html', 'utf8');

const htmlFiles = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (name.endsWith('.html')) htmlFiles.push(p);
  }
}
walk(root);

const metrikaBlock =
  /[\s]*<!-- Yandex\.Metrika counter -->[\s\S]*?<!-- \/Yandex\.Metrika counter -->/;

const jsonLdScripts = [];
function extractJsonLd(html) {
  const re = /<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*/g;
  const found = html.match(re) || [];
  return { found, stripped: html.replace(re, '') };
}

for (const file of htmlFiles) {
  if (file.includes('assets/partials') || file.endsWith('googlec9d2a993ca7c401d.html')) continue;
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (metrikaBlock.test(html)) {
    html = html.replace(metrikaBlock, '\n' + metrikaDefer);
    changed = true;
  }

  if (!html.includes('zerk-mobile.css')) {
    html = html.replace(
      /<link rel="stylesheet" href="\/assets\/zerk\.css">/,
      '<link rel="stylesheet" href="/assets/zerk.css">\n  <link rel="stylesheet" href="/assets/zerk-mobile.css">'
    );
    changed = true;
  }

  html = html.replace(
    /<link rel="stylesheet" href="\/assets\/zerk-assistant\.css[^"]*">\s*/g,
    ''
  );
  html = html.replace(/<script src="\/assets\/zerk-assistant\.js[^"]*" defer><\/script>\s*/g, '');
  html = html.replace(
    /<script>window\.ZERK_ASSISTANT_CONFIG[\s\S]*?<\/script>\s*/g,
    ''
  );

  html = html.replace(
    /<link rel="preload" href="\/images\/nippers-main\.jpg"[^>]*>\s*/g,
    '<link rel="preload" href="/images/nippers-main-mobile.jpg" as="image" type="image/jpeg" media="(max-width: 768px)">\n  <link rel="preload" href="/images/nippers-main.jpg" as="image" type="image/jpeg" media="(min-width: 769px)">\n'
  );

  const { found, stripped } = extractJsonLd(html);
  if (found.length) {
    html = stripped.replace(/\n{3,}/g, '\n\n');
    if (!html.includes('zerk-boot.js')) {
      html = html.replace(
        /<\/body>/i,
        `${found.join('\n  ')}\n  <script src="/assets/zerk-boot.js" defer></script>\n</body>`
      );
    }
    changed = true;
  } else if (!html.includes('zerk-boot.js')) {
    html = html.replace(/<\/body>/i, '  <script src="/assets/zerk-boot.js" defer></script>\n</body>');
    changed = true;
  }

  if (!html.includes('zerk-boot.js')) {
    const schema = fs.readFileSync('assets/partials/schema-jsonld.html', 'utf8');
    html = html.replace(/<\/body>/i, `${schema}  <script src="/assets/zerk-boot.js" defer></script>\n</body>`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, html);
    console.log('optimized', file);
  }
}
