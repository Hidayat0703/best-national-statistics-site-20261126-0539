// Indonesia in Numbers — page renderers.
// Each view returns the HTML for one hash route. Views read only the IDN data object
// (data.js) and the chart builders (charts.js); the router swaps the result into <main>.

function statCards(cards) {
  return `<div class="stat-grid">${cards.map(card => `
    <article class="stat-card">
      <p class="stat-label">${card.label}</p>
      <p class="stat-value">${card.value}</p>
      <p class="stat-note">${card.note}</p>
      <p class="stat-source">${card.source}</p>
    </article>`).join('')}</div>`;
}

function chartCard(title, sourceLine, chartSvg, caption) {
  return `<section class="card chart-card">
    <div class="card-head"><h3>${title}</h3><span class="card-source">${sourceLine}</span></div>
    <div class="chart">${chartSvg}</div>
    <p class="chart-caption">${caption}</p>
  </section>`;
}

function factList(items) {
  return `<ul class="fact-list">${items.map(item => `<li><strong>${item.head}</strong> ${item.body}</li>`).join('')}</ul>`;
}

function pageHead(kicker, title, intro) {
  return `<div class="page-head"><p class="kicker">${kicker}</p><h2>${title}</h2><p class="intro">${intro}</p></div>`;
}

const IDNViews = {

  overview() {
    const census = IDN.censusPopulation.map(d => ({ label: String(d.year), value: d.millions }));
    const growth = IDN.gdpGrowth.slice(-8).map(d => ({ label: String(d.year), value: d.pct }));
    return `
    <section class="hero">
      <div class="hero-text">
        <p class="kicker">Republic of Indonesia · Southeast Asia</p>
        <h1>Indonesia, in numbers</h1>
        <p class="hero-lede">The world's fourth most populous country and Southeast Asia's largest
        economy, measured by the offices that count it: 281.6 million people, a US$1.40 trillion
        economy growing at 5.03%, and inflation back at 1.57%. Every figure on this site names
        its source and year.</p>
      </div>
      ${statCards(IDN.headline)}
    </section>
    <div class="two-col">
      ${chartCard('Population by census, 1971–2024', 'BPS censuses; 2024 = mid-year estimate',
        barChart(census, { title: 'Population of Indonesia by census year, millions', colour: '#0d3b66', highlight: '#d7263d', highlightLast: true }),
        'Indonesia has added about 11 million people a year since 1971 — and the 2020 census counted 270.2 million across 38 provinces.')}
      ${chartCard('Real GDP growth, 2017–2024', 'BPS, % year on year',
        barChart(growth, { title: 'Real GDP growth 2017 to 2024, percent', colour: '#17877b', highlight: '#d7263d', highlightLast: true }),
        'Growth fell to −2.07% in the pandemic year 2020, then returned to the 5% path it has held for a decade.')}
    </div>
    <section class="card">
      <div class="card-head"><h3>Explore the sections</h3><span class="card-source">8 pages, every figure sourced</span></div>
      <div class="section-links">
        <a href="#/population"><strong>Population</strong><span>281.6 m people, census history, age structure, life expectancy</span></a>
        <a href="#/economy"><strong>Economy</strong><span>GDP, growth, sectors, poverty and the Gini ratio</span></a>
        <a href="#/prices"><strong>Prices</strong><span>Inflation from the 1998 crisis peak of 77.63% to 1.57% today</span></a>
        <a href="#/labour"><strong>Labour</strong><span>152.1 m in the labour force, unemployment at 4.82%</span></a>
        <a href="#/regions"><strong>Regions</strong><span>38 provinces: who lives where, and how densely</span></a>
        <a href="#/data"><strong>Data tables</strong><span>All 39 headline indicators, searchable, with source and year</span></a>
        <a href="#/sources"><strong>Sources</strong><span>Who publishes each number, and how to read it</span></a>
      </div>
    </section>
    <section class="card">
      <div class="card-head"><h3>Indonesia at a glance</h3><span class="card-source">BPS · World Bank · APJII</span></div>
      <div class="glance-grid">
        <p><strong>Land area</strong><span>1,904,569 km², 17,001 named islands (BPS, 2023)</span></p>
        <p><strong>Capital</strong><span>Jakarta — 10.56 m people, 15,907 per km² (BPS census, 2020)</span></p>
        <p><strong>People on Java</strong><span>151.6 m — 56.1% of the nation on 6.6% of the land (BPS, 2020)</span></p>
        <p><strong>Trade in goods</strong><span>Exports US$264.7 bn, surplus US$31.0 bn (BPS, 2024)</span></p>
        <p><strong>Connected</strong><span>221.6 m internet users, 79.5% penetration (APJII, 2024)</span></p>
        <p><strong>Schooling</strong><span>Mean 8.77 years; expected 13.15 years (BPS, 2023)</span></p>
      </div>
    </section>`;
  },

  population() {
    const census = IDN.censusPopulation.map(d => ({ label: String(d.year), value: d.millions }));
    const life = IDN.lifeExpectancy.map(d => ({ label: String(d.year), value: d.years }));
    return `
    ${pageHead('Population', '281.6 million people, still growing near 1% a year',
      'Indonesia is the world\'s fourth most populous country. The 2020 census counted 270,203,917 people; ' +
      'the mid-2024 estimate is 281.6 million. Growth has slowed from 2.3% a year in the 1970s to about 0.9% today (BPS, 2024).')}
    <div class="two-col">
      ${chartCard('Population by census, 1971–2024', 'BPS censuses; 2024 = mid-year estimate',
        barChart(census, { title: 'Population of Indonesia by census year, millions', colour: '#0d3b66', highlight: '#d7263d', highlightLast: true }),
        'Each census since 1971 has added between 27 and 33 million people; the 2024 bar is the BPS mid-year estimate.')}
      ${chartCard('Age structure, 2023', 'World Bank, % of population',
        donutChart(IDN.ageStructure2023, { title: 'Age structure of Indonesia, 2023', centreTop: '67.9%', centreSub: 'working age' }),
        'A young country turning middle-aged: the 65-and-over share has doubled since 1990, while under-15s have fallen from 40% to 24.5%.')}
    </div>
    <div class="two-col">
      ${chartCard('Life expectancy at birth, 1990–2023', 'World Bank, years',
        lineChart(life, { title: 'Life expectancy at birth in Indonesia', colour: '#17877b', labelEvery: 2 }),
        'A newborn Indonesian in 2023 could expect 71.4 years of life — nine years more than in 1990.')}
      <section class="card">
        <div class="card-head"><h3>How Indonesians live</h3><span class="card-source">BPS · World Bank</span></div>
        ${factList([
          { head: '58.6% urban.', body: 'The urban share passed half in 2011 and keeps rising about half a point a year (World Bank, 2023).' },
          { head: '2.15 births per woman.', body: 'Fertility is near replacement level, down from 5.6 in the late 1960s (World Bank, 2022).' },
          { head: '147 people per km².', body: 'The national average hides the spread: Jakarta packs 15,907 per km², Papua about 14 (BPS, 2020).' },
          { head: 'Sex ratio 102.', body: 'About 102 men for every 100 women in the 2020 census count (BPS, 2020).' },
          { head: 'Median age near 30.', body: 'Half the population is younger than about 30 years (World Bank, 2023).' },
        ])}
        <p class="more-link"><a href="#/regions">See the provinces →</a></p>
      </section>
    </div>`;
  },

  economy() {
    const growth = IDN.gdpGrowth.map(d => ({ label: String(d.year), value: d.pct }));
    const poverty = IDN.povertyMarch.map(d => ({ label: String(d.year), value: d.pct }));
    return `
    ${pageHead('Economy', 'A US$1.40 trillion economy on a 5% growth path',
      'Indonesia is the largest economy in Southeast Asia and a member of the G20. GDP reached US$1.396 trillion in 2024 ' +
      '(World Bank), or Rp78.6 million — about US$4,925 — per person (BPS, 2024).')}
    <div class="two-col">
      ${chartCard('Real GDP growth, 2010–2024', 'BPS, % year on year',
        lineChart(growth, { title: 'Real GDP growth in Indonesia 2010 to 2024', colour: '#17877b', includeZero: true, labelEvery: 3 }),
        'A decade near 5–6%, the pandemic contraction of −2.07% in 2020, and a return to 5.03% by 2024. The 1998 Asian crisis low was −13.13% (BPS).')}
      ${chartCard('What the economy makes, 2023', 'World Bank, value added, % of GDP',
        donutChart(IDN.sectorShares2023, { title: 'GDP by sector, Indonesia 2023', centreTop: '43.0%', centreSub: 'services' }),
        'Manufacturing alone is 18.7% of GDP — the largest single industry — inside the 40.2% industry total (World Bank, 2023).')}
    </div>
    <div class="two-col">
      ${chartCard('Poverty rate, March, 2010–2024', 'BPS, % of population',
        lineChart(poverty, { title: 'Poverty rate in Indonesia, March readings', colour: '#d7263d', labelEvery: 2 }),
        'Poverty fell from 13.33% in 2010 to 9.03% in March 2024 — 25.22 million people — despite the pandemic bump in 2020–21 (BPS).')}
      <section class="card">
        <div class="card-head"><h3>The economy in facts</h3><span class="card-source">BPS · World Bank · UNDP</span></div>
        ${factList([
          { head: 'Gini ratio 0.379.', body: 'Expenditure inequality in March 2024, down from 0.41 a decade earlier (BPS, 2024).' },
          { head: 'Exports US$264.7 bn.', body: 'Goods exports in 2024 against imports of US$233.7 bn — a surplus of US$31.0 bn, led by coal, palm oil and steel (BPS, 2024).' },
          { head: 'HDI 0.713.', body: 'The UN development index puts Indonesia in the high human development group (UNDP, 2022).' },
          { head: '5 largest economies.', body: 'Jakarta, West, East and Central Java and North Sumatra together make 59.5% of GDP (BPS, 2023) — see Regions.' },
        ])}
        <p class="more-link"><a href="#/data">All economy indicators →</a></p>
      </section>
    </div>`;
  },

  prices() {
    const dec = IDN.inflationDecember.map(d => ({ label: String(d.year), value: d.pct }));
    const monthly = IDN.inflationMonthly2024.map(d => ({ label: d.month, value: d.pct }));
    return `
    ${pageHead('Prices', 'Inflation at 1.57% — the tamest in decades',
      'Consumer price inflation ended 2024 at 1.57% year on year (BPS, December 2024), inside Bank Indonesia\'s ' +
      '2.5% ± 1% target band and a world away from the 77.63% of December 1998.')}
    <div class="two-col">
      ${chartCard('Inflation, December, 2010–2024', 'BPS, CPI, % year on year',
        barChart(dec, { title: 'December inflation in Indonesia 2010 to 2024', colour: '#e0a100', highlight: '#d7263d', highlightLast: true }),
        'The 2013–14 fuel-price rises pushed inflation above 8%; the 2022 global price shock peaked at 5.51% before the slide to 1.57%.')}
      ${chartCard('Inflation through 2024, month by month', 'BPS, CPI, % year on year',
        lineChart(monthly, { title: 'Monthly year-on-year inflation during 2024', colour: '#0d3b66', labelEvery: 2 }),
        'Inflation cooled almost every month of 2024, from 3.05% in March to 1.57% in December (BPS).')}
    </div>
    <section class="card">
      <div class="card-head"><h3>Reading the inflation numbers</h3><span class="card-source">BPS · Bank Indonesia</span></div>
      ${factList([
        { head: '77.63% — December 1998.', body: 'The Asian financial crisis peak: prices rose by more than three quarters in a single year (BPS).' },
        { head: '17.11% — December 2005.', body: 'Fuel subsidy cuts doubled fuel prices in 2005 and pushed inflation to its post-crisis high (BPS).' },
        { head: '6.00% policy rate.', body: 'Bank Indonesia ended 2024 with its benchmark rate at 6.00%, held to support the rupiah (Bank Indonesia, 2024).' },
        { head: '2.09% average 2024.', body: 'Average inflation across 2024 was 2.09%, the lowest annual average since 2020 (BPS, 2024).' },
      ])}
    </section>`;
  },

  labour() {
    const unemp = IDN.unemploymentFebruary.map(d => ({ label: String(d.year), value: d.pct }));
    return `
    ${pageHead('Labour', '152.1 million in the labour force; 4.82% unemployed',
      'Indonesia\'s labour force reached 152.11 million people in August 2024, of whom 144.64 million were in work. ' +
      'The open unemployment rate was 4.82% in February 2024, the lowest February reading on record (BPS).')}
    <div class="two-col">
      ${chartCard('Open unemployment, February, 2015–2024', 'BPS Sakernas, % of labour force',
        lineChart(unemp, { title: 'Open unemployment rate, February readings 2015 to 2024', colour: '#0d3b66', labelEvery: 2 }),
        'Unemployment jumped to 6.26% in February 2021 as the pandemic bit, then fell for three straight years to 4.82%.')}
      <section class="card">
        <div class="card-head"><h3>Work in facts</h3><span class="card-source">BPS Sakernas</span></div>
        ${factList([
          { head: '69.80% participation.', body: 'Seven in ten working-age Indonesians were in the labour force in February 2024 (BPS).' },
          { head: '59.17% informal.', body: 'Most workers — own-account workers, casual and unpaid family workers — work informally, February 2024 (BPS).' },
          { head: '7.07% — August 2020.', body: 'The pandemic peak of open unemployment, when 2.67 million people lost work to COVID-19 (BPS).' },
          { head: '11.24% — 2005.', body: 'Unemployment in the mid-2000s was more than double today\'s rate (BPS).' },
        ])}
        <p class="more-link"><a href="#/data">All labour indicators →</a></p>
      </section>
    </div>
    ${statCards([
      { label: 'Labour force', value: '152.11 m', note: 'August 2024', source: 'BPS, 2024' },
      { label: 'In work', value: '144.64 m', note: 'August 2024', source: 'BPS, 2024' },
      { label: 'Unemployed', value: '7.47 m', note: 'August 2024', source: 'BPS, 2024' },
      { label: 'Participation rate', value: '69.80%', note: 'February 2024', source: 'BPS, 2024' },
      { label: 'Informal share', value: '59.17%', note: 'of workers, February 2024', source: 'BPS, 2024' },
      { label: 'Youth unemployment', value: '13.9%', note: 'ages 15–24, February 2024', source: 'BPS, 2024' },
    ])}`;
  },

  regions() {
    const top = IDN.provinces.slice(0, 10).map(p => ({
      label: p.name, value: p.population / 1000000, display: (p.population / 1000000).toFixed(1) + ' m',
    }));
    const totalPop = 270203917;
    const rows = IDN.provinces.map(p => `<tr>
      <td>${p.name}</td><td class="num">${p.population.toLocaleString('en-US')}</td>
      <td class="num">${(p.population / totalPop * 100).toFixed(1)}%</td>
      <td class="num">${p.density.toLocaleString('en-US')}</td></tr>`).join('');
    const econ = IDN.largestEconomies2023.map(e => `<tr>
      <td>${e.province}</td><td class="num">${e.shareOfGdp.toFixed(1)}%</td></tr>`).join('');
    return `
    ${pageHead('Regions', '38 provinces — half the nation on one island',
      'The 2020 census counted 151.6 million people on Java — 56.1% of Indonesia on 6.6% of its land — and 118.6 million ' +
      'spread across the other 17,000 islands. Papua province has since split into four, taking the province count to 38 (BPS).')}
    <div class="two-col">
      ${chartCard('The ten most populous provinces, 2020', 'BPS census, millions of people',
        rankBars(top, { title: 'Ten most populous provinces of Indonesia, 2020 census', colour: '#0d3b66' }),
        'West Java alone, at 48.3 million, holds more people than Spain. The three Javanese provinces top the list (BPS, 2020).')}
      <section class="card">
        <div class="card-head"><h3>Largest provincial economies</h3><span class="card-source">BPS, share of GDP, 2023</span></div>
        <table class="data-table"><thead><tr><th>Province</th><th class="num">Share of GDP</th></tr></thead>
        <tbody>${econ}</tbody></table>
        <p class="chart-caption">Five provinces — four of them on Java — produce 59.5% of national GDP. East Kalimantan,
        rich in coal and oil, has the highest GDP per person of any large province (BPS, 2023).</p>
      </section>
    </div>
    <section class="card">
      <div class="card-head"><h3>Provinces by population — 2020 census</h3><span class="card-source">BPS, Population Census 2020</span></div>
      <p class="table-hint">Select a column heading to sort the table.</p>
      <div class="table-scroll"><table class="data-table sortable" id="province-table">
        <thead><tr>
          <th data-sort="text">Province</th><th class="num" data-sort="num">Population</th>
          <th class="num" data-sort="num">Share</th><th class="num" data-sort="num">People per km²</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
      <p class="chart-caption">The 20 largest of the then-34 provinces; the census total was 270,203,917. Papua is shown in its
      2020 boundaries, before the 2022 split into four provinces. Density contrasts run from Jakarta's 15,907 per km² to Papua's 14.</p>
    </section>`;
  },

  data() {
    const categories = ['All categories', ...new Set(IDN.indicators.map(i => i.category))];
    return `
    ${pageHead('Data tables', 'Every headline indicator, in one table',
      'All 39 indicators used across this site, with the value, unit, year and publishing source for each. ' +
      'Search by name, or filter by category — the table updates as you type.')}
    <section class="card">
      <div class="data-controls">
        <label>Search indicators <input type="search" id="indicator-search" placeholder="e.g. inflation, poverty, GDP"></label>
        <label>Category <select id="indicator-category">${categories.map(c => `<option>${c}</option>`).join('')}</select></label>
        <p class="data-count" id="indicator-count"></p>
      </div>
      <div class="table-scroll"><table class="data-table">
        <thead><tr><th>Indicator</th><th class="num">Value</th><th>Unit</th><th class="num">Year</th><th>Source</th></tr></thead>
        <tbody id="indicator-rows"></tbody>
      </table></div>
      <p class="chart-caption">Values are the publishers' figures as released; where a series is revised, the latest vintage is used.
      The full notes on each publisher are on the Sources page.</p>
    </section>`;
  },

  sources() {
    return `
    ${pageHead('Sources & method', 'Who counts Indonesia, and how to read their numbers',
      'This site publishes no numbers of its own. Every figure is drawn from an official publisher, named beside the figure ' +
      'with its year, so any number here can be traced back and checked.')}
    <section class="card">
      <div class="card-head"><h3>The publishers</h3></div>
      ${factList([
        { head: 'BPS — Statistics Indonesia (bps.go.id).', body: 'The national statistics office. It runs the population census every ten years (last: 2020), the Sakernas labour force survey each February and August, the Susenas household survey behind the poverty and Gini figures, and publishes GDP, inflation and trade monthly or quarterly. Most figures on this site are BPS figures.' },
        { head: 'World Bank Open Data (data.worldbank.org).', body: 'Used for long international series — life expectancy, fertility, age structure, sector shares and GDP in US dollars — where a consistent cross-country method matters more than the latest national release.' },
        { head: 'Bank Indonesia (bi.go.id).', body: 'The central bank: publisher of the policy interest rate and co-producer of the inflation target framework. Inflation itself is measured by BPS.' },
        { head: 'APJII.', body: 'The Indonesian Internet Service Providers Association\'s annual survey is the standard source for internet user counts and penetration.' },
        { head: 'SSGI / Ministry of Health.', body: 'The Indonesian Nutritional Status Survey measures stunting among children under five (21.5% in 2023).' },
        { head: 'ESDM and UNDP.', body: 'The Ministry of Energy and Mineral Resources publishes the electrification ratio; the UNDP computes the human development index (0.713 for 2022).' },
      ])}
    </section>
    <section class="card">
      <div class="card-head"><h3>How to read the figures</h3></div>
      ${factList([
        { head: 'Census vs estimate.', body: 'Population counts dated 1971–2020 are census counts. The 2024 figure is the BPS mid-year estimate built from the census and vital statistics.' },
        { head: 'February vs August labour.', body: 'BPS surveys the labour force twice a year; February is the headline reading used across this site, with August shown where it adds information.' },
        { head: 'March poverty.', body: 'The poverty rate is a March Susenas reading; a September reading is also published and can differ by a few tenths of a point.' },
        { head: 'Revisions.', body: 'GDP and trade figures are revised as fuller data arrive. This site uses the latest published vintage at the time of writing, November 2026.' },
      ])}
      <p class="more-link"><a href="#/data">Back to the data tables →</a></p>
    </section>`;
  },
};

// Renders the indicator table body for the Data page, honouring the search text and category.
function indicatorRowsHtml(searchText, category) {
  const needle = (searchText || '').trim().toLowerCase();
  const rows = IDN.indicators.filter(ind => {
    const inCategory = !category || category === 'All categories' || ind.category === category;
    const inSearch = !needle || (ind.name + ' ' + ind.category + ' ' + ind.source).toLowerCase().includes(needle);
    return inCategory && inSearch;
  });
  const html = rows.map(ind => `<tr>
    <td>${ind.name}</td><td class="num"><strong>${ind.value}</strong></td>
    <td>${ind.unit}</td><td class="num">${ind.year}</td><td>${ind.source}</td></tr>`).join('');
  return { html, count: rows.length, total: IDN.indicators.length };
}
