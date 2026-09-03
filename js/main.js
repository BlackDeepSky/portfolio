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
})();
