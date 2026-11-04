/**
 * NATUVA GOURMET — SHOPPING CART & COMMERCE ENGINE
 * Fully client-side reactive shopping cart utilizing LocalStorage
 * Manages item counts, pack variants, drawer rendering, promo discounts,
 * and simulated checkout flow.
 */

const NatuvaCart = (function () {
  'use strict';

  const STORAGE_KEY = 'natuva_cart_items_inr_v1';
  const LEGACY_STORAGE_KEY = 'natuva_cart_items';
  const PROMO_KEY = 'natuva_promo_code';
  const FREE_SHIPPING_GOAL = NatuvaPricing.freeShippingGoal;

  let cart = [];
  let appliedPromo = null;

  // Active Promo Codes for Demo
  const PROMO_CODES = {
    'GOURMET10': { discountPercent: 10, label: '10% Off Gourmet Welcome' },
    'NATUVA20': { discountPercent: 20, label: '20% Off Festive VIP' },
    'FREESHIP': { freeShipping: true, label: 'Complimentary Express Shipping' }
  };

  function init() {
    loadCart();
    loadPromo();
    renderCartUI();
    bindEvents();
  }

  function loadCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      const legacyData = data === null ? localStorage.getItem(LEGACY_STORAGE_KEY) : null;
      cart = JSON.parse(data || legacyData || '[]');
      if (!Array.isArray(cart)) cart = [];
      // Reprice both old USD carts and previous INR carts from the current catalog.
      cart = cart.flatMap(item => {
        if (!item || !Number.isInteger(item.quantity) || item.quantity < 1) return [];
        const product = NATUVA_DATA.products.find(product => product.id === item.id);
        const gift = NATUVA_DATA.giftBoxes.find(gift => gift.id === item.id);
        const pack = product?.packSizes.find(pack => pack.size === item.packSize);
        const price = pack?.price ?? gift?.price;
        return price === undefined ? [] : [{ ...item, price }];
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      cart = [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
    renderCartUI();
  }

  function loadPromo() {
    const code = localStorage.getItem(PROMO_KEY);
    if (code && PROMO_CODES[code]) {
      appliedPromo = { code, ...PROMO_CODES[code] };
    }
  }

  function addItem(item) {
    // Check if item with same ID and packSize exists
    const existingIndex = cart.findIndex(
      i => i.id === item.id && i.packSize === item.packSize
    );

    const qtyToAdd = parseInt(item.quantity, 10) || 1;

    if (existingIndex > -1) {
      cart[existingIndex].quantity += qtyToAdd;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: parseFloat(item.price),
        packSize: item.packSize || '500g',
        image: item.image,
        quantity: qtyToAdd
      });
    }

    saveCart();
    showToast(`Added ${item.name} (${item.packSize || '500g'}) to your shopping bag.`);
    openDrawer();
  }

  function updateQuantity(id, packSize, delta) {
    const index = cart.findIndex(i => i.id === id && i.packSize === packSize);
    if (index === -1) return;

    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
      showToast('Item removed from shopping bag.');
    }
    saveCart();
  }

  function removeItem(id, packSize) {
    cart = cart.filter(i => !(i.id === id && i.packSize === packSize));
    saveCart();
    showToast('Item removed from shopping bag.');
  }

  function clearCart() {
    cart = [];
    appliedPromo = null;
    localStorage.removeItem(PROMO_KEY);
    saveCart();
  }

  function applyPromoCode(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (PROMO_CODES[cleanCode]) {
      appliedPromo = { code: cleanCode, ...PROMO_CODES[cleanCode] };
      localStorage.setItem(PROMO_KEY, cleanCode);
      renderCartUI();
      showToast(`Promo code "${cleanCode}" applied! ${appliedPromo.label}`);
      return { success: true, message: appliedPromo.label };
    } else {
      showToast('Invalid promo code. Try "GOURMET10" or "FREESHIP"', 'warning');
      return { success: false, message: 'Invalid promo code' };
    }
  }

  function removePromoCode() {
    appliedPromo = null;
    localStorage.removeItem(PROMO_KEY);
    renderCartUI();
    showToast('Promo code removed.');
  }

  function getCalculations() {
    const subtotal = NatuvaPricing.round(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0));
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    let discount = 0;
    if (appliedPromo && appliedPromo.discountPercent) {
      discount = NatuvaPricing.round((subtotal * appliedPromo.discountPercent) / 100);
    }

    let shipping = subtotal >= FREE_SHIPPING_GOAL || (appliedPromo && appliedPromo.freeShipping) || subtotal === 0 ? 0 : NatuvaPricing.shippingFee;
    const total = NatuvaPricing.round(Math.max(0, subtotal - discount + shipping));

    const amountForFreeShipping = NatuvaPricing.round(Math.max(0, FREE_SHIPPING_GOAL - subtotal));
    const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_GOAL) * 100);

    return {
      subtotal,
      count,
      discount,
      shipping,
      total,
      amountForFreeShipping,
      freeShippingProgress,
      appliedPromo
    };
  }

  function renderCartUI() {
    const calc = getCalculations();

    // 1. Update all badge counters across the page
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = calc.count;
      el.style.display = calc.count > 0 ? 'flex' : 'none';
    });

    // 2. Render Drawer Item List
    const drawerList = document.querySelector('.cart-drawer-items');
    if (!drawerList) return;

    if (cart.length === 0) {
      drawerList.innerHTML = `
        <div class="text-center py-5 my-auto">
          <div class="mb-3 text-muted" style="font-size: 3rem;">
            <i class="bi bi-basket3"></i>
          </div>
          <h5 class="font-serif mb-2">Your Shopping Bag is Empty</h5>
          <p class="text-muted small mb-4">Discover our hand-roasted nuts, exotic dates, and bespoke gift hampers.</p>
          <a href="products.html" class="btn btn-primary-custom btn-sm">Explore Collection</a>
        </div>
      `;
    } else {
      drawerList.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}" data-pack="${item.packSize}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='assets/images/products/prod-almonds-california.webp'">
          <div class="cart-item-info">
            <h6 class="cart-item-title">${item.name}</h6>
            <div class="cart-item-meta">Pack: <strong>${item.packSize}</strong> · ${NatuvaPricing.format(item.price)} each</div>
            <div class="d-flex align-items-center justify-content-between mt-2">
              <div class="cart-qty-ctrl">
                <button type="button" class="cart-qty-btn btn-qty-minus" aria-label="Decrease quantity">
                  <i class="bi bi-dash"></i>
                </button>
                <span class="cart-qty-num">${item.quantity}</span>
                <button type="button" class="cart-qty-btn btn-qty-plus" aria-label="Increase quantity">
                  <i class="bi bi-plus"></i>
                </button>
              </div>
              <div class="fw-bold text-heading-color">${NatuvaPricing.format((item.price * item.quantity))}</div>
            </div>
          </div>
          <button type="button" class="cart-item-remove" aria-label="Remove item">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      `).join('');
    }

    // 3. Render Drawer Totals & Free Shipping Bar
    const subtotalEl = document.querySelector('.cart-subtotal-val');
    const totalEl = document.querySelector('.cart-total-val');
    const shippingEl = document.querySelector('.cart-shipping-val');
    const freeShipMsgEl = document.querySelector('.free-shipping-msg');
    const freeShipBarEl = document.querySelector('.free-shipping-bar');
    const discountRow = document.querySelector('.cart-discount-row');
    const discountVal = document.querySelector('.cart-discount-val');
    const checkoutBtn = document.querySelector('.btn-checkout');

    if (subtotalEl) subtotalEl.textContent = `${NatuvaPricing.format(calc.subtotal)}`;
    if (totalEl) totalEl.textContent = `${NatuvaPricing.format(calc.total)}`;

    if (shippingEl) {
      shippingEl.textContent = calc.shipping === 0 ? 'FREE' : `${NatuvaPricing.format(calc.shipping)}`;
    }

    if (discountRow && discountVal) {
      if (calc.discount > 0) {
        discountRow.style.display = 'flex';
        discountVal.textContent = `-${NatuvaPricing.format(calc.discount)}`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    if (freeShipMsgEl && freeShipBarEl) {
      if (calc.subtotal >= FREE_SHIPPING_GOAL) {
        freeShipMsgEl.innerHTML = '<i class="bi bi-check-circle-fill text-pistachio me-1"></i> You unlocked <strong>Complimentary Shipping!</strong>';
        freeShipBarEl.style.width = '100%';
      } else {
        freeShipMsgEl.innerHTML = `Add <strong>${NatuvaPricing.format(calc.amountForFreeShipping)}</strong> more to unlock <strong>Free Express Shipping</strong>`;
        freeShipBarEl.style.width = `${calc.freeShippingProgress}%`;
      }
    }

    if (checkoutBtn) {
      checkoutBtn.disabled = cart.length === 0;
    }
  }

  function openDrawer() {
    const drawer = document.querySelector('.cart-drawer');
    const overlay = document.querySelector('.cart-drawer-overlay');
    if (drawer && overlay) {
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    const drawer = document.querySelector('.cart-drawer');
    const overlay = document.querySelector('.cart-drawer-overlay');
    if (drawer && overlay) {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container-custom');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container-custom position-fixed bottom-0 end-0 p-3';
      container.style.zIndex = '1090';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-bg-${type === 'warning' ? 'warning' : 'dark'} border-0 show mb-2`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2">
          <i class="bi ${type === 'warning' ? 'bi-exclamation-triangle-fill text-warning' : 'bi-check-circle-fill text-pistachio'} fs-5"></i>
          <span>${message}</span>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3500);

    toast.querySelector('.btn-close').addEventListener('click', () => {
      toast.remove();
    });
  }

  function bindEvents() {
    // Drawer open triggers
    document.addEventListener('click', function (e) {
      if (e.target.closest('.cart-trigger-btn')) {
        e.preventDefault();
        openDrawer();
      }
      if (e.target.closest('.cart-drawer-close') || e.target.closest('.cart-drawer-overlay')) {
        e.preventDefault();
        closeDrawer();
      }
    });

    // Delegated Qty & Remove buttons inside drawer
    document.addEventListener('click', function (e) {
      const itemEl = e.target.closest('.cart-item');
      if (!itemEl) return;

      const id = itemEl.getAttribute('data-id');
      const packSize = itemEl.getAttribute('data-pack');

      if (e.target.closest('.btn-qty-plus')) {
        updateQuantity(id, packSize, 1);
      } else if (e.target.closest('.btn-qty-minus')) {
        updateQuantity(id, packSize, -1);
      } else if (e.target.closest('.cart-item-remove')) {
        removeItem(id, packSize);
      }
    });

    // Add to cart buttons across product cards & detail pages
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-add-to-cart');
      if (!btn) return;
      e.preventDefault();

      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const price = btn.getAttribute('data-price');
      const image = btn.getAttribute('data-image');
      const packSize = btn.getAttribute('data-pack') || '500g';
      const qtyInput = document.querySelector(`#qty-${id}`) || document.querySelector('#detail-qty-input');
      const quantity = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;

      addItem({ id, name, price, image, packSize, quantity });
    });

    // Promo code form submit
    document.addEventListener('submit', function (e) {
      if (e.target.matches('#cart-promo-form')) {
        e.preventDefault();
        const input = e.target.querySelector('#promo-code-input');
        if (input) {
          applyPromoCode(input.value);
          input.value = '';
        }
      }
    });

    // Checkout button trigger (Simulated Modal)
    document.addEventListener('click', function (e) {
      if (e.target.closest('.btn-checkout')) {
        e.preventDefault();
        closeDrawer();
        openCheckoutModal();
      }
    });
  }

  function openCheckoutModal() {
    const calc = getCalculations();
    let modalEl = document.querySelector('#checkoutModal');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.className = 'modal fade';
      modalEl.id = 'checkoutModal';
      modalEl.setAttribute('tabindex', '-1');
      modalEl.setAttribute('aria-labelledby', 'checkoutModalLabel');
      modalEl.setAttribute('aria-hidden', 'true');
      document.body.appendChild(modalEl);
    }

    modalEl.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-theme bg-surface-card">
          <div class="modal-header border-bottom border-theme">
            <h5 class="modal-title font-serif" id="checkoutModalLabel">Order Simulation & Review</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4">
            <div class="alert alert-info border-0 rounded-3 small mb-3">
              <i class="bi bi-info-circle-fill me-1"></i>
              <strong>Demonstration Mode:</strong> This frontend template simulates real order totals and cart state. Ready to connect to Stripe, PayPal, or custom backend.
            </div>
            <h6 class="fw-bold mb-2">Order Summary (${calc.count} items)</h6>
            <ul class="list-group list-group-flush border-theme rounded-2 mb-3">
              ${cart.map(i => `
                <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent py-2">
                  <span>${i.name} (${i.packSize}) <small class="text-muted">x${i.quantity}</small></span>
                  <span class="fw-bold">${NatuvaPricing.format((i.price * i.quantity))}</span>
                </li>
              `).join('')}
              <li class="list-group-item d-flex justify-content-between bg-transparent pt-3 pb-1">
                <span class="text-muted">Subtotal</span>
                <span>${NatuvaPricing.format(calc.subtotal)}</span>
              </li>
              ${calc.discount > 0 ? `
                <li class="list-group-item d-flex justify-content-between bg-transparent py-1 text-success">
                  <span>Discount (${calc.appliedPromo.label})</span>
                  <span>-${NatuvaPricing.format(calc.discount)}</span>
                </li>
              ` : ''}
              <li class="list-group-item d-flex justify-content-between bg-transparent py-1">
                <span class="text-muted">Shipping</span>
                <span>${calc.shipping === 0 ? 'Free' : `${NatuvaPricing.format(calc.shipping)}`}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between bg-transparent py-2 fs-5 fw-bold text-heading-color border-top">
                <span>Total Due</span>
                <span class="text-pistachio">${NatuvaPricing.format(calc.total)}</span>
              </li>
            </ul>
            <form id="simulated-checkout-form" class="needs-validation">
              <div class="mb-3">
                <label class="form-label">Full Shipping Name</label>
                <input type="text" class="form-control" required placeholder="e.g. Eleanor Vance">
              </div>
              <div class="mb-3">
                <label class="form-label">Email for Tracking Receipt</label>
                <input type="email" class="form-control" required placeholder="eleanor@example.com">
              </div>
              <button type="submit" class="btn btn-gold w-100 py-2">
                <i class="bi bi-lock-fill me-1"></i> Place Simulated Demonstration Order
              </button>
            </form>
          </div>
        </div>
      </div>
    `;

    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();

    const form = modalEl.querySelector('#simulated-checkout-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearCart();
      modalEl.querySelector('.modal-body').innerHTML = `
        <div class="text-center py-4">
          <div class="text-success mb-3" style="font-size: 3.5rem;">
            <i class="bi bi-patch-check-fill"></i>
          </div>
          <h4 class="font-serif mb-2">Thank You for Your Order!</h4>
          <p class="text-muted small mb-3">Order #NAT-${Math.floor(100000 + Math.random() * 900000)} has been placed in demonstration mode.</p>
          <p class="small text-muted mb-4">A simulated shipping confirmation has been queued. Cart has been reset.</p>
          <button type="button" class="btn btn-primary-custom" data-bs-dismiss="modal">Continue Browsing</button>
        </div>
      `;
    });
  }

  // Initialize on script load
  document.addEventListener('DOMContentLoaded', init);

  return {
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    applyPromoCode,
    removePromoCode,
    openDrawer,
    closeDrawer,
    getCalculations,
    showToast
  };
})();
