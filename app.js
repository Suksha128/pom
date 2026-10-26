/**
 * KAVERI HERITAGE FOODS
 * Artisanal Sweets & Savories E-Commerce & Operations Dashboard
 * app.js — State management, UI, Cart, View routing & Category Filtering
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════
   1. PRODUCT DATA (Aligned with Figma & Artisanal Catalog)
══════════════════════════════════════════════════════════════════ */
const PRODUCTS = [
  {
    id: 1,
    name: 'Thanjavur Ashoka Halwa',
    subname: 'Moong Dal & Ghee Halwa',
    category: 'heritage',
    image: 'images/ashoka-halwa.jpg',
    emoji: '🍮',
    tag: 'bestseller',
    tagLabel: 'Thanjavur Special',
    weight: '350g · Clay Handi',
    price: 360,
    description:
      'The crown jewel of Thanjavur confectionery. Roasted yellow moong dal slow-simmered with pure village cow ghee, fragrant cardamom, and toasted cashews, served in traditional celebratory style.',
    ingredients: ['Moong Dal', 'Pure Desi Ghee', 'Cane Sugar', 'Kaju (Cashews)', 'Green Cardamom'],
    bgGrad: 'linear-gradient(135deg, #B52A2A 0%, #D45B34 50%, #E89A5A 100%)',
  },
  {
    id: 2,
    name: 'Traditional Handmade Murukku',
    subname: 'Thenkuzhal Murukku',
    category: 'savories',
    image: 'images/murukku.jpg',
    emoji: '🥨',
    tag: 'heritage',
    tagLabel: 'Artisanal Savory',
    weight: '300g · Pack of 10',
    price: 240,
    description:
      'Crunchy, spiral-shaped savory snacks extruded by hand using stone-ground raw rice flour, urad dal, cumin, and white sesame seeds. Fried in cold-pressed groundnut oil to golden perfection.',
    ingredients: ['Raw Rice Flour', 'Urad Dal', 'Sesame Seeds', 'Asafoetida', 'Cold-Pressed Oil'],
    bgGrad: 'linear-gradient(135deg, #A67C1E 0%, #C9A84C 50%, #E6C875 100%)',
  },
  {
    id: 3,
    name: 'Heritage Sesame Oil Mango Pickle',
    subname: 'Maavadu / Avakaya Style',
    category: 'savories',
    image: 'images/sesame-pickle.jpg',
    emoji: '🥭',
    tag: 'bestseller',
    tagLabel: 'Grandmother Recipe',
    weight: '400g · Ceramic Jar',
    price: 290,
    description:
      'Tender baby mangoes steeped in wood-pressed Chekku Gingelly (sesame) oil, hand-pounded red chillies, fenugreek, and sea salt. Naturally sun-cured with zero chemical preservatives.',
    ingredients: ['Farm Mangoes', 'Wood-Pressed Sesame Oil', 'Guntur Chilli', 'Mustard', 'Fenugreek'],
    bgGrad: 'linear-gradient(135deg, #8A1E1E 0%, #C43A2A 50%, #E0652B 100%)',
  },
  {
    id: 4,
    name: 'Organic Palm Jaggery Sweets',
    subname: 'Karupatti Halwa & Mittai',
    category: 'heritage',
    image: 'images/palm-jaggery.jpg',
    emoji: '🍯',
    tag: 'heritage',
    tagLabel: '100% Karupatti',
    weight: '300g · 15 pieces',
    price: 420,
    description:
      'Nutrient-dense native palm jaggery (Karupatti) reduced over wood flames with roasted cashews and aromatic dry ginger. Rich, earthy sweetness with deep therapeutic heritage values.',
    ingredients: ['Native Palm Jaggery', 'Pure Ghee', 'Dry Ginger (Sukku)', 'Cardamom', 'Cashews'],
    bgGrad: 'linear-gradient(135deg, #3B1E08 0%, #5C3215 50%, #8B5A3C 100%)',
  },
  {
    id: 5,
    name: 'Handmade Cardamom Pistachio Fudge',
    subname: 'Kesar Pista Burfi',
    category: 'sweets',
    image: 'images/cardamom-burfi.jpg',
    emoji: '💚',
    tag: 'bestseller',
    tagLabel: 'Best Seller',
    weight: '250g · 16 pieces',
    price: 480,
    description:
      'Slow-cooked whole milk mawa fudge generously infused with freshly crushed Idukki green cardamom and topped with toasted California pistachios. Melts gracefully on the palate.',
    ingredients: ['Fresh Mawa (Khoya)', 'Pistachios', 'Idukki Cardamom', 'Organic Sugar', 'Silver Vark'],
    bgGrad: 'linear-gradient(135deg, #3A6B35 0%, #5E9B54 50%, #A8D89A 100%)',
  },
  {
    id: 6,
    name: 'Traditional Jaggery Coconut Crunch',
    subname: 'Thengai Burfi / Chikki',
    category: 'sweets',
    image: 'images/coconut-crunch.jpg',
    emoji: '🥥',
    tag: '',
    tagLabel: '',
    weight: '300g · 20 pieces',
    price: 320,
    description:
      'Freshly grated Pollachi coconuts slow-roasted in unrefined organic sugarcane jaggery with crushed tellicherry black pepper and cardamom. Crispy outer texture with a rich, chewy core.',
    ingredients: ['Pollachi Coconut', 'Organic Jaggery', 'Crushed Pepper', 'Cardamom', 'Desi Ghee'],
    bgGrad: 'linear-gradient(135deg, #5C3D0A 0%, #A0721E 50%, #D4AF37 100%)',
  },
  {
    id: 7,
    name: 'Royal Ghee Mysore Pak',
    subname: 'Traditional Soft Ghee Sweet',
    category: 'sweets',
    image: 'images/mysore-pak.jpg',
    emoji: '🧈',
    tag: 'heritage',
    tagLabel: 'Royal Recipe',
    weight: '350g · 12 blocks',
    price: 450,
    description:
      'The authentic melt-in-the-mouth Mysore confection crafted from slow-roasted besan (gram flour), bubbling hot country ghee, and pure sugar syrup. Rich, golden, and deeply satisfying.',
    ingredients: ['Gram Flour (Besan)', 'Village Cow Ghee', 'Cane Sugar', 'Cardamom Essence'],
    bgGrad: 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #F5DE98 100%)',
  },
  {
    id: 8,
    name: 'Small-Batch Dark Chocolate Sea Salt Truffles',
    subname: 'Single-Origin 70% Cacao',
    category: 'sweets',
    image: 'images/chocolate-truffles.jpg',
    emoji: '🍫',
    tag: 'new',
    tagLabel: 'Artisan Batch',
    weight: '200g · 12 truffles',
    price: 650,
    description:
      'Single-origin 70% Anamalai cacao ganache hand-rolled in Dutch alkalized cocoa powder and finished with a flake of Himalayan mineral pink salt. Sophisticated contrast of dark and savory.',
    ingredients: ['70% Anamalai Cacao', 'Fresh Milk Cream', 'Himalayan Pink Salt', 'Cocoa Powder'],
    bgGrad: 'linear-gradient(135deg, #2C1608 0%, #6B3A2A 50%, #C4652B 100%)',
  },
  {
    id: 9,
    name: 'Rose Petal & Almond Infused Pralines',
    subname: 'Heirloom Gulkand Crunch',
    category: 'sweets',
    image: 'images/rose-pralines.jpg',
    emoji: '🌸',
    tag: 'seasonal',
    tagLabel: 'Seasonal Craft',
    weight: '180g · 10 pieces',
    price: 560,
    description:
      'Caramelised golden almonds folded with hand-dried organic Damask rose petals and a touch of wild honey gulkand. Delicate floral aroma coupled with a delightful brittle snap.',
    ingredients: ['California Almonds', 'Organic Damask Rose Petals', 'Wild Honey Gulkand', 'Cane Sugar'],
    bgGrad: 'linear-gradient(135deg, #8B1A4A 0%, #C42B7A 50%, #F4A0C0 100%)',
  },
];

/* ═══════════════════════════════════════════════════════════════
   2. STATE MANAGEMENT
══════════════════════════════════════════════════════════════════ */
const STATE = {
  cart: [],
  currentView: 'storefront',
  cartOpen: false,
  orderCount: 0,
  activeCategory: 'all',
};

function saveCart() {
  try { localStorage.setItem('khf_cart', JSON.stringify(STATE.cart)); } catch (_) {}
}

function loadCart() {
  try {
    const raw = localStorage.getItem('khf_cart');
    if (raw) STATE.cart = JSON.parse(raw);
  } catch (_) { STATE.cart = []; }
}

function loadOrderCount() {
  try {
    STATE.orderCount = parseInt(localStorage.getItem('khf_orders') || '0', 10);
  } catch (_) {}
}

function saveOrderCount() {
  try { localStorage.setItem('khf_orders', String(STATE.orderCount)); } catch (_) {}
}

/* ═══════════════════════════════════════════════════════════════
   3. CART OPERATIONS
══════════════════════════════════════════════════════════════════ */
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = STATE.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    STATE.cart.push({
      id: product.id,
      name: product.name,
      image: product.image,
      emoji: product.emoji,
      price: product.price,
      weight: product.weight,
      qty: 1
    });
  }
  saveCart();
  updateCartUI();
  animateCartBadge();
  showAddedFeedback(productId);
}

function removeFromCart(productId) {
  STATE.cart = STATE.cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function updateQty(productId, delta) {
  const item = STATE.cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();
  updateCartUI();
}

function clearCart() {
  STATE.cart = [];
  saveCart();
  updateCartUI();
}

function getCartTotal() {
  return STATE.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartItemCount() {
  return STATE.cart.reduce((sum, item) => sum + item.qty, 0);
}

/* ═══════════════════════════════════════════════════════════════
   4. CART UI RENDERING
══════════════════════════════════════════════════════════════════ */
function updateCartUI() {
  const count = getCartItemCount();
  const total = getCartTotal();

  // Badge
  const badge = document.getElementById('cart-count');
  const headerCount = document.getElementById('cart-header-count');
  if (badge) { badge.textContent = count; badge.style.display = count > 0 ? 'flex' : 'none'; }
  if (headerCount) headerCount.textContent = count;

  // Subtotal
  const subtotalEl = document.getElementById('cart-subtotal');
  if (subtotalEl) subtotalEl.textContent = `₹${total.toFixed(2)}`;

  // Empty state
  const emptyEl = document.getElementById('cart-empty');
  const listEl = document.getElementById('cart-items-list');
  const footerEl = document.getElementById('cart-footer');

  if (STATE.cart.length === 0) {
    if (emptyEl) emptyEl.classList.remove('hidden');
    if (listEl) listEl.innerHTML = '';
    if (footerEl) footerEl.style.display = 'none';
  } else {
    if (emptyEl) emptyEl.classList.add('hidden');
    if (footerEl) footerEl.style.display = 'block';
    renderCartItems(listEl);
  }

  // Dashboard KPI
  const kpiOrders = document.getElementById('kpi-orders');
  if (kpiOrders) kpiOrders.textContent = STATE.orderCount;
}

function renderCartItems(listEl) {
  if (!listEl) return;
  listEl.innerHTML = '';
  STATE.cart.forEach(item => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.setAttribute('role', 'listitem');
    li.dataset.id = item.id;
    li.innerHTML = `
      <div class="cart-item-img-wrap">
        <img src="${item.image || ''}" alt="${escapeHTML(item.name)}" class="cart-item-thumb" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
        <span class="cart-item-emoji-fallback" style="display:none;">${item.emoji}</span>
      </div>
      <div class="cart-item-info">
        <p class="cart-item-name" title="${escapeHTML(item.name)}">${escapeHTML(item.name)}</p>
        <p class="cart-item-price">₹${item.price.toFixed(2)} × ${item.qty} = <strong>₹${(item.price * item.qty).toFixed(2)}</strong></p>
      </div>
      <div class="cart-item-controls">
        <div class="qty-control" role="group" aria-label="Quantity control for ${escapeHTML(item.name)}">
          <button class="qty-btn" aria-label="Decrease quantity" data-action="decrease" data-id="${item.id}">−</button>
          <span class="qty-num" aria-live="polite">${item.qty}</span>
          <button class="qty-btn" aria-label="Increase quantity" data-action="increase" data-id="${item.id}">+</button>
        </div>
        <button class="remove-btn" aria-label="Remove ${escapeHTML(item.name)} from cart" data-action="remove" data-id="${item.id}">Remove</button>
      </div>
    `;
    listEl.appendChild(li);
  });
}

/* ═══════════════════════════════════════════════════════════════
   5. PRODUCT CATALOG & FILTERING
══════════════════════════════════════════════════════════════════ */
function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const filtered = STATE.activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === STATE.activeCategory);

  grid.innerHTML = '';
  filtered.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('role', 'listitem');
    card.dataset.id = product.id;

    const tagHTML = product.tag
      ? `<span class="product-tag ${product.tag}">${escapeHTML(product.tagLabel)}</span>`
      : '';

    const ingredientsHTML = product.ingredients
      .map(ing => `<span class="ing-chip">${escapeHTML(ing)}</span>`)
      .join('');

    card.innerHTML = `
      <div class="product-image" style="background: ${product.bgGrad};">
        ${tagHTML}
        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
          class="product-img"
          loading="lazy"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
        />
        <div class="product-emoji" style="display:none;" role="img" aria-label="${escapeHTML(product.name)}">${product.emoji}</div>
      </div>
      <div class="product-info">
        <h3 class="product-name">${escapeHTML(product.name)}</h3>
        <p class="product-weight">${escapeHTML(product.subname)} · ${escapeHTML(product.weight)}</p>
        <p class="product-desc">${escapeHTML(product.description)}</p>
        <div class="product-ingredients" aria-label="Key ingredients">${ingredientsHTML}</div>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-current">₹${product.price}</span>
            <span class="price-per">${escapeHTML(product.weight)}</span>
          </div>
          <button
            class="add-to-cart-btn"
            id="atc-${product.id}"
            aria-label="Add ${escapeHTML(product.name)} to cart"
            data-product-id="${product.id}"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function setCategoryFilter(category) {
  STATE.activeCategory = category;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
  renderProducts();
}

/* ═══════════════════════════════════════════════════════════════
   6. VIEW ROUTING
══════════════════════════════════════════════════════════════════ */
function switchView(viewName) {
  const storefront = document.getElementById('view-storefront');
  const dashboard = document.getElementById('view-dashboard');
  const navLinks = document.querySelectorAll('.nav-link, .mob-link');

  if (viewName === 'dashboard') {
    if (storefront) storefront.style.display = 'none';
    if (dashboard) dashboard.style.display = 'block';
    STATE.currentView = 'dashboard';
    updateDashboardClock();
    updateDashboardKPI();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    if (storefront) storefront.style.display = 'block';
    if (dashboard) dashboard.style.display = 'none';
    STATE.currentView = 'storefront';
  }

  navLinks.forEach(link => {
    const lv = link.dataset.view;
    link.classList.toggle('active', lv === viewName);
  });
}

/* ═══════════════════════════════════════════════════════════════
   7. CART DRAWER OPEN/CLOSE
══════════════════════════════════════════════════════════════════ */
function openCart() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.add('open');
    STATE.cartOpen = true;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const closeBtn = document.getElementById('close-cart');
      if (closeBtn) closeBtn.focus();
    }, 100);
  }
}

function closeCart() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.remove('open');
    STATE.cartOpen = false;
    document.body.style.overflow = '';
    const toggle = document.getElementById('cart-toggle');
    if (toggle) toggle.focus();
  }
}

/* ═══════════════════════════════════════════════════════════════
   8. CHECKOUT / SUCCESS MODAL
══════════════════════════════════════════════════════════════════ */
function checkout() {
  if (STATE.cart.length === 0) return;

  const details = STATE.cart.map(item =>
    `<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid #EDD9B5;">
      <div style="display:flex;align-items:center;gap:8px;">
        <img src="${item.image}" alt="" style="width:32px;height:32px;border-radius:4px;object-fit:cover;" onerror="this.style.display='none'" />
        <span>${escapeHTML(item.name)} × ${item.qty}</span>
      </div>
      <strong>₹${(item.price * item.qty).toFixed(2)}</strong>
    </div>`
  ).join('');

  const total = getCartTotal();
  const orderId = 'KHF-' + Date.now().toString(36).toUpperCase();

  const detailsEl = document.getElementById('modal-order-details');
  if (detailsEl) {
    detailsEl.innerHTML = `
      <p style="font-weight:700;color:#3B1E08;margin-bottom:8px;font-family:'Playfair Display',serif;">
        Order #${orderId}
      </p>
      ${details}
      <div style="display:flex;justify-content:space-between;padding:10px 0 0;font-weight:700;font-size:1.05rem;color:#3B1E08;">
        <span>Total Amount</span><span style="color:#C9A84C;">₹${total.toFixed(2)}</span>
      </div>
    `;
  }

  const backdrop = document.getElementById('success-backdrop');
  if (backdrop) {
    backdrop.style.display = 'flex';
    backdrop.setAttribute('aria-hidden', 'false');
    const closeModal = document.getElementById('modal-close');
    if (closeModal) setTimeout(() => closeModal.focus(), 100);
  }

  STATE.orderCount += 1;
  saveOrderCount();
  updateDashboardKPI();

  closeCart();
  clearCart();
}

function closeModal() {
  const backdrop = document.getElementById('success-backdrop');
  if (backdrop) {
    backdrop.style.display = 'none';
    backdrop.setAttribute('aria-hidden', 'true');
  }
}

/* ═══════════════════════════════════════════════════════════════
   9. DASHBOARD UTILITIES
══════════════════════════════════════════════════════════════════ */
function updateDashboardClock() {
  const el = document.getElementById('dash-time');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) +
    ' IST · ' + now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function updateDashboardKPI() {
  const el = document.getElementById('kpi-orders');
  if (el) el.textContent = STATE.orderCount;
}

function animateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (!badge) return;
  badge.classList.remove('bump');
  void badge.offsetWidth;
  badge.classList.add('bump');
}

function showAddedFeedback(productId) {
  const btn = document.getElementById(`atc-${productId}`);
  if (!btn) return;
  const original = btn.innerHTML;
  btn.innerHTML = `<span>✓</span> Added!`;
  btn.classList.add('added');
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.classList.remove('added');
    btn.disabled = false;
  }, 1500);
}

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    const headerH = document.getElementById('site-header')?.offsetHeight || 80;
    const top = el.getBoundingClientRect().top + window.scrollY - headerH - 20;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function initScrollEffect() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 4px 20px rgba(59,30,8,0.18)';
    } else {
      header.style.boxShadow = '0 2px 8px rgba(59,30,8,0.08)';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initAnimations() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  setTimeout(() => {
    document.querySelectorAll('.product-card, .craft-card, .kpi-card, .flow-step, .mfr-card')
      .forEach(el => observer.observe(el));
  }, 100);
}

/* ═══════════════════════════════════════════════════════════════
   10. EVENT DELEGATION & BINDING
══════════════════════════════════════════════════════════════════ */
function bindEvents() {
  // Add to cart delegation
  const grid = document.getElementById('product-grid');
  if (grid) {
    grid.addEventListener('click', e => {
      const btn = e.target.closest('[data-product-id]');
      if (btn) addToCart(parseInt(btn.dataset.productId, 10));
    });
  }

  // Category filter clicks
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setCategoryFilter(btn.dataset.category);
    });
  });

  // Cart open / close
  document.getElementById('cart-toggle')?.addEventListener('click', openCart);
  document.getElementById('close-cart')?.addEventListener('click', closeCart);
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);

  // Cart item qty & remove
  document.getElementById('cart-items-list')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = parseInt(btn.dataset.id, 10);
    switch (btn.dataset.action) {
      case 'increase': updateQty(id, +1); break;
      case 'decrease': updateQty(id, -1); break;
      case 'remove':   removeFromCart(id); break;
    }
  });

  // Checkout
  document.getElementById('checkout-btn')?.addEventListener('click', checkout);
  document.getElementById('clear-cart')?.addEventListener('click', () => {
    if (STATE.cart.length === 0) return;
    if (window.confirm('Clear all items from your cart?')) clearCart();
  });

  // Modal
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('success-backdrop')?.addEventListener('click', e => {
    if (e.target === document.getElementById('success-backdrop')) closeModal();
  });

  // Navigation clicks
  document.querySelectorAll('[data-view]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const view = el.dataset.view;
      const scroll = el.dataset.scroll;

      if (STATE.currentView !== 'storefront' && view === 'storefront') {
        switchView('storefront');
        if (scroll) setTimeout(() => scrollToSection(scroll), 100);
      } else if (view === 'dashboard') {
        switchView('dashboard');
      } else if (view === 'storefront') {
        if (scroll) scrollToSection(scroll);
      }

      closeMobileNav();
    });
  });

  // Scroll triggers
  document.querySelectorAll('[data-scroll]').forEach(btn => {
    if (!btn.dataset.view) {
      btn.addEventListener('click', () => scrollToSection(btn.dataset.scroll));
    }
  });

  // Dashboard back button
  document.getElementById('back-to-store')?.addEventListener('click', () => switchView('storefront'));

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  hamburger?.addEventListener('click', toggleMobileNav);

  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (STATE.cartOpen) closeCart();
      const backdrop = document.getElementById('success-backdrop');
      if (backdrop && backdrop.style.display !== 'none') closeModal();
    }
  });
}

function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  const hamburger = document.getElementById('hamburger');
  if (!nav) return;
  const isOpen = nav.classList.toggle('open');
  hamburger?.classList.toggle('open', isOpen);
  hamburger?.setAttribute('aria-expanded', String(isOpen));
  nav.setAttribute('aria-hidden', String(!isOpen));
}

function closeMobileNav() {
  const nav = document.getElementById('mobile-nav');
  const hamburger = document.getElementById('hamburger');
  if (!nav) return;
  nav.classList.remove('open');
  hamburger?.classList.remove('open');
  hamburger?.setAttribute('aria-expanded', 'false');
  nav.setAttribute('aria-hidden', 'true');
}

function startDashboardClock() {
  setInterval(() => {
    if (STATE.currentView === 'dashboard') updateDashboardClock();
  }, 60000);
}

/* ═══════════════════════════════════════════════════════════════
   11. INITIALIZATION
══════════════════════════════════════════════════════════════════ */
function init() {
  loadCart();
  loadOrderCount();
  renderProducts();
  updateCartUI();
  bindEvents();
  initScrollEffect();
  initAnimations();
  startDashboardClock();
  switchView('storefront');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
