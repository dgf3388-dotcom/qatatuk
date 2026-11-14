// Service worker لتطبيق قطعتك: يخزّن ملفات الموقع ليفتح أسرع ويعمل الشكل الأساسي دون اتصال.
// عند تعديل الموقع غيّر رقم VERSION ليتحدث التطبيق عند المستخدمين.
const VERSION='qt-v2';
const CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','logo-head.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);if(u.origin!==location.origin)return; // لا نخزّن الخطوط ولا واتساب
  if(r.mode==='navigate'){ // الصفحة: الشبكة أولاً ثم النسخة المخزنة
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(VERSION).then(c=>c.put('index.html',cp));return res}).catch(()=>caches.match('index.html').then(x=>x||caches.match('./'))));
    return;
  }
  e.respondWith(caches.match(r).then(hit=>{ // الملفات: من الذاكرة ثم تحديثها في الخلفية
    const net=fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(VERSION).then(c=>c.put(r,cp))}return res}).catch(()=>hit);
    return hit||net;
  }));
});
