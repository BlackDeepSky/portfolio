(function () {
  'use strict';

  var DICT = {
    'nav.logo': { ru: 'Александр', en: 'Alexander' },
    'nav.about': { ru: 'О себе', en: 'About' },
    'nav.projects': { ru: 'Проекты', en: 'Projects' },
    'nav.contact': { ru: 'Контакты', en: 'Contact' },
    'hero.term': { ru: 'alexander@data: ~', en: 'alexander@data: ~' },
    'hero.whoami': { ru: 'whoami', en: 'whoami' },
    'hero.whoamiOut': { ru: 'alexander · data engineer', en: 'alexander · data engineer' },
    'hero.cat': { ru: 'cat about.txt', en: 'cat about.txt' },
    'hero.catOut': { ru: 'Строю ETL/ELT-пайплайны, которые превращают сырые данные в решения.', en: 'I build ETL/ELT pipelines that turn raw data into decisions.' },
    'hero.ctaPrimary': { ru: 'Смотреть проекты', en: 'View projects' },
    'hero.ctaResume': { ru: 'Скачать резюме', en: 'Download resume' },
    'about.title': { ru: '~/about', en: '~/about' },
    'about.p1': { ru: 'Я дата-инженер. Пишу на Python, строю ETL/ELT-пайплайны, работаю с SQL и облачными хранилищами. Мои пет-проекты доведены до состояния, которым пользуются люди, — а не заброшены на пол пути.', en: 'I\'m a data engineer. I write in Python, build ETL/ELT pipelines, and work with SQL and cloud storage. My pet projects are shipped and used by real people — not abandoned halfway.' },
    'about.p2': { ru: 'Люблю превращать хаос в структуру: чистые схемы, идемпотентные пайплайны, аккуратный код.', en: 'I love turning chaos into structure: clean schemas, idempotent pipelines, tidy code.' },
    'about.skillsTitle': { ru: 'Навыки', en: 'Skills' },
    'projects.title': { ru: '~/projects', en: '~/projects' },
    'projects.comingSoon': { ru: 'Скоро', en: 'Soon' },
    'contact.title': { ru: '~/contacts', en: '~/contacts' },
    'contact.intro': { ru: 'Всегда открыт для интересных задач и знакомств. Пишите мне.', en: 'Always open to interesting challenges and connections. Reach out.' },
    'contact.resume': { ru: 'Скачать резюме', en: 'Download resume' },
    'footer.copyright': { ru: '© 2026 Александр. Сделано с любовью к данным.', en: '© 2026 Alexander. Made with love for data.' }
  };

  // Данные проектов, переводимые по ключам
  var PROJECTS = [
    {
      id: 1,
      title: { ru: 'Проект 1', en: 'Project 1' },
      desc: { ru: 'Короткое описание первого пет-проекта. Что делает, какие проблемы решает.', en: 'Short description of the first pet project. What it does and the problems it solves.' },
      tags: ['Python', 'SQL'],
      url: '#'
    },
    {
      id: 2,
      title: { ru: 'Проект 2', en: 'Project 2' },
      desc: { ru: 'Короткое описание второго пет-проекта. Пайплайн от источника до витрины.', en: 'Short description of the second pet project. A pipeline from source to data mart.' },
      tags: ['Airflow', 'PostgreSQL'],
      url: '#'
    },
    {
      id: 3,
      title: { ru: 'Проект 3', en: 'Project 3' },
      desc: { ru: 'Короткое описание третьего пет-проекта. Ещё один пример моей работы.', en: 'Short description of the third pet project. Another example of my work.' },
      tags: ['Docker', 'Cloud'],
      url: '#'
    }
  ];

  var STORAGE_KEY = 'lang';
  var SUPPORTED = ['ru', 'en'];

  function detectLang() {
    var stored = '';
    try { stored = localStorage.getItem(STORAGE_KEY) || ''; } catch (e) { /* приватный режим */ }
    if (SUPPORTED.indexOf(stored) !== -1) return stored;

    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (nav.indexOf('ru') === 0) return 'ru';
    return 'en';
  }

  var currentLang = detectLang();

  function setLang(lang) {
    currentLang = SUPPORTED.indexOf(lang) !== -1 ? lang : detectLang();
    document.documentElement.setAttribute('lang', currentLang);
    applyTranslations();
    applyResumeLink();
    renderProjects();
    updateToggleState();
    try { localStorage.setItem(STORAGE_KEY, currentLang); } catch (e) { /* ignore */ }
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var entry = DICT[key];
      if (entry && entry[currentLang] !== undefined) {
        el.textContent = entry[currentLang];
      }
    });
  }

  function applyResumeLink() {
    var file = currentLang === 'ru' ? 'assets/resume-ru.pdf' : 'assets/resume-en.pdf';
    var links = document.querySelectorAll('[id^="resume-btn"]');
    links.forEach(function (link) { link.setAttribute('href', file); });
  }

  function renderProjects() {
    var grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = PROJECTS.map(function (p) {
      var tags = p.tags.map(function (t) {
        return '<span class="project__tag">' + t + '</span>';
      }).join('');

      return (
        '<article class="project">' +
          '<div class="project__body">' +
            '<div class="project__header">' +
              '<h3 class="project__title">' + p.title[currentLang] + '</h3>' +
              '<span class="project__badge">' + DICT['projects.comingSoon'][currentLang] + '</span>' +
            '</div>' +
            '<p class="project__desc">' + p.desc[currentLang] + '</p>' +
            '<div class="project__tags">' + tags + '</div>' +
          '</div>' +
          '<a class="project__link" href="' + p.url + '" target="_blank" rel="noopener noreferrer">GitHub →</a>' +
        '</article>'
      );
    }).join('');
  }

  function updateToggleState() {
    document.querySelectorAll('[data-lang-option]').forEach(function (el) {
      var on = el.getAttribute('data-lang-option') === currentLang;
      el.classList.toggle('is-active', on);
    });
  }

  // Рендерим всё при первой загрузке
  setLang(currentLang);

  // Публикуем наружу
  window.I18N = {
    getLang: function () { return currentLang; },
    setLang: setLang
  };
})();
