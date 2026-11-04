"""
Builder script to generate enhanced assets/css/style.css
Fixes all theme contrast, WCAG 2.2 AA accessibility, location badges, product action buttons, and dark mode consistency.
"""

new_css = """/* ==========================================================================
   NATUVA GOURMET — LUXURY DRY FRUITS & NUTS STORE
   Modern Multipurpose HTML Website Template
   Author: Senior Frontend Architect & Design Director
   Version: 1.1.0 — Complete Theme Contrast & Accessibility Audit Edition
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. DESIGN TOKENS & CSS CUSTOM PROPERTIES (LIGHT THEME)
   -------------------------------------------------------------------------- */
:root,
[data-bs-theme="light"],
[data-theme="light"] {
  /* Brand Primary & Greens */
  --color-primary: #183329;
  --color-primary-light: #25483B;
  --color-primary-dark: #0F221B;
  --color-primary-rgb: 24, 51, 41;

  --color-pistachio: #386644;
  --color-pistachio-light: #EDF4EE;
  --color-pistachio-dark: #23472E;
  --color-pistachio-rgb: 56, 102, 68;

  /* Gourmet Warm Accents (Almonds, Roasted, Honey, Gold) - WCAG AA Tuned */
  --color-almond: #7A4620;
  --color-almond-light: #F7EFE9;
  --color-cinnamon: #994719;
  --color-gold: #8E6516; /* 4.65:1 on #FAF7F2, 5.22:1 on #FFFFFF */
  --color-gold-light: #F5EBD7;
  --color-gold-dark: #6E4D0C;
  --color-gold-rgb: 142, 101, 22;

  /* Surfaces & Backgrounds - Light Theme */
  --bg-body: #FAF7F2;
  --bg-surface: #FFFFFF;
  --bg-surface-alt: #F3ECE1;
  --bg-surface-tint: #F7F3EA;
  --bg-header: rgba(250, 247, 242, 0.95);
  --bg-card: #FFFFFF;
  --bg-card-hover: #FFFFFF;
  --bg-footer: #11231C;
  --bg-modal: #FFFFFF;
  --bg-drawer: #FFFFFF;

  /* Typography Colors - Light Theme (All WCAG AA Verified) */
  --text-main: #182721;
  --text-heading: #10221A;
  --text-muted: #4E6057; /* 6.27:1 on #FAF7F2 */
  --text-subtle: #56685F; /* 5.55:1 on #FAF7F2 */
  --text-inverse: #FAF7F2;
  --text-gold: #8E6516;

  /* Centralized Theme Tokens */
  --color-bg: var(--bg-body);
  --color-surface: var(--bg-surface);
  --color-text: var(--text-main);
  --color-text-muted: var(--text-muted);
  --color-on-primary: #FFFFFF;
  --color-border: #E0D6C8;
  --color-border-medium: #C7BBA8;

  /* Borders & Dividers */
  --border-light: #E0D6C8;
  --border-medium: #C7BBA8;
  --border-focus: #386644;
  --border-gold: rgba(142, 101, 22, 0.45);

  /* Component Tokens: Product Action Buttons */
  --action-btn-bg: #FFFFFF;
  --action-btn-color: #183329;
  --action-btn-border: #C7BBA8;
  --action-btn-shadow: 0 4px 12px rgba(18, 36, 29, 0.16);
  --action-btn-hover-bg: #183329;
  --action-btn-hover-color: #FFFFFF;

  /* Component Tokens: Sourcing Location Badges */
  --badge-origin-bg: rgba(16, 34, 26, 0.92);
  --badge-origin-text: #FAF7F2;
  --badge-origin-icon: #F0C465;
  --badge-origin-border: rgba(240, 196, 101, 0.45);

  /* Shadows */
  --shadow-xs: 0 1px 3px rgba(18, 36, 29, 0.05);
  --shadow-sm: 0 4px 12px rgba(18, 36, 29, 0.06);
  --shadow-md: 0 8px 24px rgba(18, 36, 29, 0.08);
  --shadow-lg: 0 16px 36px rgba(18, 36, 29, 0.12);
  --shadow-xl: 0 24px 48px rgba(18, 36, 29, 0.16);
  --shadow-gold: 0 10px 25px rgba(142, 101, 22, 0.22);

  /* Typography Scale */
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-accent: 'Cormorant Garamond', Georgia, serif;

  /* Layout, Radius & Transitions */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-full: 9999px;

  --transition-fast: 0.18s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 0.42s cubic-bezier(0.2, 0.8, 0.2, 1);

  --header-height: 84px;
  --topbar-height: 40px;
}

/* --------------------------------------------------------------------------
   DARK THEME VARIABLES
   -------------------------------------------------------------------------- */
[data-bs-theme="dark"],
[data-theme="dark"] {
  /* Brand Primary & Greens */
  --color-primary: #386B55;
  --color-primary-light: #4A856C;
  --color-primary-dark: #1D3A2F;
  --color-primary-rgb: 56, 107, 85;

  --color-pistachio: #7CA888;
  --color-pistachio-light: #1A3023;
  --color-pistachio-dark: #A3CCA9;

  /* Gourmet Warm Accents - Bright & High Contrast for Dark Mode */
  --color-almond: #D9986A;
  --color-almond-light: #2A1D15;
  --color-cinnamon: #E29968;
  --color-gold: #E5C37A;
  --color-gold-light: #EBDCB7; /* CRITICAL FIX: Luminous cream gold, never dark brown */
  --color-gold-dark: #F5DCA3;
  --color-gold-rgb: 229, 195, 122;

  /* Surfaces & Backgrounds - Dark Theme */
  --bg-body: #0C1613;
  --bg-surface: #14221D;
  --bg-surface-alt: #1A2E26;
  --bg-surface-tint: #162621;
  --bg-header: rgba(12, 22, 19, 0.95);
  --bg-card: #15241F;
  --bg-card-hover: #1C3029;
  --bg-footer: #08100E;
  --bg-modal: #162621;
  --bg-drawer: #14221D;

  /* Typography Colors - Dark Theme (All WCAG AA Verified) */
  --text-main: #ECE7DE;
  --text-heading: #F8F5EE;
  --text-muted: #A3B5AC; /* 6.8:1 on #15241F */
  --text-subtle: #8A9E94; /* 4.8:1 on #15241F */
  --text-inverse: #0C1613;
  --text-gold: #E5C37A;

  /* Centralized Theme Tokens */
  --color-bg: var(--bg-body);
  --color-surface: var(--bg-surface);
  --color-text: var(--text-main);
  --color-text-muted: var(--text-muted);
  --color-on-primary: #0F221B;
  --color-border: #253B32;
  --color-border-medium: #354F43;

  /* Borders & Dividers */
  --border-light: #253B32;
  --border-medium: #354F43;
  --border-focus: #7CA888;
  --border-gold: rgba(229, 195, 122, 0.4);

  /* Component Tokens: Product Action Buttons */
  --action-btn-bg: #1F362C;
  --action-btn-color: #F8F5EE;
  --action-btn-border: rgba(229, 195, 122, 0.45);
  --action-btn-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
  --action-btn-hover-bg: #E5C37A;
  --action-btn-hover-color: #0F221B;

  /* Component Tokens: Sourcing Location Badges */
  --badge-origin-bg: rgba(9, 18, 14, 0.94);
  --badge-origin-text: #FAF7F2;
  --badge-origin-icon: #F0C465;
  --badge-origin-border: rgba(240, 196, 101, 0.45);

  /* Shadows */
  --shadow-xs: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.35);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.45);
  --shadow-lg: 0 16px 36px rgba(0, 0, 0, 0.55);
  --shadow-xl: 0 24px 48px rgba(0, 0, 0, 0.65);
  --shadow-gold: 0 10px 25px rgba(229, 195, 122, 0.18);
}

/* --------------------------------------------------------------------------
   2. RESET & BASE ELEMENTS
   -------------------------------------------------------------------------- */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

body {
  font-family: var(--font-sans);
  background-color: var(--bg-body);
  color: var(--text-main);
  line-height: 1.68;
  font-weight: 400;
  overflow-x: clip;
  transition: background-color var(--transition-normal), color var(--transition-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6,
.h1, .h2, .h3, .h4, .h5, .h6 {
  font-family: var(--font-serif);
  color: var(--text-heading);
  font-weight: 700;
  line-height: 1.24;
  letter-spacing: -0.015em;
  margin-bottom: 0.8rem;
}

h1, .h1 { font-size: clamp(2.2rem, 4.5vw, 3.8rem); font-weight: 700; }
h2, .h2 { font-size: clamp(1.85rem, 3.2vw, 2.75rem); font-weight: 700; }
h3, .h3 { font-size: clamp(1.4rem, 2.2vw, 1.95rem); font-weight: 600; }
h4, .h4 { font-size: clamp(1.15rem, 1.6vw, 1.45rem); font-weight: 600; }
h5, .h5 { font-size: 1.15rem; font-weight: 600; }
h6, .h6 { font-size: 0.95rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }

p {
  margin-bottom: 1.25rem;
}

p.lead {
  font-size: 1.15rem;
  font-weight: 400;
  line-height: 1.7;
  color: var(--text-muted);
}

a {
  color: var(--color-pistachio-dark);
  text-decoration: none;
  transition: color var(--transition-fast), border-color var(--transition-fast);
}

a:hover, a:focus-visible {
  color: var(--color-gold);
}

[data-bs-theme="dark"] a,
[data-theme="dark"] a {
  color: var(--color-pistachio);
}

[data-bs-theme="dark"] a:hover,
[data-bs-theme="dark"] a:focus-visible,
[data-theme="dark"] a:hover,
[data-theme="dark"] a:focus-visible {
  color: var(--color-gold);
}

img, svg {
  vertical-align: middle;
  max-width: 100%;
  height: auto;
}

ul, ol {
  padding-left: 1.25rem;
}

/* --------------------------------------------------------------------------
   3. UTILITY CLASSES, BADGES & HIGHLIGHTS
   -------------------------------------------------------------------------- */
.font-serif { font-family: var(--font-serif) !important; }
.font-sans { font-family: var(--font-sans) !important; }
.font-accent { font-family: var(--font-accent) !important; }

.bg-body-main { background-color: var(--bg-body) !important; }
.bg-surface-card { background-color: var(--bg-card) !important; }
.bg-surface-tinted { background-color: var(--bg-surface-tint) !important; }
.bg-surface-secondary { background-color: var(--bg-surface-alt) !important; }
.bg-brand-primary { background-color: var(--color-primary) !important; }
.bg-brand-dark { background-color: var(--bg-footer) !important; }

[data-bs-theme="dark"] .bg-brand-primary,
[data-theme="dark"] .bg-brand-primary {
  background-color: #163025 !important;
  border: 1px solid rgba(229, 195, 122, 0.3) !important;
}

.text-heading-color { color: var(--text-heading) !important; }
.text-body-color { color: var(--text-main) !important; }
.text-muted-color,
.text-muted { color: var(--text-muted) !important; }
.text-gold { color: var(--color-gold) !important; }
.text-pistachio { color: var(--color-pistachio) !important; }
.text-almond { color: var(--color-almond) !important; }

/* Enhanced warning text with WCAG AA compliance (4.5:1+) */
.text-warning {
  color: #8A5600 !important;
}

[data-bs-theme="dark"] .text-warning,
[data-theme="dark"] .text-warning {
  color: #FFD54F !important;
}

.border-theme { border: 1px solid var(--border-light) !important; }
.border-theme-gold { border: 1px solid var(--border-gold) !important; }

/* Subtitle Kicker Pill */
.section-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.38rem 0.95rem;
  border-radius: var(--radius-full);
  background-color: var(--color-pistachio-light);
  color: var(--color-primary);
  font-size: 0.825rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.9rem;
  border: 1px solid rgba(56, 102, 68, 0.25);
}

.section-kicker.kicker-gold {
  background-color: var(--color-gold-light);
  color: var(--color-almond);
  border-color: rgba(142, 101, 22, 0.35);
}

[data-bs-theme="dark"] .section-kicker,
[data-theme="dark"] .section-kicker {
  background-color: rgba(124, 168, 136, 0.2);
  color: #C5E5CD;
  border-color: rgba(124, 168, 136, 0.35);
}

[data-bs-theme="dark"] .section-kicker.kicker-gold,
[data-theme="dark"] .section-kicker.kicker-gold {
  background-color: rgba(229, 195, 122, 0.2);
  color: #F4DEAB;
  border-color: rgba(229, 195, 122, 0.4);
}

/* Kickers inside dark primary banner */
.bg-brand-primary .section-kicker,
.page-hero .section-kicker {
  background-color: rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
  border-color: rgba(255, 255, 255, 0.3);
}

.bg-brand-primary .section-kicker.kicker-gold,
.page-hero .section-kicker.kicker-gold {
  background-color: rgba(229, 195, 122, 0.25);
  color: #FCE6B8;
  border-color: rgba(229, 195, 122, 0.5);
}

/* High Contrast Subtle Badges */
.badge.bg-success-subtle {
  background-color: #E3F3E8 !important;
  color: #125624 !important;
  border: 1px solid rgba(18, 86, 36, 0.2);
}

.badge.bg-warning-subtle {
  background-color: #FEF6DC !important;
  color: #7A4B00 !important;
  border: 1px solid rgba(122, 75, 0, 0.2);
}

.badge.bg-info-subtle {
  background-color: #E5F1FC !important;
  color: #0C458A !important;
  border: 1px solid rgba(12, 69, 138, 0.2);
}

.badge.bg-danger-subtle {
  background-color: #FDE8E6 !important;
  color: #9E1B1B !important;
  border: 1px solid rgba(158, 27, 27, 0.2);
}

.badge.bg-primary-subtle {
  background-color: #E7EFEA !important;
  color: #143527 !important;
  border: 1px solid rgba(20, 53, 39, 0.2);
}

.badge.bg-secondary-subtle {
  background-color: #ECE8E1 !important;
  color: #3A4740 !important;
  border: 1px solid rgba(58, 71, 64, 0.2);
}

.badge.bg-gold-subtle {
  background-color: #F9F0DA !important;
  color: #6E4903 !important;
  border: 1px solid rgba(110, 73, 3, 0.25);
}

.badge.bg-pistachio-subtle {
  background-color: #EAF2EB !important;
  color: #1D4629 !important;
  border: 1px solid rgba(29, 70, 41, 0.25);
}

.badge.bg-almond-subtle {
  background-color: #F6EFE8 !important;
  color: #633212 !important;
  border: 1px solid rgba(99, 50, 18, 0.25);
}

[data-bs-theme="dark"] .badge.bg-success-subtle,
[data-theme="dark"] .badge.bg-success-subtle {
  background-color: rgba(76, 175, 80, 0.18) !important;
  color: #81C784 !important;
  border: 1px solid rgba(129, 199, 132, 0.35);
}

[data-bs-theme="dark"] .badge.bg-warning-subtle,
[data-theme="dark"] .badge.bg-warning-subtle {
  background-color: rgba(255, 193, 7, 0.18) !important;
  color: #FFD54F !important;
  border: 1px solid rgba(255, 213, 79, 0.35);
}

[data-bs-theme="dark"] .badge.bg-info-subtle,
[data-theme="dark"] .badge.bg-info-subtle {
  background-color: rgba(33, 150, 243, 0.18) !important;
  color: #90CAF9 !important;
  border: 1px solid rgba(144, 202, 249, 0.35);
}

[data-bs-theme="dark"] .badge.bg-danger-subtle,
[data-theme="dark"] .badge.bg-danger-subtle {
  background-color: rgba(244, 67, 54, 0.18) !important;
  color: #EF9A9A !important;
  border: 1px solid rgba(239, 154, 154, 0.35);
}

[data-bs-theme="dark"] .badge.bg-primary-subtle,
[data-theme="dark"] .badge.bg-primary-subtle {
  background-color: rgba(94, 140, 106, 0.22) !important;
  color: #B1D4BA !important;
  border: 1px solid rgba(177, 212, 186, 0.35);
}

[data-bs-theme="dark"] .badge.bg-secondary-subtle,
[data-theme="dark"] .badge.bg-secondary-subtle {
  background-color: rgba(163, 181, 172, 0.2) !important;
  color: #D4DDD7 !important;
  border: 1px solid rgba(212, 221, 215, 0.35);
}

[data-bs-theme="dark"] .badge.bg-gold-subtle,
[data-theme="dark"] .badge.bg-gold-subtle {
  background-color: rgba(229, 195, 122, 0.18) !important;
  color: #E5C37A !important;
  border: 1px solid rgba(229, 195, 122, 0.4);
}

[data-bs-theme="dark"] .badge.bg-pistachio-subtle,
[data-theme="dark"] .badge.bg-pistachio-subtle {
  background-color: rgba(124, 168, 136, 0.2) !important;
  color: #A3CCA9 !important;
  border: 1px solid rgba(163, 204, 169, 0.35);
}

[data-bs-theme="dark"] .badge.bg-almond-subtle,
[data-theme="dark"] .badge.bg-almond-subtle {
  background-color: rgba(224, 159, 112, 0.2) !important;
  color: #E09F70 !important;
  border: 1px solid rgba(224, 159, 112, 0.35);
}

/* Solid background utilities */
.bg-gold {
  background-color: var(--color-gold) !important;
  color: #10251A !important;
}

.bg-pistachio {
  background-color: var(--color-pistachio) !important;
  color: #FFFFFF !important;
}

.bg-almond {
  background-color: var(--color-almond) !important;
  color: #FFFFFF !important;
}

.bg-primary-custom {
  background-color: var(--color-primary) !important;
  color: #FFFFFF !important;
}

[data-bs-theme="dark"] .bg-primary-custom,
[data-theme="dark"] .bg-primary-custom {
  background-color: #1C3328 !important;
  color: #F8F5EE !important;
  border: 1px solid rgba(229, 195, 122, 0.35) !important;
}

/* Badges with text-dark (e.g. Connoisseur Pick, Most Popular Choice) */
.badge.bg-gold.text-dark {
  background-color: var(--color-gold) !important;
  color: #10251A !important;
  border: 1px solid rgba(142, 101, 22, 0.4);
}

[data-bs-theme="dark"] .badge.bg-gold.text-dark,
[data-theme="dark"] .badge.bg-gold.text-dark {
  background-color: var(--color-gold) !important;
  color: #0C1813 !important;
  border: 1px solid rgba(229, 195, 122, 0.6);
}

.badge.bg-warning.text-dark {
  background-color: #E8A724 !important;
  color: #0C1813 !important;
  border: 1px solid rgba(142, 101, 22, 0.3);
}

[data-bs-theme="dark"] .badge.bg-warning.text-dark,
[data-theme="dark"] .badge.bg-warning.text-dark {
  background-color: #F0B843 !important;
  color: #0C1813 !important;
  border: 1px solid rgba(240, 184, 67, 0.5);
}

/* Section Header Structure */
.section-header {
  margin-bottom: 3rem;
}

.section-header .section-subtitle {
  max-width: 640px;
  color: var(--text-muted);
  font-size: 1.05rem;
  margin-left: auto;
  margin-right: auto;
}

.section-padding {
  padding-top: clamp(3.5rem, 6vw, 6rem);
  padding-bottom: clamp(3.5rem, 6vw, 6rem);
}

.section-padding-sm {
  padding-top: clamp(2.5rem, 4vw, 4rem);
  padding-bottom: clamp(2.5rem, 4vw, 4rem);
}

/* --------------------------------------------------------------------------
   4. BUTTONS & INTERACTIVE CONTROLS
   -------------------------------------------------------------------------- */
.btn {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.925rem;
  padding: 0.72rem 1.65rem;
  border-radius: var(--radius-full);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  transition: all var(--transition-fast);
  letter-spacing: 0.015em;
  border: 1px solid transparent;
}

.btn:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 3px;
}

/* Primary Forest Green */
.btn-primary-custom {
  background-color: var(--color-primary);
  color: #FFFFFF;
  border-color: var(--color-primary);
  box-shadow: 0 4px 14px rgba(24, 51, 41, 0.2);
}

.btn-primary-custom:hover {
  background-color: var(--color-primary-light);
  color: #FFFFFF;
  border-color: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(24, 51, 41, 0.28);
}

[data-bs-theme="dark"] .btn-primary-custom,
[data-theme="dark"] .btn-primary-custom {
  background-color: var(--color-gold);
  color: #0F221B;
  border-color: var(--color-gold);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
}

[data-bs-theme="dark"] .btn-primary-custom:hover,
[data-theme="dark"] .btn-primary-custom:hover {
  background-color: #F0D495;
  color: #0A1612;
  border-color: #F0D495;
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(229, 195, 122, 0.35);
}

/* Luxury Gold Button */
.btn-gold {
  background-color: var(--color-gold);
  color: #10251A;
  border-color: var(--color-gold);
  box-shadow: 0 4px 15px rgba(142, 101, 22, 0.25);
  font-weight: 700;
}

.btn-gold:hover {
  background-color: #C29B48;
  color: #0A1612;
  border-color: #C29B48;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(142, 101, 22, 0.35);
}

[data-bs-theme="dark"] .btn-gold,
[data-theme="dark"] .btn-gold {
  background-color: var(--color-gold);
  color: #0F221B;
  border-color: var(--color-gold);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35);
}

[data-bs-theme="dark"] .btn-gold:hover,
[data-theme="dark"] .btn-gold:hover {
  background-color: #F0D495;
  color: #0A1612;
  border-color: #F0D495;
}

/* Outline Buttons */
.btn-outline-custom {
  background-color: transparent;
  color: var(--text-heading);
  border-color: var(--border-medium);
}

.btn-outline-custom:hover {
  background-color: var(--color-primary);
  color: #FFFFFF;
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

[data-bs-theme="dark"] .btn-outline-custom,
[data-theme="dark"] .btn-outline-custom {
  color: var(--text-heading);
  border-color: var(--border-medium);
}

[data-bs-theme="dark"] .btn-outline-custom:hover,
[data-theme="dark"] .btn-outline-custom:hover {
  background-color: var(--color-gold);
  color: #0F221B;
  border-color: var(--color-gold);
}

.btn-outline-gold {
  background-color: transparent;
  color: var(--color-gold);
  border-color: var(--color-gold);
}

.btn-outline-gold:hover {
  background-color: var(--color-gold);
  color: #10251A;
  transform: translateY(-2px);
}

[data-bs-theme="dark"] .btn-outline-gold,
[data-theme="dark"] .btn-outline-gold {
  color: var(--color-gold);
  border-color: var(--color-gold);
}

[data-bs-theme="dark"] .btn-outline-gold:hover,
[data-theme="dark"] .btn-outline-gold:hover {
  background-color: var(--color-gold);
  color: #0F221B;
}

/* Pack Size Toggle Button (Active States) */
.pack-size-btn.active,
.btn-outline-custom.active,
.btn-outline-custom:active {
  background-color: var(--color-primary);
  color: #FFFFFF;
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(24, 51, 41, 0.2);
}

[data-bs-theme="dark"] .pack-size-btn.active,
[data-bs-theme="dark"] .btn-outline-custom.active,
[data-bs-theme="dark"] .btn-outline-custom:active,
[data-theme="dark"] .pack-size-btn.active,
[data-theme="dark"] .btn-outline-custom.active,
[data-theme="dark"] .btn-outline-custom:active {
  background-color: var(--color-gold);
  color: #0F221B;
  border-color: var(--color-gold);
  box-shadow: 0 4px 14px rgba(229, 195, 122, 0.35);
}

.btn-outline-light:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
}

.btn-icon-square {
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: var(--radius-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-icon-circle {
  width: 42px;
  height: 42px;
  padding: 0;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* --------------------------------------------------------------------------
   5. TOPBAR & MAIN NAVIGATION
   -------------------------------------------------------------------------- */
.topbar {
  background-color: var(--color-primary-dark);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.825rem;
  padding: 0.45rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  position: relative;
  z-index: 1030;
}

.topbar a {
  color: rgba(255, 255, 255, 0.9);
}

.topbar a:hover {
  color: #F4EAD3;
}

.topbar-badge {
  background-color: rgba(194, 155, 72, 0.25);
  color: #F4EAD3;
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  margin-right: 0.5rem;
  border: 1px solid rgba(244, 234, 211, 0.3);
}

.site-header {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: var(--bg-header);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-light);
  z-index: 1020;
  transition: box-shadow var(--transition-normal), background-color var(--transition-normal);
}

.site-header.is-scrolled {
  box-shadow: var(--shadow-sm);
}

.site-header > .container {
  width: 100%;
  max-width: 1600px;
  padding-inline: clamp(16px, 2.5vw, 40px);
}

.site-header .navbar {
  min-height: 80px;
  column-gap: 1rem;
}

.site-header .navbar-collapse {
  min-width: 0;
  gap: 1rem;
}

.site-header .navbar-nav {
  align-items: center;
}

.site-header .navbar-nav .nav-link {
  white-space: nowrap;
  padding: 0.65rem clamp(0.4rem, 0.7vw, 0.75rem) !important;
}

.site-header .navbar-toggler {
  width: 44px;
  height: 44px;
  padding: 0;
  flex-shrink: 0;
  border-color: var(--border-medium);
}

.site-header .navbar-toggler:focus {
  box-shadow: 0 0 0 3px rgba(56, 102, 68, 0.25);
}

.navbar-brand-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  margin: 0;
}

.brand-symbol {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-primary), var(--color-pistachio-dark));
  color: var(--color-gold-light);
  border-radius: 12px;
  font-size: 1.35rem;
  box-shadow: 0 4px 10px rgba(24, 51, 41, 0.2);
}

[data-bs-theme="dark"] .brand-symbol,
[data-theme="dark"] .brand-symbol {
  background: linear-gradient(135deg, #1C3328, #2E5643);
  color: #EBDCB7;
  border: 1px solid rgba(229, 195, 122, 0.35);
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-family: var(--font-serif);
  font-size: 1.45rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--text-heading);
  line-height: 1;
}

.brand-tagline {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--color-gold);
  font-weight: 600;
  margin-top: 3px;
}

/* Nav Links */
.navbar-nav .nav-link {
  font-family: var(--font-sans);
  font-size: 0.935rem;
  font-weight: 500;
  color: var(--text-main);
  padding: 0.65rem 1rem !important;
  position: relative;
  transition: color var(--transition-fast);
}

.navbar-nav .nav-link:hover,
.navbar-nav .nav-link:focus,
.navbar-nav .nav-link.active {
  color: var(--color-pistachio-dark);
}

[data-bs-theme="dark"] .navbar-nav .nav-link:hover,
[data-bs-theme="dark"] .navbar-nav .nav-link:focus,
[data-bs-theme="dark"] .navbar-nav .nav-link.active,
[data-theme="dark"] .navbar-nav .nav-link:hover,
[data-theme="dark"] .navbar-nav .nav-link:focus,
[data-theme="dark"] .navbar-nav .nav-link.active {
  color: var(--color-gold);
}

/* Dropdown Menu */
.navbar-nav .dropdown-menu {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: 0.65rem;
  min-width: 220px;
  margin-top: 0.5rem;
  animation: fadeInMenu 0.2s ease-out;
}

@keyframes fadeInMenu {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.dropdown-item {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-main);
  padding: 0.6rem 0.95rem;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: all var(--transition-fast);
}

.dropdown-item:hover, .dropdown-item:focus {
  background-color: var(--bg-surface-tint);
  color: var(--color-primary);
  transform: translateX(3px);
}

[data-bs-theme="dark"] .dropdown-item:hover,
[data-bs-theme="dark"] .dropdown-item:focus,
[data-theme="dark"] .dropdown-item:hover,
[data-theme="dark"] .dropdown-item:focus {
  background-color: var(--bg-surface-alt);
  color: var(--color-gold);
}

/* Header Action Icons */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.header-action-btn {
  background: var(--bg-surface-tint);
  border: 1px solid var(--border-medium);
  color: var(--text-heading);
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  padding: 0;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  line-height: 1;
  position: relative;
  transition: all var(--transition-fast);
}

.header-action-btn:hover {
  background-color: var(--color-primary);
  color: #FFFFFF;
  border-color: var(--color-primary);
}

[data-bs-theme="dark"] .header-action-btn,
[data-theme="dark"] .header-action-btn {
  background-color: var(--bg-surface-alt);
  border-color: var(--border-medium);
  color: var(--text-heading);
}

[data-bs-theme="dark"] .header-action-btn:hover,
[data-theme="dark"] .header-action-btn:hover {
  background-color: var(--color-gold);
  color: #0F221B;
  border-color: var(--color-gold);
}

.header-action-btn.rtl-toggle-btn {
  font-size: 0.75rem;
  font-weight: 700;
}

.header-action-btn.header-shop-btn {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: #FFFFFF;
}

[data-bs-theme="dark"] .header-action-btn.header-shop-btn,
[data-theme="dark"] .header-action-btn.header-shop-btn {
  background-color: var(--color-gold);
  border-color: var(--color-gold);
  color: #0F221B;
}

.header-action-btn:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
}

.cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: var(--color-almond);
  color: #FFFFFF;
  font-size: 0.7rem;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.25);
  border: 1px solid #FFFFFF;
}

[data-bs-theme="dark"] .cart-badge,
[data-theme="dark"] .cart-badge {
  border-color: #0C1613;
}

/* --------------------------------------------------------------------------
   6. HERO SECTIONS (HOME 1 & HOME 2 DISTINCT DESIGNS)
   -------------------------------------------------------------------------- */
/* Home 1 Hero */
.hero-home-1 {
  background: radial-gradient(circle at 80% 20%, rgba(56, 102, 68, 0.12) 0%, transparent 60%),
              radial-gradient(circle at 10% 80%, rgba(142, 101, 22, 0.1) 0%, transparent 50%),
              var(--bg-body);
  padding: clamp(3rem, 6vw, 6.5rem) 0 clamp(3.5rem, 7vw, 7rem);
  position: relative;
  overflow: hidden;
}

.hero-home-1::before {
  content: "";
  position: absolute;
  top: -150px;
  right: -100px;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(142, 101, 22, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.hero-title-large {
  font-size: clamp(2.4rem, 5.2vw, 4.2rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--text-heading);
  margin-bottom: 1.4rem;
}

.hero-title-large .highlight {
  color: var(--color-pistachio-dark);
  font-style: italic;
  font-weight: 600;
  position: relative;
  display: inline-block;
}

[data-bs-theme="dark"] .hero-title-large .highlight,
[data-theme="dark"] .hero-title-large .highlight {
  color: var(--color-gold);
}

.hero-stats-row {
  display: flex;
  align-items: center;
  gap: 2.2rem;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-light);
}

.hero-stat-item h4 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 0.15rem;
}

[data-bs-theme="dark"] .hero-stat-item h4,
[data-theme="dark"] .hero-stat-item h4 {
  color: var(--color-gold);
}

.hero-stat-item p {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.hero-visual-card {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-light);
}

.hero-visual-card img {
  width: 100%;
  height: clamp(380px, 48vw, 540px);
  object-fit: cover;
  transition: transform 0.8s ease;
}

.hero-visual-card:hover img {
  transform: scale(1.03);
}

.hero-floating-badge {
  position: absolute;
  bottom: 24px;
  left: 24px;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 0.9rem 1.4rem;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 0.85rem;
  z-index: 3;
}

[data-bs-theme="dark"] .hero-floating-badge,
[data-theme="dark"] .hero-floating-badge {
  background: rgba(18, 32, 26, 0.94);
  border-color: rgba(229, 195, 122, 0.35);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.hero-floating-badge-icon {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: var(--color-gold-light);
  color: var(--color-almond);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

[data-bs-theme="dark"] .hero-floating-badge-icon,
[data-theme="dark"] .hero-floating-badge-icon {
  background-color: rgba(229, 195, 122, 0.2);
  color: var(--color-gold);
}

/* Home 2 Hero */
.hero-home-2 {
  background-color: var(--bg-surface-tint);
  padding: clamp(3.5rem, 6.5vw, 6.5rem) 0;
  position: relative;
  border-bottom: 1px solid var(--border-light);
}

.hero-split-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(2rem, 4vw, 4rem);
  align-items: center;
}

@media (max-width: 991px) {
  .hero-split-grid {
    grid-template-columns: 1fr;
  }
}

.hero-curated-gallery {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1.2rem;
  position: relative;
}

.hero-curated-img-main {
  height: 460px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.hero-curated-img-secondary {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.hero-curated-thumb {
  height: 220px;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.hero-curated-img-main img,
.hero-curated-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.hero-curated-img-main:hover img,
.hero-curated-thumb:hover img {
  transform: scale(1.04);
}

/* Page Inner Hero */
.page-hero {
  background: linear-gradient(135deg, rgba(24, 51, 41, 0.97), rgba(15, 34, 27, 0.98)),
              var(--color-primary);
  color: #FFFFFF;
  padding: clamp(2.5rem, 4vw, 4rem) 0;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--border-light);
}

[data-bs-theme="dark"] .page-hero,
[data-theme="dark"] .page-hero {
  background: linear-gradient(135deg, rgba(14, 28, 22, 0.98), rgba(9, 18, 14, 0.99)),
              #0C1613;
  border-bottom-color: rgba(229, 195, 122, 0.25);
}

.page-hero-title {
  color: #FFFFFF;
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  margin-bottom: 0.75rem;
}

.page-hero p.lead,
.page-hero p.text-white-50,
.bg-brand-primary p.lead,
.bg-brand-primary p.text-white-50 {
  color: rgba(255, 255, 255, 0.88) !important;
}

/* --------------------------------------------------------------------------
   7. PRODUCT CARDS & ACTION BUTTONS
   -------------------------------------------------------------------------- */
.product-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 1.15rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  box-shadow: var(--shadow-xs);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: var(--border-medium);
}

[data-bs-theme="dark"] .product-card:hover,
[data-theme="dark"] .product-card:hover {
  border-color: rgba(229, 195, 122, 0.35);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45);
}

.product-badge-wrap {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.badge-tag {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.3rem 0.7rem;
  border-radius: var(--radius-full);
}

.badge-organic {
  background-color: #245532;
  color: #FFFFFF;
  box-shadow: 0 2px 6px rgba(36, 85, 50, 0.25);
}

.badge-sale {
  background-color: #9E3E12;
  color: #FFFFFF;
  box-shadow: 0 2px 6px rgba(158, 62, 18, 0.25);
}

.badge-premium {
  background-color: #D4A745;
  color: #0F221B;
  box-shadow: 0 2px 6px rgba(212, 167, 69, 0.3);
}

[data-bs-theme="dark"] .badge-organic,
[data-theme="dark"] .badge-organic {
  background-color: #2E6B3F;
}

[data-bs-theme="dark"] .badge-sale,
[data-theme="dark"] .badge-sale {
  background-color: #B84A17;
}

[data-bs-theme="dark"] .badge-premium,
[data-theme="dark"] .badge-premium {
  background-color: #E5C37A;
  color: #0A1612;
}

.product-thumb-wrap {
  position: relative;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background-color: var(--bg-surface-alt);
  aspect-ratio: 1 / 1;
  margin-bottom: 1.1rem;
}

.product-thumb-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-thumb-wrap img {
  transform: scale(1.06);
}

/* ISSUE 2 FIX: Product Quick Action Buttons & Icons */
.product-quick-actions {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  opacity: 0;
  display: flex;
  gap: 0.6rem;
  transition: all var(--transition-normal);
  z-index: 4;
  pointer-events: none;
}

.product-card:hover .product-quick-actions,
.product-card:focus-within .product-quick-actions {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
  pointer-events: auto;
}

.product-action-btn {
  width: 42px;
  height: 42px;
  min-width: 42px;
  min-height: 42px;
  border-radius: 50%;
  background-color: var(--action-btn-bg);
  color: var(--action-btn-color);
  border: 1px solid var(--action-btn-border);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--action-btn-shadow);
  transition: all var(--transition-fast);
  cursor: pointer;
  padding: 0;
  text-decoration: none;
}

.product-action-btn i {
  font-size: 1.15rem;
  line-height: 1;
  display: inline-block;
  color: inherit;
  transition: transform var(--transition-fast);
}

.product-action-btn:hover {
  background-color: var(--action-btn-hover-bg);
  color: var(--action-btn-hover-color);
  border-color: var(--action-btn-hover-bg);
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}

.product-action-btn:hover i {
  transform: scale(1.12);
}

.product-action-btn:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
}

.product-action-btn:active {
  transform: translateY(0);
  filter: brightness(0.92);
}

.product-action-btn:disabled,
.product-action-btn.disabled {
  opacity: 0.55;
  cursor: not-allowed;
  pointer-events: none;
}

.product-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.45rem;
}

.product-category-label {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-pistachio-dark);
}

[data-bs-theme="dark"] .product-category-label,
[data-theme="dark"] .product-category-label {
  color: var(--color-gold);
}

.product-weight-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-weight: 500;
}

.product-card-title {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.35;
  margin-bottom: 0.5rem;
}

.product-card-title a {
  color: var(--text-heading);
}

.product-card-title a:hover {
  color: var(--color-pistachio);
}

[data-bs-theme="dark"] .product-card-title a:hover,
[data-theme="dark"] .product-card-title a:hover {
  color: var(--color-gold);
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: #D88918;
  margin-bottom: 0.75rem;
}

[data-bs-theme="dark"] .product-rating,
[data-theme="dark"] .product-rating {
  color: #EAA938;
}

.product-rating .rating-count {
  color: var(--text-muted);
  font-size: 0.75rem;
  margin-left: 0.3rem;
}

.product-card-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--border-light);
}

.product-price-wrap {
  display: flex;
  flex-wrap: wrap;
  min-width: 0;
  align-items: baseline;
  gap: 0.45rem;
}

.product-card-footer > .btn {
  flex-shrink: 0;
  width: auto;
}

.current-price, .original-price {
  white-space: nowrap;
}

.current-price {
  font-family: var(--font-sans);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-primary);
}

[data-bs-theme="dark"] .current-price,
[data-theme="dark"] .current-price {
  color: var(--color-gold);
}

.original-price {
  font-size: 0.85rem;
  color: var(--text-subtle);
  text-decoration: line-through;
}

/* Category Feature Card */
.category-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 1.4rem 1.1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: var(--shadow-xs);
  transition: all var(--transition-normal);
  height: 100%;
}

.category-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-pistachio);
}

[data-bs-theme="dark"] .category-card:hover,
[data-theme="dark"] .category-card:hover {
  border-color: var(--color-gold);
}

.category-img-wrap {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  border: 2px solid var(--border-medium);
  box-shadow: var(--shadow-sm);
  background-color: var(--bg-surface-alt);
}

.category-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.category-card:hover .category-img-wrap img {
  transform: scale(1.12);
}

.category-title {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text-heading);
}

.category-count {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* --------------------------------------------------------------------------
   8. GIFT BOX CARDS & LUXURY HAMPER CATALOG
   -------------------------------------------------------------------------- */
.gift-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-gold);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.gift-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-gold);
}

.gift-thumb-wrap {
  position: relative;
  aspect-ratio: 16 / 11;
  overflow: hidden;
  background-color: var(--bg-surface-alt);
}

.gift-thumb-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.gift-card:hover .gift-thumb-wrap img {
  transform: scale(1.05);
}

.gift-card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.gift-occasion-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-almond);
  margin-bottom: 0.4rem;
}

[data-bs-theme="dark"] .gift-occasion-badge,
[data-theme="dark"] .gift-occasion-badge {
  color: var(--color-gold);
}

.gift-card-title {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
}

.gift-card-title a {
  color: var(--text-heading);
}

.gift-card-title a:hover {
  color: var(--color-gold);
}

.gift-items-preview {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.55;
  margin-bottom: 1.2rem;
}

/* --------------------------------------------------------------------------
   9. SOURCING STORIES & LOCATION BADGES (ISSUE 1 FIX)
   -------------------------------------------------------------------------- */
.story-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-xs);
  transition: all var(--transition-normal);
}

.story-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: var(--border-medium);
}

[data-bs-theme="dark"] .story-card:hover,
[data-theme="dark"] .story-card:hover {
  border-color: rgba(229, 195, 122, 0.35);
}

.story-thumb-wrap {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background-color: var(--bg-surface-alt);
}

.story-thumb-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.story-card:hover .story-thumb-wrap img {
  transform: scale(1.05);
}

/* ISSUE 1 FIX: Location Badges */
.story-origin-tag {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--badge-origin-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: var(--badge-origin-text);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.38rem 0.85rem;
  border-radius: var(--radius-full);
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border: 1px solid var(--badge-origin-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  letter-spacing: 0.02em;
  z-index: 3;
}

.story-origin-tag i {
  color: var(--badge-origin-icon);
  font-size: 0.85rem;
  line-height: 1;
  display: inline-block;
  flex-shrink: 0;
}

.story-card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.story-card-title {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  line-height: 1.35;
}

.story-card-title a {
  color: var(--text-heading);
}

.story-card-title a:hover {
  color: var(--color-pistachio);
}

[data-bs-theme="dark"] .story-card-title a:hover,
[data-theme="dark"] .story-card-title a:hover {
  color: var(--color-gold);
}

/* --------------------------------------------------------------------------
   10. BLOG CARDS & ARTICLE LAYOUT
   -------------------------------------------------------------------------- */
.blog-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-xs);
  transition: all var(--transition-normal);
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: var(--border-medium);
}

[data-bs-theme="dark"] .blog-card:hover,
[data-theme="dark"] .blog-card:hover {
  border-color: rgba(229, 195, 122, 0.35);
}

.blog-thumb-wrap {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background-color: var(--bg-surface-alt);
}

.blog-thumb-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-card:hover .blog-thumb-wrap img {
  transform: scale(1.06);
}

.blog-card-body {
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.blog-meta-bar {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.65rem;
}

.blog-meta-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.blog-card-title {
  font-family: var(--font-serif);
  font-size: 1.22rem;
  font-weight: 600;
  line-height: 1.38;
  margin-bottom: 0.75rem;
}

.blog-card-title a {
  color: var(--text-heading);
}

.blog-card-title a:hover {
  color: var(--color-pistachio);
}

[data-bs-theme="dark"] .blog-card-title a:hover,
[data-theme="dark"] .blog-card-title a:hover {
  color: var(--color-gold);
}

.blog-excerpt {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.1rem;
}

/* --------------------------------------------------------------------------
   11. TESTIMONIALS & TRUST SECTION
   -------------------------------------------------------------------------- */
.testimonial-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-xs);
  transition: all var(--transition-normal);
  position: relative;
}

.testimonial-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--border-medium);
}

[data-bs-theme="dark"] .testimonial-card:hover,
[data-theme="dark"] .testimonial-card:hover {
  border-color: rgba(229, 195, 122, 0.35);
}

.testimonial-stars {
  color: #D88918;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

[data-bs-theme="dark"] .testimonial-stars,
[data-theme="dark"] .testimonial-stars {
  color: #EAA938;
}

.testimonial-quote {
  font-family: var(--font-accent);
  font-size: 1.25rem;
  font-style: italic;
  line-height: 1.5;
  color: var(--text-heading);
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-light);
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-gold);
}

.author-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-heading);
  margin-bottom: 0.1rem;
}

.author-role {
  font-size: 0.78rem;
  color: var(--text-muted);
}

/* --------------------------------------------------------------------------
   12. SLIDE-OUT SHOPPING CART DRAWER & MODAL
   -------------------------------------------------------------------------- */
.cart-drawer-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(10, 20, 16, 0.7);
  backdrop-filter: blur(4px);
  z-index: 1060;
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-normal);
}

.cart-drawer-overlay.is-open {
  opacity: 1;
  visibility: visible;
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 440px;
  height: 100%;
  background-color: var(--bg-drawer);
  box-shadow: var(--shadow-xl);
  z-index: 1070;
  transform: translateX(100%);
  transition: transform var(--transition-smooth);
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--border-light);
}

.cart-drawer.is-open {
  transform: translateX(0);
}

.cart-drawer-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-light);
  background-color: var(--bg-surface-tint);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

[data-bs-theme="dark"] .cart-drawer-header,
[data-theme="dark"] .cart-drawer-header {
  background-color: var(--bg-surface-alt);
}

.cart-drawer-title {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  margin-bottom: 0;
  color: var(--text-heading);
}

.cart-drawer-items {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding-bottom: 1.1rem;
  border-bottom: 1px solid var(--border-light);
  position: relative;
}

.cart-item-img {
  width: 72px;
  height: 72px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  background-color: var(--bg-surface-alt);
  flex-shrink: 0;
  border: 1px solid var(--border-light);
}

.cart-item-info {
  flex-grow: 1;
}

.cart-item-title {
  font-family: var(--font-serif);
  font-size: 0.98rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
  line-height: 1.3;
  color: var(--text-heading);
}

.cart-item-meta {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.45rem;
}

.cart-qty-ctrl {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-full);
  padding: 0.2rem 0.5rem;
  gap: 0.55rem;
  background-color: var(--bg-surface);
}

[data-bs-theme="dark"] .cart-qty-ctrl,
[data-theme="dark"] .cart-qty-ctrl {
  background-color: var(--bg-surface-alt);
  border-color: var(--border-medium);
}

.cart-qty-btn {
  background: none;
  border: none;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-main);
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 50%;
  transition: all var(--transition-fast);
}

.cart-qty-btn:hover {
  background-color: var(--bg-surface-tint);
  color: var(--color-primary);
}

[data-bs-theme="dark"] .cart-qty-btn:hover,
[data-theme="dark"] .cart-qty-btn:hover {
  background-color: var(--bg-surface);
  color: var(--color-gold);
}

.cart-qty-num {
  font-size: 0.85rem;
  font-weight: 600;
  min-width: 16px;
  text-align: center;
  color: var(--text-heading);
}

.cart-item-remove {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0.25rem;
  transition: color var(--transition-fast);
}

.cart-item-remove:hover {
  color: #C23838;
}

[data-bs-theme="dark"] .cart-item-remove:hover,
[data-theme="dark"] .cart-item-remove:hover {
  color: #EF5350;
}

.cart-drawer-footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--border-light);
  background-color: var(--bg-surface-tint);
}

[data-bs-theme="dark"] .cart-drawer-footer,
[data-theme="dark"] .cart-drawer-footer {
  background-color: var(--bg-surface-alt);
}

.cart-subtotal-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: var(--text-muted);
}

.cart-total-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.1rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-heading);
}

.free-shipping-progress {
  background: rgba(56, 102, 68, 0.18);
  border-radius: var(--radius-full);
  height: 7px;
  overflow: hidden;
  margin-bottom: 0.85rem;
}

[data-bs-theme="dark"] .free-shipping-progress,
[data-theme="dark"] .free-shipping-progress {
  background: rgba(124, 168, 136, 0.2);
}

.free-shipping-bar {
  background: var(--color-pistachio);
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 0.4s ease;
}

[data-bs-theme="dark"] .free-shipping-bar,
[data-theme="dark"] .free-shipping-bar {
  background: var(--color-gold);
}

/* Modals */
.modal-content {
  background-color: var(--bg-modal);
  border: 1px solid var(--border-medium);
  color: var(--text-main);
  box-shadow: var(--shadow-xl);
  border-radius: var(--radius-lg);
}

.modal-header,
.modal-footer {
  border-color: var(--border-light);
}

[data-bs-theme="dark"] .btn-close,
[data-theme="dark"] .btn-close {
  filter: invert(1) grayscale(100%) brightness(200%);
}

/* --------------------------------------------------------------------------
   13. FORMS & INPUT CONTROLS
   -------------------------------------------------------------------------- */
.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-heading);
  margin-bottom: 0.4rem;
}

.form-control, .form-select {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-medium);
  color: var(--text-main);
  border-radius: var(--radius-sm);
  padding: 0.72rem 1.1rem;
  font-size: 0.935rem;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

[data-bs-theme="dark"] .form-control,
[data-bs-theme="dark"] .form-select,
[data-theme="dark"] .form-control,
[data-theme="dark"] .form-select {
  background-color: var(--bg-surface-alt);
  border-color: var(--border-medium);
  color: var(--text-main);
}

.form-control:focus, .form-select:focus {
  background-color: var(--bg-surface);
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(56, 102, 68, 0.25);
  color: var(--text-main);
}

[data-bs-theme="dark"] .form-control:focus,
[data-bs-theme="dark"] .form-select:focus,
[data-theme="dark"] .form-control:focus,
[data-theme="dark"] .form-select:focus {
  background-color: var(--bg-surface-alt);
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(229, 195, 122, 0.25);
  color: var(--text-heading);
}

.form-control::placeholder {
  color: var(--text-subtle);
  opacity: 1;
}

.form-check-input {
  background-color: var(--bg-surface);
  border: 2px solid var(--border-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}

[data-bs-theme="dark"] .form-check-input,
[data-theme="dark"] .form-check-input {
  background-color: var(--bg-surface-alt);
  border-color: var(--border-medium);
}

.form-check-input:checked {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

[data-bs-theme="dark"] .form-check-input:checked,
[data-theme="dark"] .form-check-input:checked {
  background-color: var(--color-gold);
  border-color: var(--color-gold);
}

.form-check-input:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(56, 102, 68, 0.25);
}

[data-bs-theme="dark"] .form-check-input:focus,
[data-theme="dark"] .form-check-input:focus {
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(229, 195, 122, 0.25);
}

.form-check-label {
  color: var(--text-main);
  font-size: 0.925rem;
  cursor: pointer;
}

.form-feedback {
  font-size: 0.8rem;
  margin-top: 0.35rem;
  display: none;
}

.is-invalid ~ .invalid-feedback,
.was-validated :invalid ~ .invalid-feedback {
  display: block;
  color: #B71C1C;
  font-weight: 500;
}

[data-bs-theme="dark"] .is-invalid ~ .invalid-feedback,
[data-bs-theme="dark"] .was-validated :invalid ~ .invalid-feedback,
[data-theme="dark"] .is-invalid ~ .invalid-feedback,
[data-theme="dark"] .was-validated :invalid ~ .invalid-feedback {
  color: #EF9A9A;
}

.is-valid ~ .valid-feedback {
  display: block;
  color: #125624;
  font-weight: 500;
}

[data-bs-theme="dark"] .is-valid ~ .valid-feedback,
[data-theme="dark"] .is-valid ~ .valid-feedback {
  color: #81C784;
}

/* --------------------------------------------------------------------------
   14. TABLES & DATA MATRICES
   -------------------------------------------------------------------------- */
.table {
  --bs-table-color: var(--text-main);
  --bs-table-bg: transparent;
  --bs-table-border-color: var(--border-light);
  color: var(--text-main);
  border-color: var(--border-light);
}

.table > :not(caption) > * > * {
  padding: 0.85rem 1rem;
  background-color: transparent;
  border-bottom-color: var(--border-light);
}

.table-hover > tbody > tr:hover > * {
  --bs-table-hover-bg: var(--bg-surface-tint);
  background-color: var(--bg-surface-tint);
  color: var(--text-heading);
}

[data-bs-theme="dark"] .table-hover > tbody > tr:hover > *,
[data-theme="dark"] .table-hover > tbody > tr:hover > * {
  --bs-table-hover-bg: var(--bg-card-hover);
  background-color: var(--bg-card-hover);
}

.table thead th,
.table .table-light th,
.table-light {
  background-color: var(--bg-surface-alt) !important;
  color: var(--text-heading) !important;
  font-family: var(--font-sans);
  font-weight: 700;
  letter-spacing: 0.02em;
  border-bottom: 2px solid var(--border-medium) !important;
}

[data-bs-theme="dark"] .table thead th,
[data-bs-theme="dark"] .table .table-light th,
[data-bs-theme="dark"] .table-light,
[data-theme="dark"] .table thead th,
[data-theme="dark"] .table .table-light th,
[data-theme="dark"] .table-light {
  background-color: var(--bg-surface-alt) !important;
  color: var(--text-heading) !important;
  border-bottom: 2px solid var(--border-medium) !important;
}

/* Progress bars */
.progress {
  background-color: var(--bg-surface-alt);
  border-radius: var(--radius-full);
  overflow: hidden;
}

[data-bs-theme="dark"] .progress,
[data-theme="dark"] .progress {
  background-color: #253B32;
}

.progress-bar.bg-pistachio {
  background-color: var(--color-pistachio) !important;
}

.progress-bar.bg-gold {
  background-color: var(--color-gold) !important;
}

.progress-bar.bg-almond {
  background-color: var(--color-almond) !important;
}

/* --------------------------------------------------------------------------
   15. ACCORDION (FAQ), TABS & GALLERY
   -------------------------------------------------------------------------- */
.accordion-custom .accordion-item {
  background-color: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md) !important;
  margin-bottom: 0.9rem;
  overflow: hidden;
  box-shadow: var(--shadow-xs);
}

.accordion-custom .accordion-button {
  background-color: var(--bg-card);
  color: var(--text-heading);
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 600;
  padding: 1.15rem 1.4rem;
  box-shadow: none;
}

.accordion-custom .accordion-button:not(.collapsed) {
  background-color: var(--bg-surface-tint);
  color: var(--color-primary);
}

[data-bs-theme="dark"] .accordion-custom .accordion-button:not(.collapsed),
[data-theme="dark"] .accordion-custom .accordion-button:not(.collapsed) {
  background-color: var(--bg-surface-alt);
  color: var(--color-gold);
}

.accordion-custom .accordion-body {
  padding: 1.25rem 1.4rem;
  color: var(--text-muted);
  font-size: 0.935rem;
  line-height: 1.68;
}

/* Product Detail Interactive Gallery Strip */
.gallery-thumb-item {
  border: 2px solid var(--border-light) !important;
  opacity: 0.72;
  transition: all var(--transition-fast);
  cursor: pointer;
}

.gallery-thumb-item:hover,
.gallery-thumb-item:focus-visible {
  opacity: 1;
  border-color: var(--color-primary) !important;
}

.gallery-thumb-item.active {
  opacity: 1;
  border-color: var(--color-primary) !important;
  box-shadow: 0 0 0 2px var(--color-gold) !important;
}

[data-bs-theme="dark"] .gallery-thumb-item,
[data-theme="dark"] .gallery-thumb-item {
  border-color: var(--border-medium) !important;
}

[data-bs-theme="dark"] .gallery-thumb-item:hover,
[data-bs-theme="dark"] .gallery-thumb-item:focus-visible,
[data-theme="dark"] .gallery-thumb-item:hover,
[data-theme="dark"] .gallery-thumb-item:focus-visible {
  border-color: var(--color-gold) !important;
}

[data-bs-theme="dark"] .gallery-thumb-item.active,
[data-theme="dark"] .gallery-thumb-item.active {
  border-color: var(--color-gold) !important;
  box-shadow: 0 0 0 2px var(--color-gold) !important;
}

#detail-qty-input {
  color: var(--text-heading) !important;
}

/* Nav Tabs */
.nav-tabs {
  border-bottom: 2px solid var(--border-light);
}

.nav-tabs .nav-link {
  color: var(--text-muted);
  font-weight: 600;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 0.75rem 1.25rem;
  margin-bottom: -2px;
  transition: all var(--transition-fast);
}

.nav-tabs .nav-link:hover {
  color: var(--text-heading);
  border-color: transparent;
}

.nav-tabs .nav-link.active {
  color: var(--color-primary);
  background-color: transparent;
  border-bottom: 2px solid var(--color-primary);
}

[data-bs-theme="dark"] .nav-tabs .nav-link.active,
[data-theme="dark"] .nav-tabs .nav-link.active {
  color: var(--color-gold);
  border-bottom-color: var(--color-gold);
}

/* Filter Sidebar Controls (products.html) */
.filter-sidebar {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-xs);
}

.filter-group-title {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-heading);
  margin-bottom: 0.85rem;
}

.filter-category-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.45rem 0.65rem;
  border-radius: var(--radius-sm);
  color: var(--text-main);
  background: transparent;
  border: none;
  font-size: 0.9rem;
  transition: all var(--transition-fast);
}

.filter-category-btn:hover,
.filter-category-btn.active {
  background-color: var(--bg-surface-tint);
  color: var(--color-primary);
  font-weight: 600;
}

[data-bs-theme="dark"] .filter-category-btn:hover,
[data-bs-theme="dark"] .filter-category-btn.active,
[data-theme="dark"] .filter-category-btn:hover,
[data-theme="dark"] .filter-category-btn.active {
  background-color: var(--bg-surface-alt);
  color: var(--color-gold);
}

/* --------------------------------------------------------------------------
   16. FOOTER, COPYRIGHT & SCROLL TO TOP
   -------------------------------------------------------------------------- */
.site-footer {
  background-color: var(--bg-footer);
  color: rgba(250, 247, 242, 0.85);
  padding-top: clamp(4rem, 6vw, 5.5rem);
  padding-bottom: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.site-footer .footer-brand {
  width: fit-content;
}

.site-footer h5, .site-footer .footer-title {
  color: #FAF7F2;
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.35rem;
  letter-spacing: -0.01em;
}

.site-footer p {
  color: rgba(250, 247, 242, 0.8);
  font-size: 0.925rem;
  line-height: 1.65;
}

.footer-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-nav li {
  margin-bottom: 0.65rem;
}

.footer-nav a {
  color: rgba(250, 247, 242, 0.85);
  font-size: 0.925rem;
  transition: all var(--transition-fast);
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.footer-nav a:hover {
  color: #F4EAD3;
  transform: translateX(4px);
}

.footer-social-links {
  display: flex;
  gap: 0.65rem;
  margin-top: 1.25rem;
}

.social-icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #FAF7F2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all var(--transition-fast);
}

.social-icon-btn:hover {
  background: var(--color-gold);
  color: #10251A;
  border-color: var(--color-gold);
  transform: translateY(-3px);
}

.footer-newsletter-wrap {
  position: relative;
  margin-top: 1rem;
}

.footer-bottom {
  margin-top: 3.5rem;
  padding-top: 1.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.85rem;
  color: rgba(250, 247, 242, 0.7);
}

/* Scroll To Top Button */
.scroll-top-btn {
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: #FFFFFF;
  border: 1px solid var(--border-medium);
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 1040;
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-normal);
}

.scroll-top-btn.is-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.scroll-top-btn:hover {
  background-color: var(--color-gold);
  color: #10251A;
  transform: translateY(-3px);
}

[data-bs-theme="dark"] .scroll-top-btn,
[data-theme="dark"] .scroll-top-btn {
  background-color: var(--color-gold);
  color: #0F221B;
  border-color: rgba(229, 195, 122, 0.5);
}

[data-bs-theme="dark"] .scroll-top-btn:hover,
[data-theme="dark"] .scroll-top-btn:hover {
  background-color: #F0D495;
  color: #0A1612;
}
"""

with open('assets/css/style.css', 'w', encoding='utf-8') as f:
    f.write(new_css)

print("Updated assets/css/style.css successfully! Length:", len(new_css))
