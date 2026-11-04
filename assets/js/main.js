/**
 * NATUVA GOURMET — MAIN APPLICATION CONTROLLER
 * Handles navigation behaviors, scroll interactions, product details gallery,
 * pack size price switching, and general UI enhancements.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initHeaderScroll();
    initProductGallery();
    initDetailUrlLoader();
    initPackSizeSelector();
    initQuantityControls();
    initDynamicYear();
  });

  // 1. Header Scroll Shadow (keep its height stable while scrolling)
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    function updateHeader() {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    }

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  // 3. Product Details Gallery Thumbnail Switcher
  function initProductGallery() {
    const mainImg = document.getElementById('main-product-gallery-img');
    const thumbs = document.querySelectorAll('.gallery-thumb-item');

    if (!mainImg || thumbs.length === 0) return;

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', function () {
        thumbs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        const newSrc = this.getAttribute('data-img-src') || this.querySelector('img').src;
        mainImg.style.opacity = '0.3';
        setTimeout(() => {
          mainImg.src = newSrc;
          mainImg.style.opacity = '1';
        }, 120);
      });
    });
  }

  // 4. Pack Size Selector & Dynamic Price Calculation
  function initPackSizeSelector() {
    const packButtons = document.querySelectorAll('.pack-size-btn');
    const priceDisplay = document.getElementById('detail-current-price');
    const originalPriceDisplay = document.getElementById('detail-original-price');
    const addToCartBtn = document.querySelector('.btn-add-to-cart[data-detail-target]');

    if (!packButtons.length || !priceDisplay) return;

    packButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        packButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const price = parseFloat(this.getAttribute('data-price'));
        const originalPrice = parseFloat(this.getAttribute('data-orig-price'));
        const packSize = this.getAttribute('data-size');

        priceDisplay.textContent = `${NatuvaPricing.format(price)}`;
        updateDetailSavings(price, originalPrice, originalPriceDisplay);

        if (addToCartBtn) {
          addToCartBtn.setAttribute('data-price', price);
          addToCartBtn.setAttribute('data-pack', packSize);
        }
      });
    });
  }

  function updateDetailSavings(price, originalPrice, originalPriceDisplay) {
    const hasDiscount = Number.isFinite(originalPrice) && originalPrice > price;
    if (originalPriceDisplay) {
      originalPriceDisplay.hidden = !hasDiscount;
      originalPriceDisplay.textContent = hasDiscount ? NatuvaPricing.format(originalPrice) : '';
    }
    const savings = document.getElementById('detail-savings');
    if (savings) {
      savings.hidden = !hasDiscount;
      savings.textContent = hasDiscount ? `Save ${Math.round((1 - price / originalPrice) * 100)}%` : '';
    }
  }

  // 5. Quantity Controls (+/- buttons)
  function initQuantityControls() {
    document.addEventListener('click', function (e) {
      const minusBtn = e.target.closest('.qty-control-minus');
      const plusBtn = e.target.closest('.qty-control-plus');

      if (minusBtn) {
        const input = minusBtn.parentElement.querySelector('input[type="number"]');
        if (input) {
          let val = parseInt(input.value, 10) || 1;
          if (val > 1) {
            input.value = val - 1;
            input.dispatchEvent(new Event('change'));
          }
        }
      }

      if (plusBtn) {
        const input = plusBtn.parentElement.querySelector('input[type="number"]');
        if (input) {
          let val = parseInt(input.value, 10) || 1;
          input.value = val + 1;
          input.dispatchEvent(new Event('change'));
        }
      }
    });
  }

  // 6. Dynamic Year in Footer
  function initDynamicYear() {
    const yearEl = document.querySelector('.current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // 8. Auto-load product data on Product Details Page via URL ID (?id=prod-...)
  function initDetailUrlLoader() {
    const titleEl = document.getElementById('detail-product-title');
    if (!titleEl || typeof NATUVA_DATA === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const prodId = urlParams.get('id') || 'prod-almonds-california';

    const product = NATUVA_DATA.products.find(p => p.id === prodId);
    if (!product) return;

    // Populate Product Details
    titleEl.textContent = product.name;
    document.title = `${product.name} — Natuva Gourmet`;

    const catBadge = document.getElementById('detail-product-cat');
    if (catBadge) catBadge.textContent = product.categoryLabel;

    const ratingVal = document.getElementById('detail-product-rating');
    if (ratingVal) ratingVal.textContent = product.rating;

    const reviewsCount = document.getElementById('detail-product-reviews');
    if (reviewsCount) reviewsCount.textContent = `(${product.reviewsCount} customer reviews)`;

    const priceEl = document.getElementById('detail-current-price');
    if (priceEl) priceEl.textContent = `${NatuvaPricing.format(product.price)}`;

    const origPriceEl = document.getElementById('detail-original-price');
    updateDetailSavings(product.price, product.originalPrice, origPriceEl);

    const packContainer = document.getElementById('detail-pack-sizes');
    if (packContainer) {
      packContainer.innerHTML = product.packSizes.map(pack => {
        const originalPrice = pack.originalPrice || (pack.size === product.weight ? product.originalPrice : '');
        return `<button type="button" class="btn btn-outline-custom pack-size-btn${pack.size === product.weight ? ' active' : ''}" data-size="${pack.size}" data-price="${pack.price}" data-orig-price="${originalPrice}">${pack.size}</button>`;
      }).join('');
    }

    const descEl = document.getElementById('detail-product-desc');
    if (descEl) descEl.textContent = product.description;

    const originEl = document.getElementById('detail-product-origin');
    if (originEl) originEl.textContent = product.origin;

    const roastEl = document.getElementById('detail-product-roast');
    if (roastEl) roastEl.textContent = product.roastLevel;

    const shelfEl = document.getElementById('detail-product-shelf');
    if (shelfEl) shelfEl.textContent = product.shelfLife;

    const ingEl = document.getElementById('detail-product-ingredients');
    if (ingEl) ingEl.textContent = product.ingredients;

    // Gallery Main & Thumbnails
    const mainImg = document.getElementById('main-product-gallery-img');
    if (mainImg) {
      mainImg.src = product.image;
      mainImg.alt = product.name;
    }

    const thumbsContainer = document.getElementById('detail-gallery-thumbs') || document.querySelector('.product-details-gallery .d-flex.gap-3');
    if (thumbsContainer && Array.isArray(product.gallery) && product.gallery.length > 0) {
      thumbsContainer.innerHTML = product.gallery.map((imgSrc, idx) => `
        <button type="button" class="gallery-thumb-item ${idx === 0 ? 'active' : ''} p-0 border-0 bg-transparent rounded-3 overflow-hidden shadow-xs" data-img-src="${imgSrc}" style="width: 80px; height: 80px;" aria-label="View Angle ${idx + 1}">
          <img src="${imgSrc}" alt="${product.name} Angle ${idx + 1}" class="w-100 h-100 object-fit-cover">
        </button>
      `).join('');
      initProductGallery();
    }

    // Add to cart target
    const addBtn = document.querySelector('.btn-add-to-cart[data-detail-target]');
    if (addBtn) {
      addBtn.setAttribute('data-id', product.id);
      addBtn.setAttribute('data-name', product.name);
      addBtn.setAttribute('data-price', product.price);
      addBtn.setAttribute('data-image', product.image);
      addBtn.setAttribute('data-pack', product.weight);
    }
  }
})();
