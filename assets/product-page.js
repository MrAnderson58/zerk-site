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
    document.getElementById('productTitle').textContent =
      product.cat === 'nippers' ? `${product.model} · ${product.blade} мм` : product.model;
    document.getElementById('productLead').textContent = product.desc;

    const img = document.getElementById('productImage');
    img.src = product.image;
    img.alt =
      product.cat === 'nippers'
        ? `${product.model}, лезвие ${product.blade} мм`
        : `Ножницы ZERK ${product.model}`;

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
      variantsBlock.querySelector('.product-variants__title').textContent =
        product.cat === 'nippers' ? 'Другие размеры лезвия' : 'Другие модели';
      variantsList.innerHTML = siblings
        .map((p) => {
          const label =
            product.cat === 'nippers' ? `${p.blade} мм` : p.model;
          const active = p.id === product.id ? ' is-active' : '';
          return `<a href="${catalog.productUrl(p.id)}" class="product-variant${active}">${label}</a>`;
        })
        .join('');
    }

    article.hidden = false;
    article.classList.add('is-visible');
  });
})();
