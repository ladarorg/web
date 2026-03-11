/* ============================================================
   LADAR — Low Atmospheric Data Acquisition and Research
   Main JavaScript
   ============================================================ */

'use strict';

// ── Nav scroll state ────────────────────────────────────────
(function initNav() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const isOpen = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close nav on link click (mobile)
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // Highlight active page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ── Intersection Observer — fade-in elements ────────────────
(function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

// ── Contact form (no-op placeholder) ───────────────────────
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Message sent';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
})();
