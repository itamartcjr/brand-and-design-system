export const references = {
  brand: [
    { label: 'GitHub Brand Toolkit — Getting started', url: 'https://brand.github.com/guides/getting-started', note: 'Estrutura de brand toolkit, contexto de uso e exemplos em ação.' },
    { label: 'GitHub Brand Toolkit — Brand identity', url: 'https://brand.github.com/brand-identity', note: 'Atributos, voz e tom como parte explícita da identidade.' },
    { label: 'Mailchimp — Brand assets', url: 'https://mailchimp.com/pt-br/about/brand-assets/', note: 'Logo, cor principal, usos corretos e incorretos.' },
    { label: 'Apple HIG — Branding', url: 'https://developer.apple.com/design/human-interface-guidelines/branding', note: 'Equilíbrio entre expressão da marca, conteúdo e padrões da plataforma.' }
  ],
  colors: [
    { label: 'GitHub Brand Toolkit — Color', url: 'https://brand.github.com/foundations/color', note: 'Paleta primária, valores digitais/impressos e referência Pantone quando oficial.' },
    { label: 'Apple HIG — Color', url: 'https://developer.apple.com/design/human-interface-guidelines/color', note: 'Light/dark, cores semânticas, contraste e uso inclusivo.' },
    { label: 'Material 3 — Color theming', url: 'https://github.com/material-components/material-components-android/blob/master/docs/theming/Color.md', note: 'Primary, secondary, tertiary, containers e surface roles.' },
    { label: 'Adobe Spectrum — Color system', url: 'https://spectrum.adobe.com/page/color-system/', note: 'Escalas, temas e semântica de cor.' },
    { label: 'IBM Carbon — Color', url: 'https://v10.carbondesignsystem.com/guidelines/color/overview/', note: 'Tokens por função e temas.' },
    { label: 'WCAG 2.2 — Contrast minimum', url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum', note: '4.5:1 para texto comum e 3:1 para texto grande.' },
    { label: 'WCAG 2.2 — Non-text contrast', url: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast', note: '3:1 para componentes e gráficos relevantes.' }
  ],
  typography: [
    { label: 'Apple HIG — Typography', url: 'https://developer.apple.com/design/human-interface-guidelines/typography', note: 'Legibilidade, hierarquia, custom fonts e escalabilidade.' },
    { label: 'WCAG 2.2 — Text spacing', url: 'https://www.w3.org/WAI/WCAG22/Understanding/text-spacing', note: 'Conteúdo precisa suportar overrides de espaçamento sem perda.' },
    { label: 'GitHub Brand Toolkit — Typography', url: 'https://brand.github.com/foundations', note: 'Tipografia como foundation da identidade.' }
  ],
  components: [
    { label: 'Apple HIG — Components', url: 'https://developer.apple.com/design/human-interface-guidelines/components/', note: 'Consistência e familiaridade no uso de componentes de plataforma.' },
    { label: 'Material 3 — Color roles in components', url: 'https://developer.android.com/codelabs/m3-design-theming', note: 'Hierarquia visual por roles e estados.' },
    { label: 'Adobe Spectrum — Design tokens', url: 'https://spectrum.adobe.com/page/design-tokens/', note: 'Tokens globais, aliases e tokens específicos de componentes.' }
  ],
  app: [
    { label: 'Apple HIG — Layout', url: 'https://developer.apple.com/design/human-interface-guidelines/layout', note: 'Safe areas, hierarquia, adaptação e organização.' },
    { label: 'Apple HIG — Accessibility', url: 'https://developer.apple.com/design/human-interface-guidelines/accessibility', note: 'Dynamic Type, contraste e legibilidade.' },
    { label: 'Material 3 — Accessible theming', url: 'https://developer.android.com/codelabs/m3-design-theming', note: 'Roles semânticos e superfícies para Android.' }
  ],
  web: [
    { label: 'WCAG 2.2 — Reflow', url: 'https://www.w3.org/WAI/WCAG21/Understanding/reflow', note: 'Conteúdo deve funcionar em viewport equivalente a 320 CSS px sem scroll bidimensional.' },
    { label: 'WCAG 2.2 — Target size', url: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum', note: 'Alvos de ponteiro com pelo menos 24×24 CSS px ou espaçamento equivalente.' },
    { label: 'WCAG 2.2 — Contrast', url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum', note: 'Contraste mínimo de texto.' },
    { label: 'WCAG 2.2 — Text spacing', url: 'https://www.w3.org/WAI/WCAG22/Understanding/text-spacing', note: 'Resiliência a ajustes de tipografia feitos pelo usuário.' }
  ],
  assets: [
    { label: 'GitHub Brand Toolkit — Logo', url: 'https://brand.github.com/foundations/logo', note: 'Variações, legibilidade, contraste e lockups.' },
    { label: 'Mailchimp — Brand assets', url: 'https://mailchimp.com/pt-br/about/brand-assets/', note: 'Distribuição de ativos e usos incorretos.' }
  ]
};

export const primaryPalette = [
  { name: 'Blue 50', hex: '#EFF6FF', token: '--brand-blue-50', role: 'Background tint' },
  { name: 'Blue 100', hex: '#DBEAFE', token: '--brand-blue-100', role: 'Soft surface' },
  { name: 'Blue 300', hex: '#93C5FD', token: '--brand-blue-300', role: 'Decorative accent' },
  { name: 'Blue 500', hex: '#3B82F6', token: '--brand-blue-500', role: 'Brand accent' },
  { name: 'Blue 600', hex: '#2563EB', token: '--brand-blue-600', role: 'Primary action' },
  { name: 'Blue 700', hex: '#1D4ED8', token: '--brand-blue-700', role: 'Hover / emphasis' },
  { name: 'Blue 900', hex: '#1E3A8A', token: '--brand-blue-900', role: 'Dark brand surface' }
];

export const secondaryPalette = [
  { name: 'Violet 400', hex: '#A78BFA', token: '--brand-violet-400', role: 'Supporting accent' },
  { name: 'Violet 600', hex: '#7C3AED', token: '--brand-violet-600', role: 'Editorial expression' },
  { name: 'Pink 500', hex: '#EC4899', token: '--brand-pink-500', role: 'Campaign accent' },
  { name: 'Amber 500', hex: '#F59E0B', token: '--brand-amber-500', role: 'Notice / warmth' },
  { name: 'Emerald 500', hex: '#10B981', token: '--brand-emerald-500', role: 'Positive / success' }
];

export const neutralPalette = [
  { name: 'Neutral 0', hex: '#FFFFFF', token: '--neutral-0', role: 'Light surface' },
  { name: 'Neutral 50', hex: '#F8FAFC', token: '--neutral-50', role: 'Light background' },
  { name: 'Neutral 200', hex: '#E2E8F0', token: '--neutral-200', role: 'Light border' },
  { name: 'Neutral 500', hex: '#64748B', token: '--neutral-500', role: 'Secondary text' },
  { name: 'Neutral 800', hex: '#1E293B', token: '--neutral-800', role: 'Dark surface' },
  { name: 'Neutral 950', hex: '#0F172A', token: '--neutral-950', role: 'Dark background / strong text' }
];

export const officialPantoneExample = {
  name: 'GitHub Green — referência oficial',
  hex: '#0FBF3E',
  rgb: 'rgb(15, 191, 62)',
  cmyk: '92, 0, 67, 25',
  pantone: 'PANTONE 360',
  source: 'GitHub Brand Toolkit',
  url: 'https://brand.github.com/foundations/color'
};

export const semanticThemes = [
  { token: 'background', light: '#F8FAFC', dark: '#0B0D12', role: 'Fundo da página' },
  { token: 'surface', light: '#FFFFFF', dark: '#151821', role: 'Cards, sheets e containers' },
  { token: 'surface-subtle', light: '#F1F5F9', dark: '#1E2430', role: 'Estados sutis e grouping' },
  { token: 'border', light: '#E2E8F0', dark: '#303847', role: 'Divisores e contornos' },
  { token: 'text-primary', light: '#0F172A', dark: '#F8FAFC', role: 'Conteúdo de alta ênfase' },
  { token: 'text-secondary', light: '#64748B', dark: '#94A3B8', role: 'Conteúdo de apoio' },
  { token: 'interactive-primary', light: '#2563EB', dark: '#60A5FA', role: 'CTA e estado ativo' },
  { token: 'interactive-hover', light: '#1D4ED8', dark: '#93C5FD', role: 'Hover / pressed' },
  { token: 'positive', light: '#15803D', dark: '#4ADE80', role: 'Sucesso' },
  { token: 'negative', light: '#B91C1C', dark: '#F87171', role: 'Erro / perigo' }
];

export const typographyScale = [
  { name: 'Display', size: '64px', line: '68px', weight: '700', use: 'Hero e momentos expressivos' },
  { name: 'Heading 1', size: '44px', line: '50px', weight: '700', use: 'Título principal da página' },
  { name: 'Heading 2', size: '30px', line: '38px', weight: '680', use: 'Seções principais' },
  { name: 'Heading 3', size: '20px', line: '28px', weight: '650', use: 'Subseções e cards' },
  { name: 'Body', size: '16px', line: '25px', weight: '400', use: 'Leitura contínua' },
  { name: 'Small', size: '14px', line: '21px', weight: '400', use: 'Metadados e apoio' },
  { name: 'Label', size: '13px', line: '18px', weight: '650', use: 'Controles e navegação' }
];
