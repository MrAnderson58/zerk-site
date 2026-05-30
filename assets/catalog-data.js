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

  const nippers = NIPPER_MODELS.flatMap((model) =>
    BLADE_SIZES.map((blade) => ({
      id: `${model.code}-${blade}`,
      model: model.code,
      blade,
      cat: 'nippers',
      desc: `${model.note} Лезвие ${blade} мм.`,
      badge: model.code === 'IL-03' && blade === 5 ? 'Хит' : '',
      image: model.image,
      weight: model.weight,
      size: model.size,
    }))
  );

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
    },
    products: [
      ...nippers,
      // Остальные категории — позже
    ],
    defaultImage: DEFAULT_IMAGE,
    modelImages: Object.fromEntries(NIPPER_MODELS.map((m) => [m.code, m.image])),
  };
})();
