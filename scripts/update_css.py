with open('assets/css/style.css', 'r', encoding='utf-8') as f:
    text = f.read()

target = """[data-bs-theme="dark"] .badge.bg-warning.text-dark,
[data-theme="dark"] .badge.bg-warning.text-dark {
  background-color: #F0B843 !important;
  color: #0C1813 !important;
  border: 1px solid rgba(240, 184, 67, 0.5);
}"""

addition = """

.section-kicker.bg-warning,
.section-kicker.kicker-gold.bg-warning {
  background-color: #E8A724 !important;
  color: #0C1813 !important;
  border: 1px solid rgba(142, 101, 22, 0.3) !important;
}

[data-bs-theme="dark"] .section-kicker.bg-warning,
[data-bs-theme="dark"] .section-kicker.kicker-gold.bg-warning,
[data-theme="dark"] .section-kicker.bg-warning,
[data-theme="dark"] .section-kicker.kicker-gold.bg-warning {
  background-color: #F0B843 !important;
  color: #0C1813 !important;
  border: 1px solid rgba(240, 184, 67, 0.5) !important;
}"""

if target in text:
    text = text.replace(target, target + addition)
    with open('assets/css/style.css', 'w', encoding='utf-8', newline='\n') as f:
        f.write(text)
    print('Successfully added section-kicker.bg-warning rules')
else:
    print('Target not found')
