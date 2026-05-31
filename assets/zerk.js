/**
 * ZERK — Premium interactions (lightweight, no dependencies)
 */
(function () {
  'use strict';

  const ZERK_CONTACTS = {
    telegram: 'https://t.me/Mr_Anderson_pnz',
    vk: 'https://vk.com/goldengel',
    whatsapp: 'https://wa.me/79257700803',
  };

  window.ZERK_TELEGRAM = ZERK_CONTACTS.telegram;
  window.ZERK_VK = ZERK_CONTACTS.vk;
  window.ZERK_WHATSAPP = ZERK_CONTACTS.whatsapp;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ——— Page load sequence ——— */
  document.body.classList.add('is-loading');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-loaded');
    });
  });

  /* ——— Header + hero parallax (native scroll) ——— */
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const heroVisual = document.getElementById('heroVisual');
  const heroImg = document.getElementById('heroImg');

  let tiltX = 0;
  let tiltY = 0;

  function onScroll() {
    const y = window.scrollY;

    if (header) {
      const alwaysSolid = document.body.classList.contains('catalog-page');
      header.classList.toggle('is-scrolled', alwaysSolid || y > 20);
    }

    if (!prefersReduced && heroVisual && y < window.innerHeight * 1.1) {
      const p = y / window.innerHeight;
      heroVisual.style.transform = `translateY(${y * 0.12}px) scale(${1 - p * 0.03})`;
      if (heroImg && finePointer) {
        heroImg.style.transform = `translateY(${y * -0.05}px) rotateY(${tiltX}deg) rotateX(${-tiltY}deg)`;
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ——— Mobile menu ——— */
  if (menuToggle && mobileMenu) {
    function closeMenu() {
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', () => {
      const open = !menuToggle.classList.contains('is-open');
      menuToggle.classList.toggle('is-open', open);
      menuToggle.setAttribute('aria-expanded', open);
      mobileMenu.classList.toggle('is-open', open);
      mobileMenu.setAttribute('aria-hidden', !open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  }

  /* ——— Hero tilt ——— */
  if (!prefersReduced && finePointer && heroImg) {
    document.addEventListener('mousemove', (e) => {
      tiltX = (e.clientX / window.innerWidth - 0.5) * 10;
      tiltY = (e.clientY / window.innerHeight - 0.5) * 8;
      const y = window.scrollY;
      heroImg.style.transform = `translateY(${y * -0.05}px) rotateY(${tiltX}deg) rotateX(${-tiltY}deg)`;
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
    if (prefersReduced) {
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
    if (prefersReduced) {
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

  /* ——— Catalog page API ——— */
  window.Zerk = {
    prefersReduced,
    finePointer,
    observeCards(selector) {
      const cards = document.querySelectorAll(selector);
      if (prefersReduced) {
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
