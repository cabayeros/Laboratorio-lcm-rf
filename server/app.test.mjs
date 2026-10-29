import {test} from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {createApp} from './app.mjs';
test('Node sirve Angular y rechaza autenticación sin integración',async()=>{
 const server=createApp().listen(0,'127.0.0.1');await once(server,'listening');const base=`http://127.0.0.1:${server.address().port}`;
 try{
  assert.equal((await fetch(base+'/api/health')).status,200);
  for(const route of ['/','/acerca','/reglamento','/catalogos','/cuenta','/registro']){const response=await fetch(base+route);assert.equal(response.status,200);assert.match(await response.text(),/<app-root>/)}
  assert.equal((await fetch(base+'/assets/BROCHURE%20WEB%20REGLAMENTO.pdf')).headers.get('content-type'),'application/pdf');
  assert.equal((await fetch(base+'/assets/no-existe.png')).status,404);
  assert.equal((await fetch(base+'/api/auth/login',{method:'POST',body:'invalid'})).status,400);
  assert.equal((await fetch(base+'/api/auth/login',{method:'POST',body:JSON.stringify({username:'',password:''})})).status,400);
  const login=await fetch(base+'/api/auth/login',{method:'POST',body:JSON.stringify({username:'test',password:'test'})});assert.equal(login.status,503);assert.equal((await login.json()).code,'AUTH_NOT_CONFIGURED');
 }finally{server.close();server.closeAllConnections()}
});
