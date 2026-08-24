import { references as registry } from './reference-registry.js';
import { esc } from './brand-ui.js';

const audienceRefs={
  gov_user_research:{title:'GOV.UK — User research',url:'https://www.gov.uk/service-manual/user-research/how-user-research-improves-service-design'},
  gov_user_needs:{title:'GOV.UK — User needs',url:'https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs'},
  gov_contextual:{title:'GOV.UK — Contextual research',url:'https://www.gov.uk/service-manual/user-research/contextual-research-and-observation'},
  gov_experience_map:{title:'GOV.UK — Experience maps',url:'https://www.gov.uk/service-manual/user-research/researching-user-experiences'},
  gov_plan_research:{title:'GOV.UK — Plan user research',url:'https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service'},
  gov_assisted_personas:{title:'GOV.UK — Assisted digital personas',url:'https://www.gov.uk/service-manual/user-research/understanding-users-who-dont-use-digital-services'},
  intercom_jtbd_book:{title:'Intercom — Jobs-to-be-Done',url:'https://www.intercom.com/blog/jobs-to-be-done-book/'},
  intercom_switching:{title:'Intercom — Finding jobs customers use products for',url:'https://www.intercom.com/blog/videos/finding-jobs-your-product-is-used-for/'},
  intercom_motivations:{title:'Intercom — Customer motivations / switching',url:'https://www.intercom.com/blog/podcasts/bob-moesta-on-unpacking-customer-motivations-with-jobs-to-be-done/'},
  microsoft_personas:{title:'Microsoft Research — Personas: Practice and Theory',url:'https://www.microsoft.com/en-us/research/publication/personas-practice-theory/'},
  microsoft_inclusive_toolkit:{title:'Microsoft Inclusive Design Toolkit',url:'https://download.microsoft.com/download/b/0/d/b0d4bf87-09ce-4417-8f28-d60703d672ed/inclusive_toolkit_manual_final.pdf'}
};
const refLink=id=>{const r=audienceRefs[id]||registry[id];return r?.url?`<a href="${esc(r.url)}" target="_blank" rel="noreferrer">${esc(r.title)} ↗</a>`:''};

export function audienceExtras(module){
  if(module?.id!=='audience')return '';
  const x=module.extras||{};
  return `<section class="section audience-lab">
    <div class="section-head"><div><p class="eyebrow">Audience Lab</p><h2>Do segmento à evidência, sem estereótipos.</h2></div><p>Explore o exemplo por cinco lentes. A intenção é tornar o raciocínio de audiência consultável, não transformar personas em posters decorativos.</p></div>
    <div class="audience-tabs" role="tablist" aria-label="Lentes de Audience">
      ${[['segments','Segmentos'],['personas','Personas'],['jtbd','JTBD'],['journey','Jornada'],['evidence','Pesquisa']].map(([id,label],i)=>`<button type="button" class="audience-tab ${i===0?'active':''}" data-audience-view="${id}">${label}</button>`).join('')}
    </div>
    <div class="audience-panels">
      <div class="audience-panel active" data-audience-panel="segments"><div class="audience-card-grid">${(x.segments||[]).map(s=>`<article class="audience-card"><p class="mini-label">Segmento comportamental</p><h3>${esc(s.name)}</h3><dl><div><dt>Trigger</dt><dd>${esc(s.trigger)}</dd></div><div><dt>Job</dt><dd>${esc(s.job)}</dd></div><div><dt>Motivação</dt><dd>${esc(s.motivation)}</dd></div><div><dt>Barreira</dt><dd>${esc(s.barrier)}</dd></div><div><dt>Sinal</dt><dd>${esc(s.signal)}</dd></div></dl></article>`).join('')}</div></div>
      <div class="audience-panel" data-audience-panel="personas"><div class="audience-card-grid">${(x.personas||[]).map(p=>`<article class="audience-card persona-card"><p class="mini-label">Persona orientada a comportamento</p><h3>${esc(p.name)}</h3><p class="persona-job">${esc(p.job)}</p><div class="behavior-chips">${(p.behaviors||[]).map(b=>`<span>${esc(b)}</span>`).join('')}</div><dl><div><dt>Motivação</dt><dd>${esc(p.motivation)}</dd></div><div><dt>Barreira</dt><dd>${esc(p.barrier)}</dd></div><div><dt>Contexto</dt><dd>${esc(p.context)}</dd></div></dl></article>`).join('')}</div><div class="audience-note"><strong>Regra:</strong> persona sem vínculo com pesquisa é hipótese, não verdade. ${refLink('microsoft_personas')}</div></div>
      <div class="audience-panel" data-audience-panel="jtbd"><div class="forces"><article class="force push"><span>Push</span><p>${esc(x.jtbd?.push)}</p></article><article class="force pull"><span>Pull</span><p>${esc(x.jtbd?.pull)}</p></article><article class="force anxiety"><span>Anxiety</span><p>${esc(x.jtbd?.anxiety)}</p></article><article class="force habit"><span>Habit</span><p>${esc(x.jtbd?.habit)}</p></article><div class="progress"><small>Progress sought</small><strong>${esc(x.jtbd?.progress)}</strong></div></div><div class="audience-note">JTBD ajuda a investigar por que alguém muda agora, quais forças favorecem a troca e quais mantêm o status quo. ${refLink('intercom_motivations')}</div></div>
      <div class="audience-panel" data-audience-panel="journey"><div class="journey-track">${(x.journey||[]).map((j,i)=>`<article><span>${String(i+1).padStart(2,'0')}</span><h3>${esc(j.stage)}</h3><p>${esc(j.question)}</p><small>${esc(j.brand)}</small></article>`).join('')}</div><div class="audience-note">A jornada deve incluir o que acontece antes e depois dos canais da marca. ${refLink('gov_experience_map')}</div></div>
      <div class="audience-panel" data-audience-panel="evidence"><div class="research-grid"><div><p class="mini-label">Research protocol</p><h3>Checklist mínimo</h3>${(x.researchChecklist||[]).map(item=>`<label class="research-check"><input type="checkbox"/> <span>${esc(item)}</span></label>`).join('')}</div><div class="evidence-meter"><p class="mini-label">Confidence</p><h3>Classifique cada insight</h3><div><strong>Alta</strong><p>Múltiplas fontes convergentes + comportamento observado/dados.</p></div><div><strong>Média</strong><p>Padrão qualitativo consistente, ainda com lacunas de amostra.</p></div><div><strong>Baixa</strong><p>Hipótese, opinião interna ou sinal isolado. Precisa de pesquisa.</p></div></div></div><div class="audience-downloads"><a href="https://assets.publishing.service.gov.uk/media/586cd69440f0b60e4c00010b/ad-personas-march-2015.odt" target="_blank" rel="noreferrer">Baixar personas GDS (ODT) ↗</a><a href="https://www.microsoft.com/en-us/research/wp-content/uploads/2017/01/personas-practice-and-theory.pdf" target="_blank" rel="noreferrer">Baixar paper Microsoft Personas (PDF) ↗</a><a href="https://download.microsoft.com/download/b/0/d/b0d4bf87-09ce-4417-8f28-d60703d672ed/inclusive_toolkit_manual_final.pdf" target="_blank" rel="noreferrer">Baixar Microsoft Inclusive Design Toolkit (PDF) ↗</a></div></div>
    </div>
  </section>`;
}

export function bindAudienceExtras(root,module){
  if(module?.id!=='audience')return;
  const tabs=[...root.querySelectorAll('[data-audience-view]')],panels=[...root.querySelectorAll('[data-audience-panel]')];
  tabs.forEach(tab=>tab.addEventListener('click',()=>{const id=tab.dataset.audienceView;tabs.forEach(x=>x.classList.toggle('active',x===tab));panels.forEach(x=>x.classList.toggle('active',x.dataset.audiencePanel===id))}));
  const field=module.fields?.[Number(root.querySelector('[data-field].active')?.dataset.field)||0];
  if(field?.refs?.length){const detail=root.querySelector('.field-detail');if(detail){const refs=field.refs.map(refLink).filter(Boolean);if(refs.length)detail.insertAdjacentHTML('beforeend',`<footer class="field-sources"><strong>Referências deste item</strong><div>${refs.join('')}</div></footer>`)}}
}
