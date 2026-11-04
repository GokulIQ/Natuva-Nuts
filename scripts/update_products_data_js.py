import re

file_path = "assets/js/products-data.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Updates to gallery arrays
replacements = {
    # Pistachios Roasted Salt
    r'id:\s*"prod-pistachios-roasted-salt",[\s\S]*?gallery:\s*\[[\s\S]*?\]': '''id: "prod-pistachios-roasted-salt",
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
      ]''',

    # Pistachios Shelled Green
    r'id:\s*"prod-pistachios-shelled-green",[\s\S]*?gallery:\s*\[[\s\S]*?\]': '''id: "prod-pistachios-shelled-green",
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
      ]''',

    # Walnuts Kashmiri
    r'id:\s*"prod-walnuts-kashmiri-inshell",[\s\S]*?gallery:\s*\[[\s\S]*?\]': '''id: "prod-walnuts-kashmiri-inshell",
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
      ]''',

    # Walnuts Chilean
    r'id:\s*"prod-walnuts-chilean-halves",[\s\S]*?gallery:\s*\[[\s\S]*?\]': '''id: "prod-walnuts-chilean-halves",
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
      ]''',

    # Dates Medjool Royal
    r'id:\s*"prod-dates-medjool-royal",[\s\S]*?gallery:\s*\[[\s\S]*?\]': '''id: "prod-dates-medjool-royal",
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
      ]''',

    # Dates Ajwa Organic
    r'id:\s*"prod-dates-ajwa-organic",[\s\S]*?gallery:\s*\[[\s\S]*?\]': '''id: "prod-dates-ajwa-organic",
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
      ]''',

    # Afghan Golden Kishmish
    r'id:\s*"prod-raisins-golden-afghan",[\s\S]*?gallery:\s*\[[\s\S]*?\]': '''id: "prod-raisins-golden-afghan",
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
      ]''',

    # Wild Dried Cranberries & Blueberries
    r'id:\s*"prod-berries-cranberry-blueberry",[\s\S]*?gallery:\s*\[[\s\S]*?\]': '''id: "prod-berries-cranberry-blueberry",
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
      ]''',

    # Turkish Garland Sun-Dried Figs
    r'id:\s*"prod-figs-anjeer-turkish",[\s\S]*?gallery:\s*\[[\s\S]*?\]': '''id: "prod-figs-anjeer-turkish",
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
      ]''',

    # Omega-3 Vitality Power Mix
    r'id:\s*"prod-mix-omega-power",[\s\S]*?gallery:\s*\[[\s\S]*?\]': '''id: "prod-mix-omega-power",
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
      ]''',

    # Artisan Belgian Cacao Nut Trail Mix
    r'id:\s*"prod-mix-trail-gourmet",[\s\S]*?gallery:\s*\[[\s\S]*?\]': '''id: "prod-mix-trail-gourmet",
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
      ]'''
}

for pattern, repl in replacements.items():
    new_content, count = re.subn(pattern, repl, content, count=1)
    if count == 0:
        print(f"Warning: pattern not matched for {pattern[:40]}")
    else:
        content = new_content
        print(f"Matched and replaced {pattern[:40]}")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated products-data.js successfully!")
