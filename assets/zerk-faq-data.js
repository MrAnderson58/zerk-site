/**
 * ZERK TOOL — premium SEO FAQ (home + catalog)
 */
(function () {
  'use strict';

  const PREMIUM = [
    {
      q: 'Какие кусачки для кутикулы выбрать начинающему мастеру?',
      a: 'Для начинающих мастеров рекомендуются модели с мягким ходом и лезвием 4–5 мм. Они обеспечивают лучший контроль и аккуратный срез кутикулы. В линейке ZERK TOOL оптимальны IL-03 и IL-07.',
    },
    {
      q: 'Чем отличаются кусачки с лезвием 4 мм и 6 мм?',
      a: 'Лезвие 4 мм подходит для точной работы и начинающих мастеров. Лезвие 6 мм позволяет быстрее выполнять обработку при плотной кутикуле и высокой нагрузке в салоне.',
    },
    {
      q: 'Какие маникюрные ножницы лучше для кутикулы?',
      a: 'Профессиональные ножницы для кутикулы должны иметь ручную заточку, тонкие полотна и мягкий ход. Ножницы ZERK TOOL изготовлены из немецкой стали и подходят для точной чистой работы.',
    },
    {
      q: 'Какие пилки лучше для геля и базы?',
      a: 'Для снятия материала и работы с гелем чаще используют абразив 100 или 180 grit. Для натуральных ногтей и финишной обработки подходит 240 grit.',
    },
    {
      q: 'Что такое сменные файлы на металлическую основу?',
      a: 'Сменные файлы — это одноразовые абразивы, которые крепятся на металлическую основу. Такой формат обеспечивает гигиену, удобство и быструю замену после каждого клиента.',
    },
    {
      q: 'Какие формы файлов бывают?',
      a: 'ZERK TOOL выпускает файлы формы mini, maxi, long и лодочка. Это позволяет мастеру подобрать удобный формат под технику работы.',
    },
    {
      q: 'Можно ли стерилизовать инструмент?',
      a: 'Да. Инструменты ZERK TOOL подходят для профессиональной стерилизации и дезинфекции при соблюдении рекомендаций по обработке.',
    },
    {
      q: 'Какая сталь используется в инструментах?',
      a: 'Кусачки ZERK TOOL производятся из японской стали, а ножницы — из немецкой стали. Это обеспечивает долговечность, стабильную заточку и мягкий ход.',
    },
    {
      q: 'Какие пилки выбрать для натуральных ногтей?',
      a: 'Для натуральных ногтей рекомендуется использовать более мягкий абразив — 180 или 240 grit. Это снижает риск повреждения ногтевой пластины.',
    },
    {
      q: 'Подходят ли инструменты для салонов?',
      a: 'Да. Инструменты ZERK TOOL рассчитаны на профессиональное использование в салонах, студиях и мастерами с высокой ежедневной нагрузкой.',
    },
  ];

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function buildPremiumFaqHtml(items, opts) {
    const title = opts?.title || 'Частые вопросы о ZERK TOOL';
    const lead =
      opts?.lead ||
      'Ответы о кусачках для кутикулы, маникюрных ножницах, пилках-файлах и профессиональном инструменте ZERK TOOL — для мастеров, салонов и поисковых систем.';
    const titleId = opts?.titleId || 'zerk-faq-title';

    const list = items
      .map(
        (item, i) => `
          <details class="zerk-faq__item" data-faq-item style="--faq-i: ${i}">
            <summary>
              <span class="zerk-faq__q">${escapeHtml(item.q)}</span>
              <span class="zerk-faq__chevron" aria-hidden="true"></span>
            </summary>
            <div class="zerk-faq__answer">
              <p>${escapeHtml(item.a)}</p>
            </div>
          </details>`
      )
      .join('');

    return `
      <div class="zerk-faq__inner glass zerk-faq__panel" data-faq-panel>
        <p class="zerk-faq__eyebrow">ZERK TOOL · FAQ</p>
        <h2 class="zerk-faq__title" id="${titleId}">${escapeHtml(title)}</h2>
        <p class="zerk-faq__lead">${escapeHtml(lead)}</p>
        <div class="zerk-faq__list" role="list">${list}</div>
      </div>`;
  }

  function faqJsonLd(items) {
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

  window.ZERK_FAQ_DATA = {
    PREMIUM,
    HOME: PREMIUM,
    CATALOG: PREMIUM,
    escapeHtml,
    buildPremiumFaqHtml,
    faqJsonLd,
  };
})();
