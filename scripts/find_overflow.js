const { spawn } = require('child_process');
const path = require('path');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const WORKSPACE = "d:\\Desktop\\IQ-CRM projects\\DryNuts";
const PORT = 9225;

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function checkOverflowElements() {
  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--user-data-dir=' + path.join(WORKSPACE, 'scripts', 'chrome_temp_ovf')
  ]);

  await sleep(1500);

  try {
    const newTabRes = await fetch(`http://127.0.0.1:${PORT}/json/new`, { method: 'PUT' });
    const tabData = await newTabRes.json();
    const ws = new WebSocket(tabData.webSocketDebuggerUrl);

    let id = 1;
    const pending = new Map();
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        pending.get(msg.id)(msg);
        pending.delete(msg.id);
      }
    };

    await new Promise(r => ws.onopen = r);
    function send(method, params = {}) {
      return new Promise(r => {
        const cmdId = id++;
        pending.set(cmdId, r);
        ws.send(JSON.stringify({ id: cmdId, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 320,
      height: 568,
      deviceScaleFactor: 1,
      mobile: true
    });

    const fileUrl = `file:///${path.join(WORKSPACE, 'index.html').replace(/\\/g, '/')}`;
    await send('Page.navigate', { url: fileUrl });
    await sleep(800);

    const evalRes = await send('Runtime.evaluate', {
      expression: `
        (function() {
          const docWidth = document.documentElement.offsetWidth || window.innerWidth;
          const overflowing = [];
          document.querySelectorAll('*').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.right > docWidth + 1 || rect.width > docWidth + 1) {
              overflowing.push({
                tag: el.tagName,
                id: el.id,
                className: el.className,
                rectRight: rect.right,
                rectWidth: rect.width,
                docWidth: docWidth
              });
            }
          });
          return {
            docScrollWidth: document.documentElement.scrollWidth,
            bodyScrollWidth: document.body.scrollWidth,
            innerWidth: window.innerWidth,
            overflowing: overflowing.slice(0, 15)
          };
        })()
      `,
      returnByValue: true
    });

    console.log(JSON.stringify(evalRes, null, 2));
    ws.close();
  } finally {
    chrome.kill();
  }
}

checkOverflowElements();
