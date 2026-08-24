import './design-system-references.js';

const PARTS=[
  {
    id:'hero',title:'Hero',description:'Aberturas de página para produto, campanha, institucional e landing pages.',
    purpose:'Cria o primeiro contexto da página, combina proposta de valor, apoio, mídia e ações e estabelece a hierarquia inicial da experiência.',
    tech:[['hero.maxWidth','1440px','Largura de referência'],['hero.minHeight','560px','Altura sugerida em desktop'],['hero.content.max','720px','Largura do bloco textual'],['hero.actions.gap','8px','Espaço entre ações'],['hero.mobile.stack','1 column','Empilhamento em telas menores']],
    refs:['pageStructure','headings','responsiveImages','cls','wcag'],
    demo:()=>`<div class="hero-gallery"><section class="hero-part split"><div class="hero-copy"><span class="mini-tag">Exemplo</span><h4>Uma mensagem clara para começar a experiência.</h4><p>Hero dividido com headline, texto de apoio, duas ações e uma área visual.</p><div class="part-actions"><button class="part-btn dark">Ação principal</button><button class="part-btn ghost">Ação secundária →</button></div></div><div class="hero-media"><div class="media-orbit one"></div><div class="media-orbit two"></div><div class="media-card">01</div></div></section><section class="hero-part centered"><span class="mini-tag">Variação centralizada</span><h4>Uma ideia. Muitas expressões.</h4><p>Versão centralizada para lançamento, manifesto ou produto com uma mensagem curta.</p><button class="part-btn dark">Explorar</button><div class="hero-browser"><i></i><i></i><i></i><div></div></div></section><section class="hero-part editorial"><div class="editorial-number">03</div><div><small>Editorial hero</small><h4>Design como linguagem viva.</h4></div><p>Variação editorial com contraste tipográfico e menos interface.</p></section></div>`
  },
  {
    id:'carousel',title:'Carousel',description:'Sequências horizontais para cases, conteúdo, categorias, mídia ou produtos.',
    purpose:'Organiza uma coleção em uma área compacta e permite explorar itens relacionados sem transformar a página em uma lista longa.',
    tech:[['carousel.items.desktop','3','Itens visíveis em desktop'],['carousel.gap','14px','Espaço entre cards'],['carousel.controls','Prev / Next','Controles explícitos'],['carousel.progress','Optional','Indicador de progresso'],['carousel.autoplay','Off by default','Evitar autoplay por padrão']],
    refs:['carouselWai','carouselWebdev','reducedMotion','wcag'],
    demo:()=>`<div class="carousel-part"><div class="carousel-top"><div><small>Conteúdo em destaque</small><h4>Projetos selecionados</h4></div><div class="carousel-controls"><button aria-label="Anterior">←</button><button aria-label="Próximo">→</button></div></div><div class="carousel-track"><article><div class="fake-media gradient-a"><span>01</span></div><small>Strategy · Product</small><h5>Clareza para uma experiência complexa.</h5></article><article><div class="fake-media gradient-b"><span>02</span></div><small>Brand · Digital</small><h5>Uma linguagem que cresce com a marca.</h5></article><article><div class="fake-media gradient-c"><span>03</span></div><small>Platform · Experience</small><h5>Um ecossistema, muitas jornadas.</h5></article></div><div class="carousel-progress"><span></span></div></div>`
  },
  {
    id:'content-slider',title:'Content Slider',description:'Slides narrativos para benefícios, etapas, provas, capítulos e storytelling.',
    purpose:'Apresenta uma sequência de ideias com progressão clara, mantendo contexto visual entre capítulos ou estados.',
    tech:[['slider.slides','3–6','Quantidade recomendada'],['slider.transition','300ms','Transição de referência'],['slider.controls','Visible','Navegação sempre identificável'],['slider.motion','Reduced aware','Respeitar redução de movimento'],['slider.mobile','Horizontal / stack','Definido por projeto']],
    refs:['carouselWai','carouselWebdev','reducedMotion','responsive'],
    demo:()=>`<div class="story-slider"><div class="story-main"><small>Capítulo 01</small><h4>Do insight à interface.</h4><p>Cada slide combina headline, supporting copy, indicadores e mídia mantendo o mesmo ritmo visual.</p><div class="story-meta"><span>Research</span><span>Strategy</span><span>Design</span></div></div><div class="story-visual"><span>01</span><div class="story-grid"></div></div><div class="story-thumbs"><button class="active"><b>01</b><span>Insight</span></button><button><b>02</b><span>System</span></button><button><b>03</b><span>Launch</span></button></div></div>`
  },
  {
    id:'blog-articles',title:'Blog & Articles',description:'Padrões editoriais para posts, notícias, estudos, insights e recursos.',
    purpose:'Cria consistência na descoberta de conteúdo e permite variar densidade, mídia e metadados sem perder a hierarquia editorial.',
    tech:[['article.card.featured','1.35fr','Card editorial principal'],['article.image.ratio','4:3 / 16:9','Proporções de referência'],['article.meta','12px','Categoria, data e leitura'],['article.title.lines','2–4','Limite visual sugerido'],['article.mobile','1 column','Empilhamento mobile']],
    refs:['contentStructure','headings','images','responsiveImages'],
    demo:()=>`<div class="blog-grid"><article class="blog-card featured"><div class="blog-media gradient-d"></div><div><small>Design Systems · 8 min</small><h4>Como manter um sistema vivo sem perder a marca.</h4><p>Estratégias de governança, documentação e evolução visual.</p><span>Ler artigo →</span></div></article><article class="blog-card"><div class="blog-media gradient-e"></div><div><small>Brand · 5 min</small><h4>Construindo uma linguagem visual que escala.</h4><span>Ler →</span></div></article><article class="blog-card compact"><div><small>Research · 12 min</small><h4>O que equipes precisam da documentação.</h4><p>Versão sem mídia para listas editoriais mais densas.</p><span>Ler →</span></div></article></div>`
  },
  {
    id:'website-sections',title:'Website Sections',description:'Blocos estruturais para narrativa, prova, números, logos e conteúdo institucional.',
    purpose:'Organiza páginas longas em unidades legíveis e reutilizáveis, mantendo ritmo entre conteúdo, evidência e respiro.',
    tech:[['section.maxWidth','1280px','Container de referência'],['section.padding.y','80–120px','Ritmo vertical desktop'],['section.split','5/7 · 6/6','Proporções comuns'],['section.stats.columns','2–4','Quantidade por linha'],['section.mobile','Stack','Empilhamento mobile']],
    refs:['pageStructure','regions','headings','containerQueries'],
    demo:()=>`<div class="section-stack"><section class="split-section"><div><small>Por que importa</small><h4>Sistemas claros aceleram decisões.</h4></div><div><p>Combine narrativa e evidência em splits flexíveis, mantendo conteúdo e hierarquia responsivos.</p><ul><li>Experiência consistente</li><li>Linguagem compartilhada</li><li>Entrega mais rápida</li></ul></div></section><section class="logo-cloud"><small>Exemplo de logo cloud</small><div><b>North</b><b>Frame</b><b>Orbit</b><b>Layer</b><b>Studio</b></div></section><section class="stats-section"><div><strong>42%</strong><span>mais agilidade</span></div><div><strong>3×</strong><span>mais padrões reutilizáveis</span></div><div><strong>18</strong><span>foundations</span></div><div><strong>1</strong><span>fonte de verdade</span></div></section></div>`
  },
  {
    id:'call-to-action',title:'Call to Action',description:'Seções de fechamento ou transição com mensagem e ação principal.',
    purpose:'Concentra atenção em um próximo passo claro e reduz ambiguidade em momentos de conversão ou continuidade.',
    tech:[['cta.actions','1–2','Quantidade recomendada'],['cta.content.max','720px','Largura do texto'],['cta.padding','48–80px','Padding de referência'],['cta.contrast','AA minimum','Contraste mínimo'],['cta.mobile','Stack actions','Ações podem empilhar']],
    refs:['buttonPattern','uswdsButton','wcag','pageStructure'],
    demo:()=>`<div class="cta-gallery"><section class="cta-dark"><div><small>Próximo passo</small><h4>Transforme o sistema em uma experiência real.</h4></div><button class="part-btn light">Começar projeto →</button></section><section class="cta-box"><span class="mini-tag">Variação compacta</span><h4>Construa a partir de uma fundação compartilhada.</h4><p>CTA para fim de seção, fim de página ou transição entre conteúdos.</p><div class="part-actions centered-actions"><button class="part-btn dark">Começar</button><button class="part-btn ghost">Falar com o time</button></div></section></div>`
  },
  {
    id:'feature-grid',title:'Feature Grid',description:'Bento grids e composições modulares para benefícios e funcionalidades.',
    purpose:'Permite comparar capabilities com diferentes pesos visuais e cria uma narrativa modular sem depender de cards idênticos.',
    tech:[['feature.grid','12 columns','Base de composição'],['feature.minHeight','220px','Altura mínima de card'],['feature.gap','12–16px','Gap da composição'],['feature.span','4 / 6 / 8 / 12','Spans permitidos'],['feature.mobile','1 column','Stack responsivo']],
    refs:['uswdsCard','contentStructure','containerQueries','responsive'],
    demo:()=>`<div class="feature-bento"><article class="feature-main"><small>Foundation</small><h4>Tudo começa com regras compartilhadas.</h4><div class="feature-lines"><i></i><i></i><i></i><i></i></div></article><article><small>Tokens</small><strong>Valores reutilizáveis</strong><div class="token-dots"><i></i><i></i><i></i></div></article><article><small>Components</small><strong>Comportamento previsível</strong><div class="mini-components"><i></i><i></i><i></i></div></article><article class="wide"><small>Governance</small><strong>Documente decisões, não apenas telas.</strong></article></div>`
  },
  {
    id:'testimonials',title:'Testimonials',description:'Depoimentos, quotes e provas qualitativas em diferentes níveis de destaque.',
    purpose:'Adiciona prova social e contexto humano sem transformar o conteúdo em uma sequência de cards genéricos.',
    tech:[['testimonial.quote.max','220 chars','Comprimento recomendado'],['testimonial.avatar','40–48px','Avatar opcional'],['testimonial.columns','1–2','Desktop'],['testimonial.attribution','Required','Autor e contexto'],['testimonial.mobile','1 column','Stack mobile']],
    refs:['contentStructure','headings','wcag','responsive'],
    demo:()=>`<div class="quote-grid"><blockquote><p>“O sistema finalmente parece a nossa marca, não uma biblioteca genérica.”</p><footer><span class="quote-avatar">AM</span><div><strong>Ana Martins</strong><small>Design Lead</small></div></footer></blockquote><blockquote class="quote-dark"><p>“Paramos de redesenhar as mesmas decisões a cada sprint.”</p><footer><span class="quote-avatar">RC</span><div><strong>Rafael Costa</strong><small>Product Director</small></div></footer></blockquote></div>`
  },
  {
    id:'pricing',title:'Pricing',description:'Planos, comparação de oferta, benefícios e ações de contratação.',
    purpose:'Facilita comparação entre opções e evidencia diferenças relevantes sem depender apenas de preço ou destaque cromático.',
    tech:[['pricing.tiers','2–4','Quantidade de planos'],['pricing.feature.rows','4–8','Benefícios principais'],['pricing.recommended','0–1','Destaque recomendado'],['pricing.cta','1 per tier','Ação por plano'],['pricing.mobile','Stack','Cards empilhados']],
    refs:['uswdsCard','tables','wcag','responsive'],
    demo:()=>`<div class="pricing-grid"><article><small>Starter</small><h4>Free</h4><p>Para experimentos pequenos.</p><button class="part-btn ghost full">Começar grátis</button><ul><li>Foundations essenciais</li><li>Componentes básicos</li><li>Suporte da comunidade</li></ul></article><article class="recommended"><span class="mini-tag">Recomendado</span><small>Scale</small><h4>R$ 49</h4><p>Para times em crescimento.</p><button class="part-btn dark full">Escolher Scale</button><ul><li>Biblioteca completa</li><li>Templates & Parts</li><li>Governança</li></ul></article><article><small>Enterprise</small><h4>Custom</h4><p>Para ecossistemas complexos.</p><button class="part-btn ghost full">Falar com vendas</button><ul><li>Customização</li><li>Integrações</li><li>Suporte dedicado</li></ul></article></div>`
  },
  {
    id:'faq',title:'FAQ',description:'Perguntas frequentes com conteúdo expansível e hierarquia clara.',
    purpose:'Reduz fricção em dúvidas recorrentes sem ocupar toda a página, mantendo as respostas acessíveis por teclado e tecnologia assistiva.',
    tech:[['faq.trigger.height','56–72px','Alvo de interação'],['faq.icon','20px','Indicador expand/collapse'],['faq.state','aria-expanded','Estado acessível'],['faq.heading','Required','Pergunta como heading'],['faq.multiple','Project decision','Uma ou várias abertas']],
    refs:['accordionPattern','govAccordion','headings','wcag'],
    demo:()=>`<div class="faq-list part-stage"><article class="open"><div><strong>O que deve ser definido por projeto?</strong><span>−</span></div><p>Conteúdo, hierarquia, ordem, densidade e comportamento devem refletir a marca e o produto.</p></article><article><div><strong>Quantas perguntas podem ficar abertas?</strong><span>＋</span></div></article><article><div><strong>FAQ substitui documentação?</strong><span>＋</span></div></article><article><div><strong>Como funciona no mobile?</strong><span>＋</span></div></article></div>`
  },
  {
    id:'footer',title:'Footer',description:'Rodapé estrutural com identidade, navegação secundária, legal e utilidades.',
    purpose:'Fecha a experiência, oferece caminhos de recuperação e concentra informações persistentes que não precisam competir com a navegação principal.',
    tech:[['footer.columns','2–5','Colunas de navegação'],['footer.padding.y','48–80px','Padding vertical'],['footer.legal','Required','Informações legais'],['footer.landmark','footer','Região semântica'],['footer.mobile','Stack groups','Grupos empilhados']],
    refs:['regions','govFooter','pageStructure','wcag'],
    demo:()=>`<div class="footer-part part-stage"><footer class="footer-main"><div><strong>EXEMPLO</strong><p>Uma frase curta de marca ou contexto para o rodapé.</p></div><div><small>Produto</small><a>Overview</a><a>Features</a><a>Pricing</a></div><div><small>Empresa</small><a>Sobre</a><a>Carreiras</a><a>Blog</a></div><div><small>Suporte</small><a>Docs</a><a>Contato</a><a>Status</a></div></footer><div class="footer-bottom"><span>© 2026 Exemplo</span><div><a>Privacidade</a><a>Termos</a></div></div></div>`
  }
];

const REFS={
  pageStructure:['Guia W3C','WAI — Page Structure Tutorial','Estrutura de páginas, landmarks, headings e semântica.','https://www.w3.org/WAI/tutorials/page-structure/'],
  regions:['Guia W3C','WAI — Page Regions','Uso de header, nav, main, aside e footer como regiões semânticas.','https://www.w3.org/WAI/tutorials/page-structure/regions/'],
  headings:['Guia W3C','WAI — Headings','Hierarquia de títulos e organização do conteúdo.','https://www.w3.org/WAI/tutorials/page-structure/headings/'],
  contentStructure:['Guia W3C','WAI — Content Structure','Semântica para article, section, listas, citações e figuras.','https://www.w3.org/WAI/tutorials/page-structure/content/'],
  images:['Guia W3C','WAI — Images Tutorial','Alternativas textuais para imagens informativas, funcionais e decorativas.','https://www.w3.org/WAI/tutorials/images/'],
  carouselWai:['Guia W3C','WAI — Carousels Tutorial','Controles, teclado, anúncios de mudança e pausa de animação.','https://www.w3.org/WAI/tutorials/carousels/'],
  carouselWebdev:['Artigo','web.dev — Best practices for carousels','Boas práticas de UX e performance, incluindo LCP, CLS e autoplay.','https://web.dev/articles/carousel-best-practices'],
  responsiveImages:['Guia','web.dev — Responsive images','srcset, sizes e escolha de mídia responsiva.','https://web.dev/learn/design/responsive-images'],
  cls:['Artigo','web.dev — Optimize Cumulative Layout Shift','Como reservar espaço de mídia e reduzir mudanças inesperadas de layout.','https://web.dev/articles/optimize-cls'],
  responsive:['Artigo','web.dev — Accessible responsive design','Responsividade, zoom, ordem de foco e navegação por teclado.','https://web.dev/articles/accessible-responsive-design'],
  reducedMotion:['Documentação','MDN — prefers-reduced-motion','Como reduzir movimento não essencial quando solicitado pelo usuário.','https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion'],
  containerQueries:['Documentação','MDN — CSS Container Queries','Responsividade baseada no espaço disponível do componente.','https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries'],
  buttonPattern:['Padrão ARIA','APG — Button Pattern','Semântica e interação por teclado para botões.','https://www.w3.org/WAI/ARIA/apg/patterns/button/'],
  uswdsButton:['Design system','USWDS — Button','Estados, variantes, affordance e acessibilidade para ações.','https://designsystem.digital.gov/components/button/'],
  uswdsCard:['Design system','USWDS — Card','Cards como unidades modulares de conteúdo e ação.','https://designsystem.digital.gov/components/card/'],
  tables:['Design system','USWDS — Table','Estrutura e comparação de dados tabulares.','https://designsystem.digital.gov/components/table/'],
  accordionPattern:['Padrão ARIA','APG — Accordion Pattern','Estrutura, expanded state e interação por teclado.','https://www.w3.org/WAI/ARIA/apg/patterns/accordion/'],
  govAccordion:['Design system','GOV.UK — Accordion','Quando usar conteúdo expansível e progressive enhancement.','https://design-system.service.gov.uk/components/accordion/'],
  govFooter:['Design system','GOV.UK — Footer','Links institucionais, navegação secundária e conteúdo de rodapé.','https://design-system.service.gov.uk/components/footer/'],
  wcag:['Norma','WCAG 2.2','Critérios de contraste, teclado, foco, estrutura e alvos de interação.','https://www.w3.org/TR/WCAG22/']
};

const nav=document.getElementById('nav');
const search=document.getElementById('navSearch');
const app=document.getElementById('app');
const pageTitle=document.getElementById('pageTitle');
const isLegacyParts=document.body.dataset.page==='parts';
let observer;
let enhancing=false;

const esc=(value='')=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const partById=id=>PARTS.find(part=>part.id===id);
const currentPart=()=>partById(new URLSearchParams(location.search).get('part'));

function ensurePartsStyles(){
  if(document.querySelector('link[data-design-system-parts]'))return;
  const link=document.createElement('link');
  link.rel='stylesheet';
  link.href='./design-system-parts.css';
  link.dataset.designSystemParts='true';
  document.head.appendChild(link);
}

function ensureBrandTopLink(){
  const topbar=document.querySelector('.ds-topbar');
  const github=topbar?.querySelector('.ds-github-link');
  if(!topbar||!github||topbar.querySelector('.ds-brand-top-link'))return;
  const link=document.createElement('a');
  link.className='ds-top-link ds-brand-top-link';
  link.href='./index.html';
  link.textContent='Brand';
  link.setAttribute('aria-label','Ir para Brand Framework');
  github.before(link);
}

function setGroupOpen(group,open){
  group.classList.toggle('open',open);
  const title=group.querySelector(':scope > .ds-nav-toggle');
  const items=group.querySelector(':scope > .ds-nav-items');
  title?.setAttribute('aria-expanded',String(open));
  if(items)items.hidden=!open;
}

function makeToggle(group){
  const title=group.querySelector(':scope > .ds-nav-title');
  if(!title||title.dataset.enhanced==='true')return;
  title.dataset.enhanced='true';
  title.classList.add('ds-nav-toggle');
  const label=title.textContent.trim();
  title.innerHTML=`<span class="ds-nav-toggle-label">${esc(label)}</span><span class="ds-nav-chevron" aria-hidden="true">›</span>`;
  title.setAttribute('role','button');
  title.setAttribute('tabindex','0');
  title.setAttribute('aria-expanded','false');
  let items=group.querySelector(':scope > .ds-nav-items');
  if(!items){
    items=document.createElement('div');
    items.className='ds-nav-items';
    [...group.children].filter(el=>el.classList.contains('ds-nav-link')).forEach(link=>items.appendChild(link));
    group.appendChild(items);
  }
  const toggle=()=>{
    const next=!group.classList.contains('open');
    nav.querySelectorAll('.ds-nav-group').forEach(other=>{
      if(other!==group&&other.querySelector(':scope > .ds-nav-toggle'))setGroupOpen(other,false);
    });
    setGroupOpen(group,next);
  };
  title.addEventListener('click',toggle);
  title.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();toggle();}});
}

function partUrl(id){return `${location.pathname}?part=${encodeURIComponent(id)}#/overview`;}

function ensurePartsGroup(){
  if(!nav||nav.querySelector('[data-parts-group]'))return;
  const group=document.createElement('div');
  group.className='ds-nav-group';
  group.dataset.partsGroup='true';
  group.innerHTML=`<div class="ds-nav-title">Templates & Parts</div><div class="ds-nav-items">${PARTS.map((part,index)=>`<a class="ds-nav-link ds-part-link" data-part-id="${part.id}" href="${partUrl(part.id)}"><span>${String(index+1).padStart(2,'0')}</span><strong>${esc(part.title)}</strong></a>`).join('')}</div>`;
  nav.appendChild(group);
}

function syncPartNav(){
  if(!nav)return;
  const active=currentPart();
  nav.querySelectorAll('.ds-nav-link').forEach(link=>{
    if(link.classList.contains('ds-part-link'))link.classList.toggle('active',Boolean(active)&&link.dataset.partId===active.id);
    else if(active)link.classList.remove('active');
  });
  const group=nav.querySelector('[data-parts-group]');
  if(group&&active)setGroupOpen(group,true);
}

function enhanceNav(){
  if(!nav||enhancing)return;
  enhancing=true;
  observer?.disconnect();
  ensurePartsGroup();
  const term=(search?.value||'').trim().toLowerCase();
  const groups=[...nav.querySelectorAll('.ds-nav-group')];
  groups.forEach((group,index)=>{
    const rawTitle=group.querySelector(':scope > .ds-nav-title')?.textContent.trim();
    if(index===0&&rawTitle==='Start')return;
    makeToggle(group);
  });
  nav.querySelectorAll('[data-parts-group] .ds-part-link').forEach(link=>{
    link.style.display=!term||link.textContent.toLowerCase().includes(term)?'':'none';
  });
  syncPartNav();
  groups.forEach(group=>{
    if(!group.querySelector(':scope > .ds-nav-toggle'))return;
    const hasActive=Boolean(group.querySelector('.ds-nav-link.active'));
    setGroupOpen(group,Boolean(term)||hasActive);
  });
  observer?.observe(nav,{childList:true});
  enhancing=false;
}

function referenceCards(part){
  return `<div class="reference-grid research-grid">${part.refs.map(key=>REFS[key]).filter(Boolean).map(([kind,title,note,url])=>`<a class="reference-card research-source" href="${url}" target="_blank" rel="noreferrer"><div><small>${esc(kind)}</small><strong>${esc(title)}</strong><p>${esc(note)}</p></div><span>↗</span></a>`).join('')}</div>`;
}

function technicalTable(part){
  return `<div class="technical-table"><div class="tech-head"><span>Token / propriedade</span><span>Valor</span><span>Uso</span></div>${part.tech.map(([token,value,usage])=>`<div class="tech-row"><code>${esc(token)}</code><strong>${esc(value)}</strong><span>${esc(usage)}</span></div>`).join('')}</div>`;
}

function section(number,title,description,content,extra=''){
  return `<section class="doc-section ${extra}"><div class="doc-section-head"><p class="section-kicker">${number}</p><h2>${esc(title)}</h2>${description?`<p>${esc(description)}</p>`:''}</div>${content}</section>`;
}

function renderPart(part,scroll=true){
  if(!part||!app)return;
  ensurePartsStyles();
  if(pageTitle)pageTitle.textContent=part.title;
  document.title=`${part.title} · Templates & Parts · Design System`;
  app.innerHTML=`<header class="doc-hero"><p class="doc-eyebrow">Design System / Templates & Parts</p><h1>${esc(part.title)}</h1><p>${esc(part.description)}</p></header>${section('01','Para que serve','',`<div class="purpose-copy"><p>${esc(part.purpose)}</p><aside class="project-note"><div class="project-note-mark">↗</div><div><strong>Definição por projeto</strong><p>Estrutura, conteúdo, densidade, mídia, ritmo, proporções e variações devem ser definidos para cada marca e produto. O template documenta possibilidades, não uma aparência obrigatória.</p></div></aside></div>`)}${section('02','Exemplo real','Variações renderizadas em contexto para mostrar composição, hierarquia e comportamento responsivo.',`<div class="visual-stage">${part.demo()}</div>`,'visual-section')}${section('03','Informações técnicas','Medidas, decisões e regras que conectam composição, Figma e implementação.',technicalTable(part))}${section('04','Referências','Documentações, normas, design systems públicos e artigos pesquisados para validar esta part.',referenceCards(part))}`;
  syncPartNav();
  enhanceNav();
  if(scroll){app.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
}

function openPart(id,push=true){
  const part=partById(id);if(!part)return;
  const url=partUrl(id);
  if(push)history.pushState({part:id},'',url);else history.replaceState({part:id},'',url);
  renderPart(part);
}

function clearPartQuery(){
  if(!currentPart())return;
  history.replaceState({},'',`${location.pathname}${location.hash||'#/overview'}`);
}

function restoreOverview(){
  clearPartQuery();
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}

if(isLegacyParts){
  const legacy=(location.hash||'#hero').replace('#','');
  const target=partById(legacy)?legacy:'hero';
  location.replace(`./design-system.html?part=${encodeURIComponent(target)}#/overview`);
}else{
  ensurePartsStyles();
  ensureBrandTopLink();
  if(nav){
    observer=new MutationObserver(()=>enhanceNav());
    observer.observe(nav,{childList:true});
    queueMicrotask(enhanceNav);
    nav.addEventListener('click',event=>{
      const partLink=event.target.closest('.ds-part-link');
      if(partLink){event.preventDefault();openPart(partLink.dataset.partId);return;}
      const overviewLink=event.target.closest('.ds-nav-link[href="#/overview"]');
      if(overviewLink&&currentPart()){event.preventDefault();restoreOverview();return;}
      const normalLink=event.target.closest('.ds-nav-link');
      if(normalLink&&currentPart())clearPartQuery();
    });
  }
  search?.addEventListener('input',()=>queueMicrotask(enhanceNav));
  window.addEventListener('popstate',()=>{
    const part=currentPart();
    if(part)renderPart(part,false);
    else if(location.hash==='#/overview'||!location.hash)window.dispatchEvent(new HashChangeEvent('hashchange'));
  });
  window.addEventListener('hashchange',()=>{
    const part=currentPart();
    if(part&&location.hash==='#/overview')queueMicrotask(()=>renderPart(part,false));
    else if(part)clearPartQuery();
    queueMicrotask(enhanceNav);
  });
  const initial=currentPart();
  if(initial)queueMicrotask(()=>renderPart(initial,false));
}
