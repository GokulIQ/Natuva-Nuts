# Blog images, article mapping, and verification

Updated 4 November 2026.

All six journal entries now use one catalog in `assets/js/blog-data.js`. Home cards, the blog listing, featured article, detail pages, sidebars, and related posts read from that catalog. The listing and detail hero use the same `mainImage` asset and responsive variants. Existing rounded cards, typography classes, spacing, and hover effects are preserved.

## Routes and main images

All paths below are relative to the project root. Each route uses `blog-details.html?id=` followed by its slug.

| Article slug | Main image |
| --- | --- |
| soaked-vs-roasted-almonds | assets/images/blog/soaked-vs-roasted-almonds.webp |
| cashew-grades-explained | assets/images/blog/cashew-grades-explained.webp |
| luxury-dry-fruit-hampers | assets/images/blog/luxury-dry-fruit-hampers.webp |
| storing-dry-fruits | assets/images/blog/storing-dry-fruits.webp |
| walnuts-and-omega-3 | assets/images/blog/walnuts-and-omega-3.webp |
| baking-with-medjool-dates | assets/images/blog/baking-with-medjool-dates.webp |

Each main image also has a `-768.webp` responsive variant in the same directory.

## Supporting images

The three requested articles have six newly generated supporting photographs:

- assets/images/blog-details/soaked-almonds-closeup.webp
- assets/images/blog-details/roasted-almonds-bowl.webp
- assets/images/blog-details/cashew-size-comparison.webp
- assets/images/blog-details/cashew-grading-process.webp
- assets/images/blog-details/corporate-dry-fruit-gifts.webp
- assets/images/blog-details/wedding-nut-date-hamper.webp

The other three articles use relevant existing local photographs, two distinct images per article:

- Storage: assets/images/project-details/nitrogen-packaging-03.webp and nitrogen-packaging-02.webp
- Walnuts: assets/images/project-details/pahalgam-walnuts-02.webp and pahalgam-walnuts-03.webp
- Dates: assets/images/project-details/jordan-medjool-dates-02.webp and jordan-medjool-dates-03.webp

All 18 main/supporting blog image files have distinct content hashes. Intentional reuse of an article's main photo on its cards, hero, and related links keeps the mapping consistent. Old unrelated source files were preserved but removed from the journal's rendering paths.

## Image provenance and resolution

Twelve new selected photographs were generated using OpenAI image generation: six main photographs and six supporting photographs. They are illustrative images, not photographs of a certified product lot or actual facility.

The requested native 4K output was not returned by the tool. **All selected new source images are 1672 × 941 pixels.** They were exported at their native dimensions as optimized WebP, with 768-pixel-wide main-image variants. Images were not upscaled and are not described as 4K.

- Original PNG files: `assets/images/blog-details/sources/`.
- Exact prompts and source paths: [blog-image-prompts.json](blog-image-prompts.json).
- Selected optimized image paths, dimensions, and file sizes: [blog-image-assets.json](blog-image-assets.json).
- The three selected cashew sources end in `-refined.png`; the earlier versions remain archived with their previous prompts in the manifest.

## Article behavior

- Six unique articles, titles, summaries, dates, categories, reading times, introductions, sections, and calls to action.
- Two relevant supporting images per article, descriptive alt text, and captions identifying generated illustrations.
- Almond and cashew comparison tables with contained scrolling on narrow screens.
- Editorial byline replaces the previous unsupported specialist attribution.
- Health claims are qualified; primary research and authoritative references are linked where relevant. The walnut article no longer promises brain protection.
- Related posts and sidebar thumbnails resolve to their own matching articles.
- Category and search filters work together; URL parameters preserve selections on reload/back navigation. Empty results have a reset action.
- Legacy article IDs remain supported. Missing IDs show a selection prompt; invalid IDs show Article Not Found. Neither silently loads the almond article.
- Browser title, description, Open Graph fields, and plain breadcrumb update for the selected article. The sitemap contains all six routes.
- Article rendering works with local `file://` previews without fetch requests.

Metadata is populated by JavaScript in this frontend-only implementation. Social crawlers that do not execute JavaScript need prerendering/server-rendered metadata for article-specific previews on a deployed site.

## Files modified or added

- index.html
- blog.html
- blog-details.html
- sitemap.xml
- assets/js/blog-data.js (new central catalog)
- assets/js/blog.js (new renderer, filters, routing)
- assets/js/products-data.js (removes the duplicate stale blog catalog; journal pages populate the existing catalog API)
- assets/js/main.js (removes the superseded blog filtering code)
- assets/css/blog.css (new responsive article and filtering styles)
- scripts/verify-blogs.cjs (new browser/data checks)
- documentation/blog-journal-update.md
- documentation/blog-image-prompts.json
- documentation/blog-image-assets.json
- documentation/asset-licenses.md (generated journal asset provenance)
- Image assets listed above, their six responsive variants, and original PNG sources listed in the prompt manifest.

## Verification results

Real headless Chromium testing passed **192 layout combinations**: home journal cards, the blog listing, and all six articles at 320, 375, 425, 768, 1024, and 1440 pixels; each in light/dark mode and LTR/RTL.

Verified:

- Matching listing/hero paths, article text, titles, metadata, dates, and supporting images.
- Correct related/sidebar navigation, legacy routes, back links, invalid and missing IDs.
- Category filters, search, reload persistence, empty results, and reset.
- Image decoding from local files, with no missing local assets or JavaScript errors.
- No horizontal page overflow or clipped article/sidebar/card content.
- Consistent card heights and aligned Read Article links within each row.
- Table-of-contents anchors clear the sticky header.
- Visual review of generated images, desktop cards, dark article header, mobile article header, and mobile sidebar.
- Computed contrast for article text, metadata, tables, sidebars, and links: minimum 6.27:1 in light mode and 5.99:1 in dark mode among sampled elements. Card title/CTA hover checks also exceeded 4.5:1.
- JavaScript syntax checks and the existing pricing/cart regression checks passed (45 product pack prices and six hampers).

The automated matrix deliberately blocks external requests to verify local functionality. The environment did not load Google Fonts in the separate network-enabled check, so the browser screenshots/layout checks use the site's font fallbacks. Existing Google Font declarations are unchanged.

Run `node scripts/verify-blogs.cjs` with Playwright installed, or set `PLAYWRIGHT_MODULE` and `CHROMIUM_EXECUTABLE` to available local installations. Run `node scripts/verify-pricing.cjs` for the existing pricing checks.
