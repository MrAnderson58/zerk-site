/**
 * Injects static Organization + LocalBusiness JSON-LD into HTML pages (next to FAQ static).
 */
const fs = require('fs');
const vm = require('vm');

const ctx = { window: {} };
vm.runInContext(fs.readFileSync('assets/zerk-seo.js', 'utf8'), vm.createContext(ctx));
const seo = ctx.window.ZERK_SEO;

const org = JSON.stringify(seo.organizationSchema());
const lb = JSON.stringify(seo.localBusinessSchema());

const block = `  <script type="application/ld+json" id="zerk-schema-org-static">${org}</script>
  <script type="application/ld+json" id="zerk-schema-localbusiness-static">${lb}</script>
`;

const files = ['index.html', 'collection/index.html', 'catalog.html'];

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('zerk-schema-org-static')) {
    html = html.replace(
      /<script type="application\/ld\+json" id="zerk-schema-org-static">[\s\S]*?<\/script>\s*<script type="application\/ld\+json" id="zerk-schema-localbusiness-static">[\s\S]*?<\/script>\s*/,
      block
    );
  } else if (html.includes('zerk-schema-faq-static')) {
    html = html.replace(
      /<script type="application\/ld\+json" id="zerk-schema-faq-static">[\s\S]*?<\/script>/,
      (m) => `${m}\n${block}`
    );
  } else {
    html = html.replace('</head>', `${block}\n</head>`);
  }
  fs.writeFileSync(file, html);
  console.log('updated', file);
}
