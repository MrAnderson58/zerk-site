/**
 * ZERK — Premium interactions (lightweight, no dependencies)
 */
(function () {
  'use strict';

  const ZERK_CONTACTS = {
    telegram: 'https://t.me/Mr_Anderson_pnz',
    vk: 'https://vk.com/im/convo/94289869?tab=all',
    whatsapp: 'https://wa.me/79257700803',
  };

  window.ZERK_TELEGRAM = ZERK_CONTACTS.telegram;
  window.ZERK_VK = ZERK_CONTACTS.vk;
  window.ZERK_WHATSAPP = ZERK_CONTACTS.whatsapp;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ——— Page load sequence (fallback for mobile / bfcache) ——— */
  const isCoarseMobile = window.matchMedia('(max-width: 1068px), (hover: none) and (pointer: coarse)').matches;

  function revealPage() {
    const body = document.body;
    if (!body || body.classList.contains('is-loaded')) return;
    body.classList.remove('is-loading');
    body.classList.add('is-loaded');
  }

  function armLoading() {
    if (document.body) document.body.classList.add('is-loading');
  }

  if (document.body) armLoading();
  else document.addEventListener('DOMContentLoaded', armLoading, { once: true });

  requestAnimationFrame(() => requestAnimationFrame(revealPage));
  document.addEventListener('DOMContentLoaded', revealPage, { once: true });
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) revealPage();
  });
  setTimeout(revealPage, isCoarseMobile ? 400 : 900);

  let tiltX = 0;
  let tiltY = 0;

  function initHeader() {
    const header = document.getElementById('siteHeader');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!menuToggle || !mobileMenu) return;
    if (menuToggle.dataset.bound === '1') return;
    menuToggle.dataset.bound = '1';

    function closeMenu() {
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    const toggle = menuToggle;
    toggle.addEventListener('click', () => {
      const open = !toggle.classList.contains('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open);
      mobileMenu.classList.toggle('is-open', open);
      mobileMenu.setAttribute('aria-hidden', !open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

    if (header) {
      const alwaysSolid =
        document.body.classList.contains('catalog-page') ||
        document.body.classList.contains('product-page');
      header.classList.toggle('is-scrolled', alwaysSolid);
    }
  }

  const heroVisual = document.getElementById('heroVisual');
  const heroImg = document.getElementById('heroImg');

  function onScroll() {
    const y = window.scrollY;
    const header = document.getElementById('siteHeader');
    if (header) {
      const alwaysSolid =
        document.body.classList.contains('catalog-page') ||
        document.body.classList.contains('product-page');
      header.classList.toggle('is-scrolled', alwaysSolid || y > 20);
    }

    if (!prefersReduced && heroImg && y < window.innerHeight * 1.1) {
      const p = y / window.innerHeight;
      const scrollY = y * 0.06;
      const scale = 1 - p * 0.02;
      if (finePointer) {
        heroImg.style.transform = `translateY(${scrollY}px) rotateY(${tiltX}deg) rotateX(${-tiltY}deg) scale(${scale})`;
      } else {
        heroImg.style.transform = `translateY(${scrollY}px) scale(${scale})`;
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  initHeader();
  document.addEventListener('zerk-shell-ready', initHeader);

  /* ——— Hero tilt ——— */
  if (!prefersReduced && finePointer && heroImg) {
    document.addEventListener('mousemove', (e) => {
      tiltX = (e.clientX / window.innerWidth - 0.5) * 10;
      tiltY = (e.clientY / window.innerHeight - 0.5) * 8;
      const y = window.scrollY;
      const scrollY = y * 0.06;
      const p = y / window.innerHeight;
      const scale = 1 - p * 0.02;
      heroImg.style.transform = `translateY(${scrollY}px) rotateY(${tiltX}deg) rotateX(${-tiltY}deg) scale(${scale})`;
    });
  }

  /* ——— Smooth anchor links ——— */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 52;
      const top = el.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top: Math.max(0, top), behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  });

  /* ——— Scroll reveal ——— */
  function observeReveals() {
    const els = document.querySelectorAll('[data-reveal]');
    if (prefersReduced || isCoarseMobile) {
      els.forEach((el) => el.classList.add('is-revealed'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );
    els.forEach((el) => obs.observe(el));
  }

  function observePreviewCards() {
    const cards = document.querySelectorAll('.catalog-preview-card');
    if (prefersReduced || isCoarseMobile) {
      cards.forEach((c) => c.classList.add('is-visible'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    cards.forEach((c) => obs.observe(c));
  }

  observeReveals();
  observePreviewCards();

  document.querySelectorAll('[data-telegram]').forEach((link) => {
    link.href = ZERK_CONTACTS.telegram;
  });

  document.querySelectorAll('[data-vk]').forEach((link) => {
    link.href = ZERK_CONTACTS.vk;
  });

  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    if (!link.dataset.orderLink) link.href = ZERK_CONTACTS.whatsapp;
  });

  /* ——— Catalog page API ——— */
  window.Zerk = {
    prefersReduced,
    finePointer,
    initHeader,
    observeCards(selector) {
      const cards = document.querySelectorAll(selector);
      if (prefersReduced || isCoarseMobile) {
        cards.forEach((c) => c.classList.add('is-visible'));
        return cards;
      }
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible');
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      cards.forEach((c) => obs.observe(c));
      return cards;
    },
    initCardTilt(selector) {
      if (!finePointer || prefersReduced) return;
      document.querySelectorAll(selector).forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.setProperty('--tilt-x', `${x * 8}deg`);
          card.style.setProperty('--tilt-y', `${-y * 6}deg`);
          card.style.setProperty('--shine-x', `${(x + 0.5) * 100}%`);
          card.style.setProperty('--shine-y', `${(y + 0.5) * 100}%`);
        });
        card.addEventListener('mouseleave', () => {
          card.style.setProperty('--tilt-x', '0deg');
          card.style.setProperty('--tilt-y', '0deg');
        });
      });
    },
  };
})();
