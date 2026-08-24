import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';
import core from '../src/brand/modules/01-core.js';
import strategy from '../src/brand/modules/02-strategy.js';
import audience from '../src/brand/modules/03-audience.js';
import part1 from '../src/brand/payload/part-01.js';
import part2 from '../src/brand/payload/part-02.js';
import part3 from '../src/brand/payload/part-03.js';
import part4 from '../src/brand/payload/part-04.js';
import part5 from '../src/brand/payload/part-05.js';

const out = new URL('../dist/', import.meta.url);
const src = new URL('../src/', import.meta.url);

function findModules(node, found = []) {
  if (Array.isArray(node)) {
    node.forEach(item => findModules(item, found));
    return found;
  }
  if (!node || typeof node !== 'object') return found;
  if (node.id && node.title && Array.isArray(node.fields)) {
    found.push(node);
    return found;
  }
  Object.values(node).forEach(value => findModules(value, found));
  return found;
}

function pickObject(node, keys) {
  if (!node || typeof node !== 'object') return {};
  for (const key of keys) if (node[key] && typeof node[key] === 'object') return node[key];
  return {};
}

const encoded = [part1, part2, part3, part4, part5].join('');
const padded = encoded + '='.repeat((4 - encoded.length % 4) % 4);
const unpacked = gunzipSync(Buffer.from(padded, 'base64')).toString('utf8');
const payload = JSON.parse(unpacked);
const overrides = [core, strategy, audience];
const overrideIds = new Set(overrides.map(module => module.id));
const extraModules = findModules(payload).filter(item => !overrideIds.has(item.id));
const unique = new Map(overrides.map(module => [module.id, module]));
extraModules.forEach(module => unique.set(module.id, module));
const modules = [...unique.values()].sort((a,b) => Number(a.number) - Number(b.number));

if (modules.length < 20) {
  throw new Error(`Brand framework incompleto: esperados 20 módulos, encontrados ${modules.length}.`);
}
const audienceModule = modules.find(module => module.id === 'audience');
if (!audienceModule || audienceModule.fields.length < 16) {
  throw new Error('Audience incompleto: esperado módulo aprofundado com pelo menos 16 itens.');
}

const references = pickObject(payload, ['references','refsRegistry','referenceRegistry']);
const resources = pickObject(payload, ['resources','downloads','resourceRegistry']);
const meta = pickObject(payload, ['meta','framework','metadata']);
const brandData = { meta, modules, references, resources };

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(src, out, { recursive: true });
await writeFile(new URL('brand-data.json', out), JSON.stringify(brandData, null, 2), 'utf8');

const fieldCount = modules.reduce((sum, module) => sum + module.fields.length, 0);
console.log(`Built Brand framework: ${modules.length} modules / ${fieldCount} fields / Audience ${audienceModule.fields.length} fields.`);
