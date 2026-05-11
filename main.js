/**
 * main.js — Igor Popov SMM Funnel
 * Handles: scroll reveal, smooth scroll, nav state, counters, form
 */

(function () {
  'use strict';

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger siblings a bit
            const siblings = Array.from(
              entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
            );
            const delay = siblings.indexOf(entry.target) * 60;
            setTimeout(() => entry.target.classList.add('visible'), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => observer.observe(el));
  }

  /* ============================================================
     SMOOTH SCROLL
     ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('.js-scroll').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        if (!target) return;
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  /* ============================================================
     NAVBAR — add .scrolled class on scroll
     ============================================================ */
  function initNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on init
  }

  /* ============================================================
     ANIMATED COUNTERS
     Uses data-value, data-prefix, data-suffix, data-decimals
     ============================================================ */
  function animateCounter(el) {
    const target   = parseFloat(el.dataset.value) || 0;
    const prefix   = el.dataset.prefix  || '';
    const suffix   = el.dataset.suffix  || '';
    const decimals = parseInt(el.dataset.decimals, 10) || 0;
    const duration = 1200; // ms
    const fps      = 60;
    const frames   = Math.round((duration / 1000) * fps);
    let frame      = 0;

    const timer = setInterval(() => {
      frame++;
      // Ease out cubic
      const progress = 1 - Math.pow(1 - frame / frames, 3);
      const current  = target * progress;
      el.textContent = prefix + current.toFixed(decimals) + suffix;

      if (frame >= frames) {
        clearInterval(timer);
        el.textContent = prefix + target.toFixed(decimals) + suffix;
      }
    }, 1000 / fps);
  }

  function initCounters() {
    const counterEls = document.querySelectorAll('.js-counter');
    if (!counterEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterEls.forEach((el) => observer.observe(el));
  }

  /* ============================================================
     CTA FORM — basic validation + success state
     ============================================================ */
  function initForm() {
    const btn   = document.getElementById('cta-submit-btn');
    const input = document.getElementById('contact-input');
    const form  = input && input.closest('.cta-form');
    if (!btn || !input || !form) return;

    btn.addEventListener('click', () => {
      const val = input.value.trim();

      // Simple validation: non-empty and looks like a TG handle or phone
      if (!val) {
        input.focus();
        input.style.borderColor = 'rgba(255,77,0,0.8)';
        setTimeout(() => (input.style.borderColor = ''), 1200);
        return;
      }

      // Mark as submitted
      form.classList.add('submitted');

      // Insert success message if not already there
      let success = form.nextElementSibling;
      if (!success || !success.classList.contains('cta-success')) {
        success = document.createElement('p');
        success.className = 'cta-success';
        success.textContent = '✓ Заявка принята — свяжемся в течение 2 часов';
        form.insertAdjacentElement('afterend', success);
      }
      success.style.display = 'block';

      // TODO: replace with real API call, e.g.:
      // fetch('/api/leads', { method: 'POST', body: JSON.stringify({ contact: val }) });

      console.log('[CTA] Lead submitted:', val);
    });
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    initNavbar();
    initSmoothScroll();
    initReveal();
    initCounters();
    initForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
