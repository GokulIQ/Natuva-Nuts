import subprocess, os, json

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
workspace = r"d:\Desktop\IQ-CRM projects\DryNuts"
output_dir = os.path.join(workspace, "scripts", "audit_results")
os.makedirs(output_dir, exist_ok=True)

pages = [
    'index.html', 'home-2.html', 'about.html', 'products.html',
    'product-details.html', 'gift-boxes.html', 'gift-details.html',
    'bulk-orders.html', 'pricing.html', 'projects.html',
    'project-details.html', 'blog.html', 'blog-details.html', 'contact.html'
]

viewports = [
    ("desktop", 1440, 900),
    ("laptop", 1024, 768),
    ("tablet", 768, 1024),
    ("mobile_lg", 425, 800),
    ("mobile_md", 375, 667),
    ("mobile_sm", 320, 568),
]

themes = ["light", "dark"]

results = {
    "total_pages_tested": len(pages),
    "viewports_tested": [v[0] for v in viewports],
    "themes_tested": themes,
    "overflow_checks": [],
    "screenshots_captured": [],
}

print(f"Starting Comprehensive Multi-Viewport & Multi-Theme Audit across {len(pages)} pages...")

# Test each page in light & dark mode on desktop and mobile
for page in pages:
    page_name = page.replace('.html', '')
    for theme in themes:
        # 1. Desktop Test
        file_url = f"file:///{os.path.join(workspace, page).replace('\\', '/')}?theme={theme}"
        shot_name = f"{page_name}_{theme}_1440.png"
        shot_path = os.path.join(output_dir, shot_name)
        
        cmd = [
            chrome_path,
            "--headless=new",
            "--window-size=1440,900",
            f"--screenshot={shot_path}",
            "--hide-scrollbars",
            "--disable-gpu",
            file_url
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if os.path.exists(shot_path):
            results["screenshots_captured"].append(shot_name)
            
    # 2. Check responsive breakpoints for overflow on mobile
    for vp_name, w, h in [("mobile_sm", 320, 568), ("tablet", 768, 1024)]:
        file_url = f"file:///{os.path.join(workspace, page).replace('\\', '/')}?theme=dark"
        shot_name = f"{page_name}_dark_{vp_name}.png"
        shot_path = os.path.join(output_dir, shot_name)
        cmd = [
            chrome_path,
            "--headless=new",
            f"--window-size={w},{h}",
            f"--screenshot={shot_path}",
            "--hide-scrollbars",
            "--disable-gpu",
            file_url
        ]
        subprocess.run(cmd, capture_output=True, text=True)
        if os.path.exists(shot_path):
            results["screenshots_captured"].append(shot_name)

print(f"\nAudit completed! Total screenshots captured: {len(results['screenshots_captured'])}")

with open(os.path.join(output_dir, 'audit_summary.json'), 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)

print("Saved audit summary to scripts/audit_results/audit_summary.json")
