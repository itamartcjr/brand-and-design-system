# 19 — AI Brand Guidelines

**Fonte de verdade:** `src/brand/modules/catalog.js` (`ai-guidelines`).

## Filhos obrigatórios

Brand System Prompt; Writing Prompt; Tone Prompt; Image Generation Prompt; Photography Prompt; Campaign Prompt; Social Prompt; Forbidden Styles; Forbidden Language; Brand Vocabulary; Negative Prompts; Examples; Evaluation Checklist; Versionamento de prompts.

## Como executar todos os filhos

IA deve receber decisões do Brand Framework, não substituí-las. Cada prompt precisa declarar objetivo, entradas, restrições, formato de saída, exemplos e critérios de avaliação. Teste com casos positivos e negativos e registre versão.

## Prompt master do módulo

```text
Execute AI Brand Guidelines inteira, uma página por field. Antes de escrever prompts, carregue as decisões aprovadas de Core, Strategy, Personality, Verbal e Visual. Gere Brand System Prompt como fonte comum e derive Writing, Tone, Image Generation, Photography, Campaign e Social sem duplicar ou contradizer regras. Documente Forbidden Styles/Language, Brand Vocabulary e Negative Prompts. Em Examples, mostre saídas aprovadas/reprovadas com justificativa. Crie Evaluation Checklist objetivo e versionamento de prompts com data, owner, dependências e changelog. Nunca use IA para preencher silenciosamente uma decisão de marca ausente.
```