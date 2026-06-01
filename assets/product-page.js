/**
 * ZERK TOOL — product page (clean URLs)
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const catalog = window.ZERK_CATALOG;
    const seo = window.ZERK_SEO;
    const routes = window.ZERK_ROUTES;
    if (!catalog || !routes) return;

    const params = new URLSearchParams(window.location.search);
    const legacyId = params.get('id');
    if (legacyId) {
      const dest = routes.legacyProductRedirect(legacyId, catalog);
      window.location.replace(dest);
      return;
    }

    const pathFromQuery = params.get('path');
    let product = catalog.getByPath(window.location.pathname);
    if (!product && pathFromQuery) {
      product = catalog.getByPath(pathFromQuery);
      if (product?.path) {
        window.history.replaceState(null, '', product.path);
      }
    }
    if (!product) {
      const parsed = routes.parseProductPath(window.location.pathname);
      if (parsed && parsed.variantPart === null && parsed.cat === 'nippers') {
        const id = routes.legacyIdFromPath(parsed, catalog);
        if (id) {
          const p = catalog.getById(id);
          if (p?.path && p.path !== window.location.pathname) {
            window.location.replace(p.path);
            return;
          }
        }
      }
    }

    const article = document.getElementById('productArticle');
    const notFound = document.getElementById('productNotFound');

    if (!product) {
      if (seo) {
        seo.applyPageMeta({
          title: `Товар не найден — ZERK TOOL`,
          description: 'Товар не найден в каталоге ZERK TOOL.',
          canonical: `${seo.SITE}/collection`,
        });
      }
      notFound.hidden = false;
      return;
    }

    if (seo) seo.applyProductSeo(product, catalog, routes);

    const catLabel = catalog.labels[product.cat] || product.cat;
    const catPath = routes.categoryPathForProduct(product);

    const brandLine = product.brand ? `${product.brand} · ` : 'ZERK · ';
    document.getElementById('productEyebrow').textContent = `${brandLine}${catLabel}`;
    document.getElementById('productTitle').textContent = seo
      ? seo.productH1(product)
      : product.model;

    const priceEl = document.getElementById('productPrice');
    if (product.price && catalog.formatPrice) {
      priceEl.textContent = catalog.formatPrice(product.price);
      priceEl.hidden = false;
    } else {
      priceEl.hidden = true;
    }
    document.getElementById('productLead').textContent = product.desc;

    const aiEl = document.getElementById('productAiSnippet');
    if (aiEl) {
      const name = catalog.productDisplayName(product);
      aiEl.innerHTML = `<strong>Кратко (ZERK TOOL):</strong> ${name} — ${product.desc} Артикул <code>${product.id}</code>. ${product.material ? `Материал: ${product.material}.` : ''} ${product.origin ? `Происхождение: ${product.origin}.` : ''}`;
    }

    const img = document.getElementById('productImage');
    const imgPath = product.image.startsWith('/') ? product.image : `/${product.image}`;
    img.src = imgPath;
    img.alt = seo ? seo.imageAlt(product) : `ZERK TOOL ${product.id}`;

    document.getElementById('productSpecs').innerHTML = catalog
      .specsFor(product)
      .map(
        (s) =>
          `<li class="product-specs__item"><span class="product-specs__label">${s.label}</span><span class="product-specs__value">${s.value}</span></li>`
      )
      .join('');

    document.getElementById('productDetails').innerHTML = (product.details || [])
      .map((p) => `<p>${p}</p>`)
      .join('');

    document.getElementById('productOrderTg').href = catalog.telegramOrderUrl(product);
    document.getElementById('productOrderWa').href = catalog.whatsappOrderUrl(product);
    const vkBtn = document.getElementById('productOrderVk');
    const orderText = catalog.orderMessage(product);
    vkBtn.href = catalog.vkOrderUrl();
    vkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.ZERK_showVkOrderModal?.(orderText);
    });

    const siblings = catalog.siblings(product).filter((p) => p.id !== product.id);
    const colorPeers =
      product.cat === 'gloves'
        ? catalog.products.filter(
            (p) =>
              p.cat === 'gloves' &&
              p.model === product.model &&
              p.size === product.size &&
              p.id !== product.id
          )
        : [];
    const variantsBlock = document.getElementById('productVariants');
    const variantsList = document.getElementById('productVariantsList');
    if (siblings.length || colorPeers.length) {
      variantsBlock.hidden = false;
      const variantTitles = {
        nippers: product.productType === 'clipper' ? 'Другие книпсеры ZERK TOOL' : 'Размер лезвия',
        pushers: 'Другие модели',
        scissors: 'Другие модели',
        files: 'Другие гриты',
        gloves: 'Размер',
      };
      variantsBlock.querySelector('.product-variants__title').textContent =
        variantTitles[product.cat] || 'Варианты';

      const variantLink = (p, label) => {
        const href = p.path || catalog.productUrl(p.id);
        const active = p.id === product.id ? ' is-active' : '';
        return `<a href="${href}" class="product-variant${active}">${label}</a>`;
      };

      let html = '';
      if (siblings.length) {
        html += siblings
          .map((p) => {
            const label =
              product.cat === 'nippers' && !product.productType
                ? `${p.blade} мм`
                : product.cat === 'files'
                  ? `${p.grit} грит`
                  : product.cat === 'gloves'
                    ? p.size
                    : p.model;
            return variantLink(p, label);
          })
          .join('');
      }
      if (colorPeers.length) {
        html += `<span class="product-variants__divider">Цвет</span>`;
        html += [product, ...colorPeers]
          .sort((a, b) => a.color.localeCompare(b.color))
          .map((p) => variantLink(p, p.colorLabel))
          .join('');
      }
      variantsList.innerHTML = html;
    }

    const related = catalog.getRelated(product, 4);
    const relatedEl = document.getElementById('productRelated');
    if (relatedEl && related.length) {
      relatedEl.hidden = false;
      relatedEl.innerHTML = `
        <h2 class="section-title">Похожие товары</h2>
        <div class="product-related__grid">
          ${related
            .map(
              (p) => `
            <a href="${p.path || catalog.productUrl(p.id)}" class="product-related__card glass">
              <img src="/${p.image.replace(/^\//, '')}" alt="${seo ? seo.imageAlt(p) : p.id}" width="200" height="150" loading="lazy">
              <span>${catalog.productDisplayName(p)}</span>
              ${p.price ? `<strong>${catalog.formatPrice(p.price)}</strong>` : ''}
            </a>`
            )
            .join('')}
        </div>`;
    }

    const addWrap = document.getElementById('productAddCartWrap');
    const addBtn = document.getElementById('productAddCart');
    if (addWrap && addBtn) {
      addWrap.hidden = false;
      addBtn.dataset.addCart = product.id;
      window.ZERK_CART?.bindAddButtons?.();
    }

    article.hidden = false;
    article.classList.add('is-visible');
    document.body.classList.add('is-loaded');
  });
})();
