/* قطعتك - Service Worker
   عند أي تعديل على الموقع غيّر رقم VERSION أدناه ليصل التحديث للزوار. */
const VERSION='qt-v29';
const CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','logo-head.png','logo-head.webp'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==location.origin)return;               // نفس الموقع فقط (لا خطوط جوجل ولا واتساب)
  if(req.mode==='navigate'){                            // الصفحات: الشبكة أولاً ثم الكاش
    e.respondWith(fetch(req).then(r=>{
      const cp=r.clone();caches.open(VERSION).then(c=>c.put(req,cp));return r;
    }).catch(()=>caches.match(req).then(r=>r||caches.match('index.html')||caches.match('./'))));
    return;
  }
  e.respondWith(caches.open(VERSION).then(c=>c.match(req).then(hit=>{   // الملفات الثابتة: من الكاش فوراً وتتحدث في الخلفية
    const net=fetch(req).then(r=>{if(r&&r.ok)c.put(req,r.clone());return r}).catch(()=>hit);
    return hit||net;
  })));
});
