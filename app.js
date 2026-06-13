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
      rows: [
        ['0', '8.0', '50.265', '0.200', '0.557'],
        ['1', '7.5', '44.179', '0.188', '0.633'],
        ['2', '7.0', '38.485', '0.175', '0.727'],
        ['2', '6.5', '33.183', '0.163', '0.843'],
        ['3', '6.0', '28.274', '0.150', '0.990'],
        ['4', '5.5', '23.758', '0.138', '1.178'],
        ['4', '5.0', '19.635', '0.125', '1.425'],
        ['5', '4.5', '15.904', '0.113', '1.760'],
        ['6', '4.0', '12.566', '0.100', '2.227'],
        ['7', '3.5', '9.6211', '0.088', '2.909'],
        ['9', '3.0', '7.0686', '0.075', '3.959'],
        ['10', '2.5', '4.9087', '0.063', '5.701'],
        ['12', '2.0', '3.1416', '0.050', '8.909'],
        ['13', '1.9', '2.8353', '0.048', '9.871'],
        ['13', '1.8', '2.5447', '0.045', '11.00'],
        ['14', '1.7', '2.2698', '0.043', '12.33'],
        ['14', '1.6', '2.0106', '0.040', '13.92'],
        ['15', '1.5', '1.7671', '0.038', '15.84'],
        ['15', '1.4', '1.5394', '0.035', '18.18'],
        ['16', '1.3', '1.3273', '0.033', '21.09'],
        ['17', '1.2', '1.1310', '0.030', '24.75'],
        ['17', '1.1', '0.9503', '0.028', '29.45'],
        ['18', '1.0', '0.7854', '0.025', '35.63'],
        ['19', '0.9', '0.6362', '0.023', '43.99'],
        ['20', '0.8', '0.5027', '0.020', '55.68'],
        ['21', '0.7', '0.3848', '0.018', '72.72'],
        ['23', '0.6', '0.2827', '0.015', '98.98'],
        ['24', '0.5', '0.1963', '0.013', '142.5'],
        ['26', '0.4', '0.1257', '0.010', '222.7'],
        ['29', '0.3', '0.0707', '0.008', '395.9'],
        ['32', '0.2', '0.0314', '0.005', '890.9'],
        ['38', '0.1', '0.0079', '0.003', '3,563'],
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
  if (!hero) {
    return;
  }

  const rect = hero.getBoundingClientRect();
  const x = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
  const y = clamp(((clientY - rect.top) / rect.height) * 100, 0, 100);
  const rotation = ((x - 50) * 0.04) + ((y - 50) * 0.02);

  root.style.setProperty('--pointer-x', `${x}%`);
  root.style.setProperty('--pointer-y', `${y}%`);
  root.style.setProperty('--pointer-rot', rotation.toFixed(2));
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
  root.style.setProperty('--pointer-rot', '0');
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
  root.style.setProperty('--pointer-rot', '0');
}
