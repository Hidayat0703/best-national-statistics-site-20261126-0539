// Indonesia in Numbers — hash router and page wiring.
// Routes are the eight section names; anything unknown falls back to the overview.
// After each render, the router wires the controls that page carries (the data table's
// search and filter, the province table's sortable headings) so every control works.

const IDNRoutes = ['overview', 'population', 'economy', 'prices', 'labour', 'regions', 'data', 'sources'];

function currentRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  return IDNRoutes.includes(raw) ? raw : 'overview';
}

function markActiveNav(route) {
  document.querySelectorAll('#main-nav a').forEach(link => {
    const active = link.getAttribute('data-route') === route;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function wireDataPage() {
  const search = document.getElementById('indicator-search');
  const category = document.getElementById('indicator-category');
  const body = document.getElementById('indicator-rows');
  const count = document.getElementById('indicator-count');
  if (!search || !category || !body || !count) return;
  const update = () => {
    const result = indicatorRowsHtml(search.value, category.value);
    body.innerHTML = result.html ||
      '<tr><td colspan="5">No indicator matches that search — try a shorter word, or clear the category filter.</td></tr>';
    count.textContent = `Showing ${result.count} of ${result.total} indicators`;
  };
  search.addEventListener('input', update);
  category.addEventListener('change', update);
  update();
}

function wireProvinceTable() {
  const table = document.getElementById('province-table');
  if (!table) return;
  const tbody = table.querySelector('tbody');
  table.querySelectorAll('th[data-sort]').forEach((head, columnIndex) => {
    head.classList.add('sortable-head');
    head.addEventListener('click', () => {
      const type = head.getAttribute('data-sort');
      const direction = head.getAttribute('data-dir') === 'asc' ? 'desc' : 'asc';
      table.querySelectorAll('th').forEach(h => h.removeAttribute('data-dir'));
      head.setAttribute('data-dir', direction);
      const cellValue = row => {
        const text = row.children[columnIndex].textContent.trim();
        return type === 'num' ? parseFloat(text.replace(/[^0-9.]/g, '')) || 0 : text.toLowerCase();
      };
      const rows = [...tbody.querySelectorAll('tr')];
      rows.sort((a, b) => {
        const va = cellValue(a), vb = cellValue(b);
        const cmp = typeof va === 'number' ? va - vb : String(va).localeCompare(String(vb));
        return direction === 'asc' ? cmp : -cmp;
      });
      rows.forEach(row => tbody.appendChild(row));
    });
  });
}

function renderRoute() {
  const route = currentRoute();
  const main = document.getElementById('page');
  main.innerHTML = IDNViews[route]();
  markActiveNav(route);
  if (route === 'data') wireDataPage();
  if (route === 'regions') wireProvinceTable();
  document.title = route === 'overview'
    ? 'Indonesia in Numbers — National Statistics of Indonesia'
    : `${route[0].toUpperCase() + route.slice(1)} — Indonesia in Numbers`;
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', renderRoute);
