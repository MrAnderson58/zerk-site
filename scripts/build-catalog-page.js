const fs = require('fs');
const vm = require('vm');
const code = fs.readFileSync('assets/zerk-faq-data.js', 'utf8');
const ctx = { window: {} };
vm.runInContext(code, vm.createContext(ctx));
const d = ctx.window.ZERK_FAQ_DATA;
const catHtml = d.buildPremiumFaqHtml(d.CATALOG, {
  title: 'Каталог ZERK TOOL — частые вопросы мастеров',
  lead:
    'Помощь в выборе кусачек IL, ножниц Solingen, пилок 100–240 grit и сменных файлов в официальном каталоге zerk-tool.ru.',
  titleId: 'catalog-faq-title',
});
const ld = JSON.stringify(d.faqJsonLd(d.PREMIUM));

const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Каталог ZERK TOOL — кусачки, ножницы, пилки-файлы | FAQ</title>
  <meta name="description" content="Каталог профессионального маникюрного инструмента ZERK TOOL: кусачки для кутикулы, ножницы, пилки-файлы, сменные абразивы. Ответы на частые вопросы мастеров.">
  <meta name="keywords" content="каталог zerk tool, кусачки для кутикулы, маникюрные ножницы, пилки-файлы, сменные файлы">
  <link rel="canonical" href="https://zerk-tool.ru/catalog">
  <meta name="theme-color" content="#000000">
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="stylesheet" href="/assets/zerk.css">
  <link rel="stylesheet" href="/assets/zerk-faq.css">
  <script type="application/ld+json" id="zerk-schema-faq-static">${ld}</script>
</head>
<body>
  <div class="bg" aria-hidden="true"><div class="bg-mesh"></div><div class="bg-sweep"></div><div class="bg-grain"></div><div class="bg-vignette"></div></div>
  <div id="zerk-header"></div>
  <main>
    <section class="category-hero" style="padding: clamp(100px, 14vw, 140px) 24px 48px; max-width: var(--max-w); margin: 0 auto;">
      <p class="category-hero__eyebrow">ZERK TOOL</p>
      <h1>Каталог профессионального маникюрного инструмента</h1>
      <p class="category-hero__intro">Кусачки IL, ножницы Solingen, пилки-файлы, пушеры и перчатки Glovity — официальный каталог zerk-tool.ru.</p>
      <a href="/collection" class="btn btn-primary">Открыть коллекцию</a>
    </section>
    <section class="zerk-faq zerk-faq--premium" aria-labelledby="catalog-faq-title" data-faq-reveal>
      <div id="catalogFaq">${catHtml.trim()}</div>
    </section>
  </main>
  <div id="zerk-footer"></div>
  <script src="/assets/zerk-routes.js" defer></script>
  <script src="/assets/catalog-data.js" defer></script>
  <script src="/assets/zerk-faq-data.js" defer></script>
  <script src="/assets/zerk-seo.js" defer></script>
  <script src="/assets/zerk-faq.js" defer></script>
  <script src="/assets/zerk-shell.js" defer></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      window.ZERK_SEO?.initCatalogPage?.();
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('catalog.html', html);
console.log('Wrote catalog.html');
