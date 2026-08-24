const app=document.getElementById('app');

const esc=(value='')=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const isPart=()=>Boolean(new URLSearchParams(location.search).get('part'));
const isMotion=()=>new URLSearchParams(location.search).get('page')==='motion';
let scheduled=false;

function sectionByTitle(title){
  return [...app.querySelectorAll(':scope > .doc-section')].find(section=>section.querySelector('.doc-section-head h2')?.textContent.trim()===title)||null;
}

function readTechTokens(){
  const tech=sectionByTitle('Informações técnicas');
  if(!tech)return [];
  return [...tech.querySelectorAll('.tech-row')].map(row=>{
    const cells=row.children;
    return {
      token:cells[0]?.textContent.trim()||'',
      value:cells[1]?.textContent.trim()||'',
      usage:cells[2]?.textContent.trim()||''
    };
  }).filter(item=>item.token);
}

function slug(value='component'){
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'component';
}

function className(value='Component'){
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9]+/g,' ').trim().split(/\s+/).map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join('')||'Component';
}

function genericSnippets(title,tokens){
  const key=slug(title),name=className(title);
  const rows=tokens.length?tokens:[{token:`${key}.default`,value:'project-token',usage:'Defina por projeto'}];
  const cssVars=rows.map(item=>`  --${item.token.replace(/[^a-zA-Z0-9-]+/g,'-')}: ${item.value};`).join('\n');
  const rnRows=rows.map(item=>`  '${item.token}': '${item.value.replace(/'/g,"\\'")}',`).join('\n');
  const flutterRows=rows.map(item=>`    '${item.token}': '${item.value.replace(/'/g,"\\'")}',`).join('\n');
  return {
    css:`/* ${title} — tokens do projeto */\n:root {\n${cssVars}\n}\n\n.ds-${key} {\n  transition: transform 160ms cubic-bezier(.2,0,0,1),\n              opacity 160ms cubic-bezier(.2,0,0,1),\n              background-color 240ms cubic-bezier(.2,0,0,1),\n              border-color 240ms cubic-bezier(.2,0,0,1);\n}\n\n.ds-${key}:active { transform: scale(.98); }\n\n@media (prefers-reduced-motion: reduce) {\n  .ds-${key} { transition-duration: .01ms; }\n}`,
    'react-native':`export const ${name}Tokens = {\n${rnRows}\n};\n\nexport const ${name}Motion = {\n  fast: 160,\n  base: 240,\n  pressedScale: 0.98,\n};`,
    flutter:`class ${name}Tokens {\n  static const Map<String, String> values = {\n${flutterRows}\n  };\n\n  static const int motionFast = 160;\n  static const int motionBase = 240;\n  static const double pressedScale = 0.98;\n}`
  };
}

function motionSnippets(){
  return {
    css:`:root {\n  --motion-fast: 160ms;\n  --motion-base: 240ms;\n  --motion-slow: 360ms;\n  --motion-standard: cubic-bezier(.2,0,0,1);\n}\n\n.motion-enter {\n  animation: motion-enter var(--motion-slow) var(--motion-standard);\n}\n\n@keyframes motion-enter {\n  from { opacity: 0; transform: translateY(24px) scale(.985); }\n  to { opacity: 1; transform: none; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: .01ms !important;\n    transition-duration: .01ms !important;\n  }\n}`,
    'react-native':`import { Animated, Easing } from 'react-native';\n\nexport function enter(value) {\n  value.setValue(0);\n  return Animated.timing(value, {\n    toValue: 1,\n    duration: 360,\n    easing: Easing.bezier(.2, 0, 0, 1),\n    useNativeDriver: true,\n  }).start();\n}\n\nexport const enterStyle = value => ({\n  opacity: value,\n  transform: [{ translateY: value.interpolate({ inputRange:[0,1], outputRange:[24,0] }) }],\n});`,
    flutter:`import 'package:flutter/material.dart';\n\nclass MotionDemo extends StatelessWidget {\n  const MotionDemo({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return TweenAnimationBuilder<double>(\n      duration: const Duration(milliseconds: 360),\n      curve: Curves.easeOutCubic,\n      tween: Tween(begin: 0, end: 1),\n      builder: (context, value, child) => Opacity(\n        opacity: value,\n        child: Transform.translate(\n          offset: Offset(0, 24 * (1 - value)),\n          child: child,\n        ),\n      ),\n      child: const Text('Motion'),\n    );\n  }\n}`
  };
}

function copyText(text){
  if(navigator.clipboard?.writeText)return navigator.clipboard.writeText(text);
  const area=document.createElement('textarea');
  area.value=text;area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();document.execCommand('copy');area.remove();
  return Promise.resolve();
}

function codeBox(snippets,title){
  return `<div class="runtime-code-box carbon-code-box" data-carbon-code><div class="runtime-code-toolbar"><div role="tablist" aria-label="Código de ${esc(title)}"><button class="active" role="tab" aria-selected="true" data-carbon-lang="css">CSS</button><button role="tab" aria-selected="false" data-carbon-lang="react-native">React Native</button><button role="tab" aria-selected="false" data-carbon-lang="flutter">Flutter</button></div><button class="runtime-copy" type="button" data-carbon-copy>Copiar código</button></div><pre><code data-carbon-output>${esc(snippets.css)}</code></pre><p>Base de implementação. Substitua tokens, medidas e conteúdo pelos valores definidos no projeto.</p></div>`;
}

function bindCodeBox(box,snippets){
  if(!box||box.dataset.carbonBound)return;
  box.dataset.carbonBound='true';
  let language='css';
  const output=box.querySelector('[data-carbon-output]');
  box.querySelectorAll('[data-carbon-lang]').forEach(tab=>tab.addEventListener('click',()=>{
    language=tab.dataset.carbonLang;
    box.querySelectorAll('[data-carbon-lang]').forEach(button=>{
      const active=button===tab;
      button.classList.toggle('active',active);
      button.setAttribute('aria-selected',String(active));
    });
    output.textContent=snippets[language];
  }));
  box.querySelector('[data-carbon-copy]')?.addEventListener('click',async event=>{
    await copyText(snippets[language]);
    const button=event.currentTarget,original=button.textContent;
    button.textContent='Copiado';
    setTimeout(()=>button.textContent=original,1200);
  });
}

function ensureCodeSection(){
  let code=sectionByTitle('Implementação')||sectionByTitle('Código pronto para copiar')||sectionByTitle('Code');
  if(code)return code;
  if(isPart())return null;
  const tech=sectionByTitle('Informações técnicas'),references=sectionByTitle('Referências');
  if(!tech||!references)return null;
  const title=app.querySelector('.doc-hero h1')?.textContent.trim()||'Design System';
  const snippets=isMotion()?motionSnippets():genericSnippets(title,readTechTokens());
  code=document.createElement('section');
  code.className='doc-section carbon-generated-code';
  code.dataset.carbonGeneratedCode='true';
  code.innerHTML=`<div class="doc-section-head"><p class="section-kicker">04</p><h2>Implementação</h2><p>Copie uma base em CSS, React Native ou Flutter sem sair da documentação.</p></div>${codeBox(snippets,title)}`;
  references.before(code);
  const kicker=references.querySelector('.section-kicker');
  if(kicker)kicker.textContent='05';
  bindCodeBox(code.querySelector('[data-carbon-code]'),snippets);
  return code;
}

function findCodeSnippets(code,title){
  if(code.dataset.carbonGeneratedCode==='true')return isMotion()?motionSnippets():genericSnippets(title,readTechTokens());
  return null;
}

function tabify(){
  if(!app||!app.querySelector(':scope > .doc-hero'))return;
  if(app.querySelector(':scope > .overview-hero')||app.querySelector(':scope > .runtime-overview'))return;
  if(app.querySelector(':scope > .ds-page-tabs'))return;

  const purpose=sectionByTitle('Para que serve');
  const usage=sectionByTitle('Exemplo real');
  const tokens=sectionByTitle('Informações técnicas');
  let code=ensureCodeSection();
  const references=sectionByTitle('Referências');

  if(isPart()&&!code)return;
  if(!purpose||!usage||!tokens||!references)return;
  code=code||sectionByTitle('Implementação')||sectionByTitle('Código pronto para copiar');
  const title=app.querySelector('.doc-hero h1')?.textContent.trim()||'Documentação';

  const panels=[
    ['overview','Overview',purpose],
    ['usage','Usage',usage],
    ['tokens','Tokens',tokens],
    ...(code?[['code','Code',code]]:[]),
    ['references','References',references]
  ];

  const tabs=document.createElement('div');
  tabs.className='ds-page-tabs';
  tabs.setAttribute('role','tablist');
  tabs.setAttribute('aria-label',`Seções de ${title}`);
  tabs.innerHTML=panels.map(([id,label],index)=>`<button type="button" role="tab" id="ds-tab-${id}" aria-controls="ds-panel-${id}" aria-selected="${index===0?'true':'false'}" tabindex="${index===0?'0':'-1'}" data-ds-tab="${id}" class="${index===0?'active':''}">${label}</button>`).join('');

  const hero=app.querySelector(':scope > .doc-hero');
  hero.after(tabs);
  app.classList.add('ds-tabbed-detail');

  panels.forEach(([id,,panel],index)=>{
    panel.dataset.dsTabPanel=id;
    panel.id=`ds-panel-${id}`;
    panel.setAttribute('role','tabpanel');
    panel.setAttribute('aria-labelledby',`ds-tab-${id}`);
    panel.hidden=index!==0;
  });

  function activate(id,focus=false){
    const selected=panels.find(([panelId])=>panelId===id);
    if(!selected)return;
    tabs.querySelectorAll('[data-ds-tab]').forEach(button=>{
      const active=button.dataset.dsTab===id;
      button.classList.toggle('active',active);
      button.setAttribute('aria-selected',String(active));
      button.tabIndex=active?0:-1;
      if(active&&focus)button.focus();
    });
    panels.forEach(([panelId,,panel])=>panel.hidden=panelId!==id);
  }

  tabs.querySelectorAll('[data-ds-tab]').forEach((button,index,buttons)=>{
    button.addEventListener('click',()=>activate(button.dataset.dsTab));
    button.addEventListener('keydown',event=>{
      if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
      event.preventDefault();
      let next=index;
      if(event.key==='ArrowRight')next=(index+1)%buttons.length;
      if(event.key==='ArrowLeft')next=(index-1+buttons.length)%buttons.length;
      if(event.key==='Home')next=0;
      if(event.key==='End')next=buttons.length-1;
      activate(buttons[next].dataset.dsTab,true);
    });
  });

  if(code){
    const generated=code.querySelector('[data-carbon-code]');
    if(generated){const snippets=findCodeSnippets(code,title);if(snippets)bindCodeBox(generated,snippets);}
  }
}

function schedule(){
  if(scheduled)return;
  scheduled=true;
  requestAnimationFrame(()=>{
    scheduled=false;
    tabify();
  });
}

const observer=new MutationObserver(schedule);
if(app)observer.observe(app,{childList:true,subtree:true});
window.addEventListener('hashchange',schedule);
window.addEventListener('popstate',schedule);
schedule();
