const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const WORKSPACE = "d:\\Desktop\\IQ-CRM projects\\DryNuts";
const CDP_PORT = 9340;

const server = http.createServer((req, res) => {
  const cleanPath = req.url.split('?')[0].replace(/^\/+/, '');
  let filePath = path.join(WORKSPACE, cleanPath);
  if (!cleanPath) filePath = path.join(WORKSPACE, 'index.html');
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeMap = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml'
    };
    res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(0, async () => {
  const HTTP_PORT = server.address().port;
  console.log(`Server listening at http://127.0.0.1:${HTTP_PORT}`);

  const profileDir = path.join(WORKSPACE, 'scripts', 'temp_prof_' + Date.now());
  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${CDP_PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--user-data-dir=' + profileDir
  ]);

  await new Promise(r => setTimeout(r, 2000));
  const tabs = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`)).json();
  const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  function send(method, params = {}) {
    return new Promise(resolve => {
      const myId = id++;
      const handler = (evt) => {
        const m = JSON.parse(evt.data);
        if (m.id === myId) {
          ws.removeEventListener('message', handler);
          resolve(m.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: myId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  async function navigate(url) {
    const loadPromise = new Promise(resolve => {
      const handler = (evt) => {
        const m = JSON.parse(evt.data);
        if (m.method === 'Page.loadEventFired') {
          ws.removeEventListener('message', handler);
          resolve();
        }
      };
      ws.addEventListener('message', handler);
    });
    await send('Page.navigate', { url });
    await loadPromise;
    await new Promise(r => setTimeout(r, 500));

    // Force light theme
    await send('Runtime.evaluate', {
      expression: `
        document.documentElement.setAttribute('data-bs-theme', 'light');
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.setAttribute('data-bs-theme', 'light');
        localStorage.setItem('natuva-theme', 'light');
        localStorage.setItem('theme', 'light');
      `
    });
    await new Promise(r => setTimeout(r, 300));
  }

  async function snap(selector, outFile) {
    const box = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.querySelector('${selector}');
          if (!el) return null;
          el.scrollIntoView({ block: 'center' });
          const r = el.getBoundingClientRect();
          return { x: r.left + window.scrollX, y: r.top + window.scrollY, width: r.width, height: r.height };
        })()
      `,
      returnByValue: true
    });
    console.log('Box for', selector, box.result ? box.result.value : null);

    if (box && box.result && box.result.value) {
      const v = box.result.value;
      const res = await send('Page.captureScreenshot', {
        format: 'png',
        clip: { x: Math.max(0, v.x), y: Math.max(0, v.y), width: v.width, height: v.height, scale: 1 },
        captureBeyondViewport: true
      });
      fs.writeFileSync(outFile, Buffer.from(res.data, 'base64'));
      console.log('Saved to', outFile);
    }
  }

  // --- ABOUT PAGE ---
  await navigate(`http://127.0.0.1:${HTTP_PORT}/about.html`);

  // 1. About Precision section image
  await snap(
    'img[src*="about-craft-sorting"]',
    'C:/Users/gokul/.gemini/antigravity/brain/375be137-3b8d-4375-bd71-0f08590a3f35/shot_precision_after.png'
  );

  // 1b. About Precision section whole row
  await snap(
    'section.bg-body-main:nth-of-type(2) .row',
    'C:/Users/gokul/.gemini/antigravity/brain/375be137-3b8d-4375-bd71-0f08590a3f35/shot_precision_row_after.png'
  );

  // 2. About Atelier CTA banner
  await snap(
    'div.bg-brand-primary',
    'C:/Users/gokul/.gemini/antigravity/brain/375be137-3b8d-4375-bd71-0f08590a3f35/shot_atelier_cta_after.png'
  );

  // --- PRODUCTS PAGE ---
  await navigate(`http://127.0.0.1:${HTTP_PORT}/products.html`);

  // 3. Products Mamra Almonds CTA banner
  await snap(
    'div.bg-brand-primary',
    'C:/Users/gokul/.gemini/antigravity/brain/375be137-3b8d-4375-bd71-0f08590a3f35/shot_mamra_cta_after.png'
  );

  ws.close();
  chrome.kill();
  server.close();
  try { fs.rmSync(profileDir, { recursive: true, force: true }); } catch (e) {}
  process.exit(0);
});
