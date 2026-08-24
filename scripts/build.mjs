import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import core from '../src/brand/modules/01-core.js';
import strategy from '../src/brand/modules/02-strategy.js';
import audience from '../src/brand/modules/03-audience.js';
import personality from '../src/brand/modules/04-personality.js';
import verbal from '../src/brand/modules/05-verbal-identity.js';
import catalog from '../src/brand/modules/catalog.js';
import e1 from '../src/brand/modules/complete-extras-1.js';
import e2 from '../src/brand/modules/complete-extras-2.js';
import e3 from '../src/brand/modules/complete-extras-3.js';
import e4 from '../src/brand/modules/complete-extras-4.js';
import e5 from '../src/brand/modules/complete-extras-5.js';
import e6 from '../src/brand/modules/complete-extras-6.js';

const out = new URL('../dist/', import.meta.url);
const src = new URL('../src/', import.meta.url);
const completion = {...e1,...e2,...e3,...e4,...e5,...e6};
const explicit = new Set(['personality','verbal-identity']);
const remaining = catalog.filter(module=>!explicit.has(module.id)).map(module=>completion[module.id]?{...module,...completion[module.id],fields:module.fields}:module);
const modules = [core,strategy,audience,personality,verbal,...remaining].sort((a,b)=>Number(a.number)-Number(b.number));

const ids=new Set(modules.map(module=>module.id));
const numbers=new Set(modules.map(module=>Number(module.number)));
if(modules.length!==20||ids.size!==20||numbers.size!==20)throw new Error(`Brand framework inválido: esperados 20 módulos únicos, encontrados ${modules.length}.`);
for(const module of modules){if(!module.title||!Array.isArray(module.fields)||module.fields.length===0)throw new Error(`Módulo incompleto: ${module.id||module.number||'desconhecido'}.`)}
if(audience.fields.length<16)throw new Error(`Audience incompleto: encontrados ${audience.fields.length} itens.`);
if(personality.fields.length<14||personality.extras?.archetypes?.length!==12)throw new Error('Brand Personality incompleto.');
if(verbal.fields.length<30||verbal.extras?.toneContexts?.length<6)throw new Error('Verbal Identity incompleta.');
for(const module of modules.filter(m=>Number(m.number)>=6)){
 if(!module.extras?.studio?.views?.length)throw new Error(`Brand Studio ausente no módulo ${module.id}.`);
 if(!Array.isArray(module.refs)||module.refs.length===0)throw new Error(`Referências ausentes no módulo ${module.id}.`);
}
if((modules.find(m=>m.id==='governance')?.fields?.length||0)<20)throw new Error('Governance incompleto.');

const brandData={meta:{name:'Brand Framework',version:'2.0.0',scope:'Brand only',generatedAt:new Date().toISOString(),status:'Complete architecture'},modules,references:{},resources:{}};
await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});await cp(src,out,{recursive:true});await writeFile(new URL('brand-data.json',out),JSON.stringify(brandData,null,2),'utf8');
const fieldCount=modules.reduce((sum,module)=>sum+module.fields.length,0);
console.log(`Built Brand framework v2.0.0: ${modules.length} modules / ${fieldCount} fields / ${modules.filter(m=>m.extras?.studio).length} interactive studios.`);
