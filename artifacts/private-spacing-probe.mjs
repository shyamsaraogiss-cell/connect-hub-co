// Dependency-free browser checks. Requires a local Chromium debugging endpoint.
// node scripts/verify-legal-browser.mjs [site URL] [debugging URL]
import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile } from 'node:fs/promises';

const site = 'http://localhost:3000';
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
 await send('Page.enable'); await send('Page.navigate',{url:site+'/pitru-moksha-gaya/online'});await ready();
 await send('Emulation.setDeviceMetricsOverride',{width:1024,height:768,deviceScaleFactor:1,mobile:false});
 console.dir(await evaluate(`(()=>{const cards=[...document.querySelectorAll('[class*="circumstanceNetwork"] > li')];return [4,2,1,0].map(p=>{cards.forEach(c=>{c.style.paddingInline=p+'px';c.style.gap='2px'});return {padding:p,cards:cards.map(c=>{let t=c.querySelector('span:last-child');return {text:t.textContent,width:t.getBoundingClientRect().width,height:t.getBoundingClientRect().height}})}})})()`),{depth:null});
}finally {socket.close();await fetch(`${debugging}/json/close/${page.id}`);}

