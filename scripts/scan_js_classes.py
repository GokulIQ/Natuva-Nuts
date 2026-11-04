import glob, os, re

workspace = r'd:\Desktop\IQ-CRM projects\DryNuts'
js_files = glob.glob(os.path.join(workspace, 'assets', 'js', '*.js'))

js_classes = set()
for f in js_files:
    if 'bootstrap' in f: continue
    with open(f, encoding='utf-8') as fp:
        c = fp.read()
    matches = re.findall(r'class=["\']([^"\']+)["\']', c)
    for m in matches:
        for cls in m.split():
            js_classes.add(cls)
    matches2 = re.findall(r'classList\.(?:add|remove|toggle)\(["\']([^"\']+)["\']\)', c)
    for m in matches2:
        js_classes.add(m)

print("Classes in JS files:")
for cls in sorted(js_classes):
    print(" ", cls)
