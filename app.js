const root = document.documentElement;
const hero = document.querySelector('.hero');
const unitToggleButtons = document.querySelectorAll('[data-unit-toggle]');
const referenceTables = document.querySelectorAll('[data-reference-table]');

const referenceData = {
  cca: {
    metric: {
      headers: [
        'AWG',
        'Diameter (mm)',
        'Cross Sectional Area (mm²)',
        'Nominal Copper Thickness (mm)',
        'Max DC Resistance (Ω/km)',
      ],
      // Geometry = official AWG (shared with the CCS table).
      // Nominal copper thickness = 2.5% of diameter.
      // Max DC resistance = 26.566 / area (Ω/km): CCA with 10% copper by volume,
      //   parallel conduction of Cu (100% IACS) + Al core (61% IACS) => 64.9% IACS,
      //   rho_eff = 0.017241 / 0.649 = 0.026566 ohm*mm^2/m.
      rows: [
        ['0',  '8.25', '53.49', '0.206', '0.497'],
        ['1',  '7.35', '42.41', '0.184', '0.626'],
        ['2',  '6.54', '33.62', '0.164', '0.790'],
        ['3',  '5.83', '26.67', '0.146', '0.996'],
        ['4',  '5.19', '21.15', '0.130', '1.256'],
        ['5',  '4.62', '16.77', '0.116', '1.584'],
        ['6',  '4.11', '13.30', '0.103', '1.997'],
        ['7',  '3.67', '10.55', '0.092', '2.518'],
        ['8',  '3.26', '8.37', '0.082', '3.174'],
        ['9',  '2.91', '6.63', '0.073', '4.007'],
        ['10', '2.59', '5.26', '0.065', '5.051'],
        ['11', '2.30', '4.17', '0.058', '6.371'],
        ['12', '2.05', '3.31', '0.051', '8.026'],
        ['13', '1.83', '2.63', '0.046', '10.10'],
        ['14', '1.63', '2.08', '0.041', '12.77'],
        ['15', '1.45', '1.65', '0.036', '16.10'],
        ['16', '1.29', '1.31', '0.032', '20.28'],
        ['17', '1.15', '1.04', '0.029', '25.54'],
        ['18', '1.02', '0.823', '0.026', '32.28'],
        ['19', '0.91', '0.653', '0.023', '40.68'],
        ['20', '0.81', '0.519', '0.020', '51.19'],
        ['21', '0.72', '0.412', '0.018', '64.48'],
        ['22', '0.64', '0.324', '0.016', '81.99'],
        ['23', '0.57', '0.259', '0.014', '102.6'],
        ['24', '0.51', '0.205', '0.013', '129.6'],
        ['25', '0.45', '0.162', '0.011', '164.0'],
        ['26', '0.40', '0.129', '0.010', '205.9'],
        ['27', '0.36', '0.102', '0.009', '260.5'],
      ],
    },
  },
  ccs: {
    metric: {
      headers: [
        'AWG',
        'Diameter (mm)',
        'Section Area (mm²)',
        'Tensile Strength 40HS (MPa)',
        'Minimum Elongation 40HS (%)',
        'Nominal DC Resistance (Ω/km)',
      ],
      rows: [
        ['0',  '8.25', '53.49', '849', '—', '1.535'],
        ['1',  '7.35', '42.41', '849', '—', '1.936'],
        ['2',  '6.54', '33.62', '849', '—', '2.442'],
        ['3',  '5.83', '26.67', '918', '—', '3.079'],
        ['4',  '5.19', '21.15', '956', '—', '3.882'],
        ['5',  '4.62', '16.77', '956', '—', '4.897'],
        ['6',  '4.11', '13.30', '956', '—', '6.174'],
        ['7',  '3.67', '10.55', '956', '—', '7.781'],
        ['8',  '3.26', '8.37', '875', '1.0', '9.812'],
        ['9',  '2.91', '6.63', '918', '—', '12.38'],
        ['10', '2.59', '5.26', '956', '1.0', '15.60'],
        ['11', '2.30', '4.17', '875', '1.0', '19.70'],
        ['12', '2.05', '3.31', '956', '1.0', '24.82'],
        ['13', '1.83', '2.63', '875', '1.5', '31.26'],
        ['14', '1.63', '2.08', '875', '1.5', '39.43'],
        ['15', '1.45', '1.65', '875', '1.5', '49.70'],
        ['16', '1.29', '1.31', '875', '1.5', '62.79'],
        ['17', '1.15', '1.04', '875', '1.5', '78.96'],
        ['18', '1.02', '0.823', '875', '1.0', '99.76'],
        ['19', '0.91', '0.653', '875', '1.0', '125.7'],
        ['20', '0.81', '0.519', '875', '1.0', '158.2'],
        ['21', '0.72', '0.412', '875', '1.0', '199.5'],
        ['22', '0.64', '0.324', '875', '1.0', '253.1'],
        ['23', '0.57', '0.259', '875', '1.0', '317.2'],
        ['24', '0.51', '0.205', '875', '1.0', '401.0'],
        ['25', '0.45', '0.162', '875', '1.0', '505.7'],
        ['26', '0.40', '0.129', '875', '1.0', '637.6'],
        ['27', '0.36', '0.102', '875', '1.0', '804.0'],
      ],
    },
  },
};

function f(n, digits) {
  // Format to `digits` significant figures, stripping trailing zeros
  return parseFloat(n.toPrecision(digits)).toString();
}

function ccaImperial() {
  const metricRows = referenceData.cca.metric.rows;
  return {
    headers: [
      'AWG',
      'Diameter (in)',
      'Cross Sectional Area (in²)',
      'Nominal Copper Thickness (mil)',
      'Max DC Resistance (Ω/1000 ft)',
    ],
    rows: metricRows.map(([awg, dia, area, thick, res]) => [
      awg,
      f(parseFloat(dia) / 25.4, 4),
      f(parseFloat(area) / 645.16, 4),
      f(parseFloat(thick) * 39.3701, 4),
      f(parseFloat(res) * 0.3048, 4),
    ]),
  };
}

function ccsImperial() {
  const metricRows = referenceData.ccs.metric.rows;
  return {
    headers: [
      'AWG',
      'Diameter (in)',
      'Section Area (in²)',
      'Tensile Strength 40HS (psi)',
      'Min. Elongation 40HS (%)',
      'Nominal DC Resistance (Ω/1000 ft)',
    ],
    rows: metricRows.map(([awg, dia, area, strength, elong, res]) => [
      awg,
      f(parseFloat(dia) / 25.4, 4),
      f(parseFloat(area) / 645.16, 4),
      strength === '—' ? '—' : String(Math.round(parseFloat(strength) * 145.038)),
      elong,
      f(parseFloat(res) * 0.3048, 4),
    ]),
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function updatePointerVars(clientX, clientY) {
  const x = clamp((clientX / window.innerWidth) * 100, 0, 100);
  const y = clamp((clientY / window.innerHeight) * 100, 0, 100);

  root.style.setProperty('--pointer-x', `${x}%`);
  root.style.setProperty('--pointer-y', `${y}%`);
}

function updateScrollVar() {
  if (!hero) {
    return;
  }

  const heroHeight = hero.offsetHeight || 1;
  const progress = clamp(window.scrollY / heroHeight, 0, 1);
  root.style.setProperty('--scroll-progress', progress.toFixed(3));
}

function renderReferenceTable(target, unit) {
  const table = document.querySelector(`[data-reference-table="${target}"]`);
  const card = table?.closest('.reference-card');
  if (!table || !card) {
    return;
  }

  let dataset;
  if (unit === 'imperial') {
    dataset = target === 'cca' ? ccaImperial() : ccsImperial();
  } else {
    dataset = referenceData[target]?.metric;
  }
  if (!dataset) {
    return;
  }

  card.classList.add('is-updating');
  const headerCells = table.querySelectorAll('thead th');
  const tbody = table.querySelector('tbody');

  window.setTimeout(() => {
    headerCells.forEach((cell, index) => {
      cell.textContent = dataset.headers[index] ?? cell.textContent;
    });

    tbody.innerHTML = dataset.rows
      .map((row) => `<tr>${row.map((value) => `<td>${value}</td>`).join('')}</tr>`)
      .join('');
  }, 90);

  window.setTimeout(() => {
    card.classList.remove('is-updating');
  }, 240);
}

function setUnitMode(target, unit) {
  renderReferenceTable(target, unit);

  const button = document.querySelector(`[data-unit-toggle][data-target="${target}"]`);
  if (button) {
    const isMetric = unit === 'metric';
    button.textContent = isMetric ? 'Metric' : 'Imperial';
    button.setAttribute('aria-pressed', String(isMetric));
    button.dataset.unit = unit;
  }
}

unitToggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.target;
    const currentUnit = button.dataset.unit || 'metric';
    const nextUnit = currentUnit === 'metric' ? 'imperial' : 'metric';
    setUnitMode(target, nextUnit);
  });
});

setUnitMode('cca', 'imperial');
setUnitMode('ccs', 'imperial');

window.addEventListener('pointermove', (event) => {
  updatePointerVars(event.clientX, event.clientY);
});

window.addEventListener('scroll', updateScrollVar, { passive: true });
window.addEventListener('resize', updateScrollVar);
window.addEventListener('pointerleave', () => {
  root.style.setProperty('--pointer-x', '50%');
  root.style.setProperty('--pointer-y', '40%');
});

const rfqSubmit = document.getElementById('rfq-submit');
if (rfqSubmit) {
  rfqSubmit.addEventListener('click', () => {
    const form = rfqSubmit.closest('form');
    const get = (name) => (form.elements[name]?.value || '').trim() || '—';

    const body = [
      'Hello BC Wire Group team,',
      '',
      'Please review this RFQ and advise on pricing, lead time, and documentation availability.',
      '',
      `Product family : ${get('product')}`,
      `Diameter / AWG: ${get('diameter_awg')}`,
      `Conductivity / copper thickness target: ${get('conductivity')}`,
      `Quantity: ${get('quantity')}`,
      `Packaging: ${get('packaging')}`,
      `Destination / incoterm: ${get('destination')}`,
      `Contact information: ${get('contact_info')}`,
    ].join('\n');

    const mailto = `mailto:info@baichuanchina.com?subject=${encodeURIComponent('BC Special Wire Co., LLC RFQ – CCA/CCS wire')}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}

updateScrollVar();

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  root.style.setProperty('--scroll-progress', '0');
}
