/**
 * ZERK — SEO: ключевые запросы, FAQ, schema.org
 */
(function () {
  'use strict';

  const BRAND = 'ZERK TOOL';
  const BRAND_SHORT = 'ZERK';
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
      'нитриловые перчатки',
      'нитриловые перчатки черные',
      'нитриловые перчатки для маникюра',
      'перчатки для мастеров маникюра',
      'перчатки нитриловые купить',
      'черные нитриловые перчатки',
      'нитриловые перчатки premium',
      'перчатки для салонов красоты',
      'нитриловые перчатки неопудренные',
      'перчатки для косметологов',
      'перчатки для мастеров',
      'нитриловые перчатки размер s',
      'нитриловые перчатки размер m',
      'перчатки для стерильной работы',
      'одноразовые нитриловые перчатки',
      'профессиональные нитриловые перчатки',
      'перчатки для nail мастеров',
      'перчатки для бьюти мастеров',
      'нитриловые перчатки для салонов',
      'перчатки для маникюра купить',
      'черные перчатки для маникюра',
      'перчатки для аппаратного маникюра',
      'перчатки для комбинированного маникюра',
      'нитриловые перчатки Glovity',
      'перчатки Glovity',
      'черные перчатки Glovity',
      'перчатки для маникюра Glovity',
      'нитриловые перчатки premium Glovity',
      'перчатки нитриловые zerk',
      'перчатки glovity zerk',
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
    setMeta('og:type', opts.ogType || 'website', 'property');
    setMeta('og:title', opts.ogTitle || opts.title, 'property');
    setMeta('og:description', opts.ogDescription || opts.description, 'property');
    setMeta('og:url', opts.canonical, 'property');
    if (opts.ogImage) setMeta('og:image', opts.ogImage, 'property');
    setMeta('og:site_name', BRAND, 'property');
    setMeta('og:locale', 'ru_RU', 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', opts.ogTitle || opts.title);
    setMeta('twitter:description', opts.ogDescription || opts.description);
    if (opts.ogImage) setMeta('twitter:image', opts.ogImage);
  }

  function breadcrumbSchema(items) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url ? `${SITE}${item.url}` : undefined,
      })),
    };
  }

  function renderBreadcrumbs(el, items) {
    if (!el || !items?.length) return;
    el.innerHTML = items
      .map((item, i) => {
        const sep = i < items.length - 1 ? '<span aria-hidden="true">/</span>' : '';
        const inner = item.url
          ? `<a href="${item.url}">${item.name}</a>`
          : `<span aria-current="page">${item.name}</span>`;
        return `${inner}${sep}`;
      })
      .join('');
    injectJsonLd('zerk-schema-breadcrumbs', breadcrumbSchema(items));
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

  function renderFaq(container, items, title) {
    if (!container || !items?.length) return;
    const faqTitle = title || `Частые вопросы о ${BRAND}`;
    container.innerHTML = `
      <div class="zerk-faq__inner">
        <h2 class="zerk-faq__title">${faqTitle}</h2>
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
    nippers: [
      {
        q: 'Какие кусачки ZERK TOOL выбрать для старта?',
        a: 'Для старта мастера часто выбирают ZERK TOOL IL-03 или IL-02 с лезвием 5 мм — универсальный баланс контроля и мягкого хода. Для плотной кутикулы — IL-07, для педикюра — IAL-01 (8 мм).',
      },
      {
        q: 'Из какой стали кусачки ZERK TOOL?',
        a: 'Серия IL и IAL — японская нержавеющая сталь SUS 420 J2, ручная заточка, готовность к стерилизации. Производство кусачек — во Вьетнаме под контролем ZERK TOOL.',
      },
    ],
    scissors: [
      {
        q: 'Чем ножницы ZERK TOOL Solingen отличаются от кусачек?',
        a: 'Ножницы ZERK TOOL 817/837 — деликатная работа с кутикулой и кожицей, производство Solingen, Германия. Кусачки ZERK TOOL — для среза кутикулы плотных типов, сталь SUS 420 J2.',
      },
    ],
    files: [
      {
        q: 'Какие гриты сменных файлов ZERK TOOL бывают?',
        a: 'ZERK TOOL предлагает грит 100 (коррекция), 180 (универсальный салонный) и 240 (финиш). Форматы Mini, Maxi, Long и лодочка на металлическую основу.',
      },
    ],
    gloves: [
      {
        q: 'Какие размеры и цвета перчаток Glovity?',
        a: 'Нитриловые перчатки Glovity в каталоге ZERK TOOL: цвета чёрный, белый и розовый; размеры XS, S и M. Упаковка 100 шт, без пудры.',
      },
      {
        q: 'Для чего подходят нитриловые перчатки Glovity?',
        a: 'Для маникюра и салонов, кухни и HoReCa, уборки, косметологии и работы со слабыми химическими растворами. Premium-качество, тактильный контроль.',
      },
    ],
    catalog: [
      {
        q: 'Какой каталог ZERK доступен на сайте?',
        a: 'На zerk-tool.ru: кусачки для кутикулы IL, книпсеры, ножницы Solingen, пушеры-шаберы, пилки-файлы и перчатки Glovity NG-100.',
      },
      {
        q: 'Кусачки ZERK premium — чем отличаются модели?',
        a: 'IL-02 — 105 мм, скругление к концу ручки; IL-03 — 107 мм, классический округлый захват; IL-07 — 111 мм, вытянутые ручки; IL-09 — 115 мм, удлинённая геометрия; IL-12 — 106 мм, прямые ручки; IAL-01 — 104 мм, усиленные круглые ручки, лезвие 8 мм.',
      },
      {
        q: 'Пилки и файлы ZERK — какие форматы?',
        a: 'Mini, Maxi, Long и Лодка на грит 100, 180 и 240. Сменные абразивы на металлическую основу ZERK, подходят для стерилизации основы.',
      },
      {
        q: 'Перчатки нитрил ZERK — для чего?',
        a: 'Перчатки Glovity без пудры — чёрные, белые и розовые, размеры XS, S и M, упаковка 100 шт. Гигиеничный протокол для мастеров.',
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
      const handleLine = product.details?.[1] ? ` ${product.details[1]}` : '';
      return [
        {
          q: `Кусачки ZERK ${product.model} — для какой кутикулы?`,
          a: `${product.desc}${handleLine} Сталь SUS 420 J2, ручная заточка, производство ${product.origin}.`,
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
          q: `Перчатки Glovity ${product.colorLabel} — какой размер?`,
          a: `Эта карточка — размер ${product.size}, цвет ${product.colorLabel.toLowerCase()}, упаковка ${product.packSize} шт без пудры. Также доступны XS, S, M и другие цвета в каталоге.`,
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
      return `Перчатки Glovity ${product.colorLabel} ${product.size}`;
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
    if (product.cat === 'gloves') {
      return `Glovity · ${product.colorLabel} · ${product.size}`;
    }
    const b = BRAND_SHORT;
    if (product.cat === 'nippers' && product.productType === 'clipper') {
      return `${b} · ${product.model} · книпсер`;
    }
    if (product.cat === 'nippers') {
      return `${b} · ${product.model} · ${product.blade} мм`;
    }
    if (product.cat === 'files') {
      return `${b} · ${product.model} · ${product.grit} грит`;
    }
    if (product.cat === 'pushers') {
      return `${b} · ${product.model} · пушер-шабер`;
    }
    return `${b} · ${product.model} · ножницы`;
  }

  function imageAlt(product) {
    if (product.cat === 'gloves') {
      return `Нитриловые перчатки Glovity ${product.colorLabel}, размер ${product.size}, 100 шт без пудры`;
    }
    return catalogProductName(product);
  }

  function keywordsForProduct(product) {
    const cat = product.cat === 'nippers' && !product.productType ? 'nippers' : product.cat;
    const extra = product.model ? [`${product.model} zerk`, `${product.id} zerk`] : [];
    if (product.cat === 'gloves' && product.colorLabel) {
      extra.push(
        `перчатки glovity ${product.colorLabel.toLowerCase()}`,
        `нитриловые перчатки ${product.colorLabel.toLowerCase()}`
      );
    }
    return joinKeywords(KEYWORDS.global, KEYWORDS[cat] || [], extra);
  }

  function productSchema(product, catalog, url) {
    const productUrl = url || `${SITE}${catalog.productUrl(product.id)}`;
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: catalogProductName(product),
      description: product.desc,
      image: product.image.startsWith('http') ? product.image : `${SITE}/${product.image}`,
      sku: product.id,
      brand: {
        '@type': 'Brand',
        name: product.cat === 'gloves' ? product.brand || 'Glovity' : BRAND_SHORT,
      },
      manufacturer: { '@type': 'Organization', name: BRAND },
      offers: product.price
        ? {
            '@type': 'Offer',
            priceCurrency: 'RUB',
            price: String(product.price),
            availability: 'https://schema.org/InStock',
            url: productUrl,
          }
        : undefined,
    };
  }

  function getCategoryFaq(key) {
    return FAQ[key] || FAQ.catalog;
  }

  function applyCategoryPage(config, key) {
    const catKey = config.cat || key;
    const kw = config.cat
      ? joinKeywords(KEYWORDS.global, KEYWORDS[config.cat] || [])
      : joinKeywords(KEYWORDS.global, KEYWORDS.nippers);
    applyPageMeta({
      title: config.title,
      description: config.description,
      keywords: kw,
      canonical: `${SITE}${config.path}`,
      ogImage: `${SITE}/images/nippers-main.jpg`,
    });
    const faq = getCategoryFaq(catKey === 'files' ? 'files' : catKey) || FAQ.catalog;
    injectJsonLd('zerk-schema-faq', faqSchema(faq));
    return faq;
  }

  function applyProductSeo(product, catalog, routes) {
    const path = catalog.productUrl(product.id);
    const canonical = path.startsWith('http') ? path : `${SITE}${path}`;
    const kw = keywordsForProduct(product);
    applyPageMeta({
      title: productTitle(product),
      description: productDescription(product, catalog),
      keywords: kw,
      canonical,
      ogImage: product.image.startsWith('http') ? product.image : `${SITE}/${product.image}`,
    });
    const crumbs = [
      { name: BRAND, url: '/' },
      { name: 'Коллекция', url: '/collection' },
    ];
    const catPath = routes?.categoryPathForProduct?.(product);
    const catLabel = catalog.labels[product.cat];
    if (catPath) crumbs.push({ name: catLabel, url: catPath });
    crumbs.push({ name: product.id, url: null });

    injectJsonLd('zerk-schema-product', productSchema(product, catalog, canonical));
    injectJsonLd('zerk-schema-faq', faqSchema(productFaq(product, catalog)));
    renderBreadcrumbs(document.getElementById('productBreadcrumbs'), crumbs);
    const faqEl = document.getElementById('productFaq');
    renderFaq(faqEl, productFaq(product, catalog), 'Частые вопросы');
  }

  function initHomePage() {
    applyPageMeta({
      title: `${BRAND} — Кусачки для кутикулы и маникюрный инструмент премиум`,
      description:
        `${BRAND} — профессиональные кусачки для кутикулы, маникюрные ножницы, пилки-файлы и перчатки Glovity. Японская сталь SUS 420 J2, ручная заточка, каталог zerk-tool.ru.`,
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
        target: `${SITE}/collection?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    });
    injectJsonLd('zerk-schema-faq', faqSchema(FAQ.home));
    renderFaq(document.getElementById('homeFaq'), FAQ.home);
  }

  function initCatalogPage(productCount) {
    applyPageMeta({
      title: `Каталог ${BRAND} — кусачки, ножницы, пилки-файлы, Glovity`,
      description:
        `Каталог ${BRAND}: кусачки IL-02…IAL-01, ножницы Solingen, пилки-файлы, пушеры, перчатки Glovity NG-100. Профессиональный инструмент — zerk-tool.ru.`,
      keywords: joinKeywords(KEYWORDS.global, KEYWORDS.nippers, KEYWORDS.scissors, KEYWORDS.files, KEYWORDS.gloves),
      canonical: `${SITE}/collection`,
    });
    injectJsonLd('zerk-schema-faq', faqSchema(FAQ.catalog));
    renderFaq(document.getElementById('catalogFaq'), FAQ.catalog);
    const stat = document.querySelector('.catalog-stats [data-count]');
    if (stat && productCount) stat.dataset.count = String(productCount);
  }

  window.ZERK_SEO = {
    BRAND,
    BRAND_SHORT,
    SITE,
    KEYWORDS,
    FAQ,
    joinKeywords,
    applyPageMeta,
    applyCategoryPage,
    applyProductSeo,
    initHomePage,
    initCatalogPage,
    getCategoryFaq,
    productH1,
    imageAlt,
    productFaq,
    faqSchema,
    breadcrumbSchema,
    renderBreadcrumbs,
    renderFaq,
    injectJsonLd,
  };
})();
