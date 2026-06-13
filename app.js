const root = document.documentElement;
const hero = document.querySelector('.hero');
const unitToggleButtons = document.querySelectorAll('[data-unit-toggle]');
const referenceTables = document.querySelectorAll('[data-reference-table]');

const referenceData = {
  cca: {
    metric: {
      headers: [
        'Diameter (mm)',
        'Cross Sectional Area (mm²)',
        'Nominal Copper Thickness (mm)',
        'Weight (kg/km)',
        'Max DC Resistance (Ω/km)',
      ],
      rows: [
        ['8.0', '50.265', '0.200', '166.88', '0.557'],
        ['7.5', '44.179', '0.188', '146.67', '0.633'],
        ['7.0', '38.485', '0.175', '127.77', '0.727'],
        ['6.5', '33.183', '0.163', '110.17', '0.843'],
        ['6.0', '28.274', '0.150', '93.871', '0.990'],
        ['5.5', '23.758', '0.138', '78.878', '1.178'],
        ['5.0', '19.635', '0.125', '65.188', '1.425'],
        ['4.5', '15.904', '0.113', '52.802', '1.760'],
        ['4.0', '12.566', '0.100', '41.720', '2.227'],
        ['3.5', '9.6211', '0.088', '31.942', '2.909'],
        ['3.0', '7.0686', '0.075', '23.468', '3.959'],
        ['2.5', '4.9087', '0.063', '16.297', '5.701'],
        ['2.0', '3.1416', '0.050', '10.430', '8.909'],
        ['1.9', '2.8353', '0.048', '9.4132', '9.871'],
        ['1.8', '2.5447', '0.045', '8.4484', '11.00'],
        ['1.7', '2.2698', '0.043', '7.5357', '12.33'],
        ['1.6', '2.0106', '0.040', '6.6753', '13.92'],
        ['1.5', '1.7671', '0.038', '5.8669', '15.84'],
        ['1.4', '1.5394', '0.035', '5.1107', '18.18'],
        ['1.3', '1.3273', '0.033', '4.4067', '21.09'],
        ['1.2', '1.1310', '0.030', '3.7548', '24.75'],
        ['1.1', '0.9503', '0.028', '3.1551', '29.45'],
        ['1.0', '0.7854', '0.025', '2.6075', '35.63'],
        ['0.9', '0.6362', '0.023', '2.1121', '43.99'],
        ['0.8', '0.5027', '0.020', '1.6688', '55.68'],
        ['0.7', '0.3848', '0.018', '1.2777', '72.72'],
        ['0.6', '0.2827', '0.015', '0.9387', '98.98'],
        ['0.5', '0.1963', '0.013', '0.6519', '142.5'],
        ['0.4', '0.1257', '0.010', '0.4172', '222.7'],
        ['0.3', '0.0707', '0.008', '0.2347', '395.9'],
        ['0.2', '0.0314', '0.005', '0.1043', '890.9'],
        ['0.1', '0.0079', '0.003', '0.0261', '3,563'],
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
        'Weight (kg/km)',
        'Nominal DC Resistance (Ω/km)',
        'ASTM Break Load (kgf)',
      ],
      rows: [
        ['0',  '8.25', '53.49', '849', '—', '427.2', '1.535', '—'],
        ['1',  '7.35', '42.41', '849', '—', '338.7', '1.936', '—'],
        ['2',  '6.54', '33.62', '849', '—', '268.5', '2.442', '1,147'],
        ['3',  '5.83', '26.67', '918', '—', '212.9', '3.079', '909'],
        ['4',  '5.19', '21.15', '956', '—', '168.9', '3.882', '721'],
        ['5',  '4.62', '16.77', '956', '—', '133.9', '4.897', '572'],
        ['6',  '4.11', '13.30', '956', '—', '106.2', '6.174', '454'],
        ['7',  '3.67', '10.55', '956', '—', '84.26', '7.781', '360'],
        ['8',  '3.26', '8.37', '875', '1.0', '66.82', '9.812', '285'],
        ['9',  '2.91', '6.63', '918', '—', '52.96', '12.38', '226'],
        ['10', '2.59', '5.26', '956', '1.0', '42.02', '15.60', '179'],
        ['11', '2.30', '4.17', '875', '1.0', '33.29', '19.70', '144'],
        ['12', '2.05', '3.31', '956', '1.0', '26.42', '24.82', '114'],
        ['13', '1.83', '2.63', '875', '1.5', '20.98', '31.26', '91'],
        ['14', '1.63', '2.08', '875', '1.5', '16.63', '39.43', '72'],
        ['15', '1.45', '1.65', '875', '1.5', '13.19', '49.70', '57'],
        ['16', '1.29', '1.31', '875', '1.5', '10.44', '62.79', '45'],
        ['17', '1.15', '1.04', '875', '1.5', '8.304', '78.96', '36'],
        ['18', '1.02', '0.823', '875', '1.0', '6.572', '99.76', '28'],
        ['19', '0.91', '0.653', '875', '1.0', '5.215', '125.7', '23'],
        ['20', '0.81', '0.519', '875', '1.0', '4.144', '158.2', '18'],
        ['21', '0.72', '0.412', '875', '1.0', '3.287', '199.5', '14'],
        ['22', '0.64', '0.324', '875', '1.0', '2.590', '253.1', '11'],
        ['23', '0.57', '0.259', '875', '1.0', '2.067', '317.2', '9'],
        ['24', '0.51', '0.205', '875', '1.0', '1.635', '401.0', '7.1'],
        ['25', '0.45', '0.162', '875', '1.0', '1.297', '505.7', '5.6'],
        ['26', '0.40', '0.129', '875', '1.0', '1.028', '637.6', '4.4'],
        ['27', '0.36', '0.102', '875', '1.0', '0.815', '804.0', '3.5'],
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
      'Diameter (in)',
      'Cross Sectional Area (in²)',
      'Nominal Copper Thickness (mil)',
      'Weight (lb/1000 ft)',
      'Max DC Resistance (Ω/1000 ft)',
    ],
    rows: metricRows.map(([dia, area, thick, weight, res]) => [
      f(parseFloat(dia) / 25.4, 4),
      f(parseFloat(area) / 645.16, 4),
      f(parseFloat(thick) * 39.3701, 4),
      f(parseFloat(weight) * 0.671969, 4),
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
      'Weight (lb/1000 ft)',
      'Nominal DC Resistance (Ω/1000 ft)',
      'ASTM Break Load (lbf)',
    ],
    rows: metricRows.map(([awg, dia, area, strength, elong, weight, res, breakload]) => [
      awg,
      f(parseFloat(dia) / 25.4, 4),
      f(parseFloat(area) / 645.16, 4),
      strength === '—' ? '—' : String(Math.round(parseFloat(strength) * 145.038)),
      elong,
      f(parseFloat(weight) * 0.671969, 4),
      f(parseFloat(res) * 0.3048, 4),
      breakload === '—' ? '—' : String(Math.round(parseFloat(breakload) * 2.20462)),
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
      'Hello BC Conductor Technology team,',
      '',
      'Please review this RFQ and advise on pricing, lead time, and documentation availability.',
      '',
      `Product family (CCA or CCS): ${get('product')}`,
      `Diameter / AWG: ${get('diameter_awg')}`,
      `Conductivity / copper thickness target: ${get('conductivity')}`,
      `Quantity: ${get('quantity')}`,
      `Packaging: ${get('packaging')}`,
      `Destination / incoterm: ${get('destination')}`,
      `Contact information: ${get('contact_info')}`,
    ].join('\n');

    const mailto = `mailto:info@baichuanchina.com?subject=${encodeURIComponent('BC Conductor Technology RFQ – CCA/CCS wire')}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}

updateScrollVar();

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  root.style.setProperty('--scroll-progress', '0');
  root.style.setProperty('--pointer-rot', '0');
}
