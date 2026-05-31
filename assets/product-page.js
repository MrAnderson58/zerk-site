/**
 * ZERK — страница товара
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const catalog = window.ZERK_CATALOG;
    const seo = window.ZERK_SEO;
    if (!catalog) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const product = catalog.getById(id);

    const article = document.getElementById('productArticle');
    const notFound = document.getElementById('productNotFound');
    const catLink = document.getElementById('productCatLink');
    const breadcrumbCurrent = document.getElementById('productBreadcrumbCurrent');

    if (!product) {
      document.title = `Товар не найден — ZERK`;
      if (seo) {
        seo.applyPageMeta({
          title: `Товар не найден — ZERK`,
          description: 'Товар не найден в каталоге ZERK. Выберите модель на zerk-tool.ru.',
          canonical: `${seo.SITE}/catalog.html`,
        });
      }
      notFound.hidden = false;
      return;
    }

    const catLabel = catalog.labels[product.cat] || product.cat;
    const catUrl = `catalog.html?cat=${encodeURIComponent(product.cat)}`;

    if (seo) seo.applyProductSeo(product, catalog);
    else {
      document.title = `${product.id} — ZERK`;
    }

    catLink.textContent = catLabel;
    catLink.href = catUrl;
    breadcrumbCurrent.textContent = `${product.id} · ZERK`;

    document.getElementById('productEyebrow').textContent = `ZERK · ${catLabel}`;
    const titleEl = document.getElementById('productTitle');
    titleEl.textContent = seo ? seo.productH1(product) : product.model;

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
    img.alt = seo ? seo.imageAlt(product) : `ZERK ${product.id}`;

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
    document.getElementById('productOrderWa').href = catalog.whatsappOrderUrl(product);
    const vkBtn = document.getElementById('productOrderVk');
    const orderText = catalog.orderMessage(product);
    vkBtn.href = catalog.vkOrderUrl();
    vkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof window.ZERK_showVkOrderModal === 'function') {
        window.ZERK_showVkOrderModal(orderText);
      } else {
        window.open(catalog.vkOrderUrl(), '_blank', 'noopener,noreferrer');
      }
    });
    document.getElementById('productOrderHint').textContent =
      'Telegram и WhatsApp — готовый текст заказа ZERK. Для ВКонтакте появится окно с текстом для копирования.';

    const siblings = catalog.siblings(product).filter((p) => p.id !== product.id);
    const variantsBlock = document.getElementById('productVariants');
    const variantsList = document.getElementById('productVariantsList');

    if (siblings.length) {
      variantsBlock.hidden = false;
      const variantTitles = {
        nippers: product.productType === 'clipper' ? 'Другие книпсеры ZERK' : 'Другие размеры лезвия',
        pushers: 'Другие модели пушера-шабера ZERK',
        scissors: 'Другие модели ножниц ZERK',
        files: 'Другие гриты ZERK',
        gloves: 'Другие размеры перчаток ZERK',
      };
      variantsBlock.querySelector('.product-variants__title').textContent =
        variantTitles[product.cat] || 'Другие модели ZERK';
      variantsList.innerHTML = siblings
        .map((p) => {
          const label =
            product.cat === 'nippers' && product.productType === 'clipper'
              ? p.model
              : product.cat === 'nippers'
                ? `${p.blade} мм`
                : product.cat === 'files'
                  ? `${p.grit} грит`
                  : product.cat === 'gloves'
                    ? `Размер ${p.size}`
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
