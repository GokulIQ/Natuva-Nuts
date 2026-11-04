/* Set PLAYWRIGHT_MODULE and CHROMIUM_EXECUTABLE when using an existing installation. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = path.resolve(__dirname, '..');
const source = name => fs.readFileSync(path.join(root, 'assets/js', name), 'utf8');
const gifts = vm.runInNewContext(source('pricing.js') + '\n' + source('products-data.js') + '; NATUVA_DATA.giftBoxes');
const localPath = src => path.join(root, decodeURIComponent(src));
const hashes = [];
for (const gift of gifts) {
  assert.equal(gift.gallery.length, 3);
  assert.equal(new Set(gift.gallery.map(photo => photo.role)).size, 3);
  const paths = [gift.image, ...gift.gallery.map(photo => photo.src)];
  assert.equal(new Set(paths).size, 4);
  for (const src of paths) hashes.push(crypto.createHash('sha256').update(fs.readFileSync(localPath(src))).digest('hex'));
  for (const photo of gift.gallery) {
    assert(fs.existsSync(localPath(photo.smallSrc)));
    assert(photo.alt && photo.caption && photo.width && photo.height);
  }
}
assert.equal(new Set(hashes).size, 24, 'Six distinct heroes and eighteen distinct supporting images');

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {}) });
  try {
    const page = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 1440, height: 1000 } });
    const errors = [], failed = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('requestfailed', request => {
      if (request.url().startsWith('file:') && request.failure()?.errorText !== 'net::ERR_ABORTED') failed.push(request.url());
    });
    await page.route(/^https?:/, route => route.abort());
    const go = file => page.goto(pathToFileURL(path.join(root, file.split('?')[0])).href + (file.includes('?') ? '?' + file.split('?')[1] : ''), { waitUntil: 'domcontentloaded' });
    const decode = async selector => {
      for (const img of await page.locator(selector).all()) await img.evaluate(image => { image.loading = 'eager'; return image.decode(); });
    };
    const responsive = async label => {
      for (const width of [320, 375, 425, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        for (const theme of ['light', 'dark']) {
          if (await page.locator('html').getAttribute('data-bs-theme') !== theme) await page.locator('.site-header .theme-toggle-btn:visible').click();
          for (const dir of ['ltr', 'rtl']) {
            if (await page.locator('html').getAttribute('dir') !== dir) await page.locator('.site-header .rtl-toggle-btn:visible').click();
            await page.mouse.move(0, 0);
            await page.waitForTimeout(200);
            const key = `${label} ${width} ${theme} ${dir}`;
            assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), key + ': page overflow');
            const clipped = await page.locator('main h1, main h2, main h3, main p, main figcaption, [data-gift-image], .gift-card-actions, #gift-detail-add').evaluateAll(elements => elements.filter(el => {
              const box = el.getBoundingClientRect();
              return box.width && (box.left < -1 || box.right > innerWidth + 1 || el.scrollWidth > el.clientWidth + 1);
            }).map(el => el.id || el.className));
            assert.deepEqual(clipped, [], key + ': clipped content');
            for (const img of await page.locator('.gift-supporting-image').all()) {
              const scale = await img.evaluate(el => { const b = el.getBoundingClientRect(); return Math.abs(b.width / b.height - el.width / el.height); });
              assert(scale < 0.01, key + ': supporting image aspect ratio');
            }
          }
        }
      }
      console.log(`PASS ${label}: 24 viewport/theme/direction combinations`);
    };

    await go('gift-boxes.html');
    for (const gift of gifts) {
      const card = page.locator('.gift-card').filter({ has: page.locator(`a[href="gift-details.html?id=${gift.id}"]`) });
      assert.equal(await card.count(), 1);
      assert.equal(await card.locator('img').getAttribute('src'), gift.image);
    }
    await decode('.gift-card img');
    await responsive('gift listing');

    for (const gift of gifts) {
      await go('gift-boxes.html');
      await page.locator(`.gift-card-title a[href="gift-details.html?id=${gift.id}"]`).click();
      await page.waitForURL('**gift-details.html?id=' + gift.id);
      assert.equal(await page.locator('#gift-detail-title').textContent(), gift.name);
      assert.equal(await page.locator('#gift-detail-hero').getAttribute('src'), gift.image);
      assert.equal(await page.locator('meta[property="og:image"]').getAttribute('content'), gift.image);
      assert.equal(await page.locator('#gift-detail-packaging').textContent(), gift.packaging);
      assert.equal(await page.locator('#gift-detail-dimensions').textContent(), gift.dimensions);
      assert.equal(await page.locator('#gift-detail-best-for').textContent(), gift.bestFor);
      assert.equal(await page.locator('[data-gift-image]').count(), 4);
      for (const photo of gift.gallery) {
        const img = page.locator(`[data-gift-image="${photo.role}"]`);
        assert.equal(await img.getAttribute('src'), photo.src);
        assert.equal(await img.getAttribute('alt'), photo.alt);
        assert.equal(await page.locator(`[data-gift-caption="${photo.role}"]`).textContent(), photo.caption);
      }
      for (const item of gift.inclusions) assert((await page.locator('#gift-detail-inclusions').textContent()).includes(item));
      await decode('main img');
      const rendered = await page.locator('main img').evaluateAll(images => images.map(image => image.getAttribute('src')));
      assert.equal(new Set(rendered).size, rendered.length, 'No duplicated image references in page content');
      assert.equal(rendered.filter(src => src === gift.image).length, 1, 'Hero shown only once');
      assert.equal(await page.locator('#gift-detail-hero').evaluate(img => getComputedStyle(img).objectFit), 'contain');
      for (const other of gifts.filter(item => item.id !== gift.id).slice(0, 3)) {
        const card = page.locator(`[data-related-gift="${other.id}"]`);
        assert.equal(await card.locator('img').getAttribute('src'), other.image);
        assert.equal(await card.locator('.gift-card-title').textContent(), other.name);
      }
      await responsive(gift.id);
      await page.evaluate(() => { NatuvaCart.clearCart(); document.querySelectorAll('.toast').forEach(el => el.remove()); });
      await page.locator('#detail-qty-input').fill('2');
      await page.locator('#gift-detail-add').click();
      const cart = await page.evaluate(() => NatuvaCart.getCalculations());
      assert.equal(cart.subtotal, gift.price * 2);
      assert.equal(await page.locator('.cart-item').getAttribute('data-id'), gift.id);
      await page.locator('.cart-drawer-close').click();
      const next = gifts.find(item => item.id !== gift.id);
      await page.locator(`#gift-detail-related [data-related-gift="${next.id}"] .gift-card-title a`).click();
      await page.waitForURL('**gift-details.html?id=' + next.id);
      assert.equal(await page.locator('#gift-detail-hero').getAttribute('src'), next.image);
      assert.equal(await page.locator('[data-gift-image="packaging"]').getAttribute('src'), next.gallery.find(photo => photo.role === 'packaging').src);
    }
    await go('gift-details.html?id=not-a-gift');
    assert.equal(await page.locator('main h1').textContent(), 'Gift not found');
    assert.equal(await page.locator('main img').count(), 0);
    await page.locator('main a').click();
    await page.waitForURL('**gift-boxes.html');
    await go('gift-details.html');
    assert.equal(await page.locator('#gift-detail-hero').getAttribute('src'), gifts[0].image);
    assert.deepEqual(errors, [], 'No JavaScript errors');
    assert.deepEqual(failed, [], 'No missing local assets');
    console.log('PASS 168 responsive combinations, all six image families, related navigation, cart identity/prices/quantity, invalid/default routes and local image decoding');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
