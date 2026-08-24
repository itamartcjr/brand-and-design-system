import { references, primaryPalette, secondaryPalette, neutralPalette, officialPantoneExample, semanticThemes, typographyScale } from './data.js';

const navGroups = [
  { label: 'Start', pages: [{ id: 'overview', label: 'Overview' }] },
  { label: 'Brand', pages: [{ id: 'brand', label: 'Brand' }, { id: 'foundations', label: 'Foundations' }, { id: 'colors', label: 'Colors' }, { id: 'typography', label: 'Typography' }] },
  { label: 'Design System', pages: [{ id: 'components', label: 'Components' }, { id: 'app', label: 'App' }, { id: 'web', label: 'Web' }, { id: 'assets', label: 'Assets' }] }
];

const app = document.getElementById('app');
const nav = document.getElementById('nav');
const pageTitle = document.getElementById('pageTitle');
const themeButton = document.getElementById('themeButton');
const menuButton = document.getElementById('menuButton');
const drawerClose = document.getElementById('drawerClose');
const backdrop = document.getElementById('backdrop');
const navSearch = document.getElementById('navSearch');
const toast = document.getElementById('toast');
const sidebar = document.getElementById('sidebar');
const mobileQuery = window.matchMedia('(max-width: 760px)');

function escapeHtml(value) {
  return String(value).replace(/[&<>'\"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '\"': '&quot;' }[char]));
}

function route() {
  const id = location.hash.replace(/^#\//, '').split(/[?#]/)[0] || 'overview';
  return navGroups.flatMap(g => g.pages).some(p => p.id === id) ? id : 'overview';
}

function setDrawer(open, restoreFocus = false) {
  document.body.classList.toggle('nav-open', open && mobileQuery.matches);
  menuButton.setAttribute('aria-expanded', String(open && mobileQuery.matches));
  backdrop.setAttribute('aria-hidden', String(!(open && mobileQuery.matches)));
  sidebar.setAttribute('aria-hidden', String(mobileQuery.matches && !open));
  if ('inert' in sidebar) sidebar.inert = mobileQuery.matches && !open;
  if (!open && restoreFocus) menuButton.focus();
}

function renderNav(filter = '') {
  const active = route();
  const term = filter.trim().toLowerCase();
  nav.innerHTML = navGroups.map((group, index) => {
    const pages = group.pages.filter(p => !term || p.label.toLowerCase().includes(term) || group.label.toLowerCase().includes(term));
    if (!pages.length) return '';
    const containsActive = pages.some(p => p.id === active);
    const open = Boolean(term) || containsActive || index === 0;
    return `<section class="nav-group ${open ? 'open' : ''}">
      <button class="nav-trigger" type="button" aria-expanded="${open}"><span>${escapeHtml(group.label)}</span><span class="chevron" aria-hidden="true">›</span></button>
      <div class="nav-items"><div>${pages.map(p => `<a class="nav-link ${p.id === active ? 'active' : ''}" href="#/${p.id}">${escapeHtml(p.label)}</a>`).join('')}</div></div>
    </section>`;
  }).join('');

  nav.querySelectorAll('.nav-trigger').forEach(button => button.addEventListener('click', () => {
    const group = button.closest('.nav-group');
    const next = !group.classList.contains('open');
    group.classList.toggle('open', next);
    button.setAttribute('aria-expanded', String(next));
  }));

  nav.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
    if (mobileQuery.matches) setDrawer(false);
  }));
}

function referenceSection(key) {
  const items = references[key] || [];
  return `<section class="doc-section references-section">
    <div class="section-heading"><div><p class="overline">Referências</p><h2>O que orientou esta página</h2></div><p>Fontes oficiais e sistemas maduros usados como referência para estruturar este padrão.</p></div>
    <div class="reference-list">${items.map(item => `<a class="reference-item" href="${item.url}" target="_blank" rel="noreferrer"><div><strong>${escapeHtml(item.label)}</strong><p>${escapeHtml(item.note)}</p></div><span aria-hidden="true">↗</span></a>`).join('')}</div>
  </section>`;
}

function pageHero(title, intro, kicker) {
  return `<header class="page-hero"><p class="overline">${escapeHtml(kicker || 'Documentation example')}</p><h1>${escapeHtml(title)}</h1><p class="page-lead">${escapeHtml(intro)}</p></header>`;
}

function copyButton(label, value) {
  return `<button class="copy-value" type="button" data-copy="${escapeHtml(value)}"><span>${escapeHtml(label)}</span><code>${escapeHtml(value)}</code><span class="copy-icon" aria-hidden="true">⧉</span></button>`;
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

function rgbToHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > .5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function rgbToCmyk({ r, g, b }) {
  if (r === 0 && g === 0 && b === 0) return { c: 0, m: 0, y: 0, k: 100 };
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  return {
    c: Math.round(((1 - rn - k) / (1 - k)) * 100),
    m: Math.round(((1 - gn - k) / (1 - k)) * 100),
    y: Math.round(((1 - bn - k) / (1 - k)) * 100),
    k: Math.round(k * 100)
  };
}

function colorCard(color) {
  const rgb = hexToRgb(color.hex);
  const hsl = rgbToHsl(rgb);
  const cmyk = rgbToCmyk(rgb);
  const rgbValue = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const rgbaValue = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
  const hslValue = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const cmykValue = `${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`;
  const swift = `Color(red: ${(rgb.r/255).toFixed(3)}, green: ${(rgb.g/255).toFixed(3)}, blue: ${(rgb.b/255).toFixed(3)})`;
  const android = `Color(0xFF${color.hex.slice(1).toUpperCase()})`;
  return `<article class="color-card">
    <button class="color-swatch" type="button" data-copy="${color.hex}" style="--swatch:${color.hex}" aria-label="Copiar ${color.name} ${color.hex}"><span>Copiar HEX</span></button>
    <div class="color-card-body">
      <div class="color-card-title"><div><h3>${escapeHtml(color.name)}</h3><p>${escapeHtml(color.role)}</p></div><code>${escapeHtml(color.token)}</code></div>
      <div class="copy-grid">
        ${copyButton('HEX', color.hex.toUpperCase())}
        ${copyButton('RGB', rgbValue)}
        ${copyButton('RGBA', rgbaValue)}
        ${copyButton('HSL', hslValue)}
        ${copyButton('CMYK', cmykValue)}
        ${copyButton('CSS token', `var(${color.token})`)}
        ${copyButton('SwiftUI', swift)}
        ${copyButton('Android', android)}
      </div>
      <div class="pantone-row"><span>Pantone</span><strong>Não definido</strong><small>Não estimar: só preencher com referência oficial da marca.</small></div>
    </div>
  </article>`;
}

function paletteSection(title, description, colors) {
  return `<section class="doc-section"><div class="section-heading"><div><p class="overline">Palette</p><h2>${escapeHtml(title)}</h2></div><p>${escapeHtml(description)}</p></div><div class="color-grid">${colors.map(colorCard).join('')}</div></section>`;
}

function overviewPage() {
  return `${pageHero('Padrão único para Brand Book e Design System.', 'Uma base para documentar cada marca sem apagar a personalidade dela. Brand, App e Web convivem na mesma arquitetura, mas cada contexto tem regras próprias.', 'Brand + Product documentation')}
  <section class="doc-section"><div class="section-heading"><div><h2>Como usar este template</h2></div><p>Cada nova marca parte da mesma arquitetura, mas recebe decisões, referências, tokens e exemplos próprios.</p></div>
  <div class="feature-grid">
    <article class="feature-card"><span>01</span><h3>Brand</h3><p>Estratégia, atributos, voz, logo, cor, tipografia, imagem e aplicações.</p><a href="#/brand">Abrir Brand →</a></article>
    <article class="feature-card"><span>02</span><h3>Foundations</h3><p>Decisões visuais transformadas em tokens utilizáveis em design e código.</p><a href="#/foundations">Abrir Foundations →</a></article>
    <article class="feature-card"><span>03</span><h3>App</h3><p>Aplicação dos foundations respeitando padrões nativos e acessibilidade.</p><a href="#/app">Abrir App →</a></article>
    <article class="feature-card"><span>04</span><h3>Web</h3><p>Responsividade, interação, semântica, acessibilidade e comportamento.</p><a href="#/web">Abrir Web →</a></article>
  </div></section>
  <section class="doc-section"><div class="callout"><strong>Regra de pesquisa</strong><p>Antes de consolidar qualquer seção importante, buscamos referências oficiais específicas para Brand, App e Web. As referências ficam registradas na própria página para que as decisões sejam auditáveis.</p></div></section>`;
}

function brandPage() {
  return `${pageHero('Brand', 'A documentação de marca começa no significado e termina em aplicações reais. A identidade visual não deve existir desconectada de propósito, voz e contexto.', 'Brand foundation')}
  <section class="doc-section"><div class="section-heading"><div><h2>Estrutura de exemplo</h2></div><p>O brand book precisa responder “quem somos?”, “como parecemos?”, “como falamos?” e “como agimos?”.</p></div>
    <div class="timeline-list">
      ${['Purpose & positioning','Audience & value proposition','Brand attributes','Voice & tone','Logo system','Color system','Typography','Imagery & illustration','Motion & sound','Brand in action'].map((item,i)=>`<div class="timeline-item"><span>${String(i+1).padStart(2,'0')}</span><strong>${item}</strong><p>${['Razão de existir, território e diferenciação.','Quem atendemos e qual valor entregamos.','Características que guiam decisões visuais e verbais.','Como a marca escreve e muda de tom por contexto.','Assinaturas, área de proteção, tamanhos e usos incorretos.','Paletas, temas, semântica, contraste e aplicação.','Famílias, hierarquia e relação entre expressividade e legibilidade.','Direção de fotografia, ilustração e tratamento de mídia.','Comportamento expressivo quando a marca se move ou soa.','Exemplos reais em marketing, produto, social e ambientes.'][i]}</p></div>`).join('')}
    </div>
  </section>
  <section class="doc-section"><div class="do-dont-grid"><article class="guideline-card good"><strong>Faça</strong><h3>Mostre a marca em contexto.</h3><p>Documente decisões com exemplos próximos do uso real: campanha, produto, social, apresentação e comunicação interna.</p></article><article class="guideline-card bad"><strong>Evite</strong><h3>Um manual feito só de regras isoladas.</h3><p>Logo, cor e tipografia sem estratégia e aplicação viram catálogo, não sistema de marca.</p></article></div></section>
  ${referenceSection('brand')}`;
}

function foundationsPage() {
  const items = [
    ['Colors','Paletas, modos, semântica, acessibilidade e exemplos','#/colors'],
    ['Typography','Famílias, escalas, hierarquia e comportamento responsivo','#/typography'],
    ['Spacing','Escala de espaço, densidade e ritmo',''],
    ['Grid & layout','Containers, colunas, breakpoints e safe areas',''],
    ['Radius','Geometria e hierarquia de superfícies',''],
    ['Elevation','Sombras, borders, materiais e camadas',''],
    ['Iconography','Grid, stroke, fill, tamanhos e metáforas',''],
    ['Motion','Duração, easing, entrada, saída e redução de movimento','']
  ];
  return `${pageHero('Foundations', 'Foundations são decisões estáveis que dão coerência à marca e ao produto. Eles devem existir como documentação visual e como tokens implementáveis.', 'Design foundations')}
  <section class="doc-section"><div class="foundation-list">${items.map(([a,b,c],i)=>`<${c?'a':'div'} class="foundation-row" ${c?`href="${c}"`:''}><span>${String(i+1).padStart(2,'0')}</span><div><h3>${a}</h3><p>${b}</p></div><strong>${c?'Abrir →':'Em breve'}</strong></${c?'a':'div'}>`).join('')}</div></section>
  <section class="doc-section"><div class="callout"><strong>Regra</strong><p>Primitive tokens guardam valores. Semantic tokens guardam intenção. Component tokens só existem quando uma decisão é específica de um componente.</p></div></section>`;
}

function colorsPage() {
  const pantone = officialPantoneExample;
  return `${pageHero('Colors', 'A página de cores sempre documenta paletas principais e secundárias, neutras, totalização Light/Dark, semântica, acessibilidade, o que não usar e aplicações em Brand, App e Web.', 'Foundation / Colors')}
  <section class="doc-section"><div class="callout"><strong>Formato obrigatório</strong><p>Cada cor precisa permitir copiar formatos de uso. HEX, RGB, RGBA, HSL, CMYK e tokens ficam disponíveis diretamente. Também mostramos snippets de App. Pantone só entra quando existir referência oficial — nunca por aproximação automática.</p></div></section>
  ${paletteSection('Paleta principal', 'As cores que carregam reconhecimento e prioridade visual. Devem ter papéis claros, não apenas valores.', primaryPalette)}
  ${paletteSection('Paleta secundária', 'Cores de apoio para expressão, comunicação, estados e campanhas sem disputar com a principal.', secondaryPalette)}
  ${paletteSection('Neutros', 'A maior parte das superfícies, textos e divisores. São essenciais para Light e Dark.', neutralPalette)}
  <section class="doc-section"><div class="section-heading"><div><p class="overline">Official reference</p><h2>Como tratar Pantone</h2></div><p>Quando o brand book oficial fornece Pantone, registramos exatamente a referência. Quando não fornece, o campo fica “não definido”.</p></div>
    <article class="pantone-example"><div class="pantone-swatch" style="background:${pantone.hex}"></div><div><h3>${pantone.name}</h3><p>Exemplo real de uma fonte oficial mostrando como o campo deve funcionar.</p></div><div class="copy-grid compact">${copyButton('HEX',pantone.hex)}${copyButton('RGB',pantone.rgb)}${copyButton('CMYK',pantone.cmyk)}${copyButton('Pantone',pantone.pantone)}</div><a href="${pantone.url}" target="_blank" rel="noreferrer">Fonte: ${pantone.source} ↗</a></article>
  </section>
  <section class="doc-section"><div class="section-heading"><div><p class="overline">Theme mapping</p><h2>Totalização Light & Dark</h2></div><p>O valor físico muda; o papel semântico permanece. Isso evita componentes amarrados diretamente a cores.</p></div>
    <div class="theme-preview-grid"><div class="theme-preview light-preview"><span>Light</span><div class="preview-panel"><strong>Surface</strong><p>Texto primário e secundário sobre superfícies claras.</p><button type="button">Primary action</button></div></div><div class="theme-preview dark-preview"><span>Dark</span><div class="preview-panel"><strong>Surface</strong><p>O mesmo papel semântico com valores adaptados ao contexto escuro.</p><button type="button">Primary action</button></div></div></div>
    <div class="semantic-table"><div class="semantic-head"><span>Token</span><span>Light</span><span>Dark</span><span>Função</span></div>${semanticThemes.map(row=>`<div class="semantic-row"><code>${row.token}</code><button type="button" data-copy="${row.light}"><i style="background:${row.light}"></i>${row.light}</button><button type="button" data-copy="${row.dark}"><i style="background:${row.dark}"></i>${row.dark}</button><span>${row.role}</span></div>`).join('')}</div>
  </section>
  <section class="doc-section"><div class="section-heading"><div><p class="overline">Do / Don't</p><h2>Cores que não devem ser usadas</h2></div><p>Não basta dizer “não”. O manual precisa mostrar visualmente o problema e explicar por quê.</p></div><div class="do-dont-grid"><article class="guideline-card bad"><strong>Não use</strong><div class="bad-contrast-demo">Texto com contraste insuficiente</div><h3>Baixo contraste</h3><p>Evite pares onde texto, ícone ou borda perdem legibilidade. Valide cada modo e estado.</p></article><article class="guideline-card bad"><strong>Não use</strong><div class="rainbow-demo"></div><h3>Todas as cores ao mesmo tempo</h3><p>Cores secundárias precisam de papel. Saturação sem hierarquia enfraquece a marca e a interface.</p></article><article class="guideline-card good"><strong>Use</strong><div class="hierarchy-demo"><span></span><button>CTA</button></div><h3>Hierarquia controlada</h3><p>Neutros sustentam a maior parte da interface; a cor principal chama atenção para decisões prioritárias.</p></article><article class="guideline-card good"><strong>Use</strong><div class="semantic-demo"><b>✓</b><span>Alterações salvas</span></div><h3>Cor + outra pista</h3><p>Status não deve depender apenas da cor. Combine com texto, ícone, forma ou padrão.</p></article></div></section>
  <section class="doc-section"><div class="section-heading"><div><p class="overline">Applications</p><h2>Exemplos de aplicação</h2></div><p>A mesma identidade precisa funcionar em expressão de marca, interfaces de App e experiências Web.</p></div><div class="application-grid"><article class="application-card brand-application"><div class="application-art"><h3>Build what matters.</h3><p>Uso expressivo de gradiente e paleta secundária.</p></div><strong>Brand</strong><p>Campanhas, social, apresentações, eventos e storytelling.</p></article><article class="application-card app-application"><div class="phone-preview"><div class="phone-bar"></div><h4>Good morning</h4><div class="phone-card"><span>Balance</span><strong>$12,480</strong></div><button>Continue</button></div><strong>App</strong><p>Primary em ações importantes, surfaces como base e cores semânticas em feedbacks.</p></article><article class="application-card web-application"><div class="browser-preview"><div class="browser-bar"></div><h4>Design with clarity.</h4><p>Superfícies neutras deixam o conteúdo respirar.</p><button>Get started</button></div><strong>Web</strong><p>Contraste, reflow, hover/focus e responsividade precisam ser documentados junto da cor.</p></article></div></section>
  <section class="doc-section"><div class="section-heading"><div><p class="overline">Accessibility</p><h2>Critérios mínimos</h2></div><p>O template registra requisitos, mas cada marca ainda precisa testar os pares finais que escolher.</p></div><div class="metrics-grid"><article><strong>4.5:1</strong><span>Texto comum · WCAG AA</span></article><article><strong>3:1</strong><span>Texto grande · WCAG AA</span></article><article><strong>3:1</strong><span>Componentes e gráficos relevantes</span></article><article><strong>Light + Dark</strong><span>Testar ambos os modos</span></article></div></section>
  ${referenceSection('colors')}`;
}

function typographyPage() {
  return `${pageHero('Typography', 'Tipografia expressa personalidade no Brand e precisa continuar legível, escalável e previsível em App e Web.', 'Foundation / Typography')}
  <section class="doc-section"><div class="section-heading"><div><h2>Famílias</h2></div><p>O padrão diferencia tipografia expressiva de tipografia de leitura e UI.</p></div><div class="type-family-grid"><article><span>Brand / Display</span><h3 class="display-sample">A brand should sound like itself.</h3><p>Use a família expressiva em momentos de marca, nunca como desculpa para comprometer legibilidade.</p></article><article><span>Product / UI</span><h3 class="ui-sample">Readable at every size.</h3><p>App e Web priorizam leitura, suporte a idiomas, pesos adequados e adaptação de tamanho.</p></article></div></section>
  <section class="doc-section"><div class="section-heading"><div><h2>Escala de exemplo</h2></div><p>Tamanhos são ponto de partida. O sistema final precisa considerar plataforma, viewport e conteúdo.</p></div><div class="type-scale">${typographyScale.map(t=>`<div class="type-row"><span>${t.name}</span><p style="font-size:${t.size};line-height:${t.line};font-weight:${t.weight}">Aa</p><code>${t.size} / ${t.line} · ${t.weight}</code><small>${t.use}</small></div>`).join('')}</div></section>
  <section class="doc-section"><div class="do-dont-grid"><article class="guideline-card good"><strong>Faça</strong><h3>Preserve hierarquia quando o texto cresce.</h3><p>Evite alturas fixas, permita wrapping e valide conteúdo longo e localização.</p></article><article class="guideline-card bad"><strong>Evite</strong><h3>Peso muito fino em texto pequeno.</h3><p>Fontes leves podem perder legibilidade mesmo quando o tamanho nominal parece adequado.</p></article></div></section>
  ${referenceSection('typography')}`;
}

function componentsPage() {
  return `${pageHero('Components', 'Componentes transformam foundations em comportamento reutilizável. A documentação precisa mostrar anatomy, variantes, estados, tokens, acessibilidade e diferenças entre plataformas.', 'Design system / Components')}
  <section class="doc-section"><div class="section-heading"><div><h2>Button · exemplo</h2></div><p>Um componente nunca é só o estado default.</p></div><div class="component-stage"><div class="button-states"><button class="demo-btn primary">Primary</button><button class="demo-btn primary hover-state">Hover</button><button class="demo-btn secondary">Secondary</button><button class="demo-btn danger">Danger</button><button class="demo-btn primary" disabled>Disabled</button></div><div class="anatomy"><span>01 Container</span><span>02 Label</span><span>03 Optional icon</span><span>04 Focus ring</span></div></div></section>
  <section class="doc-section"><div class="component-spec-grid"><article><h3>Variants</h3><p>Primary, secondary, tertiary, danger, ghost, icon-only quando necessário.</p></article><article><h3>States</h3><p>Default, hover, pressed, focus, selected, loading e disabled.</p></article><article><h3>Tokens</h3><p>Cor, radius, spacing, typography e motion ligados a semantic/component tokens.</p></article><article><h3>Accessibility</h3><p>Nome acessível, foco visível, contraste, alvo de toque e comportamento de teclado.</p></article></div></section>
  ${referenceSection('components')}`;
}

function appPage() {
  return `${pageHero('App', 'A marca entra no App sem substituir os padrões da plataforma. A documentação precisa explicar onde expressar identidade e onde seguir convenções nativas.', 'Product / App')}
  <section class="doc-section"><div class="platform-grid"><article><span>iOS / iPadOS</span><h3>Branding que respeita o sistema</h3><p>Safe areas, Dynamic Type, system behaviors e controles familiares têm prioridade. A marca aparece em cor, conteúdo, tipografia cuidadosamente escolhida, mídia e momentos expressivos.</p></article><article><span>Android</span><h3>Roles em vez de valores soltos</h3><p>Mapeie primary, secondary, tertiary, surface, containers e “on-colors” para o tema; documente diferenças Light/Dark e estados.</p></article></div></section>
  <section class="doc-section"><div class="section-heading"><div><h2>Checklist de cada padrão App</h2></div><p>Para cada navegação, formulário ou componente importante.</p></div><div class="check-list">${['Objetivo e contexto de uso','Anatomy','Variações por plataforma','Estados e gestos','Light / Dark','Dynamic Type / escala de texto','Safe areas e orientação','Acessibilidade','Do / Don’t','Exemplo real em tela'].map(x=>`<div><span>✓</span>${x}</div>`).join('')}</div></section>
  ${referenceSection('app')}`;
}

function webPage() {
  return `${pageHero('Web', 'Web precisa funcionar com mouse, toque, teclado, zoom, diferentes viewports e tecnologias assistivas. A página documenta comportamento, não só layout.', 'Product / Web')}
  <section class="doc-section"><div class="metrics-grid web-metrics"><article><strong>320 CSS px</strong><span>Reflow sem perda de informação ou funcionalidade.</span></article><article><strong>24 × 24</strong><span>Alvo mínimo WCAG 2.2 ou espaçamento equivalente.</span></article><article><strong>4.5:1</strong><span>Contraste mínimo para texto comum.</span></article><article><strong>Keyboard</strong><span>Foco visível e fluxo operável por teclado.</span></article></div></section>
  <section class="doc-section"><div class="section-heading"><div><h2>Breakpoints são comportamento</h2></div><p>Não documente apenas larguras. Mostre o que muda: colunas, prioridade, navegação, densidade, sticky behavior e ordem de leitura.</p></div><div class="responsive-demo"><div class="viewport desktop"><span>Desktop</span><i></i><i></i><i></i></div><div class="viewport tablet"><span>Tablet</span><i></i><i></i></div><div class="viewport mobile"><span>Mobile</span><i></i></div></div></section>
  <section class="doc-section"><div class="check-list">${['Semântica HTML e ordem de leitura','Hover + focus + active + disabled','Reflow e zoom','Touch targets','Reduced motion','Text spacing overrides','Dark mode quando suportado','Loading / empty / error states','Performance de mídia e assets','Acessibilidade automatizada + manual'].map(x=>`<div><span>✓</span>${x}</div>`).join('')}</div></section>
  ${referenceSection('web')}`;
}

function assetsPage() {
  return `${pageHero('Assets', 'Ativos precisam ser fáceis de encontrar, escolher e exportar sem abrir espaço para versões não aprovadas da marca.', 'Brand / Assets')}
  <section class="doc-section"><div class="asset-grid"><article><div class="asset-preview logo-preview">BD</div><h3>Logo</h3><p>SVG para digital, PNG quando necessário e formatos de impressão aprovados.</p><code>brand-logo-primary.svg</code></article><article><div class="asset-preview icon-preview">◇</div><h3>Iconography</h3><p>Arquivos vetoriais com grid, stroke e naming coerentes.</p><code>icon-arrow-right-24.svg</code></article><article><div class="asset-preview image-preview"></div><h3>Imagery</h3><p>Direção, crop, tratamento, formatos e direitos de uso.</p><code>campaign-hero-16x9.webp</code></article></div></section>
  <section class="doc-section"><div class="section-heading"><div><h2>Naming</h2></div><p>O nome do arquivo deve explicar o que ele é antes de alguém precisar abrir.</p></div><pre class="code-block">[brand]-[asset]-[variant]-[theme]-[size].[ext]\nacme-logo-horizontal-dark.svg\nacme-icon-search-24.svg\nacme-social-launch-square.webp</pre></section>
  ${referenceSection('assets')}`;
}

const pages = { overview: overviewPage, brand: brandPage, foundations: foundationsPage, colors: colorsPage, typography: typographyPage, components: componentsPage, app: appPage, web: webPage, assets: assetsPage };

function titleFor(id) { return navGroups.flatMap(g=>g.pages).find(p=>p.id===id)?.label || 'Overview'; }

function render() {
  const id = route();
  pageTitle.textContent = titleFor(id);
  document.title = `${titleFor(id)} · Brand & Design System`;
  app.innerHTML = pages[id]();
  renderNav(navSearch.value);
  app.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'instant' });
}

async function copy(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const area = document.createElement('textarea'); area.value = value; document.body.append(area); area.select(); document.execCommand('copy'); area.remove();
  }
  toast.textContent = `Copiado: ${value}`;
  toast.classList.add('show');
  clearTimeout(copy.timeout); copy.timeout = setTimeout(()=>toast.classList.remove('show'), 1600);
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-copy]');
  if (target) copy(target.dataset.copy);
});

window.addEventListener('hashchange', render);
navSearch.addEventListener('input', () => renderNav(navSearch.value));
menuButton.addEventListener('click', () => setDrawer(true));
drawerClose.addEventListener('click', () => setDrawer(false, true));
backdrop.addEventListener('click', () => setDrawer(false));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && document.body.classList.contains('nav-open')) setDrawer(false, true); });
mobileQuery.addEventListener('change', () => setDrawer(false));

themeButton.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('brand-docs-theme', next);
});

const saved = localStorage.getItem('brand-docs-theme');
if (saved === 'dark' || saved === 'light') document.documentElement.dataset.theme = saved;
setDrawer(false);
render();
