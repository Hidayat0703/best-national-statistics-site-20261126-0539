// Indonesia in Numbers — the data layer.
// Every figure is a published official value and carries its source and year next to it.
// Sources: BPS = BPS Statistics Indonesia (bps.go.id), WB = World Bank Open Data,
// APJII = Indonesian Internet Service Providers Association survey, SSGI = Indonesian
// Nutritional Status Survey (Ministry of Health), ESDM = Ministry of Energy and Mineral
// Resources, UNDP = United Nations Development Programme. Nothing here is fetched: the
// numbers are baked into this file so the site works fully offline.

const IDN = {

  headline: [
    { label: 'Population', value: '281.6 m', note: 'mid-year estimate', source: 'BPS, 2024' },
    { label: 'Gross domestic product', value: 'US$1.40 tn', note: 'current prices', source: 'World Bank, 2024' },
    { label: 'GDP growth', value: '5.03%', note: 'real, year on year', source: 'BPS, 2024' },
    { label: 'Inflation', value: '1.57%', note: 'CPI, December, year on year', source: 'BPS, 2024' },
    { label: 'Unemployment', value: '4.82%', note: 'open unemployment, February', source: 'BPS, 2024' },
    { label: 'Poverty rate', value: '9.03%', note: '25.22 million people, March', source: 'BPS, 2024' },
  ],

  censusPopulation: [
    { year: 1971, millions: 119.2 },
    { year: 1980, millions: 147.5 },
    { year: 1990, millions: 179.4 },
    { year: 2000, millions: 206.3 },
    { year: 2010, millions: 237.6 },
    { year: 2020, millions: 270.2 },
    { year: 2024, millions: 281.6 },
  ],

  gdpGrowth: [
    { year: 2010, pct: 6.38 }, { year: 2011, pct: 6.17 }, { year: 2012, pct: 6.03 },
    { year: 2013, pct: 5.56 }, { year: 2014, pct: 5.01 }, { year: 2015, pct: 4.88 },
    { year: 2016, pct: 5.03 }, { year: 2017, pct: 5.07 }, { year: 2018, pct: 5.17 },
    { year: 2019, pct: 5.02 }, { year: 2020, pct: -2.07 }, { year: 2021, pct: 3.70 },
    { year: 2022, pct: 5.31 }, { year: 2023, pct: 5.05 }, { year: 2024, pct: 5.03 },
  ],

  inflationDecember: [
    { year: 2010, pct: 6.96 }, { year: 2011, pct: 3.79 }, { year: 2012, pct: 4.30 },
    { year: 2013, pct: 8.38 }, { year: 2014, pct: 8.36 }, { year: 2015, pct: 3.35 },
    { year: 2016, pct: 3.02 }, { year: 2017, pct: 3.61 }, { year: 2018, pct: 3.13 },
    { year: 2019, pct: 2.72 }, { year: 2020, pct: 1.68 }, { year: 2021, pct: 1.87 },
    { year: 2022, pct: 5.51 }, { year: 2023, pct: 2.61 }, { year: 2024, pct: 1.57 },
  ],

  inflationMonthly2024: [
    { month: 'Jan', pct: 2.57 }, { month: 'Feb', pct: 2.75 }, { month: 'Mar', pct: 3.05 },
    { month: 'Apr', pct: 3.00 }, { month: 'May', pct: 2.84 }, { month: 'Jun', pct: 2.51 },
    { month: 'Jul', pct: 2.13 }, { month: 'Aug', pct: 2.12 }, { month: 'Sep', pct: 1.84 },
    { month: 'Oct', pct: 1.71 }, { month: 'Nov', pct: 1.55 }, { month: 'Dec', pct: 1.57 },
  ],

  unemploymentFebruary: [
    { year: 2015, pct: 5.81 }, { year: 2016, pct: 5.50 }, { year: 2017, pct: 5.33 },
    { year: 2018, pct: 5.13 }, { year: 2019, pct: 5.01 }, { year: 2020, pct: 4.99 },
    { year: 2021, pct: 6.26 }, { year: 2022, pct: 5.83 }, { year: 2023, pct: 5.45 },
    { year: 2024, pct: 4.82 },
  ],

  povertyMarch: [
    { year: 2010, pct: 13.33 }, { year: 2012, pct: 11.66 }, { year: 2014, pct: 11.25 },
    { year: 2016, pct: 10.70 }, { year: 2018, pct: 9.66 }, { year: 2020, pct: 9.78 },
    { year: 2022, pct: 9.54 }, { year: 2024, pct: 9.03 },
  ],

  lifeExpectancy: [
    { year: 1990, years: 62.4 }, { year: 2000, years: 66.3 }, { year: 2010, years: 69.2 },
    { year: 2015, years: 70.7 }, { year: 2019, years: 71.7 }, { year: 2022, years: 71.2 },
    { year: 2023, years: 71.4 },
  ],

  ageStructure2023: [
    { group: 'Ages 0–14', pct: 24.5, colour: '#17877b' },
    { group: 'Ages 15–64', pct: 67.9, colour: '#0d3b66' },
    { group: 'Ages 65 and over', pct: 7.6, colour: '#e0a100' },
  ],

  sectorShares2023: [
    { sector: 'Services', pct: 43.0, colour: '#0d3b66' },
    { sector: 'Industry incl. manufacturing', pct: 40.2, colour: '#17877b' },
    { sector: 'Agriculture, forestry & fishing', pct: 12.5, colour: '#7fb069' },
    { sector: 'Taxes less subsidies on products', pct: 4.3, colour: '#c9ced6' },
  ],

  // Population by province, 2020 census (BPS). Density is people per square kilometre.
  provinces: [
    { name: 'West Java', population: 48274162, density: 1365 },
    { name: 'East Java', population: 40665696, density: 851 },
    { name: 'Central Java', population: 36516035, density: 1113 },
    { name: 'North Sumatra', population: 14799787, density: 203 },
    { name: 'Banten', population: 11904562, density: 1230 },
    { name: 'Jakarta', population: 10562088, density: 15907 },
    { name: 'South Sulawesi', population: 9073509, density: 194 },
    { name: 'Lampung', population: 9007848, density: 260 },
    { name: 'South Sumatra', population: 8467432, density: 92 },
    { name: 'Riau', population: 6394087, density: 73 },
    { name: 'West Sumatra', population: 5534472, density: 132 },
    { name: 'West Kalimantan', population: 5414390, density: 37 },
    { name: 'West Nusa Tenggara', population: 5320092, density: 296 },
    { name: 'Aceh', population: 5274871, density: 93 },
    { name: 'Bali', population: 4317404, density: 747 },
    { name: 'Papua (2020 boundaries)', population: 4303707, density: 14 },
    { name: 'South Kalimantan', population: 4073584, density: 105 },
    { name: 'East Kalimantan', population: 3766039, density: 30 },
    { name: 'Yogyakarta', population: 3668719, density: 1171 },
    { name: 'North Sulawesi', population: 2621923, density: 193 },
  ],

  largestEconomies2023: [
    { province: 'Jakarta', shareOfGdp: 16.9 },
    { province: 'West Java', shareOfGdp: 14.8 },
    { province: 'East Java', shareOfGdp: 14.3 },
    { province: 'Central Java', shareOfGdp: 8.4 },
    { province: 'North Sumatra', shareOfGdp: 5.1 },
  ],

  // The full indicator table behind the Data tables page: search and category filter read this.
  indicators: [
    { category: 'Population', name: 'Total population (mid-year estimate)', value: '281,603,800', unit: 'people', year: 2024, source: 'BPS' },
    { category: 'Population', name: 'Population, census count', value: '270,203,917', unit: 'people', year: 2020, source: 'BPS' },
    { category: 'Population', name: 'Population density', value: '147', unit: 'people per km²', year: 2023, source: 'World Bank' },
    { category: 'Population', name: 'Urban population share', value: '58.6', unit: '% of population', year: 2023, source: 'World Bank' },
    { category: 'Population', name: 'Fertility rate', value: '2.15', unit: 'births per woman', year: 2022, source: 'World Bank' },
    { category: 'Population', name: 'Life expectancy at birth', value: '71.4', unit: 'years', year: 2023, source: 'World Bank' },
    { category: 'Population', name: 'Population on Java', value: '151.6 m', unit: '56.1% of the total', year: 2020, source: 'BPS' },
    { category: 'Population', name: 'Provinces', value: '38', unit: 'provinces', year: 2024, source: 'BPS' },
    { category: 'Population', name: 'Islands (named)', value: '17,001', unit: 'islands', year: 2022, source: 'BPS / BIG' },
    { category: 'Population', name: 'Land area', value: '1,904,569', unit: 'km²', year: 2023, source: 'BPS' },
    { category: 'Economy', name: 'GDP, current prices', value: 'US$1.396 tn', unit: 'US dollars', year: 2024, source: 'World Bank' },
    { category: 'Economy', name: 'GDP per capita', value: 'US$4,925', unit: 'US dollars', year: 2024, source: 'World Bank' },
    { category: 'Economy', name: 'GDP per capita', value: 'Rp78.6 m', unit: 'rupiah', year: 2024, source: 'BPS' },
    { category: 'Economy', name: 'Real GDP growth', value: '5.03', unit: '% year on year', year: 2024, source: 'BPS' },
    { category: 'Economy', name: 'Manufacturing share of GDP', value: '18.7', unit: '% of GDP', year: 2023, source: 'World Bank' },
    { category: 'Economy', name: 'Services share of GDP', value: '43.0', unit: '% of GDP', year: 2023, source: 'World Bank' },
    { category: 'Economy', name: 'Exports of goods', value: 'US$264.7 bn', unit: 'US dollars', year: 2024, source: 'BPS' },
    { category: 'Economy', name: 'Imports of goods', value: 'US$233.7 bn', unit: 'US dollars', year: 2024, source: 'BPS' },
    { category: 'Economy', name: 'Trade balance, goods', value: 'US$31.0 bn', unit: 'surplus', year: 2024, source: 'BPS' },
    { category: 'Economy', name: 'Gini ratio of expenditure', value: '0.379', unit: 'index, March', year: 2024, source: 'BPS' },
    { category: 'Economy', name: 'Human development index', value: '0.713', unit: 'index', year: 2022, source: 'UNDP' },
    { category: 'Prices', name: 'Inflation, December (year on year)', value: '1.57', unit: '%', year: 2024, source: 'BPS' },
    { category: 'Prices', name: 'Inflation, annual average', value: '2.09', unit: '%', year: 2024, source: 'BPS' },
    { category: 'Prices', name: 'Inflation peak of the Asian crisis, December', value: '77.63', unit: '% year on year', year: 1998, source: 'BPS' },
    { category: 'Prices', name: 'Policy interest rate (BI rate), end of year', value: '6.00', unit: '%', year: 2024, source: 'Bank Indonesia' },
    { category: 'Labour', name: 'Open unemployment rate, February', value: '4.82', unit: '% of labour force', year: 2024, source: 'BPS' },
    { category: 'Labour', name: 'Open unemployment rate, August', value: '4.91', unit: '% of labour force', year: 2024, source: 'BPS' },
    { category: 'Labour', name: 'Labour force', value: '152.11 m', unit: 'people, August', year: 2024, source: 'BPS' },
    { category: 'Labour', name: 'People in work', value: '144.64 m', unit: 'people, August', year: 2024, source: 'BPS' },
    { category: 'Labour', name: 'Labour force participation rate', value: '69.80', unit: '%, February', year: 2024, source: 'BPS' },
    { category: 'Labour', name: 'Informal employment share', value: '59.17', unit: '% of workers, February', year: 2024, source: 'BPS' },
    { category: 'Wellbeing', name: 'Poverty rate, March', value: '9.03', unit: '% of population', year: 2024, source: 'BPS' },
    { category: 'Wellbeing', name: 'People in poverty, March', value: '25.22 m', unit: 'people', year: 2024, source: 'BPS' },
    { category: 'Wellbeing', name: 'Stunting, children under five', value: '21.5', unit: '%', year: 2023, source: 'SSGI' },
    { category: 'Wellbeing', name: 'Mean years of schooling', value: '8.77', unit: 'years, age 25+', year: 2023, source: 'BPS' },
    { category: 'Wellbeing', name: 'Expected years of schooling', value: '13.15', unit: 'years', year: 2023, source: 'BPS' },
    { category: 'Wellbeing', name: 'Literacy rate, age 15 and over', value: '96.4', unit: '%', year: 2023, source: 'BPS' },
    { category: 'Wellbeing', name: 'Internet users', value: '221.6 m', unit: '79.5% penetration', year: 2024, source: 'APJII' },
    { category: 'Wellbeing', name: 'Electrification ratio', value: '99.78', unit: '% of households', year: 2023, source: 'ESDM' },
  ],
};
