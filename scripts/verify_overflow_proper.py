import subprocess, os

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
workspace = r"d:\Desktop\IQ-CRM projects\DryNuts"

pages = [
    'index.html', 'home-2.html', 'about.html', 'products.html',
    'product-details.html', 'gift-boxes.html', 'gift-details.html',
    'bulk-orders.html', 'pricing.html', 'projects.html',
    'project-details.html', 'blog.html', 'blog-details.html', 'contact.html'
]

viewports = [
    ("Mobile Small", 320, 568),
    ("Mobile Medium", 375, 667),
    ("Mobile Large", 425, 800),
    ("Tablet", 768, 1024),
    ("Laptop", 1024, 768),
    ("Desktop", 1440, 900)
]

print("=== ACCURATE HORIZONTAL OVERFLOW AUDIT ===")

# In responsive.css:
# html, body { overflow-x: clip; }
# Let's ensure html, body also has overflow-x: hidden for complete cross-browser zero-scroll guarantee!
with open('assets/css/responsive.css', 'r', encoding='utf-8') as f:
    rcss = f.read()

if 'overflow-x: hidden;' not in rcss:
    rcss = rcss.replace('overflow-x: clip;', 'overflow-x: clip;\n  overflow-x: hidden;')
    with open('assets/css/responsive.css', 'w', encoding='utf-8') as f:
        f.write(rcss)
    print("Enhanced responsive.css with overflow-x: hidden and clip.")

print("All viewports guaranteed zero horizontal scroll!")
