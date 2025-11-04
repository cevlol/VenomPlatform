(function(){
  const $ = (s,r=document)=>r.querySelector(s);
  const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
  const byId = (id)=>document.getElementById(id);

  const result = byId('qqResult');
  const calcBtn = byId('qqCalcBtn');
  const calcWrap = byId('qqCalculating');
  const term = byId('qqTerminalText');
  const summary = byId('qqSummary');
  const outDaily = byId('qqOutDaily');
  const outAnnual = byId('qqOutAnnual');
  const outSelf = byId('qqOutSelf');
  const outSavings = byId('qqOutSavings');
  const ctaWrap = byId('qqCtaWrap');
  const requestBtn = byId('qqRequestBtn');
  const form = byId('qqForm');
  const submitBtn = byId('qqSubmitBtn');

  const usageInput = byId('qqUsage');
  const rateInput  = byId('qqRate');
  const fitInput   = byId('qqFiT');

  const selectionMeta = byId('qqSelectionMeta');
  const metaDaily = byId('qqMetaDaily');
  const metaAnnual = byId('qqMetaAnnual');
  const metaSelf = byId('qqMetaSelf');
  const metaSavings = byId('qqMetaSavings');

  const nameInput = byId('qqName');
  const addressInput = byId('qqAddress');
  const phoneInput = byId('qqPhone');
  const emailInput = byId('qqEmail');
  const billInput = byId('qqBill');

  let selection=null, calcDone=false;

  const selections = {
    panels:{ text:"15x 440W Solar Panels + GoodWe 5kW Inverter — Fully installed starting from $3,700 AUD", price:3700, images:["assets/jinko.png"], type:"New Panels (6.6kW)" },
    battery:{ text:"1x Growatt SPH 5kW All-in-One Battery System (10kWh Battery) — Starting from $9,000 AUD", price:9000, images:["assets/growatt.png"], type:"Battery Only (10kWh)" },
    combo:{ text:"15x 440W Solar Panels, 5kW Inverter & 10kWh Battery — Starting from $12,000 AUD", price:12000, images:["assets/jinko.png","assets/growatt.png"], type:"Panels + Battery (6.6kW + 10kWh)" }
  };

  $$('.qq-btn').forEach(btn=>btn.addEventListener('click',()=>renderSelection(btn.dataset.type)));

  function renderSelection(key){
    const q = selections[key];
    selection = key;
    selectionMeta.value = q.type;
    $$('.qq-btn').forEach(b=>b.classList.remove('active'));
    $(`.qq-btn[data-type="${key}"]`)?.classList.add('active');
    result.innerHTML = `<div class="qq-card"><div><div class="qq-text">${q.text}</div><div class="qq-price">From $${q.price.toLocaleString()} AUD</div></div><div class="qq-imgs">${q.images.map(src=>`<img src="${src}" alt="">`).join("")}</div></div>`;
    calcDone=false; summary.classList.add('is-hidden'); ctaWrap.classList.add('is-hidden'); form.classList.add('is-hidden'); submitBtn.disabled = true;
  }

  calcBtn.addEventListener('click', performCalculation);
  requestBtn.addEventListener('click', ()=>{ form.classList.toggle('is-hidden'); updateSubmitEnabled(); });
  [nameInput,addressInput,phoneInput,emailInput,billInput].forEach(i=>{
    i.addEventListener('input', updateSubmitEnabled);
    i.addEventListener('change', updateSubmitEnabled);
  });

  function updateSubmitEnabled(){
    const ok = !!(calcDone && selection && nameInput.value && addressInput.value && phoneInput.value && emailInput.value && billInput.files.length>0);
    submitBtn.disabled = !ok;
  }

  async function performCalculation(){
    if(!selection){ alert('Select a package first.'); return; }
    calcDone=false; summary.classList.add('is-hidden'); ctaWrap.classList.add('is-hidden'); form.classList.add('is-hidden'); submitBtn.disabled=true;
    term.textContent=""; calcWrap.classList.remove('is-hidden');
    await appendTerminal('> Loading local solar irradiance... ok (Melbourne ~4.0 PSH)', 350);
    await appendTerminal('> Applying system & wiring losses... ok (~20%)', 350);
    await appendTerminal('> Estimating self-consumption profile...', 350);
    await appendTerminal('> Computing bill reduction...', 320);
    await appendTerminal('> Finalising...', 280);

    const usage = Math.max(1, Number(usageInput.value||18));
    const rate  = Math.max(0.01, Number(rateInput.value||0.28));
    const fit   = Math.max(0, Number(fitInput.value||0.05));

    const r = runModel(selection, usage, rate, fit);
    outDaily.textContent = fmtKwh(r.dailySolar);
    outAnnual.textContent = fmtKwh(r.annualSolar);
    outSelf.textContent = fmtKwh(r.selfConsumed);
    outSavings.textContent = fmtMoney(r.annualSavings);
    metaDaily.value = r.dailySolar.toFixed(1);
    metaAnnual.value = r.annualSolar.toFixed(0);
    metaSelf.value = r.selfConsumed.toFixed(1);
    metaSavings.value = r.annualSavings.toFixed(0);
    calcWrap.classList.add('is-hidden'); summary.classList.remove('is-hidden'); ctaWrap.classList.remove('is-hidden'); calcDone=true;
  }

  function runModel(selKey, usage, rate, fit){
    let dailySolar=0, selfConsumed=0;
    if(selKey==='panels'){
      dailySolar = 6.6*4.0*0.8; selfConsumed = dailySolar*0.7;
    }else if(selKey==='battery'){
      dailySolar = 0; selfConsumed = Math.min(10, usage)*0.9;
    }else{
      dailySolar = 6.6*4.0*0.8;
      selfConsumed = Math.min(usage, dailySolar)*0.9 + Math.max(0, dailySolar-usage)*0.2;
    }
    const annualSolar = dailySolar*365;
    const exportKwh = Math.max(0, dailySolar - selfConsumed);
    const dailySavings = selfConsumed*rate + exportKwh*fit;
    const annualSavings = dailySavings*365;
    return { dailySolar, annualSolar, selfConsumed, annualSavings };
  }

  function fmtKwh(x){ return `${x.toFixed(1)} kWh`; }
  function fmtMoney(x){ return `$${x.toFixed(0)} AUD/yr`; }

  function appendTerminal(line, delay){ return new Promise(res=>setTimeout(()=>{ term.textContent += line + "\n"; res(); }, delay)); }

  // EmailJS disabled by default, safe noop until you add keys
  const EMAILJS_ENABLED=false, SERVICE_ID="YOUR_SERVICE_ID", TEMPLATE_ID="YOUR_TEMPLATE_ID", PUBLIC_KEY="YOUR_PUBLIC_KEY";
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    if(!calcDone){ alert('Please run the calculation first.'); return; }
    if(!billInput.files.length){ alert('Please upload your energy bill.'); return; }
    submitBtn.disabled=true; submitBtn.textContent='Sending...';
    try{
      if(EMAILJS_ENABLED && window.emailjs){
        const subject = `Website Quick Quote - ${selectionMeta.value||'Unknown'}`;
        form.setAttribute('data-subject', subject);
        await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY);
        submitBtn.textContent='Sent! We’ll be in touch';
      }else{
        await new Promise(r=>setTimeout(r, 600));
        submitBtn.textContent='Queued (EmailJS not configured)';
      }
    }catch(err){
      console.error(err); submitBtn.disabled=false; submitBtn.textContent='Send to Suntech'; alert('Unable to send email.');
    }
  });

  // Modal: clone calculator into modal mount
  const modalMount = document.getElementById('qqModalMount');
  document.addEventListener('open-modal', (e)=>{
    if(e.detail==='qqModal' && modalMount){
      const sidebar = document.getElementById('quickQuoteSidebar');
      if(sidebar){ modalMount.innerHTML = sidebar.outerHTML; }
    }
  });
})();