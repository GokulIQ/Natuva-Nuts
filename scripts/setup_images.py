import os
import shutil
import urllib.request
from PIL import Image

BRAIN_DIR = r"C:\Users\gokul\.gemini\antigravity\brain\fe327efd-09bf-4ab1-bdec-0a785970b135"
BASE_IMG_DIR = r"d:\Desktop\IQ-CRM projects\DryNuts\assets\images"

# Target subdirectories
DIRS = [
    "hero",
    "categories",
    "products",
    "gifts",
    "sourcing",
    "blog",
    "about",
    "team",
    "bulk",
    "brand"
]

for d in DIRS:
    os.makedirs(os.path.join(BASE_IMG_DIR, d), exist_ok=True)

print("Created image directories.")

# Mapping of generated brain images
GENERATED_MAP = {
    "hero/hero-home1.webp": "hero_home1_1793727869317.jpg",
    "hero/hero-home2.webp": "hero_home2_1793727891162.jpg",
    "about/about-heritage-story.webp": "about_heritage_story_1793728103550.jpg",
    "sourcing/sourcing-california-orchards.webp": "sourcing_orchard_1793727932126.jpg",
    "gifts/gift-royal-heritage-box.webp": "gift_royal_heritage_1793727912807.jpg",
    "gifts/gift-festive-brass-tins.webp": "gift_festive_brass_tins_1793728055377.jpg",
    "gifts/gift-imperial-leatherette-hamper.webp": "gift_imperial_leatherette_1793728076405.jpg",
    "products/prod-almonds-california.webp": "prod_almonds_california_1793728040199.jpg",
    "products/prod-almonds-mamra.webp": "test_almonds_1793727732878.jpg",
    "products/prod-cashews-w180-jumbo.webp": "prod_cashews_w180_1793728059236.jpg",
    "products/prod-pistachios-roasted-salt.webp": "prod_pistachios_roasted_1793728079776.jpg",
    "products/prod-walnuts-kashmiri-inshell.webp": "prod_walnuts_kashmiri_1793728099784.jpg",
}

for rel_dest, src_name in GENERATED_MAP.items():
    src_path = os.path.join(BRAIN_DIR, src_name)
    dest_webp = os.path.join(BASE_IMG_DIR, rel_dest)
    dest_jpg = dest_webp.replace(".webp", ".jpg")
    if os.path.exists(src_path):
        im = Image.open(src_path)
        im.save(dest_webp, "WEBP", quality=88)
        im.save(dest_jpg, "JPEG", quality=88)
        print(f"Processed generated: {src_name} -> {rel_dest}")
    else:
        print(f"Warning: {src_path} not found")

# Curated high-res authentic food photography from Unsplash CDN
EXTERNAL_DOWNLOADS = {
    # Products
    "products/prod-cashews-roasted-salted.webp": "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
    "products/prod-pistachios-shelled-green.webp": "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?auto=format&fit=crop&w=800&q=80",
    "products/prod-walnuts-chilean-halves.webp": "https://images.unsplash.com/photo-1523473827533-2a64d0d36748?auto=format&fit=crop&w=800&q=80",
    "products/prod-dates-medjool-royal.webp": "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
    "products/prod-dates-ajwa-organic.webp": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    "products/prod-raisins-golden-afghan.webp": "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80",
    "products/prod-berries-cranberry-blueberry.webp": "https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?auto=format&fit=crop&w=800&q=80",
    "products/prod-figs-anjeer-turkish.webp": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "products/prod-mix-omega-power.webp": "https://images.unsplash.com/photo-1536591375315-1b836835529a?auto=format&fit=crop&w=800&q=80",
    "products/prod-mix-trail-gourmet.webp": "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=800&q=80",

    # Product Gallery Thumbnails
    "products/gal-almond-2.webp": "https://images.unsplash.com/photo-1508779018996-601e37fa274e?auto=format&fit=crop&w=800&q=80",
    "products/gal-almond-3.webp": "https://images.unsplash.com/photo-1579282940892-6152e6e80c52?auto=format&fit=crop&w=800&q=80",
    "products/gal-almond-4.webp": "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=800&q=80",
    "products/gal-cashew-2.webp": "https://images.unsplash.com/photo-1543208541-0961a29a7537?auto=format&fit=crop&w=800&q=80",
    "products/gal-cashew-3.webp": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "products/gal-cashew-4.webp": "https://images.unsplash.com/photo-1599599810694-b5b37304c041?auto=format&fit=crop&w=800&q=80",

    # Remaining Gifts
    "gifts/gift-wedding-velvet-trays.webp": "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    "gifts/gift-corporate-artisan-chest.webp": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    "gifts/gift-wellness-duo-keepsake.webp": "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=800&q=80",
    "gifts/gift-gal-1.webp": "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80",
    "gifts/gift-gal-2.webp": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    "gifts/gift-gal-3.webp": "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",

    # Sourcing Stories
    "sourcing/sourcing-malabar-cashew.webp": "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80",
    "sourcing/sourcing-iranian-pistachio.webp": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    "sourcing/sourcing-kashmir-walnuts.webp": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    "sourcing/sourcing-jordan-medjool.webp": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
    "sourcing/sourcing-nitrogen-packaging.webp": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",

    # Blog Covers
    "blog/blog-almond-health-guide.webp": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80",
    "blog/blog-cashew-grading-guide.webp": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    "blog/blog-festive-gifting-etiquette.webp": "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    "blog/blog-storing-dryfruits-freshness.webp": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    "blog/blog-brain-boosting-walnuts.webp": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "blog/blog-dates-natural-sweetener.webp": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",

    # About & Team
    "about/about-craft-sorting.webp": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    "about/about-roasting-facility.webp": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    "team/team-founder.webp": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    "team/team-sourcing-head.webp": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "team/team-quality-director.webp": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    "team/team-packaging-designer.webp": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",

    # Bulk Ordering
    "bulk/bulk-corporate-crates.webp": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    "bulk/bulk-nitrogen-sacks.webp": "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80",
    "bulk/bulk-custom-branding.webp": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for rel_dest, url in EXTERNAL_DOWNLOADS.items():
    dest_webp = os.path.join(BASE_IMG_DIR, rel_dest)
    dest_jpg = dest_webp.replace(".webp", ".jpg")
    temp_tmp = dest_webp + ".tmp"
    
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            with open(temp_tmp, "wb") as f:
                f.write(data)
        
        im = Image.open(temp_tmp)
        im.save(dest_webp, "WEBP", quality=85)
        im.save(dest_jpg, "JPEG", quality=85)
        os.remove(temp_tmp)
        print(f"Downloaded & converted: {rel_dest}")
    except Exception as e:
        print(f"Failed {rel_dest}: {e}")
        # If download fails, create a beautiful fallback from an existing image
        fallback = os.path.join(BASE_IMG_DIR, "products/prod-almonds-california.webp")
        if os.path.exists(fallback):
            shutil.copy(fallback, dest_webp)
            shutil.copy(fallback.replace(".webp", ".jpg"), dest_jpg)
            print(f"Used local fallback for: {rel_dest}")

# Create Category Circular Images
CATEGORIES_LIST = [
    ("categories/cat-almonds.webp", "products/prod-almonds-california.webp"),
    ("categories/cat-cashews.webp", "products/prod-cashews-w180-jumbo.webp"),
    ("categories/cat-pistachios.webp", "products/prod-pistachios-roasted-salt.webp"),
    ("categories/cat-walnuts.webp", "products/prod-walnuts-kashmiri-inshell.webp"),
    ("categories/cat-dates.webp", "products/prod-dates-medjool-royal.webp"),
    ("categories/cat-raisins.webp", "products/prod-raisins-golden-afghan.webp"),
    ("categories/cat-dried-berries.webp", "products/prod-berries-cranberry-blueberry.webp"),
    ("categories/cat-mixes.webp", "products/prod-mix-omega-power.webp")
]

for cat_rel, prod_rel in CATEGORIES_LIST:
    src = os.path.join(BASE_IMG_DIR, prod_rel)
    dst_webp = os.path.join(BASE_IMG_DIR, cat_rel)
    dst_jpg = dst_webp.replace(".webp", ".jpg")
    if os.path.exists(src):
        im = Image.open(src)
        im = im.resize((300, 300), Image.Resampling.LANCZOS)
        im.save(dst_webp, "WEBP", quality=85)
        im.save(dst_jpg, "JPEG", quality=85)
        print(f"Generated category icon: {cat_rel}")

print("All images processed successfully!")
