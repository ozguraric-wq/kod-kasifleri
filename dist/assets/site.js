'use strict';
(() => {
 renderThemes();
 const menu=document.getElementById('mobile-menu');
 document.querySelector('.menu-button').addEventListener('click',()=>{menu.showModal();document.querySelector('.menu-button').setAttribute('aria-expanded','true')});
 menu.addEventListener('close',()=>document.querySelector('.menu-button').setAttribute('aria-expanded','false'));
 const closeMegas=()=>document.querySelectorAll('.mega-trigger').forEach(b=>{b.setAttribute('aria-expanded','false');document.getElementById(b.getAttribute('aria-controls')).hidden=true});
 document.querySelectorAll('.mega-trigger').forEach(b=>b.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')==='true';closeMegas();if(!open){b.setAttribute('aria-expanded','true');document.getElementById(b.getAttribute('aria-controls')).hidden=false}}));
 document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMegas();if(e.target.closest('[data-close]'))e.target.closest('dialog').close();if(e.target.closest('a[href^="#"]')){closeMegas();if(menu.open)menu.close()}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMegas()});
 document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));
 const video=document.querySelector('.hero-media'),motion=document.querySelector('.motion-toggle');
 const motionLabel=()=>{motion.textContent=video.paused?'Hareketi oynat ▷':'Hareketi durdur Ⅱ';motion.setAttribute('aria-label',video.paused?'Açılış hareketini oynat':'Açılış hareketini durdur')};
 motion.addEventListener('click',()=>{if(video.paused)video.play().then(motionLabel).catch(()=>{motion.textContent='Hareket bu cihazda oynatılamadı'});else{video.pause();motionLabel()}});
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!navigator.connection?.saveData)video.play().then(motionLabel).catch(motionLabel);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){video.pause();motionLabel()}});
 function renderThemes(){
  const grid=document.getElementById('theme-grid');grid.innerHTML=KK_DATA.themes.map(t=>`<button class="theme-card" data-theme="${t.id}"><span>${t.id}</span><h3>${t.title}</h3><p>${t.skill}</p><span class="theme-bottom"><span>İçeriği incele ↗</span><span class="playable">DEMODA DENE</span></span></button>`).join('');
  grid.addEventListener('click',e=>{const b=e.target.closest('[data-theme]');if(!b)return;const t=KK_DATA.themes.find(x=>x.id===b.dataset.theme);document.getElementById('theme-code').textContent=t.id+' / ÖĞRENME TEMASI';document.getElementById('theme-body').innerHTML=`<h2 id="theme-title">${t.title}</h2><p>${t.skill}</p><h3>Fiziksel çıktı</h3><p>${t.physical}</p><h3>Nasıl gözlemlenir?</h3><p>${t.evidence}</p><h3>Demo senaryosu: ${t.story}</h3><p>${t.intro}</p><a class="button navy" href="demo.html?task=${t.id}">Bu temayı dene ↗</a><p class="footnote">Tema proje içeriğidir. Hikâye ve örnek görev, bu demo için kurgulanmıştır.</p>`;document.getElementById('theme-dialog').showModal()});
 }
})();
