# Como usar em outros projetos

## Objetivo

Usar este repositório como **framework estrutural** e o projeto de destino como **fonte da identidade visual e do motion**.

## Passo a passo

1. Dê ao agente acesso ao projeto de destino e informe a branch correta.
2. Forneça como referência este repositório e o Figma oficial.
3. Peça para ler `docs/design-system/MASTER-PROMPT.md` antes de alterar código.
4. O agente deve auditar primeiro o projeto de destino: fontes, cores, tokens, componentes, responsividade e motion já existentes.
5. Replique a shell da referência sem reinterpretar sidebar, logo/identificação, menu, topbar ou localização das ações.
6. Execute os cinco `MASTER.md` em ordem. Cada master deve abrir e executar todos os `.md` filhos.
7. Para manutenção pontual, execute apenas o `.md` da página desejada.
8. Rode build/lint/testes do projeto de destino e compare Desktop, Tablet e Mobile.

## Prompt curto para iniciar outro projeto

```text
Use https://github.com/itamartcjr/brand-and-design-system como referência estrutural obrigatória. Leia docs/design-system/MASTER-PROMPT.md e docs/design-system/USING-IN-OTHER-PROJECTS.md. Preserve exatamente a arquitetura de sidebar, posição da marca/logo, busca, menu, topbar, ações, conteúdo e responsividade estrutural. Adapte somente identidade visual e motion usando os padrões reais deste projeto. Depois execute todos os MASTER.md e seus filhos. Não pule páginas e não copie tokens de exemplo como valores finais.
```

## Regras para automação/agentes

- Nunca inventar uma nova navegação quando a referência já define uma.
- Nunca mover o logo ou ações da topbar por preferência estética.
- Nunca copiar fonte, cor ou motion da referência se o projeto de destino já possui identidade própria.
- Nunca considerar um master concluído enquanto existir filho não executado.
- Sempre documentar tokens pelo nome semântico e mostrar o valor efetivo do projeto.
- Toda nova página deve ser explicável pelo sistema; toda repetição relevante deve virar padrão antes de virar exceção permanente.
