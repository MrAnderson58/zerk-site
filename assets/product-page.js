/**
 * ZERK — страница товара
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const catalog = window.ZERK_CATALOG;
    if (!catalog) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const product = catalog.getById(id);

    const article = document.getElementById('productArticle');
    const notFound = document.getElementById('productNotFound');
    const catLink = document.getElementById('productCatLink');
    const breadcrumbCurrent = document.getElementById('productBreadcrumbCurrent');

    if (!product) {
      document.title = 'Товар не найден — ZERK';
      notFound.hidden = false;
      return;
    }

    const catLabel = catalog.labels[product.cat] || product.cat;
    const catUrl = `catalog.html?cat=${encodeURIComponent(product.cat)}`;

    document.title = `${product.model}${product.blade ? ` · ${product.blade} мм` : ''} — ZERK`;
    catLink.textContent = catLabel;
    catLink.href = catUrl;
    breadcrumbCurrent.textContent = product.id;

    document.getElementById('productEyebrow').textContent = `ZERK · ${catLabel}`;
    const titleEl = document.getElementById('productTitle');
    if (product.cat === 'nippers') {
      titleEl.textContent = `${product.model} · ${product.blade} мм`;
    } else if (product.cat === 'pushers') {
      titleEl.textContent = `${product.model} · пушер-шабер`;
    } else {
      titleEl.textContent = product.model;
    }
    document.getElementById('productLead').textContent = product.desc;

    const img = document.getElementById('productImage');
    img.src = product.image;
    if (product.cat === 'nippers') {
      img.alt = `${product.model}, лезвие ${product.blade} мм`;
    } else if (product.cat === 'pushers') {
      img.alt = `Пушер-шабер ZERK ${product.model}`;
    } else {
      img.alt = `Ножницы ZERK ${product.model}`;
    }

    const specsEl = document.getElementById('productSpecs');
    specsEl.innerHTML = catalog
      .specsFor(product)
      .map(
        (s) =>
          `<li class="product-specs__item"><span class="product-specs__label">${s.label}</span><span class="product-specs__value">${s.value}</span></li>`
      )
      .join('');

    const detailsEl = document.getElementById('productDetails');
    detailsEl.innerHTML = (product.details || [])
      .map((p) => `<p>${p}</p>`)
      .join('');

    const orderBtn = document.getElementById('productOrderBtn');
    orderBtn.href = catalog.telegramOrderUrl(product);

    const siblings = catalog.siblings(product).filter((p) => p.id !== product.id);
    const variantsBlock = document.getElementById('productVariants');
    const variantsList = document.getElementById('productVariantsList');

    if (siblings.length) {
      variantsBlock.hidden = false;
      const variantTitles = {
        nippers: 'Другие размеры лезвия',
        pushers: 'Другие модели пушера-шабера',
        scissors: 'Другие модели ножниц',
      };
      variantsBlock.querySelector('.product-variants__title').textContent =
        variantTitles[product.cat] || 'Другие модели';
      variantsList.innerHTML = siblings
        .map((p) => {
          const label = product.cat === 'nippers' ? `${p.blade} мм` : p.model;
          const active = p.id === product.id ? ' is-active' : '';
          return `<a href="${catalog.productUrl(p.id)}" class="product-variant${active}">${label}</a>`;
        })
        .join('');
    }

    article.hidden = false;
    article.classList.add('is-visible');
  });
})();
