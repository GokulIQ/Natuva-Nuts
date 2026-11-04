import os, glob, re

workspace = r'd:\Desktop\IQ-CRM projects\DryNuts'
html_files = sorted(glob.glob(os.path.join(workspace, '*.html')))

print(f"Scanning {len(html_files)} HTML files for components...")

components = {
    'story_tags': [],
    'product_actions': [],
    'badges': [],
    'tables': [],
    'accordions': [],
    'tabs': [],
    'pagination': [],
    'modals': [],
    'forms': [],
    'filter_controls': [],
    'buttons': set(),
    'text_utilities': set(),
    'bg_utilities': set(),
}

for f in html_files:
    fname = os.path.basename(f)
    with open(f, encoding='utf-8') as fp:
        content = fp.read()
    
    # Story origin tags
    if 'story-origin-tag' in content:
        tags = re.findall(r'<[^>]*class=["\'][^"\']*story-origin-tag[^"\']*["\'][^>]*>(.*?)</[^>]+>', content, re.DOTALL)
        for t in tags:
            components['story_tags'].append((fname, t.strip().replace('\n', ' ')))
    
    # Product action buttons
    if 'product-action-btn' in content:
        btns = re.findall(r'<[^>]*class=["\'][^"\']*product-action-btn[^"\']*["\'][^>]*>', content)
        for b in btns:
            components['product_actions'].append((fname, b))
            
    # Badges
    badge_matches = re.findall(r'<[^>]*class=["\']([^"\']*(?:badge|tag)[^"\']*)["\'][^>]*>', content)
    for bm in badge_matches:
        components['badges'].extend([c for c in bm.split() if 'badge' in c or 'tag' in c])
        
    # Tables
    if '<table' in content:
        components['tables'].append(fname)
        
    # Accordions
    if 'accordion' in content:
        components['accordions'].append(fname)
        
    # Tabs
    if 'nav-tabs' in content or 'nav-pills' in content:
        components['tabs'].append(fname)
        
    # Pagination
    if 'pagination' in content:
        components['pagination'].append(fname)
        
    # Modals
    if 'modal' in content:
        components['modals'].append(fname)
        
    # Forms
    if '<form' in content:
        components['forms'].append(fname)
        
    # Filters
    if 'filter' in content:
        components['filter_controls'].append(fname)
        
    # Buttons
    btn_matches = re.findall(r'class=["\']([^"\']*\bbtn\b[^"\']*)["\']', content)
    for bm in btn_matches:
        for c in bm.split():
            if c.startswith('btn'):
                components['buttons'].add(c)
                
    # Text utilities
    txt_matches = re.findall(r'class=["\']([^"\']*\btext-[^"\']*)["\']', content)
    for tm in txt_matches:
        for c in tm.split():
            if c.startswith('text-'):
                components['text_utilities'].add(c)
                
    # Bg utilities
    bg_matches = re.findall(r'class=["\']([^"\']*\bbg-[^"\']*)["\']', content)
    for bm in bg_matches:
        for c in bm.split():
            if c.startswith('bg-'):
                components['bg_utilities'].add(c)

print("\n--- STORY ORIGIN TAGS ---")
for fn, t in components['story_tags'][:10]:
    print(f"[{fn}] {t}")

print(f"\n--- PRODUCT ACTION BUTTONS: {len(components['product_actions'])} found ---")

print("\n--- UNIQUE BADGE CLASSES ---")
print(sorted(set(components['badges'])))

print("\n--- BUTTON CLASSES ---")
print(sorted(components['buttons']))

print("\n--- TEXT UTILITY CLASSES ---")
print(sorted(components['text_utilities']))

print("\n--- BG UTILITY CLASSES ---")
print(sorted(components['bg_utilities']))

print("\n--- PAGES WITH TABLES ---")
print(components['tables'])

print("\n--- PAGES WITH ACCORDIONS ---")
print(components['accordions'])

print("\n--- PAGES WITH TABS ---")
print(components['tabs'])

print("\n--- PAGES WITH PAGINATION ---")
print(components['pagination'])

print("\n--- PAGES WITH MODALS ---")
print(components['modals'])

print("\n--- PAGES WITH FORMS ---")
print(components['forms'])
