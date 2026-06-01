/**
 * ZERK — данные каталога
 */
(function () {
  'use strict';

  const DEFAULT_IMAGE = 'images/nippers-main.jpg';
  const STANDARD_BLADES = [4, 5, 6];
  const ORIGIN_VIETNAM = 'Вьетнам';
  const VIETNAM_NOTE = 'Производство во Вьетнаме — контролируемое качество.';

  const PRICES = {
    nipper: 1300,
    clipper: 540,
    pusher: 320,
    scissors: 1680,
    glove: 590,
    file: { mini: 450, maxi: 500, long: 630, boat: 630 },
  };

  function formatPrice(amount) {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  const NIPPER_MODELS = [
    {
      code: 'IL-02',
      note: 'Компактный профиль — точный контроль и мягкий ход для ежедневного маникюра.',
      handleGrip:
        'Длина 105 мм. Ручки скруглены к концу — комфортный захват без излишнего объёма в ладони.',
      image: 'images/il-02.jpg',
      weight: 40,
      size: 105,
      origin: ORIGIN_VIETNAM,
    },
    {
      code: 'IL-03',
      note: 'Классический профиль для ежедневной работы с кутикулой.',
      handleGrip:
        'Длина 107 мм. Ручки стандартной округлой формы — захват и усилие в основном на указательный и большой палец.',
      image: 'images/il-03.jpg',
      weight: 40,
      size: 107,
      origin: ORIGIN_VIETNAM,
    },
    {
      code: 'IL-07',
      note: 'Усиленный ход для плотной и сухой кутикулы.',
      handleGrip:
        'Длина 111 мм. Ручки менее округлые, вытянутые — упор смещён на средние пальцы, больше рычага без лишней ширины.',
      image: 'images/il-07.jpg',
      weight: 40,
      size: 111,
      origin: ORIGIN_VIETNAM,
    },
    {
      code: 'IL-09',
      note: 'Сбалансированная модель для салонного протокола.',
      handleGrip:
        'Длина 115 мм. Ручки ещё более удлинённые: первые пальцы направляют инструмент, задние дают усилие среза — удобно при длительной работе.',
      image: 'images/il-09.jpg',
      weight: 42,
      size: 115,
      origin: ORIGIN_VIETNAM,
    },
    {
      code: 'IL-12',
      note: 'Стильный дизайн с полированной сталью и точным контролем захвата.',
      handleGrip:
        'Длина 106 мм. Ручки практически прямые — лаконичная геометрия, выразительный внешний вид, уверенный хват.',
      image: 'images/il-12.jpg',
      weight: 25,
      size: 106,
      origin: ORIGIN_VIETNAM,
    },
    {
      code: 'IAL-01',
      blades: [8],
      note: 'Увеличенное лезвие 8 мм — для плотной кутикулы, мозолей и педикюра.',
      handleGrip: 'Длина 104 мм. Ручки круглые усиленные — максимальная опора ладони при работе с толстой кутикулой.',
      image: 'images/ial-01.jpg',
      weight: 50,
      size: 104,
      badge: 'Педикюр',
      origin: ORIGIN_VIETNAM,
    },
  ];

  const CLIPPER_MODELS = [
    {
      code: 'CL-01',
      sizeLabel: 'Крупный',
      note: 'Крупный книпсер CL-01 — усиленный рычаг и уверенный срез для плотных ногтей и педикюра.',
      details: [
        'Модель CL-01 — самый крупный размер в линейке книпсеров ZERK. Гравировка ZK на рычаге, сталь S45C.',
        'Подходит для салонного протокола, когда нужна мощность без рывков и сколов ногтевой пластины.',
        VIETNAM_NOTE,
      ],
    },
    {
      code: 'CL-02',
      sizeLabel: 'Средний',
      note: 'Универсальный книпсер CL-02 — основной размер для ежедневной работы мастера.',
      details: [
        'CL-02 — сбалансированный средний формат: удобный захват, предсказуемый ход, сталь S45C.',
        'Оптимален для комбинированного и классического маникюра, коррекции длины и формы.',
        VIETNAM_NOTE,
      ],
    },
    {
      code: 'CS-02',
      sizeLabel: 'Компактный',
      note: 'Компактный книпсер CS-02 — точная работа на узкой пластине и детской коррекции.',
      details: [
        'CS-02 — компактная геометрия для деликатных зон и мастеров, которым важен максимальный контроль.',
        'Нержавеющая сталь S45C, фирменная маркировка ZK.',
        VIETNAM_NOTE,
      ],
    },
  ];

  const SCISSOR_MODELS = [
    {
      code: '817',
      image: 'images/scissors-solingen.jpg',
      material: 'Нержавеющая хирургическая сталь',
      origin: 'Золинген, Германия',
      note: 'Тонкие изогнутые лезвия для аккуратной работы с кутикулой и кожицей.',
      details: [
        'Модель 817 — профессиональные маникюрные ножницы с тонкими изогнутыми лезвиями. Подходят для деликатной обработки кутикулы, снятия птеригия и точной коррекции в зоне ногтевой валики.',
        'На ручке гравировка Professional Solingen — маркер происхождения и уровня инструмента. Сбалансированный ход, удобные кольца для длительной работы в салоне.',
        'Сталь хирургического класса выдерживает регулярную дезинфекцию и стерилизацию по протоколу мастера.',
      ],
    },
    {
      code: '837',
      image: 'images/scissors-solingen.jpg',
      material: 'Нержавеющая хирургическая сталь',
      origin: 'Золинген, Германия',
      note: 'Профессиональная геометрия лезвий и фирменная гравировка ZERK на ручке.',
      details: [
        'Модель 837 — ножницы той же линейки Solingen с акцентом на фирменную отделку: гравировка Professional и логотип ZK на ручке.',
        'Изогнутые лезвия дают хороший обзор зоны реза и плавный контроль при работе с тонкой кожицей. Рекомендуются мастерам, которым важны тактильность и предсказуемый ход.',
        'Инструмент рассчитан на ежедневную нагрузку в салоне: устойчив к коррозии, совместим с профессиональными средствами обработки.',
      ],
    },
  ];

  const PUSHER_MODELS = [
    {
      code: 'P-504',
      image: 'images/pushers-p504-507.jpg',
      note: 'Плоский прямоугольный пушер и острый конический шабер.',
      tips: 'Пушер плоский · шабер конический',
      details: [
        'Двусторонний пушер-шабер P-504: с одной стороны плоская прямоугольная рабочая площадка для отодвигания кутикулы, с другой — острый конический шабер для точной очистки боковых валиков.',
        'Рифлёная рукоять не скользит в перчатках и при длительной работе. Сталь S45C держит заточку и выдерживает салонную обработку.',
        VIETNAM_NOTE,
      ],
    },
    {
      code: 'P-505',
      image: 'images/pushers-p504-507.jpg',
      note: 'Широкий изогнутый пушер и плоский скошенный шабер.',
      tips: 'Пушер широкий · шабер скошенный',
      details: [
        'P-505 — универсальная связка для комбинированного маникюра: широкий изогнутый пушер охватывает ногтевую пластину, скошенный шабер снимает птеригий и ороговевшую кожу.',
        'Удобен мастерам, которым нужен один инструмент на весь этап подготовки ногтевой пластины.',
        VIETNAM_NOTE,
      ],
    },
    {
      code: 'P-506',
      image: 'images/pushers-p504-507.jpg',
      note: 'Изогнутый пушер и узкий острый шабер.',
      tips: 'Пушер изогнутый · шабер узкий',
      details: [
        'P-506 — для точной работы в труднодоступных зонах: изогнутый пушер следует форме ногтя, узкий шабер позволяет аккуратно вычистить углубления и боковые синусы.',
        'Рекомендуется при плотной кутикуле и сложной геометрии ногтевой пластины.',
        VIETNAM_NOTE,
      ],
    },
    {
      code: 'P-507',
      image: 'images/pushers-p504-507.jpg',
      note: 'Изогнутый пушер и ложкообразный пушер с обратной стороны.',
      tips: 'Два профиля пушера',
      details: [
        'P-507 — две рабочие поверхности пушера без агрессивного шабера: изогнутая и ложкообразная. Подходит для деликатной подготовки и финишной обработки кутикулы без риска повреждения ногтя.',
        VIETNAM_NOTE,
      ],
    },
    {
      code: 'P-508',
      image: 'images/pushers-p508-514.jpg',
      note: 'Классический пушер-ложка и широкий изогнутый крюк-шабер.',
      tips: 'Пушер-ложка · шабер-крюк широкий',
      details: [
        'P-508 — флагман линейки с гравировкой ZK на головке: ложкообразный пушер для отодвигания кутикулы и широкий изогнутый крюк для снятия птеригия.',
        'Очень острая и качественная заточка, сталь S45C.',
        VIETNAM_NOTE,
      ],
    },
    {
      code: 'P-511',
      image: 'images/pushers-p508-514.jpg',
      note: 'Пушер-ложка и узкий изогнутый шабер.',
      tips: 'Пушер-ложка · шабер узкий',
      details: [
        'P-511 — сбалансированная модель: та же эргономика пушера, что у P-508, но более узкий изогнутый шабер для контролируемой работы в боковых зонах.',
        VIETNAM_NOTE,
      ],
    },
    {
      code: 'P-514',
      image: 'images/pushers-p508-514.jpg',
      note: 'Пушер-ложка и острый копьевидный шабер.',
      tips: 'Пушер-ложка · шабер острый',
      details: [
        'P-514 — максимальная точность на шаберной стороне: копьевидное лезвие для точечной очистки, вросших участков и детальной коррекции валика.',
        'Для опытных мастеров, которым важен контроль каждого движения.',
        VIETNAM_NOTE,
      ],
    },
  ];

  function nipperDetails(model, blade) {
    const pedicure =
      blade >= 8
        ? ' Увеличенное лезвие подходит для педикюра, плотной кутикулы и зон с утолщённой кожей.'
        : '';
    return [
      `${model.note}${pedicure}`,
      model.handleGrip || null,
      `Корпус ${model.size} мм, вес ${model.weight} г. Сталь SUS 420 J2: высокая твёрдость режущей кромки, стабильность при стерилизации.`,
      'Ручная заточка и контроль качества перед отгрузкой. Подходит для химической и термической обработки в салоне.',
      VIETNAM_NOTE,
    ].filter(Boolean);
  }

  const nippers = NIPPER_MODELS.flatMap((model) => {
    const blades = model.blades || STANDARD_BLADES;
    return blades.map((blade) => ({
      id: `${model.code}-${blade}`,
      model: model.code,
      blade,
      cat: 'nippers',
      title: `Лезвие ${blade} мм`,
      desc: `${model.note} Лезвие ${blade} мм.`,
      details: nipperDetails(model, blade),
      badge:
        model.code === 'IL-03' && blade === 5
          ? 'Хит'
          : model.badge && blades.length === 1
            ? model.badge
            : '',
      image: model.image,
      weight: model.weight,
      size: model.size,
      material: 'SUS 420 J2',
      origin: model.origin || ORIGIN_VIETNAM,
      price: PRICES.nipper,
    }));
  });

  const clippers = CLIPPER_MODELS.map((model) => ({
    id: model.code,
    model: model.code,
    cat: 'nippers',
    productType: 'clipper',
    title: 'Книпсер',
    desc: model.note,
    details: model.details,
    badge: '',
    image: 'images/clippers.jpg',
    material: 'Нержавеющая сталь S45C',
    origin: ORIGIN_VIETNAM,
    sizeLabel: model.sizeLabel,
    price: PRICES.clipper,
  }));

  const scissors = SCISSOR_MODELS.map((model) => ({
    id: model.code,
    model: model.code,
    cat: 'scissors',
    title: `Ножницы ${model.code}`,
    desc: model.note,
    details: model.details,
    badge: '',
    image: model.image,
    material: model.material,
    origin: model.origin,
    price: PRICES.scissors,
  }));

  const FILE_GRITS = [100, 180, 240];

  const FILE_MODELS = [
    {
      code: 'mini',
      title: 'Mini',
      shape: 'прямая',
      width: 12,
      length: 130,
      image: 'images/files-mini.jpg',
      note: 'Узкий сменный файл 12×130 мм — точная работа у боковых валиков и на узкой пластине.',
      detailsIntro:
        'Сменные абразивные полоски для металлической основы Mini. Компактная ширина даёт контроль в труднодоступных зонах.',
    },
    {
      code: 'maxi',
      title: 'Maxi',
      shape: 'прямая',
      width: 20,
      length: 130,
      image: 'images/files-maxi.jpg',
      note: 'Ширина 20 мм и длина 130 мм — больше рабочая зона за один проход по пластине.',
      detailsIntro:
        'Формат Maxi для стандартных металлических основ: прямая геометрия, удобный захват, стабильная подача абразива.',
    },
    {
      code: 'long',
      title: 'Long',
      shape: 'прямая',
      width: 20,
      length: 180,
      image: 'images/files-long.jpg',
      note: 'Удлинённый файл 20×180 мм — для длинных основ и обработки без смены хвата.',
      detailsIntro:
        'Long закрывает потребность в увеличенной рабочей длине: меньше перестановок руки, ровнее шлифовка всей пластины.',
    },
    {
      code: 'boat',
      title: 'Лодка',
      shape: 'лодочка',
      width: null,
      length: 180,
      image: 'images/files-boat.jpg',
      note: 'Форма «лодочка», длина 180 мм — прямая и изогнутая грань для валика и архитектуры ногтя.',
      detailsIntro:
        'Профиль «лодка»: одна сторона прямая, вторая дугообразная. Подходит для контролируемой обработки валика и боковых зон.',
    },
  ];

  function gritNote(grit) {
    if (grit === 100) {
      return 'Грит 100 — грубый абразив для коррекции длины, снятия гель-лака и выраженных неровностей.';
    }
    if (grit === 180) {
      return 'Грит 180 — универсальный салонный вариант: баланс скорости и контролируемой обработки.';
    }
    return 'Грит 240 — финишная доводка поверхности и подготовка под покрытие.';
  }

  function fileDimensions(model) {
    if (model.width) return `${model.width} × ${model.length} мм`;
    return `${model.length} мм`;
  }

  function fileDetails(model, grit) {
    return [
      `${model.detailsIntro} ${gritNote(grit)}`,
      `Форма: ${model.shape}, размер ${fileDimensions(model)}. Крепление на металлическую основу — смена на каждого клиента, гигиеничный протокол.`,
      'Металлические основы ZERK подходят для химической и термической стерилизации. Абразивные файлы — расходный элемент, замена по регламенту салона.',
    ];
  }

  const pushers = PUSHER_MODELS.map((model) => ({
    id: model.code,
    model: model.code,
    cat: 'pushers',
    title: 'Пушер-шабер',
    desc: model.note,
    details: model.details,
    tips: model.tips,
    badge: '',
    image: model.image,
    material: 'Нержавеющая сталь S45C',
    origin: ORIGIN_VIETNAM,
    price: PRICES.pusher,
  }));

  const GLOVE_SIZES = ['S', 'M', 'L'];

  const gloves = GLOVE_SIZES.map((size) => ({
    id: `NG-100-${size}`,
    model: 'NG-100',
    brand: 'Glovity',
    size,
    packSize: 100,
    cat: 'gloves',
    title: `Размер ${size}`,
    desc: 'Нитриловые перчатки Glovity без пудры — плотное прилегание и тактильный контроль для салонного протокола.',
    details: [
      'Перчатки нитрил Glovity NG-100 — без пудры, нестерильные, для одноразового использования в маникюре и педикюре.',
      `Упаковка ${100} шт., размер ${size}. Подходят для комбинированного и аппаратного маникюра, защиты рук мастера при работе с препаратами.`,
      'Материал нитрил — устойчивость к растяжению и проколам, удобная посадка без «перчаточного» запаха латекса.',
    ],
    badge: size === 'M' ? 'Хит' : '',
    image: 'images/gloves-nitrile.svg',
    material: 'Нитрил',
    origin: 'Бренд Glovity',
    price: PRICES.glove,
  }));

  const fileStrips = FILE_MODELS.flatMap((model) =>
    FILE_GRITS.map((grit) => ({
      id: `FILE-${model.code.toUpperCase()}-${grit}`,
      model: model.title,
      modelCode: model.code,
      grit,
      cat: 'files',
      title: `${grit} грит`,
      desc: `${model.note} Абразив ${grit} грит.`,
      details: fileDetails(model, grit),
      badge: grit === 180 && model.code === 'mini' ? 'Хит' : '',
      image: model.image,
      shape: model.shape,
      dimensions: fileDimensions(model),
      material: 'Сменный абразив на основу',
      price: PRICES.file[model.code],
    }))
  );

  const products = [...nippers, ...clippers, ...scissors, ...pushers, ...fileStrips, ...gloves];

  function attachSlugs() {
    const routes = window.ZERK_ROUTES;
    if (!routes) return;
    products.forEach((p) => {
      p.slug = routes.productSlug(p);
      p.path = routes.productPath(p);
    });
  }

  attachSlugs();

  function productUrl(id) {
    const p = getById(id);
    if (p?.path) return p.path;
    const routes = window.ZERK_ROUTES;
    if (p && routes) return routes.productPath(p);
    return `/collection`;
  }

  function getByPath(pathname) {
    const routes = window.ZERK_ROUTES;
    if (!routes) return null;
    const path = String(pathname || '').replace(/\/+$/, '') || '/';
    if (path === '/product' || path === '/product/index.html') return null;
    const direct = products.find((p) => p.path === path);
    if (direct) return direct;
    const id = routes.legacyIdFromPath(routes.parseProductPath(path), { products, getById });
    return id ? getById(id) : null;
  }

  function getRelated(product, limit = 4) {
    if (!product) return [];
    const sameCat = products.filter((p) => p.cat === product.cat && p.id !== product.id);
    const sameModel = sameCat.filter((p) => p.model === product.model);
    const pool = sameModel.length > 1 ? sameModel : sameCat;
    return pool.slice(0, limit);
  }

  function orderMessage(product) {
    if (!product) return 'Здравствуйте! Хочу оформить заказ ZERK.';
    const priceLine = product.price ? `, ${formatPrice(product.price)}` : '';
    if (product.cat === 'nippers') {
      if (product.productType === 'clipper') {
        return `Здравствуйте! Интересует книпсер ${product.model} (артикул ${product.id}${priceLine}).`;
      }
      return `Здравствуйте! Интересует ${product.model}, лезвие ${product.blade} мм (артикул ${product.id}${priceLine}).`;
    }
    if (product.cat === 'pushers') {
      return `Здравствуйте! Интересует пушер-шабер ${product.model} (артикул ${product.id}${priceLine}).`;
    }
    if (product.cat === 'files') {
      return `Здравствуйте! Интересуют пилки-файлы ${product.model}, ${product.grit} грит (артикул ${product.id}${priceLine}).`;
    }
    if (product.cat === 'gloves') {
      return `Здравствуйте! Интересуют перчатки Glovity ${product.model}, размер ${product.size} (артикул ${product.id}${priceLine}).`;
    }
    return `Здравствуйте! Интересует ножницы ${product.model} (артикул ${product.id}${priceLine}).`;
  }

  function telegramOrderUrl(product) {
    const tg = typeof window !== 'undefined' && window.ZERK_TELEGRAM
      ? window.ZERK_TELEGRAM
      : 'https://t.me/Mr_Anderson_pnz';
    return `${tg}?text=${encodeURIComponent(orderMessage(product))}`;
  }

  function whatsappOrderUrl(product) {
    const wa =
      typeof window !== 'undefined' && window.ZERK_WHATSAPP
        ? window.ZERK_WHATSAPP
        : 'https://wa.me/79257700803';
    const text = product ? orderMessage(product) : 'Здравствуйте! Хочу оформить заказ ZERK.';
    return `${wa}?text=${encodeURIComponent(text)}`;
  }

  function vkOrderUrl() {
    return typeof window !== 'undefined' && window.ZERK_VK
      ? window.ZERK_VK
      : 'https://vk.com/im/convo/94289869?tab=all';
  }

  function getById(id) {
    return products.find((p) => p.id === id) || null;
  }

  function productDisplayName(product) {
    if (!product) return '';
    if (product.cat === 'nippers' && product.productType === 'clipper') {
      return `Книпсер ${product.model}`;
    }
    if (product.cat === 'nippers') {
      return `${product.model}, лезвие ${product.blade} мм`;
    }
    if (product.cat === 'pushers') {
      return `Пушер-шабер ${product.model}`;
    }
    if (product.cat === 'files') {
      return `Пилки-файлы ${product.model}, ${product.grit} грит`;
    }
    if (product.cat === 'gloves') {
      return `Перчатки Glovity ${product.model}, размер ${product.size}`;
    }
    return `Ножницы ${product.model}`;
  }

  function cartLineSnapshot(product) {
    if (!product) return null;
    return {
      id: product.id,
      name: productDisplayName(product),
      price: product.price || 0,
      image: product.image,
      url: productUrl(product.id),
    };
  }

  function buildCartOrderMessage(items, customer) {
    const lines = ['Заказ ZERK TOOL', ''];
    if (customer.name) lines.push(`Имя: ${customer.name}`);
    if (customer.phone) lines.push(`Телефон: ${customer.phone}`);
    if (customer.comment) lines.push(`Комментарий: ${customer.comment}`);
    lines.push('', 'Товары:');

    let totalQty = 0;
    let totalSum = 0;
    items.forEach((item) => {
      const sum = item.price * item.qty;
      totalQty += item.qty;
      totalSum += sum;
      const pricePart = item.price ? ` = ${formatPrice(sum)}` : '';
      lines.push(`• ${item.name} (${item.id}) × ${item.qty}${pricePart}`);
    });

    lines.push('', `Всего позиций: ${totalQty}`);
    if (totalSum) lines.push(`Сумма: ${formatPrice(totalSum)}`);
    return lines.join('\n');
  }

  function specsFor(product) {
    if (!product) return [];
    const priceRow = product.price
      ? [{ label: 'Цена', value: formatPrice(product.price) }]
      : [];
    if (product.cat === 'nippers') {
      if (product.productType === 'clipper') {
        return [
          { label: 'Артикул', value: product.id },
          ...priceRow,
          { label: 'Модель', value: product.model },
          { label: 'Размер', value: product.sizeLabel },
          { label: 'Материал', value: product.material },
          { label: 'Производство', value: product.origin },
          { label: 'Категория', value: 'Книпсер' },
        ];
      }
      return [
        { label: 'Артикул', value: product.id },
        ...priceRow,
        { label: 'Модель', value: product.model },
        { label: 'Лезвие', value: `${product.blade} мм` },
        { label: 'Вес', value: `${product.weight} г` },
        { label: 'Размер', value: `${product.size} мм` },
        { label: 'Материал', value: product.material },
        { label: 'Производство', value: product.origin },
        { label: 'Категория', value: 'Кусачки для кутикулы' },
      ];
    }
    if (product.cat === 'pushers') {
      return [
        { label: 'Артикул', value: product.id },
        ...priceRow,
        { label: 'Модель', value: product.model },
        { label: 'Насадки', value: product.tips },
        { label: 'Материал', value: product.material },
        { label: 'Производство', value: product.origin },
        { label: 'Категория', value: 'Пушер-шабер' },
      ];
    }
    if (product.cat === 'files') {
      return [
        { label: 'Артикул', value: product.id },
        ...priceRow,
        { label: 'Форма', value: product.model },
        { label: 'Профиль', value: product.shape },
        { label: 'Размер', value: product.dimensions },
        { label: 'Абразив', value: `${product.grit} грит` },
        { label: 'Основа', value: 'Металл · стерилизация' },
        { label: 'Категория', value: 'Пилки файлы ZERK' },
      ];
    }
    if (product.cat === 'gloves') {
      return [
        { label: 'Артикул', value: product.id },
        ...priceRow,
        { label: 'Модель', value: product.model },
        { label: 'Размер', value: product.size },
        { label: 'Упаковка', value: `${product.packSize} шт.` },
        { label: 'Материал', value: product.material },
        { label: 'Бренд', value: product.brand || 'Glovity' },
        { label: 'Категория', value: 'Перчатки нитрил' },
      ];
    }
    return [
      { label: 'Артикул', value: product.id },
      ...priceRow,
      { label: 'Модель', value: product.model },
      { label: 'Материал', value: product.material },
      { label: 'Производство', value: product.origin },
      { label: 'Категория', value: 'Ножницы' },
    ];
  }

  function siblings(product) {
    if (!product) return [];
    if (product.cat === 'nippers') {
      if (product.productType === 'clipper') {
        return products.filter((p) => p.cat === 'nippers' && p.productType === 'clipper');
      }
      return products.filter(
        (p) => p.cat === 'nippers' && p.model === product.model && !p.productType
      );
    }
    if (product.cat === 'pushers') {
      return products.filter((p) => p.cat === 'pushers');
    }
    if (product.cat === 'files') {
      return products.filter(
        (p) => p.cat === 'files' && p.modelCode === product.modelCode
      );
    }
    if (product.cat === 'gloves') {
      return products.filter((p) => p.cat === 'gloves' && p.model === product.model);
    }
    return products.filter((p) => p.cat === 'scissors');
  }

  window.ZERK_CATALOG = {
    labels: {
      nippers: 'Кусачки для кутикулы',
      scissors: 'Ножницы',
      pushers: 'Пушер-шабер',
      files: 'Пилки файлы',
      gloves: 'Перчатки Glovity',
    },
    families: {
      nippers: [
        ...NIPPER_MODELS.map((m) => ({
          code: m.code,
          title: m.code,
          subtitle:
            m.blades && m.blades[0] === 8
              ? `Кусачки · лезвие 8 мм · ${m.weight} г · ${m.size} мм · SUS 420 J2 · ${ORIGIN_VIETNAM}`
              : `Кусачки · ${m.weight} г · ${m.size} мм · SUS 420 J2 · ${ORIGIN_VIETNAM}`,
          image: m.image,
        })),
        {
          code: 'clippers',
          title: 'Книпсеры',
          subtitle: `CL-01 / CL-02 / CS-02 · сталь S45C · ${ORIGIN_VIETNAM}`,
          image: 'images/clippers.jpg',
          productIds: clippers.map((p) => p.id),
        },
      ],
      scissors: [
        {
          code: 'scissors-solingen',
          title: 'Ножницы Solingen',
          subtitle: 'Нержавеющая хирургическая сталь · Германия',
          image: 'images/scissors-solingen.jpg',
          productIds: scissors.map((p) => p.id),
        },
      ],
      pushers: [
        {
          code: 'pushers-504',
          title: 'Пушер-шабер P-504 — P-507',
          subtitle: `Двусторонние · рифлёная рукоять · S45C · ${ORIGIN_VIETNAM}`,
          image: 'images/pushers-p504-507.jpg',
          productIds: ['P-504', 'P-505', 'P-506', 'P-507'],
        },
        {
          code: 'pushers-508',
          title: 'Пушер-шабер P-508 — P-514',
          subtitle: `Острые профессиональные · гравировка ZK · S45C · ${ORIGIN_VIETNAM}`,
          image: 'images/pushers-p508-514.jpg',
          productIds: ['P-508', 'P-511', 'P-514'],
        },
      ],
      files: FILE_MODELS.map((m) => ({
        code: m.code,
        title: m.title,
        subtitle: `${fileDimensions(m)} · ${m.shape} · грит 100 / 180 / 240 · ZERK`,
        image: m.image,
      })),
      gloves: [
        {
          code: 'NG-100',
          title: 'Glovity NG-100',
          subtitle: 'Нитрил · без пудры · 100 шт · S / M / L',
          image: 'images/gloves-nitrile.svg',
        },
      ],
    },
    productCount: products.length,
    products,
    defaultImage: DEFAULT_IMAGE,
    modelImages: {
      ...Object.fromEntries(NIPPER_MODELS.map((m) => [m.code, m.image])),
      ...Object.fromEntries(SCISSOR_MODELS.map((m) => [m.code, m.image])),
      ...Object.fromEntries(PUSHER_MODELS.map((m) => [m.code, m.image])),
      ...Object.fromEntries(FILE_MODELS.map((m) => [m.code, m.image])),
    },
    productUrl,
    getByPath,
    getRelated,
    getById,
    productDisplayName,
    cartLineSnapshot,
    buildCartOrderMessage,
    orderMessage,
    telegramOrderUrl,
    whatsappOrderUrl,
    vkOrderUrl,
    specsFor,
    siblings,
    originVietnam: ORIGIN_VIETNAM,
    vietnamNote: VIETNAM_NOTE,
    prices: PRICES,
    formatPrice,
  };
})();
