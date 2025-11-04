(function(){
  const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
  function openModal(id){ const el=document.getElementById(id); if(!el) return; el.setAttribute('aria-hidden','false'); document.dispatchEvent(new CustomEvent('open-modal',{detail:id})); }
  function closeModal(id){ const el=document.getElementById(id); if(!el) return; el.setAttribute('aria-hidden','true'); }

  $$('.btn,[data-open-modal]').forEach(btn=>{
    const id = btn.getAttribute('data-open-modal'); if(!id) return;
    btn.addEventListener('click', ()=>openModal(id));
  });
  $$('.modal [data-close-modal]').forEach(el=>{
    el.addEventListener('click', (e)=>{ e.target.closest('.modal')?.setAttribute('aria-hidden','true'); });
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key==='Escape'){ $$('.modal[aria-hidden="false"]').forEach(m=>m.setAttribute('aria-hidden','true')); }
  });
  window.openModal=openModal; window.closeModal=closeModal;
})();