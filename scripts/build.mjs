import { cp, mkdir, rm } from 'node:fs/promises';

const out = new URL('../dist/', import.meta.url);
const src = new URL('../src/', import.meta.url);

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(src, out, { recursive: true });
console.log('Built static documentation into dist/');
