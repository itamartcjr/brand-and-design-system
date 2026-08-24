import { editorialTemplates, figmaOrder, crossCutting, esc, num, hero, refsFor, resourceCard, moduleResourceRefs } from './brand-ui.js';

const safe=v=>Array.isArray(v)?v:[];

export function overviewPage(data){
  const count=data.modules.reduce((n,m)=>n+(m.fields?.length||0),0);
  const resources=(data.frameworkRefs||[]);
  return `${hero('Um framework vivo para construir e preservar marcas.','Estratégia, personalidade, linguagem, identidade visual, experiência, IA e governança em uma arquitetura reutilizável. Nesta etapa, somente Brand — sem Design System ou componentes de produto.','Brand-only framework')}
  <section class="section"><div class="stats"><article class="stat"><strong>${data.modules.length}</strong><span>Módulos de Brand</span></article><article class="stat"><strong>${count}</strong><span>Itens documentáveis</span></article><article class="stat"><strong>${editorialTemplates.length}</strong><span>Templates editoriais</span></article><article class="stat"><strong>JSON + MD</strong><span>Exportação pronta para humanos e IA</span></article></div></section>
  <section class="section"><div class="section-head"><div><p class="eyebrow">Architecture</p><h2>20 módulos, uma única lógica editorial.</h2></div><p>Cada módulo começa pela visão geral e pelo raciocínio visual; depois mostra exemplos de resultado e aprofunda cada decisão em seções completas, encerrando com referências e arquivos oficiais.</p></div><div class="module-grid">${data.modules.map(m=>`<article class="module-card"><span>${num(m)} · ${esc(m.group||'Brand')}</span><h3>${esc(m.title)}</h3><p>${esc(m.summary||'')}</p><a href="#/module/${esc(m.id)}">Abrir módulo →</a></article>`).join('')}</div></section>
  <section class="section"><div class="section-head"><div><p class="eyebrow">Operating principles</p><h2>O Brand Book como sistema, não como decoração.</h2></div><p>Regras para o template sobreviver a novas marcas, equipes, canais e versões.</p></div><div class="principles">${[['01','Evidência antes de opinião','Estratégia registra fonte, método e confiança; hipótese não é apresentada como fato.'],['02','Exemplo + modelo vazio','Cada conceito mostra o que “bom” parece e oferece uma estrutura pronta para preencher.'],['03','Decisão em ação','Arquétipos, valores e atributos precisam mudar fala, visual, comportamento ou escolha real.'],['04','Governança explícita','Owner, status, versão, aprovação e changelog fazem parte da documentação.'],['05','IA como consumidor da marca','Guidelines também precisam ser legíveis por agentes e geradores, com prompts e restrições.']].map(x=>`<div class="principle"><span>${x[0]}</span><strong>${x[1]}</strong><p>${x[2]}</p></div>`).join('')}</div></section>
  <section class="section"><div class="section-head"><div><p class="eyebrow">Cross-cutting</p><h2>Camadas que atravessam todo o framework.</h2></div><p>Não precisam virar capítulos isolados, mas precisam aparecer nas decisões certas.</p></div><div class="cross-grid">${crossCutting.map(x=>`<article class="cross-card"><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join('')}</div></section>
  <section class="section"><div class="section-head"><div><p class="eyebrow">Editorial system</p><h2>Templates de página reutilizáveis.</h2></div><p>O conteúdo é padronizado; a expressão visual pode variar por marca sem perder a arquitetura editorial.</p></div><div class="editorial-grid">${editorialTemplates.map(x=>`<article><h3>${x}</h3><p>Frame-base para documentar ${x.toLowerCase()} com hierarquia e regras consistentes.</p></article>`).join('')}</div></section>
  <section class="section"><div class="section-head"><div><p class="eyebrow">Future Figma structure</p><h2>Ordem recomendada das páginas.</h2></div><p>Não altera o Figma agora; registra a arquitetura a implementar depois.</p></div><div class="principles">${figmaOrder.map((x,i)=>`<div class="principle"><span>${String(i).padStart(2,'0')}</span><strong>${esc(x.replace(/^\d+ — /,''))}</strong><p>${i===0?'Entrada e identificação da versão.':i===24?'Histórico de mudanças e decisões.':'Módulo editorial reutilizável do Brand Book.'}</p></div>`).join('')}</div></section>
  ${resources.length?`<section class="section overview-resources"><div class="section-head"><div><p class="eyebrow">Official resources</p><h2>Referências e downloads úteis.</h2></div><p>Links para fontes oficiais em vez de redistribuir arquivos sem licença ou procedência.</p></div><div class="resource-grid">${resources.map(resourceCard).join('')}</div></section>`:''}`;
}

export function fullFieldSection(field,index,module){
  const id=`section-${num(module)}-${String(index+1).padStart(2,'0')}`;
  const questions=(field.questions||['Pergunta de descoberta a definir.']);
  const example=field.example||'Exemplo a preencher.';
  const template=field.template||`${field.name}: [preencher]`;
  const presentation=field.presentation||'Definir composição visual adequada ao conteúdo e à personalidade da marca.';
  return `<section class="field-section" id="${id}" data-section-index="${index}">
    <header class="field-section-head">
      <div><span>${num(module)}.${String(index+1).padStart(2,'0')}</span><h2>${esc(field.name||'Item')}</h2></div>
      <button type="button" data-scroll-to="${id}" aria-label="Ir para ${esc(field.name||'item')}">#</button>
    </header>
    <div class="field-section-grid field-section-grid--intro">
      <article class="field-block"><p class="field-label">Definição</p><h3>O que é</h3><p>${esc(field.definition||'Definição a preencher.')}</p></article>
      <article class="field-block"><p class="field-label">Objetivo</p><h3>Por que documentar</h3><p>${esc(field.objective||'Objetivo a preencher.')}</p></article>
    </div>
    ${field.evidence?`<article class="field-block field-block--evidence"><p class="field-label">Evidence</p><h3>Evidência recomendada</h3><p>${esc(field.evidence)}</p></article>`:''}
    <article class="field-block field-block--questions"><p class="field-label">Discovery</p><h3>Perguntas que precisam ser respondidas</h3><div class="question-list">${questions.map(q=>`<div class="question">${esc(q)}</div>`).join('')}</div></article>
    <div class="field-section-grid">
      <article class="field-block"><p class="field-label">Example</p><h3>Exemplo preenchido</h3><div class="example">${esc(example)}</div><div class="detail-actions"><button class="button" type="button" data-copy-section="${index}" data-copy-kind="example">Copiar exemplo</button></div></article>
      <article class="field-block"><p class="field-label">Template</p><h3>Modelo para nova marca</h3><div class="template-box">${esc(template)}</div><div class="detail-actions"><button class="button primary" type="button" data-copy-section="${index}" data-copy-kind="template">Copiar modelo</button></div></article>
    </div>
    <article class="field-block field-block--presentation"><p class="field-label">Editorial direction</p><h3>Como apresentar</h3><div class="presentation-box">${esc(presentation)}</div><p class="field-note">A arquitetura editorial é fixa; a expressão visual pode variar para preservar a personalidade de cada marca.</p></article>
  </section>`;
}

export function fieldPanel(field,tab){
  if(tab==='objective')return `<h3>Por que documentar</h3><p>${esc(field.objective||'Objetivo a preencher.')}</p>`;
  if(tab==='questions')return `<h3>Perguntas que precisam ser respondidas</h3><div class="question-list">${(field.questions||['Pergunta de descoberta a definir.']).map(q=>`<div class="question">${esc(q)}</div>`).join('')}</div>`;
  if(tab==='example')return `<h3>Exemplo preenchido</h3><div class="example">${esc(field.example||'Exemplo a preencher.')}</div>`;
  if(tab==='template')return `<h3>Modelo para nova marca</h3><div class="template-box">${esc(field.template||`${field.name}: [preencher]`)}</div>`;
  if(tab==='presentation')return `<h3>Como apresentar editorialmente</h3><div class="presentation-box">${esc(field.presentation||'Definir composição visual adequada ao conteúdo e à personalidade da marca.')}</div>`;
  return `<h3>O que é</h3><p>${esc(field.definition||'Definição a preencher.')}</p>`;
}

export function moduleIntro(module){
  const fields=module.fields||[];
  return `${hero(`${num(module)} — ${module.title}`,module.summary||'',module.group||'Brand module')}
    <div class="module-meta"><span class="tag">${esc(module.status||'Active')}</span><span class="tag">${fields.length} seções</span><span class="tag">Brand only</span></div>
    ${module.why?`<section class="module-purpose"><p class="eyebrow">Para que serve esta parte</p><div><h2>O papel deste módulo na marca.</h2><p>${esc(module.why)}</p></div></section>`:''}
    <div class="hero-actions"><button class="button primary" data-download="json">Baixar JSON</button><button class="button" data-download="md">Baixar Markdown</button><button class="button" data-copy-module>Copiar modelo completo</button></div>`;
}

export function moduleVisualMap(module){
  const fields=module.fields||[];
  return `<section class="section module-visual-overview">
    <div class="section-head"><div><p class="eyebrow">Visual overview</p><h2>Mapa desta parte.</h2></div><p>Antes do conteúdo detalhado, veja a estrutura inteira do módulo. O mapa mostra as decisões que precisam existir e leva diretamente para cada seção.</p></div>
    <div class="module-flow-map" role="list">${fields.map((field,i)=>`<button class="module-flow-node" role="listitem" type="button" data-scroll-to="section-${num(module)}-${String(i+1).padStart(2,'0')}"><span>${String(i+1).padStart(2,'0')}</span><strong>${esc(field.name)}</strong></button>`).join('')}</div>
  </section>`;
}

function resultGrid(items,mapper){return `<div class="result-card-grid">${safe(items).map(mapper).join('')}</div>`}
function resultTable(columns,rows){return `<div class="result-table-wrap"><table class="result-table"><thead><tr>${safe(columns).map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${safe(rows).map(row=>`<tr>${safe(row).map(cell=>`<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
function metric(label,value){return `<div class="result-metric"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`}
function archetypeDetail(a,role,pct){if(!a)return'';return `<article class="result-archetype"><small>${esc(role)}${pct?` · ${esc(pct)}%`:''}</small><h3>${esc(a.name||a.brandName||'Arquétipo')}</h3><p>${esc(a.motive||'')}</p><dl><div><dt>Como pensa</dt><dd>${esc(a.think||'')}</dd></div><div><dt>Como fala</dt><dd>${esc(a.speak||'')}</dd></div><div><dt>Como age</dt><dd>${esc(a.behave||'')}</dd></div><div><dt>Visual</dt><dd>${esc(a.visual||'')}</dd></div><div><dt>Evita</dt><dd>${esc(a.avoid||'')}</dd></div></dl></article>`}

function audienceExampleViews(module){
  const x=module.extras||{};
  const segments=resultGrid(x.segments,s=>`<article class="result-card"><small>Segmento comportamental</small><h3>${esc(s.name)}</h3><dl><div><dt>Trigger</dt><dd>${esc(s.trigger)}</dd></div><div><dt>Job</dt><dd>${esc(s.job)}</dd></div><div><dt>Motivação</dt><dd>${esc(s.motivation)}</dd></div><div><dt>Barreira</dt><dd>${esc(s.barrier)}</dd></div><div><dt>Sinal</dt><dd>${esc(s.signal)}</dd></div></dl></article>`);
  const personas=resultGrid(x.personas,p=>`<article class="result-card"><small>Persona comportamental</small><h3>${esc(p.name)}</h3><p class="result-lead">${esc(p.job)}</p><div class="result-chip-row">${safe(p.behaviors).map(b=>`<span>${esc(b)}</span>`).join('')}</div><dl><div><dt>Motivação</dt><dd>${esc(p.motivation)}</dd></div><div><dt>Barreira</dt><dd>${esc(p.barrier)}</dd></div><div><dt>Contexto</dt><dd>${esc(p.context)}</dd></div></dl></article>`);
  const jtbd=`<div class="result-force-grid">${[['Push',x.jtbd?.push],['Pull',x.jtbd?.pull],['Anxiety',x.jtbd?.anxiety],['Habit',x.jtbd?.habit]].map(([k,v])=>`<article><small>${k}</small><p>${esc(v||'')}</p></article>`).join('')}</div><article class="result-highlight"><small>Progress sought</small><strong>${esc(x.jtbd?.progress||'')}</strong></article>`;
  const journey=resultTable(['Etapa','Pergunta da pessoa','Papel da marca'],safe(x.journey).map(j=>[j.stage,j.question,j.brand]));
  const research=`<div class="result-two-col"><article><small>Checklist mínimo de pesquisa</small><ul class="result-checklist">${safe(x.researchChecklist).map(i=>`<li>${esc(i)}</li>`).join('')}</ul></article><article><small>Nível de confiança</small><div class="result-confidence"><div><strong>Alta</strong><p>Múltiplas fontes convergentes e comportamento observado.</p></div><div><strong>Média</strong><p>Padrão qualitativo consistente, ainda com lacunas.</p></div><div><strong>Baixa</strong><p>Hipótese ou sinal isolado que ainda precisa ser pesquisado.</p></div></div></article></div>`;
  return [['segments','Segmentos',segments],['personas','Personas',personas],['jtbd','JTBD',jtbd],['journey','Jornada',journey],['research','Pesquisa',research]];
}

function personalityExampleViews(module){
  const x=module.extras||{},mix=x.baseMix||{},archetypes=safe(x.archetypes);
  const primary=archetypes.find(a=>a.brandName===mix.primary)||archetypes[0];
  const secondary=archetypes.find(a=>a.brandName===mix.secondary)||archetypes[1];
  const scales=`<div class="result-scale-list">${safe(x.scales).map(([left,right,value])=>`<div class="result-scale"><div><strong>${esc(left)}</strong><span>${esc(value)}/100</span><strong>${esc(right)}</strong></div><div class="result-scale-track"><i style="width:${Math.max(0,Math.min(100,Number(value)||0))}%"></i></div></div>`).join('')}</div>`;
  const archetype=`<div class="result-two-col">${archetypeDetail(primary,'Arquétipo principal',mix.primaryPct||70)}${archetypeDetail(secondary,'Arquétipo secundário',100-(mix.primaryPct||70))}</div>`;
  const guardrails=resultTable(['Somos','Não somos','Na prática'],safe(x.guardrails).map(r=>[r[0],r[1],r[2]||r[3]||'']));
  const contexts=resultTable(['Contexto','Traço que cresce','Guardrail','Direção'],safe(x.contexts));
  const application=`<article class="result-highlight"><small>Leitura aplicada</small><strong>${esc(primary?.name||'Primário')} ${mix.primaryPct||70}% + ${esc(secondary?.name||'Secundário')} ${100-(mix.primaryPct||70)}%</strong><p>O arquétipo principal domina decisões em caso de conflito; o secundário adiciona contraste sem inverter a identidade-base.</p></article><div class="result-two-col">${archetypeDetail(primary,'Como a marca deve se manifestar')}${archetypeDetail(secondary,'Contraste permitido')}</div>`;
  return [['scales','Escalas',scales],['archetypes','Arquétipos',archetype],['guardrails','Somos / Não somos',guardrails],['contexts','Contextos',contexts],['application','Aplicação',application]];
}

function verbalExampleViews(module){
  const x=module.extras||{};
  const tone=resultGrid(x.toneContexts,c=>`<article class="result-card result-tone-card"><small>${esc(c.name)}</small><h3>${esc(c.example||'Exemplo de tom')}</h3><div class="result-metrics">${metric('Formalidade',c.formality)}${metric('Proximidade',c.warmth)}${metric('Energia',c.energy)}${metric('Humor',c.humor)}${metric('Direção',c.directness)}</div></article>`);
  const matrix=resultTable(['Somos','Não somos','Na prática'],safe(x.matrix));
  const before=resultGrid(x.beforeAfter,i=>`<article class="result-card"><small>${esc(i.context)}</small><div class="result-before-after"><div><span>Antes</span><p>${esc(i.before)}</p></div><div><span>Depois</span><p>${esc(i.after)}</p></div></div><p class="result-note">${esc(i.why)}</p></article>`);
  const vocabulary=resultTable(['Preferimos','Evitar / substituir','Por quê'],safe(x.vocabulary));
  const ctas=resultGrid(x.ctas,r=>`<article class="result-card"><small>${esc(r[0])}</small><h3>${esc(r[1])}</h3><p>${esc(r[2])}</p><p class="result-note">${esc(r[3])}</p></article>`);
  const channels=resultTable(['Canal','Tom','Priorize','Evite'],safe(x.channels));
  return [['tone','Tone',tone],['matrix','Somos / Não somos',matrix],['before','Antes / Depois',before],['vocabulary','Vocabulário',vocabulary],['cta','CTA library',ctas],['channels','Canais',channels]];
}

function studioViewBody(view){
  const items=safe(view.items);
  switch(view.type){
    case 'steps': return `<div class="result-steps">${items.map((x,i)=>`<article><span>${String(i+1).padStart(2,'0')}</span><div><strong>${esc(x.title)}</strong><p>${esc(x.text||'')}</p></div></article>`).join('')}</div>`;
    case 'cards': return resultGrid(items,x=>`<article class="result-card"><h3>${esc(x.title)}</h3><p>${esc(x.text||x.note||x.use||'')}</p></article>`);
    case 'matrix': return resultTable(view.columns,view.rows);
    case 'checklist': return `<ul class="result-checklist result-checklist--columns">${items.map(x=>`<li>${esc(typeof x==='string'?x:x.title||x.text||'')}</li>`).join('')}</ul>`;
    case 'prompt': return `<div class="result-prompts">${items.map(x=>`<article><small>${esc(x.title)}</small><pre>${esc(x.text||'')}</pre></article>`).join('')}</div>`;
    case 'palette': return `<div class="result-palette">${items.map(x=>`<article><div class="result-swatch" style="background:${esc(x.hex||'#fff')}"></div><div><h3>${esc(x.title)}</h3><p>${esc(x.use||'')}</p><dl>${[['HEX',x.hex],['RGB',x.rgb],['CMYK',x.cmyk],['Pantone',x.pantone],['OKLCH',x.oklch]].map(([k,v])=>`<div><dt>${k}</dt><dd>${esc(v||'—')}</dd></div>`).join('')}</dl></div></article>`).join('')}</div>`;
    case 'decision': return `<div class="result-decision">${safe(view.questions).map((q,i)=>`<article><span>${String(i+1).padStart(2,'0')}</span><strong>${esc(q.label)}</strong><div><p><b>Se sim:</b> ${esc(q.yes||'')}</p><p><b>Se não:</b> ${esc(q.no||'')}</p></div></article>`).join('')}</div>`;
    default: return resultGrid(items,x=>`<article class="result-card"><h3>${esc(x.title||'Exemplo')}</h3><p>${esc(x.text||x.note||x.use||'')}</p></article>`);
  }
}

function studioExampleViews(module){
  const studio=module.extras?.studio;
  if(!studio?.views?.length)return [];
  return safe(studio.views).filter(v=>v.type!=='resources').map((view,i)=>[view.id||`view-${i}`,view.label||view.id||`Exemplo ${i+1}`,studioViewBody(view)]);
}

function exampleViews(module){
  if(module.id==='audience')return audienceExampleViews(module);
  if(module.id==='personality')return personalityExampleViews(module);
  if(module.id==='verbal-identity')return verbalExampleViews(module);
  return studioExampleViews(module);
}

export function moduleExampleShowcase(module){
  const views=exampleViews(module).filter(([,label,body])=>label&&body);
  if(!views.length)return '';
  return `<section class="section example-showcase">
    <div class="section-head"><div><p class="eyebrow">Example</p><h2>Exemplos de resultado.</h2></div><p>Esta área mostra como a documentação deve ficar quando estiver pronta. As tabs servem apenas para comparar variações de exemplo; não há ferramenta de configuração ou geração nesta página.</p></div>
    <div class="example-tabs" role="tablist" aria-label="Exemplos de ${esc(module.title)}">${views.map(([id,label],i)=>`<button class="example-tab ${i===0?'active':''}" type="button" role="tab" aria-selected="${i===0}" data-example-tab="${esc(id)}">${esc(label)}</button>`).join('')}</div>
    <div class="example-panels">${views.map(([id,,body],i)=>`<div class="example-panel ${i===0?'active':''}" role="tabpanel" data-example-panel="${esc(id)}">${body}</div>`).join('')}</div>
  </section>`;
}

export function moduleSections(module){
  const fields=module.fields||[];
  return `<div class="module-sections">${fields.map((field,index)=>fullFieldSection(field,index,module)).join('')}</div>
  ${module.extras?.questions?.length?`<section class="section decision-test"><div class="section-head"><div><p class="eyebrow">Decision test</p><h2>Perguntas de fechamento.</h2></div><p>Antes de aprovar, a documentação deve responder claramente a estas perguntas.</p></div><div class="question-list">${module.extras.questions.map(q=>`<div class="question">${esc(q)}</div>`).join('')}</div></section>`:''}`;
}

function compactReference(ref){
  return `<li class="compact-reference"><div><strong>${esc(ref.title||ref.label||ref.id||'Referência')}</strong>${ref.kind?`<span>${esc(ref.kind)}</span>`:''}</div>${ref.url?`<a href="${esc(ref.url)}" target="_blank" rel="noreferrer">Abrir ↗</a>`:''}</li>`;
}
function compactResource(resource){
  return `<li class="compact-reference"><div><strong>${esc(resource.title||'Arquivo / biblioteca')}</strong>${resource.kind?`<span>${esc(resource.kind)}</span>`:''}</div><a href="${esc(resource.url)}" target="_blank" rel="noreferrer">Abrir / baixar ↗</a></li>`;
}

export function moduleFooter(module,data){
  const resources=moduleResourceRefs(module,data);
  const resourceUrls=new Set(resources.map(item=>item?.url).filter(Boolean));
  const refs=refsFor(module,data).filter(item=>!item?.url||!resourceUrls.has(item.url));
  if(!refs.length&&!resources.length)return '';
  return `<footer class="module-footer">
    <div class="module-footer-grid">
      ${refs.length?`<section><p class="eyebrow">References</p><h2>Referências</h2><ul class="compact-reference-list">${refs.map(compactReference).join('')}</ul></section>`:''}
      ${resources.length?`<section><p class="eyebrow">Files & libraries</p><h2>Arquivos e bibliotecas</h2><ul class="compact-reference-list">${resources.map(compactResource).join('')}</ul></section>`:''}
    </div>
  </footer>`;
}
