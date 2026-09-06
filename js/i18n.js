(function () {
  'use strict';

  var DICT = {
    'nav.logo': { ru: 'Александр', en: 'Alexander' },
    'nav.about': { ru: 'О себе', en: 'About' },
    'nav.projects': { ru: 'Проекты', en: 'Projects' },
    'nav.roadmap': { ru: 'Роадмап', en: 'Roadmap' },
    'nav.contact': { ru: 'Контакты', en: 'Contact' },
    'hero.term': { ru: 'alexander@data: ~', en: 'alexander@data: ~' },
    'hero.whoami': { ru: 'whoami', en: 'whoami' },
    'hero.whoamiOut': { ru: 'alexander · data engineer', en: 'alexander · data engineer' },
    'hero.cat': { ru: 'cat about.txt', en: 'cat about.txt' },
    'hero.catOut': { ru: 'Строю ETL/ELT-пайплайны, которые превращают сырые данные в решения.', en: 'I build ETL/ELT pipelines that turn raw data into decisions.' },
    'hero.ctaPrimary': { ru: 'Смотреть проекты', en: 'View projects' },
    'hero.ctaResume': { ru: 'Скачать резюме', en: 'Download resume' },
    'about.title': { ru: '~/about', en: '~/about' },
    'about.p1': { ru: 'Учусь на дата-инженера по собственному роадмапу: фундамент — SQL, теория БД, DWH, аналитические базы (PostgreSQL, ClickHouse, Greenplum); инструменты — Python, Docker, Spark, Airflow, dbt, Kafka. Коммерческого опыта ещё нет, но у меня есть живые пет-проекты, которыми пользуются реальные люди.', en: 'I\'m learning to be a data engineer following my own roadmap: the foundation — SQL, DB theory, DWH, analytical databases (PostgreSQL, ClickHouse, Greenplum); the tools — Python, Docker, Spark, Airflow, dbt, Kafka. No commercial experience yet, but I have live pet projects used by real people.' },
    'about.p2': { ru: 'Люблю превращать хаос в структуру: чистые схемы, идемпотентные пайплайны, аккуратный код. Каждый проект довожу до состояния, которым можно пользоваться, — а не бросаю на полпути.', en: 'I love turning chaos into structure: clean schemas, idempotent pipelines, tidy code. I take every project to a usable state rather than abandoning it halfway.' },
    'about.statusVal': { ru: 'self-taught · в процессе', en: 'self-taught · in progress' },
    'about.skillsTitle': { ru: 'Навыки', en: 'Skills' },
    'roadmap.title': { ru: '~/roadmap', en: '~/roadmap' },
    'projects.title': { ru: '~/projects', en: '~/projects' },
    'contact.title': { ru: '~/contacts', en: '~/contacts' },
    'contact.intro': { ru: 'Всегда открыт для интересных задач и знакомств. Пишите мне.', en: 'Always open to interesting challenges and connections. Reach out.' },
    'contact.resume': { ru: 'Скачать резюме', en: 'Download resume' },
    'footer.copyright': { ru: '© 2026 Александр. Сделано с любовью к данным.', en: '© 2026 Alexander. Made with love for data.' }
  };

  // Данные проектов, переводимые по ключам
  var PROJECTS = [
    {
      id: 1,
      title: { ru: 'News Bot', en: 'News Bot' },
      desc: { ru: 'Telegram-бот, который парсит RSS-ленты про ИИ, науку и ИТ, пересказывает статьи по-русски через бесплатную ИИ-модель (OpenRouter), подбирает картинку и публикует в канал. Работает по расписанию через GitHub Actions — без постоянно запущенного сервера.', en: 'Telegram bot that parses RSS feeds about AI, science and IT, rewrites articles in Russian via a free AI model (OpenRouter), picks a cover image and posts them to a channel. Runs on a schedule via GitHub Actions — no permanently running server.' },
      tags: ['Python', 'feedparser', 'OpenRouter', 'Telegram Bot API', 'GitHub Actions'],
      links: [
        { href: 'https://github.com/BlackDeepSky/news_bot', label: 'GitHub →' },
        { href: 'https://t.me/yourpocketnews', label: 'Channel →' }
      ]
    },
    {
      id: 2,
      title: { ru: 'Листай', en: 'Listay' },
      desc: { ru: 'Веб-сервис и Telegram-бот для перевода электронных книг с любого языка на любой. Три клика: загрузить файл, выбрать язык, скачать перевод. Бэкенд на FastAPI, очередь задач Celery + Redis, PostgreSQL, JWT-авторизация, фронтенд React + Tailwind, ИИ-перевод через DeepSeek. Деплой: Docker + Hetzner + Cloudflare.', en: 'Web service and Telegram bot that translate e-books from any language to any other. Three clicks: upload a file, pick a language, download the translation. FastAPI backend, Celery + Redis job queue, PostgreSQL, JWT auth, React + Tailwind frontend, AI translation via DeepSeek. Deployed with Docker on Hetzner behind Cloudflare.' },
      tags: ['Python', 'FastAPI', 'PostgreSQL', 'Celery', 'Redis', 'DeepSeek', 'React', 'Docker'],
      links: [
        { href: 'https://github.com/BlackDeepSky/listay-app', label: 'GitHub →' },
        { href: 'https://t.me/listaybook_bot', label: 'Bot →' }
      ]
    },
    {
      id: 3,
      title: { ru: 'КабинетЗаочника', en: 'Student Cabinet' },
      desc: { ru: 'SaaS для автоматизации сдачи учебных работ в колледжах: студент сдаёт работы электронно или почтой, преподаватель проверяет, админ ведёт журнал. Роли студент / преподаватель / админ, PWA, email-уведомления, деплой на Render.', en: 'SaaS that automates submission of coursework in colleges: students submit work electronically or by mail, teachers review, admins keep an audit log. Student / teacher / admin roles, PWA, email notifications, deployed on Render.' },
      tags: ['Python', 'FastAPI', 'PostgreSQL', 'Cloudflare R2', 'Bootstrap', 'PWA'],
      links: [
        { href: 'https://github.com/BlackDeepSky/student-cabinet-mvp', label: 'GitHub →' },
        { href: 'https://student-cabinet-mvp.onrender.com', label: 'Demo →' }
      ]
    },
    {
      id: 4,
      title: { ru: 'Analytics Projects', en: 'Analytics Projects' },
      desc: { ru: 'Четыре SQL-проекта по продуктовой аналитике: прибыльность сервиса доставки (влияние оптимизации сборки), выручка от новых пользователей, динамика ARPU / ARPPU / AOV, дашборд ключевых метрик роста. Сложные CTE и оконные функции PostgreSQL, визуализация в Redash.', en: 'Four SQL projects in product analytics: delivery-service profitability (impact of packing-cost optimisation), revenue from new users, ARPU / ARPPU / AOV dynamics, and a dashboard of key growth metrics. Complex CTEs and window functions in PostgreSQL, visualised in Redash.' },
      tags: ['PostgreSQL', 'SQL', 'CTE', 'Window Functions', 'Redash', 'ETL'],
      links: [
        { href: 'https://github.com/BlackDeepSky/analytics_projects', label: 'GitHub →' },
        { href: 'https://redash.public.karpov.courses/dashboards/9038-gross-profit', label: 'Dashboard →' }
      ]
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
    if (window.ROADMAP) window.ROADMAP.render();
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

      var linksHtml = '<div class="project__links">' + p.links.map(function (l) {
        return '<a class="project__link" href="' + l.href + '" target="_blank" rel="noopener noreferrer">' + l.label + '</a>';
      }).join('') + '</div>';

      return (
        '<article class="project">' +
          '<div class="project__body">' +
            '<div class="project__header">' +
              '<h3 class="project__title">' + p.title[currentLang] + '</h3>' +
            '</div>' +
            '<p class="project__desc">' + p.desc[currentLang] + '</p>' +
            '<div class="project__tags">' + tags + '</div>' +
          '</div>' +
          linksHtml +
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
