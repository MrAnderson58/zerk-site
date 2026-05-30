/**
 * ZERK AI Assistant — chat widget (OpenAI-ready)
 *
 * Setup OpenAI:
 * 1. Deploy api/chat.js (Vercel serverless) with OPENAI_API_KEY
 * 2. Set window.ZERK_ASSISTANT_CONFIG = { apiEndpoint: '/api/chat', apiEnabled: true }
 */
(function () {
  'use strict';

  const CONFIG = Object.assign(
    {
      apiEndpoint: '/api/chat',
      apiEnabled: false,
      telegram: typeof window.ZERK_TELEGRAM === 'string' ? window.ZERK_TELEGRAM : 'https://t.me/Mr_Anderson_pnz',
      whatsapp: 'https://wa.me/79257700803',
      catalogUrl: 'catalog.html?cat=nippers',
      typingMinMs: 600,
      typingMaxMs: 1400,
    },
    window.ZERK_ASSISTANT_CONFIG || {}
  );

  const SYSTEM_PROMPT = `Ты — премиальный консультант ZERK по профессиональному маникюрному инструменту.
Стиль: лаконично, уверенно, как консультант Apple/Tesla. Язык: русский.
Продукты: кусачки для кутикулы серии IL-03, IL-07, IL-09, IL-12 — у каждой лезвия 4, 5 или 6 мм. Сталь SUS 420 J2, ручная заточка, стерилизация.
IL-03 — классика; IL-07 — плотная/сухая кутикула; IL-09 — салонный баланс; IL-12 — удлинённые ручки.
Рекомендуй модель и размер лезвия. Для заказа направляй в Telegram @Mr_Anderson_pnz или WhatsApp +7 (925) 770-08-03.
Не выдумывай цены и наличие — предложи связаться с менеджером.`;

  const WELCOME =
    'Здравствуйте. Я консультант <strong>ZERK</strong> — помогу подобрать кусачки, объяснить разницу моделей IL и размер лезвия (4–6&nbsp;мм). Чем могу помочь?';

  const CHIPS = [
    'Какую модель выбрать?',
    'Разница IL-03 и IL-07',
    'Лезвие 4 или 5 мм?',
    'Стерилизация',
  ];

  /** @type {{ role: 'user' | 'assistant' | 'system', content: string }[]} */
  let conversation = [{ role: 'system', content: SYSTEM_PROMPT }];

  let isOpen = false;
  let isBusy = false;
  let rootEl;
  let messagesEl;
  let typingEl;
  let inputEl;
  let sendBtn;

  /* ——— Knowledge (offline fallback) ——— */
  function getCatalogContext() {
    const cat = window.ZERK_CATALOG;
    if (!cat?.products?.length) return '';
    return cat.products
      .filter((p) => p.cat === 'nippers')
      .map((p) => `${p.id}: ${p.model}, лезвие ${p.blade} мм — ${p.desc}`)
      .join('\n');
  }

  function localReply(text) {
    const q = text.toLowerCase();

    if (/telegram|телеграм|тг|написать|заказ|купить|связаться|менеджер/.test(q)) {
      return `Оформить заказ и уточнить наличие лучше напрямую:\n\n• <a href="${CONFIG.telegram}" target="_blank" rel="noopener">Telegram @Mr_Anderson_pnz</a>\n• <a href="${CONFIG.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>\n\nНапишите модель и размер лезвия — например, <strong>IL-07-5</strong>.`;
    }

    if (/il-03|il03|03/.test(q) && !/il-07|il-09|il-12/.test(q)) {
      return '<strong>IL-03</strong> — классический профиль для ежедневной работы с кутикулой. Лезвия: <strong>4, 5 или 6 мм</strong>. Для старта чаще берут <strong>5 мм</strong> (артикул IL-03-5). <a href="' + CONFIG.catalogUrl + '">Смотреть в каталоге</a>';
    }

    if (/il-07|il07|07/.test(q)) {
      return '<strong>IL-07</strong> — усиленный ход для <strong>плотной и сухой</strong> кутикулы. Лезвия 4–6 мм; при плотной кутикуле мастера часто выбирают <strong>4–5 мм</strong>.';
    }

    if (/il-09|il09|09/.test(q)) {
      return '<strong>IL-09</strong> — сбалансированная модель для <strong>салонного протокола</strong>. Универсальный выбор, если нужна одна пара «на каждый день».';
    }

    if (/il-12|il12|12/.test(q)) {
      return '<strong>IL-12</strong> — удлинённые ручки и точный контроль захвата. Подходит мастерам, которым важна эргономика и длинный рычаг.';
    }

    if (/разниц|отличи|сравн|чем отлича/.test(q)) {
      return 'Кратко по сериям:\n\n• <strong>IL-03</strong> — классика, мягкий ежедневный сценарий\n• <strong>IL-07</strong> — плотная / сухая кутикула\n• <strong>IL-09</strong> — баланс для салона\n• <strong>IL-12</strong> — удлинённые ручки, контроль\n\nУ всех лезвия <strong>4, 5, 6 мм</strong> — чем меньше цифра, тем короче режущая кромка.';
    }

    if (/4\s*мм|5\s*мм|6\s*мм|лезви|размер/.test(q)) {
      return 'Размер лезвия — длина режущей кромки:\n\n• <strong>4 мм</strong> — точность, плотная кутикула, деталь\n• <strong>5 мм</strong> — самый популярный универсальный размер\n• <strong>6 мм</strong> — чуть шире захват, быстрее на объёме\n\nНе знаете с чего начать — <strong>IL-03-5</strong> или <strong>IL-09-5</strong>.';
    }

    if (/стерил|обработк|дезинф|автоклав/.test(q)) {
      return 'Инструмент ZERK из <strong>SUS 420 J2</strong> рассчитан на <strong>химическую и термическую</strong> стерилизацию в салонном режиме. Соблюдайте протокол вашего дезсредства и температурных режимов.';
    }

    if (/сталь|sus|420|японск/.test(q)) {
      return 'ZERK использует японскую сталь <strong>SUS 420 J2</strong>: высокая прочность, коррозионная стойкость, ручная заточка и мягкий ход — стандарт для профессионального инструмента.';
    }

    if (/кусач|кутикул|маникюр|инструмент|выбрать|подобрать|рекоменд/.test(q)) {
      return 'Для подбора уточните тип кутикулы:\n\n• Обычная / комбинированная → <strong>IL-03</strong> или <strong>IL-09</strong>, лезвие <strong>5 мм</strong>\n• Плотная, сухая → <strong>IL-07</strong>, лезвие <strong>4–5 мм</strong>\n• Нужен длинный захват → <strong>IL-12</strong>\n• Ножницы Solingen → <strong>817</strong> или <strong>837</strong>\n\n<a href="' + CONFIG.catalogUrl + '">Открыть каталог</a> или напишите в <a href="' + CONFIG.telegram + '" target="_blank" rel="noopener">Telegram</a>.';
    }

    if (/привет|здравств|добрый|hello|hi\b/.test(q)) {
      return 'Добрый день. Расскажите, с какой кутикулой работаете чаще — обычной, плотной или сухой? Подберу серию IL и размер лезвия.';
    }

    return 'Могу подсказать по кусачкам <strong>IL-03, IL-07, IL-09, IL-12</strong>, ножницам <strong>817, 837</strong> и стерилизации. Откройте карточку товара в каталоге или напишите в <a href="' + CONFIG.telegram + '" target="_blank" rel="noopener">Telegram</a>.';
  }

  /* ——— API layer (OpenAI-ready) ——— */
  async function fetchAssistantReply(userText) {
    const userMessage = { role: 'user', content: userText };
    const payload = {
      messages: [...conversation, userMessage].filter((m) => m.role !== 'system' || CONFIG.apiEnabled),
    };

    if (!CONFIG.apiEnabled) {
      await delay(randomBetween(CONFIG.typingMinMs, CONFIG.typingMaxMs));
      return { content: localReply(userText), source: 'local' };
    }

    try {
      const res = await fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: SYSTEM_PROMPT + '\n\nКаталог:\n' + getCatalogContext() },
            ...conversation.filter((m) => m.role !== 'system'),
            userMessage,
          ],
        }),
      });

      if (!res.ok) throw new Error('API ' + res.status);

      const data = await res.json();
      const content = data.reply || data.content || data.message;
      if (!content) throw new Error('Empty reply');

      return { content, source: 'api' };
    } catch (err) {
      console.warn('[ZERK Assistant] API fallback:', err.message);
      await delay(randomBetween(CONFIG.typingMinMs, CONFIG.typingMaxMs));
      return { content: localReply(userText), source: 'local' };
    }
  }

  function delay(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  function randomBetween(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatContent(html) {
    return html.replace(/\n/g, '<br>');
  }

  function appendMessage(role, content) {
    const div = document.createElement('div');
    div.className = 'zerk-assistant-msg zerk-assistant-msg--' + (role === 'user' ? 'user' : 'bot');
    div.innerHTML = role === 'user' ? escapeHtml(content) : formatContent(content);
    messagesEl.appendChild(div);
    scrollToBottom();
    return div;
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    });
  }

  function setTyping(on) {
    typingEl.classList.toggle('is-active', on);
    if (on) scrollToBottom();
  }

  async function handleSend(text) {
    const trimmed = (text || '').trim();
    if (!trimmed || isBusy) return;

    isBusy = true;
    sendBtn.disabled = true;
    inputEl.value = '';
    inputEl.style.height = 'auto';

    appendMessage('user', trimmed);
    conversation.push({ role: 'user', content: trimmed });

    setTyping(true);

    try {
      const { content } = await fetchAssistantReply(trimmed);
      setTyping(false);
      appendMessage('assistant', content);
      conversation.push({ role: 'assistant', content: content.replace(/<[^>]+>/g, '') });
    } catch (e) {
      setTyping(false);
      appendMessage('assistant', 'Не удалось получить ответ. Напишите нам в <a href="' + CONFIG.telegram + '" target="_blank" rel="noopener">Telegram</a>.');
    }

    isBusy = false;
    sendBtn.disabled = false;
    inputEl.focus();
  }

  function toggle(open) {
    isOpen = open !== undefined ? open : !isOpen;
    rootEl.classList.toggle('is-open', isOpen);
    rootEl.querySelector('.zerk-assistant-fab').setAttribute('aria-expanded', isOpen);
    rootEl.querySelector('.zerk-assistant-panel').setAttribute('aria-hidden', !isOpen);

    if (isOpen) {
      document.body.style.overflow = window.innerWidth <= 480 ? 'hidden' : '';
      setTimeout(() => inputEl.focus(), 400);
    } else {
      document.body.style.overflow = '';
    }
  }

  function buildWidget() {
    rootEl = document.createElement('div');
    rootEl.className = 'zerk-assistant-root';
    rootEl.id = 'zerkAssistant';
    rootEl.setAttribute('aria-live', 'polite');

    rootEl.innerHTML = `
      <div class="zerk-assistant-panel" id="zerkAssistantPanel" role="dialog" aria-labelledby="zerkAssistantTitle" aria-hidden="true">
        <header class="zerk-assistant-header">
          <div class="zerk-assistant-avatar" aria-hidden="true">Z</div>
          <div class="zerk-assistant-header__text">
            <div class="zerk-assistant-header__title" id="zerkAssistantTitle">Консультант ZERK</div>
            <div class="zerk-assistant-header__sub">Маникюрный инструмент · онлайн</div>
          </div>
          <span class="zerk-assistant-status" aria-hidden="true" title="Онлайн"></span>
        </header>
        <div class="zerk-assistant-body">
          <div class="zerk-assistant-messages" role="log" aria-relevant="additions"></div>
          <div class="zerk-assistant-typing" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
        </div>
        <div class="zerk-assistant-chips"></div>
        <div class="zerk-assistant-composer">
          <div class="zerk-assistant-composer__row">
            <textarea class="zerk-assistant-input" rows="1" placeholder="Спросите о кусачках, стали, размере лезвия…" maxlength="800" aria-label="Сообщение"></textarea>
            <button type="button" class="zerk-assistant-send" aria-label="Отправить" disabled>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            </button>
          </div>
          <div class="zerk-assistant-links">
            <a class="zerk-assistant-link zerk-assistant-link--tg" href="${CONFIG.telegram}" target="_blank" rel="noopener noreferrer">Telegram</a>
            <a class="zerk-assistant-link zerk-assistant-link--wa" href="${CONFIG.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>
      <button type="button" class="zerk-assistant-fab" aria-label="Открыть чат с консультантом" aria-expanded="false" aria-controls="zerkAssistantPanel">
        <span class="zerk-assistant-fab__pulse" aria-hidden="true"></span>
        <svg class="icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l.8-3.2A7.8 7.8 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/>
        </svg>
      </button>
    `;

    document.body.appendChild(rootEl);

    messagesEl = rootEl.querySelector('.zerk-assistant-messages');
    typingEl = rootEl.querySelector('.zerk-assistant-typing');
    inputEl = rootEl.querySelector('.zerk-assistant-input');
    sendBtn = rootEl.querySelector('.zerk-assistant-send');

    const chipsWrap = rootEl.querySelector('.zerk-assistant-chips');
    CHIPS.forEach((label) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'zerk-assistant-chip';
      btn.textContent = label;
      btn.addEventListener('click', () => handleSend(label));
      chipsWrap.appendChild(btn);
    });

    appendMessage('assistant', WELCOME);

    rootEl.querySelector('.zerk-assistant-fab').addEventListener('click', () => toggle());

    sendBtn.addEventListener('click', () => handleSend(inputEl.value));

    inputEl.addEventListener('input', () => {
      sendBtn.disabled = !inputEl.value.trim();
      inputEl.style.height = 'auto';
      inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px';
    });

    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend(inputEl.value);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) toggle(false);
    });
  }

  function init() {
    buildWidget();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.ZerkAssistant = {
    open: () => toggle(true),
    close: () => toggle(false),
    send: handleSend,
    config: CONFIG,
    setApiEnabled(enabled) {
      CONFIG.apiEnabled = enabled;
    },
  };
})();
