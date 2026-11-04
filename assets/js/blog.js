/** Journal rendering and routing, without network fetches so local HTML previews work. */
(function () {
  'use strict';
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const url = post => `blog-details.html?id=${encodeURIComponent(post.id)}`;
  const date = post => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(post.date + 'T12:00:00Z'));
  const srcset = post => `${post.mainImage.replace('.webp', '-768.webp')} 768w, ${post.mainImage} ${post.imageWidth || 1536}w`;
  const metadata = post => `<span class="blog-meta-item"><i class="bi bi-calendar3" aria-hidden="true"></i><time datetime="${post.date}">${date(post)}</time></span><span class="blog-meta-item"><i class="bi bi-clock" aria-hidden="true"></i>${post.readingTime}</span>`;
  const card = (post, home = false) => `
    <div class="col-12 col-md-${home ? '4' : '6'} col-lg-4 d-flex blog-card-item" data-category="${post.category}" data-post-id="${post.id}">
      <article class="blog-card w-100">
        <a class="blog-thumb-wrap d-block" href="${url(post)}" aria-label="${escape(post.title)}"><img src="${post.mainImage}" srcset="${srcset(post)}" sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw" alt="${escape(post.mainAlt)}" loading="lazy" width="${post.imageWidth || 1536}" height="${post.imageHeight || 1024}"></a>
        <div class="blog-card-body">
          <div class="blog-meta-bar">${metadata(post)}</div>
          <h4 class="blog-card-title"><a href="${url(post)}">${escape(post.title)}</a></h4>
          <p class="blog-excerpt">${escape(post.excerpt)}</p>
          <a href="${url(post)}" class="mt-auto fw-bold text-pistachio text-decoration-none">Read Article <i class="bi bi-arrow-right ms-1" aria-hidden="true"></i></a>
        </div>
      </article>
    </div>`;

  document.querySelectorAll('[data-blog-posts]').forEach(grid => {
    const ids = grid.dataset.blogPosts;
    const posts = ids === 'all' ? NATUVA_BLOGS : ids.split(',').map(id => NATUVA_BLOGS.find(post => post.id === id)).filter(Boolean);
    grid.innerHTML = posts.map(post => card(post, grid.id === 'home-blog-grid')).join('');
  });
  const featured = document.getElementById('blog-featured');
  if (featured) {
    const post = NATUVA_BLOGS[0];
    featured.innerHTML = `<div class="row align-items-center g-5"><div class="col-lg-6"><span class="section-kicker kicker-gold">Featured Article</span><h2 class="h1 mb-3 font-serif"><a href="${url(post)}" class="text-heading-color text-decoration-none">${escape(post.title)}</a></h2><div class="blog-meta-bar mb-3">${metadata(post)}</div><p class="text-muted mb-4">${escape(post.excerpt)}</p><a href="${url(post)}" class="btn btn-primary-custom">Read Complete Guide <i class="bi bi-arrow-right ms-1" aria-hidden="true"></i></a></div><div class="col-lg-6"><a href="${url(post)}"><img src="${post.mainImage}" srcset="${srcset(post)}" sizes="(max-width: 991px) 100vw, 50vw" alt="${escape(post.mainAlt)}" class="rounded-4 shadow-md w-100 blog-featured-image" width="${post.imageWidth || 1536}" height="${post.imageHeight || 1024}" fetchpriority="high"></a></div></div>`;
  }
  initFilters();

  const detail = document.getElementById('blog-detail');
  if (!detail) return;
  const id = new URLSearchParams(location.search).get('id');
  const post = NATUVA_BLOGS.find(item => item.id === id || item.legacyId === id);
  const setMeta = (selector, content) => document.querySelector(selector)?.setAttribute('content', content);
  if (!post) {
    const heading = id ? 'Article Not Found' : 'Choose a Journal Article';
    detail.innerHTML = `<section class="section-padding"><div class="container text-center"><h1>${heading}</h1><p>Select an article from the journal to continue reading.</p><a href="blog.html" class="btn btn-gold">Back to Blog</a></div></section>`;
    detail.hidden = false;
    document.title = `${heading} — Natuva Gourmet`;
    setMeta('meta[name="description"]', 'Choose a Natuva journal article about nuts, gifting, or cooking.');
    setMeta('meta[property="og:title"]', document.title);
    setMeta('meta[property="og:description"]', 'Browse the Natuva journal.');
    document.querySelector('meta[property="og:image"]')?.remove();
    return;
  }
  const text = (id, value) => { document.getElementById(id).textContent = value; };
  document.title = `${post.title} — Natuva Gourmet`;
  setMeta('meta[name="description"]', post.excerpt);
  setMeta('meta[name="keywords"]', `${post.categoryLabel}, nuts, dry fruits, Natuva journal`);
  setMeta('meta[property="og:title"]', document.title);
  setMeta('meta[property="og:description"]', post.excerpt);
  setMeta('meta[property="og:image"]', post.mainImage);
  text('blog-title', post.title);
  text('blog-breadcrumb-title', post.title);
  text('blog-category', post.categoryLabel);
  text('blog-author', post.author);
  text('blog-introduction', post.introduction);
  document.getElementById('blog-detail-meta').innerHTML = metadata(post);
  const hero = document.getElementById('blog-hero');
  hero.src = post.mainImage; hero.srcset = srcset(post); hero.alt = post.mainAlt;
  hero.width = post.imageWidth || 1536; hero.height = post.imageHeight || 1024;

  const figure = photo => `<figure class="blog-supporting-figure"><img src="${photo.src}" alt="${escape(photo.alt)}" class="w-100 rounded-4" loading="lazy"><figcaption class="small text-muted mt-2">${escape(photo.caption)} <span>AI-generated illustration.</span></figcaption></figure>`;
  document.getElementById('blog-article-content').innerHTML = post.sections.map((section, index) => `<section id="article-section-${index}" class="blog-article-section"><h2 class="h3">${escape(section.title)}</h2>${section.paragraphs.map(paragraph => `<p>${escape(paragraph)}</p>`).join('')}</section>${index === 0 ? figure(post.gallery[0]) : index === 2 ? figure(post.gallery[1]) : ''}`).join('');
  document.getElementById('blog-toc').innerHTML = post.sections.map((section, index) => `<li><a href="#article-section-${index}">${escape(section.title)}</a></li>`).join('');
  const comparison = document.getElementById('blog-comparison');
  comparison.hidden = !post.comparison;
  if (post.comparison) {
    const table = post.comparison;
    comparison.innerHTML = `<h2 class="h3 mb-3">${escape(table.title)}</h2><div class="table-responsive rounded-4 border-theme p-3" tabindex="0" role="region" aria-label="${escape(table.title)}"><table class="table align-middle mb-0"><caption class="visually-hidden">${escape(table.title)}</caption><thead><tr>${table.columns.map(column => `<th scope="col">${escape(column)}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row => `<tr>${row.map((value, index) => index ? `<td>${escape(value)}</td>` : `<th scope="row">${escape(value)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  const sources = document.getElementById('blog-sources');
  sources.hidden = !post.sources.length;
  sources.innerHTML = '<h2 class="h4">Sources &amp; Further Reading</h2><ul>' + post.sources.map(([title, href]) => `<li><a href="${href}">${escape(title)}</a></li>`).join('') + '</ul>';
  const related = post.related.map(id => NATUVA_BLOGS.find(item => item.id === id)).filter(item => item && item.id !== post.id);
  document.getElementById('blog-related').innerHTML = related.map(item => card(item)).join('');
  document.getElementById('blog-sidebar-related').innerHTML = related.map(item => `<a href="${url(item)}" class="blog-sidebar-post"><img src="${item.mainImage}" alt="${escape(item.mainAlt)}" loading="lazy"><span>${escape(item.title)}<small class="d-block text-muted mt-1">${item.readingTime}</small></span></a>`).join('');
  text('blog-cta-title', post.cta.title); text('blog-cta-text', post.cta.text);
  const cta = document.getElementById('blog-cta-link'); cta.href = post.cta.href; cta.textContent = post.cta.label;
  detail.hidden = false;

  const shareUrl = new URL(location.href); shareUrl.search = ''; shareUrl.searchParams.set('id', post.id); shareUrl.hash = '';
  document.getElementById('blog-share-x').href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl.href)}`;
  document.getElementById('blog-share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.href)}`;
  document.getElementById('blog-copy-link').addEventListener('click', async () => {
    const status = document.getElementById('blog-share-status');
    try { await navigator.clipboard.writeText(shareUrl.href); status.textContent = 'Article link copied.'; }
    catch { status.textContent = `Copy this link: ${shareUrl.href}`; }
  });

  function initFilters() {
    const grid = document.getElementById('blog-grid');
    if (!grid) return;
    const buttons = [...document.querySelectorAll('[data-blog-category]')];
    const input = document.getElementById('blog-search-input');
    const params = new URLSearchParams(location.search);
    let category = buttons.some(button => button.dataset.blogCategory === params.get('category')) ? params.get('category') : 'all';
    if (input) input.value = params.get('q') || '';
    function filter(syncUrl = false) {
      const query = (input?.value || '').trim().toLowerCase();
      if (syncUrl) {
        const current = new URL(location.href);
        if (category === 'all') current.searchParams.delete('category');
        else current.searchParams.set('category', category);
        if (input.value.trim()) current.searchParams.set('q', input.value.trim());
        else current.searchParams.delete('q');
        history.replaceState(null, '', current);
      }
      let count = 0;
      grid.querySelectorAll('.blog-card-item').forEach(item => {
        const post = NATUVA_BLOGS.find(post => post.id === item.dataset.postId);
        const matches = (category === 'all' || post.category === category) && `${post.title} ${post.excerpt} ${post.categoryLabel}`.toLowerCase().includes(query);
        item.hidden = !matches;
        if (matches) count++;
      });
      buttons.forEach(button => {
        const active = button.dataset.blogCategory === category;
        button.classList.toggle('active', active); button.classList.toggle('btn-gold', active); button.classList.toggle('btn-outline-light', !active);
        button.setAttribute('aria-pressed', String(active));
      });
      document.getElementById('blog-empty').hidden = count !== 0;
      document.getElementById('blog-result-count').textContent = `${count} ${count === 1 ? 'article' : 'articles'}`;
    }
    buttons.forEach(button => button.addEventListener('click', () => { category = button.dataset.blogCategory; filter(true); }));
    input?.addEventListener('input', () => filter(true));
    document.getElementById('blog-reset-filters').addEventListener('click', () => { category = 'all'; input.value = ''; filter(true); });
    filter();
  }
})();
