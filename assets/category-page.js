/**
 * ZERK TOOL — category & static pages
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const routes = window.ZERK_ROUTES;
    const catalog = window.ZERK_CATALOG;
    const seo = window.ZERK_SEO;
    if (!routes || !catalog) return;

    const key = document.body.dataset.categoryPage;
    const config = routes.CATEGORIES[key];
    if (!config) return;

    const isCollection = key === 'collection';

    let faqItems = [];
    if (seo?.applyCategoryPage) {
      faqItems = seo.getCategoryFaq(config.cat || key) || seo.FAQ.catalog;
      seo.applyCategoryPage(config, key);
    } else {
      document.title = config.title;
    }

    const hero = document.getElementById('categoryHero');
    if (hero) {
      hero.innerHTML = `
        <nav class="breadcrumbs" aria-label="Хлебные крошки" id="categoryBreadcrumbs"></nav>
        <div class="category-hero__eyebrow">ZERK TOOL</div>
        <h1 id="category-h1">${config.h1}</h1>
        <p class="category-hero__intro">${config.intro}</p>
        ${config.cta ? `<a href="${config.cta.href}" class="btn btn-primary">${config.cta.label}</a>` : ''}
      `;
      seo?.renderBreadcrumbs?.(document.getElementById('categoryBreadcrumbs'), [
        { name: 'ZERK TOOL', url: '/' },
        isCollection ? null : { name: 'Коллекция', url: '/collection' },
        { name: config.label, url: config.path },
      ].filter(Boolean));
    }

    const grid = document.getElementById('categoryGrid');
    const links = document.getElementById('categoryLinks');

    if (links && isCollection) {
      links.innerHTML = Object.entries(routes.CATEGORIES)
        .filter(([k]) => !['collection', 'about', 'contacts'].includes(k))
        .map(
          ([, c]) => `
        <a href="${c.path}" class="category-link-card glass">
          <h2>${c.label}</h2>
          <p>${c.description?.slice(0, 100) || c.intro.slice(0, 100)}…</p>
          <span class="category-link-card__cta">Смотреть →</span>
        </a>`
        )
        .join('');
    }

    if (grid && config.grid && config.cat) {
      const items = catalog.products.filter((p) => p.cat === config.cat);
      grid.innerHTML = items.map((p, i) => renderCard(p, catalog, i)).join('');
      bindCatalogCards(grid);
    } else if (grid && isCollection) {
      grid.innerHTML = catalog.products.map((p, i) => renderCard(p, catalog, i)).join('');
      bindCatalogCards(grid);
    }

    if (key === 'about' || key === 'contacts') {
      const extra = document.getElementById('categoryStatic');
      if (extra) {
        extra.innerHTML =
          key === 'about'
            ? `<div class="category-static glass">
                <h2>О бренде ZERK</h2>
                <p>Мы объехали полмира в поисках лучших и ответственных производителей маникюрного инструмента — партнёров, которые собирают отзывы мастеров со всего мира и открыто дорабатывают серии по результатам салонной работы.</p>
                <p>ZERK — японская сталь SUS 420 J2, ручная заточка, контроль качества и эстетика luxury beauty. В коллекции также ножницы Solingen, пилки-файлы, пушеры и перчатки <strong>Glovity</strong>.</p>
              </div>`
            : `<div class="category-static glass">
                <h2>Заказ ZERK TOOL</h2>
                <p>Telegram, WhatsApp, ВКонтакте или телефон <a href="tel:+79257700803">+7 (925) 770-08-03</a>.</p>
                <p>Укажите артикул из URL товара, например <a href="/nippers/il-07/5-mm">IL-07 · 5 мм</a>.</p>
              </div>`;
      }
    }

    const faqEl = document.getElementById('categoryFaq');
    if (faqEl && seo?.renderFaq && faqItems.length) {
      seo.renderFaq(faqEl, faqItems);
    }

    const related = document.getElementById('categoryCross');
    if (related && config.cat) {
      const others = Object.values(routes.CATEGORIES).filter(
        (c) => c.grid && c.path !== config.path
      );
      related.innerHTML = `
        <h2 class="section-title">Другие категории ZERK TOOL</h2>
        <div class="category-cross__grid">
          ${others
            .map(
              (c) => `
            <a href="${c.path}" class="category-cross__card glass">
              <span>${c.label}</span>
            </a>`
            )
            .join('')}
        </div>`;
    }

    document.body.classList.add('is-loaded');
  });

  function bindCatalogCards(grid) {
    window.Zerk?.observeCards?.('.catalog-card');
    window.ZERK_CART?.bindAddButtons?.();

    const isLocalHost =
      location.hostname === 'localhost' || location.hostname === '127.0.0.1';

    if (isLocalHost) {
      grid.querySelectorAll('.catalog-card__link').forEach((link) => {
        if (link.dataset.navBound) return;
        link.dataset.navBound = '1';
        link.addEventListener('click', (e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
          const href = link.getAttribute('href');
          if (!href || href === '/collection') return;

          e.preventDefault();
          fetch(href, { method: 'HEAD', redirect: 'follow' })
            .then((res) => {
              if (res.ok) window.location.assign(href);
              else window.location.assign(`/product/?path=${encodeURIComponent(href)}`);
            })
            .catch(() => {
              window.location.assign(`/product/?path=${encodeURIComponent(href)}`);
            });
        });
      });
    }
  }

  function productHref(p, catalog) {
    const routes = window.ZERK_ROUTES;
    if (routes?.productPath) return routes.productPath(p);
    return p.path || catalog.productUrl(p.id);
  }

  function renderCard(p, catalog, delayIndex) {
    const routes = window.ZERK_ROUTES;
    const seo = window.ZERK_SEO;
    const href = productHref(p, catalog);
    const alt = seo?.imageAlt?.(p) || `ZERK TOOL ${p.id}`;
    const labels = catalog.labels;
    const price = p.price ? catalog.formatPrice(p.price) : '';
    const corner = p.blade
      ? `${p.blade} мм`
      : p.grit
        ? `${p.grit} грит`
        : p.size
          ? p.size
          : p.sizeLabel || '';
    const badge = p.badge
      ? `<span class="catalog-card__badge${p.badge === 'Хит' ? ' catalog-card__badge--hit' : ''}">${p.badge}</span>`
      : '';

    const cardLabel =
      p.cat === 'gloves'
        ? `${p.colorLabel}, размер ${p.size}`
        : `${p.model}${p.blade ? ` · ${p.blade} мм` : ''}`;

    return `
      <article class="catalog-card glass" style="transition-delay:${(delayIndex % 6) * 0.05}s">
        <a href="${href}" class="catalog-card__link" aria-label="${cardLabel}, подробнее о товаре">
          <div class="catalog-card__media">
            ${badge}
            ${corner ? `<span class="catalog-card__blade">${corner}</span>` : ''}
            <img src="/${p.image.replace(/^\//, '')}" alt="${alt}" width="400" height="300" loading="lazy" decoding="async" class="catalog-card__img--catalog">
          </div>
          <div class="catalog-card__body">
            <div class="catalog-card__code">${p.brand || 'ZERK'} · ${labels[p.cat]}${p.colorLabel ? ` · ${p.colorLabel}` : ''}</div>
            <div class="catalog-card__model">${p.cat === 'gloves' ? `${p.model} · ${p.size}` : p.model}</div>
            <p class="catalog-card__desc">${p.desc}</p>
            <div class="catalog-card__footer">
              <span class="catalog-card__cta">Подробнее →</span>
              ${price ? `<span class="catalog-card__price">${price}</span>` : ''}
            </div>
          </div>
        </a>
        <button type="button" class="zerk-add-btn" data-add-cart="${p.id}" aria-label="Добавить ${cardLabel} в корзину">В корзину</button>
      </article>`;
  }
})();
