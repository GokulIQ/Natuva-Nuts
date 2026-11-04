import re

# Read original style.css
with open('assets/css/style.css.bak', 'r', encoding='utf-8') as f:
    orig = f.read()

# Let's inspect the sections in orig
sections = re.findall(r'/\* -{70,}\n\s*([^\n]+)\n\s*-{70,} \*/', orig)
print("Sections in style.css:")
for s in sections:
    print(" -", s)
