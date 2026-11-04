/**
 * NATUVA GOURMET — THEME & DIRECTION SWITCHER
 * Handles Dark/Light Mode and LTR/RTL Toggle with LocalStorage Persistence
 * Prevents FOUC (Flash of Unstyled Content)
 */

(function () {
  'use strict';

  const STORAGE_KEY_THEME = 'natuva_theme';
  const STORAGE_KEY_DIR = 'natuva_direction';

  // 1. Immediate Theme Initialization
  function getPreferredTheme() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlTheme = urlParams.get('theme');
      if (urlTheme === 'dark' || urlTheme === 'light') return urlTheme;
    } catch (e) {}
    const stored = localStorage.getItem(STORAGE_KEY_THEME);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const themeBtn = document.querySelectorAll('.theme-toggle-btn');
    themeBtn.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
      }
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    });
  }

  // 2. Immediate Direction (LTR / RTL) Initialization
  function getPreferredDirection() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlDir = urlParams.get('dir');
      if (urlDir === 'rtl' || urlDir === 'ltr') return urlDir;
    } catch (e) {}
    return localStorage.getItem(STORAGE_KEY_DIR) || 'ltr';
  }

  function applyDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    const rtlBtn = document.querySelectorAll('.rtl-toggle-btn');
    rtlBtn.forEach(btn => {
      btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      btn.setAttribute('aria-label', `Switch layout to ${dir === 'rtl' ? 'LTR' : 'RTL'}`);
    });
  }

  // Apply immediately upon script load
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  const currentDir = getPreferredDirection();
  applyDirection(currentDir);

  // Setup UI listeners once DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    // Re-sync UI state
    applyTheme(getPreferredTheme());
    applyDirection(getPreferredDirection());

    // Theme toggle button click handler
    document.addEventListener('click', function (e) {
      const target = e.target.closest('.theme-toggle-btn');
      if (target) {
        e.preventDefault();
        const activeTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
        const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem(STORAGE_KEY_THEME, nextTheme);
        applyTheme(nextTheme);
      }
    });

    // RTL toggle button click handler
    document.addEventListener('click', function (e) {
      const target = e.target.closest('.rtl-toggle-btn');
      if (target) {
        e.preventDefault();
        const activeDir = document.documentElement.getAttribute('dir') || 'ltr';
        const nextDir = activeDir === 'rtl' ? 'ltr' : 'rtl';
        localStorage.setItem(STORAGE_KEY_DIR, nextDir);
        applyDirection(nextDir);
      }
    });

    // Listen for OS theme changes if user has no explicit preference stored
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(STORAGE_KEY_THEME)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  });
})();
