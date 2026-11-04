# Gift detail image mapping

Updated 4 November 2026.

The shared detail template previously assigned `gift.image` to every `[data-gift-image]` element. Each page therefore repeated its hero in the packaging and occasion sections. The renderer now selects images by role from the selected gift's catalog entry.

## Image structure

Each of the six gift entries in `assets/js/products-data.js` has:

- `image`: the existing listing/hero image, preserved at its original path.
- `heroAlt`, `imageWidth`, and `imageHeight`: hero description and intrinsic dimensions.
- `gallery`: three supporting image objects with `role`, `src`, `smallSrc`, `alt`, `caption`, `width`, and `height`.

The supporting roles are `contents`, `packaging`, and `occasion`. These render once each in their corresponding sections. The hero is not a member of the supporting gallery. Related cards exclude the current gift and use their own catalog images and routes. There are no duplicated hero thumbnails or additional slider copies.

## Gift families

| Gift route ID | Preserved hero path under assets/images/gifts/ | Supporting family |
| --- | --- | --- |
| gift-royal-heritage-box | gift-royal-heritage-box.webp | Navy and gold chest, divided assortment, festive table |
| gift-festive-brass-tins | gift-festive-brass-tins.webp | Engraved brass detail, three open jars, anniversary table |
| gift-imperial-leatherette-hamper | gift-imperial-leatherette-hamper.webp | Green stitching and hardware, trunk contents, executive setting |
| gift-wedding-velvet-trays | Noor%20Velvet%20Keepsake%20Tray.jpg | Clear divided tray, nut and dried-fruit assortment, wedding table |
| gift-corporate-artisan-chest | Executive%20Cedarwood%20Gifting%20Chest.jpg | Natural wood detail, assortment and canisters, corporate presentation |
| gift-wellness-duo-keepsake | The%20Vitality%20Keepsake%20Duo.jpg | Gold tin detail, walnut/date duo, housewarming presentation |

For each route ID, the new files under `assets/images/gift-details/` are:

- `{id}-close.webp` for Packaging & Craftsmanship.
- `{id}-contents.webp` for What's Included.
- `{id}-occasion.webp` for Made for the Occasion.
- A `-768.webp` variant of each supporting file for smaller screens.

Original generated PNGs are retained in `assets/images/gift-details/sources/`. The [prompt manifest](gift-image-prompts.json) records the exact prompts, reference images, and source files. The [asset manifest](gift-image-assets.json) records selected optimized paths, native dimensions, and file sizes.

The new photographs were created with the built-in OpenAI image generation tool. Native output is **1536 × 1024 pixels**, not 4K. Images are delivered as optimized WebP at native resolution plus 768 × 512 responsive variants; no upscaling is represented as native detail.

## Content and presentation

Original gift names, prices, listed inclusions, dimensions, and occasion information remain intact. Older packaging copy describing pink velvet, an emerald inlay, or a kraft box did not match the chosen reference photos. That descriptive copy and the corresponding listing summaries now describe the visible presentation materials.

The existing user-selected heroes were preserved, including photos whose assortments differ from the itemized catalog. New contents illustrations follow the listed selection in the same packaging family. Generated images are presentation concepts rather than documentary verification of inventory or physical packaging. Product specifications still come from the supplied catalog.

The original page sections, theme system, typography, header/footer, quantity controls, and calls to action remain. A contents image was added beside the inclusion cards. Supporting images use their native aspect ratios, responsive WebP sources, lazy loading, and individual alt text. The hero uses `object-fit: contain` so portrait reference photos retain their complete contents. Related card actions use the existing responsive gift button styling.

## Files changed

- `gift-details.html`: separate hero/contents/packaging/occasion image slots, captions, contents layout, and a no-JavaScript message.
- `gift-boxes.html`: packaging summaries aligned with the preserved photos.
- `index.html`: royal-chest summary aligned with its preserved photo.
- `assets/js/products-data.js`: six image families and updated packaging descriptions.
- `assets/js/gift-details.js`: image role mapping, captions, dimensions, responsive sources, related card attributes, and invalid-route metadata.
- `assets/css/gift-details.css`: image proportions and narrow-screen details styling.
- `scripts/verify-gifts.cjs`: data, browser, navigation, image, responsive, and cart checks.
- `documentation/gift-image-prompts.json`, `documentation/gift-image-assets.json`, this report, and generated image files listed in the manifests.
- `documentation/asset-licenses.md`: provenance of the new generated illustrations.

## Verification

Passed **168 responsive combinations** in headless Chromium: the gift listing and all six detail pages, at all six requested widths, in both themes and directions. Verified local image decoding, four different product visuals per detail page, no repeated hero in the page content, correct related images/routes, alt text and captions, natural supporting-image proportions, an uncropped hero, and no clipped content or horizontal overflow.

Each gift's Add to Bag action was checked with quantity two for the correct gift ID and INR subtotal. Invalid/default routes passed. There were no JavaScript errors or missing local image files. The existing pricing/cart regression suite also passed (45 pack prices and six hampers). Desktop brass packaging and mobile contents layouts were visually reviewed, together with all eighteen supporting images.

Three close-up images were refined after the layout matrix to emphasize packaging detail. Their filenames and dimensions stayed unchanged; final asset decoding and uniqueness checks were repeated after replacement. The earlier source PNGs and prompts remain recorded as previous versions in the prompt manifest.

Run `node scripts/verify-gifts.cjs` with Playwright installed, or set `PLAYWRIGHT_MODULE` and `CHROMIUM_EXECUTABLE` to local installations. The checks cover all six pages and the gift listing at 320, 375, 425, 768, 1024, and 1440 pixels, in light/dark themes and LTR/RTL, plus unique content hashes, local image decoding, hero/listing agreement, correct role mapping, related navigation, and cart product/price/quantity behavior.

The browser suite blocks external resources to verify local operation; layout checks therefore use the site's font fallbacks when Google Fonts are unavailable.
