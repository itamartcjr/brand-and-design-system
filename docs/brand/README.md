# Brand Framework — documentação executável

Esta pasta transforma o Brand Framework em uma especificação reutilizável para outros projetos.

## Regra central

A arquitetura estrutural da documentação vem deste projeto de referência. Preserve sidebar, posição da marca, busca, hierarquia grupo → módulo → item, topbar, funções, breadcrumbs, navegação e área de conteúdo. A identidade visual, tipografia, cores, imagens, motion e acabamento devem vir da marca do projeto de destino.

## Hierarquia

1. `MASTER-PROMPT.md` — executa o Brand Framework completo.
2. `PAGE-SPEC.md` — anatomia obrigatória de toda página/item.
3. `USING-IN-OTHER-PROJECTS.md` — como aplicar em outro repositório.
4. `01-foundation/MASTER.md` — módulos 01–04.
5. `02-language-narrative/MASTER.md` — módulos 05–07.
6. `03-visual-identity/MASTER.md` — módulos 08–15.
7. `04-experience/MASTER.md` — módulos 16–18.
8. `05-ai-governance/MASTER.md` — módulos 19–20.

Cada arquivo de módulo é um **master de segundo nível**. Ele não representa uma página-resumo: deve executar todos os `fields` do módulo, na ordem da fonte de verdade, criando/documentando cada item como página própria.

## Fonte de verdade

- Shell Brand: `src/index.html`, `src/app.js` e CSS relacionados.
- Conteúdo: `src/brand/modules/`.
- Módulos 04–20: catálogo em `src/brand/modules/catalog.js`.
- Figma: https://www.figma.com/design/99947Dmc328mSa2FmYj5fP/Brand-e-Design-System?node-id=0-1&t=XyywlRgk12fIPGlo-1

Nunca invente conteúdo estratégico como se fosse fato. Quando não houver evidência, marque como hipótese, pendência ou campo a validar.