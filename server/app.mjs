import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve(import.meta.dirname,'../dist/lcm/browser');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.gif':'image/gif','.ico':'image/x-icon','.pdf':'application/pdf','.otf':'font/otf'};
export function createApp(){return createServer(async(req,res)=>{
  res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
  const json=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data))};
  try{
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(pathname==='/api/health')return json(200,{status:'ok',node:process.versions.node,authentication:'not-configured'});
    if(pathname==='/api/auth/login'&&req.method==='POST'){
      let body='';for await(const chunk of req){body+=chunk;if(body.length>4096)return json(413,{message:'Solicitud demasiado grande.'})}
      let data;try{data=JSON.parse(body)}catch{return json(400,{message:'Solicitud inválida.'})}
      if(typeof data.username!=='string'||typeof data.password!=='string'||!data.username.trim()||!data.password||data.username.length>48||data.password.length>17)return json(400,{message:'Revisa el nombre de usuario y la contraseña.'});
      return json(503,{code:'AUTH_NOT_CONFIGURED',message:'El acceso está temporalmente fuera de servicio. Falta integrar el servicio de cuentas original.'});
    }
    if(pathname.startsWith('/api/'))return json(404,{message:'Servicio no disponible.'});
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});return res.end()}
    let file=resolve(root,'.'+pathname);
    if(file!==root&&!file.startsWith(root+sep))return json(403,{message:'Acceso denegado.'});
    try{if(!(await stat(file)).isFile())throw new Error()}catch{if(extname(pathname))return json(404,{message:'Archivo no encontrado.'});file=resolve(root,'index.html')}
    const content=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'});res.end(req.method==='HEAD'?undefined:content);
  }catch(error){json(error instanceof URIError?400:500,{message:'No se pudo procesar la solicitud.'})}
})}
