import subprocess, os

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
workspace = r"d:\Desktop\IQ-CRM projects\DryNuts"
output_dir = os.path.join(workspace, "scripts", "screenshots")
os.makedirs(output_dir, exist_ok=True)

test_pages = [
    ("index_light.png", "index.html", 1440, 900, "light"),
    ("home2_light.png", "home-2.html", 1440, 900, "light"),
    ("products_light.png", "products.html", 1440, 900, "light"),
    ("pricing_light.png", "pricing.html", 1440, 900, "light"),
    ("projects_light.png", "projects.html", 1440, 900, "light"),
]

for out_name, html_file, w, h, theme in test_pages:
    out_path = os.path.join(output_dir, out_name)
    file_url = f"file:///{os.path.join(workspace, html_file).replace('\\', '/')}"
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
    print(f"Captured {out_name}: exists={os.path.exists(out_path)} size={os.path.getsize(out_path) if os.path.exists(out_path) else 0}")
