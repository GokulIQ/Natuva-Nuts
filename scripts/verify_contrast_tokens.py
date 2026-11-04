def lum(hex_code):
    h = hex_code.lstrip('#')
    rgb = [int(h[i:i+2], 16)/255.0 for i in (0, 2, 4)]
    rgb = [c/12.92 if c <= 0.03928 else ((c+0.055)/1.055)**2.4 for c in rgb]
    return 0.2126*rgb[0] + 0.7152*rgb[1] + 0.0722*rgb[2]

def ratio(c1, c2):
    l1, l2 = lum(c1), lum(c2)
    return (max(l1, l2) + 0.05) / (min(l1, l2) + 0.05)

# Proposed Color Tokens
tokens = {
    # Light theme
    'light_bg_body': '#FAF7F2',
    'light_bg_card': '#FFFFFF',
    'light_bg_surface_alt': '#F3ECE1',
    'light_bg_surface_tint': '#F7F3EA',
    'light_bg_footer': '#11231C',
    'light_text_main': '#182721',
    'light_text_heading': '#10221A',
    'light_text_muted': '#4E6057',
    'light_text_subtle': '#56685F',
    'light_primary': '#183329',
    'light_pistachio': '#386644',
    'light_pistachio_dark': '#23472E',
    'light_gold': '#8E6516',
    'light_gold_light': '#F5EBD7',
    'light_almond': '#7A4620',
    'light_cinnamon': '#994719',
    'light_warning_text': '#7A4B00',
    'light_success_text': '#125624',
    'light_info_text': '#0C458A',
    'light_danger_text': '#9E1B1B',
    
    # Dark theme
    'dark_bg_body': '#0C1613',
    'dark_bg_card': '#15241F',
    'dark_bg_surface_alt': '#1A2E26',
    'dark_bg_surface_tint': '#162621',
    'dark_bg_footer': '#08100E',
    'dark_text_main': '#ECE7DE',
    'dark_text_heading': '#F8F5EE',
    'dark_text_muted': '#A3B5AC',
    'dark_text_subtle': '#8A9E94',
    'dark_primary': '#386B55',
    'dark_pistachio': '#7CA888',
    'dark_pistachio_dark': '#A3CCA9',
    'dark_gold': '#E5C37A',
    'dark_gold_light': '#EBDCB7',
    'dark_almond': '#D9986A',
    'dark_cinnamon': '#E29968',
    'dark_warning_text': '#FFD54F',
    'dark_success_text': '#81C784',
    'dark_info_text': '#90CAF9',
    'dark_danger_text': '#EF9A9A',
    
    # Component specific
    'origin_tag_bg_light': '#10221A',
    'origin_tag_text': '#FAF7F2',
    'origin_tag_icon': '#F0C465',
    'origin_tag_bg_dark': '#09120E',
    
    'action_btn_bg_light': '#FFFFFF',
    'action_btn_icon_light': '#183329',
    'action_btn_bg_dark': '#1F362C',
    'action_btn_icon_dark': '#F8F5EE',
    'action_btn_hover_bg_dark': '#E5C37A',
    'action_btn_hover_icon_dark': '#0F221B',
}

print("=== WCAG 2.2 AA CONTRAST AUDIT (Proposed Tokens) ===")

def test_pair(name, c_bg, c_fg, target=4.5):
    r = ratio(c_bg, c_fg)
    passed = r >= target
    status = "PASS" if passed else "FAIL"
    print(f"[{status}] {name:<45}: {r:.2f}:1 (Target: {target}:1)")
    return passed

all_pass = True

print("\n--- 1. ISSUE 1: SOURCING LOCATION BADGES ---")
all_pass &= test_pair("Origin Badge Text on Dark Green (Light)", tokens['origin_tag_bg_light'], tokens['origin_tag_text'], 4.5)
all_pass &= test_pair("Origin Badge Icon on Dark Green (Light)", tokens['origin_tag_bg_light'], tokens['origin_tag_icon'], 3.0)
all_pass &= test_pair("Origin Badge Text on Dark Green (Dark)", tokens['origin_tag_bg_dark'], tokens['origin_tag_text'], 4.5)
all_pass &= test_pair("Origin Badge Icon on Dark Green (Dark)", tokens['origin_tag_bg_dark'], tokens['origin_tag_icon'], 3.0)

print("\n--- 2. ISSUE 2: PRODUCT ACTION BUTTONS ---")
all_pass &= test_pair("Action Btn Icon on White Bg (Light)", tokens['action_btn_bg_light'], tokens['action_btn_icon_light'], 3.0)
all_pass &= test_pair("Action Btn Icon on Dark Elevated Bg (Dark)", tokens['action_btn_bg_dark'], tokens['action_btn_icon_dark'], 3.0)
all_pass &= test_pair("Action Btn Hover Icon on Gold Bg (Dark)", tokens['action_btn_hover_bg_dark'], tokens['action_btn_hover_icon_dark'], 3.0)

print("\n--- 3. LIGHT MODE GENERAL TEXT & CONTROLS ---")
all_pass &= test_pair("Main text on bg-body", tokens['light_bg_body'], tokens['light_text_main'], 4.5)
all_pass &= test_pair("Heading text on bg-body", tokens['light_bg_body'], tokens['light_text_heading'], 4.5)
all_pass &= test_pair("Muted text on bg-body", tokens['light_bg_body'], tokens['light_text_muted'], 4.5)
all_pass &= test_pair("Subtle text on bg-body", tokens['light_bg_body'], tokens['light_text_subtle'], 4.5)
all_pass &= test_pair("Pistachio link on bg-card", tokens['light_bg_card'], tokens['light_pistachio'], 4.5)
all_pass &= test_pair("Gold accent text on bg-card", tokens['light_bg_card'], tokens['light_gold'], 4.5)
all_pass &= test_pair("Almond accent on bg-card", tokens['light_bg_card'], tokens['light_almond'], 4.5)
all_pass &= test_pair("Cinnamon accent on bg-card", tokens['light_bg_card'], tokens['light_cinnamon'], 4.5)
all_pass &= test_pair("Price text on bg-card", tokens['light_bg_card'], tokens['light_primary'], 4.5)
all_pass &= test_pair("Original price (subtle) on bg-card", tokens['light_bg_card'], tokens['light_text_subtle'], 4.5)

print("\n--- 4. DARK MODE GENERAL TEXT & CONTROLS ---")
all_pass &= test_pair("Main text on bg-card-dark", tokens['dark_bg_card'], tokens['dark_text_main'], 4.5)
all_pass &= test_pair("Heading text on bg-card-dark", tokens['dark_bg_card'], tokens['dark_text_heading'], 4.5)
all_pass &= test_pair("Muted text on bg-card-dark", tokens['dark_bg_card'], tokens['dark_text_muted'], 4.5)
all_pass &= test_pair("Subtle text on bg-card-dark", tokens['dark_bg_card'], tokens['dark_text_subtle'], 4.5)
all_pass &= test_pair("Gold price on bg-card-dark", tokens['dark_bg_card'], tokens['dark_gold'], 4.5)
all_pass &= test_pair("Pistachio accent on bg-card-dark", tokens['dark_bg_card'], tokens['dark_pistachio'], 4.5)
all_pass &= test_pair("Almond accent on bg-card-dark", tokens['dark_bg_card'], tokens['dark_almond'], 4.5)
all_pass &= test_pair("Cinnamon accent on bg-card-dark", tokens['dark_bg_card'], tokens['dark_cinnamon'], 4.5)

print("\n--- 5. SUBTLE BADGES & STATUS INDICATORS ---")
all_pass &= test_pair("Warning text on bg-warning-subtle (Light)", '#FEF6DC', tokens['light_warning_text'], 4.5)
all_pass &= test_pair("Success text on bg-success-subtle (Light)", '#E3F3E8', tokens['light_success_text'], 4.5)
all_pass &= test_pair("Info text on bg-info-subtle (Light)", '#E5F1FC', tokens['light_info_text'], 4.5)
all_pass &= test_pair("Danger text on bg-danger-subtle (Light)", '#FDE8E6', tokens['light_danger_text'], 4.5)
all_pass &= test_pair("Warning text on bg-warning-subtle (Dark)", '#262215', tokens['dark_warning_text'], 4.5)
all_pass &= test_pair("Success text on bg-success-subtle (Dark)", '#17271B', tokens['dark_success_text'], 4.5)
all_pass &= test_pair("Info text on bg-info-subtle (Dark)", '#13212C', tokens['dark_info_text'], 4.5)
all_pass &= test_pair("Danger text on bg-danger-subtle (Dark)", '#281717', tokens['dark_danger_text'], 4.5)

print("\n--- 6. FOOTER & DARK SECTIONS ---")
all_pass &= test_pair("Footer text on bg-footer", tokens['light_bg_footer'], '#FAF7F2', 4.5)
all_pass &= test_pair("Footer link on bg-footer", tokens['light_bg_footer'], '#EBDCB7', 4.5)
all_pass &= test_pair("Page Hero lead on brand-primary", tokens['light_primary'], '#FAF7F2', 4.5)

print(f"\nOVERALL RESULT: {'ALL TESTS PASSED' if all_pass else 'SOME TESTS FAILED'}")
