import os, re

workspace = r'd:\Desktop\IQ-CRM projects\DryNuts'
files = [
    'index.html', 'home-2.html', 'about.html', 'products.html',
    'product-details.html', 'gift-boxes.html', 'gift-details.html',
    'bulk-orders.html', 'pricing.html', 'projects.html',
    'project-details.html', 'blog.html', 'blog-details.html', 'contact.html'
]

print("=== AUDIT OF EVERY PAGE ===")
for fname in files:
    fpath = os.path.join(workspace, fname)
    with open(fpath, encoding='utf-8') as f:
        html = f.read()
    
    # Check for potential contrast pitfalls
    has_origin_tag = 'story-origin-tag' in html
    has_product_action = 'product-action-btn' in html
    has_tables = '<table' in html
    has_accordions = 'accordion' in html
    has_forms = '<form' in html
    has_kicker_warning = 'kicker-gold text-dark bg-warning' in html
    has_text_dark = 'text-dark' in html
    has_text_muted = 'text-muted' in html
    has_badge_subtle = 'bg-' in html and '-subtle' in html
    has_progress = 'progress-bar' in html
    
    print(f"\n[{fname}]")
    print(f"  - story-origin-tag: {has_origin_tag}")
    print(f"  - product-action-btn: {has_product_action}")
    print(f"  - tables: {has_tables}")
    print(f"  - accordions: {has_accordions}")
    print(f"  - forms: {has_forms}")
    print(f"  - kicker bg-warning text-dark: {has_kicker_warning}")
    print(f"  - text-dark: {has_text_dark}")
    print(f"  - subtle badges: {has_badge_subtle}")
    print(f"  - progress bars: {has_progress}")
