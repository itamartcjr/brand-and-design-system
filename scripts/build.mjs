import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import core from '../src/brand/modules/01-core.js';
import strategy from '../src/brand/modules/02-strategy.js';
import audience from '../src/brand/modules/03-audience.js';
import personality from '../src/brand/modules/04-personality.js';
import verbal from '../src/brand/modules/05-verbal-identity.js';
import catalog from '../src/brand/modules/catalog.js';

const out = new URL('../dist/', import.meta.url);
const src = new URL('../src/', import.meta.url);
const overrides = new Set(['personality','verbal-identity']);
const modules = [core, strategy, audience, personality, verbal, ...catalog.filter(module => !overrides.has(module.id))].sort((a,b) => Number(a.number) - Number(b.number));

const ids = new Set(modules.map(module => module.id));
const numbers = new Set(modules.map(module => Number(module.number)));
if (modules.length !== 20 || ids.size !== 20 || numbers.size !== 20) {
  throw new Error(`Brand framework inválido: esperados 20 módulos únicos, encontrados ${modules.length}.`);
}
for (const module of modules) {
  if (!module.title || !Array.isArray(module.fields) || module.fields.length === 0) {
    throw new Error(`Módulo incompleto: ${module.id || module.number || 'desconhecido'}.`);
  }
}
if (audience.fields.length < 16) {
  throw new Error(`Audience incompleto: esperados ao menos 16 itens, encontrados ${audience.fields.length}.`);
}
if (personality.fields.length < 14 || !Array.isArray(personality.extras?.archetypes) || personality.extras.archetypes.length !== 12) {
  throw new Error('Brand Personality incompleto: esperados ao menos 14 itens e 12 arquétipos.');
}
if (verbal.fields.length < 30 || !Array.isArray(verbal.extras?.toneContexts) || verbal.extras.toneContexts.length < 6) {
  throw new Error('Verbal Identity incompleta: esperados ao menos 30 itens e 6 contextos de tom.');
}

const brandData = {
  meta: {
    name: 'Brand Framework',
    version: '1.3.0',
    scope: 'Brand only',
    generatedAt: new Date().toISOString()
  },
  modules,
  references: {},
  resources: {}
};

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(src, out, { recursive: true });
await writeFile(new URL('brand-data.json', out), JSON.stringify(brandData, null, 2), 'utf8');

const fieldCount = modules.reduce((sum, module) => sum + module.fields.length, 0);
console.log(`Built Brand framework: ${modules.length} modules / ${fieldCount} fields / Audience ${audience.fields.length} / Personality ${personality.fields.length} / Verbal ${verbal.fields.length}.`);
