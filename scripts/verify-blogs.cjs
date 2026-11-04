/* Run with PLAYWRIGHT_MODULE and CHROMIUM_EXECUTABLE if not installed locally. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = path.resolve(__dirname, '..');
const posts = vm.runInNewContext('const NATUVA_DATA = {};\n' + fs.readFileSync(path.join(root, 'assets/js/blog-data.js'), 'utf8') + '; NATUVA_BLOGS');
assert.equal(new Set(posts.map(p => p.id)).size, 6);
const imageHashes = [];
for (const post of posts) {
  assert.equal(post.gallery.length, 2);
  assert(post.sections.length >= 4);
  assert(!post.related.includes(post.id));
  for (const src of [post.mainImage, ...post.gallery.map(photo => photo.src)]) {
    imageHashes.push(crypto.createHash('sha256').update(fs.readFileSync(path.join(root, src))).digest('hex'));
  }
  assert(fs.existsSync(path.join(root, post.mainImage.replace('.webp', '-768.webp'))));
}
assert.equal(new Set(imageHashes).size, 18, 'Every article has three distinct image assets');

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [], failedLocal = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('requestfailed', request => {
      const reason = request.failure()?.errorText;
      // Navigation/resizing can cancel an in-flight responsive image rendition.
      if (request.url().startsWith('file:') && reason !== 'net::ERR_ABORTED') failedLocal.push({ url: request.url(), reason });
    });
    await page.route(/^https?:/, route => route.abort());
    const go = file => page.goto(pathToFileURL(path.join(root, file.split('?')[0])).href + (file.includes('?') ? '?' + file.split('?')[1] : ''), { waitUntil: 'domcontentloaded' });
    const imagesLoad = async selector => {
      for (const img of await page.locator(selector).all()) await img.evaluate(image => { image.loading = 'eager'; return image.decode(); });
    };
    const theme = async value => { if (await page.locator('html').getAttribute('data-bs-theme') !== value) await page.locator('.site-header .theme-toggle-btn:visible').click(); };
    const direction = async value => { if (await page.locator('html').getAttribute('dir') !== value) await page.locator('.site-header .rtl-toggle-btn:visible').click(); };
    const responsive = async label => {
      for (const width of [320, 375, 425, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        for (const mode of ['light', 'dark']) {
          await theme(mode);
          for (const dir of ['ltr', 'rtl']) {
            await direction(dir);
            await page.mouse.move(0, 0);
            await page.waitForTimeout(100);
            const key = `${label} ${width}px ${mode} ${dir}`;
            assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), key + ': overflow');
            const outside = await page.locator('.blog-card, .blog-detail-title, .blog-article-section, .blog-detail-sidebar, .blog-detail-hero, .blog-supporting-figure').evaluateAll(elements => elements.filter(el => {
              const b = el.getBoundingClientRect(); return b.width && (b.left < -1 || b.right > innerWidth + 1);
            }).map(el => el.className));
            assert.deepEqual(outside, [], key + ': clipped content');
            const alignment = await page.locator('.blog-card-item:not([hidden])').evaluateAll(items => {
              const rows = new Map();
              for (const item of items) {
                const b = item.getBoundingClientRect(), card = item.querySelector('.blog-card').getBoundingClientRect();
                const link = item.querySelector('.blog-card-body > a:last-child').getBoundingClientRect();
                const key = Math.round(b.top); const row = rows.get(key) || []; row.push({height: card.height, link: link.bottom}); rows.set(key, row);
              }
              return [...rows.values()].every(row => Math.max(...row.map(r=>r.height))-Math.min(...row.map(r=>r.height)) < 2 && Math.max(...row.map(r=>r.link))-Math.min(...row.map(r=>r.link)) < 2);
            });
            assert(alignment, key + ': card/CTA alignment');
          }
        }
      }
      console.log(`PASS ${label}: 24 viewport/theme/direction combinations`);
    };

    await go('index.html');
    assert.equal(await page.locator('#home-blog-grid .blog-card').count(), 3);
    for (const post of posts.slice(0, 3)) assert.equal(await page.locator(`#home-blog-grid [data-post-id="${post.id}"] img`).getAttribute('src'), post.mainImage);
    await imagesLoad('#home-blog-grid img');
    await responsive('home journal cards');

    await go('blog.html');
    assert.equal(await page.locator('#blog-grid .blog-card').count(), 6);
    for (const post of posts) {
      const card = page.locator(`#blog-grid [data-post-id="${post.id}"]`);
      assert.equal(await card.locator('img').getAttribute('src'), post.mainImage);
      assert.equal(await card.locator('.blog-card-title').textContent(), post.title);
      assert.equal(await card.locator('time').getAttribute('datetime'), post.date);
      for (const anchor of await card.locator('a').all()) assert.equal(await anchor.getAttribute('href'), `blog-details.html?id=${post.id}`);
    }
    await imagesLoad('#blog-grid img, #blog-featured img');
    await responsive('blog listing');
    for (const [cat, count] of [['nutrition',2],['guides',2],['gifting',1],['recipes',1],['all',6]]) {
      await page.locator(`[data-blog-category="${cat}"]`).click();
      assert.equal(await page.locator('#blog-grid .blog-card-item:visible').count(), count);
    }
    await page.locator('#blog-search-input').fill('cashew');
    assert.equal(await page.locator('#blog-grid .blog-card-item:visible').count(), 1);
    await page.reload({waitUntil:'domcontentloaded'});
    assert.equal(await page.locator('#blog-grid .blog-card-item:visible').count(), 1);
    await page.locator('#blog-search-input').fill('no-such-article');
    assert(await page.locator('#blog-empty').isVisible());
    await page.locator('#blog-reset-filters').click();
    assert.equal(await page.locator('#blog-grid .blog-card-item:visible').count(), 6);
    console.log('PASS category/search filters, saved filter URL, empty state and reset');

    for (const post of posts) {
      await go('blog.html');
      await page.locator(`#blog-grid [data-post-id="${post.id}"] .blog-card-body > a:last-child`).click();
      await page.waitForURL('**blog-details.html?id=' + post.id);
      assert.equal(await page.locator('#blog-title').textContent(), post.title);
      assert.equal(await page.locator('#blog-breadcrumb-title').textContent(), post.title);
      assert.equal(await page.locator('#blog-category').textContent(), post.categoryLabel);
      assert.equal(await page.locator('#blog-hero').getAttribute('src'), post.mainImage);
      assert.equal(await page.locator('#blog-hero').getAttribute('alt'), post.mainAlt);
      assert((await page.title()).startsWith(post.title));
      assert.equal(await page.locator('meta[name="description"]').getAttribute('content'), post.excerpt);
      assert.equal(await page.locator('meta[property="og:image"]').getAttribute('content'), post.mainImage);
      assert.equal(await page.locator('#blog-detail-meta time').getAttribute('datetime'), post.date);
      assert.equal(await page.locator('#blog-author').textContent(), post.author);
      const body = await page.locator('#blog-article-content').textContent();
      for (const section of post.sections) for (const paragraph of section.paragraphs) assert(body.includes(paragraph));
      assert.equal(await page.locator('.blog-supporting-figure img').count(), 2);
      for (let i=0; i<2; i++) assert.equal(await page.locator('.blog-supporting-figure img').nth(i).getAttribute('src'), post.gallery[i].src);
      for (const id of post.related) {
        const other = posts.find(item => item.id === id);
        assert.equal(await page.locator(`#blog-related [data-post-id="${id}"] img`).getAttribute('src'), other.mainImage);
        assert.equal(await page.locator(`#blog-related [data-post-id="${id}"] .blog-card-title`).textContent(), other.title);
      }
      await imagesLoad('#blog-detail img');
      await page.locator('#blog-toc a').first().click();
      assert((await page.locator('#article-section-0').boundingBox()).y >= 80, 'TOC target clears sticky header');
      await responsive(post.id);
      const other = post.related[0];
      await page.locator('#blog-sidebar-related a').first().click();
      await page.waitForURL('**blog-details.html?id=' + other);
      assert.equal(await page.locator('#blog-title').textContent(), posts.find(p=>p.id===other).title);
      await page.locator('.blog-article-copy a[href="blog.html"]').click();
      await page.waitForURL('**blog.html');
    }
    for (const post of posts) {
      await go('blog-details.html?id=' + post.legacyId);
      assert.equal(await page.locator('#blog-title').textContent(), post.title);
    }
    for (const suffix of ['', '?id=does-not-exist']) {
      await go('blog-details.html' + suffix);
      assert.equal(await page.locator('#blog-detail h1').textContent(), suffix ? 'Article Not Found' : 'Choose a Journal Article');
      await page.locator('#blog-detail a').click();
      await page.waitForURL('**blog.html');
    }
    assert.deepEqual(errors, [], 'JavaScript console errors');
    assert.deepEqual(failedLocal, [], 'Missing local assets');
    console.log('PASS six articles, legacy links, related navigation, invalid/missing IDs, local image loading and no JavaScript errors');
    console.log('PASS total: 192 responsive combinations');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
