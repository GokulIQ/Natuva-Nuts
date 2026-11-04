# Sourcing story implementation

The previous listing sent all six stories to an unparameterized URL, while the detail page contained a fixed almond article and unrelated images. Both pages now render from `assets/js/projects-data.js`, using `assets/js/projects.js`. No duplicate detail HTML pages were created.

## Routes and images

| Story ID | Existing hero retained from listing | New gallery assets |
| --- | --- | --- |
| california-almonds | sourcing-california-orchards.webp | california-almonds-02.webp, california-almonds-03.webp |
| malabar-cashews | sourcing-malabar-cashew.jpg | malabar-cashews-02.webp, malabar-cashews-03.webp |
| kerman-pistachios | sourcing-iranian-pistachio.jpg | kerman-pistachios-02.webp, kerman-pistachios-03.webp |
| pahalgam-walnuts | sourcing-kashmir-walnuts.jpg | pahalgam-walnuts-02.webp, pahalgam-walnuts-03.webp |
| jordan-medjool-dates | sourcing-jordan-medjool.jpg | jordan-medjool-dates-02.webp, jordan-medjool-dates-03.webp |
| nitrogen-packaging | sourcing-nitrogen-packaging.jpg | nitrogen-packaging-02.webp, nitrogen-packaging-03.webp |

Every route is `project-details.html?id=STORY_ID`. The hero and the first gallery image reference the same local file used by the listing. Existing hero files were preserved under `assets/images/sourcing/`. Secondary images are under `assets/images/project-details/`.

## Generated assets

Twelve separate images were created using the built-in image generation tool, following the imagegen skill. The complete final prompts are in [story-image-prompts.json](story-image-prompts.json). Originals are retained in `assets/images/project-details/sources/`.

Although 4K was requested, the tool returned 1536 × 1024 PNG originals. They were not upscaled or described as native 4K. The browser assets are WebP exports at the same resolution, encoded at quality 0.88. Actual dimensions and byte sizes are recorded in [story-image-assets.json](story-image-assets.json). All 12 have different file hashes, and their subjects were visually reviewed together with the six existing main images.

These are illustrative generated photographs, not evidence of particular suppliers, employees, farms, or manufacturing equipment. Secondary-image captions identify them as AI-generated illustrations.

## Content and behavior

- Six distinct titles, locations, categories, introductions, article sections, highlights, captions, and shopping destinations.
- Reading time calculated from each article at 200 words per minute.
- Browser title, description, keywords, Open Graph title/description/image, and plain breadcrumb update with the selected story.
- Related cards exclude the current story and link to complete, independently rendered details.
- Missing IDs display a story-selection state. Unknown IDs display “Story Not Found,” with no default story image. Both provide a link to the collection.
- Gallery supports thumbnails, previous/next, arrow keys (direction-aware), Home/End, and horizontal touch swipes. It does not autoplay. Image dimensions remain stable during changes.
- Header links explicitly identify the California story. Featured stories on `home-2.html` use the shared catalog. Sitemap entries identify all six routes.
- Header/footer branding, theme and RTL controls, sticky header, and existing card styling are preserved.

The old detail article's unsupported laboratory results, nutrient-retention percentages, named partner practices, and shelf-life guarantees were removed. Educational process descriptions were informed by these primary references and are linked in the relevant articles:

- [Almond Board of California: harvest](https://www.almonds.org/almond-industry/orchard-management/harvest/harvest-overview) and [almond lifecycle](https://www.almonds.org/why-almonds/growing-good/almond-lifecycle).
- [Global Cashew Council: processing](https://www.cashews.org/cashew-industry/processing/).
- [UC Davis: pistachio handling](https://postharvest.ucdavis.edu/produce-facts-sheets/pistachio).
- [UC Davis: walnut harvesting and processing](https://fruitsandnuts.ucdavis.edu/walnut-harvesting-processing) and [walnut quality](https://news.plantsciences.ucdavis.edu/news/crisosto-lampinen-walnuts).
- [UC Davis: modified-atmosphere packaging for nuts](https://postharvest.ucdavis.edu/ask-produce-docs/can-you-give-me-information-about-map-pistachios).

## Files changed

- `projects.html`, `project-details.html`, and `home-2.html`: shared listing/detail rendering and assets.
- `about.html`, `blog-details.html`, `blog.html`, `bulk-orders.html`, `contact.html`, `gift-boxes.html`, `gift-details.html`, `index.html`, `pricing.html`, `product-details.html`, `products.html`: California story header URL only.
- `assets/js/projects-data.js`, `assets/js/projects.js`, `assets/css/projects.css`: new story data, rendering/gallery behavior, and scoped layout rules.
- `assets/images/project-details/`: 12 optimized images and 12 retained source PNGs.
- `sitemap.xml`: six story URLs in place of the missing-ID detail URL.
- `scripts/verify-projects.cjs`: repeatable functional and responsive browser verification.
- This report and the two image JSON manifests.

## Verification

Completed on 2026-11-04 in Chromium: all checks passed, including 168 responsive/theme/direction combinations, all six complete story routes, 18 gallery image references, 12 distinct secondary-image hashes, related navigation and browser Back, mobile taps and swipes, and missing/unknown IDs. No JavaScript exceptions or failed local asset requests were recorded. Desktop hero and mobile gallery screenshots were also reviewed visually.

Run `node scripts/verify-projects.cjs` with Playwright installed. Optional environment variables `PLAYWRIGHT_MODULE` and `CHROMIUM_EXECUTABLE` point to an existing Playwright package and Chromium binary.

The suite checks all six routes, matching heroes, image decoding, distinct local secondary assets, article fields, metadata, gallery controls, related navigation, browser Back, featured home links, missing/invalid IDs, and touch interaction. Its responsive matrix covers the listing plus all six details at 320, 375, 425, 768, 1024, and 1440 CSS pixels in both themes and both directions (168 page/layout combinations).

The browser check runs on local `file://` URLs. External network requests are blocked during verification; local asset failures and JavaScript exceptions are collected. Font delivery from Google and external editorial links are therefore outside this automated check. Metadata is updated client-side; server-rendered social previews are outside this static-site implementation.
