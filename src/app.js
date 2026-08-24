import { groups, esc, num, frameworkRefs } from './brand-ui.js';
import { overviewPage, moduleFooter } from './brand-pages.js';
import { editorialFieldPage } from './brand-editorial.js';
import { moduleVisualGuide } from './brand-visual-guide.js';

const app=document.getElementById('app'),nav=document.getElementById('nav'),pageTitle=document.getElementById('pageTitle'),navSearch=document.getElementById('navSearch'),themeButton=document.getElementById('themeButton'),menuButton=document.getElementById('menuButton'),drawerClose=document.getElementById('drawerClose'),backdrop=document.getElementById('backdrop'),downloadAll=document.getElementById('downloadAll'),sidebar=document.getElementById('sidebar'),toast=document.getElementById('toast');
const mobile=window.matchMedia('(max-width:760px)');
let data={modules:[],references:{},resources:{}};

const route=()=>{
  const raw=location.hash.replace(/^#\//,'')||'overview';
  const parts=raw.split('/');
  if(parts[0]==='module')return{type:'item',id:parts[1],field:parts[2]===undefined?null:Number(parts[2])};
  return{type:'overview'};
};
const moduleById=id=>data.modules.find(m=>String(m.id)===String(id));
const fieldByRoute=r=>{
  const module=r?.type==='item'?moduleById(r.id):null;
  if(!module)return{module:null,field:null,index:null};
  const index=Number.isInteger(r.field)&&r.field>=0&&r.field<(module.fields?.length||0)?r.field:0;
  return{module,field:module.fields?.[index]||null,index};
};
function notify(t){toast.textContent=t;toast.classList.add('show');clearTimeout(notify.t);notify.t=setTimeout(()=>toast.classList.remove('show'),1400)}
function setDrawer(open,restore=false){document.body.classList.toggle('nav-open',open&&mobile.matches);menuButton.setAttribute('aria-expanded',String(open&&mobile.matches));sidebar.setAttribute('aria-hidden',String(mobile.matches&&!open));if('inert'in sidebar)sidebar.inert=mobile.matches&&!open;if(!open&&restore)menuButton.focus()}
function save(name,content,type='text/plain'){const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500)}
async function copy(text){if(navigator.clipboard)await navigator.clipboard.writeText(text);else{notify('Clipboard indisponível');return}notify('Copiado')}

function filteredModuleFields(module,term){
  const fields=(module.fields||[]).map((field,index)=>({field,index}));
  if(!term)return fields;
  const moduleMatch=[module.title,module.summary,module.group].join(' ').toLowerCase().includes(term);
  return moduleMatch?fields:fields.filter(({field})=>[field.name,field.definition,field.objective].join(' ').toLowerCase().includes(term));
}

function renderNav(filter=''){
  const r=route();
  const {module:activeModule,index:activeFieldIndex}=fieldByRoute(r);
  const activeNumber=activeModule?Number(activeModule.number):null;
  const term=filter.trim().toLowerCase();

  const start=`<div class="nav-home">
    <a class="nav-link ${r.type==='overview'?'active':''}" href="#/overview"><span>00</span><strong>Overview</strong></a>
    <a class="nav-link" href="./design-system.html"><span>DS</span><strong>Design System</strong></a>
  </div>`;

  const grouped=groups.map(([label,min,max],groupIndex)=>{
    const modules=data.modules
      .filter(m=>Number(m.number)>=min&&Number(m.number)<=max)
      .map(module=>({module,fields:filteredModuleFields(module,term)}))
      .filter(entry=>entry.fields.length);
    if(!modules.length)return'';

    const groupActive=activeNumber!==null&&activeNumber>=min&&activeNumber<=max;
    const groupOpen=Boolean(term)||groupActive;

    return `<div class="nav-group ${groupOpen?'open':''}" data-nav-group="${groupIndex}">
      <button class="nav-group-toggle" type="button" data-nav-toggle aria-expanded="${groupOpen}">
        <span>${esc(label)}</span><span class="nav-chevron" aria-hidden="true">›</span>
      </button>
      <div class="nav-group-items" ${groupOpen?'':'hidden'}>
        ${modules.map(({module,fields})=>{
          const moduleActive=activeModule?.id===module.id;
          const moduleOpen=Boolean(term)||moduleActive;
          return `<div class="nav-module ${moduleOpen?'open':''}" data-nav-module="${esc(module.id)}">
            <button class="nav-module-toggle ${moduleActive?'active':''}" type="button" data-module-toggle aria-expanded="${moduleOpen}">
              <span>${num(module)}</span><strong>${esc(module.title)}</strong><span class="nav-module-chevron" aria-hidden="true">›</span>
            </button>
            <div class="nav-module-items" ${moduleOpen?'':'hidden'}>
              ${fields.map(({field,index})=>`<a class="nav-item-link ${moduleActive&&activeFieldIndex===index?'active':''}" href="#/module/${esc(module.id)}/${index}">
                <span>${num(module)}.${String(index+1).padStart(2,'0')}</span><strong>${esc(field.name)}</strong>
              </a>`).join('')}
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }).join('');

  nav.innerHTML=start+grouped;

  nav.querySelectorAll('[data-nav-toggle]').forEach(toggle=>toggle.addEventListener('click',()=>{
    const current=toggle.closest('.nav-group');
    const willOpen=toggle.getAttribute('aria-expanded')!=='true';
    nav.querySelectorAll('.nav-group').forEach(group=>{
      const button=group.querySelector(':scope > [data-nav-toggle]');
      const items=group.querySelector(':scope > .nav-group-items');
      const open=group===current?willOpen:false;
      group.classList.toggle('open',open);
      button?.setAttribute('aria-expanded',String(open));
      if(items)items.hidden=!open;
    });
  }));

  nav.querySelectorAll('[data-module-toggle]').forEach(toggle=>toggle.addEventListener('click',()=>{
    const current=toggle.closest('.nav-module');
    const willOpen=toggle.getAttribute('aria-expanded')!=='true';
    const group=current?.closest('.nav-group-items');
    group?.querySelectorAll(':scope > .nav-module').forEach(module=>{
      const button=module.querySelector(':scope > [data-module-toggle]');
      const items=module.querySelector(':scope > .nav-module-items');
      const open=module===current?willOpen:false;
      module.classList.toggle('open',open);
      button?.setAttribute('aria-expanded',String(open));
      if(items)items.hidden=!open;
    });
  }));

  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobile.matches&&setDrawer(false)));
}

function bindTabs(selector,panelSelector,dataKey,panelKey){
  app.querySelectorAll(selector).forEach(button=>button.addEventListener('click',()=>{
    const root=button.closest('.visual-guideline');
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

function suggestedVisualTab(module,field){
  if(!module||!field)return null;
  const name=String(field.name||'').toLowerCase();
  if(module.id==='visual-brand-identity'){
    if(name.includes('color'))return'colors';
    if(name.includes('incorrect'))return'rules';
    return'logo';
  }
  if(module.id==='typography'){
    if(name.includes('typeface')||name.includes('licenc'))return'families';
    return'hierarchy';
  }
  if(module.id==='photography'){
    if(name.includes("isn't")||name.includes('isn’t'))return'not';
    if(name.includes('this is'))return'us';
    return'anatomy';
  }
  if(module.id==='illustration'){
    if(name.includes('this is'))return'compare';
    if(['formas','traços','proporções','perspectiva','personagens','cores','texturas','sombras','fundos','composição'].some(k=>name.includes(k)))return'recipe';
    return'styles';
  }
  if(module.id==='iconography'){
    if(['grid','stroke','corner','optical','tamanho'].some(k=>name.includes(k)))return'grid';
    if(name.includes('metáfora'))return'compare';
    return'library';
  }
  if(module.id==='graphic-language'){
    if(name.includes('reconhecimento'))return'recognition';
    if(['shape','pattern','gradient','mask','line','texture','frame','container','device','signature','decorative'].some(k=>name.includes(k)))return'signals';
    return'system';
  }
  return null;
}

function activateSuggestedVisualTab(module,field){
  const id=suggestedVisualTab(module,field);
  if(!id)return;
  app.querySelector(`[data-visual-tab="${id}"]`)?.click();
}

function bind(module,field){
  if(!module||!field)return;
  app.querySelectorAll('[data-copy-section]').forEach(button=>button.addEventListener('click',()=>{
    const source=module.fields?.[Number(button.dataset.copySection)];
    if(!source)return;
    copy(button.dataset.copyKind==='example'?(source.example||''):(source.template||''));
  }));
  bindTabs('[data-visual-tab]','[data-visual-panel]','visualTab','visualPanel');
  activateSuggestedVisualTab(module,field);
}

function render(scroll=true){
  const r=route();
  if(r.type==='overview'){
    pageTitle.textContent='Overview';
    document.title='Overview · Brand Framework';
    app.innerHTML=overviewPage(data);
    renderNav(navSearch.value);
    if(scroll){app.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'})}
    return;
  }

  const module=moduleById(r.id);
  if(!module){location.hash='#/overview';return}
  if(r.field===null||!Number.isInteger(r.field)||r.field<0||r.field>=(module.fields?.length||0)){
    location.hash=`#/module/${module.id}/0`;
    return;
  }

  const index=r.field;
  const field=module.fields[index];
  const sectionNumber=`${num(module)}.${String(index+1).padStart(2,'0')}`;
  pageTitle.textContent=`${num(module)} — ${module.title} / ${field.name}`;
  document.title=`${sectionNumber} — ${field.name} · Brand Framework`;

  const visualGuide=moduleVisualGuide(module);
  app.innerHTML=[editorialFieldPage(module,index,visualGuide),moduleFooter(module,data)].join('');
  renderNav(navSearch.value);
  bind(module,field);
  if(scroll){app.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'})}
}

async function init(){
  try{
    const res=await fetch('./brand-data.json',{cache:'no-store'});
    if(!res.ok)throw new Error(`HTTP ${res.status}`);
    data=await res.json();
    if(!Array.isArray(data.modules)||data.modules.length!==20)throw new Error('Brand data incompleto');
    data.frameworkRefs=frameworkRefs(data);
    render();
  }catch(error){
    console.error(error);
    app.innerHTML=`<header class="hero"><p class="eyebrow">Build error</p><h1>Não foi possível carregar o Brand Framework.</h1><p class="lead">${esc(error.message)}</p></header>`;
  }
}

window.addEventListener('hashchange',()=>render());
navSearch.addEventListener('input',()=>renderNav(navSearch.value));
menuButton.addEventListener('click',()=>setDrawer(true));
drawerClose.addEventListener('click',()=>setDrawer(false,true));
backdrop.addEventListener('click',()=>setDrawer(false));
document.addEventListener('keydown',e=>e.key==='Escape'&&setDrawer(false,true));
mobile.addEventListener('change',()=>setDrawer(false));
themeButton.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;localStorage.setItem('brand-theme',next)});
const saved=localStorage.getItem('brand-theme');if(saved==='dark'||saved==='light')document.documentElement.dataset.theme=saved;
downloadAll.addEventListener('click',()=>save('brand-framework.json',JSON.stringify({version:data.meta?.version||'2.2.0',exportedAt:new Date().toISOString(),modules:data.modules},null,2),'application/json'));
setDrawer(false);
init();
