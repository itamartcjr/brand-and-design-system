import { esc, num } from './brand-ui.js';

const safe=value=>Array.isArray(value)?value:[];

function pageLink(module,index,label,direction){
  if(index<0||index>=(module.fields?.length||0))return'<span></span>';
  const field=module.fields[index];
  return `<a class="item-page-nav-link ${direction}" href="#/module/${esc(module.id)}/${index}"><span>${direction==='prev'?'← Anterior':'Próximo →'}</span><strong>${num(module)}.${String(index+1).padStart(2,'0')} — ${esc(field.name)}</strong></a>`;
}

export function editorialFieldPage(module,index,visualGuide=''){
  const fields=safe(module?.fields);
  const field=fields[index];
  if(!field)return'';

  const sectionNumber=`${num(module)}.${String(index+1).padStart(2,'0')}`;
  const questions=safe(field.questions);
  const template=field.template||`${field.name}: [preencher]`;
  const presentation=field.presentation||'Apresente esta decisão com clareza, um exemplo real e o nível de especificação necessário para reproduzi-la.';

  return `<article class="brand-item-page" data-module="${esc(module.id)}" data-field-index="${index}">
    <header class="item-page-hero">
      <div class="item-page-module"><span>${num(module)}</span><strong>${esc(module.title)}</strong></div>
      <p class="item-page-number">${sectionNumber}</p>
      <h1>${esc(field.name||'Item')}</h1>
      <p class="item-page-lead">${esc(field.definition||'Definição a preencher.')}</p>
    </header>

    ${visualGuide||''}

    <section class="item-page-core">
      <div class="editorial-field-body">
        <div class="editorial-narrative">
          <p class="editorial-kicker">Por que importa</p>
          <p class="editorial-lead">${esc(field.objective||'Objetivo a preencher.')}</p>
          ${field.evidence?`<p class="editorial-evidence"><strong>Evidência recomendada:</strong> ${esc(field.evidence)}</p>`:''}
        </div>

        ${questions.length?`<aside class="editorial-questions"><p class="editorial-kicker">Perguntas-chave</p><ol>${questions.map(question=>`<li>${esc(question)}</li>`).join('')}</ol></aside>`:''}
      </div>

      <div class="editorial-example-row">
        <div>
          <p class="editorial-kicker">Exemplo aplicado</p>
          <p class="editorial-example-copy">${esc(field.example||'Exemplo a preencher.')}</p>
          <button class="text-action" type="button" data-copy-section="${index}" data-copy-kind="example">Copiar exemplo</button>
        </div>
        <div>
          <p class="editorial-kicker">Como deve aparecer</p>
          <p>${esc(presentation)}</p>
        </div>
      </div>

      <details class="editorial-template">
        <summary>Ver modelo para preencher</summary>
        <pre>${esc(template)}</pre>
        <button class="text-action" type="button" data-copy-section="${index}" data-copy-kind="template">Copiar modelo</button>
      </details>
    </section>

    <nav class="item-page-pagination" aria-label="Navegação entre itens do módulo">
      ${pageLink(module,index-1,'Anterior','prev')}
      ${pageLink(module,index+1,'Próximo','next')}
    </nav>
  </article>`;
}

export function editorialModuleSections(module){
  const fields=safe(module?.fields);
  return `<div class="editorial-module-sections">${fields.map((field,index)=>editorialFieldPage(module,index,'')).join('')}</div>`;
}
