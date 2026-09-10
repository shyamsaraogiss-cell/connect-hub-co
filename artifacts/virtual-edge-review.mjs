// Dependency-free browser checks. Requires a local Chromium debugging endpoint.
// node scripts/verify-legal-browser.mjs [site URL] [debugging URL]
import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile } from 'node:fs/promises';

const site = 'http://localhost:3000';
const phase = process.argv[2] || 'before';
const debugging = 'http://localhost:9228';
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
  await mkdir('artifacts/virtual-edge-review', {recursive:true});
  await send('Page.navigate', {url:site+'/pitru-moksha-gaya/online'}); await ready();
  const results=[];
  for(const width of [1024,1440,1920,768,390]) {
    await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
    await evaluate('window.scrollTo(0,0); new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
    const data=await evaluate(`(()=>{
      const main=document.querySelector('#virtual-shraddh main');
      const measure=el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return {left:r.left,right:r.right,width:r.width,height:r.height,paddingLeft:s.paddingLeft,paddingRight:s.paddingRight,maxWidth:s.maxWidth,font:s.font,color:s.color,animation:s.animation,transform:s.transform};};
      const find=part=>main.querySelector('[class*="'+part+'"]');
      return {viewport:document.documentElement.clientWidth,main:measure(main),title:measure(main.querySelector('section')),canvas:measure(find('neonJourney')),private:measure(document.querySelector('#private-ritual')),recognition:measure(document.querySelector('#online-services')),privacy:measure(find('neonTrust')),entry:measure(find('privateEntry')),orbit:measure(find('remoteNetwork')),divider:getComputedStyle(document.querySelector('#online-services')).borderLeft,header:measure(document.querySelector('body > header')||document.querySelector('header')),footer:measure(document.querySelector('body > footer')||[...document.querySelectorAll('footer')].at(-1))};
    })()`);
    results.push({width,...data});
    if(phase==='after' && width>=1024) {
      assert(data.main.left>=0 && data.main.left<=2, 'Left workspace gap');
      assert(data.viewport-data.main.right>=0 && data.viewport-data.main.right<=2, 'Right workspace gap');
      assert.equal(data.title.left,data.canvas.left);assert.equal(data.title.right,data.canvas.right);
      assert.equal(data.private.paddingLeft,'0px');assert.equal(data.private.paddingRight,'0px');
      assert.equal(data.recognition.paddingLeft,'0px');assert.equal(data.recognition.paddingRight,'0px');
      assert(Math.abs(data.privacy.width-data.private.width)<=1,'Privacy width must match left workspace');
      assert(Math.abs(data.entry.width-data.private.width)<=1,'CTA region width must match left workspace');
    }
    if([1440,1920,390].includes(width)) {
      const shot=await send('Page.captureScreenshot',{format:'png'});
      await writeFile(`artifacts/virtual-edge-review/${phase}-${width}.png`,Buffer.from(shot.data,'base64'));
    }
    console.log(`${phase} ${width}: left=${data.main.left}, right=${data.viewport-data.main.right}, panels=${data.private.width}/${data.recognition.width}, orbit=${data.orbit.width}x${data.orbit.height}`);
  }
  if(phase==='after') {
    const previous=JSON.parse(await readFile('artifacts/virtual-edge-review/before.json','utf8'));
    for(let i=0;i<results.length;i++) {
      const a=results[i],b=previous[i];
      if(a.width<1024) assert.deepEqual(a,b,'Tablet/mobile layout changed');
      for(const element of ['header','footer','orbit']) {
        for(const field of ['width','height','font','color','animation','transform']) assert.equal(a[element][field],b[element][field],`${element} ${field} changed`);
      }
      assert.equal(a.divider,b.divider,'Divider changed');
    }
    console.log('Desktop edges, shared shell, orbit, divider, and tablet/mobile preservation PASS');
  }
  await writeFile(`artifacts/virtual-edge-review/${phase}.json`,JSON.stringify(results,null,2));
  assert.deepEqual(errors,[],'Runtime errors');
} finally {
  await new Promise(resolve=>{socket.addEventListener('close',resolve,{once:true});socket.close();});
  await fetch(`${debugging}/json/close/${page.id}`);
}
