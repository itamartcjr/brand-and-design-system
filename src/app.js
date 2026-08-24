import { groups, esc, num, markdownModule, frameworkRefs } from './brand-ui.js';
import { overviewPage, moduleIntro, moduleVisualMap, moduleExampleShowcase, moduleFooter } from './brand-pages.js';
import { editorialModuleSections } from './brand-editorial.js';
import { moduleVisualGuide } from './brand-visual-guide.js';

const app=document.getElementById('app'),nav=document.getElementById('nav'),pageTitle=document.getElementById('pageTitle'),navSearch=document.getElementById('navSearch'),themeButton=document.getElementById('themeButton'),menuButton=document.getElementById('menuButton'),drawerClose=document.getElementById('drawerClose'),backdrop=document.getElementById('backdrop'),downloadAll=document.getElementById('downloadAll'),sidebar=document.getElementById('sidebar'),toast=document.getElementById('toast');
const mobile=window.matchMedia('(max-width:760px)');
let data={modules:[],references:{},resources:{}};
const route=()=>{const raw=location.hash.replace(/^#\//,'')||'overview',[type,id]=raw.split('/');return type==='module'?{type,id}:{type:'overview'}};
const moduleById=id=>data.modules.find(m=>String(m.id)===String(id));
function notify(t){toast.textContent=t;toast.classList.add('show');clearTimeout(notify.t);notify.t=setTimeout(()=>toast.classList.remove('show'),1400)}
function setDrawer(open,restore=false){document.body.classList.toggle('nav-open',open&&mobile.matches);menuButton.setAttribute('aria-expanded',String(open&&mobile.matches));sidebar.setAttribute('aria-hidden',String(mobile.matches&&!open));if('inert'in sidebar)sidebar.inert=mobile.matches&&!open;if(!open&&restore)menuButton.focus()}
function save(name,content,type='text/plain'){const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500)}
async function copy(text){if(navigator.clipboard)await navigator.clipboard.writeText(text);else{notify('Clipboard indisponível');return}notify('Copiado')}

function renderNav(filter=''){
  const r=route();
  const term=filter.trim().toLowerCase();
  const activeModule=r.type==='module'?moduleById(r.id):null;
  const activeNumber=activeModule?Number(activeModule.number):null;
  const mods=data.modules.filter(m=>!term||[m.title,m.summary,...(m.fields||[]).map(f=>f.name)].join(' ').toLowerCase().includes(term));
  const start=`<div class="nav-home">
    <a class="nav-link ${r.type==='overview'?'active':''}" href="#/overview"><span>00</span><strong>Overview</strong></a>
    <a class="nav-link" href="./design-system.html"><span>DS</span><strong>Design System</strong></a>
  </div>`;
  const grouped=groups.map(([label,min,max],groupIndex)=>{
    const list=mods.filter(m=>Number(m.number)>=min&&Number(m.number)<=max);
    if(!list.length)return '';
    const isActive=activeNumber!==null&&activeNumber>=min&&activeNumber<=max;
    const open=Boolean(term)||isActive;
    return `<div class="nav-group ${open?'open':''}" data-nav-group="${groupIndex}">
      <button class="nav-group-toggle" type="button" data-nav-toggle aria-expanded="${open}">
        <span>${esc(label)}</span><span class="nav-chevron" aria-hidden="true">›</span>
      </button>
      <div class="nav-group-items" ${open?'':'hidden'}>
        ${list.map(m=>`<a class="nav-link ${r.type==='module'&&r.id===m.id?'active':''}" href="#/module/${esc(m.id)}"><span>${num(m)}</span><strong>${esc(m.title)}</strong></a>`).join('')}
      </div>
    </div>`;
  }).join('');
  nav.innerHTML=start+grouped;
  nav.querySelectorAll('[data-nav-toggle]').forEach(toggle=>toggle.addEventListener('click',()=>{
    const current=toggle.closest('.nav-group');
    const willOpen=toggle.getAttribute('aria-expanded')!=='true';
    nav.querySelectorAll('.nav-group').forEach(group=>{
      const button=group.querySelector('[data-nav-toggle]');
      const items=group.querySelector('.nav-group-items');
      const open=group===current?willOpen:false;
      group.classList.toggle('open',open);
      button?.setAttribute('aria-expanded',String(open));
      if(items)items.hidden=!open;
    });
  }));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobile.matches&&setDrawer(false)));
}

function bindTabs(selector,panelSelector,dataKey,panelKey){
  app.querySelectorAll(selector).forEach(button=>button.addEventListener('click',()=>{
    const root=button.closest('.example-showcase,.visual-guideline');
    if(!root)return;
    const id=button.dataset[dataKey];
    root.querySelectorAll(selector).forEach(tab=>{
      const active=tab===button;
      tab.classList.toggle('active',active);
      tab.setAttribute('aria-selected',String(active));
    });
    root.querySelectorAll(panelSelector).forEach(panel=>panel.classList.toggle('active',panel.dataset[panelKey]===id));
  }));
}

function bind(module){
  if(!module)return;
  app.querySelectorAll('[data-scroll-to]').forEach(button=>button.addEventListener('click',()=>{
    const target=document.getElementById(button.dataset.scrollTo);
    if(target)target.scrollIntoView({behavior:'smooth',block:'start'});
  }));
  app.querySelectorAll('[data-copy-section]').forEach(button=>button.addEventListener('click',()=>{
    const field=module.fields?.[Number(button.dataset.copySection)];
    if(!field)return;
    copy(button.dataset.copyKind==='example'?(field.example||''):(field.template||''));
  }));
  bindTabs('[data-example-tab]','[data-example-panel]','exampleTab','examplePanel');
  bindTabs('[data-visual-tab]','[data-visual-panel]','visualTab','visualPanel');
  app.querySelector('[data-download="json"]')?.addEventListener('click',()=>save(`${module.extras?.downloadName||num(module)+'-'+module.id}.json`,JSON.stringify(module,null,2),'application/json'));
  app.querySelector('[data-download="md"]')?.addEventListener('click',()=>save(`${module.extras?.downloadName||num(module)+'-'+module.id}.md`,markdownModule(module),'text/markdown'));
  app.querySelector('[data-copy-module]')?.addEventListener('click',()=>copy(markdownModule(module)));
}

function render(scroll=true){
  const r=route(),module=r.type==='module'?moduleById(r.id):null;
  if(r.type==='module'&&!module){location.hash='#/overview';return}
  pageTitle.textContent=module?`${num(module)} — ${module.title}`:'Overview';
  document.title=`${pageTitle.textContent} · Brand Framework`;
  const visualGuide=module?moduleVisualGuide(module):'';
  app.innerHTML=module?[
    moduleIntro(module,data),
    moduleVisualMap(module,data),
    visualGuide || moduleExampleShowcase(module,data),
    editorialModuleSections(module),
    moduleFooter(module,data)
  ].join(''):overviewPage(data);
  renderNav(navSearch.value);
  bind(module);
  if(scroll){app.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'})}
}

async function init(){try{const res=await fetch('./brand-data.json',{cache:'no-store'});if(!res.ok)throw new Error(`HTTP ${res.status}`);data=await res.json();if(!Array.isArray(data.modules)||data.modules.length!==20)throw new Error('Brand data incompleto');data.frameworkRefs=frameworkRefs(data);render()}catch(error){console.error(error);app.innerHTML=`<header class="hero"><p class="eyebrow">Build error</p><h1>Não foi possível carregar o Brand Framework.</h1><p class="lead">${esc(error.message)}</p></header>`}}
window.addEventListener('hashchange',()=>render());
navSearch.addEventListener('input',()=>renderNav(navSearch.value));
menuButton.addEventListener('click',()=>setDrawer(true));
drawerClose.addEventListener('click',()=>setDrawer(false,true));
backdrop.addEventListener('click',()=>setDrawer(false));
document.addEventListener('keydown',e=>e.key==='Escape'&&setDrawer(false,true));
mobile.addEventListener('change',()=>setDrawer(false));
themeButton.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;localStorage.setItem('brand-theme',next)});
const saved=localStorage.getItem('brand-theme');if(saved==='dark'||saved==='light')document.documentElement.dataset.theme=saved;
downloadAll.addEventListener('click',()=>save('brand-framework.json',JSON.stringify({version:data.meta?.version||'2.1.0',exportedAt:new Date().toISOString(),modules:data.modules},null,2),'application/json'));
setDrawer(false);
init();