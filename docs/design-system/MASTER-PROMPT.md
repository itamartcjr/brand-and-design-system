# Master Prompt — gerar o Design System completo

Use este prompt no projeto de destino.

```text
Você deve construir o Design System deste projeto usando como referência estrutural obrigatória o repositório https://github.com/itamartcjr/brand-and-design-system e o Figma https://www.figma.com/design/99947Dmc328mSa2FmYj5fP/Brand-e-Design-System?node-id=0-1&t=XyywlRgk12fIPGlo-1.

NÃO trate a referência como inspiração. Replique a arquitetura da aplicação com fidelidade: posição do logo/identificação no topo da sidebar, largura e comportamento da sidebar, busca, hierarquia e agrupamento do menu, topbar, breadcrumb/título, funções e posição das ações da topbar, relação sidebar + topbar + conteúdo, scroll, estados sticky/fixed, navegação mobile e estrutura responsiva.

O que pode mudar é apenas a identidade do projeto de destino: logo real, tipografia, cores, tokens, radius, borders, shadows, iconografia, conteúdo, componentes visuais, animações, easing, transições e microinterações. Não redesenhe a arquitetura.

Antes de implementar, audite o projeto atual e extraia seus padrões reais. Não copie os valores de exemplo do template. Converta padrões repetidos em primitive tokens, semantic tokens e component tokens.

Leia docs/design-system/README.md e execute, na ordem, TODOS os masters:
1. docs/design-system/01-foundations/MASTER.md
2. docs/design-system/02-identity/MASTER.md
3. docs/design-system/03-actions-controls/MASTER.md
4. docs/design-system/04-navigation-forms/MASTER.md
5. docs/design-system/05-content-feedback/MASTER.md

Um master significa executar todos os arquivos filhos daquele grupo, não criar apenas uma página-resumo.

Para cada página, preserve a shell estrutural da referência e entregue: título; descrição; para que serve; demonstração visual real; anatomia; variações; tamanhos; estados; comportamento responsivo; tokens e valores técnicos; acessibilidade; Do/Don't quando aplicável; referências; exemplos dentro da interface real.

Valide Desktop, Tablet e Mobile. Valide teclado, focus-visible, contraste, reduced motion quando pertinente e ausência de valores mágicos evitáveis.

Critério final: comparando os dois projetos lado a lado, a arquitetura deve ser imediatamente reconhecida como a mesma família estrutural; comparando cores, tipografia, acabamento e motion, deve ser evidente que são marcas diferentes.
```
