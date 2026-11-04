import subprocess, os

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
workspace = r"d:\Desktop\IQ-CRM projects\DryNuts"
output_dir = os.path.join(workspace, "scripts", "screenshots")
os.makedirs(output_dir, exist_ok=True)

test_targets = [
    ("products_listing_desktop.png", "products.html", 1440, 1600),
    ("product_detail_medjool.png", "product-details.html?id=prod-dates-medjool-royal", 1440, 1200),
    ("product_detail_pistachios.png", "product-details.html?id=prod-pistachios-shelled-green", 1440, 1200),
    ("product_detail_walnuts.png", "product-details.html?id=prod-walnuts-chilean-halves", 1440, 1200),
    ("product_detail_mobile.png", "product-details.html?id=prod-dates-medjool-royal", 375, 1000),
]

for out_name, target_url, w, h in test_targets:
    out_path = os.path.join(output_dir, out_name)
    if os.path.exists(out_path):
        os.remove(out_path)
    file_url = f"file:///{os.path.join(workspace, target_url).replace('\\', '/')}"
    cmd = [
        chrome_path,
        "--headless=new",
        f"--window-size={w},{h}",
        f"--screenshot={out_path}",
        "--hide-scrollbars",
        "--disable-gpu",
        file_url
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    exists = os.path.exists(out_path)
    size = os.path.getsize(out_path) if exists else 0
    print(f"Captured {out_name}: exists={exists} size={size} bytes")
