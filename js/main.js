/* Rivian Essentials — sticky nav, scroll reveals, vehicle filter */
(function () {
  'use strict';

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky nav shadow ---------- */
  var nav = document.querySelector('.category-nav');
  if (nav) {
    var stuckSentinel = document.createElement('div');
    nav.parentNode.insertBefore(stuckSentinel, nav);
    new IntersectionObserver(function (entries) {
      nav.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }).observe(stuckSentinel);
  }

  /* ---------- Card reveal on scroll ---------- */
  var cards = document.querySelectorAll('.product-card');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    cards.forEach(function (c) { c.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    cards.forEach(function (c) { revealObserver.observe(c); });
  }

  /* ---------- Active section tracking (trail-blaze marker) ---------- */
  var pills = document.querySelectorAll('.nav-pill');
  var sections = document.querySelectorAll('.section[id]');
  if (pills.length && sections.length) {
    var byId = {};
    pills.forEach(function (p) { byId[p.getAttribute('href').slice(1)] = p; });
    var activeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var pill = byId[entry.target.id];
        if (!pill) return;
        if (entry.isIntersecting) {
          pills.forEach(function (p) { p.classList.remove('is-active'); });
          pill.classList.add('is-active');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(function (s) { activeObserver.observe(s); });
  }

  /* ---------- Vehicle filter ---------- */
  var chips = document.querySelectorAll('.filter-chip');

  function applyFilter(filter) {
    chips.forEach(function (c) {
      c.classList.toggle('is-active', c.dataset.filter === filter);
    });
    document.querySelectorAll('.section').forEach(function (section) {
      var visible = 0;
      section.querySelectorAll('.product-card').forEach(function (card) {
        var fits = (card.dataset.fits || '').split(/\s+/);
        var show = filter === 'all' || fits.indexOf(filter) !== -1;
        card.hidden = !show;
        if (show) visible++;
      });
      var empty = section.querySelector('.section__empty');
      if (empty) empty.hidden = visible > 0;
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      applyFilter(chip.dataset.filter);
    });
  });

  document.querySelectorAll('.section__empty-reset').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyFilter('all');
    });
  });
})();
