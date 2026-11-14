// تثبيت الموقع كتطبيق: تسجيل service worker + لافتة التثبيت (أندرويد/كروم) وتعليمات آيفون (سفاري)
(function(){
  if(window.self!==window.top)return; // لا يعمل داخل إطار
  const sec=location.protocol==='https:'||location.hostname==='localhost';
  if(sec&&'serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}))}
  const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
  if(standalone)return;
  const ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  const KEY='qt_pwa_dismiss',COOL=3*24*3600*1000;
  const store={get(){try{return +localStorage.getItem(KEY)||0}catch(e){return 0}},set(){try{localStorage.setItem(KEY,String(Date.now()))}catch(e){}}};
  const TX={ar:{t:'حمّل تطبيق قطعتك',s:'افتحه من شاشة جوالك الرئيسية بضغطة واحدة، وأرسل طلبك أسرع.',b:'تثبيت التطبيق',i:'اضغط على زر المشاركة',i2:'ثم اختر «إضافة إلى الشاشة الرئيسية».',ok:'فهمت',x:'إغلاق',f:'ثبّت التطبيق على جوالك'},
            en:{t:"Get the Qat'atuk app",s:'Open it from your phone home screen in one tap and send requests faster.',b:'Install app',i:'Tap the Share button',i2:'then choose “Add to Home Screen”.',ok:'Got it',x:'Close',f:'Install the app on your phone'}};
  const L=()=>(window.QT_I18N&&QT_I18N.lang)||'ar';
  let deferred=null,bar=null,footBtn=null;
  const shareIc='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M8 7l4-4 4 4M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg>';
  function build(){
    if(bar)return;
    bar=document.createElement('div');bar.className='pwa-bar';bar.setAttribute('role','dialog');bar.setAttribute('aria-label','install');
    bar.innerHTML='<img class="pwa-ic" src="icon-192.png" alt="" width="52" height="52"><div class="pwa-tx"><b></b><span></span></div><button type="button" class="btn btn-primary btn-attn pwa-go"></button><button type="button" class="pwa-x"></button>';
    document.body.appendChild(bar);
    bar.querySelector('.pwa-go').onclick=async()=>{
      if(deferred){deferred.prompt();try{await deferred.userChoice}catch(e){}deferred=null;hide(true)}else hide(true)};
    bar.querySelector('.pwa-x').onclick=()=>hide(true);
    text();
  }
  function text(){
    if(!bar)return;const x=TX[L()];
    bar.querySelector('b').textContent=x.t;
    const sp=bar.querySelector('.tx-s')||bar.querySelector('.pwa-tx span');
    if(deferred||!ios){sp.textContent=x.s}else{sp.innerHTML=x.i+' <i class="pwa-share">'+shareIc+'</i> '+x.i2}
    bar.querySelector('.pwa-go').textContent=(deferred||!ios)?x.b:x.ok;
    bar.querySelector('.pwa-x').setAttribute('aria-label',x.x);bar.querySelector('.pwa-x').textContent='×';
    if(footBtn)footBtn.textContent=x.f;
  }
  function show(){build();requestAnimationFrame(()=>bar.classList.add('on'))}
  function hide(remember){if(!bar)return;bar.classList.remove('on');if(remember)store.set()}
  function footer(){
    const host=document.querySelector('.foot-col:last-child');if(!host||footBtn)return;
    footBtn=document.createElement('a');footBtn.href='#';footBtn.className='foot-install';host.appendChild(footBtn);
    footBtn.onclick=e=>{e.preventDefault();build();text();show()};text();
  }
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;footer();text();schedule()});
  window.addEventListener('appinstalled',()=>{deferred=null;hide(false);if(footBtn)footBtn.remove()});
  if(window.QT_I18N)QT_I18N.onChange.push(text);
  let timer=null;
  function schedule(){if(timer||Date.now()-store.get()<COOL)return;timer=setTimeout(show,3500)}
  if(ios){footer();schedule()}
})();
