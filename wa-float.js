// زر واتساب عائم: يظهر في كل صفحات الموقع ويفتح محادثة جاهزة مع قطعتك.
(function(){
  var cfg=window.QT_CONFIG||{};if(!cfg.WHATSAPP_NUMBER||document.querySelector('.wa-float'))return;
  var TX={ar:{l:'تواصل معنا',a:'تواصل معنا عبر واتساب',m:'السلام عليكم، أرغب بالاستفسار عن قطعة غيار.'},
          en:{l:'Chat with us',a:'Chat with us on WhatsApp',m:"Hello, I'd like to ask about a car spare part."}};
  var L=function(){var l=(window.QT_I18N&&QT_I18N.lang)||document.documentElement.lang;return l==='en'?'en':'ar'};
  var a=document.createElement('a');a.className='wa-float';a.target='_blank';a.rel='noopener';
  a.innerHTML='<span class="wa-ring"></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.27-1.38A9.9 9.9 0 1 0 12.04 2zm5.8 14.1c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.12.07-1.8-.11a16.5 16.5 0 0 1-1.63-.6c-2.87-1.24-4.74-4.13-4.89-4.32-.14-.19-1.17-1.56-1.17-2.97s.74-2.1 1-2.39a1.07 1.07 0 0 1 .78-.36h.56c.18 0 .42-.07.66.5.24.6.83 2.05.9 2.2.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.3-.12.58.17.29.74 1.22 1.6 1.98 1.1.98 2.03 1.28 2.32 1.43.29.14.46.12.63-.07.17-.2.72-.84.91-1.13.2-.29.38-.24.65-.14.26.1 1.67.79 1.96.93.29.14.48.22.55.34.07.12.07.7-.17 1.38z"/></svg><span class="wa-lab"></span>';
  function upd(){var x=TX[L()];a.href='https://wa.me/'+cfg.WHATSAPP_NUMBER+'?text='+encodeURIComponent(x.m);a.setAttribute('aria-label',x.a);a.querySelector('.wa-lab').textContent=x.l}
  upd();document.body.appendChild(a);
  if(window.QT_I18N)QT_I18N.onChange.push(upd);
})();
