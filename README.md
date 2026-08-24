# Brand & Design System

Este repositório é a referência estrutural reutilizável para **Brand Framework + Design System**. O objetivo é manter a mesma arquitetura de documentação entre marcas sem perder a identidade visual de cada projeto.

## Brand Framework

O Brand Framework contém 20 módulos, de Brand Core e Strategy até AI Brand Guidelines e Brand Governance. Cada item documentável prevê definição, objetivo, perguntas, exemplo, modelo, orientação editorial e, quando aplicável, evidências e referências.

A documentação executável está em [`docs/brand/`](docs/brand/README.md):

- `MASTER-PROMPT.md`: executa o Brand Framework completo mantendo a arquitetura da referência;
- `PAGE-SPEC.md`: contrato obrigatório para cada página/item interno;
- `USING-IN-OTHER-PROJECTS.md`: passo a passo para reutilizar o Brand em outra marca;
- um `MASTER.md` por grupo;
- um `.md` por módulo, tratado como master de segundo nível e responsável por executar **todos os fields/itens internos**.

> No Brand, masters nunca substituem seus filhos. O framework só é concluído quando todos os itens internos foram executados ou estão explicitamente marcados como pendentes/N/A com método e responsável.

## Design System

A implementação visual está em `src/design-system.html` e `src/design-system.js`. A estrutura principal — sidebar, posição da marca/identificação, busca, topbar, ações e área de conteúdo — é a referência estrutural para outros projetos.

A documentação executável está em [`docs/design-system/`](docs/design-system/README.md):

- `MASTER-PROMPT.md`: prompt principal para replicar a arquitetura em outro projeto;
- `USING-IN-OTHER-PROJECTS.md`: passo a passo de reutilização;
- uma página `MASTER.md` por grupo, capaz de executar todos os seus itens filhos;
- um `.md` para cada página do Design System, com especificação, checklist e prompt pronto para geração.

> Regra geral: **estrutura = este projeto de referência; identidade visual e motion = projeto de destino**. Exemplos, valores e conteúdos da referência não devem ser copiados como decisões finais de outra marca.

## Desenvolvimento

```bash
npm run build
```

O build usa Node 22 e publica o projeto via GitHub Pages.

## Publicação

A branch `main` publica automaticamente via GitHub Actions em GitHub Pages.
