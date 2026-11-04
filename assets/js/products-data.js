/**
 * NATUVA GOURMET — PRODUCT & CONTENT REPOSITORY
 * Static client-side dataset ensuring seamless execution under file:// protocol
 * and static server deployments.
 */

// All price and originalPrice values below are INR (see pricing.js).
const NATUVA_DATA = {
  products: [
    {
      id: "prod-almonds-california",
      name: "Mammoth California Roasted Almonds",
      category: "almonds",
      categoryLabel: "Almonds",
      badge: "Bestseller",
      badgeType: "premium",
      price: 899.00,
      originalPrice: null,
      rating: 4.9,
      reviewsCount: 142,
      weight: "500g",
      packSizes: [
        { size: "250g", price: 450.00, originalPrice: null },
        { size: "500g", price: 899.00, originalPrice: null },
        { size: "1kg", price: 1798.00, originalPrice: null }
      ],
      image: "assets/images/products/prod-almonds-california.webp",
      gallery: [
        "assets/images/products/prod-almonds-california.webp",
        "assets/images/products/gal-almond-2.webp",
        "assets/images/products/gal-almond-3.webp",
        "assets/images/products/gal-almond-4.webp"
      ],
      description: "Handpicked Mammoth Nonpareil California almonds gently slow-roasted in small batches to preserve natural crunch and nutty aroma. Seasoned with hand-harvested sea salt.",
      origin: "Central Valley, California, USA",
      roastLevel: "Medium Artisan Roast",
      shelfLife: "9 Months from packaging",
      ingredients: "100% California Almonds, Mineral Sea Salt (0.5%)",
      nutrition: {
        serving: "30g",
        calories: "172 kcal",
        protein: "6.2g",
        healthyFats: "14.8g",
        carbs: "5.8g",
        fiber: "3.5g",
        vitaminE: "7.3mg (48% DV)"
      },
      stockStatus: "In Stock"
    },
    {
      id: "prod-almonds-mamra",
      name: "Organic Iranian Mamra Almonds",
      category: "almonds",
      categoryLabel: "Almonds",
      badge: "Rare Harvest",
      badgeType: "organic",
      price: 3389.00,
      originalPrice: null,
      rating: 5.0,
      reviewsCount: 98,
      weight: "500g",
      packSizes: [
        { size: "250g", price: 1695.00 },
        { size: "500g", price: 3389.00 },
        { size: "1kg", price: 6520.00 }
      ],
      image: "assets/images/products/prod-almonds-mamra.webp",
      gallery: [
        "assets/images/products/prod-almonds-mamra.webp",
        "assets/images/products/gal-almond-3.webp",
        "assets/images/products/gal-almond-2.webp",
        "assets/images/products/gal-almond-4.webp"
      ],
      description: "The pinnacle of nutrition and taste. Iranian Mamra almonds contain up to 50% natural almond oil and zero cholesterol, prized for brain health and ayurvedic wellness.",
      origin: "Chaharmahal, Iran",
      roastLevel: "Unroasted Raw Whole",
      shelfLife: "12 Months from harvest",
      ingredients: "100% Pure Organic Mamra Almonds",
      nutrition: {
        serving: "30g",
        calories: "185 kcal",
        protein: "6.8g",
        healthyFats: "16.2g",
        carbs: "4.9g",
        fiber: "3.8g",
        vitaminE: "8.5mg (56% DV)"
      },
      stockStatus: "In Stock"
    },
    {
      id: "prod-cashews-w180-jumbo",
      name: "King Jumbo W180 Cashews",
      category: "cashews",
      categoryLabel: "Cashews",
      badge: "King Size",
      badgeType: "premium",
      price: 1009.00,
      originalPrice: null,
      rating: 4.95,
      reviewsCount: 168,
      weight: "500g",
      packSizes: [
        { size: "250g", price: 505.00 },
        { size: "500g", price: 1009.00 },
        { size: "1kg", price: 1889.00 }
      ],
      image: "assets/images/products/prod-cashews-w180-jumbo.webp",
      gallery: [
        "assets/images/products/prod-cashews-w180-jumbo.webp",
        "assets/images/products/gal-cashew-2.webp",
        "assets/images/products/gal-cashew-3.webp",
        "assets/images/products/gal-cashew-4.webp"
      ],
      description: "Renowned as the 'King of Cashews', W180 grade nuts feature only 160-180 kernels per pound. Naturally sweet, buttery texture with magnificent crescent curvature.",
      origin: "Malabar Coast, Kerala, India",
      roastLevel: "Raw Sun-Dried",
      shelfLife: "9 Months from packaging",
      ingredients: "100% Jumbo Whole Cashew Kernels",
      nutrition: {
        serving: "30g",
        calories: "168 kcal",
        protein: "5.4g",
        healthyFats: "13.6g",
        carbs: "8.9g",
        fiber: "1.2g",
        iron: "1.9mg (11% DV)"
      },
      stockStatus: "In Stock"
    },
    {
      id: "prod-cashews-roasted-salted",
      name: "Slow-Roasted Sea Salt Cashews",
      category: "cashews",
      categoryLabel: "Cashews",
      badge: "Top Rated",
      badgeType: "sale",
      price: 925.00,
      originalPrice: null,
      rating: 4.88,
      reviewsCount: 114,
      weight: "500g",
      packSizes: [
        { size: "250g", price: 463.00 },
        { size: "500g", price: 925.00 },
        { size: "1kg", price: 1850.00 }
      ],
      image: "assets/images/products/prod-cashews-roasted-salted.webp",
      gallery: [
        "assets/images/products/prod-cashews-roasted-salted.webp",
        "assets/images/products/gal-cashew-3.webp",
        "assets/images/products/gal-cashew-2.webp",
        "assets/images/products/gal-cashew-4.webp"
      ],
      description: "Artisanally slow-roasted in virgin coconut oil and dusted with pink Himalayan rock salt. Delivers an extraordinarily crisp exterior with a velvety melting center.",
      origin: "Goa & Konkan Coast",
      roastLevel: "Golden Batch Roast",
      shelfLife: "8 Months from packaging",
      ingredients: "Cashews, Pure Coconut Oil (1%), Himalayan Pink Salt (0.8%)",
      nutrition: {
        serving: "30g",
        calories: "174 kcal",
        protein: "5.2g",
        healthyFats: "14.1g",
        carbs: "8.5g",
        fiber: "1.1g",
        magnesium: "83mg (21% DV)"
      },
      stockStatus: "In Stock"
    },
    {
      id: "prod-pistachios-roasted-salt",
      name: "Roasted & Salted Iranian Pistachios",
      category: "pistachios",
      categoryLabel: "Pistachios",
      badge: "Artisan Blend",
      badgeType: "premium",
      price: 1098.00,
      originalPrice: null,
      rating: 4.92,
      reviewsCount: 205,
      weight: "500g",
      packSizes: [
        { size: "250g", price: 549.00 },
        { size: "500g", price: 1098.00 },
        { size: "1kg", price: 2196.00 }
      ],
      image: "assets/images/products/prod-pistachios-roasted-salt.webp",
      gallery: [
        "assets/images/products/prod-pistachios-roasted-salt.webp",
        "assets/images/products/gal-pistachio-2.webp",
        "assets/images/products/gal-pistachio-3.webp",
        "assets/images/products/gal-pistachio-4.webp"
      ],
      description: "Premium Akbari long pistachios with natural smile cracks for effortless shelling. Lightly wood-fire roasted with sea salt and a faint whisper of Persian saffron.",
      origin: "Rafsanjan & Kerman, Iran",
      roastLevel: "Wood-Fired Roast",
      shelfLife: "9 Months",
      ingredients: "In-Shell Pistachios, Mineral Salt, Saffron Infusion (0.1%)",
      nutrition: {
        serving: "30g",
        calories: "165 kcal",
        protein: "6.0g",
        healthyFats: "13.2g",
        carbs: "8.1g",
        fiber: "3.0g",
        potassium: "290mg (8% DV)"
      },
      stockStatus: "In Stock"
    },
    {
      id: "prod-pistachios-shelled-green",
      name: "Emerald Shelled Pistachio Kernels",
      category: "pistachios",
      categoryLabel: "Pistachios",
      badge: "Culinary Grade",
      badgeType: "organic",
      price: 1796.00,
      originalPrice: null,
      rating: 4.98,
      reviewsCount: 82,
      weight: "400g",
      packSizes: [
        { size: "200g", price: 898.00 },
        { size: "400g", price: 1796.00 },
        { size: "800g", price: 3592.00 }
      ],
      image: "assets/images/products/prod-pistachios-shelled-green.webp",
      gallery: [
        "assets/images/products/prod-pistachios-shelled-green.webp",
        "assets/images/products/gal-pistachio-3.webp",
        "assets/images/products/prod-pistachios-roasted-salt.webp",
        "assets/images/products/gal-pistachio-4.webp"
      ],
      description: "Harvested early before full shell maturity to lock in the vivid emerald green pigmentation and delicate sweet floral flavor. Ideal for high-end patisserie, gelatos, and pestos.",
      origin: "Bronte & Anatolia",
      roastLevel: "Raw Shelled",
      shelfLife: "6 Months refrigerated",
      ingredients: "100% Raw Peeled Pistachio Kernels",
      nutrition: {
        serving: "30g",
        calories: "170 kcal",
        protein: "6.3g",
        healthyFats: "14.0g",
        carbs: "7.8g",
        fiber: "3.2g",
        vitaminB6: "0.5mg (25% DV)"
      },
      stockStatus: "In Stock"
    },
    {
      id: "prod-walnuts-kashmiri-inshell",
      name: "Kashmiri Snow-White Walnut Halves",
      category: "walnuts",
      categoryLabel: "Walnuts",
      badge: "Superfood",
      badgeType: "organic",
      price: 805.00,
      originalPrice: null,
      rating: 4.89,
      reviewsCount: 130,
      weight: "500g",
      packSizes: [
        { size: "250g", price: 403.00 },
        { size: "500g", price: 805.00 },
        { size: "1kg", price: 1610.00 }
      ],
      image: "assets/images/products/prod-walnuts-kashmiri-inshell.webp",
      gallery: [
        "assets/images/products/prod-walnuts-kashmiri-inshell.webp",
        "assets/images/products/gal-walnut-2.webp",
        "assets/images/products/gal-walnut-3.webp",
        "assets/images/products/gal-walnut-4.webp"
      ],
      description: "Grown at high altitudes in Kashmir's pristine Pir Panjal mountain range. These butterfly-shaped halves boast light ivory color, crisp snap, and rich ALA plant omega-3 fatty acids.",
      origin: "Pahalgam Valley, Kashmir",
      roastLevel: "Raw Cold-Cracked",
      shelfLife: "8 Months nitrogen sealed",
      ingredients: "100% Natural Kashmiri Walnut Kernels",
      nutrition: {
        serving: "30g",
        calories: "196 kcal",
        protein: "4.6g",
        healthyFats: "19.5g",
        carbs: "3.9g",
        fiber: "2.1g",
        omega3: "2.7g (Highest among all nuts)"
      },
      stockStatus: "In Stock"
    },
    {
      id: "prod-walnuts-chilean-halves",
      name: "Chilean Extra-Light Walnut Kernels",
      category: "walnuts",
      categoryLabel: "Walnuts",
      badge: "Mild Taste",
      badgeType: "premium",
      price: 769.00,
      originalPrice: null,
      rating: 4.84,
      reviewsCount: 76,
      weight: "500g",
      packSizes: [
        { size: "250g", price: 385.00 },
        { size: "500g", price: 769.00 },
        { size: "1kg", price: 1538.00 }
      ],
      image: "assets/images/products/prod-walnuts-chilean-halves.webp",
      gallery: [
        "assets/images/products/prod-walnuts-chilean-halves.webp",
        "assets/images/products/gal-walnut-3.webp",
        "assets/images/products/prod-walnuts-kashmiri-inshell.webp",
        "assets/images/products/gal-walnut-4.webp"
      ],
      description: "Cultivated in the sunlit Andean river valleys of central Chile. Noted for exceptionally low tannins, delivering zero bitterness and an ultra-mild, sweet finish.",
      origin: "Aconcagua Valley, Chile",
      roastLevel: "Raw Halves",
      shelfLife: "9 Months",
      ingredients: "100% Chilean Walnut Kernels (Chandler Variety)",
      nutrition: {
        serving: "30g",
        calories: "192 kcal",
        protein: "4.4g",
        healthyFats: "19.1g",
        carbs: "4.1g",
        fiber: "2.0g",
        omega3: "2.5g"
      },
      stockStatus: "In Stock"
    },
    {
      id: "prod-dates-medjool-royal",
      name: "Royal Jordan Valley Medjool Dates",
      category: "dates",
      categoryLabel: "Dates",
      badge: "Crown Selection",
      badgeType: "premium",
      price: 1045.00,
      originalPrice: null,
      rating: 4.97,
      reviewsCount: 228,
      weight: "500g",
      packSizes: [
        { size: "500g", price: 1045.00 },
        { size: "1kg", price: 2090.00 },
        { size: "2kg", price: 4180.00 }
      ],
      image: "assets/images/products/prod-dates-medjool-royal.webp",
      gallery: [
        "assets/images/products/prod-dates-medjool-royal.webp",
        "assets/images/products/gal-dates-2.webp",
        "assets/images/products/gal-dates-3.webp",
        "assets/images/products/gal-dates-4.webp"
      ],
      description: "The revered 'Fruit of Kings'. Super Jumbo Medjools with thin glossy amber skin, luscious caramel flesh, and melt-in-mouth honey sweetness. 100% unpasteurized.",
      origin: "Jordan Valley Palms",
      roastLevel: "Fresh Tree-Ripened",
      shelfLife: "12 Months cool stored",
      ingredients: "100% Sun-Ripened Royal Medjool Dates",
      nutrition: {
        serving: "40g (approx 2 dates)",
        calories: "110 kcal",
        protein: "1.0g",
        healthyFats: "0.2g",
        carbs: "30.0g",
        fiber: "3.2g",
        potassium: "280mg (Natural Electrolytes)"
      },
      stockStatus: "In Stock"
    },
    {
      id: "prod-dates-ajwa-organic",
      name: "Organic Ajwa Al-Madinah Dates",
      category: "dates",
      categoryLabel: "Dates",
      badge: "Sacred Heritage",
      badgeType: "organic",
      price: 559.00,
      originalPrice: null,
      rating: 5.0,
      reviewsCount: 190,
      weight: "400g",
      packSizes: [
        { size: "200g", price: 280.00 },
        { size: "400g", price: 559.00 },
        { size: "800g", price: 1118.00 }
      ],
      image: "assets/images/products/prod-dates-ajwa-organic.webp",
      gallery: [
        "assets/images/products/prod-dates-ajwa-organic.webp",
        "assets/images/products/gal-dates-3.webp",
        "assets/images/products/prod-dates-medjool-royal.webp",
        "assets/images/products/gal-dates-2.webp"
      ],
      description: "Authentic Ajwa dates harvested exclusively from heritage groves surrounding the holy city of Medina. Compact, dark prune skin with fine ridges and deep herbal caramel depth.",
      origin: "Medina, Saudi Arabia",
      roastLevel: "Naturally Sun-Cured",
      shelfLife: "12 Months",
      ingredients: "100% Authentic Medina Ajwa Dates",
      nutrition: {
        serving: "40g",
        calories: "115 kcal",
        protein: "1.2g",
        healthyFats: "0.2g",
        carbs: "29.0g",
        fiber: "3.0g",
        magnesium: "24mg"
      },
      stockStatus: "In Stock"
    },
    {
      id: "prod-raisins-golden-afghan",
      name: "Afghan Long Golden Kishmish",
      category: "raisins-berries",
      categoryLabel: "Raisins & Berries",
      badge: "Sun-Dried",
      badgeType: "sale",
      price: 389.00,
      originalPrice: null,
      rating: 4.86,
      reviewsCount: 88,
      weight: "500g",
      packSizes: [
        { size: "250g", price: 195.00 },
        { size: "500g", price: 389.00 },
        { size: "1kg", price: 699.00 }
      ],
      image: "assets/images/products/prod-raisins-golden-afghan.webp",
      gallery: [
        "assets/images/products/prod-raisins-golden-afghan.webp",
        "assets/images/products/gal-raisins-2.webp",
        "assets/images/products/prod-figs-anjeer-turkish.webp",
        "assets/images/products/prod-berries-cranberry-blueberry.webp"
      ],
      description: "Slender, extra-long seedless green grapes dried in traditional adobe shade-houses (Kishmish Khana) in Kandahar. Delivers a bright amber-gold glow and delicate citrus sweetness.",
      origin: "Kandahar, Afghanistan",
      roastLevel: "Shade-Dried Natural",
      shelfLife: "10 Months",
      ingredients: "100% Afghan Long Golden Raisins",
      nutrition: {
        serving: "30g",
        calories: "92 kcal",
        protein: "0.9g",
        healthyFats: "0.1g",
        carbs: "23.5g",
        fiber: "1.2g",
        iron: "0.8mg"
      },
      stockStatus: "In Stock"
    },
    {
      id: "prod-berries-cranberry-blueberry",
      name: "Wild Dried Cranberries & Blueberries",
      category: "raisins-berries",
      categoryLabel: "Raisins & Berries",
      badge: "Antioxidant Rich",
      badgeType: "organic",
      price: 709.00,
      originalPrice: null,
      rating: 4.91,
      reviewsCount: 112,
      weight: "400g",
      packSizes: [
        { size: "200g", price: 355.00 },
        { size: "400g", price: 709.00 },
        { size: "800g", price: 1418.00 }
      ],
      image: "assets/images/products/prod-berries-cranberry-blueberry.webp",
      gallery: [
        "assets/images/products/prod-berries-cranberry-blueberry.webp",
        "assets/images/products/gal-berries-2.webp",
        "assets/images/products/prod-raisins-golden-afghan.webp",
        "assets/images/products/gal-figs-2.webp"
      ],
      description: "Infused with apple juice concentrate and slow-dried. A luscious blend of tart North American cranberries and deep wild Canadian blueberries packed with polyphenol antioxidants.",
      origin: "Quebec & Oregon",
      roastLevel: "Infused & Air-Dried",
      shelfLife: "10 Months",
      ingredients: "Wild Blueberries (50%), Cranberries (48%), Apple Juice Concentrate, Sunflower Oil (0.5%)",
      nutrition: {
        serving: "30g",
        calories: "98 kcal",
        protein: "0.5g",
        healthyFats: "0.3g",
        carbs: "24.0g",
        fiber: "2.5g",
        anthocyanins: "High Activity"
      },
      stockStatus: "In Stock"
    },
    {
      id: "prod-figs-anjeer-turkish",
      name: "Turkish Garland Sun-Dried Figs (Anjeer)",
      category: "raisins-berries",
      categoryLabel: "Raisins & Berries",
      badge: "Fiber Rich",
      badgeType: "premium",
      price: 779.00,
      originalPrice: null,
      rating: 4.88,
      reviewsCount: 94,
      weight: "500g",
      packSizes: [
        { size: "250g", price: 390.00 },
        { size: "500g", price: 779.00 },
        { size: "1kg", price: 1558.00 }
      ],
      image: "assets/images/products/prod-figs-anjeer-turkish.webp",
      gallery: [
        "assets/images/products/prod-figs-anjeer-turkish.webp",
        "assets/images/products/gal-figs-2.webp",
        "assets/images/products/prod-raisins-golden-afghan.webp",
        "assets/images/products/gal-berries-2.webp"
      ],
      description: "Aydin Valley Sarilop figs naturally sun-ripened on trees, hand-strung in traditional garlands. Delicate chewy texture bursting with crunchy natural seeds and fig honey.",
      origin: "Aegean Region, Turkey",
      roastLevel: "Sun-Cured Whole",
      shelfLife: "8 Months",
      ingredients: "100% Unsulfured Sun-Dried Figs",
      nutrition: {
        serving: "40g (approx 2 figs)",
        calories: "104 kcal",
        protein: "1.4g",
        healthyFats: "0.4g",
        carbs: "25.0g",
        fiber: "4.0g",
        calcium: "64mg (6% DV)"
      },
      stockStatus: "In Stock"
    },
    {
      id: "prod-mix-omega-power",
      name: "Omega-3 Vitality Power Mix",
      category: "mixes-snacks",
      categoryLabel: "Mixes & Snacks",
      badge: "Wellness Choice",
      badgeType: "organic",
      price: 748.00,
      originalPrice: null,
      rating: 4.93,
      reviewsCount: 156,
      weight: "500g",
      packSizes: [
        { size: "250g", price: 374.00 },
        { size: "500g", price: 748.00 },
        { size: "1kg", price: 1496.00 }
      ],
      image: "assets/images/products/prod-mix-omega-power.webp",
      gallery: [
        "assets/images/products/prod-mix-omega-power.webp",
        "assets/images/products/gal-mix-2.webp",
        "assets/images/products/gal-mix-3.webp",
        "assets/images/products/prod-mix-trail-gourmet.webp"
      ],
      description: "Cardiologist-aligned nutrient synergy: Californian walnuts, roasted pumpkin seeds, chia seeds, golden flax, raw Mamra almond slivers, and unsweetened dried cranberries.",
      origin: "Global Curated Harvest",
      roastLevel: "Light Hearth Roast",
      shelfLife: "8 Months",
      ingredients: "Walnuts (30%), Almonds (25%), Pumpkin Seeds (20%), Chia & Flax (15%), Cranberries (10%)",
      nutrition: {
        serving: "30g",
        calories: "168 kcal",
        protein: "5.8g",
        healthyFats: "14.2g",
        carbs: "6.2g",
        fiber: "3.6g",
        omega3: "2.1g"
      },
      stockStatus: "In Stock"
    },
    {
      id: "prod-mix-trail-gourmet",
      name: "Artisan Belgian Cacao Nut Trail Mix",
      category: "mixes-snacks",
      categoryLabel: "Mixes & Snacks",
      badge: "Indulgent",
      badgeType: "premium",
      price: 775.00,
      originalPrice: null,
      rating: 4.96,
      reviewsCount: 178,
      weight: "450g",
      packSizes: [
        { size: "225g", price: 388.00 },
        { size: "450g", price: 775.00 },
        { size: "900g", price: 1550.00 }
      ],
      image: "assets/images/products/prod-mix-trail-gourmet.webp",
      gallery: [
        "assets/images/products/prod-mix-trail-gourmet.webp",
        "assets/images/products/gal-mix-3.webp",
        "assets/images/products/prod-mix-omega-power.webp",
        "assets/images/products/gal-mix-2.webp"
      ],
      description: "Gourmet snacking elevated: Sea salt roasted almonds, buttery cashews, toasted hazelnuts, 72% single-origin Belgian dark chocolate callets, and tart Montmorency cherries.",
      origin: "California, Malabar & Belgium",
      roastLevel: "Artisan Confection Roast",
      shelfLife: "7 Months",
      ingredients: "Almonds, Cashews, Hazelnuts, Dark Chocolate (Cocoa Mass, Sugar, Cocoa Butter), Dried Cherries",
      nutrition: {
        serving: "30g",
        calories: "172 kcal",
        protein: "4.8g",
        healthyFats: "13.5g",
        carbs: "11.2g",
        fiber: "2.8g",
        antioxidants: "Premium Grade"
      },
      stockStatus: "In Stock"
    }
  ],

  giftBoxes: [
    {
      id: "gift-royal-heritage-box",
      name: "The Royal Heritage Hexagonal Chest",
      occasion: "Festive & Diwali / Eid",
      price: 2299.00,
      originalPrice: null,
      badge: "Signature",
      image: "assets/images/gifts/gift-royal-heritage-box.webp",
      heroAlt: "Navy and gold gift chest with separate compartments of almonds, cashews, pistachios and dates",
      imageWidth: 1200,
      imageHeight: 896,
      gallery: [
        {
          "role": "packaging",
          "src": "assets/images/gift-details/gift-royal-heritage-box-close.webp",
          "smallSrc": "assets/images/gift-details/gift-royal-heritage-box-close-768.webp",
          "alt": "Close view of gold filigree, a gold rim and navy velvet-lined dividers",
          "caption": "A closer look at the gold detailing and divided presentation.",
          "width": 1536,
          "height": 1024
        },
        {
          "role": "contents",
          "src": "assets/images/gift-details/gift-royal-heritage-box-contents.webp",
          "smallSrc": "assets/images/gift-details/gift-royal-heritage-box-contents-768.webp",
          "alt": "Overhead view of four compartments holding almonds, cashews, pistachios and Medjool dates",
          "caption": "Four varieties arranged separately inside the keepsake chest.",
          "width": 1536,
          "height": 1024
        },
        {
          "role": "occasion",
          "src": "assets/images/gift-details/gift-royal-heritage-box-occasion.webp",
          "smallSrc": "assets/images/gift-details/gift-royal-heritage-box-occasion-768.webp",
          "alt": "Navy and gold dry-fruit chest on an ivory festive table with flowers and candles",
          "caption": "A festive table setting for a shared gift.",
          "width": 1536,
          "height": 1024
        }
      ],
      inclusions: [
        "200g Mammoth California Roasted Almonds",
        "200g King Jumbo W180 Cashews",
        "200g Akbari Roasted Pistachios",
        "200g Royal Jordan Medjool Dates",
        "Bespoke Velvet Ribbon & Gold Foil Gift Card"
      ],
      packaging: "Navy-and-gold presentation chest with ornate filigree decoration, a matching removable lid, and four divided compartments.",
      bestFor: "Executive corporate gifting, milestone wedding invites, high-profile festive celebration.",
      dimensions: "32cm x 32cm x 9cm (Weight: 1.6kg Net)"
    },
    {
      id: "gift-festive-brass-tins",
      name: "Imperial Hammered Brass Trio",
      occasion: "Festive Heirloom",
      price: 4299.00,
      originalPrice: null,
      badge: "Artisan Craft",
      image: "assets/images/gifts/gift-festive-brass-tins.webp",
      heroAlt: "Three engraved brass jars filled with saffron cashews, green pistachios and almonds on a wooden tray",
      imageWidth: 1200,
      imageHeight: 896,
      gallery: [
        {
          "role": "packaging",
          "src": "assets/images/gift-details/gift-festive-brass-tins-close.webp",
          "smallSrc": "assets/images/gift-details/gift-festive-brass-tins-close-768.webp",
          "alt": "Close-up of the engraved brass jar, hammered finish and domed lid",
          "caption": "Engraved bands, a hammered finish, and a matching domed lid.",
          "width": 1536,
          "height": 1024
        },
        {
          "role": "contents",
          "src": "assets/images/gift-details/gift-festive-brass-tins-contents.webp",
          "smallSrc": "assets/images/gift-details/gift-festive-brass-tins-contents-768.webp",
          "alt": "Overhead view of three open brass jars with cashews, pistachios and almonds",
          "caption": "A clear view of the three nut varieties and matching serving tray.",
          "width": 1536,
          "height": 1024
        },
        {
          "role": "occasion",
          "src": "assets/images/gift-details/gift-festive-brass-tins-occasion.webp",
          "smallSrc": "assets/images/gift-details/gift-festive-brass-tins-occasion-768.webp",
          "alt": "Three closed brass keepsake jars styled on an elegant anniversary table",
          "caption": "The brass trio styled for an intimate celebration.",
          "width": 1536,
          "height": 1024
        }
      ],
      inclusions: [
        "250g Saffron Glazed Jumbo Cashews in Brass Jar 1",
        "250g Wood-Roasted Iranian Pistachios in Brass Jar 2",
        "250g Kashmiri Mamra Almonds in Brass Jar 3",
        "Hand-carved Sheesham Wood Serving Tray"
      ],
      packaging: "Three food-grade tin-lined pure brass jars crafted by master metal artisans, reusable as timeless tableware.",
      bestFor: "VIP luxury gifting, heirloom keepsakes, anniversary tokens.",
      dimensions: "38cm x 16cm x 12cm (Weight: 2.1kg Net)"
    },
    {
      id: "gift-imperial-leatherette-hamper",
      name: "The Sovereign Leatherette Hamper",
      occasion: "Corporate & Executive",
      price: 4999.00,
      originalPrice: null,
      badge: "Luxury Tier",
      image: "assets/images/gifts/gift-imperial-leatherette-hamper.webp",
      heroAlt: "Open forest-green gift trunk with brass hardware, cut-glass nut decanters and honey",
      imageWidth: 1200,
      imageHeight: 896,
      gallery: [
        {
          "role": "packaging",
          "src": "assets/images/gift-details/gift-imperial-leatherette-hamper-close.webp",
          "smallSrc": "assets/images/gift-details/gift-imperial-leatherette-hamper-close-768.webp",
          "alt": "Detail of green leatherette stitching, a brass clasp and handle attachment",
          "caption": "A closer look at the green finish, stitching and brass hardware.",
          "width": 1536,
          "height": 1024
        },
        {
          "role": "contents",
          "src": "assets/images/gift-details/gift-imperial-leatherette-hamper-contents.webp",
          "smallSrc": "assets/images/gift-details/gift-imperial-leatherette-hamper-contents-768.webp",
          "alt": "Open green trunk displaying glass nut decanters, honey and serving accessories",
          "caption": "The trunk and its assortment arranged for a contents preview.",
          "width": 1536,
          "height": 1024
        },
        {
          "role": "occasion",
          "src": "assets/images/gift-details/gift-imperial-leatherette-hamper-occasion.webp",
          "smallSrc": "assets/images/gift-details/gift-imperial-leatherette-hamper-occasion-768.webp",
          "alt": "Closed green gift trunk with cream ribbon on an executive office sideboard",
          "caption": "A restrained presentation for an executive gifting occasion.",
          "width": 1536,
          "height": 1024
        }
      ],
      inclusions: [
        "6 Vacuum-sealed Glass Decanters of Selected Dry Fruits",
        "150g Raw Wild Acacia Forest Honey with Wooden Dipper",
        "Handcrafted Belgian Dark Chocolate Almond Bark",
        "Brass Nutcracker & Tasting Spoon Set"
      ],
      packaging: "Forest green hand-stitched vegan leatherette trunk with vintage brass combination buckles and suede lining.",
      bestFor: "Board members, high-net-worth clients, luxury real estate closing gifts.",
      dimensions: "42cm x 28cm x 15cm (Weight: 3.4kg Net)"
    },
    {
      id: "gift-wedding-velvet-trays",
      name: "Noor Velvet Keepsake Tray",
      occasion: "Weddings & Return Favors",
      price: 1299.00,
      originalPrice: null,
      badge: "Bulk Available",
      image: "assets/images/gifts/Noor%20Velvet%20Keepsake%20Tray.jpg",
      heroAlt: "Clear divided nut tray on a dark gift base with gold accents",
      imageWidth: 736,
      imageHeight: 1104,
      gallery: [
        {
          "role": "packaging",
          "src": "assets/images/gift-details/gift-wedding-velvet-trays-close.webp",
          "smallSrc": "assets/images/gift-details/gift-wedding-velvet-trays-close-768.webp",
          "alt": "Clear tray rim and divider detail above a gold-accented dark gift base",
          "caption": "Transparent dividers keep the assortment visible and organized.",
          "width": 1536,
          "height": 1024
        },
        {
          "role": "contents",
          "src": "assets/images/gift-details/gift-wedding-velvet-trays-contents.webp",
          "smallSrc": "assets/images/gift-details/gift-wedding-velvet-trays-contents-768.webp",
          "alt": "Overhead presentation of almonds, cashews, dried figs and raisins in a divided tray",
          "caption": "A divided assortment styled around the listed nut and dried-fruit selection.",
          "width": 1536,
          "height": 1024
        },
        {
          "role": "occasion",
          "src": "assets/images/gift-details/gift-wedding-velvet-trays-occasion.webp",
          "smallSrc": "assets/images/gift-details/gift-wedding-velvet-trays-occasion-768.webp",
          "alt": "Clear nut presentation tray with ivory flowers and champagne ribbon on a wedding table",
          "caption": "An ivory-and-gold wedding welcome-table setting.",
          "width": 1536,
          "height": 1024
        }
      ],
      inclusions: [
        "150g Roasted California Almonds",
        "150g Malabar Salted Cashews",
        "150g Turkish Sun-Dried Figs",
        "150g Afghan Green Kishmish",
        "Personalized Foil-Pressed Family Monogram Band"
      ],
      packaging: "Divided presentation tray with a clear protective cover and a dark, gold-accented gift base.",
      bestFor: "Wedding return favors, baby shower announcements, anniversary receptions.",
      dimensions: "26cm x 26cm x 7cm (Weight: 1.1kg Net)"
    },
    {
      id: "gift-corporate-artisan-chest",
      name: "Executive Cedarwood Gifting Chest",
      occasion: "Corporate Milestones",
      price: 2999.00,
      originalPrice: null,
      badge: "Custom Logo",
      image: "assets/images/gifts/Executive%20Cedarwood%20Gifting%20Chest.jpg",
      heroAlt: "Geometric natural-wood gift chest with separate compartments of nuts and treats",
      imageWidth: 736,
      imageHeight: 981,
      gallery: [
        {
          "role": "packaging",
          "src": "assets/images/gift-details/gift-corporate-artisan-chest-close.webp",
          "smallSrc": "assets/images/gift-details/gift-corporate-artisan-chest-close-768.webp",
          "alt": "Close detail of natural wood grain, compartment joints and a clear cover edge",
          "caption": "Natural grain and geometric dividers define the presentation.",
          "width": 1536,
          "height": 1024
        },
        {
          "role": "contents",
          "src": "assets/images/gift-details/gift-corporate-artisan-chest-contents.webp",
          "smallSrc": "assets/images/gift-details/gift-corporate-artisan-chest-contents-768.webp",
          "alt": "Overhead wooden nut chest with energy bites and four plain metal canisters alongside",
          "caption": "An assortment and canister presentation for a corporate gift.",
          "width": 1536,
          "height": 1024
        },
        {
          "role": "occasion",
          "src": "assets/images/gift-details/gift-corporate-artisan-chest-occasion.webp",
          "smallSrc": "assets/images/gift-details/gift-corporate-artisan-chest-occasion-768.webp",
          "alt": "Wooden gift chest with ivory ribbon on a meeting-room credenza",
          "caption": "A warm wood presentation for appreciation and corporate milestones.",
          "width": 1536,
          "height": 1024
        }
      ],
      inclusions: [
        "4 Air-tight Aluminum Canisters of Gourmet Roasted Nuts",
        "Organic Date & Nut Energy Bites",
        "Corporate Custom Logo Engraved Brass Plaque"
      ],
      packaging: "Natural-wood presentation chest with geometric compartment dividers and a clear protective cover. Ask about personalized finishing for corporate orders.",
      bestFor: "Annual corporate summit delegates, employee appreciation, festive dealer incentives.",
      dimensions: "34cm x 22cm x 10cm (Weight: 1.8kg Net)"
    },
    {
      id: "gift-wellness-duo-keepsake",
      name: "The Vitality Keepsake Duo",
      occasion: "Health & Birthdays",
      price: 1099.00,
      originalPrice: null,
      badge: "Eco-Friendly",
      image: "assets/images/gifts/The%20Vitality%20Keepsake%20Duo.jpg",
      heroAlt: "Gold-finish round gift tins holding almonds, cashews and mixed nuts on sage linen",
      imageWidth: 960,
      imageHeight: 960,
      gallery: [
        {
          "role": "packaging",
          "src": "assets/images/gift-details/gift-wellness-duo-keepsake-close.webp",
          "smallSrc": "assets/images/gift-details/gift-wellness-duo-keepsake-close-768.webp",
          "alt": "Close-up of a gold-finish tin rim and lid with jute twine on sage linen",
          "caption": "A smooth metallic finish with a simple botanical touch.",
          "width": 1536,
          "height": 1024
        },
        {
          "role": "contents",
          "src": "assets/images/gift-details/gift-wellness-duo-keepsake-contents.webp",
          "smallSrc": "assets/images/gift-details/gift-wellness-duo-keepsake-contents-768.webp",
          "alt": "Two open gold tins containing walnut halves and Medjool dates",
          "caption": "The walnut-and-date duo styled in coordinated tins.",
          "width": 1536,
          "height": 1024
        },
        {
          "role": "occasion",
          "src": "assets/images/gift-details/gift-wellness-duo-keepsake-occasion.webp",
          "smallSrc": "assets/images/gift-details/gift-wellness-duo-keepsake-occasion-768.webp",
          "alt": "Two closed gold tins tied with jute twine beside a plant and blank greeting card",
          "caption": "A simple housewarming or thank-you presentation.",
          "width": 1536,
          "height": 1024
        }
      ],
      inclusions: [
        "250g Kashmiri Snow-White Walnut Halves",
        "250g Royal Jordan Medjool Dates",
        "Seed-Paper Plantable Greeting Card"
      ],
      packaging: "Coordinated gold-finish tins for a simple, reusable gift presentation. Ask about botanical finishing and the greeting card for your selected assortment.",
      bestFor: "Birthday wellness gifts, housewarmings, mindful thank-you gestures.",
      dimensions: "24cm x 14cm x 8cm (Weight: 0.85kg Net)"
    }
  ],

  sourcingStories: [
    {
      id: "sourcing-california-orchards",
      title: "From Central Valley to Connoisseur: Ethical Almond Orchards",
      region: "Central Valley, California",
      crop: "Mammoth Nonpareil Almonds",
      readTime: "4 min read",
      image: "assets/images/sourcing/sourcing-california-orchards.webp",
      summary: "Partnering with multi-generational family growers who prioritize drip irrigation, bee health protection, and zero synthetic pesticides.",
      fullStory: "Our almonds originate in California's San Joaquin Valley where the Mediterranean microclimate—mild winters and sun-drenched dry summers—creates optimal conditions for dense nutrient synthesis. We partner exclusively with orchards utilizing micro-drip sub-surface irrigation, reducing water consumption by 34% compared to standard practices. Each almond remains on the branch until natural hull-split reveals the mature kernel, ensuring maximum natural oil concentration."
    },
    {
      id: "sourcing-malabar-cashew",
      title: "The Monsoon Harvest: Hand-Graded Malabar W180 Cashews",
      region: "Malabar Coast, Kerala, India",
      crop: "W180 Jumbo Whole Cashews",
      readTime: "5 min read",
      image: "assets/images/sourcing/sourcing-malabar-cashew.webp",
      summary: "Traditional hand-cracking and steam-curing by artisanal women cooperatives, celebrating India's finest cashew terroir.",
      fullStory: "Along Kerala's coastal foothills, wild cashew trees flourish in nutrient-rich laterite soils nourished by Arabian Sea trade winds and monsoon showers. Here, our cashews are collected only as ripe fallen cashew apples. Our processing partner is a fair-trade certified cooperative where experienced master sorters hand-grade each nut under strict lighting into 24 distinct sizes, reserving only the top 3% for Natuva's King W180 catalog."
    },
    {
      id: "sourcing-iranian-pistachio",
      title: "Ancient Groves of Kerman: Natural Sun-Opened Pistachios",
      region: "Kerman Plateau, Iran",
      crop: "Akbari Long Pistachios",
      readTime: "4 min read",
      image: "assets/images/sourcing/sourcing-iranian-pistachio.webp",
      summary: "Grown at 1,750 meters altitude where dramatic day-night temperature swings produce intense pistachio aromatic compounds.",
      fullStory: "High in the semi-arid mountain plateaus of Kerman, pistachio cultivation dates back three millennia. The extreme diurnal temperature variation (upwards of 25°C swings between desert day and cold mountain night) triggers the tree to concentrate natural sugars and vibrant lutein antioxidants into the kernel. The nuts split open naturally while hanging on the tree branch—a natural smile crack indicating biological maturity."
    },
    {
      id: "sourcing-kashmir-walnuts",
      title: "High Altitude Kashmir Walnuts: Snow-fed Orchards of Pahalgam",
      region: "Pahalgam, Kashmir",
      crop: "Organic Kashmiri Snow-White Walnuts",
      readTime: "6 min read",
      image: "assets/images/sourcing/sourcing-kashmir-walnuts.webp",
      summary: "Unsprayed hillside walnut forests irrigated solely by melting Himalayan glaciers, yielding unmatched Omega-3 purity.",
      fullStory: "Our walnut trees grow wild along mountain terraces at elevations exceeding 2,100 meters in Kashmir's Lidder Valley. Because these trees are completely uncultivated by artificial chemicals, the shells are hand-knocked with long willow poles during crisp October mornings. We crack each walnut using traditional wooden mallets to preserve the unbroken butterfly lobes."
    },
    {
      id: "sourcing-jordan-medjool",
      title: "Sun-Drenched Medjool Palms of the Jordan Valley: Fruit of Kings",
      region: "Dead Sea Depression, Jordan Valley",
      crop: "Royal Medjool Dates",
      readTime: "5 min read",
      image: "assets/images/sourcing/sourcing-jordan-medjool.webp",
      summary: "Grown 390 meters below sea level in mineral-rich soils with filtered atmospheric sunlight and clean aquifer water.",
      fullStory: "Situated at the lowest elevation on earth, the Jordan Valley provides an atmospheric barometric pressure that slows date skin drying, allowing the fruit flesh to slowly transform starches into rich fructose and glucose. Each date palm cluster is individually thinned and bagged in breathable mesh to guard against desert wind and dust while allowing 360-degree solar curing."
    },
    {
      id: "sourcing-nitrogen-packaging",
      title: "Zero Oxidation Promise: Nitrogen Flushing & Multi-Barrier Packaging",
      region: "Natuva Cleanroom Facility",
      crop: "Scientific Preservation",
      readTime: "3 min read",
      image: "assets/images/sourcing/sourcing-nitrogen-packaging.webp",
      summary: "How medical-grade inert nitrogen flushing prevents oil rancidity and keeps whole nuts fresh without chemical preservatives.",
      fullStory: "The enemy of premium dry fruits is not time; it is oxygen. When polyunsaturated fats in almonds and walnuts contact ambient air, oxidation begins within 72 hours. At Natuva's packaging cleanroom, air is evacuated from every container and replaced with 99.8% pure food-grade nitrogen gas before hermetic thermal sealing, maintaining harvest-day crunch for up to 12 months."
    }
  ],

  // Populated from the single editorial catalog in blog-data.js on journal pages.
  blogs: []
};

// Also export for module systems if required
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NATUVA_DATA;
}
