# Especificação obrigatória de cada página de Brand

Toda página interna de Brand — cada `field` de um módulo — deve seguir esta anatomia.

## Conteúdo obrigatório

1. **Título** — nome exato do item.
2. **Descrição / definição** — o que é e o que não é.
3. **Para que serve** — decisão que o item deve orientar.
4. **Perguntas de construção** — perguntas que precisam ser respondidas antes de aprovar.
5. **Evidência** — fonte, pesquisa, dado, entrevista, asset ou decisão oficial; se não houver, indicar hipótese.
6. **Decisão da marca** — resposta final específica para o projeto atual.
7. **Exemplo real** — aplicação concreta da decisão.
8. **Contraexemplo / não fazer** — quando aplicável.
9. **Como executar** — processo para preencher, revisar e aprovar o item.
10. **Modelo reutilizável** — estrutura vazia ou checklist.
11. **Apresentação visual** — transformar a decisão em diagramas, matrizes, comparações, mapas, frames, exemplos ou assets; evitar parede de texto.
12. **Dependências** — itens anteriores que sustentam esta decisão.
13. **Referências** — fontes externas e internas.
14. **Status e governança** — owner, versão, data e estado quando relevante.

## Hierarquia visual obrigatória

Título → descrição → para que serve → demonstração visual → decisão/evidência → como executar → modelo → informações operacionais → referências.

## Prompt-base de página

```text
Gere a página [ITEM] do módulo [MÓDULO] dentro do Brand Framework deste projeto. Preserve exatamente a shell estrutural da referência: sidebar, posição da marca, busca, hierarquia de menu, topbar, funções, breadcrumb e área de conteúdo. Não copie a identidade visual da referência; aplique a identidade real desta marca.

Antes de escrever, audite os dados disponíveis no projeto e diferencie fato, decisão aprovada, evidência e hipótese. A página deve conter: título, definição, para que serve, perguntas de construção, evidências/fontes, decisão específica da marca, exemplo real, contraexemplo quando útil, processo de execução, modelo reutilizável, dependências e referências.

A página precisa ser visual. Converta o conteúdo em uma composição adequada ao tema: matriz, canvas, timeline, mapa, cards comparativos, before/after, decision tree, specimen, storyboard, diagrama, exemplos de aplicação ou outro recurso visual pertinente. Não use Lorem Ipsum e não invente pesquisa. Se faltar informação, marque claramente como pendente e explique como obtê-la.
```

## Critério de aceite

Uma pessoa nova no projeto deve entender o que foi decidido, por que, em qual evidência se apoia, como aplicar e como revisar a decisão sem depender do autor original.