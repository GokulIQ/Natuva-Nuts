/**
 * NATUVA GOURMET — PRODUCT FILTER & SEARCH ENGINE
 * Powers real-time search, category switching, price slider, and sorting
 * on products.html with responsive mobile drawer support.
 */

(function () {
  'use strict';

  let activeCategory = 'all';
  let searchQuery = '';
  let maxPrice = NatuvaPricing.filterMax;
  let sortBy = 'featured';

  function init() {
    const productsContainer = document.getElementById('products-grid');
    if (!productsContainer) return; // Only run on products page

    const filterDetails = document.querySelector('.catalog-filter-details');
    const desktop = window.matchMedia('(min-width: 992px)');
    const setFilterLayout = () => { if (filterDetails) filterDetails.open = desktop.matches; };
    setFilterLayout();
    desktop.addEventListener('change', setFilterLayout);
    populateCategoryCounts();
    renderProducts();
    bindFilterEvents();
  }

  function populateCategoryCounts() {
    const count = category => NATUVA_DATA.products.filter(item => category === 'all' || item.category === category).length;
    document.querySelectorAll('.catalog-category-list [data-filter-category]').forEach(link => {
      link.querySelector('span:last-child').textContent = count(link.dataset.filterCategory);
    });
    document.querySelectorAll('#catalog-category-select option').forEach(option => {
      option.textContent += ` (${count(option.value)})`;
    });
  }

  function syncCategoryControls() {
    document.querySelectorAll('[data-filter-category]').forEach(control => {
      const active = control.dataset.filterCategory === activeCategory;
      control.classList.toggle('active', active);
      if (control.matches('button')) control.setAttribute('aria-pressed', String(active));
      else if (active) control.setAttribute('aria-current', 'true');
      else control.removeAttribute('aria-current');
      if (control.closest('.catalog-category-pills')) {
        control.classList.toggle('btn-gold', active);
        control.classList.toggle('btn-outline-light', !active);
      }
    });
    const select = document.getElementById('catalog-category-select');
    if (select) select.value = activeCategory;
    const summary = document.getElementById('catalog-filter-summary');
    const applied = Number(activeCategory !== 'all') + Number(maxPrice < NatuvaPricing.filterMax);
    if (summary) summary.textContent = `Category & price${applied ? ` (${applied} active)` : ''}`;
  }

  function getFilteredProducts() {
    if (typeof NATUVA_DATA === 'undefined' || !NATUVA_DATA.products) {
      return [];
    }

    return NATUVA_DATA.products.filter(item => {
      // 1. Category filter
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

      // 2. Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.origin.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q)
      );

      // 3. Price filter
      const matchesPrice = item.price <= maxPrice;

      return matchesCategory && matchesSearch && matchesPrice;
    }).sort((a, b) => {
      // Sorting
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // featured default order
    });
  }

  function renderProducts() {
    const grid = document.getElementById('products-grid');
    const countEl = document.getElementById('products-count');
    if (!grid) return;

    syncCategoryControls();

    const filtered = getFilteredProducts();

    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} of ${NATUVA_DATA.products.length} products`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-12 py-5 text-center">
          <div class="mb-3 text-muted" style="font-size: 3rem;">
            <i class="bi bi-funnel"></i>
          </div>
          <h4 class="font-serif mb-2">No Matching Dry Fruits Found</h4>
          <p class="text-muted small mb-4">We couldn't find any products matching your current search or price filter.</p>
          <button type="button" class="btn btn-outline-custom btn-sm btn-reset-filters">
            <i class="bi bi-arrow-counterclockwise me-1"></i> Reset All Filters
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <div class="col-12 col-sm-6 col-lg-4 d-flex">
        <div class="product-card w-100">
          <div class="product-badge-wrap">
            <span class="badge-tag badge-${item.badgeType}">${item.badge}</span>
          </div>

          <div class="product-thumb-wrap">
            <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='assets/images/products/prod-almonds-california.webp'">
            <div class="product-quick-actions">
              <a href="product-details.html?id=${item.id}" class="product-action-btn" title="View Details" aria-label="View Details">
                <i class="bi bi-eye"></i>
              </a>
              <button type="button" class="product-action-btn btn-add-to-cart" 
                data-id="${item.id}" 
                data-name="${item.name}" 
                data-price="${item.price}" 
                data-image="${item.image}" 
                data-pack="${item.weight}" 
                title="Quick Add to Bag" aria-label="Quick Add">
                <i class="bi bi-bag-plus"></i>
              </button>
            </div>
          </div>

          <div class="product-meta-row">
            <span class="product-category-label">${item.categoryLabel}</span>
            <span class="product-weight-label">${item.weight}</span>
          </div>

          <h5 class="product-card-title">
            <a href="product-details.html?id=${item.id}">${item.name}</a>
          </h5>

          <div class="product-rating">
            <i class="bi bi-star-fill"></i>
            <span class="fw-bold text-heading-color">${item.rating}</span>
            <span class="rating-count">(${item.reviewsCount} reviews)</span>
          </div>

          <div class="product-card-footer">
            <div class="product-price-wrap">
              <span class="current-price">${NatuvaPricing.format(item.price)}</span>
              ${item.originalPrice ? `<span class="original-price">${NatuvaPricing.format(item.originalPrice)}</span>` : ''}
            </div>
            <button type="button" class="btn btn-sm btn-primary-custom btn-add-to-cart"
              data-id="${item.id}"
              data-name="${item.name}"
              data-price="${item.price}"
              data-image="${item.image}"
              data-pack="${item.weight}">
              <i class="bi bi-bag-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function bindFilterEvents() {
    // 1. Category Buttons / Pills
    document.querySelectorAll('[data-filter-category]').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        activeCategory = this.getAttribute('data-filter-category');
        renderProducts();
      });
    });

    document.getElementById('catalog-category-select')?.addEventListener('change', function () {
      activeCategory = this.value;
      renderProducts();
    });

    // 2. Search Input
    const searchInput = document.getElementById('product-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        searchQuery = this.value;
        renderProducts();
      });
    }

    // 3. Price Slider
    const priceRange = document.getElementById('price-range-slider');
    const priceDisplay = document.getElementById('price-range-val');
    if (priceRange && priceDisplay) {
      priceRange.addEventListener('input', function () {
        maxPrice = parseFloat(this.value);
        priceDisplay.textContent = NatuvaPricing.format(maxPrice);
        renderProducts();
      });
    }

    // 4. Sort Dropdown
    const sortSelect = document.getElementById('sort-products-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        sortBy = this.value;
        renderProducts();
      });
    }

    // 5. Reset Filters
    document.addEventListener('click', function (e) {
      if (e.target.closest('.btn-reset-filters')) {
        e.preventDefault();
        activeCategory = 'all';
        searchQuery = '';
        maxPrice = NatuvaPricing.filterMax;
        sortBy = 'featured';

        // Reset UI elements
        document.querySelectorAll('[data-filter-category]').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-filter-category') === 'all');
        });
        if (searchInput) searchInput.value = '';
        if (priceRange) {
          priceRange.value = NatuvaPricing.filterMax;
          priceDisplay.textContent = NatuvaPricing.format(NatuvaPricing.filterMax);
        }
        if (sortSelect) sortSelect.value = 'featured';

        renderProducts();
      }
    });

    // Check URL parameters on initial load (e.g. ?category=almonds)
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category');
    if (catParam && ['all', ...NATUVA_DATA.products.map(item => item.category)].includes(catParam)) {
      activeCategory = catParam;
      renderProducts();
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
