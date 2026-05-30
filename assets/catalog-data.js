/**
 * ZERK — данные каталога
 */
(function () {
  'use strict';

  const DEFAULT_IMAGE = 'images/nippers-main.jpg';

  const NIPPER_MODELS = [
    {
      code: 'IL-03',
      note: 'Классический профиль для ежедневной работы с кутикулой.',
      image: 'images/il-03.jpg',
      weight: 40,
      size: 107,
    },
    {
      code: 'IL-07',
      note: 'Усиленный ход для плотной и сухой кутикулы.',
      image: 'images/il-07.jpg',
      weight: 40,
      size: 113,
    },
    {
      code: 'IL-09',
      note: 'Сбалансированная модель для салонного протокола.',
      image: 'images/il-09.jpg',
      weight: 42,
      size: 115,
    },
    {
      code: 'IL-12',
      note: 'Удлинённые ручки и точный контроль захвата.',
      image: 'images/il-12.jpg',
      weight: 25,
      size: 100,
    },
  ];

  const BLADE_SIZES = [4, 5, 6];

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

  function nipperDetails(model, blade) {
    return [
      `${model.note} Лезвие ${blade} мм — выберите размер под плотность кутикулы и привычный протокол.`,
      `Корпус ${model.size} мм, вес ${model.weight} г. Сталь SUS 420 J2: высокая твёрдость режущей кромки, стабильность при стерилизации.`,
      'Ручная заточка и контроль качества перед отгрузкой. Подходит для химической и термической обработки в салоне.',
    ];
  }

  const nippers = NIPPER_MODELS.flatMap((model) =>
    BLADE_SIZES.map((blade) => ({
      id: `${model.code}-${blade}`,
      model: model.code,
      blade,
      cat: 'nippers',
      title: `Лезвие ${blade} мм`,
      desc: `${model.note} Лезвие ${blade} мм.`,
      details: nipperDetails(model, blade),
      badge: model.code === 'IL-03' && blade === 5 ? 'Хит' : '',
      image: model.image,
      weight: model.weight,
      size: model.size,
      material: 'SUS 420 J2',
    }))
  );

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
  }));

  const products = [...nippers, ...scissors];

  function productUrl(id) {
    return `product.html?id=${encodeURIComponent(id)}`;
  }

  function orderMessage(product) {
    if (!product) return 'Здравствуйте! Хочу оформить заказ ZERK.';
    if (product.cat === 'nippers') {
      return `Здравствуйте! Интересует ${product.model}, лезвие ${product.blade} мм (артикул ${product.id}).`;
    }
    return `Здравствуйте! Интересует ножницы ${product.model} (артикул ${product.id}).`;
  }

  function telegramOrderUrl(product) {
    const tg = typeof window !== 'undefined' && window.ZERK_TELEGRAM
      ? window.ZERK_TELEGRAM
      : 'https://t.me/Mr_Anderson_pnz';
    return `${tg}?text=${encodeURIComponent(orderMessage(product))}`;
  }

  function getById(id) {
    return products.find((p) => p.id === id) || null;
  }

  function specsFor(product) {
    if (!product) return [];
    if (product.cat === 'nippers') {
      return [
        { label: 'Артикул', value: product.id },
        { label: 'Модель', value: product.model },
        { label: 'Лезвие', value: `${product.blade} мм` },
        { label: 'Вес', value: `${product.weight} г` },
        { label: 'Размер', value: `${product.size} мм` },
        { label: 'Материал', value: product.material },
        { label: 'Категория', value: 'Кусачки для кутикулы' },
      ];
    }
    return [
      { label: 'Артикул', value: product.id },
      { label: 'Модель', value: product.model },
      { label: 'Материал', value: product.material },
      { label: 'Производство', value: product.origin },
      { label: 'Категория', value: 'Ножницы' },
    ];
  }

  function siblings(product) {
    if (!product) return [];
    if (product.cat === 'nippers') {
      return products.filter((p) => p.cat === 'nippers' && p.model === product.model);
    }
    return products.filter((p) => p.cat === 'scissors');
  }

  window.ZERK_CATALOG = {
    labels: {
      nippers: 'Кусачки для кутикулы',
      scissors: 'Ножницы',
      pushers: 'Пушеры',
      files: 'Пилки',
    },
    families: {
      nippers: NIPPER_MODELS.map((m) => ({
        code: m.code,
        title: m.code,
        subtitle: `Кусачки · ${m.weight} г · ${m.size} мм · SUS 420 J2`,
        image: m.image,
      })),
      scissors: [
        {
          code: 'scissors-solingen',
          title: 'Ножницы Solingen',
          subtitle: 'Нержавеющая хирургическая сталь · Германия',
          image: 'images/scissors-solingen.jpg',
          productIds: scissors.map((p) => p.id),
        },
      ],
    },
    products,
    defaultImage: DEFAULT_IMAGE,
    modelImages: {
      ...Object.fromEntries(NIPPER_MODELS.map((m) => [m.code, m.image])),
      ...Object.fromEntries(SCISSOR_MODELS.map((m) => [m.code, m.image])),
    },
    productUrl,
    getById,
    orderMessage,
    telegramOrderUrl,
    specsFor,
    siblings,
  };
})();
