// ===== SERVICES PAGE JS =====

// --- State ---
let selectedBundle = null;
let selectedServices = {};
let mode = null; // 'bundle' or 'byo'

// --- Bundle Selection ---
function selectBundle(name, price) {
  selectedBundle = { name, price };
  mode = 'bundle';

  // Reset BYO
  selectedServices = {};
  document.querySelectorAll('.byo-card.selected').forEach(c => c.classList.remove('selected'));
  document.getElementById('byo-sticky').classList.remove('visible');

  const features = {
    launch: [
      { name: 'Launch Bundle', price: 399 }
    ],
    growth: [
      { name: 'Growth Bundle', price: 999 }
    ],
    partner: [
      { name: 'Partner Bundle', price: 1499 },
      { name: 'Monthly Retainer', price: 300, recurring: true }
    ]
  };

  populateSummary(features[name], name);
}

// --- BYO Toggle ---
function toggleService(card) {
  const service = card.dataset.service;
  const price = parseInt(card.dataset.price);
  const recurring = card.dataset.recurring === 'true';

  card.classList.toggle('selected');

  if (card.classList.contains('selected')) {
    selectedServices[service] = { price, qty: 1, recurring };
  } else {
    delete selectedServices[service];
  }

  selectedBundle = null;
  mode = 'byo';

  updateTotal();
}

// --- Quantity ---
function changeQty(btn, delta) {
  const card = btn.closest('.byo-card');
  const numEl = card.querySelector('.qty-num');
  const service = card.dataset.service;
  let qty = parseInt(numEl.textContent) + delta;
  if (qty < 1) qty = 1;
  if (qty > 20) qty = 20;
  numEl.textContent = qty;
  if (selectedServices[service]) {
    selectedServices[service].qty = qty;
  }
  updateTotal();
}

// --- Running Total ---
function updateTotal() {
  let total = 0;
  let hasSelection = false;
  for (const key in selectedServices) {
    const s = selectedServices[key];
    total += s.price * s.qty;
    hasSelection = true;
  }

  const sticky = document.getElementById('byo-sticky');
  const totalEl = document.getElementById('byo-total');
  totalEl.textContent = '$' + total.toLocaleString();

  if (hasSelection) {
    sticky.classList.add('visible');
  } else {
    sticky.classList.remove('visible');
  }
}

// --- Continue from BYO ---
function continueByo() {
  const items = [];
  for (const key in selectedServices) {
    const s = selectedServices[key];
    const card = document.querySelector('[data-service="' + key + '"]');
    const name = card.querySelector('.byo-title').textContent;
    items.push({
      name: s.qty > 1 ? name + ' (\u00d7' + s.qty + ')' : name,
      price: s.price * s.qty,
      recurring: s.recurring
    });
  }
  populateSummary(items, 'custom');
}

// --- Populate Summary ---
function populateSummary(items, packageName) {
  const container = document.getElementById('summary-items');
  const totalEl = document.getElementById('summary-total-price');
  const section = document.getElementById('summary');
  const formPackage = document.getElementById('form-package');
  const formItems = document.getElementById('form-items');
  const formTotal = document.getElementById('form-total');

  container.innerHTML = '';
  let total = 0;
  let recurring = 0;

  items.forEach(function(item) {
    const div = document.createElement('div');
    div.className = 'summary-item';
    const priceText = item.recurring ? '$' + item.price + '/mo' : '$' + item.price.toLocaleString();
    div.innerHTML = '<span class="summary-item-name">' + item.name + '</span><span class="summary-item-price">' + priceText + '</span>';
    container.appendChild(div);
    if (item.recurring) {
      recurring += item.price;
    } else {
      total += item.price;
    }
  });

  let totalText = '$' + total.toLocaleString();
  if (recurring > 0) totalText += ' + $' + recurring + '/mo';
  totalEl.textContent = totalText;

  formPackage.value = packageName;
  formItems.value = items.map(function(i) { return i.name; }).join(', ');
  formTotal.value = totalText;

  section.style.display = 'block';
  setTimeout(function() {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// --- Form Submit ---
function submitPackage(e) {
  e.preventDefault();

  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;
  const message = document.getElementById('form-message').value;
  const pkg = document.getElementById('form-package').value;
  const items = document.getElementById('form-items').value;
  const total = document.getElementById('form-total').value;

  if (typeof gtag === 'function') {
    gtag('event', 'package_submit', {
      event_category: 'conversion',
      event_label: pkg
    });
  }

  fetch('https://formspree.io/f/xzdkajvg', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, email: email, message: message, package: pkg, items: items, total: total })
  }).then(function() {
    window.open('https://calendly.com/jozo-cancar27/30min', '_blank');
    document.getElementById('package-form').innerHTML = '<p style="color:var(--yellow);font-family:Barlow Condensed,sans-serif;font-size:16px;letter-spacing:1px;text-transform:uppercase;text-align:center;padding:40px 0;">\u2713 Info saved \u2014 Calendly should be opening now.</p>';
  }).catch(function() {
    window.open('https://calendly.com/jozo-cancar27/30min', '_blank');
  });

  return false;
}
