import { esc } from './brand-ui.js';

const tabSection = (title, intro, tabs, className = '') => `<section class="section visual-guideline ${className}">
  <div class="section-head"><div><p class="eyebrow">Visual guideline</p><h2>${esc(title)}</h2></div><p>${esc(intro)}</p></div>
  <div class="visual-tabs" role="tablist">${tabs.map(([id, label], index) => `<button type="button" class="visual-tab ${index === 0 ? 'active' : ''}" data-visual-tab="${id}" role="tab" aria-selected="${index === 0}">${esc(label)}</button>`).join('')}</div>
  ${tabs.map(([id, , content], index) => `<div class="visual-panel ${index === 0 ? 'active' : ''}" data-visual-panel="${id}">${content}</div>`).join('')}
</section>`;

const horizonMark = (mode = 'dark') => `<svg viewBox="0 0 160 160" role="img" aria-label="Símbolo de exemplo Horizonte"><circle cx="80" cy="80" r="60" fill="none" stroke="${mode === 'light' ? '#ffffff' : '#111827'}" stroke-width="10"/><path d="M26 87h108" stroke="${mode === 'light' ? '#ffffff' : '#2563EB'}" stroke-width="10" stroke-linecap="round"/><circle cx="80" cy="80" r="10" fill="${mode === 'light' ? '#ffffff' : '#F59E0B'}"/></svg>`;
const horizonLockup = (mode = 'dark') => `<div class="demo-lockup ${mode === 'light' ? 'light' : ''}">${horizonMark(mode)}<strong>HORIZONTE</strong></div>`;

const colorRamp = (name, colors) => `<div class="brand-ramp"><div class="brand-ramp-head"><strong>${esc(name)}</strong><span>${colors.length} tonalidades</span></div><div class="brand-ramp-swatches">${colors.map(([step, hex]) => `<div style="--swatch:${hex}"><i></i><span>${step}</span><code>${hex}</code></div>`).join('')}</div></div>`;
const colorCodes = (name, swatch, codes, use) => `<article class="color-code-card"><div class="color-code-swatch" style="--swatch:${swatch}"></div><div><small>${esc(name)}</small><h3>${esc(use)}</h3><dl>${codes.map(([label, value]) => `<div><dt>${label}</dt><dd><code>${esc(value)}</code></dd></div>`).join('')}</dl></div></article>`;

function visualIdentityGuide() {
  const logoPanel = `<div class="logo-system">
    <div class="logo-hero"><div>${horizonLockup()}</div><p><strong>Primary logo</strong><br>Use o lockup completo quando a marca ainda precisa ser identificada pelo nome.</p></div>
    <div class="logo-variants">
      <article><small>Primary</small>${horizonLockup()}</article>
      <article class="dark-demo"><small>Negative</small>${horizonLockup('light')}</article>
      <article><small>Symbol</small><div class="symbol-only">${horizonMark()}</div></article>
      <article class="mono-demo"><small>Monochrome</small>${horizonLockup()}</article>
    </div>
    <div class="logo-spec-grid">
      <article class="clear-space-demo"><small>Clear space</small><div class="clear-space-box"><span class="measure top">1×</span><span class="measure left">1×</span>${horizonLockup()}</div><p>Mantenha ao redor do logo uma área mínima equivalente à altura do círculo central do símbolo.</p></article>
      <article class="min-size-demo"><small>Minimum size</small><div><div class="min-lockup">${horizonLockup()}</div><span>120 px digital / 32 mm print</span></div><div><div class="min-symbol">${horizonMark()}</div><span>24 px digital / 8 mm print</span></div></article>
    </div>
    <div class="logo-backgrounds"><article class="bg-light">${horizonLockup()}</article><article class="bg-brand">${horizonLockup('light')}</article><article class="bg-photo"><div>${horizonLockup('light')}</div></article><article class="bg-bad"><div>${horizonLockup()}</div><span>Evitar baixo contraste</span></article></div>
  </div>`;

  const colorsPanel = `<div class="brand-color-system">
    ${colorRamp('Primary Blue', [['50','#EFF6FF'],['100','#DBEAFE'],['200','#BFDBFE'],['300','#93C5FD'],['400','#60A5FA'],['500','#3B82F6'],['600','#2563EB'],['700','#1D4ED8'],['800','#1E40AF'],['900','#1E3A8A'],['950','#172554']])}
    ${colorRamp('Warm Accent', [['50','#FFFBEB'],['100','#FEF3C7'],['200','#FDE68A'],['300','#FCD34D'],['400','#FBBF24'],['500','#F59E0B'],['600','#D97706'],['700','#B45309'],['800','#92400E'],['900','#78350F'],['950','#451A03']])}
    ${colorRamp('Black → White / Neutral', [['0','#FFFFFF'],['50','#F8FAFC'],['100','#F1F5F9'],['200','#E2E8F0'],['300','#CBD5E1'],['400','#94A3B8'],['500','#64748B'],['600','#475569'],['700','#334155'],['800','#1E293B'],['900','#0F172A'],['950','#020617']])}
    <div class="color-code-grid">
      ${colorCodes('Primary Blue · 600','#2563EB',[['HEX','#2563EB'],['RGB','37, 99, 235'],['RGBA','37, 99, 235, 1'],['HSL','221, 83%, 53%'],['CMYK','84, 58, 0, 8'],['OKLCH','62.3% 0.214 259.8'],['Pantone','Definir só se oficial']],'Reconhecimento + assinatura')}
      ${colorCodes('Neutral · 900','#0F172A',[['HEX','#0F172A'],['RGB','15, 23, 42'],['RGBA','15, 23, 42, 1'],['HSL','222, 47%, 11%'],['CMYK','64, 45, 0, 84'],['OKLCH','20.8% 0.042 265.8'],['Pantone','Definir só se oficial']],'Contraste + profundidade')}
      ${colorCodes('Warm Accent · 500','#F59E0B',[['HEX','#F59E0B'],['RGB','245, 158, 11'],['RGBA','245, 158, 11, 1'],['HSL','38, 92%, 50%'],['CMYK','0, 36, 96, 4'],['OKLCH','76.9% 0.188 70.1'],['Pantone','Definir só se oficial']],'Expressão controlada')}
    </div>
    <div class="color-usage"><div style="--p:52%"><span>Neutral</span><strong>52%</strong></div><div style="--p:37%"><span>Primary</span><strong>37%</strong></div><div style="--p:11%"><span>Supporting</span><strong>11%</strong></div><p>Exemplo de distribuição. Cada marca define sua própria proporção e pode variar por canal, campanha e fundo.</p></div>
  </div>`;

  const rulesPanel = `<div class="visual-rule-pairs">
    <article><div class="rule-good">${horizonLockup()}</div><strong>Faça</strong><p>Preserve proporção, contraste, clear space e versão correta para cada fundo.</p></article>
    <article><div class="rule-bad stretched">${horizonLockup()}</div><strong>Não faça</strong><p>Não comprima, rotacione, recolora arbitrariamente ou coloque em fundos que eliminem contraste.</p></article>
    <article><div class="rule-good color-pair"><i></i><i></i><i></i></div><strong>Faça</strong><p>Use cores com função e proporção clara; neutros podem carregar grande parte da composição.</p></article>
    <article><div class="rule-bad rainbow-pair"><i></i><i></i><i></i><i></i><i></i></div><strong>Não faça</strong><p>Não transforme a paleta de apoio em um arco-íris sem hierarquia.</p></article>
  </div>`;

  return tabSection('Logo e cor devem ser entendidos em segundos.','Mostre o ativo, as medidas, as variações, o contraste e os códigos diretamente na página. O texto explica a decisão; o visual prova como ela funciona.',[
    ['logo','Logo',logoPanel],['colors','Cores',colorsPanel],['rules','Do / Don’t',rulesPanel]
  ],'identity-visual-guide');
}

function typographyGuide() {
  const hierarchy = `<div class="type-specimen">
    <div class="type-display"><small>Display · 72 / 76 · Bold</small><p>Clareza muda o que você consegue fazer.</p></div>
    <div class="type-scale-table">
      ${[['H1','56 / 60','Bold','Decisões melhores começam aqui.'],['H2','40 / 46','Semibold','Entenda antes de avançar.'],['H3','28 / 34','Semibold','Uma ideia por seção.'],['Body L','20 / 30','Regular','Use para introduções e textos editoriais com presença.'],['Body','16 / 26','Regular','Use para leitura longa, explicações e conteúdo institucional.'],['Caption','12 / 18','Medium','METADADOS, CRÉDITOS E LEGENDAS']].map(([role,size,weight,text])=>`<article><span>${role}</span><code>${size}</code><code>${weight}</code><p class="sample-${role.toLowerCase().replace(' ','-')}">${text}</p></article>`).join('')}
    </div>
  </div>`;
  const families = `<div class="font-family-showcase">
    <article class="plex-sans"><small>Primary brand typeface</small><h3>IBM Plex Sans</h3><p class="alphabet">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 &amp;!?@#</p><div class="weight-row"><span>Regular 400</span><strong>Medium 500</strong><b>Semibold 600</b><em>Bold 700</em></div></article>
    <article class="plex-serif"><small>Display typeface</small><h3>IBM Plex Serif</h3><p>Histórias, editoriais e momentos de contraste podem ganhar uma voz tipográfica diferente sem perder parentesco.</p></article>
    <article class="plex-mono"><small>Supporting typeface</small><h3>IBM Plex Mono</h3><p>DATA / CODE / SPEC / 0123456789</p></article>
  </div>`;
  const responsive = `<div class="type-responsive"><article><small>Desktop</small><div class="type-preview desktop"><h2>Headline</h2><p>56 px → 40 px → 16 px</p></div></article><article><small>Tablet</small><div class="type-preview tablet"><h2>Headline</h2><p>48 px → 34 px → 16 px</p></div></article><article><small>Mobile</small><div class="type-preview mobile"><h2>Headline</h2><p>36 px → 28 px → 16 px</p></div></article></div><div class="type-pairing"><div><span>Display</span><strong>Serif para expressão.</strong></div><div><span>Primary</span><strong>Sans para clareza.</strong></div><div><span>Supporting</span><strong>Mono para dados.</strong></div></div>`;
  return tabSection('Tipografia precisa parecer um specimen, não uma planilha.','Mostre famílias, pesos, alfabetos, hierarquia, tamanhos e combinações em uso real. As especificações ficam visíveis ao lado da própria amostra.',[
    ['hierarchy','Hierarquia',hierarchy],['families','Famílias',families],['responsive','Tamanhos',responsive]
  ],'typography-visual-guide');
}

const photo = (url, label, note, bad = false) => `<article class="photo-example ${bad ? 'bad' : ''}"><div style="background-image:url('${url}')"></div><span>${esc(label)}</span><p>${esc(note)}</p></article>`;
function photographyGuide() {
  const us = `<div class="photo-grid good-grid">
    ${photo('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=82','Pessoas em ação','Interação real, contexto visível e composição com espaço para respirar.')}
    ${photo('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=82','Contexto humano','Momento plausível, luz natural e sensação de participação, não de pose.')}
    ${photo('https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=82','Ambiente com intenção','O espaço ajuda a contar a história sem virar cenário genérico.')}
  </div><div class="photo-direction-strip"><span>Luz natural</span><span>Foco claro</span><span>Cor controlada</span><span>Textura real</span><span>Diversidade contextual</span></div>`;
  const notUs = `<div class="photo-grid bad-grid">
    ${photo('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=82','Pose genérica','Evite símbolos corporativos óbvios que não contam nada específico.',true)}
    ${photo('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=82','Tratamento excessivo','Evite filtros fortes, HDR e saturação que eliminem naturalidade.',true)}
    ${photo('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=82','Cenário vazio','Evite imagens bonitas mas desconectadas de audiência, ação ou mensagem.',true)}
  </div><p class="asset-disclosure">Imagens demonstrativas via Unsplash. Em um projeto real, substitua pelo acervo oficial/licenciado da marca e registre direitos, releases e validade.</p>`;
  const anatomy = `<div class="photo-anatomy"><div class="photo-frame-anatomy"><div class="thirds"><i></i><i></i><i></i><i></i></div><div class="focus-dot"></div></div><div class="photo-anatomy-copy"><h3>Anatomia da fotografia</h3><dl><div><dt>Subject</dt><dd>Pessoa ou objeto executando uma ação real.</dd></div><div><dt>Framing</dt><dd>Use 1/3, 1/2 ou 2/3 do frame para posicionar o foco.</dd></div><div><dt>Light</dt><dd>Direcional, natural ou controlada; sem apagar textura.</dd></div><div><dt>Emotion</dt><dd>Coerente com o momento; nunca performática por padrão.</dd></div><div><dt>Color</dt><dd>Tratamento consistente, preservando tons de pele.</dd></div></dl></div></div>`;
  return tabSection('Uma pessoa deve reconhecer “isso é a marca” antes do logo.','A direção fotográfica precisa ser aprendida visualmente: exemplos positivos, contraexemplos, composição, luz, foco e tratamento.',[
    ['us','This is us',us],['not','This isn’t us',notUs],['anatomy','Anatomia',anatomy]
  ],'photography-visual-guide');
}

const illustrationSvg = type => {
  if (type === 'line') return `<svg viewBox="0 0 420 250" aria-label="Exemplo de ilustração line"><path d="M40 180 C80 80,150 210,210 95 S330 50,380 155" fill="none" stroke="#2563EB" stroke-width="8" stroke-linecap="round"/><circle cx="98" cy="112" r="34" fill="none" stroke="#0F172A" stroke-width="8"/><rect x="245" y="88" width="84" height="84" rx="22" fill="none" stroke="#F59E0B" stroke-width="8"/></svg>`;
  if (type === 'flat') return `<svg viewBox="0 0 420 250" aria-label="Exemplo de ilustração flat"><rect x="35" y="45" width="160" height="160" rx="42" fill="#2563EB"/><circle cx="278" cy="120" r="78" fill="#F59E0B"/><path d="M185 208 350 48v160Z" fill="#0F172A"/></svg>`;
  return `<svg viewBox="0 0 420 250" aria-label="Exemplo de ilustração isométrica"><path d="m210 35 130 70-130 70-130-70Z" fill="#DBEAFE"/><path d="m80 105 130 70v48L80 153Z" fill="#2563EB"/><path d="m340 105-130 70v48l130-70Z" fill="#1D4ED8"/><circle cx="210" cy="104" r="38" fill="#F59E0B"/></svg>`;
};
function illustrationGuide() {
  const styles = `<div class="illustration-grid"><article><small>Line</small>${illustrationSvg('line')}<p>Traço consistente, formas simples, espaço negativo ativo.</p></article><article><small>Flat</small>${illustrationSvg('flat')}<p>Massas de cor claras, poucas camadas, leitura rápida.</p></article><article><small>Isometric</small>${illustrationSvg('iso')}<p>Perspectiva única e controlada para cenas mais narrativas.</p></article></div>`;
  const recipe = `<div class="illustration-recipe">${[['Formas','Geometria simples + curvas controladas'],['Traços','Peso consistente e terminais coerentes'],['Perspectiva','Uma lógica por cena'],['Personagens','Diversidade observada, sem caricatura'],['Cores','Paleta de marca + apoio limitado'],['Sombras','Poucas, com direção definida'],['Fundos','Servem a hierarquia, não competem'],['Texturas','Sistema recorrente e reproduzível']].map(([a,b])=>`<article><span>${a}</span><strong>${b}</strong></article>`).join('')}</div>`;
  const compare = `<div class="visual-rule-pairs"><article><div class="illustration-compare good">${illustrationSvg('flat')}</div><strong>This is us</strong><p>Mesma geometria, mesma paleta e mesma lógica de composição.</p></article><article><div class="illustration-compare bad">${illustrationSvg('iso')}</div><strong>This isn’t us</strong><p>Não misture perspectiva, traço e acabamento aleatoriamente entre peças da mesma família.</p></article></div>`;
  return tabSection('Ilustração precisa ter uma receita reproduzível.','Mostre o estilo em cena, decomponha sua construção e compare o que pertence ou não pertence à família visual.',[
    ['styles','Estilos',styles],['recipe','Receita visual',recipe],['compare','This is / isn’t',compare]
  ],'illustration-visual-guide');
}

const iconSvg = (path, size=32) => `<svg width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true"><path d="${path}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
function iconographyGuide() {
  const icons = [
    ['M6 16h20M18 8l8 8-8 8','Arrow'],['M7 25V12l9-6 9 6v13H7Z M12 25v-8h8v8','Home'],['M8 9h16v14H8z M8 13h16','Window'],['M16 5v22M5 16h22','Add'],['M8 8l16 16M24 8 8 24','Close'],['M7 19c4 0 4-6 9-6s5 6 9 6','Wave']
  ];
  const library = `<div class="icon-library-visual">${icons.map(([path,label])=>`<article>${iconSvg(path)}<span>${label}</span></article>`).join('')}</div><div class="icon-sizes-visual">${[16,20,24,32].map(size=>`<div>${iconSvg('M6 16h20M18 8l8 8-8 8',size)}<span>${size}px</span></div>`).join('')}</div>`;
  const grid = `<div class="icon-grid-spec"><div class="grid-canvas"><div class="grid-lines"></div>${iconSvg('M7 25V12l9-6 9 6v13H7Z M12 25v-8h8v8',220)}</div><dl><div><dt>Master grid</dt><dd>32 × 32</dd></div><div><dt>Padding</dt><dd>2 px</dd></div><div><dt>Live area</dt><dd>28 px</dd></div><div><dt>Stroke</dt><dd>2 px</dd></div><div><dt>Corners</dt><dd>Rounded controlled</dd></div><div><dt>Optical balance</dt><dd>Ajustes permitidos</dd></div></dl></div>`;
  const compare = `<div class="icon-compare"><article><div>${iconSvg('M7 25V12l9-6 9 6v13H7Z M12 25v-8h8v8',96)}${iconSvg('M6 16h20M18 8l8 8-8 8',96)}</div><strong>Consistente</strong><p>Mesmo grid, stroke, terminais e peso óptico.</p></article><article class="bad"><div><svg width="96" height="96" viewBox="0 0 32 32"><path d="M4 27 16 2l12 25Z" fill="none" stroke="currentColor" stroke-width="5"/></svg><svg width="96" height="96" viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" fill="currentColor"/></svg></div><strong>Inconsistente</strong><p>Misturar peso, fill e construção sem uma regra quebra a família.</p></article></div>`;
  return tabSection('O grid deve ficar visível para ensinar construção.','Mostre a família, os tamanhos de referência, o master grid, padding, stroke, cantos e exemplos de equilíbrio óptico.',[
    ['library','Família',library],['grid','Grid & spec',grid],['compare','Optical QA',compare]
  ],'iconography-visual-guide');
}

function graphicLanguageGuide() {
  const signals = `<div class="graphic-signals"><article class="signal-shape"><i></i><strong>Shape</strong><span>recorte diagonal</span></article><article class="signal-pattern"><i></i><strong>Pattern</strong><span>ritmo modular</span></article><article class="signal-gradient"><i></i><strong>Gradient</strong><span>profundidade controlada</span></article><article class="signal-mask"><i></i><strong>Mask</strong><span>enquadramento recorrente</span></article><article class="signal-line"><i></i><strong>Line</strong><span>assinatura direcional</span></article></div>`;
  const composition = `<div class="brand-without-logo"><div class="brand-poster"><div class="poster-line"></div><div class="poster-shape"></div><div class="poster-copy"><small>INSIGHT 01</small><strong>Clareza<br>em movimento.</strong><p>Sem logo. Ainda deve parecer da marca.</p></div></div><div class="recognition-check"><h3>Teste de reconhecimento</h3><ol><li>Remova o logo.</li><li>Mantenha tipografia, paleta e dispositivo gráfico.</li><li>Peça para alguém identificar a família visual.</li><li>Se depender do logo, o sistema ainda está fraco.</li></ol></div></div>`;
  const system = `<div class="graphic-system-board"><div class="system-a"></div><div class="system-b"></div><div class="system-c"></div><div class="system-d"></div><div class="system-e"></div><div class="system-f"></div></div><p class="system-caption">O mesmo vocabulário precisa funcionar em capa, social, apresentação, campanha e peça institucional sem virar uma coleção de efeitos.</p>`;
  return tabSection('A marca precisa sobreviver sem o logo.','Visualize shapes, patterns, frames, linhas, texturas, gradientes e assinaturas como uma gramática combinável — não como decoração aleatória.',[
    ['signals','Sinais',signals],['recognition','Sem logo',composition],['system','Sistema',system]
  ],'graphic-language-visual-guide');
}

function layoutGuide() {
  const grids = `<div class="layout-grid-showcase">${[['Social','4 colunas','1:1'],['Advertising','6 colunas','2:1'],['Presentation','12 colunas','16:9'],['Landing page','12 colunas','Vertical'],['Institutional','8 colunas','A4 / editorial']].map(([name,cols,ratio],i)=>`<article><header><strong>${name}</strong><span>${cols} · ${ratio}</span></header><div class="layout-mini grid-${i+1}"><i></i><i></i><i></i><i></i><div class="layout-copy"><b>Headline</b><p>Texto e imagem compartilham a mesma estrutura.</p></div></div></article>`).join('')}</div>`;
  const whitespace = `<div class="layout-principles-visual"><article><span>01</span><h3>Um foco dominante</h3><div class="focus-layout"><i></i><b>Mensagem</b></div></article><article><span>02</span><h3>Whitespace é ativo</h3><div class="space-layout"><b>Conteúdo</b></div></article><article><span>03</span><h3>Alinhamento cria assinatura</h3><div class="align-layout"><i></i><i></i><i></i></div></article><article><span>04</span><h3>Densidade muda por canal</h3><div class="density-layout"><i></i><i></i><i></i><i></i><i></i></div></article></div>`;
  const gridSpec = `<div class="editorial-grid-spec"><div class="grid-sheet"><div class="columns"></div><div class="baseline"></div><div class="grid-content"><small>12 COL / 24 GUTTER</small><h3>Estrutura antes<br>da decoração.</h3><p>Alinhamento recorrente permite que campanhas mudem de conteúdo sem perder comportamento espacial.</p></div></div><dl><div><dt>Columns</dt><dd>12</dd></div><div><dt>Gutter</dt><dd>24</dd></div><div><dt>Margin</dt><dd>64</dd></div><div><dt>Base unit</dt><dd>8</dd></div><div><dt>Image ratios</dt><dd>16:9 / 4:3 / 1:1</dd></div></dl></div>`;
  return tabSection('Layout também é assinatura de marca.','Mostre grids, densidade, whitespace e composição em formatos reais. A pessoa deve entender como a marca ocupa o espaço, não apenas ler uma regra.',[
    ['contexts','Contextos',grids],['principles','Princípios',whitespace],['spec','Grid editorial',gridSpec]
  ],'layout-visual-guide');
}

function motionGuide() {
  const storyboard = `<div class="motion-storyboard">${[['00 ms','Focus','Elemento inicial estável'],['180 ms','Enter','Entrada direcional e previsível'],['420 ms','Transfer','Foco passa para a mensagem'],['760 ms','Resolve','Tempo suficiente para leitura']].map(([time,title,note],i)=>`<article><span>${time}</span><div class="motion-frame state-${i}"><i></i><b>A</b></div><strong>${title}</strong><p>${note}</p></article>`).join('')}<div class="motion-arrow">→</div></div>`;
  const spectrum = `<div class="motion-spectrum">${[['Calm',65],['Energetic',52],['Precise',88],['Playful',28],['Elegant',72],['Expressive',46]].map(([name,value])=>`<div><span>${name}</span><i><b style="width:${value}%"></b></i><strong>${value}</strong></div>`).join('')}</div>`;
  const doDont = `<div class="motion-rule-grid"><article><div class="motion-path good"><i></i></div><strong>Faça</strong><p>Movimento tem foco, direção e resolução claros.</p></article><article><div class="motion-path bad"><i></i><i></i><i></i></div><strong>Evite</strong><p>Nada se move só para parecer moderno ou chamar atenção ao mesmo tempo.</p></article></div>`;
  return tabSection('Motion precisa ser visível como sequência e ritmo.','Em vez de listar adjetivos, mostre storyboard, duração, direção, energia e guardrails que definem o caráter de movimento da marca.',[
    ['story','Storyboard',storyboard],['spectrum','Personalidade',spectrum],['rules','Do / Don’t',doDont]
  ],'motion-visual-guide');
}

function sonicGuide() {
  const wave = `<div class="sonic-wave"><div class="wave-bars">${[16,24,44,72,38,88,62,30,74,52,28,68,92,40,22,56,76,34,18].map(h=>`<i style="height:${h}%"></i>`).join('')}</div><div><small>Sonic logo · 1.8s</small><h3>Motivo curto, memorável e adaptável.</h3><p>O mesmo DNA deve poder aparecer em sound logo, brand score, evento, podcast e confirmações.</p></div></div>`;
  const architecture = `<div class="sonic-architecture">${[['Sonic DNA','Motivo / ritmo / timbre'],['Sound logo','1–3 segundos'],['Brand score','Versão expansível'],['Touchpoint cues','Sinais curtos'],['Voice','Presença humana ou sintética']].map(([a,b],i)=>`<article><span>0${i+1}</span><strong>${a}</strong><p>${b}</p></article>`).join('')}</div>`;
  return tabSection('Som também precisa ter uma arquitetura visível.','Mesmo sem áudio incorporado, a documentação deve mostrar duração, forma, família de sinais e onde cada expressão sonora entra.',[
    ['signature','Assinatura',wave],['architecture','Arquitetura',architecture]
  ],'sonic-visual-guide');
}

function experienceGuide() {
  const matrix = `<div class="experience-rail">${[['Website','Clareza','Type + image'],['Social','Proximidade','Voice + formats'],['Advertising','Memória','Big Idea + signature'],['Presentation','Autoridade','Grid + proof'],['Support','Confiança','Voice + behavior'],['Partnership','Equilíbrio','Co-brand rules']].map(([channel,priority,signal])=>`<article><strong>${channel}</strong><span>${priority}</span><p>${signal}</p><i></i></article>`).join('')}</div>`;
  const invariant = `<div class="experience-core"><div class="core-circle"><strong>Essência</strong><span>não muda</span></div>${[['Website','expressão 65%'],['Social','expressão 80%'],['Support','expressão 35%'],['Event','expressão 90%']].map(([name,note],i)=>`<article class="satellite sat-${i}"><strong>${name}</strong><span>${note}</span></article>`).join('')}</div>`;
  return tabSection('A essência fica; a intensidade muda.','Mostre visualmente como a mesma marca atravessa canais diferentes sem parecer outra empresa em cada ponto de contato.',[
    ['channels','Canais',matrix],['core','Invariáveis',invariant]
  ],'experience-visual-guide');
}

function brandInActionGuide() {
  const mockups = `<div class="brand-action-grid"><article class="mock-social"><div class="mock-brand-line"></div><small>@horizonte</small><h3>Veja claro.<br>Vá além.</h3><p>Uma ideia por frame.</p><footer>01 / Social</footer></article><article class="mock-outdoor"><div><small>OUTDOOR</small><h3>Entender muda tudo.</h3></div><span>HORIZONTE</span></article><article class="mock-presentation"><header>HORIZONTE / 2026</header><h3>Decisões melhores começam com contexto.</h3><div class="mock-chart"><i></i><i></i><i></i></div><footer>03 / Presentation</footer></article><article class="mock-web"><nav>HORIZONTE <span>Sobre · Método · Contato</span></nav><div><h3>Clareza para avançar.</h3><p>Transformamos complexidade em direção.</p><button>Conheça o método</button></div></article></div>`;
  const rationale = `<div class="application-rationale"><article><span>01</span><strong>Brief</strong><p>Objetivo, audiência, canal e contexto.</p></article><article><span>02</span><strong>Rules activated</strong><p>Quais princípios importam aqui.</p></article><article><span>03</span><strong>Decisions</strong><p>Mensagem, imagem, composição e ativos.</p></article><article><span>04</span><strong>Trade-offs</strong><p>O que foi reduzido, ampliado ou evitado.</p></article><article><span>05</span><strong>Result</strong><p>Aplicação final + aprendizado.</p></article></div>`;
  return tabSection('Mockup bonito não basta: mostre a regra em ação.','As aplicações finais precisam ensinar como a marca chegou ao resultado. Use contextos reais e evidencie mensagem, visual, hierarquia e trade-offs.',[
    ['applications','Aplicações',mockups],['rationale','Raciocínio',rationale]
  ],'brand-action-visual-guide');
}

export function moduleVisualGuide(module) {
  switch (module?.id) {
    case 'visual-brand-identity': return visualIdentityGuide();
    case 'typography': return typographyGuide();
    case 'photography': return photographyGuide();
    case 'illustration': return illustrationGuide();
    case 'iconography': return iconographyGuide();
    case 'graphic-language': return graphicLanguageGuide();
    case 'layout': return layoutGuide();
    case 'motion': return motionGuide();
    case 'sonic': return sonicGuide();
    case 'brand-experience': return experienceGuide();
    case 'brand-in-action': return brandInActionGuide();
    default: return '';
  }
}
