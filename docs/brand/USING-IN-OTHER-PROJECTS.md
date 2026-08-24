# Como usar o Brand Framework em outros projetos

## 1. Use este repositório como referência, não como tema

Mantenha a arquitetura do Brand Framework. Não copie logo, paleta, fontes, fotografia, ilustração ou motion da referência.

## 2. Leve estes arquivos ao contexto do novo projeto

Forneça ao agente/desenvolvedor:

- URL deste repositório;
- URL do Figma de referência;
- `docs/brand/MASTER-PROMPT.md`;
- `docs/brand/PAGE-SPEC.md`;
- o `MASTER.md` do grupo que será executado;
- o `.md` do módulo atual;
- fontes reais do projeto de destino: site, código, pesquisas, entrevistas, assets, apresentações e decisões aprovadas.

## 3. Ordem recomendada

Foundation → Language & Narrative → Visual Identity → Experience → AI & Governance.

Não force linearidade quando houver pesquisa paralela, mas respeite dependências. Ex.: não finalize Tone of Voice antes de Personality; não finalize visual sem Positioning/Audience; não finalize AI prompt antes de verbal/visual.

## 4. Execução de um módulo

Abra o `.md` do módulo. Ele é master: leia a fonte de verdade indicada, enumere todos os `fields` atuais e crie uma página para cada um. Use `PAGE-SPEC.md` como contrato. O master só termina quando todos os filhos forem revisados.

## 5. Evidência

Nunca transfira exemplos fictícios da referência como respostas da nova marca. Preserve apenas estrutura, perguntas e metodologia. Substitua conteúdo por fatos do projeto atual. Se não houver dados, sinalize hipótese/pendência.

## 6. Estrutura visual

No projeto consumidor, reproduza a mesma arquitetura macro da aplicação de referência. A marca do destino controla o acabamento visual e o motion.

## Prompt curto para outro projeto

```text
Implemente o Brand Framework deste projeto usando `docs/brand/MASTER-PROMPT.md` do repositório brand-and-design-system. Preserve a arquitetura da referência e substitua a identidade e o conteúdo pela marca atual. Execute grupo → módulo → todos os fields, usando PAGE-SPEC.md para cada página. Não pule filhos de masters e não invente evidências.
```