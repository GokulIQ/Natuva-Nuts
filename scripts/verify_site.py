import os
import re
import glob
from html.parser import HTMLParser

workspace = r'd:\Desktop\IQ-CRM projects\DryNuts'
html_files = glob.glob(os.path.join(workspace, '*.html'))

print(f"Total HTML files found in root: {len(html_files)}")

broken_links = []
broken_assets = []
section_counts = {}
forbidden_pages = []

class PageChecker(HTMLParser):
    def __init__(self, filename):
        super().__init__()
        self.filename = filename
        self.section_count = 0
        self.links = []
        self.assets = []
    
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == 'section':
            self.section_count += 1
        if tag in ('a', 'link'):
            href = attrs_dict.get('href')
            if href:
                self.links.append(href)
        if tag in ('img', 'script', 'source'):
            src = attrs_dict.get('src') or attrs_dict.get('srcset')
            if src:
                self.assets.append(src)

for file_path in html_files:
    fname = os.path.basename(file_path)
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'services.html' in content or 'service-details.html' in content:
        forbidden_pages.append(fname)

    parser = PageChecker(fname)
    parser.feed(content)
    section_counts[fname] = parser.section_count

    for href in parser.links:
        if not href or href.startswith('#') or href.startswith('http') or href.startswith('mailto:') or href.startswith('tel:') or href.startswith('javascript:'):
            continue
        clean_href = href.split('#')[0].split('?')[0]
        if clean_href:
            target_path = os.path.normpath(os.path.join(workspace, clean_href))
            if not os.path.exists(target_path):
                broken_links.append((fname, href, target_path))

    for src in parser.assets:
        if not src or src.startswith('data:') or src.startswith('http'):
            continue
        clean_src = src.split('#')[0].split('?')[0].split(' ')[0]
        if clean_src:
            target_path = os.path.normpath(os.path.join(workspace, clean_src))
            if not os.path.exists(target_path):
                broken_assets.append((fname, src, target_path))

print("\n================ QUALITY AUDIT REPORT ================")
print("1. SECTION COUNTS (Mandatory Rule: Maximum 7 major content sections per page):")
all_sections_pass = True
for fname in sorted(section_counts.keys()):
    count = section_counts[fname]
    status = "PASS (EXACTLY 7)" if count == 7 else ("PASS (<7)" if count < 7 else "FAIL (>7)")
    if count > 7:
        all_sections_pass = False
    print(f"   - {fname:<22}: {count} sections -> [{status}]")

print(f"\n2. FORBIDDEN SERVICE PAGES CHECK (Must be 0):")
print(f"   - Total violations: {len(forbidden_pages)}")
if forbidden_pages:
    for f in forbidden_pages:
        print(f"     * Found in {f}")
else:
    print("   - PASS: No references to services.html or service-details.html")

print(f"\n3. BROKEN INTERNAL LINKS CHECK:")
print(f"   - Total broken internal links: {len(broken_links)}")
if broken_links:
    for src_file, link, target in broken_links:
        print(f"     * {src_file} -> {link} (missing: {target})")
else:
    print("   - PASS: All internal navigation links resolve successfully.")

print(f"\n4. BROKEN ASSETS CHECK (Images, Scripts, Styles):")
print(f"   - Total broken assets: {len(broken_assets)}")
if broken_assets:
    for src_file, asset, target in broken_assets:
        print(f"     * {src_file} -> {asset} (missing: {target})")
else:
    print("   - PASS: All referenced local media and script assets exist.")

# Check products-data.js image references
print(f"\n5. PRODUCTS-DATA.JS ASSET AUDIT:")
prod_data_file = os.path.join(workspace, 'assets', 'js', 'products-data.js')
if os.path.exists(prod_data_file):
    with open(prod_data_file, 'r', encoding='utf-8') as f:
        js_content = f.read()
    img_refs = re.findall(r'["\'](assets/images/[^"\']+\.(?:webp|jpg|png|svg))["\']', js_content)
    missing_js_imgs = []
    for img_rel in set(img_refs):
        full_p = os.path.normpath(os.path.join(workspace, img_rel))
        if not os.path.exists(full_p):
            missing_js_imgs.append(img_rel)
    print(f"   - Unique image references in products-data.js: {len(set(img_refs))}")
    print(f"   - Missing image files: {len(missing_js_imgs)}")
    if missing_js_imgs:
        for m in missing_js_imgs:
            print(f"     * Missing: {m}")
    else:
        print("   - PASS: All JS product catalog images exist on disk.")

print("======================================================")
