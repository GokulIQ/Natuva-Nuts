/* Run with PLAYWRIGHT_MODULE and CHROMIUM_EXECUTABLE set if not installed locally. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = path.resolve(__dirname, '..');
const stories = vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/js/projects-data.js'), 'utf8') + '; NATUVA_PROJECTS');
assert.equal(new Set(stories.map(story => story.id)).size, 6);
const secondaryHashes = [];
for (const story of stories) {
  assert.equal(story.gallery[0].src, story.mainImage);
  assert.equal(new Set(story.gallery.map(photo => photo.src)).size, 3);
  assert(!story.relatedProjects.includes(story.id));
  story.gallery.forEach((photo, index) => {
    const buffer = fs.readFileSync(path.join(root, photo.src));
    if (index) secondaryHashes.push(crypto.createHash('sha256').update(buffer).digest('hex'));
  });
}
assert.equal(new Set(secondaryHashes).size, 12);

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {}) });
  try {
    const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    const errors = [];
    const failedLocalRequests = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('requestfailed', request => { if (request.url().startsWith('file:')) failedLocalRequests.push(request.url()); });
    await page.route(/^https?:/, route => route.abort());
    const go = file => page.goto(pathToFileURL(path.join(root, file.split('?')[0])).href + (file.includes('?') ? '?' + file.split('?')[1] : ''), { waitUntil: 'domcontentloaded' });
    const checkLayout = async label => {
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), label + ': page overflow');
      const outside = await page.locator('main h1, main h2, main p, .story-origin-tag, .project-gallery-toolbar, .project-gallery-image').evaluateAll(elements => elements.filter(el => {
        const box = el.getBoundingClientRect();
        return box.width && (box.left < -1 || box.right > innerWidth + 1);
      }).map(el => el.id || el.className));
      assert.deepEqual(outside, [], label + ': clipped content');
    };
    const responsive = async label => {
      for (const width of [320, 375, 425, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        for (const theme of ['light', 'dark']) {
          if (await page.locator('html').getAttribute('data-bs-theme') !== theme) await page.locator('.site-header .theme-toggle-btn:visible').click();
          for (const dir of ['ltr', 'rtl']) {
            if (await page.locator('html').getAttribute('dir') !== dir) await page.locator('.site-header .rtl-toggle-btn:visible').click();
            await checkLayout(`${label} ${width} ${theme} ${dir}`);
          }
        }
      }
    };

    await go('projects.html');
    assert.equal(await page.locator('#sourcing-stories-grid .story-card').count(), 6);
    for (const story of stories) {
      const card = page.locator(`[data-story-id="${story.id}"]`);
      assert.equal(await card.locator('img').getAttribute('src'), story.mainImage);
      assert.equal(await card.locator('.story-card-title').textContent(), story.title);
      for (const anchor of await card.locator('a').all()) assert.equal(await anchor.getAttribute('href'), `project-details.html?id=${story.id}`);
    }
    await responsive('listing');
    console.log('PASS listing: six unique routes and all responsive/theme/direction combinations.');

    for (const story of stories) {
      await go('projects.html');
      await page.locator(`[data-story-id="${story.id}"] .story-card-title a`).click();
      await page.waitForURL('**project-details.html?id=' + story.id);
      assert.equal(await page.locator('#project-title').textContent(), story.title);
      assert.equal(await page.locator('#project-location').textContent(), story.location);
      assert.equal(await page.locator('#project-breadcrumb-title').textContent(), story.title);
      assert.equal(await page.locator('#project-category').textContent(), story.category);
      assert.equal(await page.locator('#project-reading-time').textContent(), story.readingTime);
      assert.equal(await page.locator('#project-hero').getAttribute('src'), story.mainImage);
      await page.locator('#project-hero').evaluate(image => image.decode());
      assert.equal(await page.title(), `${story.title} — Natuva Gourmet`);
      assert.equal(await page.locator('meta[name="description"]').getAttribute('content'), story.description);
      assert.equal(await page.locator('meta[property="og:image"]').getAttribute('content'), story.mainImage);
      assert.equal(await page.locator('#project-introduction').textContent(), story.introduction);
      for (const section of story.sections) assert((await page.locator('main').textContent()).includes(section.text));
      for (let index = 0; index < story.gallery.length; index++) {
        await page.locator(`[data-slide="${index}"]`).click();
        assert.equal(await page.locator('#project-gallery-image').getAttribute('src'), story.gallery[index].src);
        await page.locator('#project-gallery-image').evaluate(image => image.decode());
        assert.equal(await page.locator(`[data-slide="${index}"]`).getAttribute('aria-pressed'), 'true');
      }
      await page.locator('#project-gallery-next').click();
      assert.equal(await page.locator('#project-gallery-image').getAttribute('src'), story.gallery[0].src);
      await page.locator('#project-gallery-previous').click();
      assert.equal(await page.locator('#project-gallery-image').getAttribute('src'), story.gallery[2].src);
      await page.locator('#project-gallery').focus();
      await page.keyboard.press('Home');
      await page.keyboard.press((await page.locator('html').getAttribute('dir')) === 'rtl' ? 'ArrowLeft' : 'ArrowRight');
      assert.equal(await page.locator('#project-gallery-image').getAttribute('src'), story.gallery[1].src);
      await page.keyboard.press('End');
      assert.equal(await page.locator('#project-gallery-image').getAttribute('src'), story.gallery[2].src);
      await responsive(story.id);
      const related = story.relatedProjects[0];
      assert.equal(await page.locator(`#project-related [data-story-id="${story.id}"]`).count(), 0);
      await page.locator(`#project-related [data-story-id="${related}"] .story-card-title a`).click();
      await page.waitForURL('**project-details.html?id=' + related);
      assert.equal(await page.locator('#project-title').textContent(), stories.find(item => item.id === related).title);
      await page.goBack({ waitUntil: 'domcontentloaded' });
      assert.equal(await page.locator('#project-title').textContent(), story.title);
      console.log('PASS ' + story.id + ': images, article, gallery controls, related navigation, back, and 24 layouts.');
    }

    await go('home-2.html');
    for (const storyId of ['california-almonds', 'malabar-cashews', 'jordan-medjool-dates']) {
      assert.equal(await page.locator(`[data-story-id="${storyId}"] .story-card-title a`).getAttribute('href'), `project-details.html?id=${storyId}`);
    }
    for (const [query, heading] of [['', 'Choose a Sourcing Story'], ['?id=unknown', 'Story Not Found'], ['?id=%3Cscript%3E', 'Story Not Found']]) {
      await go('project-details.html' + query);
      assert.equal(await page.locator('main h1').textContent(), heading);
      assert(await page.locator('main').isVisible());
      assert.equal(await page.locator('main img').count(), 0);
      await page.locator('main a').click();
      await page.waitForURL('**projects.html');
    }
    // Touch interaction on an actual touch-enabled page.
    const touch = await browser.newContext({ hasTouch: true, viewport: { width: 375, height: 812 } });
    const mobile = await touch.newPage();
    await mobile.route(/^https?:/, route => route.abort());
    await mobile.goto(pathToFileURL(path.join(root, 'project-details.html')).href + '?id=malabar-cashews');
    await mobile.locator('#project-gallery-image').evaluate(image => {
      const start = new Touch({ identifier: 1, target: image, clientX: 250, clientY: 200 });
      const end = new Touch({ identifier: 1, target: image, clientX: 100, clientY: 205 });
      image.dispatchEvent(new TouchEvent('touchstart', { touches: [start], bubbles: true }));
      image.dispatchEvent(new TouchEvent('touchend', { changedTouches: [end], bubbles: true }));
    });
    assert.equal(await mobile.locator('#project-gallery-image').getAttribute('src'), stories[1].gallery[1].src);
    await mobile.locator('[data-slide="2"]').tap();
    assert.equal(await mobile.locator('#project-gallery-image').getAttribute('src'), stories[1].gallery[2].src);
    await mobile.locator('#project-gallery').screenshot({ path: path.join(require('node:os').tmpdir(), 'natuva-project-gallery-mobile.png') });
    await touch.close();
    assert.deepEqual(errors, []);
    assert.deepEqual(failedLocalRequests, []);
    console.log('PASS missing/invalid IDs, home links, touch controls, all local image loads, and no JavaScript errors.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
