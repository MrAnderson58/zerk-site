/**
 * ZERK TOOL — URL architecture & category registry
 */
(function () {
  'use strict';

  const SITE = 'https://zerk-tool.ru';
  const BRAND = 'ZERK TOOL';

  /** @type {Record<string, { path: string, cat: string|null, label: string, grid?: boolean }>} */
  const CATEGORIES = {
    collection: {
      path: '/collection',
      cat: null,
      label: 'Коллекция',
      h1: 'Коллекция ZERK TOOL',
      title: 'Коллекция ZERK TOOL — профессиональный маникюрный инструмент',
      description:
        'Полная коллекция ZERK TOOL: кусачки для кутикулы, ножницы Solingen, сменные файлы, пушеры и перчатки Glovity. Японская сталь, ручная заточка.',
      intro:
        'ZERK TOOL — премиальный бренд инструмента для nail-мастеров и салонов. Кусачки SUS 420 J2, ножницы из Германии, абразивы на металлическую основу и нитриловые перчатки Glovity.',
    },
    nippers: {
      path: '/nippers',
      cat: 'nippers',
      label: 'Кусачки для кутикулы',
      grid: true,
      h1: 'Кусачки для кутикулы ZERK TOOL',
      title: 'Кусачки для кутикулы ZERK TOOL — японская сталь, ручная заточка',
      description:
        'Профессиональные кусачки ZERK TOOL IL-02…IL-32 и IAL-01: SUS 420 J2, лезвия 4–9 мм, ручная заточка, производство во Вьетнаме. Для мастеров и салонов.',
      intro:
        'Кусачки ZERK TOOL созданы для точной работы с кутикулой: мягкий ход, стабильная режущая кромка и готовность к стерилизации. Серия IL — японская сталь SUS 420 J2; книпсеры CL/CS — сталь S45C.',
    },
    scissors: {
      path: '/scissors',
      cat: 'scissors',
      label: 'Ножницы',
      grid: true,
      h1: 'Маникюрные ножницы ZERK TOOL',
      title: 'Маникюрные ножницы ZERK TOOL Solingen — премиум для мастеров',
      description:
        'Профессиональные ножницы ZERK TOOL 817 и 837: Solingen, хирургическая сталь, ручная заточка. Для деликатной кутикулы и салонного протокола.',
      intro:
        'Ножницы ZERK TOOL — немецкое происхождение Solingen, тонкие лезвия и сбалансированный ход. Подходят для комбинированного и аппаратного маникюра, стерилизации по протоколу мастера.',
    },
    'nail-files': {
      path: '/nail-files',
      cat: null,
      label: 'Пилки для ногтей',
      grid: false,
      h1: 'Пилки и файлы ZERK TOOL',
      title: 'Пилки для ногтей ZERK TOOL — профессиональные абразивы',
      description:
        'Пилки и сменные файлы ZERK TOOL на металлическую основу: Mini, Maxi, Long, лодочка. Грит 100 / 180 / 240. Премиум для салонов.',
      intro:
        'ZERK TOOL предлагает сменные абразивные полоски на стерилизуемую металлическую основу — гигиеничный стандарт для салона. Перейдите в раздел сменных файлов для выбора формы и грита.',
      cta: { href: '/replaceable-files', label: 'Сменные файлы ZERK TOOL →' },
    },
    'replaceable-files': {
      path: '/replaceable-files',
      cat: 'files',
      label: 'Сменные файлы',
      grid: true,
      h1: 'Сменные файлы ZERK TOOL',
      title: 'Сменные файлы ZERK TOOL — Mini, Maxi, Long, лодочка',
      description:
        'Сменные файлы ZERK TOOL на металлическую основу: 100 / 180 / 240 грит. Форматы Mini, Maxi, Long и лодочка. Купить в официальном каталоге.',
      intro:
        'Сменные файлы ZERK TOOL — расходник премиум-класса для металлических основ. Одна основа на протокол стерилизации, смена абразива на каждого клиента.',
    },
    'nitrile-gloves': {
      path: '/nitrile-gloves',
      cat: 'gloves',
      label: 'Перчатки нитрил',
      grid: true,
      h1: 'Нитриловые перчатки Glovity',
      title: 'Перчатки Glovity — нитриловые, чёрные, белые, розовые',
      description:
        'Нитриловые перчатки Glovity без пудры: чёрные, белые и розовые, размеры XS / S / M, 100 шт. Для маникюра, салонов и бьюти-мастеров. Каталог ZERK TOOL.',
      intro:
        'Профессиональные нитриловые перчатки Glovity — надёжная защита в индустрии красоты, медицине, клининге и салонном протоколе. Без пудры, premium-качество: три цвета (чёрный, белый, розовый) и размеры XS, S, M, упаковка 100 шт.',
    },
    pushers: {
      path: '/pushers',
      cat: 'pushers',
      label: 'Пушер-шабер',
      grid: true,
      h1: 'Пушеры-шаберы ZERK TOOL',
      title: 'Пушер-шабер ZERK TOOL P-504…P-514 — профессиональный',
      description:
        'Пушеры-шаберы ZERK TOOL: сталь S45C, производство Вьетнам, двусторонние насадки. Для мастеров маникюра.',
      intro:
        'Пушеры-шаберы ZERK TOOL — точная обработка кутикулы и валика. Рифлёные рукояти, гравировка ZK, сталь S45C.',
    },
    about: {
      path: '/about',
      cat: null,
      label: 'О бренде',
      grid: false,
      h1: 'ZERK TOOL — премиальный маникюрный инструмент',
      title: 'О бренде ZERK TOOL — японская сталь и ручная заточка',
      description:
        'ZERK TOOL — бренд профессионального маникюрного инструмента: японская сталь SUS 420 J2, ручная заточка, инструмент для nail-артистов и салонов.',
      intro:
        'Мы объехали полмира в поисках лучших и ответственных производителей маникюрного инструмента — тех, кто собирает отзывы мастеров со всего мира и доводит каждую серию до салонного стандарта. ZERK TOOL объединяет инженерный подход и эстетику luxury beauty: кусачки, ножницы, абразивы и аксессуары для nail-артистов, которые ценят предсказуемый результат.',
    },
    contacts: {
      path: '/contacts',
      cat: null,
      label: 'Контакты',
      grid: false,
      h1: 'Контакты ZERK TOOL',
      title: 'Контакты ZERK TOOL — заказ и консультация',
      description:
        'Связаться с ZERK TOOL: Telegram, WhatsApp, ВКонтакте, телефон +7 (925) 770-08-03. Заказ профессионального маникюрного инструмента.',
      intro:
        'Команда ZERK TOOL ответит на вопросы по подбору модели, наличию и заказу. Укажите артикул из каталога — например IL-07-5 или FILE-MINI-180.',
    },
  };

  function slugify(value) {
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function productSlug(product) {
    if (!product) return '';
    if (product.cat === 'nippers' && !product.productType) {
      return slugify(product.model);
    }
    if (product.cat === 'nippers' && product.productType === 'clipper') {
      return slugify(product.model);
    }
    if (product.cat === 'scissors') return slugify(product.model);
    if (product.cat === 'pushers') return slugify(product.model);
    if (product.cat === 'files') {
      return `${slugify(product.modelCode || product.model)}-${product.grit}`;
    }
    if (product.cat === 'gloves') {
      const color = slugify(product.color || 'black');
      return `${slugify(product.model)}-${color}-${String(product.size).toLowerCase()}`;
    }
    return slugify(product.id);
  }

  function variantSlug(product) {
    if (product.cat === 'nippers' && !product.productType && product.blade) {
      return `${product.blade}-mm`;
    }
    if (product.cat === 'gloves') return null;
    if (product.cat === 'files') return `${product.grit}-grit`;
    return null;
  }

  function categoryPathForProduct(product) {
    if (product.cat === 'files') return '/replaceable-files';
    if (product.cat === 'gloves') return '/nitrile-gloves';
    if (product.cat === 'scissors') return '/scissors';
    if (product.cat === 'pushers') return '/pushers';
    return '/nippers';
  }

  function productPath(product) {
    const base = categoryPathForProduct(product);
    const slug = productSlug(product);
    const variant = variantSlug(product);
    if (variant && product.cat === 'nippers' && !product.productType) {
      return `${base}/${slug}/${variant}`;
    }
    if (variant && (product.cat === 'gloves' || product.cat === 'files')) {
      return `${base}/${slug}`;
    }
    return `${base}/${slug}`;
  }

  function absoluteProductUrl(product) {
    return `${SITE}${productPath(product)}`;
  }

  function parseProductPath(pathname) {
    const clean = pathname.replace(/\/+$/, '') || '/';
    const parts = clean.split('/').filter(Boolean);
    if (parts.length < 2) return null;

    const segmentMap = {
      nippers: 'nippers',
      scissors: 'scissors',
      pushers: 'pushers',
      'replaceable-files': 'files',
      'nitrile-gloves': 'gloves',
    };
    const root = parts[0];
    const cat = segmentMap[root];
    if (!cat) return null;

    const modelSlug = parts[1];
    const variantPart = parts[2] || null;

    return { cat, root, modelSlug, variantPart };
  }

  function legacyIdFromPath(parsed, catalog) {
    if (!parsed || !catalog?.products) return null;
    const { cat, modelSlug, variantPart } = parsed;

    const candidates = catalog.products.filter((p) => {
      if (p.cat !== cat) return false;
      if (cat === 'nippers' && p.productType === 'clipper') {
        return slugify(p.model) === modelSlug;
      }
      if (cat === 'nippers') {
        return slugify(p.model) === modelSlug;
      }
      if (cat === 'files') {
        return productSlug(p) === modelSlug;
      }
      return productSlug(p) === modelSlug || slugify(p.model) === modelSlug;
    });

    if (!candidates.length) return null;

    if (variantPart && cat === 'nippers') {
      const blade = parseInt(variantPart, 10);
      const hit = candidates.find((p) => p.blade === blade);
      if (hit) return hit.id;
    }

    if (cat === 'nippers' && !variantPart) {
      const preferred = candidates.find((p) => p.blade === 5) || candidates.find((p) => p.badge === 'Хит') || candidates[0];
      return preferred?.id;
    }

    if (cat === 'gloves' && variantPart) {
      const hit = candidates.find((p) => String(p.size).toLowerCase() === variantPart);
      if (hit) return hit.id;
    }

    return candidates[0]?.id;
  }

  function getCategoryByPath(pathname) {
    const path = pathname.replace(/\/+$/, '') || '/';
    return Object.values(CATEGORIES).find((c) => c.path === path) || null;
  }

  function getCategoryKeyByPath(pathname) {
    const path = pathname.replace(/\/+$/, '') || '/';
    return Object.keys(CATEGORIES).find((k) => CATEGORIES[k].path === path) || null;
  }

  /** Legacy product.html?id= → new path */
  function legacyProductRedirect(id, catalog) {
    const product = catalog?.getById?.(id);
    if (!product) return '/collection';
    return productPath(product);
  }

  window.ZERK_ROUTES = {
    SITE,
    BRAND,
    CATEGORIES,
    slugify,
    productSlug,
    variantSlug,
    productPath,
    absoluteProductUrl,
    categoryPathForProduct,
    parseProductPath,
    legacyIdFromPath,
    legacyProductRedirect,
    getCategoryByPath,
    getCategoryKeyByPath,
  };
})();
