const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clamp=n=>Math.max(0,Math.min(100,Number(n)||0));

function tonePanel(module){
  const contexts=module.extras?.toneContexts||[];
  const first=contexts[0]||{};
  return `<div class="verbal-panel active" data-verbal-panel="tone">
    <div class="tone-layout">
      <div>
        <p class="mini-label">Contexto</p>
        <div class="verbal-contexts">${contexts.map((c,i)=>`<button type="button" class="verbal-context ${i===0?'active':''}" data-context="${esc(c.id)}">${esc(c.name)}</button>`).join('')}</div>
        <div class="tone-sliders" id="toneSliders">${[['formality','Formalidade'],['warmth','Proximidade'],['energy','Energia'],['humor','Humor'],['directness','Direção']].map(([key,label])=>`<label><span>${label}<output data-tone-output="${key}">${first[key]??0}</output></span><input type="range" min="0" max="100" value="${first[key]??0}" data-tone="${key}" /></label>`).join('')}</div>
      </div>
      <article class="tone-preview"><p class="mini-label">Interpretação editorial</p><h3 id="toneContextName">${esc(first.name||'Contexto')}</h3><p id="toneContextExample">${esc(first.example||'')}</p><div class="tone-readout" id="toneReadout"></div><small>Os sliders descrevem intensidade editorial. Eles não “geram” texto automaticamente; servem como guardrail para escrever, revisar e orientar IA.</small></article>
    </div>
  </div>`;
}

function matrixPanel(module){const rows=module.extras?.matrix||[];return `<div class="verbal-panel" data-verbal-panel="matrix"><div class="verbal-matrix"><div class="matrix-head">Somos</div><div class="matrix-head">Não somos</div><div class="matrix-head">Na prática</div>${rows.map(r=>`<strong>${esc(r[0])}</strong><strong class="not">${esc(r[1])}</strong><p>${esc(r[2])}</p>`).join('')}</div></div>`}
function beforeAfterPanel(module){const items=module.extras?.beforeAfter||[];return `<div class="verbal-panel" data-verbal-panel="before"><div class="before-grid">${items.map((x,i)=>`<article class="before-card"><span>${esc(x.context)}</span><div><small>Antes</small><p>${esc(x.before)}</p></div><div class="after"><small>Depois</small><p>${esc(x.after)}</p></div><p class="why-change">${esc(x.why)}</p><button type="button" class="button" data-copy-after="${i}">Copiar depois</button></article>`).join('')}</div></div>`}
function vocabularyPanel(module){const items=module.extras?.vocabulary||[];return `<div class="verbal-panel" data-verbal-panel="vocabulary"><label class="verbal-filter"><span>Filtrar vocabulário</span><input id="verbalVocabularySearch" type="search" placeholder="Ex.: clareza, suporte, revolucionar" /></label><div class="vocab-table" id="vocabTable">${items.map(r=>`<article class="vocab-row"><strong>${esc(r[0])}</strong><span>${esc(r[1])}</span><p>${esc(r[2])}</p></article>`).join('')}</div></div>`}
function ctaPanel(module){const items=module.extras?.ctas||[];return `<div class="verbal-panel" data-verbal-panel="cta"><div class="cta-grid">${items.map((r,i)=>`<article class="cta-card"><span>${esc(r[0])}</span><button class="cta-sample" type="button" data-copy-cta="${i}" data-value="${esc(r[1])}">${esc(r[1])}<b>⧉</b></button><p>${esc(r[2])}</p><small>${esc(r[3])}</small></article>`).join('')}</div></div>`}
function channelsPanel(module){const items=module.extras?.channels||[];return `<div class="verbal-panel" data-verbal-panel="channels"><div class="channel-table"><div class="channel-head">Canal</div><div class="channel-head">Tom</div><div class="channel-head">Priorize</div><div class="channel-head">Evite</div>${items.map(r=>r.map((c,i)=>i===0?`<strong>${esc(c)}</strong>`:`<p>${esc(c)}</p>`).join('')).join('')}</div></div>`}

export function verbalExtras(module){
  if(module?.id!=='verbal-identity')return '';
  return `<section class="section verbal-lab"><div class="section-head"><div><p class="eyebrow">Verbal Identity Lab</p><h2>Teste a voz em situações reais.</h2></div><p>A mesma marca muda de tom conforme contexto, mas preserva princípios, vocabulário e limites.</p></div>
    <div class="verbal-tabs" role="tablist"><button class="verbal-tab active" data-verbal-tab="tone" type="button">Tone</button><button class="verbal-tab" data-verbal-tab="matrix" type="button">Somos / Não somos</button><button class="verbal-tab" data-verbal-tab="before" type="button">Antes / Depois</button><button class="verbal-tab" data-verbal-tab="vocabulary" type="button">Vocabulário</button><button class="verbal-tab" data-verbal-tab="cta" type="button">CTA library</button><button class="verbal-tab" data-verbal-tab="channels" type="button">Canais</button></div>
    ${tonePanel(module)}${matrixPanel(module)}${beforeAfterPanel(module)}${vocabularyPanel(module)}${ctaPanel(module)}${channelsPanel(module)}
  </section>`;
}

export function bindVerbalExtras(root,module,{copy,save,notify}={}){
  if(module?.id!=='verbal-identity')return;
  const selectedIndex=Number(root.querySelector('.field-button.active')?.dataset.field||0);
  const selectedField=module.fields?.[selectedIndex];
  const tabPanel=root.querySelector('.tab-panel');
  if(tabPanel&&selectedField?.sources?.length){const box=document.createElement('div');box.className='field-source-links';box.innerHTML=`<strong>Referências deste item</strong><div>${selectedField.sources.map(source=>`<a href="${esc(source.url)}" target="_blank" rel="noreferrer">${esc(source.title)} ↗</a>`).join('')}</div>`;tabPanel.append(box)}
  const tabs=[...root.querySelectorAll('[data-verbal-tab]')];
  const panels=[...root.querySelectorAll('[data-verbal-panel]')];
  tabs.forEach(tab=>tab.addEventListener('click',()=>{const id=tab.dataset.verbalTab;tabs.forEach(x=>x.classList.toggle('active',x===tab));panels.forEach(x=>x.classList.toggle('active',x.dataset.verbalPanel===id))}));

  const contexts=module.extras?.toneContexts||[];
  const contextButtons=[...root.querySelectorAll('[data-context]')];
  const sliders=[...root.querySelectorAll('[data-tone]')];
  const stateKey='brand-verbal-tone-v1';
  let state={context:contexts[0]?.id||'',values:{}};
  try{state={...state,...JSON.parse(localStorage.getItem(stateKey)||'{}')}}catch{}
  function getContext(){return contexts.find(c=>c.id===state.context)||contexts[0]||{}}
  function syncTone(fromContext=false){const ctx=getContext();if(fromContext||!Object.keys(state.values||{}).length)state.values={formality:ctx.formality,warmth:ctx.warmth,energy:ctx.energy,humor:ctx.humor,directness:ctx.directness};
    contextButtons.forEach(b=>b.classList.toggle('active',b.dataset.context===ctx.id));
    sliders.forEach(input=>{const key=input.dataset.tone;input.value=clamp(state.values[key]);root.querySelector(`[data-tone-output="${key}"]`).textContent=input.value});
    const name=root.querySelector('#toneContextName'),example=root.querySelector('#toneContextExample'),readout=root.querySelector('#toneReadout');if(name)name.textContent=ctx.name||'';if(example)example.textContent=ctx.example||'';if(readout)readout.innerHTML=[['Formalidade','formality'],['Proximidade','warmth'],['Energia','energy'],['Humor','humor'],['Direção','directness']].map(([label,key])=>`<span><b>${label}</b>${clamp(state.values[key])}</span>`).join('');
    localStorage.setItem(stateKey,JSON.stringify(state));
  }
  contextButtons.forEach(b=>b.addEventListener('click',()=>{state.context=b.dataset.context;syncTone(true)}));
  sliders.forEach(input=>input.addEventListener('input',()=>{state.values[input.dataset.tone]=clamp(input.value);syncTone(false)}));
  syncTone(false);

  root.querySelectorAll('[data-copy-after]').forEach(btn=>btn.addEventListener('click',()=>copy?.(module.extras.beforeAfter[+btn.dataset.copyAfter]?.after||'')));
  root.querySelectorAll('[data-copy-cta]').forEach(btn=>btn.addEventListener('click',()=>copy?.(btn.dataset.value||'')));
  const search=root.querySelector('#verbalVocabularySearch');if(search)search.addEventListener('input',()=>{const term=search.value.trim().toLowerCase();root.querySelectorAll('.vocab-row').forEach(row=>row.hidden=!!term&&!row.textContent.toLowerCase().includes(term))});

  const exportButton=document.createElement('button');exportButton.type='button';exportButton.className='button';exportButton.textContent='Baixar perfil verbal';exportButton.addEventListener('click',()=>{const payload={module:'Verbal Identity',version:'1.3.0',tone:state,principles:module.extras.voicePrinciples,matrix:module.extras.matrix,vocabulary:module.extras.vocabulary,ctas:module.extras.ctas};save?.('verbal-identity-profile.json',JSON.stringify(payload,null,2),'application/json');notify?.('Perfil verbal baixado')});
  root.querySelector('.verbal-lab .section-head')?.append(exportButton);
}
