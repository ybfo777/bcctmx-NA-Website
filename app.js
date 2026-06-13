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
        ['8.0 mm', '50.265 mm²', '0.200 mm', '166.88 kg/km', '0.557 Ω/km'],
        ['4.0 mm', '12.566 mm²', '0.100 mm', '41.720 kg/km', '2.227 Ω/km'],
        ['2.0 mm', '3.1416 mm²', '0.050 mm', '10.430 kg/km', '8.909 Ω/km'],
        ['1.0 mm', '0.7854 mm²', '0.025 mm', '2.6075 kg/km', '35.63 Ω/km'],
        ['0.4 mm', '0.1257 mm²', '0.010 mm', '0.4172 kg/km', '222.7 Ω/km'],
      ],
    },
    imperial: {
      headers: [
        'Diameter (in)',
        'Cross Sectional Area (in²)',
        'Nominal Copper Thickness (mil)',
        'Weight (lb/1000 ft)',
        'Max DC Resistance (Ω/1000 ft)',
      ],
      rows: [
        ['0.315 in', '0.0778 in²', '7.87 mil', '112.08 lb/1000 ft', '0.170 Ω/1000 ft'],
        ['0.157 in', '0.0195 in²', '3.94 mil', '27.99 lb/1000 ft', '0.679 Ω/1000 ft'],
        ['0.079 in', '0.0049 in²', '1.97 mil', '7.01 lb/1000 ft', '2.712 Ω/1000 ft'],
        ['0.039 in', '0.0012 in²', '0.98 mil', '1.75 lb/1000 ft', '10.85 Ω/1000 ft'],
        ['0.016 in', '0.0002 in²', '0.39 mil', '0.28 lb/1000 ft', '67.93 Ω/1000 ft'],
      ],
    },
  },
  ccs: {
    metric: {
      headers: [
        'AWG',
        'Diameter (mm)',
        'Nominal Copper Thickness (mm)',
        'Weight (kg/km)',
        'Nominal DC Resistance (Ω/km)',
        'ASTM Break Load (kgf)',
      ],
      rows: [
        ['0', '8.25 mm', '0.2476 mm', '427.2 kg/km', '1.535 Ω/km', '--'],
        ['4', '5.19 mm', '0.1557 mm', '168.9 kg/km', '3.882 Ω/km', '721 kgf'],
        ['8', '3.26 mm', '0.0979 mm', '66.82 kg/km', '9.812 Ω/km', '285 kgf'],
        ['12', '2.05 mm', '0.0616 mm', '26.42 kg/km', '24.82 Ω/km', '114 kgf'],
        ['20', '0.81 mm', '0.0244 mm', '4.144 kg/km', '158.2 Ω/km', '18 kgf'],
      ],
    },
    imperial: {
      headers: [
        'AWG',
        'Diameter (in)',
        'Nominal Copper Thickness (mil)',
        'Weight (lb/1000 ft)',
        'Nominal DC Resistance (Ω/1000 ft)',
        'ASTM Break Load (lbf)',
      ],
      rows: [
        ['0', '0.325 in', '9.75 mil', '287.00 lb/1000 ft', '0.468 Ω/1000 ft', '--'],
        ['4', '0.204 in', '6.13 mil', '113.35 lb/1000 ft', '1.183 Ω/1000 ft', '1,589 lbf'],
        ['8', '0.128 in', '3.85 mil', '44.80 lb/1000 ft', '2.993 Ω/1000 ft', '628 lbf'],
        ['12', '0.081 in', '2.42 mil', '17.72 lb/1000 ft', '7.564 Ω/1000 ft', '251 lbf'],
        ['20', '0.032 in', '0.96 mil', '2.78 lb/1000 ft', '48.17 Ω/1000 ft', '40 lbf'],
      ],
    },
  },
};

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

  const dataset = referenceData[target]?.[unit];
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

setUnitMode('cca', 'metric');
setUnitMode('ccs', 'metric');

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
