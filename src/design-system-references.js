const FIGMA='https://www.figma.com/design/99947Dmc328mSa2FmYj5fP/Brand-e-Design-System?node-id=0-1&t=XyywlRgk12fIPGlo-1';

const LIB={
  figma:{kind:'Fonte do projeto',title:'Figma — Brand & Design System',note:'Arquivo visual usado como fonte de exemplos e comparação das decisões do sistema.',url:FIGMA},
  dtcgFormat:{kind:'Especificação',title:'Design Tokens Format Module 2025.10',note:'Formato estável da Design Tokens Community Group para representar tokens, tipos, aliases e metadados entre ferramentas.',url:'https://www.designtokens.org/TR/2025.10/format/'},
  dtcgResolver:{kind:'Especificação',title:'Design Tokens Resolver Module 2025.10',note:'Modelo para resolver tokens em contextos como temas, modos e combinações de configuração.',url:'https://www.designtokens.org/TR/2025.10/resolver/'},
  wcag:{kind:'Norma',title:'WCAG 2.2 — W3C',note:'Critérios de acessibilidade para contraste, teclado, foco, estrutura, alvos de interação e conteúdo.',url:'https://www.w3.org/TR/WCAG22/'},
  pageStructure:{kind:'Guia W3C',title:'WAI — Page Structure Tutorial',note:'Guia de estrutura de páginas, landmarks, headings e semântica para navegação e orientação.',url:'https://www.w3.org/WAI/tutorials/page-structure/'},
  regions:{kind:'Guia W3C',title:'WAI — Page Regions',note:'Uso de header, nav, main, aside e footer como regiões semânticas e responsivas.',url:'https://www.w3.org/WAI/tutorials/page-structure/regions/'},
  headings:{kind:'Guia W3C',title:'WAI — Headings',note:'Hierarquia de títulos, organização de conteúdo e navegação por headings.',url:'https://www.w3.org/WAI/tutorials/page-structure/headings/'},
  contentStructure:{kind:'Guia W3C',title:'WAI — Content Structure',note:'Semântica para article, section, listas, citações, figuras, imagens e tabelas.',url:'https://www.w3.org/WAI/tutorials/page-structure/content/'},
  images:{kind:'Guia W3C',title:'WAI — Images Tutorial',note:'Alternativas textuais para imagens informativas, funcionais e decorativas.',url:'https://www.w3.org/WAI/tutorials/images/'},
  decorativeImages:{kind:'Guia W3C',title:'WAI — Decorative Images',note:'Quando uma imagem é apenas visual e como evitar ruído para tecnologias assistivas.',url:'https://www.w3.org/WAI/tutorials/images/decorative/'},
  functionalImages:{kind:'Guia W3C',title:'WAI — Functional Images',note:'Como descrever ícones, logos e imagens que funcionam como links, botões ou ações.',url:'https://www.w3.org/WAI/tutorials/images/functional/'},
  carouselWai:{kind:'Guia W3C',title:'WAI — Carousels Tutorial',note:'Estrutura, controles, teclado, anúncios de mudança e pausa de animação para carrosséis acessíveis.',url:'https://www.w3.org/WAI/tutorials/carousels/'},
  carouselWebdev:{kind:'Artigo',title:'web.dev — Best practices for carousels',note:'Boas práticas de UX e performance para carrosséis, incluindo LCP, CLS, autoplay e navegação alternativa.',url:'https://web.dev/articles/carousel-best-practices'},
  responsiveWebdev:{kind:'Artigo',title:'web.dev — Accessible responsive design',note:'Boas práticas para responsividade, zoom, ordem de foco e navegação por teclado em diferentes breakpoints.',url:'https://web.dev/articles/accessible-responsive-design'},
  responsiveImages:{kind:'Guia',title:'web.dev — Responsive images',note:'srcset, sizes, prioridade de carregamento e escolha de mídia para layouts responsivos.',url:'https://web.dev/learn/design/responsive-images'},
  cls:{kind:'Artigo',title:'web.dev — Optimize Cumulative Layout Shift',note:'Como reservar espaço para mídia e reduzir mudanças inesperadas de layout durante o carregamento.',url:'https://web.dev/articles/optimize-cls'},
  mdnGrid:{kind:'Documentação',title:'MDN — CSS Grid Layout',note:'Documentação técnica para grids, tracks, gaps, alinhamento e composição responsiva.',url:'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout'},
  mdnClamp:{kind:'Documentação',title:'MDN — clamp()',note:'Escalas fluidas com limites mínimos e máximos, úteis para tipografia e espaçamento responsivo.',url:'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp'},
  mdnReduced:{kind:'Documentação',title:'MDN — prefers-reduced-motion',note:'Como reduzir ou substituir movimento não essencial quando o usuário solicita menos animação.',url:'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion'},
  mdnContainer:{kind:'Artigo',title:'MDN — Getting started with CSS container queries',note:'Composição responsiva orientada ao espaço disponível do componente, não apenas ao viewport.',url:'https://developer.mozilla.org/en-US/blog/getting-started-with-css-container-queries/'},
  formsWai:{kind:'Guia W3C',title:'WAI — Forms Tutorial',note:'Labels, instruções, validação, grupos de campos e feedback acessível em formulários.',url:'https://www.w3.org/WAI/tutorials/forms/'},
  tablesWai:{kind:'Guia W3C',title:'WAI — Tables Tutorial',note:'Estrutura semântica de tabelas e associação correta entre cabeçalhos e células.',url:'https://www.w3.org/WAI/tutorials/tables/'},
  apgPatterns:{kind:'Documentação',title:'WAI-ARIA Authoring Practices — Patterns',note:'Catálogo de padrões de widgets, teclado, roles, states e properties.',url:'https://www.w3.org/WAI/ARIA/apg/patterns/'},
  apgButton:{kind:'Padrão ARIA',title:'APG — Button Pattern',note:'Semântica, teclado, toggle buttons e expectativas de interação para botões.',url:'https://www.w3.org/WAI/ARIA/apg/patterns/button/'},
  apgCheckbox:{kind:'Padrão ARIA',title:'APG — Checkbox Pattern',note:'Checkbox dual-state e tri-state, estados e interação por teclado.',url:'https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/'},
  apgRadio:{kind:'Padrão ARIA',title:'APG — Radio Group Pattern',note:'Seleção exclusiva, agrupamento e navegação por teclado em radio groups.',url:'https://www.w3.org/WAI/ARIA/apg/patterns/radio/'},
  apgSwitch:{kind:'Padrão ARIA',title:'APG — Switch Pattern',note:'Semântica on/off e diferenças entre switch, checkbox e toggle button.',url:'https://www.w3.org/WAI/ARIA/apg/patterns/switch/'},
  apgSlider:{kind:'Padrão ARIA',title:'APG — Slider Pattern',note:'Teclado, valores, orientação e semântica para sliders simples e ranges.',url:'https://www.w3.org/WAI/ARIA/apg/patterns/slider/'},
  apgTabs:{kind:'Padrão ARIA',title:'APG — Tabs Pattern',note:'Relação entre tablist, tabs e panels, foco e navegação por teclado.',url:'https://www.w3.org/WAI/ARIA/apg/patterns/tabs/'},
  apgDialog:{kind:'Padrão ARIA',title:'APG — Dialog (Modal) Pattern',note:'Gerenciamento de foco, aria-modal, título, dismiss e retorno de foco em modais.',url:'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/'},
  apgAccordion:{kind:'Padrão ARIA',title:'APG — Accordion Pattern',note:'Estrutura, expanded state e interação de teclado em conteúdos colapsáveis.',url:'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/'},
  govComponents:{kind:'Design system',title:'GOV.UK Design System — Components',note:'Biblioteca pública com orientação de uso, exemplos codificados e decisões de acessibilidade.',url:'https://design-system.service.gov.uk/components/'},
  govHeader:{kind:'Design system',title:'GOV.UK Design System — Header',note:'Orientações para identidade, confiança, navegação e composição de cabeçalho.',url:'https://design-system.service.gov.uk/components/header/'},
  govFooter:{kind:'Design system',title:'GOV.UK Design System — Footer',note:'Orientações para links institucionais, navegação secundária e conteúdo de rodapé.',url:'https://design-system.service.gov.uk/components/footer/'},
  govAccordion:{kind:'Design system',title:'GOV.UK Design System — Accordion',note:'Quando usar conteúdo expansível, progressive enhancement e comportamento sem JavaScript.',url:'https://design-system.service.gov.uk/components/accordion/'},
  govNotification:{kind:'Design system',title:'GOV.UK — Notification banner',note:'Quando usar banners, hierarquia da mensagem, roles, foco e casos em que outro padrão é melhor.',url:'https://design-system.service.gov.uk/components/notification-banner/'},
  uswdsComponents:{kind:'Design system',title:'U.S. Web Design System — Components',note:'Componentes públicos com guidance, estados, acessibilidade e exemplos de implementação.',url:'https://designsystem.digital.gov/components/overview/'},
  uswdsButton:{kind:'Design system',title:'USWDS — Button',note:'Estados visuais, variantes, affordance e recomendações de acessibilidade para ações.',url:'https://designsystem.digital.gov/components/button/'},
  uswdsCard:{kind:'Design system',title:'USWDS — Card',note:'Cards como unidades modulares de conteúdo e ações sobre um único assunto.',url:'https://designsystem.digital.gov/components/card/'},
  uswdsModal:{kind:'Design system',title:'USWDS — Modal',note:'Guidance de uso, foco, interrupção de fluxo, tamanhos e alternativas ao modal.',url:'https://designsystem.digital.gov/components/modal/'},
  uswdsTable:{kind:'Design system',title:'USWDS — Table',note:'Tabelas para comparação de dados, estrutura e variações de apresentação.',url:'https://designsystem.digital.gov/components/table/'},
  uswdsForm:{kind:'Design system',title:'USWDS — Form',note:'Guidance de acessibilidade, ordem dos campos, fieldsets, legendas e mensagens de erro.',url:'https://designsystem.digital.gov/components/form/'},
  uswdsAlert:{kind:'Design system',title:'USWDS — Alert',note:'Mensagens informativas, warning, success e error com guidance de uso e prioridade.',url:'https://designsystem.digital.gov/components/alert/'}
};

const PAGE_REFS={
  grid:['figma','dtcgFormat','mdnGrid','responsiveWebdev','mdnContainer'],
  spacing:['figma','dtcgFormat','mdnContainer','govComponents'],
  typography:['figma','dtcgFormat','mdnClamp','wcag','headings'],
  colors:['figma','dtcgFormat','wcag','govComponents'],
  icons:['figma','functionalImages','images','wcag'],
  effects:['figma','dtcgFormat','mdnReduced','wcag'],
  logo:['figma','functionalImages','images','wcag'],
  illustrations:['figma','images','decorativeImages','responsiveImages'],
  avatars:['figma','images','wcag','uswdsComponents'],
  buttons:['figma','apgButton','uswdsButton','wcag'],
  'icon-buttons':['figma','apgButton','functionalImages','wcag'],
  'selects-controls':['figma','apgCheckbox','apgRadio','apgSwitch','wcag'],
  slider:['figma','apgSlider','wcag','responsiveWebdev'],
  tags:['figma','uswdsComponents','wcag','contentStructure'],
  navigation:['figma','regions','govHeader','responsiveWebdev'],
  tabs:['figma','apgTabs','govComponents','wcag'],
  'header-links':['figma','regions','wcag','responsiveWebdev'],
  forms:['figma','formsWai','uswdsForm','wcag'],
  cards:['figma','uswdsCard','contentStructure','responsiveImages'],
  tables:['figma','tablesWai','uswdsTable','wcag'],
  'modals-popups':['figma','apgDialog','uswdsModal','wcag'],
  'banners-messaging':['figma','govNotification','uswdsAlert','wcag']
};

const PART_REFS={
  hero:['headings','responsiveImages','cls','responsiveWebdev'],
  carousel:['carouselWai','carouselWebdev','mdnReduced','wcag'],
  slider:['carouselWai','carouselWebdev','mdnReduced','responsiveWebdev'],
  blog:['contentStructure','headings','images','responsiveImages'],
  sections:['pageStructure','regions','headings','mdnContainer'],
  cta:['apgButton','uswdsButton','wcag','pageStructure'],
  features:['uswdsCard','contentStructure','mdnContainer','responsiveWebdev'],
  testimonials:['contentStructure','headings','wcag','responsiveWebdev'],
  pricing:['uswdsCard','uswdsTable','wcag','responsiveWebdev'],
  faq:['govAccordion','apgAccordion','headings','wcag'],
  footer:['regions','govFooter','pageStructure','wcag']
};

function esc(value=''){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));}
function card(key,compact=false){const ref=LIB[key];if(!ref)return'';return `<a class="reference-card research-source ${compact?'compact':''}" href="${esc(ref.url)}" target="_blank" rel="noreferrer"><div><small>${esc(ref.kind)}</small><strong>${esc(ref.title)}</strong><p>${esc(ref.note)}</p></div><span>↗</span></a>`;}
function cards(keys,compact=false){return keys.map(key=>card(key,compact)).join('');}

function ensureStyles(){
  if(document.getElementById('research-reference-styles'))return;
  const style=document.createElement('style');
  style.id='research-reference-styles';
  style.textContent=`
    .reference-grid.research-grid{grid-template-columns:repeat(auto-fit,minmax(230px,1fr))}
    .research-source small{color:var(--muted);font-size:9px;font-weight:850;letter-spacing:.07em;text-transform:uppercase}
    .research-source strong{line-height:1.25}.research-source p{line-height:1.45}
    .part-research{margin-top:18px;padding-top:18px;border-top:1px solid var(--border)}
    .part-research-head{display:flex;align-items:end;justify-content:space-between;gap:18px;margin-bottom:11px}
    .part-research-head div{display:grid;gap:3px}.part-research-head small{color:var(--muted);font-size:9px;font-weight:850;letter-spacing:.07em;text-transform:uppercase}
    .part-research-head strong{font-size:13px}.part-research-head span{max-width:560px;color:var(--muted);font-size:10px;text-align:right}
    .part-reference-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
    .part-reference-grid .reference-card{min-height:145px;padding:14px;border-radius:14px;box-shadow:none}
    .part-reference-grid .reference-card strong{margin-top:12px;font-size:12px}.part-reference-grid .reference-card p{font-size:10px}
    .reference-research-note{margin-top:7px!important;font-size:11px!important}
    @media(max-width:1180px){.part-reference-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:780px){.part-reference-grid{grid-template-columns:1fr}.part-research-head{display:grid}.part-research-head span{text-align:left}.part-reference-grid .reference-card{min-height:130px}}
  `;
  document.head.appendChild(style);
}

function renamePlaceholderBrand(root=document){
  root.querySelectorAll('.wordmark b').forEach(node=>{if(node.textContent.trim().toLowerCase()==='pixelmatters')node.textContent='Exemplo';});
}

function patchDesignSystemPage(){
  if(document.body.dataset.page==='parts')return;
  renamePlaceholderBrand();
  const id=location.hash.replace(/^#\//,'')||'overview';
  if(id==='overview')return;
  const keys=PAGE_REFS[id];
  if(!keys)return;
  const sections=[...document.querySelectorAll('#app .doc-section')];
  const section=sections.find(item=>item.querySelector('.doc-section-head h2')?.textContent.trim()==='Referências');
  if(!section||section.dataset.referencesFor===id)return;
  section.dataset.referencesFor=id;
  const description=section.querySelector('.doc-section-head > p:last-child');
  if(description)description.textContent='Documentações, normas, design systems públicos e artigos pesquisados para validar esta decisão visual e técnica.';
  const grid=section.querySelector('.reference-grid');
  if(grid){grid.classList.add('research-grid');grid.innerHTML=cards(keys);}
}

function patchPartsPage(){
  if(document.body.dataset.page!=='parts')return;
  renamePlaceholderBrand();
  Object.entries(PART_REFS).forEach(([id,keys])=>{
    const block=document.getElementById(id);
    if(!block||block.querySelector('.part-research'))return;
    const research=document.createElement('div');
    research.className='part-research';
    research.innerHTML=`<div class="part-research-head"><div><small>Documentação & pesquisa</small><strong>Referências para ${esc(block.querySelector('h3')?.textContent||id)}</strong></div><span>Fontes para estrutura, semântica, acessibilidade, responsividade e performance desta part.</span></div><div class="part-reference-grid">${cards(keys,true)}</div>`;
    block.appendChild(research);
  });
  const sections=[...document.querySelectorAll('main > .doc-section')];
  const finalSection=sections.find(item=>item.querySelector('.doc-section-head h2')?.textContent.trim()==='Referências');
  if(finalSection&&!finalSection.dataset.referencesFor){
    finalSection.dataset.referencesFor='parts';
    const description=finalSection.querySelector('.doc-section-head > p:last-child');
    if(description)description.textContent='Base geral de pesquisa para composição, tokens, estrutura semântica, responsividade e acessibilidade.';
    const grid=finalSection.querySelector('.reference-grid');
    if(grid){grid.classList.add('research-grid');grid.innerHTML=cards(['figma','dtcgFormat','pageStructure','responsiveWebdev','wcag']);}
  }
}

function applyResearch(){ensureStyles();patchDesignSystemPage();patchPartsPage();}

if(document.body.dataset.page==='parts'){
  applyResearch();
}else{
  const app=document.getElementById('app');
  if(app){
    const observer=new MutationObserver(()=>queueMicrotask(applyResearch));
    observer.observe(app,{childList:true,subtree:true});
  }
  window.addEventListener('hashchange',()=>queueMicrotask(applyResearch));
  queueMicrotask(applyResearch);
}
