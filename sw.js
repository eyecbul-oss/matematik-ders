const CACHE_NAME="sezr-focus-clean-v13";
const FILES=["./","./index.html","./dersler.html","./youtube.html","./pdf.html","./focus.html","./iletisim.html","./style.css","./app.js","./manifest.json","./favicon.png","./favicon.ico","./profil.jpg","./math-bg.jpg","./preview.jpg","./focus-room.png","./focus-atmosphere.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(FILES).catch(()=>Promise.resolve())));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME?caches.delete(k):null))));self.clients.claim();});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match("./index.html"))));});
