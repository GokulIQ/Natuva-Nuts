/** Populate the gift detail page from the same catalog used by the cart. */
(function () {
  'use strict';

  const title = document.getElementById('gift-detail-title');
  if (!title || typeof NATUVA_DATA === 'undefined') return;
  const page = document.getElementById('gift-detail-page');

  const id = new URLSearchParams(window.location.search).get('id');
  const gift = NATUVA_DATA.giftBoxes.find(item => item.id === (id || 'gift-royal-heritage-box'));
  if (!gift) {
    document.title = 'Gift not found — Natuva Gourmet';
    document.querySelector('main').innerHTML = '<section class="section-padding"><div class="container text-center"><h1>Gift not found</h1><p>Please choose a gift from our collection.</p><a href="gift-boxes.html" class="btn btn-gold">Browse Gift Boxes</a></div></section>';
    page.hidden = false;
    document.querySelector('meta[property="og:image"]')?.remove();
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Choose a gift from the Natuva collection.');
    return;
  }

  const text = (id, value) => { document.getElementById(id).textContent = value; };
  const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const link = item => `gift-details.html?id=${encodeURIComponent(item.id)}`;

  title.textContent = gift.name;
  document.title = `${gift.name} — Natuva Gourmet`;
  for (const [selector, value] of [
    ['meta[name="description"]', gift.packaging],
    ['meta[property="og:title"]', document.title],
    ['meta[property="og:description"]', gift.packaging],
    ['meta[property="og:image"]', gift.image]
  ]) document.querySelector(selector)?.setAttribute('content', value);

  text('gift-detail-occasion', gift.occasion);
  text('gift-detail-badge', gift.badge);
  text('gift-detail-price', NatuvaPricing.format(gift.price));
  text('gift-detail-description', gift.packaging);
  text('gift-detail-packaging', gift.packaging);
  text('gift-detail-dimensions', gift.dimensions);
  text('gift-detail-best-for', gift.bestFor);
  text('gift-detail-occasion-title', gift.occasion);
  document.querySelectorAll('[data-gift-image]').forEach(image => {
    const role = image.dataset.giftImage;
    const photo = role === 'hero'
      ? { src: gift.image, alt: gift.heroAlt || gift.name, width: gift.imageWidth, height: gift.imageHeight }
      : gift.gallery.find(photo => photo.role === role);
    image.src = photo.src;
    image.alt = photo.alt;
    if (photo.width && photo.height) { image.width = photo.width; image.height = photo.height; }
    if (photo.smallSrc) {
      image.srcset = `${photo.smallSrc} 768w, ${photo.src} ${photo.width}w`;
      image.sizes = '(max-width: 991px) calc(100vw - 48px), (min-width: 1440px) 656px, 50vw';
    }
    const caption = document.querySelector(`[data-gift-caption="${role}"]`);
    if (caption) caption.textContent = photo.caption;
  });

  const button = document.getElementById('gift-detail-add');
  Object.assign(button.dataset, {
    id: gift.id, name: gift.name, price: String(gift.price), image: gift.image, pack: '1 Gift Box'
  });

  document.getElementById('gift-detail-inclusions').innerHTML = gift.inclusions.map(item => `
    <div class="col-12 col-sm-6">
      <div class="p-4 bg-surface-card rounded-4 border-theme h-100 shadow-xs d-flex align-items-start gap-3">
        <i class="bi bi-check-circle text-gold fs-4" aria-hidden="true"></i>
        <h3 class="h6 mb-0">${escape(item)}</h3>
      </div>
    </div>`).join('');

  document.getElementById('gift-detail-related').innerHTML = NATUVA_DATA.giftBoxes
    .filter(item => item.id !== gift.id).slice(0, 3).map(item => `
      <div class="col-12 col-md-4 d-flex" data-related-gift="${escape(item.id)}">
        <div class="gift-card w-100">
          <a class="gift-thumb-wrap d-block" href="${link(item)}"><img src="${escape(item.image)}" alt="${escape(item.name)}" loading="lazy"></a>
          <div class="gift-card-body">
            <span class="gift-occasion-badge">${escape(item.occasion)}</span>
            <h4 class="gift-card-title"><a href="${link(item)}">${escape(item.name)}</a></h4>
            <p class="gift-items-preview">${escape(item.packaging)}</p>
            <div class="gift-card-actions d-flex flex-wrap gap-3 align-items-center justify-content-between mt-auto pt-3">
              <div class="current-price fs-4">${escape(NatuvaPricing.format(item.price))}</div>
              <a href="${link(item)}" class="btn btn-sm btn-gold">View Details</a>
            </div>
          </div>
        </div>
      </div>`).join('');
  page.hidden = false;
})();
