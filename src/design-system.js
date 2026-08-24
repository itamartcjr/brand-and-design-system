const FIGMA='https://www.figma.com/design/99947Dmc328mSa2FmYj5fP/Brand-e-Design-System?node-id=0-1&t=XyywlRgk12fIPGlo-1';
const refs={
  figma:{title:'Figma — Brand & Design System',note:'Fonte visual do projeto e ponto de comparação dos componentes.',url:FIGMA},
  wcag:{title:'WCAG 2.2',note:'Critérios de acessibilidade para conteúdo e componentes digitais.',url:'https://www.w3.org/TR/WCAG22/'},
  aria:{title:'WAI-ARIA Authoring Practices',note:'Padrões de comportamento, teclado, estados e semântica.',url:'https://www.w3.org/WAI/ARIA/apg/'},
  material:{title:'Material Design 3',note:'Referência complementar para componentes, tokens e comportamento.',url:'https://m3.material.io/'},
  apple:{title:'Apple Human Interface Guidelines',note:'Referência complementar para padrões de interface e interação.',url:'https://developer.apple.com/design/human-interface-guidelines/'},
  css:{title:'CSS Design Tokens / Web Platform',note:'Referência técnica para implementação de layout, cores, tipografia e responsividade.',url:'https://developer.mozilla.org/en-US/docs/Web/CSS'}
};

const groups=[
  ['Foundations',['grid','spacing','typography','colors','icons','effects']],
  ['Identity',['logo','illustrations','avatars']],
  ['Actions & Controls',['buttons','icon-buttons','selects-controls','slider','tags']],
  ['Navigation & Forms',['navigation','tabs','header-links','forms']],
  ['Content & Feedback',['cards','tables','modals-popups','banners-messaging']]
];

const commonRefs=['figma','wcag','aria'];
const projectNote='Os valores abaixo são exemplos do template. Cada marca e produto deve definir seus próprios tokens, medidas, estilos, comportamentos e variações sem alterar a estrutura de documentação.';
const t=(token,value,usage)=>({token,value,usage});

const pages=[
  {
    id:'grid',title:'Layout Grid',description:'Sistema estrutural para organizar, alinhar e dimensionar interfaces em diferentes tamanhos de tela.',
    purpose:'Cria consistência espacial entre páginas e componentes. A documentação sempre exibe Desktop, Tablet e Mobile com viewport, colunas, margens, gutters, largura de conteúdo e largura de coluna.',
    kind:'grid',refs:['figma','css'],tech:[
      t('grid.desktop.viewport','1440px','Viewport de referência'),t('grid.desktop.columns','12','Colunas'),t('grid.desktop.margin','80px','Margem lateral'),t('grid.desktop.gutter','24px','Espaço entre colunas'),
      t('grid.tablet.viewport','768px','Viewport de referência'),t('grid.tablet.columns','8','Colunas'),t('grid.tablet.margin','32px','Margem lateral'),t('grid.tablet.gutter','24px','Espaço entre colunas'),
      t('grid.mobile.viewport','390px','Viewport de referência'),t('grid.mobile.columns','4','Colunas'),t('grid.mobile.margin','16px','Margem lateral'),t('grid.mobile.gutter','16px','Espaço entre colunas')
    ]
  },
  {
    id:'spacing',title:'Sizes & Spacing',description:'Escala de medidas para padding, gap, dimensões, ritmo vertical e composição de componentes.',
    purpose:'Evita valores arbitrários e mantém ritmo visual. A escala é mostrada como tokens, barras proporcionais e aplicações reais em cards, botões e agrupamentos.',
    kind:'spacing',refs:['figma','css'],tech:[4,8,12,16,24,32,40,48,64,80,96].map((v,i)=>t(`space.${[1,2,3,4,6,8,10,12,16,20,24][i]}`,`${v}px`,'Escala base de espaçamento'))
  },
  {
    id:'typography',title:'Typography',description:'Famílias, pesos, tamanhos, line-height, tracking e escala responsiva usados na interface.',
    purpose:'Define hierarquia, legibilidade e consistência editorial. Mostramos a fonte, pesos, estilos e exemplos reais para Desktop, Tablet e Mobile quando houver mudança responsiva.',
    kind:'typography',refs:['figma','wcag','css'],tech:[
      t('type.display','64 / 68 · 700','Títulos de alto impacto'),t('type.h1','48 / 56 · 700','Heading 1 desktop'),t('type.h2','36 / 44 · 700','Heading 2'),t('type.h3','28 / 36 · 650','Heading 3'),
      t('type.body.lg','18 / 28 · 400','Texto de apoio'),t('type.body','16 / 24 · 400','Corpo padrão'),t('type.body.sm','14 / 20 · 400','Texto secundário'),t('type.caption','12 / 16 · 500','Metadados e captions')
    ]
  },
  {
    id:'colors',title:'Colours',description:'Paletas de marca, neutros e cores semânticas organizadas por tokens de uso.',
    purpose:'Separa valor visual de intenção. Além da escala cromática, o sistema documenta tokens semânticos como texto, fundo, borda, ação, sucesso, alerta e erro.',
    kind:'colors',refs:['figma','wcag','css'],tech:[
      t('color.action.primary','#536DFE','Ações primárias'),t('color.action.hover','#3D55E8','Hover de ação'),t('color.text.primary','#20242B','Texto principal'),t('color.text.secondary','#68717D','Texto secundário'),
      t('color.background.canvas','#F3F4F6','Canvas'),t('color.border.default','#DDE1E7','Bordas'),t('color.success','#22A06B','Feedback positivo'),t('color.error','#E24B4A','Feedback de erro')
    ]
  },
  {
    id:'icons',title:'Icons',description:'Biblioteca de ícones com tamanhos, stroke, bounding box e regras de aplicação.',
    purpose:'Padroniza leitura e ação visual. A página mostra a biblioteca em escala real, tamanhos permitidos e exemplos de ícones dentro de controles.',
    kind:'icons',refs:['figma','material','apple'],tech:[
      t('icon.xs','12px','Microações e status'),t('icon.sm','16px','Controles compactos'),t('icon.md','24px','Padrão de interface'),t('icon.lg','48px','Destaque e empty state'),t('icon.xl','56px','Ilustrações funcionais'),t('icon.stroke','1.5px','Stroke padrão do conjunto')
    ]
  },
  {
    id:'effects',title:'Effects',description:'Sombras, elevação, blur, overlays e raios de borda aplicados aos componentes.',
    purpose:'Comunica profundidade, agrupamento e hierarquia sem depender apenas de cor. As variações são apresentadas lado a lado com valores técnicos.',
    kind:'effects',refs:['figma','css'],tech:[
      t('shadow.1','0 4 12 rgba(15,23,42,.10)','Cards e popups'),t('shadow.2','0 16 40 rgba(15,23,42,.14)','Modais e elementos elevados'),t('radius.input','8px','Inputs e controles'),t('radius.card','20px','Cards e painéis'),t('overlay.default','rgba(15,23,42,.44)','Backdrop de modal')
    ]
  },
  {
    id:'logo',title:'Logo',description:'Assinaturas, símbolo, área de proteção, fundos permitidos e tamanhos mínimos.',
    purpose:'Protege reconhecimento e consistência da marca. Sempre mostramos versões claras e escuras, wordmark, mark, área de proteção e exemplos de uso correto.',
    kind:'logo',refs:['figma'],tech:[t('logo.clearspace','1× altura do símbolo','Área de proteção mínima'),t('logo.min.digital','24px','Altura mínima digital'),t('logo.light','brand-dark.svg','Aplicação em fundo claro'),t('logo.dark','brand-light.svg','Aplicação em fundo escuro')]
  },
  {
    id:'illustrations',title:'Illustrations',description:'Linguagem visual para ilustrações funcionais, empty states e conteúdos de apoio.',
    purpose:'Mantém coerência entre ilustração e interface. A documentação reúne estilo, peso visual, cor, proporção, tamanhos e exemplos de aplicação.',
    kind:'illustrations',refs:['figma'],tech:[t('illustration.sm','64px','Estados compactos'),t('illustration.md','120px','Cards e empty states'),t('illustration.lg','240px','Áreas editoriais'),t('illustration.stroke','2px','Espessura de traço de referência')]
  },
  {
    id:'avatars',title:'Avatars',description:'Representação de pessoas, perfis, organizações e fallback quando não há imagem.',
    purpose:'Padroniza identidade em listas, cards e áreas de perfil. Exibimos tamanhos, imagem, iniciais, fallback e status.',
    kind:'avatars',refs:['figma','wcag'],tech:[t('avatar.sm','32px','Listas compactas'),t('avatar.md','40px','Padrão de interface'),t('avatar.lg','48px','Cards'),t('avatar.xl','64px','Perfil e destaque'),t('avatar.status','12px','Indicador de presença')]
  },
  {
    id:'buttons',title:'Buttons',description:'Ações primárias, secundárias e terciárias com tamanhos e estados completos.',
    purpose:'Organiza a hierarquia de ação da interface. Cada variação é mostrada em Default, Hover, Pressed, Focus, Disabled e Loading, além de opções com ícone.',
    kind:'buttons',refs:commonRefs,tech:[t('button.height.sm','32px','Small'),t('button.height.md','40px','Medium'),t('button.height.lg','48px','Large'),t('button.padding.x','16px','Padding horizontal'),t('button.gap','8px','Gap ícone/texto'),t('button.radius','8px','Border radius'),t('button.transition','160ms ease','Mudança entre estados')]
  },
  {
    id:'icon-buttons',title:'Icon Buttons',description:'Ações compactas representadas apenas por ícones, com forma, tamanho e estados definidos.',
    purpose:'Economiza espaço mantendo reconhecimento e acessibilidade. A documentação inclui tooltip/label acessível, tamanho mínimo de alvo e todos os estados.',
    kind:'icon-buttons',refs:commonRefs,tech:[t('iconButton.sm','32px','Ações compactas'),t('iconButton.md','40px','Padrão'),t('iconButton.lg','48px','Alvo ampliado'),t('iconButton.icon','20px','Ícone padrão'),t('iconButton.radius','999px','Formato circular')]
  },
  {
    id:'selects-controls',title:'Selection Controls',description:'Checkbox, radio e toggle com estados, tamanhos e comportamento de seleção.',
    purpose:'Documenta escolhas binárias e seleção única/múltipla sem ambiguidade. Todos os estados visuais e regras de interação aparecem no mesmo lugar.',
    kind:'selects-controls',refs:commonRefs,tech:[t('control.size.sm','16px','Compacto'),t('control.size.md','20px','Padrão'),t('control.focus','2px accent','Focus ring'),t('toggle.width','40px','Toggle médio'),t('toggle.height','24px','Toggle médio')]
  },
  {
    id:'slider',title:'Slider',description:'Controle de valor simples ou intervalo, com track, thumb, estados e marcações.',
    purpose:'Permite ajustar valores contínuos ou faixas. A página demonstra single value, range, disabled, focus e apresentação de valor.',
    kind:'slider',refs:commonRefs,tech:[t('slider.track','4px','Altura do track'),t('slider.thumb','20px','Thumb'),t('slider.hitArea','44px','Área mínima interativa'),t('slider.focus','2px accent','Focus ring')]
  },
  {
    id:'tags',title:'Tags',description:'Rótulos compactos para status, filtros, categorias e itens removíveis.',
    purpose:'Ajuda a classificar e representar estados sem sobrecarregar o conteúdo. Exibimos variantes neutra, brand, success, warning e error, além de dismiss e estados interativos.',
    kind:'tags',refs:['figma','wcag'],tech:[t('tag.height','28px','Altura padrão'),t('tag.padding.x','10px','Padding horizontal'),t('tag.gap','6px','Gap interno'),t('tag.radius','999px','Pill shape')]
  },
  {
    id:'navigation',title:'Navigation',description:'Padrões de navegação principal para Desktop, Tablet e Mobile.',
    purpose:'Define como pessoas se orientam e mudam de área no produto. A página mostra composição completa, itens ativos, CTA, menu mobile e comportamento responsivo.',
    kind:'navigation',refs:commonRefs,tech:[t('nav.desktop.height','64px','Header desktop'),t('nav.mobile.height','56px','Header mobile'),t('nav.item.gap','24px','Espaço entre links'),t('nav.breakpoint','768px','Troca para navegação mobile')]
  },
  {
    id:'tabs',title:'Tabs',description:'Navegação local entre conjuntos de conteúdo relacionados, com estados completos.',
    purpose:'Organiza conteúdo paralelo sem trocar de contexto. Exibimos default, hover, active, focus e disabled, além de comportamento de overflow.',
    kind:'tabs',refs:commonRefs,tech:[t('tabs.height','40px','Altura'),t('tabs.gap','4px','Gap entre itens'),t('tabs.indicator','2px','Indicador ativo'),t('tabs.transition','160ms ease','Mudança de estado')]
  },
  {
    id:'header-links',title:'Header Links',description:'Links de navegação e ações textuais usados em headers, menus e barras de contexto.',
    purpose:'Padroniza affordance e feedback de navegação textual. Todos os estados são visíveis e a diferença entre link padrão, ativo e desabilitado fica explícita.',
    kind:'header-links',refs:commonRefs,tech:[t('link.height','36px','Alvo vertical'),t('link.gap','8px','Gap opcional com ícone'),t('link.underline','1px','Indicador de hover/active'),t('link.focus','2px accent','Focus ring')]
  },
  {
    id:'forms',title:'Forms',description:'Inputs, search, password, textarea e select com estados de interação e validação.',
    purpose:'Centraliza comportamento de entrada de dados. Cada campo mostra default, hover, focus, typing, filled, error, success, disabled, placeholder, ícone e helper text quando aplicável.',
    kind:'forms',refs:commonRefs,tech:[t('field.height','40px','Input padrão'),t('field.padding.x','12px','Padding horizontal'),t('field.radius','8px','Border radius'),t('field.border','1px','Borda padrão'),t('field.focus','2px accent','Focus ring'),t('field.message','12 / 16','Helper e erro')]
  },
  {
    id:'cards',title:'Cards',description:'Contêineres de conteúdo com anatomia, variações, ações e comportamento responsivo.',
    purpose:'Agrupa informações relacionadas e define hierarquia de leitura. A página mostra card básico, interativo, com mídia, com ação, estados e anatomia.',
    kind:'cards',refs:['figma','wcag'],tech:[t('card.padding','24px','Padding padrão'),t('card.gap','16px','Gap interno'),t('card.radius','20px','Border radius'),t('card.border','1px neutral','Borda'),t('card.shadow','shadow.1','Elevação opcional')]
  },
  {
    id:'tables',title:'Tables',description:'Estrutura para dados tabulares com header, linhas, células, seleção, sorting e responsividade.',
    purpose:'Mantém leitura e comparação de dados consistentes. Mostramos átomos de header/cell, tabela completa, estados de row e estratégia para telas pequenas.',
    kind:'tables',refs:commonRefs,tech:[t('table.row.height','48px','Linha padrão'),t('table.header.height','44px','Cabeçalho'),t('table.cell.padding','12px 16px','Padding de célula'),t('table.border','1px neutral','Separadores')]
  },
  {
    id:'modals-popups',title:'Modals & Popups',description:'Superfícies temporárias para decisões, edição, confirmação e informações contextuais.',
    purpose:'Define elevação, entrada/saída, foco, dismiss e hierarquia de ações. Modal e popup aparecem em contexto real, incluindo overlay e animações esperadas.',
    kind:'modals-popups',refs:commonRefs,tech:[t('modal.width.sm','400px','Modal pequeno'),t('modal.width.md','560px','Modal médio'),t('modal.radius','20px','Border radius'),t('modal.overlay','44% black','Backdrop'),t('modal.motion','300ms ease','Entrada e saída')]
  },
  {
    id:'banners-messaging',title:'Banners & Messaging',description:'Mensagens persistentes ou temporárias de neutralidade, informação, sucesso, alerta e erro.',
    purpose:'Comunica feedback de sistema de forma consistente e acessível. A página mostra semântica, ícone, ação/dismiss e prioridade visual para cada tipo.',
    kind:'banners-messaging',refs:commonRefs,tech:[t('banner.minHeight','48px','Altura mínima'),t('banner.padding','12px 16px','Padding'),t('banner.gap','10px','Gap interno'),t('banner.radius','8px','Border radius'),t('banner.icon','20px','Ícone semântico')]
  }
];

const byId=id=>pages.find(page=>page.id===id);
const esc=(value='')=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const route=()=>{const id=location.hash.replace(/^#\//,'')||'overview';return id==='overview'?{type:'overview'}:{type:'page',id}};
const app=document.getElementById('app'),nav=document.getElementById('nav'),pageTitle=document.getElementById('pageTitle'),navSearch=document.getElementById('navSearch'),themeButton=document.getElementById('themeButton'),menuButton=document.getElementById('menuButton'),drawerClose=document.getElementById('drawerClose'),sidebar=document.getElementById('dsSidebar'),backdrop=document.getElementById('dsBackdrop');
const mobile=window.matchMedia('(max-width:780px)');

function setDrawer(open,restore=false){document.body.classList.toggle('nav-open',open&&mobile.matches);menuButton.setAttribute('aria-expanded',String(open&&mobile.matches));sidebar.setAttribute('aria-hidden',String(mobile.matches&&!open));if('inert'in sidebar)sidebar.inert=mobile.matches&&!open;if(!open&&restore)menuButton.focus()}

function renderNav(filter=''){
  const current=route(),term=filter.trim().toLowerCase();
  const match=page=>!term||`${page.title} ${page.description} ${page.purpose}`.toLowerCase().includes(term);
  nav.innerHTML=`<div class="ds-nav-group"><div class="ds-nav-title">Start</div><a class="ds-nav-link ${current.type==='overview'?'active':''}" href="#/overview"><span>00</span><strong>Overview</strong></a></div>`+
    groups.map(([label,ids])=>{const items=ids.map(byId).filter(Boolean).filter(match);if(!items.length)return'';return`<div class="ds-nav-group"><div class="ds-nav-title">${esc(label)}</div>${items.map((page,index)=>`<a class="ds-nav-link ${current.type==='page'&&current.id===page.id?'active':''}" href="#/${page.id}"><span>${String(pages.indexOf(page)+1).padStart(2,'0')}</span><strong>${esc(page.title)}</strong></a>`).join('')}</div>`}).join('');
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>mobile.matches&&setDrawer(false)));
}

const section=(eyebrow,title,description,content,extra='')=>`<section class="doc-section ${extra}"><div class="doc-section-head"><p class="section-kicker">${esc(eyebrow)}</p><h2>${esc(title)}</h2>${description?`<p>${esc(description)}</p>`:''}</div>${content}</section>`;
const projectCallout=()=>`<aside class="project-note"><div class="project-note-mark">↗</div><div><strong>Definição por projeto</strong><p>${esc(projectNote)}</p></div></aside>`;

function gridDemo(){
  const devices=[
    {name:'Desktop',viewport:'1440px',columns:12,margin:'80px',gutter:'24px',content:'1280px',column:'86.7px',cls:'desktop'},
    {name:'Tablet',viewport:'768px',columns:8,margin:'32px',gutter:'24px',content:'704px',column:'67px',cls:'tablet'},
    {name:'Mobile',viewport:'390px',columns:4,margin:'16px',gutter:'16px',content:'358px',column:'77.5px',cls:'mobile'}
  ];
  return `<div class="grid-demo">${devices.map(d=>`<article class="device-card"><div class="device-head"><div><strong>${d.name}</strong><span>${d.viewport}</span></div><span class="device-pill">${d.columns} colunas</span></div><div class="device-frame ${d.cls}" style="--cols:${d.columns}">${Array.from({length:d.columns},()=>'<i></i>').join('')}</div><dl class="metric-row"><div><dt>Viewport</dt><dd>${d.viewport}</dd></div><div><dt>Columns</dt><dd>${d.columns}</dd></div><div><dt>Margin</dt><dd>${d.margin}</dd></div><div><dt>Gutter</dt><dd>${d.gutter}</dd></div><div><dt>Content</dt><dd>${d.content}</dd></div><div><dt>Column</dt><dd>${d.column}</dd></div></dl></article>`).join('')}</div>`;
}

function spacingDemo(){const values=[4,8,12,16,24,32,40,48,64,80,96];return `<div class="spacing-layout"><div class="spacing-scale">${values.map((v,i)=>`<div class="spacing-row"><code>space.${[1,2,3,4,6,8,10,12,16,20,24][i]}</code><strong>${v}px</strong><span style="--space:${Math.max(v,8)}px"></span></div>`).join('')}</div><div class="application-grid"><article class="spacing-card-demo"><small>Card padding</small><div class="padding-box"><span>24px</span><b>Conteúdo</b></div></article><article class="spacing-card-demo"><small>Button</small><button class="sample-button primary">16px&nbsp;&nbsp;Label&nbsp;&nbsp;16px</button></article><article class="spacing-card-demo"><small>Gap</small><div class="gap-demo"><span>Card</span><i>24px</i><span>Card</span></div></article></div></div>`}

function typographyDemo(){return `<div class="type-demo"><div class="font-card"><div class="font-aa">Aa</div><div><small>UI typeface</small><h3>Inter</h3><p>Regular · Medium · Semibold · Bold</p></div></div><div class="type-breakpoints"><article><small>Desktop</small><div class="type-sample display">Display</div><div class="type-sample h1">Heading 1</div><div class="type-sample h2">Heading 2</div><div class="type-sample h3">Heading 3</div><div class="type-sample body">Body — The quick brown fox jumps over the lazy dog.</div><div class="type-sample caption">Caption / metadata</div></article><article><small>Tablet</small><div class="type-sample tablet-h1">Heading 1</div><div class="type-sample tablet-h2">Heading 2</div><div class="type-sample body">Body — Responsive scale</div></article><article><small>Mobile</small><div class="type-sample mobile-h1">Heading 1</div><div class="type-sample mobile-h2">Heading 2</div><div class="type-sample body">Body — Compact scale</div></article></div></div>`}

function colorsDemo(){const scales=[['Primary',['#07164B','#12267A','#253DA7','#3651CF','#536DFE','#6E84FF','#91A0FF','#B4BFFF','#DDE3FF']],['Neutral',['#20242B','#343A43','#515963','#747E89','#A4ADB7','#C5CCD4','#DCE1E6','#EBEEF1','#F5F6F8']],['Secondary',['#3A2100','#714300','#A96700','#D98600','#FF9800','#FFB347','#FFCB78','#FFE0AD','#FFF2DE']]];return `<div class="color-demo">${scales.map(([name,colors])=>`<div class="color-group"><strong>${name}</strong><div class="swatch-row">${colors.map((color,i)=>`<div><span style="background:${color}"></span><small>${900-i*100}</small><code>${color}</code></div>`).join('')}</div></div>`).join('')}<div class="semantic-row"><div class="semantic success"><b>Success</b><span>#22A06B</span></div><div class="semantic info"><b>Info</b><span>#536DFE</span></div><div class="semantic warning"><b>Warning</b><span>#F59E0B</span></div><div class="semantic error"><b>Error</b><span>#E24B4A</span></div></div></div>`}

function iconsDemo(){const icons=['⌂','≡','☷','⌕','⊙','◉','✎','▣','◫','⚙','♙','♧','□','…','◎','○','☆','⌁','＋','×','⌄','✓','→','◇','⇧','≋','↗'];return `<div class="icon-demo"><div class="icon-sizes"><div><small>Extra small · 12px</small><span class="icon-box xs">×</span></div><div><small>Small · 16px</small><span class="icon-box sm">⌂</span></div><div><small>Medium · 24px</small><span class="icon-box md">⌂</span></div><div><small>Large · 48px</small><span class="icon-box lg">☼</span></div><div><small>Extra large · 56px</small><span class="icon-box xl">▢</span></div></div><div class="icon-library">${icons.map(icon=>`<span class="icon-box md">${icon}</span>`).join('')}</div></div>`}

function effectsDemo(){return `<div class="effects-demo"><div class="effect-row"><article class="shadow-demo shadow-1"><span>Shadow 1</span></article><article class="shadow-demo shadow-2"><span>Shadow 2</span></article><article class="shadow-demo overlay-demo"><span>Overlay</span></article></div><div class="effect-row"><article class="radius-demo r8"><span>8px<br><small>Inputs</small></span></article><article class="radius-demo r12"><span>12px<br><small>Controls</small></span></article><article class="radius-demo r20"><span>20px<br><small>Cards</small></span></article><article class="radius-demo pill"><span>999px<br><small>Pills</small></span></article></div></div>`}

function logoDemo(){return `<div class="logo-demo"><div class="logo-rules"><article class="logo-surface light"><div class="wordmark"><b>pixelmatters</b><span>×</span></div><small>Version 1 · light background</small></article><article class="logo-surface dark"><div class="wordmark"><b>pixelmatters</b><span>×</span></div><small>Version 2 · dark background</small></article></div><div class="clearspace-demo"><div class="clear-label top">1×</div><div class="clear-label side">1×</div><div class="logo-safe"><div class="wordmark"><b>pixelmatters</b><span>×</span></div></div><small>Área de proteção</small></div></div>`}

function illustrationsDemo(){return `<div class="illustration-demo"><article><small>Empty state · Delete</small><div class="trash-illustration"><span></span><i></i><i></i><i></i></div></article><article><small>Empty state · Work</small><div class="case-illustration"><span></span><b></b></div></article><article class="illustration-context"><small>Application</small><div class="empty-state"><div class="case-illustration small"><span></span><b></b></div><strong>Nenhum projeto ainda</strong><p>Crie seu primeiro projeto para começar.</p><button class="sample-button primary">Criar projeto</button></div></article></div>`}

function avatarDemo(){return `<div class="avatar-demo"><div class="avatar-row"><div><span class="avatar a32">IT</span><small>32px</small></div><div><span class="avatar a40">TC</span><small>40px</small></div><div><span class="avatar a48">BR<i></i></span><small>48px + status</small></div><div><span class="avatar a64">DS</span><small>64px</small></div></div><div class="avatar-row variants"><div><span class="avatar photo">A</span><small>Imagem</small></div><div><span class="avatar initials">AB</span><small>Iniciais</small></div><div><span class="avatar fallback">◇</span><small>Fallback</small></div><div><span class="avatar org">AC</span><small>Organização</small></div></div></div>`}

const buttonStates=['Default','Hover','Pressed','Focus','Disabled','Loading'];
function buttonSet(cls,size){return `<div class="state-row">${buttonStates.map(state=>`<div><button class="sample-button ${cls} ${size} state-${state.toLowerCase()}">${state==='Loading'?'<i class="spinner"></i>':''}${state}</button><small>${state}</small></div>`).join('')}</div>`}
function buttonsDemo(){return `<div class="component-demo"><div class="variant-block"><strong>Primary</strong>${buttonSet('primary','md')}</div><div class="variant-block"><strong>Secondary</strong>${buttonSet('secondary','md')}</div><div class="variant-block"><strong>Tertiary</strong>${buttonSet('tertiary','md')}</div><div class="sizes-row"><button class="sample-button primary sm">Small</button><button class="sample-button primary md">Medium</button><button class="sample-button primary lg">Large</button><button class="sample-button primary md">＋ With icon</button></div><div class="anatomy"><span>leading icon</span><span>label</span><span>trailing icon</span><div>＋&nbsp;&nbsp;Button label&nbsp;&nbsp;→</div></div></div>`}

function iconButtonsDemo(){return `<div class="component-demo"><div class="state-row icon-state-row">${['Default','Hover','Pressed','Focus','Disabled'].map((state,i)=>`<div><button aria-label="Editar" class="sample-icon-button state-${state.toLowerCase()}">${['✎','✎','✎','✎','✎'][i]}</button><small>${state}</small></div>`).join('')}</div><div class="sizes-row"><button class="sample-icon-button sm">＋</button><button class="sample-icon-button md">＋</button><button class="sample-icon-button lg">＋</button></div></div>`}

function controlsDemo(){return `<div class="controls-demo"><article><strong>Checkbox</strong><div class="control-line"><span class="check"></span> Default</div><div class="control-line"><span class="check checked">✓</span> Checked</div><div class="control-line"><span class="check indeterminate">−</span> Indeterminate</div><div class="control-line disabled"><span class="check checked">✓</span> Disabled</div></article><article><strong>Radio</strong><div class="control-line"><span class="radio"></span> Default</div><div class="control-line"><span class="radio selected"></span> Selected</div><div class="control-line focus"><span class="radio selected"></span> Focus</div><div class="control-line disabled"><span class="radio"></span> Disabled</div></article><article><strong>Toggle</strong><div class="control-line"><span class="toggle"></span> Off</div><div class="control-line"><span class="toggle on"></span> On</div><div class="control-line focus"><span class="toggle on"></span> Focus</div><div class="control-line disabled"><span class="toggle"></span> Disabled</div></article></div>`}

function sliderDemo(){return `<div class="slider-demo"><article><strong>Single value</strong><small>42</small><div class="fake-slider"><span style="width:42%"></span><i style="left:42%"></i></div></article><article><strong>Range</strong><small>20 — 82</small><div class="fake-slider range"><span style="left:20%;width:62%"></span><i style="left:20%"></i><i style="left:82%"></i></div></article><article class="disabled"><strong>Disabled</strong><small>65</small><div class="fake-slider"><span style="width:65%"></span><i style="left:65%"></i></div></article></div>`}

function tagsDemo(){return `<div class="tag-demo">${['neutral','brand','success','warning','error'].map(type=>`<div class="tag-line"><span class="sample-tag ${type}">Default</span><span class="sample-tag ${type} hover">Hover</span><span class="sample-tag ${type} focus">Focus</span><span class="sample-tag ${type}">Label ×</span><span class="sample-tag ${type} disabled">Disabled</span></div>`).join('')}</div>`}

function navigationDemo(){return `<div class="navigation-demo"><article><small>Desktop</small><div class="nav-sample"><strong>LOGO</strong><nav><a>Work</a><a class="active">Culture</a><a>Careers</a><a>Blog</a><button class="sample-button primary sm">Get in touch</button></nav></div></article><article><small>Tablet</small><div class="nav-sample tablet"><strong>LOGO</strong><nav><a>Work</a><a>Culture</a><a>Blog</a><button class="sample-icon-button sm">≡</button></nav></div></article><article><small>Mobile</small><div class="nav-sample mobile"><strong>LOGO</strong><button class="sample-icon-button sm">≡</button></div></article></div>`}

function tabsDemo(){return `<div class="tabs-demo"><div class="sample-tabs"><button>Default</button><button class="hover">Hover</button><button class="active">Active</button><button class="focus">Focus</button><button disabled>Disabled</button></div><div class="sample-tabs underline"><button>Overview</button><button class="active">Analytics</button><button>Settings</button><button>Members</button></div></div>`}

function headerLinksDemo(){return `<div class="header-links-demo"><a>Default</a><a class="hover">Hover</a><a class="active">Active</a><a class="focus">Focus</a><a class="disabled">Disabled</a><a class="icon-link">Docs ↗</a></div>`}

function formsDemo(){return `<div class="forms-demo"><article><strong>Input states</strong><label><small>Default</small><input value="Default" readonly></label><label><small>With icon</small><div class="input-icon">⌕<input value="Search" readonly></div></label><label><small>Focus</small><input class="focus" value="Typing…" readonly></label><label><small>Error</small><input class="error" value="Invalid value" readonly><em class="error-text">Revise este campo.</em></label><label><small>Disabled</small><input value="Disabled" disabled></label></article><article><strong>Select & textarea</strong><label><small>Select</small><div class="fake-select">Default <span>⌄</span></div></label><label><small>Textarea</small><textarea readonly>Escreva uma mensagem com mais contexto.</textarea></label><label><small>Password</small><div class="input-icon"><input value="••••••••" readonly><span>◉</span></div></label></article></div>`}

function cardsDemo(){return `<div class="cards-demo"><article class="sample-card"><div class="card-icon">×</div><div><strong>Title</strong><p>Subtitle</p><small>Caption</small></div></article><article class="sample-card interactive"><div class="card-icon brand">↗</div><div><strong>Interactive card</strong><p>Hover and focus state</p><small>View details →</small></div></article><article class="sample-card media"><div class="card-media"></div><div><strong>Card with media</strong><p>Subtitle and supporting copy for a richer card layout.</p><button class="sample-button secondary sm">Action</button></div></article></div>`}

function tablesDemo(){return `<div class="table-demo"><table><thead><tr><th>Column 1</th><th>Column 2 ↕</th><th>Column 3</th><th>Status</th></tr></thead><tbody><tr><td>Cell text</td><td>Cell text</td><td>Cell text</td><td><span class="sample-tag success">Active</span></td></tr><tr class="hover"><td>Hover row</td><td>Cell text</td><td>Cell text</td><td><span class="sample-tag neutral">Draft</span></td></tr><tr class="selected"><td>Selected row</td><td>Cell text</td><td>Cell text</td><td><span class="sample-tag brand">Review</span></td></tr><tr><td>Cell text</td><td>Cell text</td><td>Cell text</td><td><span class="sample-tag error">Error</span></td></tr></tbody></table></div>`}

function modalsDemo(){return `<div class="modal-demo"><div class="modal-stage"><div class="fake-modal"><div class="modal-title"><strong>Title</strong><button>×</button></div><input value="Placeholder" readonly><div class="modal-actions"><button class="sample-button tertiary sm">Cancel</button><button class="sample-button primary sm">Save</button></div></div></div><div class="popup-stack"><div class="fake-popup"><span class="popup-icon">▣</span><div><strong>Title</strong><small>Subtitle</small></div><button>×</button></div><div class="fake-popup success"><span class="popup-icon">✓</span><div><strong>Saved</strong><small>Your changes are live.</small></div><button>×</button></div></div></div>`}

function bannersDemo(){return `<div class="banner-demo"><div class="sample-banner neutral"><span>ⓘ</span><p>This is a neutral message providing user feedback.</p><button>×</button></div><div class="sample-banner info"><span>ⓘ</span><p>This is an informational message.</p><button>×</button></div><div class="sample-banner success"><span>✓</span><p>This is a success message.</p><button>×</button></div><div class="sample-banner warning"><span>△</span><p>This is a warning message.</p><button>×</button></div><div class="sample-banner error"><span>!</span><p>This is an error message.</p><button>×</button></div></div>`}

function demo(page){const map={grid:gridDemo,spacing:spacingDemo,typography:typographyDemo,colors:colorsDemo,icons:iconsDemo,effects:effectsDemo,logo:logoDemo,illustrations:illustrationsDemo,avatars:avatarDemo,buttons:buttonsDemo,'icon-buttons':iconButtonsDemo,'selects-controls':controlsDemo,slider:sliderDemo,tags:tagsDemo,navigation:navigationDemo,tabs:tabsDemo,'header-links':headerLinksDemo,forms:formsDemo,cards:cardsDemo,tables:tablesDemo,'modals-popups':modalsDemo,'banners-messaging':bannersDemo};return (map[page.kind]||(()=>'<div class="placeholder-demo">Visual em construção</div>'))()}

function technicalTable(page){return `<div class="technical-table"><div class="tech-head"><span>Token / propriedade</span><span>Valor</span><span>Uso</span></div>${page.tech.map(row=>`<div class="tech-row"><code>${esc(row.token)}</code><strong>${esc(row.value)}</strong><span>${esc(row.usage)}</span></div>`).join('')}</div>`}
function referenceCards(page){const list=[...new Set([...(page.refs||[]),'figma'])].map(id=>refs[id]).filter(Boolean);return `<div class="reference-grid">${list.map(ref=>`<a class="reference-card" href="${esc(ref.url)}" target="_blank" rel="noreferrer"><div><small>Referência</small><strong>${esc(ref.title)}</strong><p>${esc(ref.note)}</p></div><span>↗</span></a>`).join('')}</div>`}

function pageView(page){return `<header class="doc-hero"><p class="doc-eyebrow">Design System / ${esc(groups.find(([,ids])=>ids.includes(page.id))?.[0]||'Documentation')}</p><h1>${esc(page.title)}</h1><p>${esc(page.description)}</p></header>${section('01','Para que serve','',`<div class="purpose-copy"><p>${esc(page.purpose)}</p>${projectCallout()}</div>`)}${section('02','Exemplo real','Todas as variações relevantes aparecem renderizadas em escala de interface, antes da especificação técnica.',`<div class="visual-stage">${demo(page)}</div>`,'visual-section')}${section('03','Informações técnicas','Tokens, medidas e regras que conectam o Figma à implementação.',technicalTable(page))}${section('04','Referências','Fontes visuais, técnicas e de acessibilidade utilizadas para validar a decisão.',referenceCards(page))}`}

function overview(){return `<header class="overview-hero"><p class="doc-eyebrow">Brand & Design System</p><h1>Design System visual, antes de tudo.</h1><p>Todas as páginas seguem a mesma hierarquia: título, descrição, para que serve, definição por projeto, exemplo real com variações, informações técnicas e referências.</p><div class="overview-rule"><strong>Princípio do template</strong><span>Primeiro mostrar → depois explicar → depois especificar.</span></div></header><section class="overview-grid">${pages.map((page,index)=>`<a href="#/${page.id}" class="overview-card"><span>${String(index+1).padStart(2,'0')}</span><div><h2>${esc(page.title)}</h2><p>${esc(page.description)}</p></div><b>↗</b></a>`).join('')}</section>`}

function render(scroll=true){const current=route();let page=current.type==='page'?byId(current.id):null;if(current.type==='page'&&!page){location.hash='#/overview';return}pageTitle.textContent=page?page.title:'Overview';document.title=`${pageTitle.textContent} · Design System`;app.innerHTML=page?pageView(page):overview();renderNav(navSearch.value);if(scroll){app.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'})}}

window.addEventListener('hashchange',()=>render());
navSearch.addEventListener('input',()=>renderNav(navSearch.value));
menuButton.addEventListener('click',()=>setDrawer(true));drawerClose.addEventListener('click',()=>setDrawer(false,true));backdrop.addEventListener('click',()=>setDrawer(false));document.addEventListener('keydown',event=>event.key==='Escape'&&setDrawer(false,true));mobile.addEventListener('change',()=>setDrawer(false));
themeButton.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;localStorage.setItem('design-system-theme',next)});const saved=localStorage.getItem('design-system-theme');if(saved==='dark'||saved==='light')document.documentElement.dataset.theme=saved;
setDrawer(false);render();
