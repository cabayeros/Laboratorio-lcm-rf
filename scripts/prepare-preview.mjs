import {readFile,writeFile,cp,readdir,mkdir,access} from 'node:fs/promises';
import {resolve,join} from 'node:path';
const project=resolve(import.meta.dirname,'..');
const source=join(project,'dist/lcm/browser');
const destination=resolve(project,'../lcm-amigos');
await mkdir(destination,{recursive:true});
await cp(source,destination,{recursive:true});
const index=await readFile(join(destination,'index.html'),'utf8');
let previewIndex=index.replace('<base href="/">','<base href="./"><meta name="lcm-preview" content="static">').replaceAll('/assets/','assets/');
// Conservar la presentación propia de la copia local al actualizar los bundles.
let customStyles=false;
try { await access(join(destination,'amigos.css')); customStyles=true; } catch {}
if(customStyles) previewIndex=previewIndex.replace('</head>','<link rel="stylesheet" href="amigos.css"></head>');
await writeFile(join(destination,'index.html'),previewIndex);
for(const file of await readdir(destination)){
 if(file.endsWith('.css')){
  const css=await readFile(join(destination,file),'utf8');
  await writeFile(join(destination,file),css.replaceAll('/assets/','assets/'));
 }
}
console.log(`Vista para Live Server preparada en ${destination}`);
