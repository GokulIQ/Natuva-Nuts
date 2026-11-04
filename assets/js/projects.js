/** Shared listing, detail routing, and accessible story gallery. Works on file:// URLs. */
(function () {
  'use strict';
  const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const url = story => `project-details.html?id=${encodeURIComponent(story.id)}`;
  const card = story => `
    <div class="col-12 col-md-6 col-lg-4 d-flex">
      <div class="story-card w-100" data-story-id="${escape(story.id)}">
        <a class="story-thumb-wrap d-block" href="${url(story)}" aria-label="${escape(story.title)}">
          <img src="${escape(story.mainImage)}" alt="${escape(story.mainAlt)}" loading="lazy">
          <span class="story-origin-tag"><i class="bi bi-geo-alt-fill" aria-hidden="true"></i> ${escape(story.location)}</span>
        </a>
        <div class="story-card-body">
          <h4 class="story-card-title"><a href="${url(story)}">${escape(story.title)}</a></h4>
          <p class="small text-muted flex-grow-1">${escape(story.description)}</p>
          <div class="d-flex flex-wrap gap-2 align-items-center justify-content-between pt-3">
            <span class="small text-muted"><i class="bi bi-clock me-1" aria-hidden="true"></i> ${escape(story.readingTime)}</span>
            <a href="${url(story)}" class="fw-bold text-pistachio text-decoration-none">Read Story <i class="bi bi-arrow-right ms-1" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    </div>`;

  const listing = document.getElementById('sourcing-stories-grid');
  if (listing) {
    const ids = listing.dataset.stories?.split(',');
    listing.innerHTML = (ids ? ids.map(id => NATUVA_PROJECTS.find(story => story.id === id)).filter(Boolean) : NATUVA_PROJECTS).map(card).join('');
  }

  const detail = document.getElementById('project-detail');
  if (!detail) return;
  const id = new URLSearchParams(location.search).get('id');
  const story = NATUVA_PROJECTS.find(item => item.id === id);
  const featuredLink = document.querySelector('.site-header a[href="project-details.html?id=california-almonds"]');
  if (featuredLink && id !== 'california-almonds') {
    featuredLink.classList.remove('active');
    featuredLink.removeAttribute('aria-current');
  }
  if (!story) {
    detail.hidden = false;
    document.title = `${id ? 'Story Not Found' : 'Choose a Sourcing Story'} — Natuva Gourmet`;
    detail.innerHTML = `<section class="section-padding"><div class="container text-center"><h1>${id ? 'Story Not Found' : 'Choose a Sourcing Story'}</h1><p>Select a story to explore its origin, images, and process.</p><a href="projects.html" class="btn btn-gold">Back to Sourcing Stories</a></div></section>`;
    document.querySelector('meta[name="description"]').content = 'Browse the Natuva sourcing stories to choose an origin journey.';
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = 'Choose a sourcing story from the collection.';
    document.querySelector('meta[property="og:image"]')?.remove();
    return;
  }

  document.title = `${story.title} — Natuva Gourmet`;
  document.querySelector('meta[name="description"]').content = story.description;
  document.querySelector('meta[name="keywords"]').content = `${story.category}, ${story.location}, Natuva sourcing stories`;
  document.querySelector('meta[property="og:title"]').content = document.title;
  document.querySelector('meta[property="og:description"]').content = story.description;
  document.querySelector('meta[property="og:image"]').content = story.mainImage;
  const setText = (id, value) => { document.getElementById(id).textContent = value; };
  setText('project-title', story.title);
  setText('project-breadcrumb-title', story.title);
  setText('project-location', story.location);
  setText('project-category', story.category);
  setText('project-reading-time', story.readingTime);
  setText('project-introduction', story.introduction);
  const hero = document.getElementById('project-hero');
  hero.src = story.mainImage;
  hero.alt = story.mainAlt;
  document.getElementById('project-highlights').innerHTML = story.highlights.map(([title, text], index) => `
    <div class="col-12 col-md-4"><div class="p-4 bg-surface-card rounded-4 border-theme h-100 shadow-xs">
      <span class="font-serif fs-4 fw-bold text-gold d-block mb-2">0${index + 1}</span>
      <h3 class="h5 font-serif fw-bold mb-2">${escape(title)}</h3><p class="small text-muted mb-0">${escape(text)}</p>
    </div></div>`).join('');
  document.getElementById('project-article').innerHTML = story.sections.slice(0, 2).map(section => `
    <div class="col-lg-6"><h2 class="h3 mb-3">${escape(section.title)}</h2><p class="text-muted mb-0">${escape(section.text)}</p></div>`).join('');
  setText('project-care-title', story.sections[2].title);
  setText('project-care-text', story.sections[2].text);
  const sources = document.getElementById('project-sources');
  sources.hidden = !story.sources.length;
  sources.innerHTML = '<h3 class="h6">Further Reading</h3>' + story.sources.map(([title, href]) => `<a href="${escape(href)}" class="d-block mb-2">${escape(title)}</a>`).join('');
  document.getElementById('project-related').innerHTML = story.relatedProjects.map(relatedId => NATUVA_PROJECTS.find(item => item.id === relatedId)).filter(item => item && item.id !== story.id).map(card).join('');
  const shop = document.getElementById('project-shop');
  shop.href = story.shopUrl;
  shop.textContent = story.shopLabel;
  setText('project-shop-title', story.shopLabel);
  detail.hidden = false;

  const gallery = document.getElementById('project-gallery');
  const image = document.getElementById('project-gallery-image');
  const caption = document.getElementById('project-gallery-caption');
  const status = document.getElementById('project-gallery-status');
  const thumbnails = document.getElementById('project-gallery-thumbnails');
  let active = 0;
  thumbnails.innerHTML = story.gallery.map((photo, index) => `<button type="button" class="project-gallery-thumb" data-slide="${index}" aria-label="Show image ${index + 1}: ${escape(photo.alt)}" aria-controls="project-gallery-image"><img src="${escape(photo.src)}" alt="" loading="lazy"></button>`).join('');
  function show(index) {
    active = (index + story.gallery.length) % story.gallery.length;
    const photo = story.gallery[active];
    image.src = photo.src;
    image.alt = photo.alt;
    caption.textContent = photo.caption + (photo.generated ? ' AI-generated illustration.' : '');
    status.textContent = `Image ${active + 1} of ${story.gallery.length}`;
    thumbnails.querySelectorAll('button').forEach((button, index) => {
      button.classList.toggle('active', index === active);
      button.setAttribute('aria-pressed', String(index === active));
    });
  }
  thumbnails.addEventListener('click', event => {
    const button = event.target.closest('[data-slide]');
    if (button) show(Number(button.dataset.slide));
  });
  document.getElementById('project-gallery-previous').addEventListener('click', () => show(active - 1));
  document.getElementById('project-gallery-next').addEventListener('click', () => show(active + 1));
  gallery.addEventListener('keydown', event => {
    const rtl = document.documentElement.dir === 'rtl';
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      show(active + ((event.key === 'ArrowRight') !== rtl ? 1 : -1));
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault(); show(event.key === 'Home' ? 0 : story.gallery.length - 1);
    }
  });
  let touchStart;
  image.addEventListener('touchstart', event => {
    touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  }, { passive: true });
  image.addEventListener('touchend', event => {
    if (!touchStart) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      show(active + ((dx < 0) !== (document.documentElement.dir === 'rtl') ? 1 : -1));
    }
    touchStart = null;
  }, { passive: true });
  show(0);
})();
