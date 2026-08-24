import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8'};
const server=createServer(async(req,res)=>{try{const pathname=(req.url||'/').split('?')[0];let file=join(root,pathname==='/'?'index.html':pathname);const info=await stat(file);if(info.isDirectory())file=join(file,'index.html');const body=await readFile(file);res.writeHead(200,{'content-type':types[extname(file)]||'application/octet-stream'});res.end(body)}catch{res.writeHead(404);res.end('Not found')}});
server.listen(4173,()=>console.log('Brand Framework: http://localhost:4173'));
