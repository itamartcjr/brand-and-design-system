# Brand & Design System

Este repositório é a referência estrutural reutilizável para **Brand Framework + Design System**. O objetivo é manter a mesma arquitetura de documentação entre marcas sem perder a identidade visual de cada projeto.

## Brand Framework

O Brand Framework contém 20 módulos, de Brand Core e Strategy até AI Brand Guidelines e Brand Governance. Cada item documentável prevê definição, objetivo, perguntas, exemplo, modelo, orientação editorial e, quando aplicável, evidências e referências.

## Design System

A implementação visual está em `src/design-system.html` e `src/design-system.js`. A estrutura principal — sidebar, posição da marca/identificação, busca, topbar, ações e área de conteúdo — é a referência estrutural para outros projetos.

A documentação executável está em [`docs/design-system/`](docs/design-system/README.md):

- `MASTER-PROMPT.md`: prompt principal para replicar a arquitetura em outro projeto;
- `USING-IN-OTHER-PROJECTS.md`: passo a passo de reutilização;
- uma página `MASTER.md` por grupo, capaz de executar todos os seus itens filhos;
- um `.md` para cada página do Design System, com especificação, checklist e prompt pronto para geração.

> Regra: **estrutura = este projeto de referência; identidade visual e motion = projeto de destino**. Os valores de tokens existentes no template são exemplos e nunca devem ser copiados cegamente.

## Desenvolvimento

```bash
npm run build
```

O build usa Node 22 e publica o projeto via GitHub Pages.

## Publicação

A branch `main` publica automaticamente via GitHub Actions em GitHub Pages.
