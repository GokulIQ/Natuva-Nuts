const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const WORKSPACE = "d:\\Desktop\\IQ-CRM projects\\DryNuts";
const PORT = 9223;

const pages = [
  'index.html', 'home-2.html', 'about.html', 'products.html',
  'product-details.html', 'gift-boxes.html', 'gift-details.html',
  'bulk-orders.html', 'pricing.html', 'projects.html',
  'project-details.html', 'blog.html', 'blog-details.html', 'contact.html'
];

const viewports = [
  { name: 'Mobile Small', width: 320, height: 568 },
  { name: 'Mobile Medium', width: 375, height: 667 },
  { name: 'Mobile Large', width: 425, height: 800 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Laptop', width: 1024, height: 768 },
  { name: 'Desktop', width: 1440, height: 900 }
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseRgb(colorStr) {
  if (!colorStr) return [0, 0, 0];
  const m = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return [0, 0, 0];
  return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
}

function luminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function contrastRatio(rgb1, rgb2) {
  const l1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  const l2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

async function main() {
  console.log("=== AUTOMATED BROWSER AUDIT: COMPUTED STYLES & CONTRAST ===");
  
  const profileDir = path.join(WORKSPACE, 'scripts', 'chrome_temp_profile');
  if (fs.existsSync(profileDir)) {
    try { fs.rmSync(profileDir, { recursive: true, force: true }); } catch (e) {}
  }

  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=' + profileDir
  ]);

  await sleep(1500);

  try {
    const versionRes = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    const versionData = await versionRes.json();
    console.log("Connected to Chrome:", versionData.Browser);

    const newTabRes = await fetch(`http://127.0.0.1:${PORT}/json/new`, { method: 'PUT' });
    const tabData = await newTabRes.json();
    const wsUrl = tabData.webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);

    let id = 1;
    const pending = new Map();
    let loadFiredCallback = null;

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Page.loadEventFired' && loadFiredCallback) {
        loadFiredCallback();
        loadFiredCallback = null;
      }
      if (msg.id && pending.has(msg.id)) {
        pending.get(msg.id)(msg);
        pending.delete(msg.id);
      }
    };

    await new Promise(resolve => ws.onopen = resolve);

    function sendCommand(method, params = {}) {
      return new Promise(resolve => {
        const cmdId = id++;
        pending.set(cmdId, resolve);
        ws.send(JSON.stringify({ id: cmdId, method, params }));
      });
    }

    async function navigateAndWait(url) {
      const loadPromise = new Promise(resolve => {
        loadFiredCallback = resolve;
      });
      await sendCommand('Page.navigate', { url });
      // Wait for loadEventFired or fallback timeout
      await Promise.race([loadPromise, sleep(1200)]);
      await sleep(200); // Allow any DOM adjustments
    }

    await sendCommand('Page.enable');
    await sendCommand('DOM.enable');
    await sendCommand('Runtime.enable');

    const auditResults = {
      pagesAudited: [],
      contrastChecks: [],
      overflowChecks: [],
      summary: { passed: 0, failed: 0 }
    };

    console.log("\n--- AUDITING CONTRAST OF COMPUTED STYLES ACROSS 14 PAGES ---");
    for (const page of pages) {
      for (const theme of ['light', 'dark']) {
        const fileUrl = `file:///${path.join(WORKSPACE, page).replace(/\\/g, '/')}?theme=${theme}`;
        await navigateAndWait(fileUrl);

        const evalRes = await sendCommand('Runtime.evaluate', {
          expression: `
            (function() {
              const bodyStyle = window.getComputedStyle(document.body);
              const docEl = document.documentElement;
              const hasOverflow = docEl.scrollWidth > window.innerWidth;
              
              // Find location badges
              const originBadges = Array.from(document.querySelectorAll('.story-origin-tag')).map(el => {
                const s = window.getComputedStyle(el);
                const icon = el.querySelector('i');
                const is = icon ? window.getComputedStyle(icon) : null;
                return {
                  text: el.textContent.trim(),
                  color: s.color,
                  backgroundColor: s.backgroundColor,
                  iconColor: is ? is.color : null
                };
              });

              // Find product action buttons
              const actionBtns = Array.from(document.querySelectorAll('.product-action-btn')).slice(0, 4).map(el => {
                const s = window.getComputedStyle(el);
                const icon = el.querySelector('i');
                const is = icon ? window.getComputedStyle(icon) : null;
                return {
                  color: s.color,
                  backgroundColor: s.backgroundColor,
                  borderColor: s.borderColor,
                  iconColor: is ? is.color : null,
                  width: s.width,
                  height: s.height
                };
              });

              // Prices
              const prices = Array.from(document.querySelectorAll('.current-price')).slice(0, 3).map(el => {
                const s = window.getComputedStyle(el);
                return { color: s.color };
              });

              // Section Kickers
              const kickers = Array.from(document.querySelectorAll('.section-kicker')).slice(0, 3).map(el => {
                const s = window.getComputedStyle(el);
                return {
                  text: el.textContent.trim(),
                  color: s.color,
                  backgroundColor: s.backgroundColor
                };
              });

              return {
                bodyBg: bodyStyle.backgroundColor,
                bodyColor: bodyStyle.color,
                scrollWidth: docEl.scrollWidth,
                innerWidth: window.innerWidth,
                hasOverflow: hasOverflow,
                originBadges,
                actionBtns,
                prices,
                kickers
              };
            })()
          `,
          returnByValue: true
        });

        const data = evalRes.result?.value;
        if (!data) continue;

        // Check origin badges
        if (data.originBadges && data.originBadges.length > 0) {
          for (const badge of data.originBadges) {
            const bgRgb = parseRgb(badge.backgroundColor);
            const textRgb = parseRgb(badge.color);
            const iconRgb = parseRgb(badge.iconColor);
            const textContrast = contrastRatio(bgRgb, textRgb);
            const iconContrast = contrastRatio(bgRgb, iconRgb);

            const passText = textContrast >= 4.5;
            const passIcon = iconContrast >= 3.0;
            console.log(`  [Location Badge] ${page} [${theme}] "${badge.text}": text ${textContrast.toFixed(2)}:1 [${passText ? 'PASS' : 'FAIL'}], icon ${iconContrast.toFixed(2)}:1 [${passIcon ? 'PASS' : 'FAIL'}]`);
            
            if (passText && passIcon) auditResults.summary.passed++;
            else auditResults.summary.failed++;
          }
        }

        // Check product action buttons
        if (data.actionBtns && data.actionBtns.length > 0) {
          for (const btn of data.actionBtns) {
            const btnBg = parseRgb(btn.backgroundColor);
            const btnFg = parseRgb(btn.iconColor || btn.color);
            const ratio = contrastRatio(btnBg, btnFg);
            const pass = ratio >= 3.0;
            console.log(`  [Product Action Btn] ${page} [${theme}]: contrast ${ratio.toFixed(2)}:1 (${btn.width}x${btn.height}) [${pass ? 'PASS' : 'FAIL'}]`);
            if (pass) auditResults.summary.passed++;
            else auditResults.summary.failed++;
          }
        }
      }
    }

    // 3. Test responsive viewports for overflow across 6 standard viewports
    console.log("\n--- TESTING 6 STANDARD VIEWPORTS FOR ZERO HORIZONTAL OVERFLOW ---");
    for (const vp of viewports) {
      await sendCommand('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 768
      });

      let vpPassed = true;
      for (const page of pages) {
        const fileUrl = `file:///${path.join(WORKSPACE, page).replace(/\\/g, '/')}`;
        await navigateAndWait(fileUrl);

        const checkRes = await sendCommand('Runtime.evaluate', {
          expression: `document.documentElement.scrollWidth <= window.innerWidth`,
          returnByValue: true
        });

        if (!checkRes.result?.value) {
          console.log(`  [OVERFLOW WARNING] ${page} at ${vp.name} (${vp.width}px) has scrollWidth > innerWidth`);
          vpPassed = false;
          auditResults.summary.failed++;
        } else {
          auditResults.summary.passed++;
        }
      }
      if (vpPassed) {
        console.log(`  [PASS] ${vp.name} (${vp.width}px): All 14 pages strictly fit with zero horizontal overflow.`);
      }
    }

    ws.close();
    console.log("\n=== FINAL AUDIT VERIFICATION ===");
    console.log(`Total Checks Passed: ${auditResults.summary.passed}`);
    console.log(`Total Checks Failed: ${auditResults.summary.failed}`);

  } catch (err) {
    console.error("Error during audit:", err);
  } finally {
    chrome.kill();
  }
}

main();
