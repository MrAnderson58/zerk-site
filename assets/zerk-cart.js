/**
 * ZERK — premium cart & quick order
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'zerk-cart-v1';

  const contacts = {
    telegram:
      typeof window.ZERK_TELEGRAM === 'string'
        ? window.ZERK_TELEGRAM
        : 'https://t.me/Mr_Anderson_pnz',
    vk: typeof window.ZERK_VK === 'string' ? window.ZERK_VK : 'https://vk.com/im/convo/94289869?tab=all',
    whatsapp:
      typeof window.ZERK_WHATSAPP === 'string'
        ? window.ZERK_WHATSAPP
        : 'https://wa.me/79257700803',
  };

  let items = load();
  let isOpen = false;
  let view = 'cart';
  let rootEl;
  let listeners = [];

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
    notify();
  }

  function notify() {
    listeners.forEach((fn) => fn(getState()));
    if (rootEl) render();
  }

  function getState() {
    const totalItems = items.reduce((s, i) => s + i.qty, 0);
    const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);
    return { items: [...items], totalItems, totalPrice, isOpen, view };
  }

  function resolveProduct(id) {
    const cat = window.ZERK_CATALOG;
    if (!cat?.getById) return null;
    const p = cat.getById(id);
    return p ? cat.cartLineSnapshot(p) : null;
  }

  function enrichItem(entry) {
    if (entry.name && entry.price) return entry;
    const snap = resolveProduct(entry.id);
    if (snap) return { ...snap, qty: entry.qty };
    return entry;
  }

  function add(productId, qty = 1) {
    const snap = resolveProduct(productId);
    if (!snap) return false;

    const existing = items.find((i) => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ ...snap, qty });
    }
    save();
    showToast('Добавлено в корзину');
    bumpBadge();
    return true;
  }

  function setQty(productId, qty) {
    const item = items.find((i) => i.id === productId);
    if (!item) return;
    if (qty < 1) {
      remove(productId);
      return;
    }
    item.qty = qty;
    save();
  }

  function remove(productId) {
    items = items.filter((i) => i.id !== productId);
    save();
  }

  function clear() {
    items = [];
    save();
  }

  function formatPrice(n) {
    const fmt = window.ZERK_CATALOG?.formatPrice;
    if (fmt) return fmt(n);
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(n);
  }

  function open() {
    isOpen = true;
    view = 'cart';
    rootEl?.classList.add('is-open');
    rootEl?.querySelector('.zerk-cart-fab')?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    render();
  }

  function close() {
    isOpen = false;
    rootEl?.classList.remove('is-open');
    rootEl?.querySelector('.zerk-cart-fab')?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    render();
  }

  function toggle() {
    if (isOpen) close();
    else open();
  }

  function showCheckout() {
    view = 'order';
    render();
  }

  function showCart() {
    view = 'cart';
    render();
  }

  function buildOrderMessage() {
    const form = rootEl?.querySelector('.zerk-cart-order-form');
    const customer = {
      name: form?.querySelector('[name="name"]')?.value?.trim() || '',
      phone: form?.querySelector('[name="phone"]')?.value?.trim() || '',
      comment: form?.querySelector('[name="comment"]')?.value?.trim() || '',
    };
    const build = window.ZERK_CATALOG?.buildCartOrderMessage;
    if (build) return build(items, customer);
    return `Заказ ZERK TOOL\n\n${items.map((i) => `${i.name} × ${i.qty}`).join('\n')}`;
  }

  function orderUrl(channel) {
    const text = buildOrderMessage();
    if (channel === 'telegram') {
      return `${contacts.telegram}?text=${encodeURIComponent(text)}`;
    }
    if (channel === 'whatsapp') {
      return `${contacts.whatsapp}?text=${encodeURIComponent(text)}`;
    }
    return contacts.whatsapp + '?text=' + encodeURIComponent(text);
  }

  function validateForm() {
    const form = rootEl?.querySelector('.zerk-cart-order-form');
    const name = form?.querySelector('[name="name"]')?.value?.trim();
    const phone = form?.querySelector('[name="phone"]')?.value?.trim();
    return !!(name && phone);
  }

  let toastTimer;
  function showToast(message) {
    let toast = document.querySelector('.zerk-cart-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'zerk-cart-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span class="zerk-cart-toast__icon" aria-hidden="true">✓</span><span>${message}</span>`;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }

  function bumpBadge() {
    const badge = rootEl?.querySelector('.zerk-cart-fab__badge');
    if (!badge) return;
    badge.classList.remove('is-bump');
    void badge.offsetWidth;
    badge.classList.add('is-bump');
  }

  function renderItems() {
    if (!items.length) {
      return `<div class="zerk-cart-empty">
        Корзина пуста.<br><a href="catalog.html">Перейти в каталог</a>
      </div>`;
    }
    return items
      .map(
        (item) => `
      <div class="zerk-cart-item" data-cart-id="${item.id}">
        <img class="zerk-cart-item__img" src="${item.image}" alt="" width="64" height="48" loading="lazy">
        <div>
          <div class="zerk-cart-item__name">${item.name}</div>
          <div class="zerk-cart-item__meta">${item.id}</div>
          ${item.price ? `<div class="zerk-cart-item__price">${formatPrice(item.price * item.qty)}</div>` : ''}
        </div>
        <div class="zerk-cart-item__actions">
          <div class="zerk-cart-qty">
            <button type="button" data-qty-minus="${item.id}" aria-label="Уменьшить">−</button>
            <span>${item.qty}</span>
            <button type="button" data-qty-plus="${item.id}" aria-label="Увеличить">+</button>
          </div>
          <button type="button" class="zerk-cart-remove" data-remove="${item.id}">Удалить</button>
        </div>
      </div>`
      )
      .join('');
  }

  function render() {
    if (!rootEl) return;

    const totalItems = items.reduce((s, i) => s + i.qty, 0);
    const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);
    const badge = rootEl.querySelector('.zerk-cart-fab__badge');

    if (badge) {
      badge.textContent = totalItems > 99 ? '99+' : String(totalItems);
      badge.classList.toggle('is-visible', totalItems > 0);
    }

    const body = rootEl.querySelector('.zerk-cart-body');
    const foot = rootEl.querySelector('.zerk-cart-foot');
    if (!body || !foot) return;

    body.innerHTML = renderItems();

    const cartView = foot.querySelector('.zerk-cart-cart-view');
    const orderView = foot.querySelector('.zerk-cart-order');

    if (view === 'order') {
      cartView.hidden = true;
      orderView.classList.add('is-active');
    } else {
      cartView.hidden = false;
      orderView.classList.remove('is-active');
    }

    foot.querySelector('.zerk-cart-summary__total').textContent = formatPrice(totalPrice);
    foot.querySelector('.zerk-cart-summary__items').textContent =
      totalItems === 0
        ? 'нет товаров'
        : `${totalItems} ${pluralItems(totalItems)}`;

    const checkoutBtn = foot.querySelector('.zerk-cart-checkout-btn');
    if (checkoutBtn) checkoutBtn.disabled = totalItems === 0;
  }

  function pluralItems(n) {
    const m10 = n % 10;
    const m100 = n % 100;
    if (m100 >= 11 && m100 <= 14) return 'товаров';
    if (m10 === 1) return 'товар';
    if (m10 >= 2 && m10 <= 4) return 'товара';
    return 'товаров';
  }

  function mount() {
    if (document.querySelector('.zerk-cart-root')) return;

    const root = document.createElement('div');
    root.className = 'zerk-cart-root';
    root.setAttribute('aria-label', 'Корзина ZERK');
    root.innerHTML = `
      <button type="button" class="zerk-cart-fab" aria-label="Открыть корзину" aria-expanded="false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path d="M6 6h15l-1.5 9H8L6 6z"/><path d="M6 6L5 3H2"/><circle cx="9" cy="20" r="1.5" fill="currentColor"/><circle cx="18" cy="20" r="1.5" fill="currentColor"/>
        </svg>
        <span class="zerk-cart-fab__badge">0</span>
      </button>
      <div class="zerk-cart-backdrop" data-cart-close></div>
      <div class="zerk-cart-panel" role="dialog" aria-modal="true" aria-labelledby="zerk-cart-title">
        <header class="zerk-cart-panel__head">
          <div>
            <div class="zerk-cart-panel__title" id="zerk-cart-title">Корзина ZERK</div>
            <div class="zerk-cart-panel__sub">Быстрый заказ</div>
          </div>
          <button type="button" class="zerk-cart-close" data-cart-close aria-label="Закрыть">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </header>
        <div class="zerk-cart-body"></div>
        <footer class="zerk-cart-foot">
          <div class="zerk-cart-cart-view">
            <div class="zerk-cart-summary">
              <div>
                <div class="zerk-cart-summary__label">Итого</div>
                <div class="zerk-cart-summary__items">0 товаров</div>
              </div>
              <div class="zerk-cart-summary__total">0 ₽</div>
            </div>
            <button type="button" class="zerk-cart-checkout-btn" disabled>Быстрый заказ</button>
          </div>
          <div class="zerk-cart-order">
            <button type="button" class="zerk-cart-order__back" data-cart-back>← Назад к корзине</button>
            <form class="zerk-cart-order-form" onsubmit="return false">
              <div class="zerk-cart-field">
                <label for="zc-name">Имя</label>
                <input id="zc-name" name="name" type="text" autocomplete="name" required placeholder="Ваше имя">
              </div>
              <div class="zerk-cart-field">
                <label for="zc-phone">Телефон</label>
                <input id="zc-phone" name="phone" type="tel" autocomplete="tel" required placeholder="+7 …">
              </div>
              <div class="zerk-cart-field">
                <label for="zc-comment">Комментарий <span style="opacity:.5">(необязательно)</span></label>
                <textarea id="zc-comment" name="comment" placeholder="Пожелания к заказу"></textarea>
              </div>
            </form>
            <p style="font-size:12px;color:rgba(255,255,255,.45);margin:8px 0 0;line-height:1.45">
              Telegram и WhatsApp откроются с готовым текстом заказа. Вопросы можно задать в <a href="${contacts.vk}" target="_blank" rel="noopener" style="color:#8eb5e8">ВКонтакте</a>.
            </p>
            <div class="zerk-cart-send">
              <a class="zerk-cart-send__btn zerk-cart-send__btn--tg" href="#" data-send="telegram" target="_blank" rel="noopener noreferrer">Отправить в Telegram</a>
              <a class="zerk-cart-send__btn zerk-cart-send__btn--wa" href="#" data-send="whatsapp" target="_blank" rel="noopener noreferrer">Отправить в WhatsApp</a>
            </div>
          </div>
        </footer>
      </div>`;

    document.body.appendChild(root);
    rootEl = root;

    root.querySelector('.zerk-cart-fab').addEventListener('click', toggle);
    root.querySelectorAll('[data-cart-close]').forEach((el) => {
      el.addEventListener('click', close);
    });
    root.querySelector('[data-cart-back]')?.addEventListener('click', showCart);
    root.querySelector('.zerk-cart-checkout-btn')?.addEventListener('click', showCheckout);

    root.addEventListener('click', (e) => {
      const minus = e.target.closest('[data-qty-minus]');
      const plus = e.target.closest('[data-qty-plus]');
      const rem = e.target.closest('[data-remove]');
      if (minus) {
        const id = minus.dataset.qtyMinus;
        const item = items.find((i) => i.id === id);
        if (item) setQty(id, item.qty - 1);
      }
      if (plus) {
        const id = plus.dataset.qtyPlus;
        const item = items.find((i) => i.id === id);
        if (item) setQty(id, item.qty + 1);
      }
      if (rem) remove(rem.dataset.remove);
    });

    root.querySelectorAll('[data-send]').forEach((link) => {
      link.addEventListener('click', (e) => {
        if (!validateForm()) {
          e.preventDefault();
          showToast('Укажите имя и телефон');
          return;
        }
        link.href = orderUrl(link.dataset.send);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) close();
    });

    items = items.map(enrichItem).filter((i) => i.name);
    save();
    render();
  }

  function bindAddButtons() {
    document.querySelectorAll('[data-add-cart]').forEach((btn) => {
      if (btn.dataset.cartBound) return;
      btn.dataset.cartBound = '1';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.dataset.addCart;
        if (add(id)) {
          btn.classList.add('is-added');
          btn.textContent = 'В корзине ✓';
          setTimeout(() => {
            btn.classList.remove('is-added');
            btn.textContent = 'В корзину';
          }, 1600);
        }
      });
    });
  }

  window.ZERK_CART = {
    add,
    remove,
    setQty,
    clear,
    open,
    close,
    toggle,
    getState,
    subscribe(fn) {
      listeners.push(fn);
      return () => {
        listeners = listeners.filter((f) => f !== fn);
      };
    },
    bindAddButtons,
  };

  function init() {
    mount();
    bindAddButtons();
    const obs = new MutationObserver(() => bindAddButtons());
    obs.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
