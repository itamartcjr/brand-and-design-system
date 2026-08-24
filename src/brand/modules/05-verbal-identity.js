import { refs } from './verbal/shared.js';
import a from './verbal/fields-a.js';
import b from './verbal/fields-b.js';
import c from './verbal/fields-c.js';
import d from './verbal/fields-d.js';
import extras from './verbal/extras.js';

export default {
  id:'verbal-identity',number:'05',title:'Verbal Identity',group:'Language & Narrative',status:'Core',
  summary:'Define como a marca fala, escreve e adapta sua voz sem perder personalidade, clareza, responsabilidade ou reconhecimento.',
  why:'Criar um sistema verbal que funcione em branding, conteúdo, publicidade, social, institucional, suporte e experiências digitais — com regras suficientemente claras para pessoas, parceiros e IA.',
  refs:Object.values(refs),
  fields:[...a,...b,...c,...d],
  extras
};
