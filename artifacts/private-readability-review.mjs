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
 await send('Page.enable'); await send('Runtime.enable');
 await send('Page.navigate',{url:site+'/pitru-moksha-gaya/online'});await ready();
 await mkdir('artifacts/private-readability-review',{recursive:true});
 const results=[];
 for(const [width,height] of [[1024,768],[1280,720],[1366,768],[1440,900],[1920,1080],[390,844]]) {
  await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
  await evaluate('window.scrollTo(0,0);new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
  const data=await evaluate(`(()=>{
   const find=part=>document.querySelector('[class*="'+part+'"]');
   const rect=el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom};};
   const textLines=el=>{const range=document.createRange();range.selectNodeContents(el);return [...range.getClientRects()].map(r=>({width:r.width,height:r.height,y:r.y}));};
   const cards=[...document.querySelectorAll('[class*="circumstanceNetwork"] > li, [class*="protectedPath"] > li')].map(el=>{const text=el.querySelector('h3')||el.querySelector('span:last-child');const s=getComputedStyle(text);return {text:text.textContent,card:rect(el),label:rect(text),font:s.fontSize,lineHeight:s.lineHeight,lines:textLines(text)};});
   return {canvas:rect(find('neonJourney')),private:rect(document.querySelector('#private-ritual')),recognition:rect(document.querySelector('#online-services')),cards,orbit:rect(find('remoteNetwork')),radialLabels:[...document.querySelectorAll('[class*="remoteNodes"] li > span:last-child')].map(el=>({text:el.textContent,...rect(el),lines:textLines(el)})),rows:getComputedStyle(find('circumstanceNetwork')).gridTemplateRows,columns:getComputedStyle(find('circumstanceNetwork')).gridTemplateColumns,privacy:rect(find('neonTrust')),lock:rect(find('trustLight')),headline:rect(find('neonTrust').querySelector('h3')),support:rect(find('neonTrust').querySelector('p')),cta:rect(find('privateEntry').querySelector('a'))};
  })()`);
  results.push({width,height,...data});
  console.log(`${phase} ${width}x${height}: workspace ${data.canvas.height}px, bottom ${data.canvas.bottom}, fonts ${data.cards[0].font}/${data.cards[9].font}, overflow ${data.cards.filter(c=>c.label.bottom>c.card.bottom+1||c.label.y<c.card.y-1).map(c=>c.text).join(' | ')||'none'}`);
  if([1024,1440].includes(width)){const shot=await send('Page.captureScreenshot',{format:'png'});await writeFile(`artifacts/private-readability-review/${phase}-${width}.png`,Buffer.from(shot.data,'base64'));}
 }
 await writeFile(`artifacts/private-readability-review/${phase}.json`,JSON.stringify(results,null,2));
} finally {
 await new Promise(r=>{socket.addEventListener('close',r,{once:true});socket.close();});
 await fetch(`${debugging}/json/close/${page.id}`);
}
