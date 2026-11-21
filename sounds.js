// أصوات تفاعلية هادئة مولَّدة برمجياً (Web Audio) بلا ملفات صوت: نقرات خفيفة، تأكيد، نجاح، وصوت ترحيب عند فتح التطبيق.
// زر السماعة في الأعلى يكتم/يفعّل الأصوات ويُحفظ اختيار الزائر.
(function(){
  var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
  var KEY='qt_sound',BOOT='qt_boot';
  var st={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}},
          sget:function(k){try{return sessionStorage.getItem(k)}catch(e){return null}},sset:function(k,v){try{sessionStorage.setItem(k,v)}catch(e){}}};
  var on=st.get(KEY)!=='0',ctx=null,master=null,last=0;
  // ---- محرك النغمات ----
  function tone(c,out,f,t,d,o){o=o||{};var osc=c.createOscillator(),g=c.createGain();osc.type=o.type||'sine';
    osc.frequency.setValueAtTime(f,t);if(o.to)osc.frequency.exponentialRampToValueAtTime(o.to,t+d*.8);
    var v=o.v||.2,a=o.a||.006;g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(0.0001,t+d);
    osc.connect(g);g.connect(out);osc.start(t);osc.stop(t+d+.05)}
  var R={
    tick:function(c,o,t){tone(c,o,1250,t,.05,{v:.12})},
    pop:function(c,o,t){tone(c,o,520,t,.09,{v:.2,to:980})},
    select:function(c,o,t){tone(c,o,659,t,.16,{type:'triangle',v:.16});tone(c,o,880,t+.07,.22,{type:'triangle',v:.16})},
    next:function(c,o,t){tone(c,o,523,t,.16,{v:.17,to:784});tone(c,o,1046,t+.07,.2,{v:.07})},
    back:function(c,o,t){tone(c,o,740,t,.16,{v:.13,to:520})},
    star1:function(c,o,t){tone(c,o,523,t,.26,{type:'triangle',v:.17})},star2:function(c,o,t){tone(c,o,587,t,.26,{type:'triangle',v:.17})},
    star3:function(c,o,t){tone(c,o,659,t,.28,{type:'triangle',v:.17})},star4:function(c,o,t){tone(c,o,784,t,.3,{type:'triangle',v:.17})},
    star5:function(c,o,t){tone(c,o,880,t,.34,{type:'triangle',v:.17});tone(c,o,1319,t+.08,.4,{v:.08})},
    ok:function(c,o,t){tone(c,o,988,t,.12,{v:.14});tone(c,o,1319,t+.08,.2,{v:.14})},
    error:function(c,o,t){tone(c,o,330,t,.16,{type:'triangle',v:.14});tone(c,o,262,t+.13,.22,{type:'triangle',v:.14})},
    success:function(c,o,t){[523,659,784,1046].forEach(function(f,i){tone(c,o,f,t+i*.11,.5,{type:'triangle',v:.17})});tone(c,o,2093,t+.4,.7,{v:.04})},
    boot:function(c,o,t){[392,523,659,784].forEach(function(f,i){tone(c,o,f,t+i*.16,.55,{type:'triangle',v:.15})});
      tone(c,o,1046,t+.64,1.3,{v:.13,a:.02});tone(c,o,2093,t+.68,1.1,{v:.035,a:.03});
      tone(c,o,262,t,1.7,{v:.05,a:.35});tone(c,o,392,t,1.7,{v:.04,a:.35})}
  };
  function ensure(){if(!ctx){try{ctx=new AC();master=ctx.createGain();master.gain.value=2.2;var cp=ctx.createDynamicsCompressor();master.connect(cp);cp.connect(ctx.destination)}catch(e){ctx=null;return false}}
    if(ctx.state==='suspended')ctx.resume().catch(function(){});return true}
  function play(n,force){if(!on&&!force)return;var now=Date.now();if(now-last<45&&n==='tick')return;last=now;if(!R[n]||!ensure())return;window.QT_SOUND.last=n;
    try{R[n](ctx,master,ctx.currentTime+.01)}catch(e){}}
  // للاختبار: تصيير الصوت دون تشغيله
  function render(n,dur){var oc=new (window.OfflineAudioContext||window.webkitOfflineAudioContext)(1,44100*(dur||2),44100),g=oc.createGain();g.gain.value=2.2;g.connect(oc.destination);R[n](oc,g,0);
    return oc.startRendering().then(function(b){var d=b.getChannelData(0),p=0,s=0;for(var i=0;i<d.length;i++){var a=Math.abs(d[i]);if(a>p)p=a;s+=d[i]*d[i]}return{peak:p,rms:Math.sqrt(s/d.length)}})}
  window.QT_SOUND={play:play,render:render,names:Object.keys(R),isOn:function(){return on}};
  // ---- زر الكتم ----
  var T={ar:{on:'إيقاف الأصوات',off:'تشغيل الأصوات'},en:{on:'Mute sounds',off:'Turn sounds on'}};
  var L=function(){return ((window.QT_I18N&&QT_I18N.lang)||document.documentElement.lang)==='en'?'en':'ar'};
  var ic='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z"/><path class="w1" d="M15 9.2a4 4 0 0 1 0 5.6"/><path class="w2" d="M17.4 6.8a7.4 7.4 0 0 1 0 10.4"/><path class="x" d="M15.5 9.5l5 5M20.5 9.5l-5 5"/></svg>';
  var btn=null;
  function paint(){if(!btn)return;btn.classList.toggle('off',!on);btn.setAttribute('aria-pressed',on?'true':'false');var l=L(),t=on?T[l].on:T[l].off;btn.setAttribute('aria-label',t);btn.title=t}
  function mount(){var host=document.querySelector('.nav-actions');if(!host||btn)return;btn=document.createElement('button');btn.type='button';btn.className='snd-btn';btn.innerHTML=ic;
    host.insertBefore(btn,host.firstChild);btn.onclick=function(e){e.stopPropagation();on=!on;st.set(KEY,on?'1':'0');paint();if(on)play('ok',true)};paint();
    if(window.QT_I18N)QT_I18N.onChange.push(paint)}
  // ---- ربط الأصوات بعناصر الموقع ----
  var errFlag=false;
  document.addEventListener('click',function(e){var t=e.target;if(!t.closest)return;if(t.closest('.snd-btn'))return;
    var s;
    if((s=t.closest('#nextBtn'))){errFlag=false;setTimeout(function(){play(errFlag?'error':'next')},110);return}
    if(t.closest('#submitBtn')){errFlag=false;setTimeout(function(){if(errFlag)play('error')},110);return}
    if(t.closest('#backBtn')){play('back');return}
    if((s=t.closest('.rev-rate label'))){var m=(s.getAttribute('for')||'').match(/(\d)$/);play('star'+(m?m[1]:3));return}
    if(t.closest('.part,.catpart,#catGrid button')){play('select');return}
    if(t.closest('#revF button[type=submit]')){setTimeout(function(){var er=document.querySelectorAll('#revF .err');for(var i=0;i<er.length;i++)if(er[i].textContent.trim()){play('error');return}},110);return}
    if(t.closest('#copyNo')){play('ok');return}
    if(t.closest('.wa-float,#waSend,#faqWa,.btn-wa-solid')){play('pop');return}
    if(t.closest('summary')){play('tick');return}
    if(t.closest('.btn,button,.lang,.burger,nav a,.faq-cta a,.art-card,.foot-col a')){play('tick')}
  },true);
  document.addEventListener('change',function(e){var t=e.target;if(t&&t.tagName==='SELECT')play('tick')},true);
  // نجاح الطلب أو التقييم + أخطاء التحقق
  function watch(){
    var sb=document.getElementById('successBox');
    if(sb)new MutationObserver(function(){if(!sb.hidden)play('success')}).observe(sb,{attributes:true,attributeFilter:['hidden']});
    var rf=document.getElementById('revForm');
    if(rf)new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1&&(n.classList.contains('rev-done')||n.querySelector('.rev-done')))play('success')})})}).observe(rf,{childList:true});
    new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var el=ms[i].target;if(el.classList&&el.classList.contains('invalid')&&!(ms[i].oldValue||'').match(/\binvalid\b/)){errFlag=true;return}}})
      .observe(document.body,{attributes:true,attributeFilter:['class'],attributeOldValue:true,subtree:true});
  }
  // ---- صوت الترحيب عند فتح التطبيق المثبّت ----
  function standalone(){return (window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||navigator.standalone===true||/[?&]source=pwa/.test(location.search)}
  function boot(){
    if(!on||!standalone()||st.sget(BOOT))return;
    function go(){if(st.sget(BOOT))return;st.sset(BOOT,'1');play('boot')}
    var c=null;try{c=new AC()}catch(e){}
    if(c&&c.state==='running'){ctx=c;master=ctx.createGain();master.gain.value=2.2;var cp=ctx.createDynamicsCompressor();master.connect(cp);cp.connect(ctx.destination);go();return}
    if(c&&c.close)c.close().catch(function(){});
    var t0=Date.now(),h=function(){document.removeEventListener('pointerdown',h,true);document.removeEventListener('keydown',h,true);if(Date.now()-t0<12000)go()};
    document.addEventListener('pointerdown',h,true);document.addEventListener('keydown',h,true);
  }
  // فك قفل الصوت في أول لمسة (آيفون وكروم)
  var unl=function(){ensure();document.removeEventListener('touchstart',unl,true);document.removeEventListener('pointerdown',unl,true)};
  document.addEventListener('touchstart',unl,true);document.addEventListener('pointerdown',unl,true);
  function init(){mount();watch();boot()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
