import os
import glob
import re
from collections import Counter

workspace = r'd:\Desktop\IQ-CRM projects\DryNuts'
html_files = sorted(glob.glob(os.path.join(workspace, '*.html')))

classes = Counter()
for f in html_files:
    with open(f, encoding='utf-8') as fp:
        content = fp.read()
    found = re.findall(r'class=["\']([^"\']+)["\']', content)
    for c_str in found:
        for c in c_str.split():
            classes[c] += 1

print(f"Total HTML files: {len(html_files)}")
print(f"Total unique classes: {len(classes)}")

# Let's inspect all CSS rules in style.css
css_file = os.path.join(workspace, 'assets', 'css', 'style.css')
with open(css_file, encoding='utf-8') as fp:
    css_content = fp.read()

# Find all selectors in style.css
selectors = re.findall(r'([^{}]+)\{', css_content)
cleaned_selectors = [s.strip() for s in selectors if not s.strip().startswith('@')]

print(f"Total CSS rule blocks in style.css: {len(cleaned_selectors)}")

# Let's check dark theme rules in style.css
dark_rules = [s for s in cleaned_selectors if 'data-bs-theme="dark"' in s or 'data-theme="dark"' in s]
print(f"Dark theme selectors in style.css: {len(dark_rules)}")
for r in dark_rules:
    print("  -", r)
