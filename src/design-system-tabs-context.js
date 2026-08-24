const app=document.getElementById('app');

const TABBED_ROUTES=new Set([
  'grid','spacing','typography','colors','icons','effects',
  'avatars',
  'buttons','icon-buttons','selects-controls','slider','tags',
  'navigation','tabs','header-links','forms',
  'cards','tables','modals-popups','banners-messaging'
]);

let scheduled=false;

function params(){return new URLSearchParams(location.search);}
function isPart(){return Boolean(params().get('part'));}
function isMotion(){return params().get('page')==='motion';}
function routeId(){
  const raw=(location.hash||'#/overview').replace(/^#\/?/,'');
  return raw.split(/[/?]/)[0]||'overview';
}

function tabScope(){
  if(!app)return null;
  return app.querySelector(':scope > .runtime-overview')||app;
}

function shouldUseTabs(){
  if(!app||app.querySelector(':scope > .runtime-overview'))return false;
  if(isPart()||isMotion())return true;
  return TABBED_ROUTES.has(routeId());
}

function normalizeLabels(tabs){
  const labels={overview:'Overview',usage:'Uso',tokens:'Tokens',code:'Código',references:'Referências'};
  tabs.querySelectorAll('[data-ds-tab]').forEach(button=>{
    const label=labels[button.dataset.dsTab];
    if(label)button.textContent=label;
  });
}

function restoreTabbedPanels(scope,tabs){
  const buttons=[...tabs.querySelectorAll('[data-ds-tab]')];
  if(!buttons.length)return;
  let active=buttons.find(button=>button.classList.contains('active'))||buttons[0];
  buttons.forEach(button=>{
    const selected=button===active;
    button.classList.toggle('active',selected);
    button.setAttribute('aria-selected',String(selected));
    button.tabIndex=selected?0:-1;
  });
  scope.querySelectorAll(':scope > [data-ds-tab-panel]').forEach(panel=>{
    const selected=panel.dataset.dsTabPanel===active.dataset.dsTab;
    panel.hidden=!selected;
    panel.setAttribute('role','tabpanel');
    const owner=tabs.querySelector(`[data-ds-tab="${panel.dataset.dsTabPanel}"]`);
    if(owner?.id)panel.setAttribute('aria-labelledby',owner.id);
  });
}

function showAsTabs(scope,tabs){
  normalizeLabels(tabs);
  tabs.hidden=false;
  tabs.dataset.tabsMode='brand';
  scope.classList.add('ds-tabbed-detail');
  restoreTabbedPanels(scope,tabs);
}

function showAsDocument(scope,tabs){
  tabs.hidden=true;
  tabs.dataset.tabsMode='document-flow';
  scope.classList.remove('ds-tabbed-detail');
  scope.querySelectorAll(':scope > [data-ds-tab-panel]').forEach(panel=>{
    panel.hidden=false;
    panel.removeAttribute('role');
    panel.removeAttribute('aria-labelledby');
  });
}

function sync(){
  const scope=tabScope();
  if(!scope)return;
  const tabs=scope.querySelector(':scope > .ds-page-tabs');
  if(!tabs)return;
  if(shouldUseTabs())showAsTabs(scope,tabs);
  else showAsDocument(scope,tabs);
}

function schedule(){
  if(scheduled)return;
  scheduled=true;
  requestAnimationFrame(()=>{
    scheduled=false;
    sync();
  });
}

const observer=new MutationObserver(schedule);
if(app)observer.observe(app,{childList:true,subtree:true});
window.addEventListener('hashchange',schedule);
window.addEventListener('popstate',schedule);
schedule();
