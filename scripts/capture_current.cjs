const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const WORKSPACE = "d:\\Desktop\\IQ-CRM projects\\DryNuts";
const PORT = 9226;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function capture() {
  const profileDir = path.join(WORKSPACE, 'scripts', 'chrome_temp_capture3');
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

    await sendCommand('Page.enable');
    await sendCommand('DOM.enable');
    await sendCommand('Runtime.enable');
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    async function screenshotElement(pageName, outputPath, elementSelector) {
      const loadPromise = new Promise(resolve => { loadFiredCallback = resolve; });
      const rawUrl = 'file:///' + path.join(WORKSPACE, pageName).replace(/\\/g, '/');
      const fileUrl = encodeURI(rawUrl);
      
      await sendCommand('Page.navigate', { url: fileUrl });
      await Promise.race([loadPromise, sleep(1500)]);
      await sleep(500);

      // Force light theme
      await sendCommand('Runtime.evaluate', {
        expression: `
          (function() {
            document.documentElement.setAttribute('data-bs-theme', 'light');
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.setAttribute('data-bs-theme', 'light');
            localStorage.setItem('natuva-theme', 'light');
            localStorage.setItem('theme', 'light');
          })()
        `
      });
      await sleep(300);

      // Scroll element into view and get its bounding rect
      const evalRes = await sendCommand('Runtime.evaluate', {
        expression: `
          (function() {
            const el = document.querySelector('${elementSelector}');
            if (!el) return null;
            el.scrollIntoView({ block: 'center' });
            const r = el.getBoundingClientRect();
            return { x: r.left + window.scrollX, y: r.top + window.scrollY, width: r.width, height: r.height };
          })()
        `,
        returnByValue: true
      });

      if (!evalRes.result || !evalRes.result.value) {
        console.error('Element not found on ' + pageName + ':', elementSelector);
        return;
      }

      const v = evalRes.result.value;
      const clip = { x: Math.max(0, v.x), y: Math.max(0, v.y), width: v.width, height: v.height, scale: 1 };

      const ssRes = await sendCommand('Page.captureScreenshot', {
        format: 'png',
        clip,
        captureBeyondViewport: true
      });

      if (ssRes.result && ssRes.result.data) {
        fs.writeFileSync(outputPath, Buffer.from(ssRes.result.data, 'base64'));
        console.log('Saved:', outputPath);
      }
    }

    // 1. About Precision Standard Section - the row containing the image and the 4 pillars
    await screenshotElement(
      'about.html',
      path.join(WORKSPACE, 'scripts', 'screenshots', 'about_precision_light.png'),
      'section.bg-body-main:nth-of-type(2) .row'
    );

    // 2. About Atelier CTA Banner
    await screenshotElement(
      'about.html',
      path.join(WORKSPACE, 'scripts', 'screenshots', 'about_atelier_cta_light.png'),
      'div.bg-brand-primary'
    );

    // 3. Products Mamra Almonds CTA Banner
    await screenshotElement(
      'products.html',
      path.join(WORKSPACE, 'scripts', 'screenshots', 'products_mamra_light.png'),
      'div.bg-brand-primary'
    );

    ws.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    chrome.kill();
  }
}

capture();
