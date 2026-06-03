/**
 * ZERK TOOL — deferred analytics & conditional heavy widgets (mobile-safe)
 */
(function () {
  'use strict';

  const isMobile =
    window.matchMedia('(max-width: 768px)').matches ||
    window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  document.documentElement.classList.toggle('is-mobile', isMobile);

  function loadScript(src, cb) {
    const s = document.createElement('script');
    s.src = src;
    s.defer = true;
    if (cb) s.onload = cb;
    document.body.appendChild(s);
  }

  function loadStylesheet(href) {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
  }

  function loadMetrika() {
    if (window.ym) return;
    (function (m, e, t, r, i, k, a) {
      m[i] =
        m[i] ||
        function () {
          (m[i].a = m[i].a || []).push(arguments);
        };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) return;
      }
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

    window.ym(45587271, 'init', {
      webvisor: !isMobile,
      clickmap: true,
      ecommerce: 'dataLayer',
      accurateTrackBounce: true,
      trackLinks: true,
    });
  }

  function scheduleMetrika() {
    const run = () => loadMetrika();
    if (isMobile) {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(run, { timeout: 8000 });
      } else {
        window.setTimeout(run, 4000);
      }
    } else if (document.readyState === 'complete') {
      window.setTimeout(run, 800);
    } else {
      window.addEventListener('load', () => window.setTimeout(run, 800), { once: true });
    }
  }

  function scheduleAssistant() {
    if (isMobile) return;
    const run = () => {
      loadStylesheet('/assets/zerk-assistant.css?v=4');
      loadScript('/assets/zerk-assistant.js?v=4');
    };
    if ('requestIdleCallback' in window) {
      requestIdleCallback(run, { timeout: 5000 });
    } else {
      window.setTimeout(run, 2000);
    }
  }

  scheduleMetrika();
  scheduleAssistant();
})();
