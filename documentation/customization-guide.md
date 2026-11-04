# Natuva Gourmet — Customization Guide

Welcome to the **Natuva Gourmet** Dry Fruits & Nuts Store HTML Template customization documentation. This guide provides comprehensive, developer-friendly instructions for customizing the visual branding, color palettes, typography, product catalog, and responsive layouts.

---

## 1. Directory Structure

```text
DryNuts/
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css         # Bootstrap 5.3.3 core framework
│   │   ├── bootstrap-icons.min.css   # Bootstrap Icons CSS
│   │   ├── style.css                 # Master design system & custom properties
│   │   ├── responsive.css            # 320px, 375px, 425px, 768px, 1024px, 1440px rules
│   │   ├── rtl.css                   # Right-to-Left Arabic/Hebrew layout stylesheet
│   │   └── fonts/                    # Bootstrap Icons WOFF2/WOFF glyph files
│   ├── js/
│   │   ├── bootstrap.bundle.min.js   # Bootstrap JavaScript bundle
│   │   ├── theme.js                  # Dark/Light & LTR/RTL toggle engine with localStorage
│   │   ├── products-data.js          # Master catalog dataset (products, hampers, stories, blog)
│   │   ├── cart.js                   # Cart drawer, localStorage, coupon codes, checkout modal
│   │   ├── filters.js                # Product filtering, category pills, price slider, search
│   │   ├── forms.js                  # Frontend form validation with simulated async states
│   │   └── main.js                   # Sticky navbar, back-to-top, gallery switcher, pack picker
│   ├── images/
│   │   ├── brand/                    # Brand SVG logos & favicons
│   │   ├── hero/                     # Homepage 1 & 2 banner visuals
│   │   ├── categories/               # Category circular thumbnails
│   │   ├── products/                 # Product catalog images (WebP & JPG)
│   │   ├── gifts/                    # Luxury hamper photography
│   │   ├── sourcing/                 # Farm & harvest documentary imagery
│   │   ├── blog/                     # Editorial nutrition & culinary photography
│   │   ├── about/                    # Artisanal roastery & heritage images
│   │   ├── team/                     # Team member portraits
│   │   └── bulk/                     # B2B & wholesale packaging displays
│   └── data/
│       └── products.json             # Optional standalone JSON catalog
├── documentation/                    # Marketplace documentation files
├── index.html                        # Home 1: Premium Dry Fruits Store
├── home-2.html                       # Home 2: Organic & Luxury Gifting Concept
├── about.html                        # About Heritage & Quality Standards
├── products.html                     # Catalog with live filter engine
├── product-details.html              # Mammoth California Almonds details page
├── gift-boxes.html                   # Luxury gift hampers collection
├── gift-details.html                 # The Royal Heritage chest details page
├── bulk-orders.html                  # Wholesale B2B enquiry portal
├── projects.html                     # Sourcing & Farm Terroir stories
├── project-details.html              # Single sourcing documentary details
├── blog.html                         # Gourmet Journal & Nutrition Science
├── blog-details.html                 # Soaked vs. Roasted Almonds article
├── pricing.html                      # Retail, subscriptions, and bulk tiers
├── contact.html                      # Tasting Atelier & contact enquiry
├── robots.txt                        # Search engine crawling rules
└── sitemap.xml                       # XML sitemap with 14 canonical URLs
```

---

## 2. Brand Colors & Design Tokens

All colors, typography, borders, and shadows are configured as CSS custom properties inside [`assets/css/style.css`](file:///d:/Desktop/IQ-CRM%20projects/DryNuts/assets/css/style.css#L1-L60).

### Modifying the Color Palette

To change the primary green, roasted nut brown, or gold accent, update the root variables in `assets/css/style.css`:

```css
:root {
  /* Brand Master Colors */
  --color-forest: #183329;       /* Deep botanical forest green */
  --color-forest-dark: #0f221b;  /* Dark forest for headers and buttons */
  --color-pistachio: #5E8C6A;    /* Natural pistachio green */
  --color-pistachio-light: #EBF2EC; /* Light pistachio surface tint */
  --color-almond: #87532E;       /* Roasted almond nut brown */
  --color-gold: #C29B48;         /* Artisanal warm harvest gold */
  --color-cream: #FAF7F2;        /* Natural warm ivory surface */
  --color-cream-soft: #F4EFE6;   /* Secondary ivory tone */
  
  /* Active Theme Tokens (Light Mode Default) */
  --bg-body: #FAF7F2;
  --bg-surface: #FFFFFF;
  --text-main: #1D2D24;
  --text-muted: #66786D;
  --border-color: #E6DFD5;
}
```

### Dark Mode Tokens

When Dark Mode is activated, the `[data-bs-theme="dark"]` attribute is applied to the `<html>` root. Modify dark tokens in `assets/css/style.css`:

```css
[data-bs-theme="dark"] {
  --bg-body: #0C1613;
  --bg-surface: #13221C;
  --text-main: #EDE8DE;
  --text-muted: #9EAEA5;
  --border-color: #24382F;
}
```

---

## 3. Typography & Google Fonts

The template uses two Google Fonts:
1. **Playfair Display**: For editorial headlines, hero titles, and luxury typography.
2. **Plus Jakarta Sans**: For crisp, modern UI body copy, buttons, badges, and pricing.

To customize the fonts, edit the `<link>` tag in the `<head>` of each HTML file:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Then update font families in `assets/css/style.css`:

```css
:root {
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}
```

---

## 4. Product Catalog Customization

All products displayed on `products.html`, `index.html`, and `home-2.html` are dynamically rendered from [`assets/js/products-data.js`](file:///d:/Desktop/IQ-CRM%20projects/DryNuts/assets/js/products-data.js).

### Adding a New Product

Open `assets/js/products-data.js` and add an object to the `PRODUCTS_DATA` array:

```javascript
{
  id: "prod-17",
  slug: "turkish-dried-figs",
  name: "Sun-Dried Aegean Wild Figs",
  category: "dates-dried",
  badge: "Organic",
  rating: 4.9,
  reviewsCount: 76,
  price: 21.00,
  compareAtPrice: 26.00,
  weight: "400g / 14.1 oz",
  origin: "Aydın, Turkey",
  image: "assets/images/products/prod_dates_medjool.webp",
  description: "Soft, golden-amber wild figs sundried naturally under the Aegean sun.",
  nutrition: { calories: "249 kcal", protein: "3.3g", fat: "0.9g", fiber: "9.8g" },
  featured: true,
  bestSeller: true
}
```

### Changing Promo Codes

Active promo codes in the shopping cart drawer are defined in [`assets/js/cart.js`](file:///d:/Desktop/IQ-CRM%20projects/DryNuts/assets/js/cart.js):

```javascript
const VALID_PROMOS = {
  'GOURMET10': { type: 'percent', value: 10, label: '10% Harvest Discount' },
  'FREESHIP': { type: 'shipping', value: 0, label: 'Free Express Shipping' }
};
```

---

## 5. Free Shipping Threshold

The free shipping goal is set to **$75.00**. To adjust this amount, edit `assets/js/cart.js`:

```javascript
const FREE_SHIPPING_THRESHOLD = 75.00;
```
