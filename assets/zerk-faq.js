/**
 * ZERK TOOL — FAQ reveal & accordion polish (no dependencies)
 */
(function () {
  'use strict';

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function initSection(section) {
    if (!section || section.dataset.faqInit === '1') return;
    section.dataset.faqInit = '1';

    const items = section.querySelectorAll('[data-faq-item]');
    if (!items.length) return;

    if (prefersReducedMotion()) {
      section.classList.add('is-revealed');
      items.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const revealItems = () => {
      items.forEach((el, i) => {
        setTimeout(() => el.classList.add('is-revealed'), i * 50);
      });
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            section.classList.add('is-revealed');
            revealItems();
            io.disconnect();
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
      );
      io.observe(section);
    } else {
      section.classList.add('is-revealed');
      revealItems();
    }

    items.forEach((details) => {
      details.addEventListener('toggle', () => {
        if (!details.open) return;
        items.forEach((other) => {
          if (other !== details && other.open) other.open = false;
        });
      });
    });
  }

  function init(root) {
    const scope = root || document;
    scope.querySelectorAll('.zerk-faq--premium').forEach(initSection);
  }

  document.addEventListener('DOMContentLoaded', () => init());

  window.ZERK_FAQ = { init, initSection };
})();
