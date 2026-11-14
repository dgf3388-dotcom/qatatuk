(function(){
const cfg=window.QT_CONFIG||{};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const T=k=>QT_I18N.t(k);

const MAKES=[["تويوتا","Toyota"],["هيونداي","Hyundai"],["كيا","Kia"],["نيسان","Nissan"],["فورد","Ford"],["شيفروليه","Chevrolet"],["جي إم سي","GMC"],["دودج","Dodge"],["جيب","Jeep"],["لكزس","Lexus"],["هوندا","Honda"],["مازدا","Mazda"],["ميتسوبيشي","Mitsubishi"],["سوزوكي","Suzuki"],["إيسوزو","Isuzu"],["مرسيدس","Mercedes-Benz"],["بي إم دبليو","BMW"],["أودي","Audi"],["فولكسفاجن","Volkswagen"],["لاند روفر","Land Rover"],["بورشه","Porsche"],["جيلي","Geely"],["شانجان","Changan"],["هافال","Haval"],["إم جي","MG"],["كاديلاك","Cadillac"],["إنفينيتي","Infiniti"],["أخرى","Other"]];
const CITIES=[["الرياض","Riyadh"],["جدة","Jeddah"],["مكة المكرمة","Makkah"],["المدينة المنورة","Madinah"],["الدمام","Dammam"],["الخبر","Khobar"],["الظهران","Dhahran"],["الأحساء","Al-Ahsa"],["الجبيل","Jubail"],["القطيف","Qatif"],["الطائف","Taif"],["بريدة","Buraydah"],["عنيزة","Unaizah"],["حائل","Hail"],["تبوك","Tabuk"],["أبها","Abha"],["خميس مشيط","Khamis Mushait"],["جازان","Jazan"],["نجران","Najran"],["الباحة","Al-Baha"],["سكاكا","Sakaka"],["عرعر","Arar"],["ينبع","Yanbu"],["حفر الباطن","Hafar Al-Batin"],["الخرج","Al-Kharj"],["أخرى","Other"]];

function fill(){
  const fillSel=(id,list)=>{const s=$(id),cur=s.value;s.innerHTML='';
    const p=new Option(T('pick')+' ...','');s.add(p);
    list.forEach(([a,e])=>s.add(new Option(QT_I18N.lang==='ar'?a:e,a)));s.value=cur;};
  fillSel('#car_make',MAKES);fillSel('#city',CITIES);
  const y=$('#car_year'),cur=y.value;y.innerHTML='';y.add(new Option(T('pick')+' ...',''));
  for(let i=new Date().getFullYear()+1;i>=1980;i--)y.add(new Option(i,i));y.value=cur;
  updateModels();
}
QT_I18N.onChange.push(fill);
QT_I18N.apply();
$('#langBtn').onclick=()=>QT_I18N.set(QT_I18N.lang==='ar'?'en':'ar');
$('#burger').onclick=()=>{$('#menu').classList.toggle('open');$('#burger').classList.toggle('on')};
$$('#menu a').forEach(a=>a.onclick=()=>{$('#menu').classList.remove('open');$('#burger').classList.remove('on')});
$('#yr').textContent=new Date().getFullYear();
$('#phoneLink').textContent=cfg.CONTACT_PHONE_DISPLAY||'';$('#phoneLink').href='tel:'+(cfg.CONTACT_PHONE_DISPLAY||'');
$('#waLink').href='https://wa.me/'+(cfg.WHATSAPP_NUMBER||'');$('#footWa').href='https://wa.me/'+(cfg.WHATSAPP_NUMBER||'');$('#footPhone').textContent=cfg.CONTACT_PHONE_DISPLAY||'';$('#footPhone').href='tel:'+(cfg.CONTACT_PHONE_DISPLAY||'');$('#faqWa').href='https://wa.me/'+(cfg.WHATSAPP_NUMBER||'');


/* موديلات الشركة المختارة */
function carModel(){const s=$('#car_model');return (s.hidden||s.value==='__other')?$('#car_model_other').value.trim():s.value.trim();}
function updateModels(){_um();updateTrims();}
function _um(){
  const mk=$('#car_make').value,sel=$('#car_model'),oth=$('#car_model_other'),L=QT_I18N.lang==='ar',list=(window.QT_MODELS||{})[mk]||[],cur=sel.value;
  sel.innerHTML='';
  if(!mk){sel.add(new Option(T('pick_make_first'),''));sel.disabled=true;sel.hidden=false;oth.hidden=true;return;}
  sel.disabled=false;
  if(!list.length){sel.hidden=true;oth.hidden=false;return;}
  sel.hidden=false;sel.add(new Option(T('pick_model'),''));
  list.forEach(([a,e])=>sel.add(new Option(L?a:e,a)));sel.add(new Option(T('model_other'),'__other'));
  if([...sel.options].some(o=>o.value===cur))sel.value=cur;
  oth.hidden=sel.value!=='__other';
}
$('#car_make').addEventListener('change',()=>{$('#car_model').value='';$('#car_model_other').value='';$('#car_trim').value='';$('#car_trim_other').value='';updateModels();checkReady();});
$('#car_model').addEventListener('change',()=>{const o=$('#car_model_other');o.hidden=$('#car_model').value!=='__other';if(!o.hidden)o.focus();checkReady();});


/* فئات السيارة حسب الشركة والموديل */
function trimChosen(){const s=$('#car_trim');if(s.hidden||s.value==='__other')return !!$('#car_trim_other').value.trim();return !!s.value;}
function carTrim(){const s=$('#car_trim');if(s.hidden||s.value==='__other')return $('#car_trim_other').value.trim();return s.value==='__unknown'?'':s.value;}
function updateTrims(){
  const mk=$('#car_make').value,sel=$('#car_trim'),oth=$('#car_trim_other'),L=QT_I18N.lang==='ar',cur=sel.value,T0=window.QT_TRIMS||{brands:{},models:{}};
  const ms=$('#car_model');
  sel.innerHTML='';
  if(!mk){sel.add(new Option(T('pick_make_first'),''));sel.disabled=true;sel.hidden=false;oth.hidden=true;return;}
  const brand=T0.brands[mk];
  if(!brand){sel.hidden=true;oth.hidden=false;return;}
  if(!carModel()){sel.add(new Option(T('pick_model_first'),''));sel.disabled=true;sel.hidden=false;oth.hidden=true;return;}
  sel.disabled=false;sel.hidden=false;
  const list=(!ms.hidden&&ms.value&&ms.value!=='__other'&&T0.models[mk+'|'+ms.value])||brand;
  sel.add(new Option(T('pick_trim'),''));
  list.forEach(([a,e])=>sel.add(new Option(L?a:e,a)));
  sel.add(new Option(T('trim_unknown'),'__unknown'));sel.add(new Option(T('model_other'),'__other'));
  if([...sel.options].some(o=>o.value===cur))sel.value=cur;
  oth.hidden=sel.value!=='__other';
}
$('#car_trim').addEventListener('change',()=>{const o=$('#car_trim_other');o.hidden=$('#car_trim').value!=='__other';if(!o.hidden)o.focus();checkReady();});
$('#car_model').addEventListener('change',()=>{$('#car_trim').value='';$('#car_trim_other').value='';updateTrims();checkReady();});
$('#car_model_other').addEventListener('input',()=>{updateTrims();checkReady();});

/* steps */
let step=0;const panes=$$('.step-pane'),bars=$$('#progress div');
function show(n){step=n;panes.forEach((p,i)=>p.classList.toggle('show',i===n));
  bars.forEach((b,i)=>{b.classList.toggle('active',i===n);b.classList.toggle('done',i<n)});
  $('#backBtn').style.visibility=n?'visible':'hidden';$('#nextBtn').hidden=n===2;$('#submitBtn').hidden=n!==2;$('#formErr').hidden=true;if(n===1)renderCatalog();checkReady();}
function setErr(el,msg){el.classList.toggle('invalid',!!msg);const e=el.parentElement.querySelector('.err');if(e)e.textContent=msg||'';return !msg;}
function normPhone(v){v=v.replace(/[\s\-()]/g,'').replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d));
  if(/^(\+?966|00966)5\d{8}$/.test(v))return '0'+v.replace(/^(\+?966|00966)/,'');return v;}
const rules={
  0:[['#car_make',v=>v?'':T('required')],['#car_model',()=>{const bad=!carModel();$('#car_model_other').classList.toggle('invalid',bad&&!$('#car_model_other').hidden);return bad?T('required'):''}],['#car_year',v=>v?'':T('required')],['#car_trim',()=>{const bad=!trimChosen();$('#car_trim_other').classList.toggle('invalid',bad&&!$('#car_trim_other').hidden);return bad?T('required'):''}],
     ['#vin',v=>!v||/^[A-HJ-NPR-Za-hj-npr-z0-9]{17}$/.test(v.trim())?'':T('vin')]],
  1:[['#part_name',v=>v.trim().length>=2?'':T('required')]],
  2:[['#customer_name',v=>v.trim().length>=2?'':T('required')],['#phone',v=>/^05\d{8}$/.test(normPhone(v))?'':T('phone')],['#city',v=>v?'':T('required')]]};
function validate(n){let ok=true;rules[n].forEach(([s,f])=>{const el=$(s);if(!setErr(el,f(el.value)))ok=false;});
  if(!ok){const e=$('#formErr');e.textContent=T('fix');e.hidden=false;}return ok;}

/* تفعيل الزر عندما تكتمل بيانات الخطوة الحالية: نبضة أقوى وسهم أسرع */
function checkReady(){
  const ok=rules[step].every(([s,f])=>!f($(s).value));
  $('#nextBtn').classList.toggle('ready',ok);$('#submitBtn').classList.toggle('ready',ok);
}
$('#reqForm').addEventListener('input',checkReady);$('#reqForm').addEventListener('change',checkReady);
$('#nextBtn').onclick=()=>{if(validate(step))show(step+1)};
$('#backBtn').onclick=()=>show(step-1);
$$('input,select,textarea').forEach(el=>el.addEventListener('input',()=>el.classList.remove('invalid')));



/* كتالوج القطع الأكثر طلباً */
const NS=s=>String(s).toLowerCase().replace(/[\u064B-\u0652\u0640]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/\s+/g,' ').trim();
let showAll=false;
function icon(k){const s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('viewBox','0 0 24 24');s.setAttribute('aria-hidden','true');s.innerHTML=(window.QT_ICONS||{})[k]||'';return s;}
function renderCatalog(){
  if(window.qtPending&&!$('#part_name').value){$('#part_name').value=window.qtPending;window.qtPending=null;}
  const P=window.QT_PARTS||[];if(!P.length||!$('#catGrid'))return;
  const L=QT_I18N.lang==='ar',sel=s=>$(s).value?$(s).selectedOptions[0].textContent:'';
  const car=[sel('#car_make'),carModel(),$('#car_year').value].filter(Boolean).join(' ');
  $('#catTitle').textContent=car?T('cat_for')+': '+car:T('cat_title');
  const q=NS($('#part_search').value),cur=NS($('#part_name').value);
  let list=q?P.filter(p=>NS(p.ar+' '+p.en+' '+p.kw).includes(q)):(showAll?P:P.slice(0,12));
  const grid=$('#catGrid');grid.innerHTML='';
  list.forEach(p=>{const b=document.createElement('button');b.type='button';b.className='part';
    b.setAttribute('aria-pressed',String(NS(p.ar)===cur));
    const t=document.createElement('span');t.textContent=L?p.ar:p.en;b.append(icon(p.icon),t);
    b.onclick=()=>{const f=$('#part_name');f.value=p.ar;f.classList.remove('invalid');const e=f.parentElement.querySelector('.err');if(e)e.textContent='';renderCatalog();checkReady();};
    grid.append(b);});
  $('#catEmpty').textContent=q&&!list.length?T('cat_none'):'';
  const m=$('#catMore');m.hidden=!!q;m.textContent=showAll?T('cat_less'):T('cat_more');
}
$('#catMore').onclick=()=>{showAll=!showAll;renderCatalog();};
$('#part_search').addEventListener('input',renderCatalog);
$('#part_name').addEventListener('input',renderCatalog);
QT_I18N.onChange.push(renderCatalog);
document.querySelectorAll('.foot-col a[data-part]').forEach(l=>l.addEventListener('click',()=>{window.qtPending=l.dataset.part;if(document.querySelector('.step-pane.show[data-step="1"]'))renderCatalog();}));

/* واتساب */
function genNo(){const r=crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase().padStart(6,'0').slice(-6);return 'QT-'+String(new Date().getFullYear()).slice(2)+'-'+r;}
function buildWa(no,p){
  const L=QT_I18N.lang==='ar',sel=s=>$(s).selectedOptions[0].textContent;
  const lines=[L?'طلب توفير قطعة غيار جديد':'New spare part request',
    (L?'رقم الطلب: ':'Request no: ')+no,'',
    (L?'الاسم: ':'Name: ')+p.name,(L?'الجوال: ':'Mobile: ')+p.phone,(L?'المدينة: ':'City: ')+sel('#city'),(L?'وسيلة التواصل: ':'Contact: ')+sel('#contact_method'),'',
    (L?'السيارة: ':'Car: ')+[sel('#car_make'),p.model,p.year].filter(Boolean).join(' '),(L?'الفئة: ':'Trim: ')+(p.trim||(L?'غير محددة':'Not specified')),
    p.engine?(L?'المحرك: ':'Engine: ')+p.engine:'',p.vin?'VIN: '+p.vin:'','',
    (L?'القطعة: ':'Part: ')+p.part+(p.partno?' ('+p.partno+')':''),
    (L?'الحالة: ':'Condition: ')+sel('#part_condition')+' / '+sel('#part_type'),
    p.desc?(L?'الوصف: ':'Details: ')+p.desc:''].filter((x,i,arr)=>x!==''||arr[i-1]!=='');
  return 'https://wa.me/'+(cfg.WHATSAPP_NUMBER||'')+'?text='+encodeURIComponent(lines.join('\n'));
}
$('#reqForm').addEventListener('submit',ev=>{
  ev.preventDefault();
  for(const n of [0,1,2]){if(!validate(n)){show(n);validate(n);return}}
  if($('#website').value)return; // honeypot
  const g=s=>$(s).value.trim();
  const no=genNo();
  const wa=buildWa(no,{name:g('#customer_name'),phone:normPhone(g('#phone')),model:carModel(),year:g('#car_year'),trim:carTrim(),engine:g('#engine'),vin:g('#vin').toUpperCase(),part:g('#part_name'),partno:g('#part_number'),desc:g('#description')});
  $('#reqNo').textContent=no;const selT=s=>$(s).selectedOptions[0].textContent;$('#ckCar').textContent=[selT('#car_make'),carModel(),g('#car_year'),carTrim()].filter(Boolean).join(' ');$('#ckPart').textContent=g('#part_name')+(g('#part_number')?' ('+g('#part_number')+')':'');$('#ckYou').textContent=g('#customer_name')+' · '+normPhone(g('#phone'))+' · '+selT('#city');$('#waSend').href=wa;$('#reqForm').hidden=true;$('#successBox').hidden=false;
  $('#request').scrollIntoView({behavior:'smooth'});
  try{window.open(wa,'_blank','noopener')}catch(_){}
});
$('#copyNo').onclick=()=>{const b=$('#copyNo'),t=$('#reqNo').textContent,orig=b.textContent;
  const done=()=>{b.textContent='✓ '+T('copied');setTimeout(()=>{b.textContent=orig},2000)};
  const fb=()=>{const r=document.createRange();r.selectNodeContents($('#reqNo'));const s=getSelection();s.removeAllRanges();s.addRange(r);try{document.execCommand('copy');done()}catch(e){}};
  try{navigator.clipboard.writeText(t).then(done).catch(fb)}catch(e){fb()}};
$('#newReq').onclick=()=>{$('#reqForm').reset();updateModels();$('#reqForm').hidden=false;$('#successBox').hidden=true;show(0);};
/* حركة أزرار الأسئلة الشائعة: ظهور متتابع عند الوصول إليها */
(function(){
  const box=document.querySelector('.faq-cta');if(!box||!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const r=box.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)return;
  const els=[...box.querySelectorAll('.btn')];
  els.forEach((b,i)=>{b.classList.add('pre');b.style.setProperty('--d',i*130+'ms')});
  const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){els.forEach(b=>{b.classList.remove('pre');b.classList.add('pop')});io.disconnect()}},{threshold:.5});io.observe(box);
})();
/* حركة الأيقونات: ظهور متتابع عند التمرير ورسم خطوط الأيقونة */
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
  document.querySelectorAll('.ico svg *').forEach(el=>el.setAttribute('pathLength','1'));
  ['.g5 .card','.g4 .step'].forEach(sel=>document.querySelectorAll(sel).forEach((el,i)=>{el.classList.add('rv');el.style.setProperty('--i',i)}));
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('rv-in');io.unobserve(e.target)}}),{threshold:.2});
  document.querySelectorAll('.rv').forEach(el=>io.observe(el));
})();
show(0);
})();
