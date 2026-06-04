/**
 * ZERK TOOL — метаданные SEO-статей (для sitemap и клиентских скриптов)
 */
(function () {
  'use strict';

  const SITE = 'https://zerk-tool.ru';

  /** @type {Array<{slug:string,title:string,description:string,image:string,excerpt:string,datePublished:string}>} */
  const ARTICLES = [
    {
      slug: 'kak-vybrat-kusachki-dlya-kutikuly',
      title: 'Как выбрать кусачки для кутикулы в 2026 году — гид ZERK TOOL',
      description:
        'Как выбрать маникюрные кусачки для кутикулы в 2026: лезвие, сталь, ход, стерилизация. Профессиональные кусачки ZERK TOOL IL для мастера и салона.',
      image: '/images/il-03.jpg',
      excerpt:
        'Разбираем критерии выбора профессиональных кусачек: размер лезвия, японская сталь SUS 420 J2, мягкий ход и готовность к стерилизации.',
      datePublished: '2026-05-15',
    },
    {
      slug: 'kusachki-dlya-plotnoy-kutikuly',
      title: 'Кусачки для плотной кутикулы — какие модели выбрать мастеру',
      description:
        'Какие маникюрные кусачки подходят для плотной и сухой кутикулы: IL-07, IAL-01, IL-32. Профессиональный инструмент ZERK TOOL.',
      image: '/images/il-07.jpg',
      excerpt:
        'Плотная кутикула требует другого рычага и кромки. Сравниваем серии IL и усиленные модели для салонной нагрузки.',
      datePublished: '2026-05-16',
    },
    {
      slug: 'lezvie-4-5-6-mm',
      title: 'Лезвие кусачек 4, 5 или 6 мм — что выбрать мастеру маникюра',
      description:
        '4 мм, 5 мм или 6 мм: какое лезвие маникюрных кусачек выбрать для комбинированного и аппаратного маникюра. ZERK TOOL IL.',
      image: '/images/il-02.jpg',
      excerpt:
        'Размер режущей кромки влияет на скорость и точность. Объясняем, кому подходит каждый формат лезвия.',
      datePublished: '2026-05-17',
    },
    {
      slug: 'smennye-fayly-na-metallicheskuyu-osnovu',
      title: 'Сменные файлы на металлическую основу — что это и зачем мастеру',
      description:
        'Сменные файлы на металлическую основу: гигиена, форматы Mini, Maxi, Long, лодочка. Файлы ZERK TOOL 100 / 180 / 240 grit.',
      image: '/images/nippers-main.jpg',
      excerpt:
        'Одна стерилизуемая основа и сменный абразив на клиента — стандарт профессионального маникюра в салоне.',
      datePublished: '2026-05-18',
    },
    {
      slug: '100-180-240-grit',
      title: '100, 180 и 240 grit — полный гид по абразивам для маникюра',
      description:
        'Чем отличаются 100 grit, 180 grit и 240 grit в сменных файлах и пилках для ногтей. Подбор абразива ZERK TOOL.',
      image: '/images/nippers-main.jpg',
      excerpt:
        'Абразивность определяет скорость снятия покрытия и бережность к натуральной пластине. Разбираем три ключевых грита.',
      datePublished: '2026-05-19',
    },
    {
      slug: 'nozhnicy-ili-kusachki',
      title: 'Ножницы или кусачки для кутикулы — что выбрать мастеру',
      description:
        'Маникюрные ножницы или кусачки для кутикулы: сравнение техник, Solingen и японская сталь. Инструмент ZERK TOOL.',
      image: '/images/scissors-solingen.jpg',
      excerpt:
        'Два классических инструмента для одной зоны. Когда логичнее ножницы, а когда профессиональные кусачки.',
      datePublished: '2026-05-20',
    },
    {
      slug: 'sterilizaciya-manikyurnogo-instrumenta',
      title: 'Стерилизация маникюрного инструмента — протокол для мастера',
      description:
        'Как правильно стерилизовать маникюрный инструмент: дезинфекция, сухожар, ультразвук. Кусачки и ножницы ZERK TOOL.',
      image: '/images/il-09.jpg',
      excerpt:
        'Безопасность клиента начинается с обработки инструмента. Пошаговый протокол для салона и домашнего кабинета.',
      datePublished: '2026-05-21',
    },
    {
      slug: 'yaponskaya-stal-dlya-manikyura',
      title: 'Японская сталь в маникюрных кусачках — почему её выбирают профи',
      description:
        'Почему профессионалы выбирают кусачки из японской стали SUS 420 J2: заточка, износ, стерилизация. ZERK TOOL IL.',
      image: '/images/ial-01.jpg',
      excerpt:
        'Материал режущей кромки определяет срок службы и предсказуемость среза. Разбираем преимущества японской стали.',
      datePublished: '2026-05-22',
    },
    {
      slug: 'pilki-dlya-naturalnyh-nogtey',
      title: 'Пилки для натуральных ногтей — какой грит и форма подойдут',
      description:
        'Какие пилки для ногтей подходят для натуральной пластины: 180 и 240 grit, сменные файлы ZERK TOOL.',
      image: '/images/nippers-main.jpg',
      excerpt:
        'Натуральные ногти требуют мягкого абразива и правильной техники. Рекомендации для мастеров и салонов.',
      datePublished: '2026-05-23',
    },
    {
      slug: 'srok-sluzhby-manikyurnogo-instrumenta',
      title: 'Как увеличить срок службы маникюрного инструмента — советы ZERK',
      description:
        'Уход, заточка и хранение: как продлить жизнь кусачек, ножниц и пилок. Профессиональный маникюрный инструмент ZERK TOOL.',
      image: '/images/il-12.jpg',
      excerpt:
        'Правильная эксплуатация и стерилизация экономят бюджет салона. Практические рекомендации от бренда.',
      datePublished: '2026-05-24',
    },
  ];

  function articlePath(slug) {
    return `/articles/${slug}`;
  }

  function articleUrls() {
    return ['/articles', ...ARTICLES.map((a) => articlePath(a.slug))];
  }

  window.ZERK_ARTICLES = {
    SITE,
    ARTICLES,
    articlePath,
    articleUrls,
  };
})();
