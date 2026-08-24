# Design System — documentação executável

Esta pasta é a fonte de verdade para reproduzir o Design System em outros projetos mantendo a **mesma arquitetura estrutural** do projeto de referência.

## Regra imutável

Replicar com fidelidade: sidebar, posição da marca/logo, busca, grupos do menu, topbar, breadcrumb/título, ações da barra superior, largura e relação entre navegação e conteúdo, comportamento sticky/fixed e responsividade estrutural.

Adaptar ao projeto de destino: logo real, fontes, cores, tokens, radius, bordas, sombras, ícones, componentes visuais, conteúdo, motion, easing, microinterações e direção de arte.

## Como ler

1. Comece por `MASTER-PROMPT.md`.
2. Em outro projeto, siga `USING-IN-OTHER-PROJECTS.md`.
3. Execute os `MASTER.md` dos grupos para gerar todas as páginas filhas.
4. Use o `.md` individual quando quiser gerar/revisar apenas uma página.

## Grupos e páginas

- `01-foundations`: Layout Grid, Sizes & Spacing, Typography, Colours, Icons, Effects.
- `02-identity`: Logo, Illustrations, Avatars.
- `03-actions-controls`: Buttons, Icon Buttons, Selection Controls, Slider, Tags.
- `04-navigation-forms`: Navigation, Tabs, Header Links, Forms.
- `05-content-feedback`: Cards, Tables, Modals & Popups, Banners & Messaging.

## Anatomia obrigatória de qualquer página

Toda página deve conter: título, descrição, para que serve, demonstração visual real, variações/estados quando aplicável, anatomia, comportamento responsivo, tokens/especificações técnicas, acessibilidade, Do/Don't quando relevante e referências.

A documentação deve ser predominantemente visual; tabelas e texto explicam o que a demonstração já torna perceptível.
