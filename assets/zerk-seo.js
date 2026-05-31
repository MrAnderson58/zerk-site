/**
 * ZERK — SEO: ключевые запросы, FAQ, schema.org
 */
(function () {
  'use strict';

  const BRAND = 'ZERK';
  const SITE = 'https://zerk-tool.ru';

  const KEYWORDS = {
    global: [
      'zerk',
      'zerk tool',
      'маникюрный инструмент zerk',
      'профессиональный маникюрный инструмент zerk',
      'инструменты для маникюра zerk',
      'маникюрный инструмент премиум',
    ],
    nippers: [
      'кусачки zerk',
      'маникюрные кусачки zerk',
      'кусачки zerk premium',
      'кусачки zerk japan steel',
      'профессиональные кусачки zerk',
      'кусачки для кутикулы zerk',
      'кусачки zerk купить',
      'кусачки zerk ручная заточка',
      'кусачки zerk для мастеров',
      'кусачки для кутикулы',
      'маникюрные кусачки',
      'профессиональные кусачки для кутикулы',
      'кусачки для маникюра',
      'кусачки для кутикулы купить',
      'лучшие кусачки для кутикулы',
      'кусачки для маникюра профессиональные',
      'кусачки для маникюра ручной заточки',
      'кусачки японская сталь',
      'кусачки для плотной кутикулы',
      'кусачки для тонкой кутикулы',
      'кусачки для мастеров маникюра',
      'кусачки для салона',
      'кусачки для комбинированного маникюра',
      'кусачки для аппаратного маникюра',
      'кусачки 3 мм',
      'кусачки 5 мм',
      'кусачки 7 мм',
      'кусачки мягкий ход',
      'кусачки ручная заточка',
      'кусачки для стерилизации',
      'кусачки для маникюра купить',
      'профессиональные кусачки купить',
      'кусачки для ногтей профессиональные',
      'кусачки для кутикулы premium',
      'кусачки vietnam japan steel',
      'кусачки из японской стали',
      'кусачки для мастеров купить',
      'кусачки для салонов красоты',
      'маникюрные кусачки премиум класса',
      'инструменты для маникюра профессиональные',
    ],
    scissors: [
      'маникюрные ножницы',
      'ножницы для кутикулы',
      'профессиональные ножницы для кутикулы',
      'ножницы для маникюра',
      'ножницы ручной заточки',
      'германские ножницы для кутикулы',
      'ножницы для мастеров маникюра',
      'ножницы премиум',
      'ножницы для тонкой кутикулы',
      'ножницы для комбинированного маникюра',
      'ножницы для аппаратного маникюра',
      'маникюрные ножницы профессиональные',
      'лучшие ножницы для кутикулы',
      'ножницы для салона красоты',
      'ножницы для стерилизации',
      'ножницы из нержавеющей стали',
      'ножницы мягкий ход',
      'ножницы для маникюра купить',
      'ножницы для мастеров купить',
      'ножницы для кутикулы ручная заточка',
      'ножницы german steel',
      'ножницы premium manicure',
      'ножницы для ногтей профессиональные',
      'ножницы для салонов',
      'ножницы для маникюра premium',
      'профессиональные ножницы для мастеров',
      'ножницы zerk',
      'маникюрные ножницы zerk',
      'ножницы для кутикулы zerk',
      'ножницы zerk premium',
      'ножницы zerk ручная заточка',
      'германские ножницы zerk',
      'ножницы zerk купить',
      'профессиональные ножницы zerk',
    ],
    files: [
      'пилки для ногтей',
      'профессиональные пилки для ногтей',
      'файлы для маникюра',
      'сменные файлы для пилки',
      'файлы на металлическую основу',
      'пилки для мастеров маникюра',
      'пилки для салонов красоты',
      'сменные файлы 100 грит',
      'сменные файлы 180 грит',
      'сменные файлы 240 грит',
      'файлы лодочка',
      'файлы mini',
      'файлы maxi',
      'файлы long',
      'пилка лодочка',
      'пилка для маникюра профессиональная',
      'металлическая основа для файлов',
      'пилки для аппаратного маникюра',
      'пилки для комбинированного маникюра',
      'пилки premium',
      'пилки для ногтей купить',
      'файлы для мастеров',
      'файлы для салонов',
      'одноразовые файлы для маникюра',
      'абразивы для маникюра',
      'пилки для ногтей 100 180 240',
      'пилки для ногтей профессиональные купить',
      'маникюрные файлы premium',
      'основа для файлов металлическая',
      'пилки для ногтей лодочка',
      'сменные файлы premium',
      'маникюрные пилки купить',
      'пилки для маникюра оптом',
      'пилки zerk',
      'файлы zerk',
      'пилки для ногтей zerk',
      'файлы на металлическую основу zerk',
      'сменные файлы zerk',
      'пилки zerk premium',
      'пилки zerk купить',
      'файлы лодочка zerk',
      'файлы mini zerk',
      'файлы maxi zerk',
      'файлы long zerk',
    ],
    gloves: [
      'перчатки нитриловые zerk',
      'нитриловые перчатки zerk',
      'перчатки для маникюра zerk',
      'перчатки нитрил zerk',
      'перчатки без пудры zerk',
      'перчатки для салона zerk',
      'перчатки для мастера маникюра',
      'нитриловые перчатки купить',
      'перчатки нитрил для маникюра',
    ],
  };

  function joinKeywords(...groups) {
    const seen = new Set();
    const out = [];
    groups.flat().forEach((k) => {
      const key = k.toLowerCase().trim();
      if (!seen.has(key)) {
        seen.add(key);
        out.push(k);
      }
    });
    return out.join(', ');
  }

  function setMeta(name, content, attr) {
    if (!content) return;
    const a = attr || 'name';
    let el = document.querySelector(`meta[${a}="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(a, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function setLink(rel, href) {
    if (!href) return;
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.rel = rel;
      document.head.appendChild(el);
    }
    el.href = href;
  }

  function injectJsonLd(id, data) {
    const old = document.getElementById(id);
    if (old) old.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  function applyPageMeta(opts) {
    if (opts.title) document.title = opts.title;
    setMeta('description', opts.description);
    if (opts.keywords) setMeta('keywords', opts.keywords);
    if (opts.canonical) setLink('canonical', opts.canonical);
    setMeta('og:title', opts.ogTitle || opts.title, 'property');
    setMeta('og:description', opts.ogDescription || opts.description, 'property');
    if (opts.ogImage) setMeta('og:image', opts.ogImage, 'property');
    setMeta('og:site_name', BRAND, 'property');
  }

  function faqSchema(items) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    };
  }

  function renderFaq(container, items) {
    if (!container || !items?.length) return;
    container.innerHTML = `
      <div class="zerk-faq__inner">
        <h2 class="zerk-faq__title">Частые вопросы о ${BRAND}</h2>
        <div class="zerk-faq__list">
          ${items
            .map(
              (item) => `
            <details class="zerk-faq__item">
              <summary>${item.q}</summary>
              <p>${item.a}</p>
            </details>`
            )
            .join('')}
        </div>
      </div>`;
  }

  const FAQ = {
    home: [
      {
        q: 'Что такое ZERK?',
        a: 'ZERK — бренд профессионального маникюрного инструмента: кусачки для кутикулы из японской стали SUS 420 J2, ножницы Solingen, пилки-файлы, пушеры и нитриловые перчатки для салонов.',
      },
      {
        q: 'Где купить кусачки ZERK?',
        a: 'Заказ оформляется через каталог на сайте zerk-tool.ru — Telegram, WhatsApp или ВКонтакте. Укажите артикул модели, например IL-02-5 или IL-07-4.',
      },
      {
        q: 'Кусачки ZERK — японская сталь и ручная заточка?',
        a: 'Да. Серия IL и IAL — сталь SUS 420 J2, ручная заточка, мягкий ход и готовность к стерилизации. Производство кусачек и пушеров — во Вьетнаме под контролем ZERK.',
      },
      {
        q: 'Какие размеры лезвий у кусачек ZERK?',
        a: 'Модели IL-02, IL-03, IL-07, IL-09, IL-12 — лезвия 4, 5 и 6 мм. IAL-01 — 8 мм для педикюра и плотной кутикулы.',
      },
    ],
    catalog: [
      {
        q: 'Какой каталог ZERK доступен на сайте?',
        a: 'На zerk-tool.ru: кусачки для кутикулы IL, книпсеры, ножницы Solingen, пушеры-шаберы, пилки-файлы на металлическую основу и перчатки нитрил NG-100.',
      },
      {
        q: 'Кусачки ZERK premium — чем отличаются модели?',
        a: 'IL-02 — компактные 105 мм; IL-03 — классика; IL-07 — для плотной кутикулы; IL-09 — салонный баланс; IL-12 — удлинённые ручки; IAL-01 — лезвие 8 мм.',
      },
      {
        q: 'Пилки и файлы ZERK — какие форматы?',
        a: 'Mini, Maxi, Long и Лодка на грит 100, 180 и 240. Сменные абразивы на металлическую основу ZERK, подходят для стерилизации основы.',
      },
      {
        q: 'Перчатки нитрил ZERK — для чего?',
        a: 'Нитриловые перчатки NG-100 без пудры — гигиеничный протокол мастера, размеры S, M и L, упаковка 100 шт.',
      },
    ],
  };

  function productFaq(product, catalog) {
    const name = catalog.productDisplayName(product);
    const price = product.price ? catalog.formatPrice(product.price) : '';
    const common = [
      {
        q: `Как заказать ${name} ZERK?`,
        a: `Напишите артикул ${product.id} в Telegram, WhatsApp или ВКонтакте с сайта zerk-tool.ru. ${price ? `Цена: ${price}.` : ''}`,
      },
      {
        q: `Это оригинальный товар ${BRAND}?`,
        a: `Да, карточка на официальном каталоге ZERK TOOL. Маркировка ZK на инструменте, контроль качества перед отгрузкой.`,
      },
    ];
    if (product.cat === 'nippers' && !product.productType) {
      return [
        {
          q: `Кусачки ZERK ${product.model} — для какой кутикулы?`,
          a: `${product.desc} Сталь SUS 420 J2, ручная заточка, производство ${product.origin}.`,
        },
        ...common,
      ];
    }
    if (product.cat === 'scissors') {
      return [
        {
          q: `Ножницы ZERK ${product.model} — профессиональные?`,
          a: `Маникюрные ножницы ZERK ${product.model}, ${product.origin}. ${product.desc}`,
        },
        ...common,
      ];
    }
    if (product.cat === 'files') {
      return [
        {
          q: `Пилки-файлы ZERK ${product.model} — какой грит?`,
          a: `Сменный файл ${product.grit} грит, форма ${product.shape}, ${product.dimensions}. Для основ ZERK.`,
        },
        ...common,
      ];
    }
    if (product.cat === 'gloves') {
      return [
        {
          q: `Перчатки нитрил ZERK ${product.model} — какой размер?`,
          a: `Размер ${product.size}, упаковка ${product.packSize} шт. Без пудры, для салонного протокола ZERK.`,
        },
        ...common,
      ];
    }
    return common;
  }

  function productDescription(product, catalog) {
    const name = catalog.productDisplayName(product);
    const price = product.price ? ` Цена ${catalog.formatPrice(product.price)}.` : '';
    const cat = catalog.labels[product.cat] || '';
    return `${name} — купить ${cat.toLowerCase()} ${BRAND} (${product.id}). ${product.desc}${price} Официальный каталог zerk-tool.ru.`;
  }

  function productTitle(product) {
    const base = catalogProductName(product);
    return `${base} — ${BRAND} | Купить ${product.id}`;
  }

  function catalogProductName(product) {
    if (product.cat === 'nippers' && product.productType === 'clipper') {
      return `Книпсер ${BRAND} ${product.model}`;
    }
    if (product.cat === 'nippers') {
      return `Кусачки ${BRAND} ${product.model} ${product.blade} мм`;
    }
    if (product.cat === 'gloves') {
      return `Перчатки нитрил ${BRAND} ${product.model} ${product.size}`;
    }
    if (product.cat === 'files') {
      return `Пилки-файлы ${BRAND} ${product.model} ${product.grit} грит`;
    }
    if (product.cat === 'pushers') {
      return `Пушер-шабер ${BRAND} ${product.model}`;
    }
    return `Ножницы ${BRAND} ${product.model}`;
  }

  function productH1(product) {
    if (product.cat === 'nippers' && product.productType === 'clipper') {
      return `${BRAND} · ${product.model} · книпсер`;
    }
    if (product.cat === 'nippers') {
      return `${BRAND} · ${product.model} · ${product.blade} мм`;
    }
    if (product.cat === 'gloves') {
      return `${BRAND} · ${product.model} · размер ${product.size}`;
    }
    if (product.cat === 'files') {
      return `${BRAND} · ${product.model} · ${product.grit} грит`;
    }
    if (product.cat === 'pushers') {
      return `${BRAND} · ${product.model} · пушер-шабер`;
    }
    return `${BRAND} · ${product.model} · ножницы`;
  }

  function imageAlt(product) {
    return catalogProductName(product);
  }

  function keywordsForProduct(product) {
    const cat = product.cat === 'nippers' && !product.productType ? 'nippers' : product.cat;
    const extra = product.model ? [`${product.model} zerk`, `${product.id} zerk`] : [];
    return joinKeywords(KEYWORDS.global, KEYWORDS[cat] || [], extra);
  }

  function productSchema(product, catalog) {
    const url = `${SITE}/${catalog.productUrl(product.id)}`;
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: catalogProductName(product),
      description: product.desc,
      image: product.image.startsWith('http') ? product.image : `${SITE}/${product.image}`,
      sku: product.id,
      brand: { '@type': 'Brand', name: BRAND },
      offers: product.price
        ? {
            '@type': 'Offer',
            priceCurrency: 'RUB',
            price: String(product.price),
            availability: 'https://schema.org/InStock',
            url,
          }
        : undefined,
    };
  }

  function applyProductSeo(product, catalog) {
    const canonical = `${SITE}/${catalog.productUrl(product.id)}`;
    const kw = keywordsForProduct(product);
    applyPageMeta({
      title: productTitle(product),
      description: productDescription(product, catalog),
      keywords: kw,
      canonical,
      ogImage: product.image.startsWith('http') ? product.image : `${SITE}/${product.image}`,
    });
    injectJsonLd('zerk-schema-product', productSchema(product, catalog));
    injectJsonLd('zerk-schema-faq', faqSchema(productFaq(product, catalog)));
    const faqEl = document.getElementById('productFaq');
    renderFaq(faqEl, productFaq(product, catalog));
  }

  function initHomePage() {
    applyPageMeta({
      title: `${BRAND} — Кусачки для кутикулы и маникюрный инструмент премиум`,
      description:
        `${BRAND} — профессиональные кусачки для кутикулы, маникюрные ножницы, пилки-файлы и перчатки нитрил. Японская сталь SUS 420 J2, ручная заточка, каталог zerk-tool.ru.`,
      keywords: joinKeywords(KEYWORDS.global, KEYWORDS.nippers, KEYWORDS.scissors, KEYWORDS.files, KEYWORDS.gloves),
      canonical: `${SITE}/`,
    });
    injectJsonLd('zerk-schema-org', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: BRAND,
      alternateName: 'ZERK TOOL',
      url: SITE,
      telephone: '+7-925-770-08-03',
      description: 'Профессиональный маникюрный инструмент ZERK',
    });
    injectJsonLd('zerk-schema-website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: BRAND,
      url: SITE,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE}/catalog.html?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    });
    injectJsonLd('zerk-schema-faq', faqSchema(FAQ.home));
    renderFaq(document.getElementById('homeFaq'), FAQ.home);
  }

  function initCatalogPage(productCount) {
    applyPageMeta({
      title: `Каталог ${BRAND} — кусачки, ножницы, пилки-файлы, перчатки нитрил`,
      description:
        `Каталог ${BRAND}: кусачки для кутикулы IL-02…IAL-01, ножницы Solingen, пилки-файлы на основу, пушеры, перчатки нитрил NG-100. Профессиональный инструмент — zerk-tool.ru.`,
      keywords: joinKeywords(KEYWORDS.global, KEYWORDS.nippers, KEYWORDS.scissors, KEYWORDS.files, KEYWORDS.gloves),
      canonical: `${SITE}/catalog.html`,
    });
    injectJsonLd('zerk-schema-faq', faqSchema(FAQ.catalog));
    renderFaq(document.getElementById('catalogFaq'), FAQ.catalog);
    const stat = document.querySelector('.catalog-stats [data-count]');
    if (stat && productCount) stat.dataset.count = String(productCount);
  }

  window.ZERK_SEO = {
    BRAND,
    SITE,
    KEYWORDS,
    joinKeywords,
    applyPageMeta,
    applyProductSeo,
    initHomePage,
    initCatalogPage,
    productH1,
    imageAlt,
    productFaq,
    faqSchema,
    renderFaq,
  };
})();
