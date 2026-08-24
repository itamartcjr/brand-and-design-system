import { editorialTemplates, figmaOrder, crossCutting, esc, num, hero, refsFor, refCard, resourceCard, moduleResourceRefs } from './brand-ui.js';

export function overviewPage(data){
  const count=data.modules.reduce((n,m)=>n+(m.fields?.length||0),0);
  const resources=(data.frameworkRefs||[]);
  return `${hero('Um framework vivo para construir e preservar marcas.','Estratégia, personalidade, linguagem, identidade visual, experiência, IA e governança em uma arquitetura reutilizável. Nesta etapa, somente Brand — sem Design System ou componentes de produto.','Brand-only framework')}
  <section class="section"><div class="stats"><article class="stat"><strong>${data.modules.length}</strong><span>Módulos de Brand</span></article><article class="stat"><strong>${count}</strong><span>Itens documentáveis</span></article><article class="stat"><strong>${editorialTemplates.length}</strong><span>Templates editoriais</span></article><article class="stat"><strong>JSON + MD</strong><span>Exportação pronta para humanos e IA</span></article></div></section>
  <section class="section"><div class="section-head"><div><p class="eyebrow">Architecture</p><h2>20 módulos, uma única lógica editorial.</h2></div><p>Cada módulo é uma página contínua. Cada item é uma seção completa com definição, objetivo, perguntas, exemplo, modelo vazio, apresentação e referências.</p></div><div class="module-grid">${data.modules.map(m=>`<article class="module-card"><span>${num(m)} · ${esc(m.group||'Brand')}</span><h3>${esc(m.title)}</h3><p>${esc(m.summary||'')}</p><a href="#/module/${esc(m.id)}">Abrir módulo →</a></article>`).join('')}</div></section>
  <section class="section"><div class="section-head"><div><p class="eyebrow">Operating principles</p><h2>O Brand Book como sistema, não como decoração.</h2></div><p>Regras para o template sobreviver a novas marcas, equipes, canais e versões.</p></div><div class="principles">${[['01','Evidência antes de opinião','Estratégia registra fonte, método e confiança; hipótese não é apresentada como fato.'],['02','Exemplo + modelo vazio','Cada conceito mostra o que “bom” parece e oferece uma estrutura pronta para preencher.'],['03','Decisão em ação','Arquétipos, valores e atributos precisam mudar fala, visual, comportamento ou escolha real.'],['04','Governança explícita','Owner, status, versão, aprovação e changelog fazem parte da documentação.'],['05','IA como consumidor da marca','Guidelines também precisam ser legíveis por agentes e geradores, com prompts e restrições.']].map(x=>`<div class="principle"><span>${x[0]}</span><strong>${x[1]}</strong><p>${x[2]}</p></div>`).join('')}</div></section>
  <section class="section"><div class="section-head"><div><p class="eyebrow">Cross-cutting</p><h2>Camadas que atravessam todo o framework.</h2></div><p>Não precisam virar capítulos isolados, mas precisam aparecer nas decisões certas.</p></div><div class="cross-grid">${crossCutting.map(x=>`<article class="cross-card"><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join('')}</div></section>
  <section class="section"><div class="section-head"><div><p class="eyebrow">Editorial system</p><h2>Templates de página reutilizáveis.</h2></div><p>O conteúdo é padronizado; a expressão visual pode variar por marca sem perder a arquitetura editorial.</p></div><div class="editorial-grid">${editorialTemplates.map(x=>`<article><h3>${x}</h3><p>Frame-base para documentar ${x.toLowerCase()} com hierarquia e regras consistentes.</p></article>`).join('')}</div></section>
  <section class="section"><div class="section-head"><div><p class="eyebrow">Future Figma structure</p><h2>Ordem recomendada das páginas.</h2></div><p>Não altera o Figma agora; registra a arquitetura a implementar depois.</p></div><div class="principles">${figmaOrder.map((x,i)=>`<div class="principle"><span>${String(i).padStart(2,'0')}</span><strong>${esc(x.replace(/^\d+ — /,''))}</strong><p>${i===0?'Entrada e identificação da versão.':i===24?'Histórico de mudanças e decisões.':'Módulo editorial reutilizável do Brand Book.'}</p></div>`).join('')}</div></section>
  ${resources.length?`<section class="section"><div class="section-head"><div><p class="eyebrow">Official resources</p><h2>Referências e downloads úteis.</h2></div><p>Links para fontes oficiais em vez de redistribuir arquivos sem licença ou procedência.</p></div><div class="resource-grid">${resources.map(resourceCard).join('')}</div></section>`:''}`;
}

function fieldReferenceLinks(field,module,data){
  const moduleRefs=refsFor(module,data);
  const raw=Array.isArray(field.refs)&&field.refs.length?field.refs:moduleRefs;
  const refs=raw.map(ref=>{
    if(!ref)return null;
    if(typeof ref==='string')return data.references?.[ref]||moduleRefs.find(item=>item?.id===ref||item?.key===ref)||null;
    return ref;
  }).filter(Boolean);
  if(!refs.length)return '';
  return `<div class="field-references"><strong>Referências aplicáveis</strong><div>${refs.map(ref=>ref.url?`<a href="${esc(ref.url)}" target="_blank" rel="noreferrer">${esc(ref.title||ref.name||'Referência')} ↗</a>`:`<span>${esc(ref.title||ref.name||'Referência')}</span>`).join('')}</div></div>`;
}

export function fullFieldSection(field,index,module,data){
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
      <article class="field-block">
        <p class="field-label">Definição</p>
        <h3>O que é</h3>
        <p>${esc(field.definition||'Definição a preencher.')}</p>
      </article>
      <article class="field-block">
        <p class="field-label">Objetivo</p>
        <h3>Por que documentar</h3>
        <p>${esc(field.objective||'Objetivo a preencher.')}</p>
      </article>
    </div>

    ${field.evidence?`<article class="field-block field-block--evidence"><p class="field-label">Evidence</p><h3>Evidência recomendada</h3><p>${esc(field.evidence)}</p></article>`:''}

    <article class="field-block field-block--questions">
      <p class="field-label">Discovery</p>
      <h3>Perguntas que precisam ser respondidas</h3>
      <div class="question-list">${questions.map(q=>`<div class="question">${esc(q)}</div>`).join('')}</div>
    </article>

    <div class="field-section-grid">
      <article class="field-block">
        <p class="field-label">Example</p>
        <h3>Exemplo preenchido</h3>
        <div class="example">${esc(example)}</div>
        <div class="detail-actions"><button class="button" type="button" data-copy-section="${index}" data-copy-kind="example">Copiar exemplo</button></div>
      </article>
      <article class="field-block">
        <p class="field-label">Template</p>
        <h3>Modelo para nova marca</h3>
        <div class="template-box">${esc(template)}</div>
        <div class="detail-actions"><button class="button primary" type="button" data-copy-section="${index}" data-copy-kind="template">Copiar modelo</button></div>
      </article>
    </div>

    <article class="field-block field-block--presentation">
      <p class="field-label">Editorial direction</p>
      <h3>Como apresentar</h3>
      <div class="presentation-box">${esc(presentation)}</div>
      <p class="field-note">A arquitetura editorial é fixa; a expressão visual pode variar para preservar a personalidade de cada marca.</p>
    </article>

    ${fieldReferenceLinks(field,module,data)}
  </section>`;
}

export function fieldPanel(field,tab,module,data){
  if(tab==='objective')return `<h3>Por que documentar</h3><p>${esc(field.objective||'Objetivo a preencher.')}</p>`;
  if(tab==='questions')return `<h3>Perguntas que precisam ser respondidas</h3><div class="question-list">${(field.questions||['Pergunta de descoberta a definir.']).map(q=>`<div class="question">${esc(q)}</div>`).join('')}</div>`;
  if(tab==='example')return `<h3>Exemplo preenchido</h3><div class="example">${esc(field.example||'Exemplo a preencher.')}</div>`;
  if(tab==='template')return `<h3>Modelo para nova marca</h3><div class="template-box">${esc(field.template||`${field.name}: [preencher]`)}</div>`;
  if(tab==='presentation')return `<h3>Como apresentar editorialmente</h3><div class="presentation-box">${esc(field.presentation||'Definir composição visual adequada ao conteúdo e à personalidade da marca.')}</div>`;
  return `<h3>O que é</h3><p>${esc(field.definition||'Definição a preencher.')}</p>`;
}

export function modulePage(module,data){
  const fields=module.fields||[];
  const refs=refsFor(module,data);
  const resources=moduleResourceRefs(module,data);
  const indexLinks=fields.map((field,i)=>`<button type="button" data-scroll-to="section-${num(module)}-${String(i+1).padStart(2,'0')}"><span>${String(i+1).padStart(2,'0')}</span>${esc(field.name)}</button>`).join('');
  return `${hero(`${num(module)} — ${module.title}`,module.summary||'',module.group||'Brand module')}
  <div class="module-meta"><span class="tag">${esc(module.status||'Active')}</span><span class="tag">${fields.length} seções</span><span class="tag">Brand only</span></div>
  <div class="hero-actions"><button class="button primary" data-download="json">Baixar JSON</button><button class="button" data-download="md">Baixar Markdown</button><button class="button" data-copy-module>Copiar modelo completo</button></div>
  ${module.why?`<div class="why"><strong>Por que existe</strong><p>${esc(module.why)}</p></div>`:''}

  <section class="section module-index">
    <div class="section-head"><div><p class="eyebrow">Nesta página</p><h2>${fields.length} seções completas.</h2></div><p>Todos os itens aparecem integralmente na página. Use os atalhos apenas para navegar; não há conteúdo escondido em menus ou abas.</p></div>
    <nav class="section-index" aria-label="Seções de ${esc(module.title)}">${indexLinks}</nav>
  </section>

  <div class="module-sections">${fields.map((field,index)=>fullFieldSection(field,index,module,data)).join('')}</div>

  ${module.extras?.questions?.length?`<section class="section"><div class="section-head"><div><p class="eyebrow">Decision test</p><h2>Perguntas de fechamento.</h2></div><p>Antes de aprovar, a documentação deve responder claramente a estas perguntas.</p></div><div class="question-list">${module.extras.questions.map(q=>`<div class="question">${esc(q)}</div>`).join('')}</div></section>`:''}
  <section class="section"><div class="section-head"><div><p class="eyebrow">References</p><h2>Referências usadas neste módulo.</h2></div><p>Fontes públicas, oficiais ou metodologias reconhecidas. Respeite licenças antes de reutilizar ativos.</p></div><div class="reference-list">${refs.length?refs.map(refCard).join(''):'<p class="lead">Nenhuma referência cadastrada ainda.</p>'}</div></section>
  ${resources.length?`<section class="section"><div class="section-head"><div><p class="eyebrow">Resources & downloads</p><h2>Arquivos e bibliotecas oficiais.</h2></div><p>Fontes, guidelines, assets e kits diretamente de seus mantenedores.</p></div><div class="resource-grid">${resources.map(resourceCard).join('')}</div></section>`:''}`;
}
