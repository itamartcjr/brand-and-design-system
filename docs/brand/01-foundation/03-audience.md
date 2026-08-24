# 03 — Audience

**Fonte de verdade:** `src/brand/modules/03-audience.js` e visualização `src/audience.js`.

## Objetivo

Documentar audiência por comportamento, contexto, jobs, motivações, barreiras, jornada e evidência — sem estereótipos decorativos.

## Filhos obrigatórios

A fonte de verdade deste módulo é compactada no código. **Todos os `fields` retornados pelo módulo em runtime são filhos obrigatórios e devem ser executados na ordem atual.** Não mantenha uma lista manual que possa divergir da fonte.

As lentes visuais atuais incluem Segmentos, Personas, JTBD, Jornada e Pesquisa/Evidência; use-as como sistema de validação, não como substituição dos fields.

## Como executar todos os filhos

Antes de preencher páginas, reúna entrevistas, dados de comportamento, CRM/suporte, pesquisas e contexto. Persona sem evidência deve aparecer como hipótese. JTBD precisa mostrar Push, Pull, Anxiety, Habit e progresso buscado. Jornada deve incluir antes/depois dos canais da marca. Cada insight deve receber nível de confiança.

## Prompt master do módulo

```text
Execute Audience completo. Importe/avalie o módulo real `src/brand/modules/03-audience.js`, enumere TODOS os fields retornados em runtime e gere uma página para cada um, na ordem. Não pule campos por a fonte estar compactada. Use PAGE-SPEC.md. Faça a documentação visual pelas lentes Segmentos, Personas, JTBD, Jornada e Pesquisa. Evite demografia vazia e personagens fictícios sem base. Para cada insight, registre evidência, fonte, data, contexto e confiança Alta/Média/Baixa. Mostre jobs, triggers, motivações, barreiras, sinais e linguagem real. Se faltar pesquisa, não invente: escreva protocolo, amostra, perguntas e estado pendente.
```