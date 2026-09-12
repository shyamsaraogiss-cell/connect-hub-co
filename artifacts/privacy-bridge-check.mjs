// Dependency-free browser checks. Requires a local Chromium debugging endpoint.
// node scripts/verify-legal-browser.mjs [site URL] [debugging URL]
import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile } from 'node:fs/promises';

const site = 'http://localhost:3050';
const phase = process.argv[2] || 'before';
const debugging = 'http://localhost:9229';
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
    if (await evaluate('document.readyState === "complete" && !!document.querySelector("#online-page-title")')) return;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error('Legal page did not load');
}

try {
 await send('Page.enable');await send('Page.navigate',{url:site+'/pitru-moksha-gaya/online'});await ready();
 for(const width of [1024,1280,1440,1920]) {
 await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});
 const result=await evaluate(`(()=>{const list=document.querySelector('[class*="desktopCircumstances"]');const items=[...list.children];const bridge=document.querySelector('[class*="privacyBridge"]');const labels=items.map(e=>e.textContent);const overflow=items.some(e=>{const label=e.lastElementChild.getBoundingClientRect();const box=e.getBoundingClientRect();return label.right>box.right+1||label.bottom>box.bottom+1;});const icons=items.map(e=>[...e.querySelectorAll('svg path')].map(p=>p.getAttribute('d')).join('|'));const colors=items.every(e=>new Set([...e.querySelectorAll('svg path')].map(p=>p.getAttribute('stroke'))).size===3);return {labels,overflow,uniqueIcons:new Set(icons).size,colors,bridgeWidth:bridge.getBoundingClientRect().width,href:bridge.querySelector('a').getAttribute('href')};})()`);
 assert.equal(result.labels.length,10);assert.equal(result.uniqueIcons,10);assert(result.colors);assert(!result.overflow);assert.equal(result.bridgeWidth,190);assert.equal(result.href,'/contact?topic=private-ritual');console.log(width+': PASS ten entries, unique three-colour icons, no entry overflow, compact bridge and CTA destination');
 }
}finally {socket.close();await fetch(`${debugging}/json/close/${page.id}`);}

