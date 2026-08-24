const PARTS=[
  ['Hero','#hero'],['Carousel','#carousel'],['Content Slider','#slider'],['Blog & Articles','#blog'],['Website Sections','#sections'],['Call to Action','#cta'],['Feature Grid','#features'],['Testimonials','#testimonials'],['Pricing','#pricing'],['FAQ','#faq'],['Footer','#footer']
];
const nav=document.getElementById('nav');
const search=document.getElementById('navSearch');
const isParts=document.body.dataset.page==='parts';
let observer;
let enhancing=false;

function setGroupOpen(group,open){
  group.classList.toggle('open',open);
  const title=group.querySelector(':scope > .ds-nav-toggle');
  const items=group.querySelector(':scope > .ds-nav-items');
  title?.setAttribute('aria-expanded',String(open));
  if(items)items.hidden=!open;
}

function makeToggle(group){
  const title=group.querySelector(':scope > .ds-nav-title');
  if(!title||title.dataset.enhanced==='true')return;
  title.dataset.enhanced='true';
  title.classList.add('ds-nav-toggle');
  const label=title.textContent.trim();
  title.innerHTML=`<span class="ds-nav-toggle-label">${label}</span><span class="ds-nav-chevron" aria-hidden="true">›</span>`;
  title.setAttribute('role','button');
  title.setAttribute('tabindex','0');
  title.setAttribute('aria-expanded','false');
  let items=group.querySelector(':scope > .ds-nav-items');
  if(!items){
    items=document.createElement('div');
    items.className='ds-nav-items';
    [...group.children].filter(el=>el.classList.contains('ds-nav-link')).forEach(link=>items.appendChild(link));
    group.appendChild(items);
  }
  const toggle=()=>{
    const next=!group.classList.contains('open');
    nav.querySelectorAll('.ds-nav-group').forEach(other=>{
      if(other!==group&&other.querySelector(':scope > .ds-nav-toggle'))setGroupOpen(other,false);
    });
    setGroupOpen(group,next);
  };
  title.addEventListener('click',toggle);
  title.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();toggle();}});
}

function ensurePartsGroup(){
  if(nav.querySelector('[data-parts-group]'))return;
  const group=document.createElement('div');
  group.className='ds-nav-group';
  group.dataset.partsGroup='true';
  group.innerHTML=`<div class="ds-nav-title">Templates & Parts</div><div class="ds-nav-items">${PARTS.map(([label,hash],index)=>`<a class="ds-nav-link" href="./design-system-parts.html${hash}"><span>${String(index+1).padStart(2,'0')}</span><strong>${label}</strong></a>`).join('')}</div>`;
  nav.appendChild(group);
}

function updatePartsActive(){
  if(!isParts)return;
  const current=location.hash||'#hero';
  nav.querySelectorAll('[data-parts-group] .ds-nav-link').forEach(link=>{
    const href=link.getAttribute('href')||'';
    link.classList.toggle('active',href.endsWith(current));
  });
}

function enhanceNav(){
  if(!nav||enhancing)return;
  enhancing=true;
  observer?.disconnect();
  ensurePartsGroup();
  const term=(search?.value||'').trim();
  const groups=[...nav.querySelectorAll('.ds-nav-group')];
  groups.forEach((group,index)=>{
    const rawTitle=group.querySelector(':scope > .ds-nav-title')?.textContent.trim();
    if(index===0&&rawTitle==='Start')return;
    makeToggle(group);
  });
  updatePartsActive();
  groups.forEach(group=>{
    if(!group.querySelector(':scope > .ds-nav-toggle'))return;
    const hasActive=Boolean(group.querySelector('.ds-nav-link.active'));
    const partsOpen=isParts&&group.dataset.partsGroup==='true';
    setGroupOpen(group,Boolean(term)||hasActive||partsOpen);
  });
  observer?.observe(nav,{childList:true});
  enhancing=false;
}

if(nav){
  observer=new MutationObserver(()=>enhanceNav());
  observer.observe(nav,{childList:true});
  queueMicrotask(enhanceNav);
}

if(isParts){
  const mobile=window.matchMedia('(max-width:780px)');
  const menuButton=document.getElementById('menuButton');
  const drawerClose=document.getElementById('drawerClose');
  const sidebar=document.getElementById('dsSidebar');
  const backdrop=document.getElementById('dsBackdrop');
  const themeButton=document.getElementById('themeButton');
  const setDrawer=(open,restore=false)=>{
    document.body.classList.toggle('nav-open',open&&mobile.matches);
    menuButton?.setAttribute('aria-expanded',String(open&&mobile.matches));
    sidebar?.setAttribute('aria-hidden',String(mobile.matches&&!open));
    if(sidebar&&'inert'in sidebar)sidebar.inert=mobile.matches&&!open;
    if(!open&&restore)menuButton?.focus();
  };
  menuButton?.addEventListener('click',()=>setDrawer(true));
  drawerClose?.addEventListener('click',()=>setDrawer(false,true));
  backdrop?.addEventListener('click',()=>setDrawer(false));
  document.addEventListener('keydown',event=>event.key==='Escape'&&setDrawer(false,true));
  mobile.addEventListener('change',()=>setDrawer(false));
  themeButton?.addEventListener('click',()=>{
    const next=document.documentElement.dataset.theme==='dark'?'light':'dark';
    document.documentElement.dataset.theme=next;
    localStorage.setItem('design-system-theme',next);
  });
  const saved=localStorage.getItem('design-system-theme');
  if(saved==='dark'||saved==='light')document.documentElement.dataset.theme=saved;
  search?.addEventListener('input',()=>{
    const term=search.value.trim().toLowerCase();
    nav.querySelectorAll('[data-parts-group] .ds-nav-link').forEach(link=>{
      const show=!term||link.textContent.toLowerCase().includes(term);
      link.style.display=show?'':'none';
    });
    enhanceNav();
  });
  window.addEventListener('hashchange',()=>{updatePartsActive();enhanceNav();});
  nav.addEventListener('click',event=>{if(event.target.closest('a')&&mobile.matches)setDrawer(false)});
  setDrawer(false);
}
