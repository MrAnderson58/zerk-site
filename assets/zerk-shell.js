/**
 * ZERK TOOL — global shell: header, mega menu, footer, mobile nav
 */
(function () {
  'use strict';

  const NAV = [
    { href: '/collection', label: 'Коллекция' },
    {
      label: 'Категории',
      mega: true,
      children: [
        { href: '/nippers', label: 'Кусачки', desc: 'IL · SUS 420 J2 · 4–9 мм' },
        { href: '/scissors', label: 'Ножницы', desc: 'Solingen · Германия' },
        { href: '/replaceable-files', label: 'Сменные файлы', desc: '100 / 180 / 240 грит' },
        { href: '/nail-files', label: 'Пилки для ногтей', desc: 'Обзор абразивов ZERK' },
        { href: '/pushers', label: 'Пушеры-шаберы', desc: 'P-504…P-514' },
        { href: '/nitrile-gloves', label: 'Перчатки Glovity', desc: 'Нитрил · 3 цвета · XS–M' },
      ],
    },
    { href: '/about', label: 'О бренде' },
    { href: '/contacts', label: 'Контакты' },
  ];

  function renderHeader() {
    const megaItems = NAV.find((n) => n.mega)?.children || [];
    return `
    <header id="siteHeader" class="site-header site-header--sticky">
      <div class="header-inner">
        <a href="/" class="logo" aria-label="ZERK — на главную">
          <span class="logo__mark">ZERK</span>
        </a>
        <nav class="header-nav" aria-label="Основная навигация">
          ${NAV.map((item) => {
            if (item.mega) {
              return `
              <div class="nav-mega">
                <button type="button" class="nav-mega__trigger" aria-expanded="false" aria-haspopup="true">
                  ${item.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <div class="nav-mega__panel" role="menu" hidden>
                  <div class="nav-mega__grid">
                    ${megaItems
                      .map(
                        (c) => `
                      <a href="${c.href}" class="nav-mega__link" role="menuitem">
                        <span class="nav-mega__link-title">${c.label}</span>
                        <span class="nav-mega__link-desc">${c.desc}</span>
                      </a>`
                      )
                      .join('')}
                  </div>
                  <a href="/collection" class="nav-mega__all">Вся коллекция ZERK TOOL →</a>
                </div>
              </div>`;
            }
            return `<a href="${item.href}">${item.label}</a>`;
          }).join('')}
          <a href="tel:+79257700803" class="phone">+7 (925) 770-08-03</a>
        </nav>
        <button type="button" class="menu-toggle" id="menuToggle" aria-label="Открыть меню" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
    <nav class="mobile-menu" id="mobileMenu" aria-hidden="true" aria-label="Мобильное меню">
      <a href="/">Главная</a>
      <a href="/collection">Коллекция</a>
      <a href="/nippers">Кусачки</a>
      <a href="/scissors">Ножницы</a>
      <a href="/replaceable-files">Сменные файлы</a>
      <a href="/nitrile-gloves">Перчатки</a>
      <a href="/pushers">Пушеры</a>
      <a href="/about">О бренде</a>
      <a href="/contacts">Контакты</a>
      <a href="tel:+79257700803">Позвонить</a>
    </nav>
    <nav class="mobile-dock" aria-label="Быстрая навигация">
      <a href="/" class="mobile-dock__item"><span>Главная</span></a>
      <a href="/collection" class="mobile-dock__item"><span>Каталог</span></a>
      <button type="button" class="mobile-dock__item mobile-dock__item--cart" data-open-cart><span>Корзина</span></button>
      <a href="/contacts" class="mobile-dock__item"><span>Связь</span></a>
    </nav>`;
  }

  function renderFooter() {
    return `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">ZERK TOOL</div>
        <nav class="footer-channels" aria-label="Связаться с ZERK TOOL">
          <a href="https://t.me/Mr_Anderson_pnz" data-telegram rel="noopener noreferrer" target="_blank">Telegram</a>
          <a href="https://vk.com/im/convo/94289869?tab=all" data-vk rel="noopener noreferrer" target="_blank">ВКонтакте</a>
          <a href="https://wa.me/79257700803" data-whatsapp rel="noopener noreferrer" target="_blank">WhatsApp</a>
        </nav>
        <nav class="footer-links" aria-label="Разделы каталога">
          <a href="/nippers">Кусачки</a>
          <a href="/scissors">Ножницы</a>
          <a href="/replaceable-files">Файлы</a>
          <a href="/nitrile-gloves">Перчатки</a>
        </nav>
        <a href="tel:+79257700803">+7 (925) 770-08-03</a>
      </div>
    </footer>`;
  }

  function bindMegaMenu() {
    document.querySelectorAll('.nav-mega').forEach((wrap) => {
      const trigger = wrap.querySelector('.nav-mega__trigger');
      const panel = wrap.querySelector('.nav-mega__panel');
      if (!trigger || !panel) return;

      trigger.addEventListener('click', () => {
        const open = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', open ? 'false' : 'true');
        panel.hidden = open;
      });

      document.addEventListener('click', (e) => {
        if (!wrap.contains(e.target)) {
          trigger.setAttribute('aria-expanded', 'false');
          panel.hidden = true;
        }
      });
    });
  }

  function bindMobileDockCart() {
    document.querySelectorAll('[data-open-cart]').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.ZERK_CART?.open?.();
      });
    });
  }

  function mount() {
    const headerSlot = document.getElementById('zerk-header');
    const footerSlot = document.getElementById('zerk-footer');
    if (headerSlot) headerSlot.innerHTML = renderHeader();
    if (footerSlot) footerSlot.innerHTML = renderFooter();

    bindMegaMenu();
    bindMobileDockCart();

    if (window.Zerk?.initHeader) window.Zerk.initHeader();
    else if (typeof initHeaderFromZerk === 'function') {
      /* zerk.js binds after load */
    }

    document.dispatchEvent(new CustomEvent('zerk-shell-ready'));
  }

  window.ZERK_SHELL = { mount, NAV };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
