import { esc } from './brand-ui.js';

const section=(title,lead,body)=>`<section class="section personality-lab"><div class="section-head"><div><p class="eyebrow">Personality Lab</p><h2>${esc(title)}</h2></div><p>${esc(lead)}</p></div>${body}</section>`;
const axisMarkup=([left,right,value],i)=>`<label class="personality-axis"><div><strong>${esc(left)}</strong><output id="axisValue${i}">${value}</output><strong>${esc(right)}</strong></div><input type="range" min="0" max="100" value="${value}" data-axis="${i}" aria-label="${esc(left)} a ${esc(right)}"><div class="axis-track-labels"><span>${esc(left)}</span><span>${esc(right)}</span></div></label>`;
const archetypeCard=a=>`<article class="archetype-card" data-archetype="${esc(a.id)}"><header><div><small>${esc(a.brandName)}</small><h3>${esc(a.name)}</h3></div><span class="archetype-state" aria-live="polite"></span></header><p>${esc(a.motive)}</p><div class="archetype-actions"><button type="button" data-set-primary="${esc(a.id)}">Primário</button><button type="button" data-set-secondary="${esc(a.id)}">Secundário</button></div></article>`;
const guardrailRow=g=>`<div class="guardrail-row"><div><strong>${esc(g[0])}</strong><span>Somos</span><p>${esc(g[2])}</p></div><div><strong>${esc(g[1])}</strong><span>Não somos</span><p>${esc(g[3])}</p></div></div>`;
const contextRow=c=>`<div class="context-row"><strong>${esc(c[0])}</strong><p>${esc(c[1])}</p><p>${esc(c[2])}</p><span>${esc(c[3])}</span></div>`;

function archetypeDetail(a,role){return `<article class="archetype-detail"><div class="archetype-detail-head"><span>${esc(role)}</span><h3>${esc(a.name)} <small>${esc(a.brandName)}</small></h3><p>${esc(a.motive)}</p></div><dl><div><dt>Como pensa</dt><dd>${esc(a.think)}</dd></div><div><dt>Como fala</dt><dd>${esc(a.speak)}</dd></div><div><dt>Como se comporta</dt><dd>${esc(a.behave)}</dd></div><div><dt>Como se manifesta visualmente</dt><dd>${esc(a.visual)}</dd></div><div class="avoid"><dt>O que evita</dt><dd>${esc(a.avoid)}</dd></div></dl></article>`}

export function personalityExtras(module){
  if(module?.id!=='personality')return '';
  const x=module.extras||{},archetypes=x.archetypes||[],scales=x.scales||[],mix=x.baseMix||{};
  const primary=archetypes.find(a=>a.brandName===mix.primary)||archetypes[0];
  const secondary=archetypes.find(a=>a.brandName===mix.secondary)||archetypes[1];
  return section('Transforme personalidade em decisão.','Ajuste escalas, combine arquétipos e veja imediatamente como a escolha deve alterar pensamento, fala, comportamento e expressão visual.',`
    <div class="personality-tabs" role="tablist" aria-label="Ferramentas de personalidade">
      ${[['scales','Escalas'],['archetypes','Arquétipos'],['guardrails','Somos / Não somos'],['contexts','Contextos'],['application','Aplicação']].map(([id,label],i)=>`<button class="personality-tab ${i===0?'active':''}" type="button" data-personality-tab="${id}" role="tab" aria-selected="${i===0}">${label}</button>`).join('')}
    </div>
    <div class="personality-panel active" data-personality-panel="scales">
      <div class="personality-intro"><div><h3>Escalas comportamentais</h3><p>Os valores são regras editoriais de direção, não medições científicas. Ajuste a marca-exemplo e use o resultado como ponto de partida para discussão.</p></div><button class="button" type="button" data-reset-personality>Restaurar exemplo</button></div>
      <div class="personality-axis-list">${scales.map(axisMarkup).join('')}</div>
      <div class="personality-score" id="personalityScore"></div>
    </div>
    <div class="personality-panel" data-personality-panel="archetypes">
      <div class="personality-intro"><div><h3>Arquétipos como ferramenta, não como fantasia.</h3><p>Escolha um principal e um secundário. O principal domina a motivação; o secundário adiciona contraste. Evite usar arquétipo como atalho para estética ou estereótipo.</p></div></div>
      <div class="archetype-grid">${archetypes.map(archetypeCard).join('')}</div>
      <div class="mix-control"><div class="mix-copy"><small>Proporção editorial</small><strong id="mixLabel">${esc(primary.name)} ${mix.primaryPct||70}% / ${esc(secondary.name)} ${100-(mix.primaryPct||70)}%</strong><p>Em conflito, o arquétipo principal vence. A proporção pode variar por contexto, mas não deve inverter a identidade-base sem decisão estratégica.</p></div><label><span>Primário</span><input type="range" min="55" max="90" value="${mix.primaryPct||70}" id="mixRange"><span>Secundário</span></label></div>
    </div>
    <div class="personality-panel" data-personality-panel="guardrails">
      <div class="guardrail-list">${(x.guardrails||[]).map(guardrailRow).join('')}</div>
      <div class="personality-callout"><strong>Regra</strong><p>O lado “Não somos” não é o oposto do atributo; é o excesso previsível que surge quando o atributo é aplicado sem julgamento.</p></div>
    </div>
    <div class="personality-panel" data-personality-panel="contexts">
      <div class="context-head"><span>Contexto</span><span>Traço que cresce</span><span>Guardrail</span><span>Direção</span></div>
      <div class="context-table">${(x.contexts||[]).map(contextRow).join('')}</div>
    </div>
    <div class="personality-panel" data-personality-panel="application">
      <div class="application-mix" id="archetypeApplication">${archetypeDetail(primary,'Arquétipo principal')}${archetypeDetail(secondary,'Arquétipo secundário')}</div>
      <div class="personality-downloads"><button class="button primary" type="button" data-download-personality>Baixar perfil JSON</button><button class="button" type="button" data-copy-personality>Copiar resumo</button></div>
    </div>
    <div class="personality-method-note"><strong>Base metodológica</strong><p>Aaker propõe cinco dimensões mensuráveis de brand personality (Sincerity, Excitement, Competence, Sophistication e Ruggedness). O sistema de 12 arquétipos de Pearson foi posteriormente aplicado a branding por Pearson e Margaret Mark. Neste framework, ambos são referências complementares: dimensões ajudam a observar traços; arquétipos ajudam a organizar motivação e narrativa.</p></div>
  `);
}

export function bindPersonalityExtras(root,module,{save,copy,notify}={}){
  if(module?.id!=='personality')return;
  const x=module.extras||{},archetypes=x.archetypes||[],baseScales=(x.scales||[]).map(a=>[...a]);
  const key='brand-personality-lab-v1';
  let state={scales:baseScales.map(a=>a[2]),primary:(x.baseMix||{}).primary||'Sage',secondary:(x.baseMix||{}).secondary||'Creator',primaryPct:(x.baseMix||{}).primaryPct||70};
  try{const saved=JSON.parse(localStorage.getItem(key)||'null');if(saved)state={...state,...saved}}catch{}
  const byBrand=name=>archetypes.find(a=>a.brandName===name)||archetypes[0];
  const byId=id=>archetypes.find(a=>a.id===id);
  const persist=()=>localStorage.setItem(key,JSON.stringify(state));
  const summary=()=>{const p=byBrand(state.primary),s=byBrand(state.secondary);return `Brand Personality\nArquétipo principal: ${p.name} (${state.primaryPct}%)\nArquétipo secundário: ${s.name} (${100-state.primaryPct}%)\nEscalas:\n${baseScales.map((a,i)=>`- ${a[0]} ↔ ${a[1]}: ${state.scales[i]}/100`).join('\n')}`};
  const render=()=>{
    root.querySelectorAll('[data-axis]').forEach((el,i)=>{el.value=state.scales[i];const out=root.querySelector(`#axisValue${i}`);if(out)out.value=`${state.scales[i]}/100`});
    const p=byBrand(state.primary),s=byBrand(state.secondary);root.querySelectorAll('.archetype-card').forEach(card=>{const a=byId(card.dataset.archetype),label=card.querySelector('.archetype-state');card.classList.toggle('primary',a?.brandName===state.primary);card.classList.toggle('secondary',a?.brandName===state.secondary);if(label)label.textContent=a?.brandName===state.primary?'Primário':a?.brandName===state.secondary?'Secundário':''});
    const mix=root.querySelector('#mixRange');if(mix)mix.value=state.primaryPct;const mixLabel=root.querySelector('#mixLabel');if(mixLabel)mixLabel.textContent=`${p.name} ${state.primaryPct}% / ${s.name} ${100-state.primaryPct}%`;
    const app=root.querySelector('#archetypeApplication');if(app)app.innerHTML=archetypeDetail(p,'Arquétipo principal')+archetypeDetail(s,'Arquétipo secundário');
    const score=root.querySelector('#personalityScore');if(score)score.innerHTML=baseScales.map((a,i)=>`<div><span>${esc(a[0])}</span><strong>${state.scales[i]}</strong><span>${esc(a[1])}</span></div>`).join('');
  };
  root.querySelectorAll('[data-personality-tab]').forEach(btn=>btn.addEventListener('click',()=>{root.querySelectorAll('[data-personality-tab]').forEach(b=>{const on=b===btn;b.classList.toggle('active',on);b.setAttribute('aria-selected',String(on))});root.querySelectorAll('[data-personality-panel]').forEach(p=>p.classList.toggle('active',p.dataset.personalityPanel===btn.dataset.personalityTab))}));
  root.querySelectorAll('[data-axis]').forEach((el,i)=>el.addEventListener('input',()=>{state.scales[i]=Number(el.value);persist();render()}));
  root.querySelectorAll('[data-set-primary]').forEach(btn=>btn.addEventListener('click',()=>{const a=byId(btn.dataset.setPrimary);if(!a)return;if(a.brandName===state.secondary){state.secondary=state.primary}state.primary=a.brandName;persist();render()}));
  root.querySelectorAll('[data-set-secondary]').forEach(btn=>btn.addEventListener('click',()=>{const a=byId(btn.dataset.setSecondary);if(!a)return;if(a.brandName===state.primary){state.primary=state.secondary}state.secondary=a.brandName;persist();render()}));
  root.querySelector('#mixRange')?.addEventListener('input',e=>{state.primaryPct=Number(e.currentTarget.value);persist();render()});
  root.querySelector('[data-reset-personality]')?.addEventListener('click',()=>{state={scales:baseScales.map(a=>a[2]),primary:(x.baseMix||{}).primary||'Sage',secondary:(x.baseMix||{}).secondary||'Creator',primaryPct:(x.baseMix||{}).primaryPct||70};persist();render();notify?.('Exemplo restaurado')});
  root.querySelector('[data-download-personality]')?.addEventListener('click',()=>save?.('brand-personality-profile.json',JSON.stringify({version:'1.0',...state,primary:byBrand(state.primary),secondary:byBrand(state.secondary)},null,2),'application/json'));
  root.querySelector('[data-copy-personality]')?.addEventListener('click',()=>copy?.(summary()));
  render();
}
