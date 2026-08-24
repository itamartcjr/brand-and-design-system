# Brand & Design System

Nesta etapa o projeto publica exclusivamente o **Brand Framework**: um padrão reutilizável para construção, documentação, aplicação, IA e governança de marcas. A arquitetura de Design System será retomada separadamente.

## Brand Framework

O site contém 20 módulos:

1. Brand Core
2. Brand Strategy
3. Audience
4. Brand Personality
5. Verbal Identity
6. Messaging System
7. Brand Storytelling
8. Visual Brand Identity
9. Typography
10. Photography Direction
11. Illustration
12. Iconography
13. Graphic Language
14. Layout Principles
15. Motion Identity
16. Sonic Identity
17. Brand Experience
18. Brand in Action
19. AI Brand Guidelines
20. Brand Governance

Cada item documentável prevê definição, objetivo, perguntas, exemplo preenchido, modelo vazio, orientação editorial e, quando aplicável, evidências, referências e recursos oficiais.

## Interações

- navegação Brand-only e busca;
- módulos consultados item por item, sem páginas infinitas;
- tabs de definição, objetivo, perguntas, exemplo, modelo e apresentação;
- cópia de modelos;
- download por módulo em JSON e Markdown;
- exportação do framework em JSON para automações e IA;
- links para guidelines, fontes, assets e recursos oficiais;
- modo claro/escuro e navegação mobile.

## Desenvolvimento

```bash
npm run build
```

O build usa Node 22, valida o pacote dos 20 módulos e gera `dist/brand-data.json` antes da publicação no GitHub Pages.

## Publicação

A branch `main` publica automaticamente via GitHub Actions em GitHub Pages.
