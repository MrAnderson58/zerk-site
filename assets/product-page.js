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

    document.title = `${product.model}${product.blade ? ` · ${product.blade} мм` : product.grit ? ` · ${product.grit} грит` : product.productType === 'clipper' ? ' · книпсер' : ''} — ZERK`;
    catLink.textContent = catLabel;
    catLink.href = catUrl;
    breadcrumbCurrent.textContent = product.id;

    document.getElementById('productEyebrow').textContent = `ZERK · ${catLabel}`;
    const titleEl = document.getElementById('productTitle');
    if (product.cat === 'nippers' && product.productType === 'clipper') {
      titleEl.textContent = `${product.model} · книпсер`;
    } else if (product.cat === 'nippers') {
      titleEl.textContent = `${product.model} · ${product.blade} мм`;
    } else if (product.cat === 'pushers') {
      titleEl.textContent = `${product.model} · пушер-шабер`;
    } else if (product.cat === 'files') {
      titleEl.textContent = `${product.model} · ${product.grit} грит`;
    } else {
      titleEl.textContent = product.model;
    }
    const priceEl = document.getElementById('productPrice');
    if (product.price && catalog.formatPrice) {
      priceEl.textContent = catalog.formatPrice(product.price);
      priceEl.hidden = false;
    } else {
      priceEl.hidden = true;
    }
    document.getElementById('productLead').textContent = product.desc;

    const img = document.getElementById('productImage');
    img.src = product.image;
    if (product.cat === 'nippers' && product.productType === 'clipper') {
      img.alt = `Книпсер ZERK ${product.model}, ${product.sizeLabel}`;
    } else if (product.cat === 'nippers') {
      img.alt = `${product.model}, лезвие ${product.blade} мм`;
    } else if (product.cat === 'pushers') {
      img.alt = `Пушер-шабер ZERK ${product.model}`;
    } else if (product.cat === 'files') {
      img.alt = `Пилки-файлы ZERK ${product.model}, ${product.grit} грит`;
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

    document.getElementById('productOrderTg').href = catalog.telegramOrderUrl(product);
    const vkBtn = document.getElementById('productOrderVk');
    vkBtn.href = catalog.vkOrderUrl();
    document.getElementById('productOrderHint').textContent =
      'В Telegram заказ подставится автоматически. Во ВКонтакте напишите в сообщения группы артикул и модель из карточки.';

    const siblings = catalog.siblings(product).filter((p) => p.id !== product.id);
    const variantsBlock = document.getElementById('productVariants');
    const variantsList = document.getElementById('productVariantsList');

    if (siblings.length) {
      variantsBlock.hidden = false;
      const variantTitles = {
        nippers: product.productType === 'clipper' ? 'Другие книпсеры' : 'Другие размеры лезвия',
        pushers: 'Другие модели пушера-шабера',
        scissors: 'Другие модели ножниц',
        files: 'Другие гриты',
      };
      variantsBlock.querySelector('.product-variants__title').textContent =
        variantTitles[product.cat] || 'Другие модели';
      variantsList.innerHTML = siblings
        .map((p) => {
          const label =
            product.cat === 'nippers' && product.productType === 'clipper'
              ? p.model
              : product.cat === 'nippers'
                ? `${p.blade} мм`
                : product.cat === 'files'
                  ? `${p.grit} грит`
                  : p.model;
          const active = p.id === product.id ? ' is-active' : '';
          return `<a href="${catalog.productUrl(p.id)}" class="product-variant${active}">${label}</a>`;
        })
        .join('');
    }

    const addWrap = document.getElementById('productAddCartWrap');
    const addBtn = document.getElementById('productAddCart');
    if (addWrap && addBtn) {
      addWrap.hidden = false;
      addBtn.dataset.addCart = product.id;
      window.ZERK_CART?.bindAddButtons();
    }

    article.hidden = false;
    article.classList.add('is-visible');
  });
})();
