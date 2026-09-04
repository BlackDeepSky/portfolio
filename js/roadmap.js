(function () {
  'use strict';

  var STORAGE_KEY = 'de_road_portfolio';

  var BLOCKS = [
    { id: 'database', num: '1', label: { ru: 'Блок Database', en: 'Block Database' }, sub: { ru: 'SQL, теория баз данных и хранилищ, аналитические БД — фундамент.', en: 'SQL, database and warehouse theory, analytical DBs — the foundation.' } },
    { id: 'tools', num: '2', label: { ru: 'Блок Data Tools', en: 'Block Data Tools' }, sub: { ru: 'Python, оркестрация, обработка и стриминг — рабочий пайплайн.', en: 'Python, orchestration, processing and streaming — the working pipeline.' } }
  ];

  var TOPICS = [
    // Блок Database
    { id: 'b1', block: 'database', status: 'done', time: '2 нед', title: { ru: 'SQL — до простых оконок', en: 'SQL — up to basic window functions' } },
    { id: 'b2', block: 'database', status: 'active', time: '1 нед', title: { ru: 'Linux / Git — практический минимум', en: 'Linux / Git — practical minimum' } },
    { id: 'dbtheory', block: 'database', status: 'todo', time: '1–1.5 нед', title: { ru: 'Теория баз данных', en: 'Database theory' } },
    { id: 'b3', block: 'database', status: 'todo', time: '1.5–2 нед', title: { ru: 'PostgreSQL + ускорение', en: 'PostgreSQL + performance' } },
    { id: 'b4', block: 'database', status: 'todo', time: '1.5–2 нед', title: { ru: 'DWH и модели данных', en: 'DWH and data models' } },
    { id: 'gp', block: 'database', status: 'todo', time: '2 нед', title: { ru: 'Greenplum / Arenadata DB', en: 'Greenplum / Arenadata DB' } },
    { id: 'hdp', block: 'database', status: 'aware', time: '2–3 дня', title: { ru: 'Hadoop — коротко, зачем', en: 'Hadoop — briefly, why' } },
    { id: 'b9', block: 'database', status: 'todo', time: '2–3 нед', title: { ru: 'ClickHouse', en: 'ClickHouse' } },

    // Блок Data Tools
    { id: 'b0', block: 'tools', status: 'done', time: '2–3 нед', title: { ru: 'Python для Data Engineering', en: 'Python for Data Engineering' } },
    { id: 'b6', block: 'tools', status: 'todo', time: '3–5 дней', title: { ru: 'Docker — практический минимум', en: 'Docker — practical minimum' } },
    { id: 'b8', block: 'tools', status: 'todo', time: '1.5–2 нед', title: { ru: 'Apache Spark', en: 'Apache Spark' } },
    { id: 'ice', block: 'tools', status: 'aware', time: '2–3 дня', title: { ru: 'Iceberg — коротко, зачем', en: 'Iceberg — briefly, why' } },
    { id: 'b11', block: 'tools', status: 'todo', time: '1.5–2 нед', title: { ru: 'Apache Airflow', en: 'Apache Airflow' } },
    { id: 'b12', block: 'tools', status: 'todo', time: '1.5–2 нед', title: { ru: 'dbt', en: 'dbt' } },
    { id: 'kfk', block: 'tools', status: 'todo', time: '2–3 нед', title: { ru: 'Apache Kafka', en: 'Apache Kafka' } },
    { id: 'bfinal', block: 'tools', status: 'todo', time: '3–5 дней', title: { ru: 'Довести ShopFlow до конца', en: 'Finish ShopFlow' } }
  ];

  var SHOPFLOW = [
    'SQL', 'PostgreSQL', 'DWH', 'Greenplum', 'ClickHouse',
    'Python', 'Docker', 'Spark', 'Airflow', 'dbt', 'Kafka'
  ];

  var state = { done: {}, active: null };

  function load() {
    try {
      var r = localStorage.getItem(STORAGE_KEY);
      if (r) {
        var o = JSON.parse(r);
        state = { done: o.done || {}, active: o.active || null };
        return;
      }
    } catch (e) { /* ignore */ }
    TOPICS.forEach(function (t) {
      if (t.status === 'done') state.done[t.id] = true;
      if (t.status === 'active') state.active = t.id;
    });
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  function currentStatus(topic) {
    if (state.active === topic.id) return 'active';
    if (state.done[topic.id]) return 'done';
    return topic.status === 'aware' ? 'aware' : 'todo';
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function lang() {
    return (window.I18N && window.I18N.getLang()) || 'ru';
  }

  function render() {
    var root = document.getElementById('roadmap-blocks');
    if (!root) return;
    var L = lang();

    var doneCount = TOPICS.filter(function (t) { return currentStatus(t) === 'done'; }).length;
    var total = TOPICS.length;
    var pct = Math.round(doneCount / total * 100);

    var barW = Math.round(doneCount / total * 100);

    root.innerHTML =
      '<div class="roadmap__meter">' +
        '<div class="roadmap__meter-row">' +
          '<span class="roadmap__meter-lbl">' + (L === 'ru' ? 'пройдено пути' : 'path completed') + '</span>' +
          '<span class="roadmap__meter-val">' + doneCount + '/' + total + ' · ' + pct + '%</span>' +
        '</div>' +
        '<div class="roadmap__meter-track"><div class="roadmap__meter-fill" style="width:' + barW + '%"></div></div>' +
      '</div>' +
      BLOCKS.map(function (b) {
        var items = TOPICS.filter(function (t) { return t.block === b.id; });
        return '<div class="roadmap__block">' +
          '<div class="roadmap__block-head">' +
            '<span class="roadmap__block-num">' + b.num + '</span>' +
            '<span class="roadmap__block-title">$ ' + esc(b.label[L]) + '</span>' +
          '</div>' +
          '<ul class="roadmap__list">' +
            items.map(function (t) {
              var st = currentStatus(t);
              var mark = st === 'done' ? '✓' : (st === 'active' ? '▸' : (st === 'aware' ? '○' : '·'));
              return '<li class="roadmap__topic roadmap__topic--' + st + '" data-id="' + t.id + '" role="button" tabindex="0">' +
                '<span class="roadmap__mark">' + mark + '</span>' +
                '<span class="roadmap__name">' + esc(t.title[L]) + '</span>' +
                '<span class="roadmap__time">' + esc(t.time) + '</span>' +
              '</li>';
            }).join('') +
          '</ul>' +
        '</div>';
      }).join('') +
      '<div class="roadmap__shopflow">' +
        '<div class="roadmap__shopflow-label">' + (L === 'ru' ? '$ cat shopflow.txt · сквозной проект' : '$ cat shopflow.txt · end-to-end project') + '</div>' +
        '<div class="roadmap__shopflow-flow">' +
          SHOPFLOW.map(function (s, i) {
            return '<span class="roadmap__sf-node">' + s + '</span>' + (i < SHOPFLOW.length - 1 ? '<span class="roadmap__sf-arrow">→</span>' : '');
          }).join('') +
        '</div>' +
      '</div>';

    root.querySelectorAll('.roadmap__topic').forEach(function (el) {
      el.addEventListener('click', function () { toggle(el.dataset.id); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(el.dataset.id); }
      });
    });
  }

  function toggle(id) {
    var t = TOPICS.find(function (x) { return x.id === id; });
    if (!t) return;
    var st = currentStatus(t);

    if (st === 'done') {
      delete state.done[id];
      if (state.active === id) state.active = nextTodo(id);
    } else if (st === 'active') {
      state.active = null;
    } else {
      state.done[id] = true;
      if (state.active && state.active !== id) delete state.done[state.active];
      state.active = id;
    }
    save();
    render();
  }

  function nextTodo(id) {
    var idx = TOPICS.findIndex(function (x) { return x.id === id; });
    for (var i = idx + 1; i < TOPICS.length; i++) {
      if (state.done[TOPICS[i].id] || TOPICS[i].status === 'aware') continue;
      return TOPICS[i].id;
    }
    return null;
  }

  load();
  render();

  window.ROADMAP = { render: render };
})();
