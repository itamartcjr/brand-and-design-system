export const references = {
  github_getting:{title:'GitHub Brand Toolkit — Getting started',url:'https://brand.github.com/guides/getting-started',kind:'Guideline',note:'Estrutura de uso, públicos, contextos e brand in action.'},
  github_attributes:{title:'GitHub Brand Toolkit — Brand attributes',url:'https://brand.github.com/brand-identity/attributes',kind:'Guideline',note:'Atributos traduzidos em decisões de copy e design.'},
  github_voice:{title:'GitHub Brand Toolkit — Voice & tone',url:'https://brand.github.com/brand-identity/voice-and-tone',kind:'Guideline',note:'Identidade verbal aplicada por audiência e contexto.'},
  github_logo:{title:'GitHub Brand Toolkit — Logo',url:'https://brand.github.com/foundations/logo',kind:'Assets',note:'Variações, contraste, uso incorreto e download de logos.'},
  github_foundations:{title:'GitHub Brand Toolkit — Foundations',url:'https://brand.github.com/foundations',kind:'Guideline',note:'Logo, tipografia, cor e acessibilidade de marca.'},
  github_graphic:{title:'GitHub Brand Toolkit — Graphic elements',url:'https://brand.github.com/graphic-elements',kind:'Guideline',note:'Ilustração, formas, grids, texturas, layouts e iconografia.'},
  github_icon:{title:'GitHub Brand Toolkit — Iconography',url:'https://brand.github.com/graphic-elements/iconography',kind:'Resource',note:'Iconografia como elemento estável e reconhecível da marca.'},
  github_cobrand:{title:'GitHub Brand Toolkit — Co-branding',url:'https://brand.github.com/brand-identity/cobranding',kind:'Guideline',note:'Hierarquia, aprovação, uso de logos e parcerias.'},
  github_pdf:{title:'GitHub Brand Guidelines 2026 — PDF',url:'https://brand.github.com/GitHub-BrandGuidelines-2026.pdf',kind:'Download',note:'Exemplo de guideline completo para download.'},
  ibm_philosophy:{title:'IBM Design Language',url:'https://www.ibm.com/design/language/',kind:'Reference',note:'Sistema de expressão de marca: filosofia, tipografia, cor, fotografia, ilustração e grid.'},
  ibm_resources:{title:'IBM Design Language — Resources',url:'https://www.ibm.com/design/language/resources',kind:'Downloads',note:'Ferramentas, assets, tipografia, paleta, ilustração, fotografia e animation.'},
  ibm_type:{title:'IBM Design Language — Typeface',url:'https://www.ibm.com/design/language/typography/typeface/',kind:'Guideline',note:'Typeface como elemento central de identidade e acesso ao IBM Plex.'},
  ibm_plex:{title:'IBM Plex — latest release',url:'https://github.com/IBM/plex/releases/latest',kind:'Font download',note:'Fonte oficial open source e release mais recente.'},
  ibm_photo:{title:'IBM Design Language — Photography',url:'https://www.ibm.com/design/language/photography/',kind:'Guideline',note:'Direção de fotografia e princípios de seleção.'},
  ibm_illustration:{title:'IBM Design Language — Illustration',url:'https://www.ibm.com/design/language/illustration/',kind:'Guideline',note:'Princípios e recursos para linguagem de ilustração.'},
  ibm_icon:{title:'IBM Design Language — Iconography',url:'https://www.ibm.com/design/language/iconography/',kind:'Guideline',note:'Consistência de ícones, pictogramas e recursos.'},
  ibm_motion:{title:'IBM Design Language — Animation',url:'https://www.ibm.com/design/language/animation/',kind:'Guideline',note:'Expressão de movimento e recursos de animation.'},
  mailchimp_principles:{title:'Mailchimp — Writing principles',url:'https://styleguide.mailchimp.com/writing-principles/',kind:'Guideline',note:'Princípios claros, úteis, humanos e apropriados.'},
  mailchimp_voice:{title:'Mailchimp — Voice and tone',url:'https://styleguide.mailchimp.com/voice-and-tone/',kind:'Guideline',note:'Diferença entre voz estável e tom adaptado ao contexto.'},
  mailchimp_grammar:{title:'Mailchimp — Grammar and mechanics',url:'https://styleguide.mailchimp.com/grammar-and-mechanics/',kind:'Guideline',note:'House style, capitalização, gramática, jargon e consistência.'},
  mailchimp_social:{title:'Mailchimp — Writing for social media',url:'https://styleguide.mailchimp.com/writing-for-social-media/',kind:'Guideline',note:'Aplicação da voz em redes sociais.'},
  mailchimp_structured:{title:'Mailchimp — Structured content',url:'https://styleguide.mailchimp.com/creating-structured-content/',kind:'Guideline',note:'Conteúdo modular e reutilizável baseado em templates.'},
  mailchimp_people:{title:'Mailchimp — Writing about people',url:'https://styleguide.mailchimp.com/writing-about-people/',kind:'Guideline',note:'Linguagem inclusiva e person-first.'},
  intercom_jtbd:{title:'Intercom — Jobs to be Done',url:'https://www.intercom.com/blog/jobs-to-be-done/',kind:'Method',note:'Público orientado a progresso, contexto e comportamento.'},
  microsoft_jtbd:{title:'Microsoft — Human-centered design resources',url:'https://inclusive.microsoft.design/',kind:'Toolkit',note:'Pesquisa, inclusão e contexto de uso como inputs de decisão.'},
  google_fonts:{title:'Google Fonts',url:'https://fonts.google.com/',kind:'Font library',note:'Biblioteca oficial para pesquisar e obter fontes com informações de família e licença.'},
  openai_prompt:{title:'OpenAI Developers — Prompting best practices',url:'https://developers.openai.com/api/docs/guides/latest-model',kind:'AI reference',note:'Orientação oficial atual para prompts claros, concisos e avaliáveis.'},
  openai_dev:{title:'OpenAI Developers',url:'https://developers.openai.com/',kind:'AI resource',note:'Documentação e guias oficiais para uso de modelos e geração.'},
  wcag:{title:'W3C — WCAG 2.2',url:'https://www.w3.org/TR/WCAG22/',kind:'Accessibility',note:'Referência para acessibilidade também em materiais digitais de marca.'},
  w3c_plain:{title:'W3C — Writing for Web Accessibility',url:'https://www.w3.org/WAI/tips/writing/',kind:'Accessibility',note:'Princípios de escrita compreensível e inclusiva.'}
};

export const moduleResources = {
  '05':['mailchimp_voice','mailchimp_principles','mailchimp_grammar','mailchimp_social','mailchimp_people'],
  '08':['github_logo','github_foundations','github_cobrand','github_pdf','ibm_resources'],
  '09':['ibm_type','ibm_plex','google_fonts'],
  '10':['ibm_photo','ibm_resources'],
  '11':['ibm_illustration','ibm_resources'],
  '12':['github_icon','ibm_icon','ibm_resources'],
  '13':['github_graphic','ibm_philosophy'],
  '14':['github_graphic','ibm_philosophy'],
  '15':['ibm_motion','ibm_resources'],
  '19':['openai_prompt','openai_dev'],
  '20':['github_getting','mailchimp_structured']
};

export const frameworkResources = ['github_getting','github_pdf','ibm_resources','ibm_plex','google_fonts','mailchimp_voice','mailchimp_structured','openai_prompt','wcag'];
