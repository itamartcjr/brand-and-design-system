# Brand & Design System

Template reutilizável para documentação de Brand Book + Design System, com exemplos específicos para Brand, App e Web.

## Rodar localmente

```bash
npm start
```

Abra `http://localhost:4173`.

## Build

```bash
npm run build
```

O site é gerado em `dist/` e publicado no GitHub Pages pelo workflow `.github/workflows/pages.yml`.

## Princípios

- Um padrão estrutural; decisões visuais específicas para cada marca.
- Referências oficiais registradas em cada página.
- Foundations viram tokens; componentes consomem tokens.
- Brand, App e Web compartilham essência, mas não precisam compartilhar a mesma implementação.
- Pantone só é documentado quando existe uma referência oficial da marca; nunca deve ser estimado automaticamente.
