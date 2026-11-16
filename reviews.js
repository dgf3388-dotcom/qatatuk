// قسم تقييمات العملاء: يعرض التقييمات الحقيقية من reviews-data.js، أو دعوة للتقييم إن لم توجد بعد.
(function(){
  const box=document.getElementById('revBody');if(!box)return;
  const cfg=window.QT_CONFIG||{};const data=(window.QT_REVIEWS||[]).filter(r=>r&&r.text&&r.rating>=1);
  const L=()=>(window.QT_I18N&&QT_I18N.lang)||'ar';
  const TX={ar:{avg:'متوسط التقييم',of:'من 5',cnt:n=>n+(n===1?' تقييم':' تقييمات'),
      eT:'كن أول من يشاركنا تجربته',eP:'نعرض هنا آراء عملائنا الحقيقيين فقط، بعد إتمام طلباتهم. جرّب الخدمة وشاركنا رأيك بصراحة.',
      t1:'الخيارات والأسعار تصلك قبل أي التزام',t2:'لا دفع ولا حسابات عبر الموقع',t3:'تواصل مباشر وسريع عبر واتساب',
      cta:'شاركنا تقييمك عبر واتساب',more:'جرّبت خدمتنا؟ شاركنا رأيك',
      fT:'قيّم تجربتك مع قطعتك',fP:'اختر عدد النجوم واكتب رأيك، وسيصلنا مباشرة عبر واتساب.',
      fS:'عدد النجوم',w:['','ضعيف','مقبول','جيد','جيد جداً','ممتاز'],fN:'الاسم',fC:'المدينة',fPt:'القطعة التي طلبتها',fM:'تعليقك',opt:'(اختياري)',
      phN:'مثال: محمد',phP:'مثال: تيل فرامل',phM:'اكتب تجربتك بصراحة: سرعة الرد، توفر القطعة، جودتها…',
      eR:'اختر عدد النجوم',eN:'أدخل اسمك',eM:'اكتب تعليقاً لا يقل عن 10 أحرف',send:'إرسال التقييم عبر واتساب',
      note:'يفتح واتساب برسالة جاهزة، اضغط إرسال لتصلنا. لا نعرض رقمك للعامة.',
      okT:'شكراً لك!',okP:'إذا لم يفتح واتساب تلقائياً اضغط الزر أدناه، ولا يصلنا التقييم إلا بعد إرسال الرسالة.',okB:'فتح واتساب',again:'تقييم جديد',
      head:'تقييم عميل جديد - قطعتك'},
    en:{avg:'Average rating',of:'out of 5',cnt:n=>n+(n===1?' review':' reviews'),
      eT:'Be the first to share your experience',eP:'We only show real customer reviews here, after their requests are completed. Try the service and tell us honestly what you think.',
      t1:'Options and prices reach you before any commitment',t2:'No payment or accounts on the website',t3:'Direct, fast contact on WhatsApp',
      cta:'Share your review on WhatsApp',more:'Tried our service? Share your opinion',
      fT:'Rate your experience with Qat\'atuk',fP:'Pick the number of stars and write your opinion; it reaches us directly on WhatsApp.',
      fS:'Stars',w:['','Poor','Fair','Good','Very good','Excellent'],fN:'Name',fC:'City',fPt:'Part you requested',fM:'Your comment',opt:'(optional)',
      phN:'e.g. Mohammed',phP:'e.g. Brake pads',phM:'Tell us honestly: reply speed, part availability, quality…',
      eR:'Choose the number of stars',eN:'Enter your name',eM:'Write a comment of at least 10 characters',send:'Send review via WhatsApp',
      note:'WhatsApp opens with a ready message; press send so it reaches us. Your number is never shown publicly.',
      okT:'Thank you!',okP:'If WhatsApp did not open automatically, tap the button below. We only receive the review once you send the message.',okB:'Open WhatsApp',again:'New review',
      head:'تقييم عميل جديد - قطعتك'}};
  const star='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"/></svg>';
  const stars=n=>{let s='<span class="rev-stars" role="img" aria-label="'+n+'/5">';for(let i=1;i<=5;i++)s+='<i class="'+(i<=Math.round(n)?'on':'')+'">'+star+'</i>';return s+'</span>'};
  const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const wa=()=>'https://wa.me/'+(cfg.WHATSAPP_NUMBER||'')+'?text='+encodeURIComponent(TX[L()].msg);
  const waIc='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.27-1.38A9.9 9.9 0 1 0 12.04 2zm5.8 14.1c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.12.07-1.8-.11a16.5 16.5 0 0 1-1.63-.6c-2.87-1.24-4.74-4.13-4.89-4.32-.14-.19-1.17-1.56-1.17-2.97s.74-2.1 1-2.39a1.07 1.07 0 0 1 .78-.36h.56c.18 0 .42-.07.66.5.24.6.83 2.05.9 2.2.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.3-.12.58.17.29.74 1.22 1.6 1.98 1.1.98 2.03 1.28 2.32 1.43.29.14.46.12.63-.07.17-.2.72-.84.91-1.13.2-.29.38-.24.65-.14.26.1 1.67.79 1.96.93.29.14.48.22.55.34.07.12.07.7-.17 1.38z"/></svg>';
  const btn=t=>'<a class="btn btn-primary btn-attn btn-wa-solid" target="_blank" rel="noopener" href="'+esc(wa())+'">'+waIc+'<span>'+t+'</span></a>';
  const chk='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  function render(){
    const x=TX[L()],en=L()==='en';let h='';
    if(!data.length){h='';
    }else{
      const avg=data.reduce((a,r)=>a+r.rating,0)/data.length;
      h='<div class="rev-sum rv"><div class="rev-avg">'+avg.toFixed(1)+'</div><div>'+stars(avg)+'<div class="rev-cnt">'+x.avg+' · '+x.cnt(data.length)+'</div></div></div><div class="rev-grid">'+
        data.map((r,i)=>{const t=(en&&r.text_en)||r.text;const meta=[r.city,r.car].filter(Boolean).map(esc).join(' · ');
          return '<figure class="rev-card rv" style="--i:'+i+'"><div class="rev-q" aria-hidden="true">”</div>'+stars(r.rating)+'<blockquote>'+esc(t)+'</blockquote>'+
            (r.part?'<div class="rev-part">'+esc(r.part)+'</div>':'')+
            '<figcaption><span class="rev-av">'+esc((r.name||'?').trim().charAt(0))+'</span><span><b>'+esc(r.name)+'</b><small>'+meta+'</small></span></figcaption></figure>'}).join('')+
        '</div>';
    }
    box.innerHTML=h;
    if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
      const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('rv-in');io.unobserve(e.target)}}),{threshold:.15});
      box.querySelectorAll('.rv').forEach(el=>io.observe(el));
    }else box.querySelectorAll('.rv').forEach(el=>el.classList.add('rv-in'));
  }

  const fbox=document.getElementById('revForm');const S={r:0,n:'',c:'',p:'',m:'',done:false,wa:''};
  const starIc='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"/></svg>';
  function buildMsg(){const a=TX.ar;return a.head+'\n'+'★'.repeat(S.r)+'☆'.repeat(5-S.r)+' ('+S.r+'/5)\nالاسم: '+S.n+'\n'+(S.c?'المدينة: '+S.c+'\n':'')+(S.p?'القطعة: '+S.p+'\n':'')+'التعليق: '+S.m}
  function renderForm(){
    if(!fbox)return;const x=TX[L()];
    if(S.done){fbox.innerHTML='<div class="rev-form rev-done"><div class="rev-tick"><svg viewBox="0 0 24 24" aria-hidden="true"><path pathLength="1" d="M5 12.5l4.5 4.5L19 7.5"/></svg></div><h3>'+x.okT+'</h3>'+stars(S.r)+'<p>'+x.okP+'</p><a class="btn btn-primary btn-attn btn-wa-solid" target="_blank" rel="noopener" href="'+esc(S.wa)+'">'+waIc+'<span>'+x.okB+'</span></a><button type="button" class="rev-again">'+x.again+'</button></div>';
      fbox.querySelector('.rev-again').onclick=()=>{S.r=0;S.n=S.c=S.p=S.m='';S.done=false;renderForm()};return}
    let r='';for(let i=5;i>=1;i--)r+='<input type="radio" name="rate" id="rt'+i+'" value="'+i+'"'+(S.r===i?' checked':'')+'><label for="rt'+i+'" title="'+x.w[i]+'">'+starIc+'<span class="sr">'+x.w[i]+'</span></label>';
    fbox.innerHTML='<form class="rev-form" id="revF" novalidate><h3>'+x.fT+'</h3><p class="rev-fp">'+x.fP+'</p>'+
      '<div class="rev-fld"><div class="rev-lab">'+x.fS+'</div><div class="rev-pick"><div class="rev-rate" role="radiogroup" aria-label="'+x.fS+'">'+r+'</div><b class="rev-word">'+(x.w[S.r]||'')+'</b></div><div class="err" data-e="r"></div></div>'+
      '<div class="rev-row"><div class="rev-fld"><label for="rvN">'+x.fN+'</label><input id="rvN" maxlength="60" autocomplete="name" placeholder="'+esc(x.phN)+'" value="'+esc(S.n)+'"><div class="err" data-e="n"></div></div>'+
      '<div class="rev-fld"><label for="rvC">'+x.fC+' <span class="opt">'+x.opt+'</span></label><input id="rvC" maxlength="40" value="'+esc(S.c)+'"></div></div>'+
      '<div class="rev-fld"><label for="rvP">'+x.fPt+' <span class="opt">'+x.opt+'</span></label><input id="rvP" maxlength="80" placeholder="'+esc(x.phP)+'" value="'+esc(S.p)+'"></div>'+
      '<div class="rev-fld"><label for="rvM">'+x.fM+'</label><textarea id="rvM" rows="4" maxlength="600" placeholder="'+esc(x.phM)+'">'+esc(S.m)+'</textarea><div class="err" data-e="m"></div></div>'+
      '<button type="submit" class="btn btn-primary btn-attn btn-wa-solid">'+waIc+'<span>'+x.send+'</span></button><p class="rev-note">'+x.note+'</p></form>';
    const f=fbox.querySelector('#revF'),word=f.querySelector('.rev-word');
    const err=(k,t)=>{f.querySelector('[data-e="'+k+'"]').textContent=t||''};
    f.querySelectorAll('input[name=rate]').forEach(i=>i.onchange=()=>{S.r=+i.value;word.textContent=x.w[S.r];err('r')});
    f.querySelector('#rvN').oninput=e=>{S.n=e.target.value;err('n')};f.querySelector('#rvC').oninput=e=>S.c=e.target.value;
    f.querySelector('#rvP').oninput=e=>S.p=e.target.value;f.querySelector('#rvM').oninput=e=>{S.m=e.target.value;err('m')};
    f.onsubmit=e=>{e.preventDefault();S.n=S.n.trim();S.m=S.m.trim();let bad=false;
      if(!S.r){err('r',x.eR);bad=true}if(S.n.length<2){err('n',x.eN);bad=true}if(S.m.length<10){err('m',x.eM);bad=true}
      if(bad)return;
      S.wa='https://wa.me/'+(cfg.WHATSAPP_NUMBER||'')+'?text='+encodeURIComponent(buildMsg());S.done=true;renderForm();
      window.open(S.wa,'_blank','noopener');};
  }
  render();renderForm();
  if(window.QT_I18N)QT_I18N.onChange.push(()=>{render();renderForm()});
})();
