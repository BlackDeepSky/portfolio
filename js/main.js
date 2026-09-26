(function () {
  'use strict';

  // --- Мобильное меню ---
  var burger = document.getElementById('nav-burger');
  var navLinks = document.querySelector('.nav__links');

  function setMenu(open) {
    navLinks.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  }

  if (burger) {
    burger.addEventListener('click', function () {
      setMenu(!navLinks.classList.contains('is-open'));
    });

    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });
  }

  // --- Переключатель языка ---
  var langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      window.I18N.setLang(window.I18N.getLang() === 'ru' ? 'en' : 'ru');
    });
  }

  // --- Плавный скролл по якорям ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // --- Анимация появления секций при скролле ---
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.section, .hero').forEach(function (el) {
    observer.observe(el);
  });

  // --- Терминальная анимация hero: печать команд по буквам ---
  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var termRoot = document.querySelector('.terminal');
  var termRunId = 0;

  // Запоминаем полный текст команды (из i18n), чтобы печатать его по буквам.
  function rememberTermText() {
    if (!termRoot) return;
    Array.prototype.forEach.call(termRoot.querySelectorAll('.term-type'), function (el) {
      if (el.textContent) el.setAttribute('data-text', el.textContent);
    });
  }

  function resetTerminal() {
    if (!termRoot) return;
    Array.prototype.forEach.call(termRoot.querySelectorAll('.term-line'), function (el) {
      el.hidden = true;
    });
    Array.prototype.forEach.call(termRoot.querySelectorAll('.term-type'), function (el) {
      el.textContent = '';
    });
    Array.prototype.forEach.call(termRoot.querySelectorAll('.term-line[data-cmd] .term-cursor'), function (el) {
      el.style.display = '';
    });
  }

  function revealAllTerminal() {
    if (!termRoot) return;
    rememberTermText();
    Array.prototype.forEach.call(termRoot.querySelectorAll('.term-line'), function (el) {
      el.hidden = false;
    });
    Array.prototype.forEach.call(termRoot.querySelectorAll('.term-type'), function (el) {
      el.textContent = el.getAttribute('data-text') || '';
    });
    // Оставляем курсор только на финальном промпте
    Array.prototype.forEach.call(termRoot.querySelectorAll('.term-line[data-cmd] .term-cursor'), function (el) {
      el.style.display = 'none';
    });
  }

  function after(runId, ms, fn) {
    window.setTimeout(function () { if (runId === termRunId) fn(); }, ms);
  }

  function typeText(el, runId, done) {
    var full = el.getAttribute('data-text') || '';
    el.textContent = '';
    var i = 0;
    function step() {
      if (runId !== termRunId) return;
      if (i >= full.length) { done(); return; }
      var ch = full.charAt(i++);
      el.textContent += ch;
      var ms = 55 + Math.random() * 50;   // «живой» ритм печати
      if (ch === ' ') ms += 45;           // лёгкая пауза на пробеле
      after(runId, ms, step);
    }
    step();
  }

  function startTerminal() {
    if (!termRoot) return;
    termRunId += 1;
    var runId = termRunId;
    rememberTermText();

    if (prefersReducedMotion) { revealAllTerminal(); return; }

    resetTerminal();
    var cmds = Array.prototype.slice.call(termRoot.querySelectorAll('.term-line[data-cmd]'));
    var index = 0;

    function next() {
      if (runId !== termRunId) return;
      if (index >= cmds.length) {
        var fin = termRoot.querySelector('.term-line--final');
        if (fin) fin.hidden = false;
        return;
      }
      var line = cmds[index];
      var typeEl = line.querySelector('.term-type');
      var cursor = line.querySelector('.term-cursor');
      line.hidden = false;
      if (cursor) cursor.style.display = '';
      typeText(typeEl, runId, function () {
        if (runId !== termRunId) return;
        if (cursor) cursor.style.display = 'none';
        var out = line.nextElementSibling;
        if (out && out.classList.contains('term-line--out')) out.hidden = false;
        index += 1;
        after(runId, 420, next);
      });
    }
    next();
  }

  window.TERMINAL = { retype: startTerminal };
  window.setTimeout(startTerminal, 650);
})();
