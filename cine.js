/* تجربة سينمائية: بارالاكس خفيف للمشهد الافتتاحي + ظهور تدريجي عند التمرير.
   لا مكتبات خارجية، ولا قراءة أبعاد أثناء التمرير (تُخزَّن مرة وتُحدَّث عند تغيير المقاس). */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hero=document.getElementById('home');
  var $=function(s,r){return (r||document).querySelector(s)};

  /* 1) ظهور العناوين والنصوص تدريجياً */
  if(!reduce&&'IntersectionObserver' in window){
    var sel=['.sec-title','.sec-sub','.about','.about2','.contact-box .card','.faq details','#reviews .rev-card','#reviews .rev-head','.faq-cta'];
    var els=[];sel.forEach(function(s){document.querySelectorAll(s).forEach(function(e){if(!e.classList.contains('rv')&&!e.closest('.rv')&&!e.classList.contains('pre'))els.push(e)})});
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('cv-in');io.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(e,i){e.classList.add('cv');io.observe(e)});
  }

  if(!hero||reduce)return;

  /* 2) بارالاكس المشهد الافتتاحي (transform فقط، مرة لكل إطار) */
  var bg=$('.cine-bg',hero),copy=$('.cine-copy',hero),chips=$('.cine-chips',hero),shade=$('.cine-shade',hero);
  var bar=$('#scrollBar');
  var nativeBar=window.CSS&&CSS.supports&&CSS.supports('animation-timeline','scroll()');
  var H=hero.offsetHeight||700,docMax=1,ticking=false;
  function measure(){H=hero.offsetHeight||700;docMax=Math.max(1,document.documentElement.scrollHeight-innerHeight)}
  function frame(){
    ticking=false;var y=window.pageYOffset;
    if(bar&&!nativeBar){bar.style.transform='scaleX('+Math.min(1,y/docMax)+')'}
    if(y>H*1.15)return;
    var p=Math.min(1,y/H);
    if(bg)bg.style.transform='translate3d(0,'+(y*.28).toFixed(1)+'px,0)';
    if(copy){copy.style.transform='translate3d(0,'+(-y*.14).toFixed(1)+'px,0)';copy.style.opacity=(1-p*1.15).toFixed(3)}
    if(chips)chips.style.transform='translate3d(0,'+(-y*.2).toFixed(1)+'px,0)';
    if(shade)shade.style.opacity=(1+p*.25).toFixed(3);
  }
  function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(frame)}}
  addEventListener('scroll',onScroll,{passive:true});
  addEventListener('resize',function(){measure();onScroll()});
  addEventListener('load',function(){measure();onScroll()});
  measure();frame();
})();
