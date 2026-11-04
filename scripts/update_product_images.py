import os
from PIL import Image

BRAIN_DIR = r"C:\Users\gokul\.gemini\antigravity\brain\375be137-3b8d-4375-bd71-0f08590a3f35"
PROJECT_DIR = r"d:\Desktop\IQ-CRM projects\DryNuts"
PROD_DIR = os.path.join(PROJECT_DIR, "assets", "images", "products")
CAT_DIR = os.path.join(PROJECT_DIR, "assets", "images", "categories")
SOURCING_DIR = os.path.join(PROJECT_DIR, "assets", "images", "sourcing")

os.makedirs(PROD_DIR, exist_ok=True)
os.makedirs(CAT_DIR, exist_ok=True)

def save_dual(im, base_path, quality=88):
    webp_path = base_path if base_path.endswith('.webp') else base_path + '.webp'
    jpg_path = webp_path.replace('.webp', '.jpg')
    im.save(webp_path, 'WEBP', quality=quality)
    im.save(jpg_path, 'JPEG', quality=quality)
    print(f"Saved: {os.path.basename(webp_path)} and .jpg ({im.size})")

print("--- 1. Processing Main Products ---")

# 1. Slow-Roasted Sea Salt Cashews
cashew_gen = Image.open(os.path.join(BRAIN_DIR, "slow_roasted_sea_salt_cashews_1793770267920.jpg"))
save_dual(cashew_gen, os.path.join(PROD_DIR, "prod-cashews-roasted-salted.webp"))

# 2. Emerald Shelled Pistachio Kernels
pistachio_gen = Image.open(os.path.join(BRAIN_DIR, "emerald_shelled_pistachios_1793770147102.jpg"))
save_dual(pistachio_gen, os.path.join(PROD_DIR, "prod-pistachios-shelled-green.webp"))

# 3. Chilean Extra-Light Walnut Kernels
walnut_gen = Image.open(os.path.join(BRAIN_DIR, "chilean_extra_light_walnuts_1793770245923.jpg"))
save_dual(walnut_gen, os.path.join(PROD_DIR, "prod-walnuts-chilean-halves.webp"))

# 4. Royal Jordan Valley Medjool Dates
medjool_gen = Image.open(os.path.join(BRAIN_DIR, "royal_medjool_dates_1793770294982.jpg"))
save_dual(medjool_gen, os.path.join(PROD_DIR, "prod-dates-medjool-royal.webp"))

# 5. Organic Ajwa Al-Madinah Dates
ajwa_gen = Image.open(os.path.join(BRAIN_DIR, "ajwa_al_madinah_dates_1793770291405.jpg"))
save_dual(ajwa_gen, os.path.join(PROD_DIR, "prod-dates-ajwa-organic.webp"))

# 6. Afghan Long Golden Kishmish
kishmish_gen = Image.open(os.path.join(BRAIN_DIR, "afghan_long_golden_kishmish_1793770266243.jpg"))
save_dual(kishmish_gen, os.path.join(PROD_DIR, "prod-raisins-golden-afghan.webp"))

# 7. Wild Dried Cranberries & Blueberries
berries_gen = Image.open(os.path.join(BRAIN_DIR, "wild_dried_cranberries_blueberries_1793770266594.jpg"))
save_dual(berries_gen, os.path.join(PROD_DIR, "prod-berries-cranberry-blueberry.webp"))

# 8. Turkish Garland Sun-Dried Figs (Anjeer)
figs_gen = Image.open(os.path.join(BRAIN_DIR, "turkish_garland_dried_figs_1793770301866.jpg"))
save_dual(figs_gen, os.path.join(PROD_DIR, "prod-figs-anjeer-turkish.webp"))

# 9. Omega-3 Vitality Power Mix
omega_gen = Image.open(os.path.join(BRAIN_DIR, "omega3_vitality_power_mix_1793770310806.jpg"))
save_dual(omega_gen, os.path.join(PROD_DIR, "prod-mix-omega-power.webp"))

# 10. Artisan Belgian Cacao Nut Trail Mix
cacao_trail = Image.open(os.path.join(PROJECT_DIR, "scratch_cacao_trail_crop.jpg"))
save_dual(cacao_trail, os.path.join(PROD_DIR, "prod-mix-trail-gourmet.webp"))

print("\n--- 2. Processing Dedicated Gallery Thumbnails ---")

# Cashew Galleries
# gal-cashew-2: Slow roasted golden cashews in dark green ceramic dish with scoop on slate
save_dual(cashew_gen, os.path.join(PROD_DIR, "gal-cashew-2.webp"))

# gal-cashew-3: Pure cashew kernels flat lay
cashew_flat = Image.open(os.path.join(PROJECT_DIR, "cashew_pile.jpg"))
# Center-crop to 800x800
w, h = cashew_flat.size
sq = min(w, h)
l = (w - sq) // 2
t = (h - sq) // 2
cashew_flat_sq = cashew_flat.crop((l, t, l + sq, t + sq)).resize((800, 800), Image.Resampling.LANCZOS)
save_dual(cashew_flat_sq, os.path.join(PROD_DIR, "gal-cashew-3.webp"))

# gal-cashew-4: Close up macro crop of roasted salted cashews
w, h = cashew_gen.size
cashew_macro = cashew_gen.crop((int(w * 0.15), int(h * 0.15), int(w * 0.85), int(h * 0.85))).resize((800, 800), Image.Resampling.LANCZOS)
save_dual(cashew_macro, os.path.join(PROD_DIR, "gal-cashew-4.webp"))

# Pistachio Galleries
# gal-pistachio-2: Emerald green kernels in dark handcrafted bowl
save_dual(pistachio_gen, os.path.join(PROD_DIR, "gal-pistachio-2.webp"))

# gal-pistachio-3: Macro crop of raw emerald kernels
w, h = pistachio_gen.size
pistachio_macro = pistachio_gen.crop((int(w * 0.2), int(h * 0.2), int(w * 0.8), int(h * 0.8))).resize((800, 800), Image.Resampling.LANCZOS)
save_dual(pistachio_macro, os.path.join(PROD_DIR, "gal-pistachio-3.webp"))

# gal-pistachio-4: Roasted in-shell pistachios with brass spoon
pistachio_inshell = Image.open(os.path.join(PROD_DIR, "prod-pistachios-roasted-salt.webp"))
save_dual(pistachio_inshell, os.path.join(PROD_DIR, "gal-pistachio-4.webp"))

# Walnut Galleries
# gal-walnut-2: Extra-light butterfly walnut halves on dark board
save_dual(walnut_gen, os.path.join(PROD_DIR, "gal-walnut-2.webp"))

# gal-walnut-3: 6K razor-sharp macro of a golden walnut half
walnut_close = Image.open(os.path.join(PROJECT_DIR, "walnut_close.jpg"))
w, h = walnut_close.size
sq = min(w, h)
l = (w - sq) // 2
t = (h - sq) // 2
walnut_close_sq = walnut_close.crop((l, t, l + sq, t + sq)).resize((800, 800), Image.Resampling.LANCZOS)
save_dual(walnut_close_sq, os.path.join(PROD_DIR, "gal-walnut-3.webp"))

# gal-walnut-4: In-shell whole walnuts pile
walnut_inshell_raw = Image.open(os.path.join(PROJECT_DIR, "cashew_ashkan.jpg")) # This is the in-shell walnuts photo
w, h = walnut_inshell_raw.size
sq = min(w, h)
l = (w - sq) // 2
t = (h - sq) // 2
walnut_inshell_sq = walnut_inshell_raw.crop((l, t, l + sq, t + sq)).resize((800, 800), Image.Resampling.LANCZOS)
save_dual(walnut_inshell_sq, os.path.join(PROD_DIR, "gal-walnut-4.webp"))

# Date Galleries
# gal-dates-2: Sliced Medjool date showing succulent caramel flesh
w, h = medjool_gen.size
date_sliced = medjool_gen.crop((int(w * 0.0), int(h * 0.45), int(w * 0.55), int(h * 0.95))).resize((800, 800), Image.Resampling.LANCZOS)
save_dual(date_sliced, os.path.join(PROD_DIR, "gal-dates-2.webp"))

# gal-dates-3: Authentic Ajwa dates with micro-creases
save_dual(ajwa_gen, os.path.join(PROD_DIR, "gal-dates-3.webp"))

# gal-dates-4: Whole glossy Medjool dates in antique hammered brass bowl
w, h = medjool_gen.size
date_bowl = medjool_gen.crop((int(w * 0.35), int(h * 0.15), int(w * 0.95), int(h * 0.75))).resize((800, 800), Image.Resampling.LANCZOS)
save_dual(date_bowl, os.path.join(PROD_DIR, "gal-dates-4.webp"))

# Raisins, Berries, Figs Galleries
# gal-raisins-2: Macro close-up of golden Afghan kishmish
w, h = kishmish_gen.size
kishmish_macro = kishmish_gen.crop((int(w * 0.2), int(h * 0.2), int(w * 0.8), int(h * 0.8))).resize((800, 800), Image.Resampling.LANCZOS)
save_dual(kishmish_macro, os.path.join(PROD_DIR, "gal-raisins-2.webp"))

# gal-berries-2: Macro close-up of dried cranberries and blueberries
w, h = berries_gen.size
berries_macro = berries_gen.crop((int(w * 0.2), int(h * 0.2), int(w * 0.8), int(h * 0.8))).resize((800, 800), Image.Resampling.LANCZOS)
save_dual(berries_macro, os.path.join(PROD_DIR, "gal-berries-2.webp"))

# gal-figs-2: Sliced Turkish fig showing honeyed amber seed interior
w, h = figs_gen.size
fig_sliced = figs_gen.crop((int(w * 0.35), int(h * 0.4), int(w * 0.9), int(h * 0.85))).resize((800, 800), Image.Resampling.LANCZOS)
save_dual(fig_sliced, os.path.join(PROD_DIR, "gal-figs-2.webp"))

# Mixes Galleries
# gal-mix-2: Maksim Shutov superfood nut & berry mix
shutov_img = Image.open(os.path.join(PROJECT_DIR, "scratch_test_shutov.jpg"))
w, h = shutov_img.size
sq = min(w, h)
l = (w - sq) // 2
t = (h - sq) // 2
shutov_sq = shutov_img.crop((l, t, l + sq, t + sq)).resize((800, 800), Image.Resampling.LANCZOS)
save_dual(shutov_sq, os.path.join(PROD_DIR, "gal-mix-2.webp"))

# gal-mix-3: Artisan nut mix flat lay with cashews, Brazil nuts, and cacao
cacao_flat = Image.open(os.path.join(PROJECT_DIR, "cashew_check_1.jpg"))
w, h = cacao_flat.size
sq = min(w, h)
l = (w - sq) // 2
t = (h - sq) // 2
cacao_flat_sq = cacao_flat.crop((l, t, l + sq, t + sq)).resize((800, 800), Image.Resampling.LANCZOS)
save_dual(cacao_flat_sq, os.path.join(PROD_DIR, "gal-mix-3.webp"))

print("\n--- 3. Fixing Sourcing Mismatches ---")
# Replace sourcing-malabar-cashew.webp (which was a makeup palette!) with authentic cashew photography
save_dual(cashew_gen, os.path.join(SOURCING_DIR, "sourcing-malabar-cashew.webp"))

print("\n--- 4. Regenerating Category Circular Thumbnails ---")
CAT_MAPPINGS = [
    ("cat-almonds.webp", "prod-almonds-california.webp"),
    ("cat-cashews.webp", "prod-cashews-w180-jumbo.webp"),
    ("cat-pistachios.webp", "prod-pistachios-shelled-green.webp"),
    ("cat-walnuts.webp", "prod-walnuts-chilean-halves.webp"),
    ("cat-dates.webp", "prod-dates-medjool-royal.webp"),
    ("cat-raisins.webp", "prod-raisins-golden-afghan.webp"),
    ("cat-dried-berries.webp", "prod-berries-cranberry-blueberry.webp"),
    ("cat-mixes.webp", "prod-mix-omega-power.webp")
]

for cat_name, prod_name in CAT_MAPPINGS:
    prod_path = os.path.join(PROD_DIR, prod_name)
    im = Image.open(prod_path)
    w, h = im.size
    sq = min(w, h)
    l = (w - sq) // 2
    t = (h - sq) // 2
    thumb = im.crop((l, t, l + sq, t + sq)).resize((300, 300), Image.Resampling.LANCZOS)
    save_dual(thumb, os.path.join(CAT_DIR, cat_name))

print("\nAll images processed and synchronized successfully!")
