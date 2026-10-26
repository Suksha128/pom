/**
 * KAVERI HERITAGE FOODS
 * Artisanal Sweets E-Commerce & Operations Dashboard
 * app.js — State management, UI, Cart, View routing
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════
   1. PRODUCT DATA
══════════════════════════════════════════════════════════════════ */
const PRODUCTS = [
  {
    id: 1,
    name: 'Handmade Cardamom Pistachio Fudge',
    subname: 'Burfi',
    emoji: '💚',
    tag: 'bestseller',
    tagLabel: 'Best Seller',
    weight: '250g · 16 pieces',
    price: 480,
    description:
      'Slow-cooked khoya fudge infused with freshly-crushed green cardamom and hand-crushed Kesar pistachios. Each square has a melt-in-your-mouth texture with a warm, spiced finish that lingers.',
    ingredients: ['Khoya', 'Pistachios', 'Cardamom', 'Organic Sugar', 'Ghee'],
    bgGrad: 'linear-gradient(135deg, #3A6B35 0%, #5E9B54 50%, #A8D89A 100%)',
  },
  {
    id: 2,
    name: 'Small-Batch Dark Chocolate Sea Salt Truffles',
    subname: 'Artisan Truffles',
    emoji: '🍫',
    tag: 'new',
    tagLabel: 'New Arrival',
    weight: '200g · 12 truffles',
    price: 650,
    description:
      'Single-origin 70% cacao ganache hand-rolled in premium Dutch cocoa powder, crowned with a single flake of Himalayan pink sea salt. An indulgent balance of bittersweet and savoury.',
    ingredients: ['Dark Cacao 70%', 'Fresh Cream', 'Himalayan Salt', 'Butter', 'Vanilla'],
    bgGrad: 'linear-gradient(135deg, #2C1608 0%, #6B3A2A 50%, #C4652B 100%)',
  },
  {
    id: 3,
    name: 'Rose Petal & Almond Infused Pralines',
    subname: 'Gulkand Pralines',
    emoji: '🌸',
    tag: 'seasonal',
    tagLabel: 'Seasonal',
    weight: '180g · 10 pieces',
    price: 560,
    description:
      'Crispy caramelised almond pralines folded with hand-dried rose petals and a whisper of gulkand (rose petal preserve). Delicately floral with a satisfying caramel crunch.',
    ingredients: ['California Almonds', 'Rose Petals', 'Gulkand', 'Cane Sugar', 'Cardamom'],
    bgGrad: 'linear-gradient(135deg, #8B1A4A 0%, #C42B7A 50%, #F4A0C0 100%)',
  },
  {
    id: 4,
    name: 'Traditional Jaggery Coconut Crunch',
    subname: 'Nariyal Chikki',
    emoji: '🥥',
    tag: '',
    tagLabel: '',
    weight: '300g · 20 pieces',
    price: 340,
    description:
      'A beloved South Indian classic: freshly-grated coconut slow-roasted with unrefined organic jaggery and a pinch of black pepper. Crunchy, chewy, and authentically rustic.',
    ingredients: ['Fresh Coconut', 'Organic Jaggery', 'Black Pepper', 'Cardamom', 'Ghee'],
    bgGrad: 'linear-gradient(135deg, #5C3D0A 0%, #A0721E 50%, #D4AF37 100%)',
  },
  {
    id: 5,
    name: 'Saffron Honey Marzipan Squares',
    subname: 'Kesar Badam Barfi',
    emoji: '⭐',
    tag: 'bestseller',
    tagLabel: 'Best Seller',
    weight: '220g · 14 pieces',
    price: 720,
    description:
      'Persian-inspired almond marzipan blended with premium Kashmiri saffron strands and raw forest honey. Luxuriously smooth, aromatic, and richly golden — a true celebration sweet.',
    ingredients: ['Kashmiri Saffron', 'Raw Almonds', 'Forest Honey', 'Rose Water', 'Cardamom'],
    bgGrad: 'linear-gradient(135deg, #B5861A 0%, #D4AF37 50%, #F0D060 100%)',
  },
  {
    id: 6,
    name: 'Tamarind Chilli Toffee Bites',
    subname: 'Imli Candy',
    emoji: '🌶️',
    tag: 'new',
    tagLabel: 'Fan Favourite',
    weight: '150g · 24 bites',
    price: 280,
    description:
      'Tangy sun-dried tamarind pulp slow-cooked with cane sugar and a bold hit of Guntur red chilli. These chewy bites deliver a rollercoaster of sweet, sour, and fiery flavours.',
    ingredients: ['Tamarind', 'Guntur Chilli', 'Cane Sugar', 'Rock Salt', 'Cumin'],
    bgGrad: 'linear-gradient(135deg, #7A1C1C 0%, #C44B2B 50%, #E88A5A 100%)',
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
};

/** Persist cart to localStorage */
function saveCart() {
  try { localStorage.setItem('khf_cart', JSON.stringify(STATE.cart)); } catch (_) {}
}

/** Load cart from localStorage */
function loadCart() {
  try {
    const raw = localStorage.getItem('khf_cart');
    if (raw) STATE.cart = JSON.parse(raw);
  } catch (_) { STATE.cart = []; }
}

/** Load order count */
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
    STATE.cart.push({ id: product.id, name: product.name, emoji: product.emoji, price: product.price, qty: 1 });
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
      <span class="cart-item-emoji" aria-hidden="true">${item.emoji}</span>
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
   5. PRODUCT CATALOG RENDERING
══════════════════════════════════════════════════════════════════ */
function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  grid.innerHTML = '';
  PRODUCTS.forEach(product => {
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
        <div class="product-emoji" role="img" aria-label="${escapeHTML(product.name)} illustration">${product.emoji}</div>
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

  // Update active nav link
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
    // Focus first focusable element in panel
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
    // Return focus to cart toggle
    const toggle = document.getElementById('cart-toggle');
    if (toggle) toggle.focus();
  }
}

/* ═══════════════════════════════════════════════════════════════
   8. CHECKOUT / SUCCESS MODAL
══════════════════════════════════════════════════════════════════ */
function checkout() {
  if (STATE.cart.length === 0) return;

  // Build order summary
  const details = STATE.cart.map(item =>
    `<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #EDD9B5;">
      <span>${item.emoji} ${escapeHTML(item.name)} × ${item.qty}</span>
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
      <div style="display:flex;justify-content:space-between;padding:8px 0 0;font-weight:700;font-size:1rem;color:#3B1E08;">
        <span>Total</span><span style="color:#C9A84C;">₹${total.toFixed(2)}</span>
      </div>
    `;
  }

  // Show modal
  const backdrop = document.getElementById('success-backdrop');
  if (backdrop) {
    backdrop.style.display = 'flex';
    backdrop.setAttribute('aria-hidden', 'false');
    const closeModal = document.getElementById('modal-close');
    if (closeModal) setTimeout(() => closeModal.focus(), 100);
  }

  // Increment order count
  STATE.orderCount += 1;
  saveOrderCount();
  updateDashboardKPI();

  // Close cart
  closeCart();

  // Clear cart
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

/* ═══════════════════════════════════════════════════════════════
   10. UI ANIMATIONS & HELPERS
══════════════════════════════════════════════════════════════════ */
function animateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (!badge) return;
  badge.classList.remove('bump');
  // Force reflow
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

/** Scroll smoothly to a section by element id */
function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    const headerH = document.getElementById('site-header')?.offsetHeight || 80;
    const top = el.getBoundingClientRect().top + window.scrollY - headerH - 20;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/** HTML escape utility */
function escapeHTML(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/* ═══════════════════════════════════════════════════════════════
   11. SCROLL-BASED HEADER EFFECT
══════════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════
   12. INTERSECTION OBSERVER — ANIMATE IN CARDS
══════════════════════════════════════════════════════════════════ */
function initAnimations() {
  if (!('IntersectionObserver' in window)) return;
  const style = document.createElement('style');
  style.textContent = `
    .product-card, .craft-card, .kpi-card, .flow-step {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .product-card.visible, .craft-card.visible, .kpi-card.visible, .flow-step.visible {
      opacity: 1;
      transform: none;
    }
  `;
  document.head.appendChild(style);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Observe after a tick so elements are rendered
  setTimeout(() => {
    document.querySelectorAll('.product-card, .craft-card, .kpi-card, .flow-step')
      .forEach(el => observer.observe(el));
  }, 100);
}

/* ═══════════════════════════════════════════════════════════════
   13. EVENT DELEGATION & BINDING
══════════════════════════════════════════════════════════════════ */
function bindEvents() {
  // ── Product Grid: Add to Cart ──
  const grid = document.getElementById('product-grid');
  if (grid) {
    grid.addEventListener('click', e => {
      const btn = e.target.closest('[data-product-id]');
      if (btn) addToCart(parseInt(btn.dataset.productId, 10));
    });
  }

  // ── Cart Toggle ──
  document.getElementById('cart-toggle')?.addEventListener('click', openCart);
  document.getElementById('close-cart')?.addEventListener('click', closeCart);
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);

  // ── Cart Body: Quantity & Remove ──
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

  // ── Checkout ──
  document.getElementById('checkout-btn')?.addEventListener('click', checkout);
  document.getElementById('clear-cart')?.addEventListener('click', () => {
    if (STATE.cart.length === 0) return;
    if (window.confirm('Clear all items from your cart?')) clearCart();
  });

  // ── Success Modal ──
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('success-backdrop')?.addEventListener('click', e => {
    if (e.target === document.getElementById('success-backdrop')) closeModal();
  });

  // ── Nav Links (desktop + mobile) ──
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

      // Close mobile nav
      closeMobileNav();
    });
  });

  // ── Hero Scroll Buttons ──
  document.querySelectorAll('[data-scroll]').forEach(btn => {
    if (!btn.dataset.view) { // only standalone scroll buttons (not nav links)
      btn.addEventListener('click', () => scrollToSection(btn.dataset.scroll));
    }
  });

  // ── Back to Store (Dashboard) ──
  document.getElementById('back-to-store')?.addEventListener('click', () => switchView('storefront'));

  // ── Footer links with data-view ──
  document.querySelectorAll('.site-footer [data-view]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      switchView(el.dataset.view);
    });
  });

  // ── Hamburger ──
  const hamburger = document.getElementById('hamburger');
  hamburger?.addEventListener('click', toggleMobileNav);

  // ── Keyboard: ESC closes cart/modal ──
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (STATE.cartOpen) closeCart();
      const backdrop = document.getElementById('success-backdrop');
      if (backdrop && backdrop.style.display !== 'none') closeModal();
    }
  });
}

/* ── Mobile Nav ── */
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

/* ═══════════════════════════════════════════════════════════════
   14. DASHBOARD CLOCK INTERVAL
══════════════════════════════════════════════════════════════════ */
function startDashboardClock() {
  setInterval(() => {
    if (STATE.currentView === 'dashboard') updateDashboardClock();
  }, 60000); // update every minute
}

/* ═══════════════════════════════════════════════════════════════
   15. INIT
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

  // Ensure storefront shows by default
  switchView('storefront');
  console.log(
    '%c🍬 Kaveri Heritage Foods — App Loaded %c v1.0.0 ',
    'background:#3B1E08;color:#C9A84C;padding:4px 8px;border-radius:4px 0 0 4px;font-weight:bold;',
    'background:#C9A84C;color:#3B1E08;padding:4px 8px;border-radius:0 4px 4px 0;font-weight:bold;'
  );
}

// Boot when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
