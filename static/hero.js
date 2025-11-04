(function(){
  const THEMES = {
    default:{ colors:{"--accent":"#20D0FF","--accent-soft":"rgba(32,208,255,.28)"}, headline:"Confidence-first protections — our promise to local Victorians.", sub:"NETCC-certified installers. Genuine parts. Lifetime support.", media:{video:"assets/stock-video-1.mp4",image:"assets/hero1.jpg"}, product:{name:"Standard Solar Package", price:"3700.00"} },
    young:{ colors:{"--accent":"#20D0FF","--accent-soft":"rgba(32,208,255,.28)"}, headline:"Power Your Future — Save Big on Solar", sub:"Flexible finance options for first homeowners and young families.", media:{video:"assets/stock-video-1.mp4",image:"assets/hero1.jpg"}, product:{name:"Starter 6.6kW Solar",price:"3700.00"} },
    family:{ colors:{"--accent":"#20D0FF","--accent-soft":"rgba(32,208,255,.28)"}, headline:"Protect Your Home — Lower Every Power Bill", sub:"Reliable solar systems built for growing Victorian families.", media:{video:"assets/stock-video-2.mp4",image:"assets/hero2.jpg"}, product:{name:"Family 6.6kW Solar",price:"3700.00"} },
    mature:{ colors:{"--accent":"#20D0FF","--accent-soft":"rgba(32,208,255,.28)"}, headline:"Retirement Boost — Solar = Extra Pension", sub:"Generate energy independence and boost your savings effortlessly.", media:{video:"assets/stock-video-2.mp4",image:"assets/hero2.jpg"}, product:{name:"Mature Saver Pack",price:"3700.00"} },
    business:{ colors:{"--accent":"#20D0FF","--accent-soft":"rgba(32,208,255,.28)"}, headline:"Smarter Energy for Modern Business", sub:"Cut overheads with reliable, high-output solar tailored for SMEs.", media:{video:"assets/stock-video-3.mp4",image:"assets/hero3.jpg"}, product:{name:"SME Solar Pack",price:"12000.00"} },
    trust:{ colors:{"--accent":"#20D0FF","--accent-soft":"rgba(32,208,255,.28)"}, headline:"Community. Reliability. Proven Results.", sub:"Join 300+ Victorians who trust Suntech for honest, guaranteed installs.", media:{video:"assets/stock-video-1.mp4",image:"assets/hero1.jpg"}, product:{name:"Trusted Standard Pack",price:"3700.00"} },
    ev:{ colors:{"--accent":"#1EE6FF","--accent-soft":"rgba(30,230,255,.32)"}, headline:"Charge Your EV for Cents — Solar + Night Battery Swap.", sub:"Pair daytime solar with a 10kWh battery to charge overnight for less.", media:{video:"assets/stock-video-3.mp4",image:"assets/hero3.jpg"}, product:{name:"EV Solar Charging Package",price:"12000.00"} },
    "battery-upgrade":{ colors:{"--accent":"#19D8FF","--accent-soft":"rgba(25,216,255,.30)"}, headline:"Already Have Solar? Add a 10kWh Battery — Slash Night Bills.", sub:"Keep your existing panels. Add battery only for immediate impact.", media:{video:"assets/stock-video-2.mp4",image:"assets/hero2.jpg"}, product:{name:"10kWh Battery Upgrade",price:"9000.00"} },
    "new-builds":{ colors:{"--accent":"#22D9FF","--accent-soft":"rgba(34,217,255,.28)"}, headline:"Build with Solar Included — Fixed-Price, Turn-Key.", sub:"Builders & owner-builders: integrated 6.6kW + 5kW inverter packages.", media:{video:"assets/stock-video-1.mp4",image:"assets/hero1.jpg"}, product:{name:"New Build Solar Pack",price:"3700.00"} },
    "summer-sale":{ colors:{"--accent":"#20D0FF","--accent-soft":"rgba(32,208,255,.28)"}, headline:"Stop Paying $600+ Quarterly — Summer Sale On Now.", sub:"Fast installs. Priority scheduling. Limited-time package pricing.", media:{video:"assets/stock-video-4.mp4",image:"assets/hero4.jpg"}, product:{name:"Summer Sale Package",price:"3700.00"} },
    rural:{ colors:{"--accent":"#1FD9FF","--accent-soft":"rgba(31,217,255,.30)"}, headline:"Rural-Ready Solar — Built for Sheds, Workshops & Homesteads.", sub:"High-output arrays, rugged mounting, battery options for unreliable grids.", media:{video:"assets/stock-video-2.mp4",image:"assets/hero2.jpg"}, product:{name:"Rural & Regional Solar",price:"12000.00"} }
  };

  const root=document.documentElement;
  const h1=document.getElementById('heroHeadline');
  const sub=document.getElementById('heroSub');
  const video=document.getElementById('heroVideo');
  const videoSrc=video?video.querySelector('source'):null;
  const img=document.getElementById('heroImage');

  function applyTheme(key){
    const t = THEMES[key] || THEMES.default;
    Object.entries(t.colors).forEach(([k,v])=>root.style.setProperty(k,v));
    if(h1) h1.innerHTML=t.headline;
    if(sub) sub.textContent=t.sub;
    if(videoSrc && t.media?.video && videoSrc.getAttribute('src')!==t.media.video){ videoSrc.setAttribute('src', t.media.video); video.load(); }
    if(img && t.media?.image){ img.setAttribute('src', t.media.image); }
    updateProductSchema(key, t);
    localStorage.setItem('suntech_theme', key);
  }

  function updateProductSchema(key, t){
    const node = document.getElementById('theme-schema');
    const data = {
      "@context":"https://schema.org",
      "@type":"Product",
      "name": t.product?.name || "Suntech Solar Package",
      "description": t.sub || "Solar and battery packages by Suntech Solar Systems",
      "brand": {"@type":"Brand","name":"Suntech Solar Systems"},
      "offers": {"@type":"Offer","price": t.product?.price || "3700.00","priceCurrency":"AUD","availability":"https://schema.org/InStock","url": location.origin + location.pathname + "?theme=" + encodeURIComponent(key)}
    };
    node.textContent = JSON.stringify(data);
  }

  document.querySelectorAll('#demoThemes [data-theme]').forEach(btn=>btn.addEventListener('click',()=>applyTheme(btn.dataset.theme)));
  const themeFromUrl=new URLSearchParams(location.search).get('theme');
  const saved=localStorage.getItem('suntech_theme');
  applyTheme(themeFromUrl||saved||'default');
  window.switchTheme=applyTheme;
})();