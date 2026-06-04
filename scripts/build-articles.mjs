#!/usr/bin/env node
/**
 * Генерация статических страниц /articles из scripts/article-contents/
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ARTICLE_CONTENTS } from './article-contents/index.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const SITE = 'https://zerk-tool.ru';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderSections(sections) {
  return sections
    .map((block) => {
      if (block.type === 'h2') return `<h2>${block.html || escapeHtml(block.text)}</h2>`;
      if (block.type === 'h3') return `<h3>${block.html || escapeHtml(block.text)}</h3>`;
      if (block.type === 'p') return `<p>${block.html || escapeHtml(block.text)}</p>`;
      if (block.type === 'ul') {
        const items = (block.items || [])
          .map((it) => `<li>${it.html || escapeHtml(it)}</li>`)
          .join('');
        return `<ul>${items}</ul>`;
      }
      return '';
    })
    .join('\n');
}

function renderFaq(faq) {
  if (!faq?.length) return '';
  const items = faq
    .map(
      (item) => `
      <details>
        <summary>${escapeHtml(item.q)}</summary>
        <div class="article-faq__answer"><p>${escapeHtml(item.a)}</p></div>
      </details>`
    )
    .join('');
  return `<section class="article-faq" aria-labelledby="article-faq-title">
    <h2 id="article-faq-title">Частые вопросы</h2>
    ${items}
  </section>`;
}

function renderLinksBox(article) {
  const links = [
    { href: '/collection', label: 'Коллекция ZERK TOOL' },
    { href: article.categoryHref, label: article.categoryLabel },
    ...(article.products || []).map((p) => ({ href: p.href, label: p.label })),
  ];
  return `<aside class="article-links-box" aria-label="Полезные ссылки">
    <h2>Инструмент ZERK TOOL в каталоге</h2>
    <ul>
      ${links.map((l) => `<li><a href="${l.href}">${escapeHtml(l.label)}</a></li>`).join('\n')}
    </ul>
  </aside>`;
}

function articleSchema(article, canonical) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.h1,
    description: article.metaDescription,
    image: `${SITE}${article.image}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: { '@type': 'Organization', name: 'ZERK TOOL', url: SITE },
    publisher: {
      '@type': 'Organization',
      name: 'ZERK TOOL',
      logo: { '@type': 'ImageObject', url: `${SITE}/images/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  };
}

function breadcrumbSchema(article, canonical) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Статьи', item: `${SITE}/articles` },
      { '@type': 'ListItem', position: 3, name: article.h1, item: canonical },
    ],
  };
}

function faqSchema(faq) {
  if (!faq?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

function pageShell({
  title,
  metaDescription,
  canonical,
  ogImage,
  bodyClass,
  mainHtml,
  extraJsonLd = [],
  ogType = 'article',
}) {
  const jsonLd = extraJsonLd.filter(Boolean).map((obj) =>
    `  <script type="application/ld+json">${JSON.stringify(obj)}</script>`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(metaDescription)}">
  <link rel="canonical" href="${canonical}">
  <meta name="theme-color" content="#000000">
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" href="/images/favicon.svg" type="image/svg+xml">
  <meta property="og:type" content="${ogType}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(metaDescription)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:site_name" content="ZERK TOOL">
  <meta property="og:locale" content="ru_RU">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(metaDescription)}">
  <meta name="twitter:image" content="${ogImage}">
  <link rel="stylesheet" href="/assets/zerk.css">
  <link rel="stylesheet" href="/assets/zerk-mobile.css">
  <link rel="stylesheet" href="/assets/zerk-cart.css">
  <link rel="stylesheet" href="/assets/zerk-articles.css">
  <!-- Yandex.Metrika: загрузка через /assets/zerk-boot.js (не блокирует Safari) -->
  <noscript>
    <div>
      <img src="https://mc.yandex.ru/watch/45587271" style="position: absolute; left: -9999px" alt="" />
    </div>
  </noscript>
</head>
<body class="${bodyClass}">
  <div class="bg" aria-hidden="true"><div class="bg-mesh"></div><div class="bg-sweep"></div><div class="bg-grain"></div><div class="bg-vignette"></div></div>
  <div id="zerk-header"></div>
  <main>
${mainHtml}
  </main>
  <div id="zerk-footer"></div>
  <script src="/assets/zerk-routes.js" defer></script>
  <script src="/assets/catalog-data.js" defer></script>
  <script src="/assets/zerk-seo.js" defer></script>
  <script src="/assets/zerk.js" defer></script>
  <script src="/assets/zerk-shell.js" defer></script>
  <script src="/assets/zerk-cart.js" defer></script>
${jsonLd}
  <script type="application/ld+json" id="zerk-schema-org-static">{"@context":"https://schema.org","@type":"Organization","name":"ZERK TOOL","alternateName":["ZERK","ZERK TOOL"],"url":"https://zerk-tool.ru","logo":"https://zerk-tool.ru/images/logo.png","image":"https://zerk-tool.ru/images/logo.png","telephone":"+7-925-770-08-03","description":"Профессиональный маникюрный инструмент ZERK TOOL: кусачки, ножницы, пилки-файлы.","address":{"@type":"PostalAddress","addressCountry":"RU","addressLocality":"Penza, Suvorova 92"},"sameAs":["https://t.me/Mr_Anderson_pnz","https://wa.me/79257700803"]}</script>
  <script src="/assets/zerk-boot.js" defer></script>
</body>
</html>`;
}

function renderArticlePage(article) {
  const canonical = `${SITE}/articles/${article.slug}`;
  const ogImage = `${SITE}${article.image}`;
  const breadcrumbs = `<nav class="breadcrumbs" aria-label="Хлебные крошки">
    <a href="/">Главная</a><span aria-hidden="true">/</span>
    <a href="/articles">Статьи</a><span aria-hidden="true">/</span>
    <span aria-current="page">${escapeHtml(article.h1)}</span>
  </nav>`;

  const cta = `<section class="article-cta" aria-label="Заказать инструмент">
    <h2>Готовы подобрать инструмент для профессионального маникюра?</h2>
    <p>Официальный каталог ZERK TOOL: кусачки, ножницы, сменные файлы и аксессуары с доставкой и консультацией мастера.</p>
    <div class="article-cta__actions">
      <a href="/collection" class="btn-primary">Открыть каталог</a>
      <a href="${article.categoryHref}" class="btn-secondary">${escapeHtml(article.categoryLabel)}</a>
      <a href="https://t.me/Mr_Anderson_pnz" class="btn-secondary" rel="noopener noreferrer" target="_blank">Написать в Telegram</a>
    </div>
  </section>`;

  const mainHtml = `
    ${breadcrumbs}
    <article class="article-header">
      <h1>${escapeHtml(article.h1)}</h1>
      <p class="article-meta"><time datetime="${article.datePublished}">Опубликовано: ${article.datePublished}</time> · ZERK TOOL</p>
      <img class="article-cover" src="${article.image}" width="1200" height="630" alt="${escapeHtml(article.imageAlt || article.h1)}" loading="eager" decoding="async">
    </article>
    <div class="article-body">
      <p class="article-lead">${article.lead.html || escapeHtml(article.lead)}</p>
      ${renderSections(article.sections)}
      ${renderLinksBox(article)}
      ${renderFaq(article.faq)}
      ${cta}
    </div>`;

  return pageShell({
    title: article.title,
    metaDescription: article.metaDescription,
    canonical,
    ogImage,
    bodyClass: 'article-page',
    mainHtml,
    extraJsonLd: [
      articleSchema(article, canonical),
      breadcrumbSchema(article, canonical),
      faqSchema(article.faq),
    ],
  });
}

function renderArticlesIndex(articlesMeta) {
  const canonical = `${SITE}/articles`;
  const breadcrumbs = `<nav class="breadcrumbs" aria-label="Хлебные крошки">
    <a href="/">Главная</a><span aria-hidden="true">/</span>
    <span aria-current="page">Статьи</span>
  </nav>`;

  const cards = articlesMeta
    .map(
      (a) => `
    <article class="article-card">
      <a href="/articles/${a.slug}"><img class="article-card__img" src="${a.image}" alt="" width="400" height="250" loading="lazy" decoding="async"></a>
      <div class="article-card__body">
        <h2 class="article-card__title"><a href="/articles/${a.slug}">${escapeHtml(a.h1)}</a></h2>
        <p class="article-card__excerpt">${escapeHtml(a.excerpt)}</p>
        <a class="article-card__link" href="/articles/${a.slug}">Читать статью →</a>
      </div>
    </article>`
    )
    .join('');

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Статьи ZERK TOOL',
    itemListElement: articlesMeta.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE}/articles/${a.slug}`,
      name: a.h1,
    })),
  };

  const articleSchemas = articlesMeta.map((a) =>
    articleSchema(
      {
        h1: a.h1,
        metaDescription: a.metaDescription,
        image: a.image,
        datePublished: a.datePublished,
      },
      `${SITE}/articles/${a.slug}`
    )
  );

  const mainHtml = `
    ${breadcrumbs}
    <header class="articles-hero">
      <h1>Статьи ZERK TOOL для мастеров маникюра</h1>
      <p class="articles-hero__lead">Практические материалы о выборе кусачек для кутикулы, маникюрных ножниц, пилок для ногтей, сменных файлов, стерилизации инструмента и уходе за профессиональным маникюрным инструментом.</p>
    </header>
    <div class="articles-grid">${cards}</div>`;

  return pageShell({
    title: 'Статьи ZERK TOOL — гиды по маникюрному инструменту',
    metaDescription:
      'Полезные статьи ZERK TOOL: как выбрать кусачки и ножницы, абразивы 100–240 grit, сменные файлы, стерилизация и японская сталь. Для мастеров и салонов.',
    canonical,
    ogImage: `${SITE}/images/nippers-main.jpg`,
    bodyClass: 'articles-page',
    ogType: 'website',
    mainHtml,
    extraJsonLd: [
      breadcrumbSchema({ h1: 'Статьи', datePublished: '2026-05-15' }, canonical),
      itemListSchema,
      ...articleSchemas,
    ],
  });
}

function countWords(text) {
  return String(text)
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

function stripHtml(s) {
  return String(s).replace(/<[^>]+>/g, ' ');
}

function articleWordCount(article) {
  const lead =
    typeof article.lead === 'string'
      ? article.lead
      : article.lead?.html || article.lead?.text || '';
  const parts = [
    stripHtml(lead),
    ...(article.sections || []).flatMap((s) => {
      if (s.type === 'p') return [stripHtml(s.text || s.html || '')];
      if (s.type === 'ul') return (s.items || []).map((it) => stripHtml(it));
      return [stripHtml(s.text || s.html || '')];
    }),
    ...(article.faq || []).flatMap((f) => [f.q, f.a]),
  ];
  return countWords(parts.join(' '));
}

// Build
const articlesDir = path.join(root, 'articles');
fs.mkdirSync(articlesDir, { recursive: true });

const metaForIndex = [];

for (const article of ARTICLE_CONTENTS) {
  const words = articleWordCount(article);
  if (words < 1500 || words > 2600) {
    console.warn(`⚠ ${article.slug}: ${words} слов (цель 1500–2500)`);
  } else {
    console.log(`✓ ${article.slug}: ${words} слов`);
  }

  const dir = path.join(articlesDir, article.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderArticlePage(article));

  metaForIndex.push({
    slug: article.slug,
    h1: article.h1,
    excerpt: article.excerpt,
    image: article.image,
    title: article.title,
    metaDescription: article.metaDescription,
    datePublished: article.datePublished,
  });
}

fs.writeFileSync(path.join(articlesDir, 'index.html'), renderArticlesIndex(metaForIndex));
console.log(`\nСгенерировано: articles/index.html + ${ARTICLE_CONTENTS.length} статей`);
