const app=document.getElementById('app');

const TABBED_PAGES=new Set([
  'Buttons',
  'Icon Buttons',
  'Selection Controls',
  'Slider',
  'Tags',
  'Navigation',
  'Tabs',
  'Header Links',
  'Forms',
  'Cards',
  'Tables',
  'Modals & Popups',
  'Banners & Messaging'
]);

let scheduled=false;

function params(){return new URLSearchParams(location.search);}
function isPart(){return Boolean(params().get('part'));}
function isMotion(){return params().get('page')==='motion';}
function pageTitle(){return app?.querySelector(':scope > .doc-hero h1')?.textContent.trim()||'';}

function tabScope(){
  if(!app)return null;
  return app.querySelector(':scope > .runtime-overview')||app;
}

function shouldUseTabs(){
  if(!app)return false;
  if(app.querySelector(':scope > .runtime-overview'))return false;
  if(isPart()||isMotion())return true;
  return TABBED_PAGES.has(pageTitle());
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
  tabs.hidden=false;
  tabs.dataset.tabsMode='document';
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
