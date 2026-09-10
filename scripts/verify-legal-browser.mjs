// Dependency-free browser checks. Requires a local Chromium debugging endpoint.
// node scripts/verify-legal-browser.mjs [site URL] [debugging URL]
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const site = process.argv[2] || 'http://localhost:3000';
const debugging = process.argv[3] || 'http://localhost:9227';
const page = await (await fetch(`${debugging}/json/new?about:blank`, { method: 'PUT' })).json();
const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
let sequence = 0;
const pending = new Map();
const errors = [];
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
  const request = pending.get(message.id);
  if (!request) return;
  pending.delete(message.id);
  if (message.error) request.reject(new Error(message.error.message));
  else request.resolve(message.result);
});
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  assert(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function ready() {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (await evaluate('document.readyState === "complete" && !!document.querySelector("[data-legal-document]")')) return;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error('Legal page did not load');
}

try {
  await send('Page.enable');
  await send('Runtime.enable');
  await mkdir('artifacts/legal-review', { recursive: true });
  for (const route of ['/policies-and-legal-terms', '/refund-policy']) {
    await send('Page.navigate', { url: site + route });
    await ready();
    for (const width of [1440, 1024, 768, 390, 320]) {
      await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
      await evaluate('window.scrollTo(0, 0); new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
      const geometry = await evaluate(`(() => {
        const article = document.querySelector('[data-legal-document]').getBoundingClientRect();
        return { viewport: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth, left: article.left, right: article.right, overflow: [...document.querySelectorAll('body *')].filter(el => { const r = el.getBoundingClientRect(); return r.width && r.right > innerWidth + 1; }).slice(0, 8).map(el => ({tag: el.tagName, class: el.className, right: el.getBoundingClientRect().right})) };
      })()`);
      if (geometry.scrollWidth > geometry.viewport + 1) console.log(`${route} ${width}px: existing shared-shell overflow ${Math.ceil(geometry.scrollWidth - geometry.viewport)}px`);
      const legalOverflow = await evaluate(`(() => {
        const root = document.querySelector('[data-legal-document]');
        return [...root.querySelectorAll('*')].some(el => el.getBoundingClientRect().right > document.documentElement.clientWidth + 1);
      })()`);
      assert(!legalOverflow, `${route} ${width}: legal content overflows`);
      assert(geometry.left >= 0 && geometry.right <= geometry.viewport + 1, 'Legal article outside viewport');
      if ([1440, 390].includes(width)) {
        const screenshot = await send('Page.captureScreenshot', { format: 'png' });
        await writeFile(`artifacts/legal-review/${route.slice(1)}-${width}.png`, Buffer.from(screenshot.data, 'base64'));
      }
      console.log(`${route} ${width}px: responsive bounds PASS`);
    }
    const contents = await evaluate(`(() => {
      const nav = document.querySelector('[aria-label="Legal document table of contents"]');
      return { links: nav.querySelectorAll('a').length, entries: nav.querySelectorAll('li > span').length,
        headings: document.querySelectorAll('[data-legal-body] :is(h2, h3, h4)').length };
    })()`);
    assert.equal(contents.links, 0, 'Contents must not contain jump links');
    assert.equal(contents.entries, contents.headings, 'Preserve every contents entry');
    console.log(`${route}: plain-text contents PASS`);
    const bodyScreenshot = await send('Page.captureScreenshot', { format: 'png' });
    await writeFile(`artifacts/legal-review/${route.slice(1)}-body.png`, Buffer.from(bodyScreenshot.data, 'base64'));
  }
  assert.deepEqual(errors, [], 'Browser runtime errors');
  console.log('Browser runtime: PASS');
} finally {
  await new Promise(resolve => { socket.addEventListener('close', resolve, { once: true }); socket.close(); });
  await fetch(`${debugging}/json/close/${page.id}`);
}
