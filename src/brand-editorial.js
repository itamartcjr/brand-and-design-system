import { esc, num } from './brand-ui.js';

const safe = value => Array.isArray(value) ? value : [];

function fieldSection(field, index, module) {
  const sectionNumber = `${num(module)}.${String(index + 1).padStart(2, '0')}`;
  const id = `section-${num(module)}-${String(index + 1).padStart(2, '0')}`;
  const questions = safe(field.questions);
  const template = field.template || `${field.name}: [preencher]`;
  const presentation = field.presentation || 'Apresente esta decisão com clareza, um exemplo real e o nível de especificação necessário para reproduzi-la.';

  return `<section class="editorial-field" id="${id}" data-section-index="${index}">
    <header class="editorial-field-head">
      <div><span>${sectionNumber}</span><h2>${esc(field.name || 'Item')}</h2></div>
      <button type="button" class="section-anchor" data-scroll-to="${id}" aria-label="Ir para ${esc(field.name || 'item')}">#</button>
    </header>

    <div class="editorial-field-body">
      <div class="editorial-narrative">
        <p class="editorial-kicker">O que é e por que importa</p>
        <p class="editorial-lead">${esc(field.definition || 'Definição a preencher.')}</p>
        <p>${esc(field.objective || 'Objetivo a preencher.')}</p>
        ${field.evidence ? `<p class="editorial-evidence"><strong>Evidência recomendada:</strong> ${esc(field.evidence)}</p>` : ''}
      </div>

      ${questions.length ? `<aside class="editorial-questions"><p class="editorial-kicker">Perguntas-chave</p><ol>${questions.map(question => `<li>${esc(question)}</li>`).join('')}</ol></aside>` : ''}
    </div>

    <div class="editorial-example-row">
      <div>
        <p class="editorial-kicker">Exemplo aplicado</p>
        <p class="editorial-example-copy">${esc(field.example || 'Exemplo a preencher.')}</p>
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
  </section>`;
}

export function editorialModuleSections(module) {
  const fields = safe(module?.fields);
  return `<div class="editorial-module-sections">${fields.map((field, index) => fieldSection(field, index, module)).join('')}</div>
  ${safe(module?.extras?.questions).length ? `<section class="editorial-decision-test"><div><p class="editorial-kicker">Antes de aprovar</p><h2>Perguntas de fechamento</h2></div><ol>${module.extras.questions.map(question => `<li>${esc(question)}</li>`).join('')}</ol></section>` : ''}`;
}
