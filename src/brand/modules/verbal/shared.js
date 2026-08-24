export const refs={
  gh:{title:'GitHub Brand Toolkit — Voice & tone',url:'https://brand.github.com/brand-identity/voice-and-tone',kind:'Guideline',note:'Exemplo de voz ligada a atributos de marca, audiência e contexto.'},
  mailVoice:{title:'Mailchimp — Voice and Tone',url:'https://styleguide.mailchimp.com/voice-and-tone/',kind:'Guideline',note:'Distingue voz estável de tom contextual e considera o estado emocional da pessoa.'},
  mailPrinciples:{title:'Mailchimp — Writing Principles',url:'https://styleguide.mailchimp.com/writing-principles/',kind:'Guideline',note:'Princípios para conteúdo claro, útil, humano e apropriado.'},
  mailGrammar:{title:'Mailchimp — Grammar and Mechanics',url:'https://styleguide.mailchimp.com/grammar-and-mechanics/',kind:'Guideline',note:'House style para voz ativa, capitalização, abreviações e mecânica editorial.'},
  mailSocial:{title:'Mailchimp — Writing for Social Media',url:'https://styleguide.mailchimp.com/writing-for-social-media/',kind:'Guideline',note:'Aplicação da identidade verbal em contexto social.'},
  msVoice:{title:'Microsoft Writing Style Guide — Brand voice',url:'https://learn.microsoft.com/en-us/style-guide/brand-voice-above-all-simple-human',kind:'Guideline',note:'Voz constante com tom adaptável; simples, humana, clara e útil.'},
  msTop:{title:'Microsoft Writing Style Guide — Top 10 tips',url:'https://learn.microsoft.com/en-us/style-guide/top-10-tips-style-voice',kind:'Guideline',note:'Técnicas práticas para clareza, concisão e revisão.'},
  msBias:{title:'Microsoft Writing Style Guide — Bias-free communication',url:'https://learn.microsoft.com/en-us/style-guide/bias-free-communication',kind:'Accessibility',note:'Orientação para linguagem inclusiva e neutra.'},
  msGlobal:{title:'Microsoft Writing Style Guide — Global communications',url:'https://learn.microsoft.com/en-us/style-guide/global-communications/',kind:'Localization',note:'Escrita preparada para tradução, localização e públicos globais.'},
  govTone:{title:'GOV.UK — Use the right tone',url:'https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/right-tone/',kind:'Guideline',note:'Exemplo de tom específico, claro, conciso, humano e não pomposo.'},
  govStyle:{title:'GOV.UK — A to Z style guide',url:'https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/style-guides/a-to-z-style-guide/',kind:'Style guide',note:'Convenções consistentes de linguagem, termos, abreviações e escrita.'}
};
export const src=(...keys)=>keys.map(key=>refs[key]);
export const field=(name,definition,objective,questions,example,template,presentation,sources,evidence='')=>({name,definition,objective,questions,example,template,presentation,sources,...(evidence?{evidence}:{})});
export const commonPresentation='Use uma página editorial curta: regra principal em destaque, exemplos positivos e negativos, notas de contexto e links para as fontes que sustentam a decisão.';
