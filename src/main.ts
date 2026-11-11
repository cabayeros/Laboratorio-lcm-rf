import {bootstrapApplication} from '@angular/platform-browser';
import {Component, signal, OnDestroy} from '@angular/core';
import {provideRouter, RouterOutlet, RouterLink, RouterLinkActive, withHashLocation} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({standalone:true,template:`<section class="carousel" aria-label="Promociones" (mouseenter)="paused=true" (mouseleave)="paused=false" (focusin)="paused=true" (focusout)="paused=false"><div class="carousel-slide"><img [src]="'assets/banner'+slide()+'.png'" [alt]="'Programa de referidos + AMIGOS, promoción '+slide()"><button class="previous" (click)="move(-1)" aria-label="Promoción anterior">❮</button><button class="next" (click)="move(1)" aria-label="Promoción siguiente">❯</button></div><div class="dots">@for(n of [1,2,3,4];track n){<button [class.selected]="slide()===n" (click)="slide.set(n)" [attr.aria-label]="'Ver promoción '+n" [attr.aria-pressed]="slide()===n"></button>}<button class="pause" (click)="playing=!playing" [attr.aria-label]="playing?'Pausar promociones':'Reproducir promociones'">{{playing?'Ⅱ':'▶'}}</button></div></section>`})
class Home implements OnDestroy {slide=signal(1);paused=false;playing=!matchMedia('(prefers-reduced-motion: reduce)').matches;timer=setInterval(()=>{if(!this.paused&&this.playing)this.move(1)},5000);move(n:number){this.slide.update(v=>(v-1+n+4)%4+1)}ngOnDestroy(){clearInterval(this.timer)}}

@Component({standalone:true,template:`<section class="panel"><h1>Acerca de</h1><div class="split"><img class="feature" src="assets/playList414.png" alt="Programa de referidos + AMIGOS"><article><h2>¿Qué es el Programa de Referidos?</h2><img src="assets/mas-amigos.png" alt="+ AMIGOS"><p>El programa de referidos + AMIGOS es un programa de beneficios que premia a las personas que nos refieren clientes al Laboratorio, para participar solo deben:</p><ul><li>Inscribirse en el programa de manera presencial o mediante nuestra página web llenando un formulario.</li><li>Referir clientes y de acuerdo con el número de referidos ir alcanzando las escalas de premios disponibles.</li></ul><img class="decoration" src="assets/estilo-diseño-bottom.png" alt=""></article></div></section>`})
class About {}
@Component({standalone:true,template:`<section class="panel"><h1>Reglamento</h1><div class="split"><img class="feature" src="assets/banners_mas_amigos_V3_id2.png" alt="Beneficios del programa de referidos"><article><h2>Reglamento Programa<br>de Referidos</h2><img src="assets/mas-amigos.png" alt="+ AMIGOS"><p>Disfruta de muchos premios al referir a tus amigos, conocidos y familiares a Laboratorios Centro Médico.</p><p>Cuida de tu Salud y de tus seres queridos en tu Laboratorio Certificado que te brinda resultados Confiables.</p><p>Para mayor información consulta el reglamento dando <a href="assets/BROCHURE WEB REGLAMENTO.pdf" target="_blank" rel="noopener">Click Aquí<br></a></p><img class="decoration" src="assets/estilo-diseño-bottom.png" alt=""></article></div></section>`})
class Rules {}
@Component({standalone:true,template:`<section class="panel"><h1>Catálogos</h1><img class="catalog" src="assets/CATALOGO_DE_PREMIOS_LCM_555X600.jpg" alt="Catálogo de premios Laboratorios Centro Médico"><p class="notice" role="status">La portada está disponible. El servidor original no entregó las páginas de premios; el catálogo completo está pendiente de integración.</p></section>`})
class Catalog {}

type AccountSection='inicio'|'referidos'|'movimientos'|'perfil'|'password'|'establecimientos'|'premios'|'disponibilidad';
type AccountNavigationItem={id:AccountSection|'salir';label:string};
type DemoMovement={code:string;activity:string;date:string;status:string};
@Component({standalone:true,imports:[RouterLink],template:`
<section class="panel account-panel">
  <h1>Mi cuenta</h1>
  @if(!demo()){
    <div class="account">
      <section class="account-login" aria-labelledby="account-login-title">
        <p class="account-eyebrow">Programa de referidos + AMIGOS</p>
        <h2 id="account-login-title">Por favor, inicia sesión</h2>
        <p>Accede a tu cuenta para consultar tus referidos y beneficios.</p>
        <label for="account-user">Nombre de usuario</label>
        <input id="account-user" name="username" autocomplete="username" disabled>
        <label for="account-password">Contraseña</label>
        <input id="account-password" name="password" type="password" autocomplete="current-password" disabled>
        <button class="primary" type="button" disabled>Acceso real no disponible</button>
        <p class="account-status" role="status">El acceso está deshabilitado: este proyecto no tiene conectado un servicio de autenticación ni una base de datos de cuentas.</p>
        <button class="account-demo-button" type="button" (click)="enterDemo()">Entrar en modo demo</button>
        <p class="account-demo-hint">La demo usa datos ficticios y no valida, envía ni guarda credenciales. No ingreses aquí tu contraseña real.</p>
      </section>
    </div>
  } @else {
    <div class="account-dashboard">
      <aside class="account-sidebar" aria-label="Secciones de la cuenta">
        <button class="account-menu-toggle" type="button" aria-controls="account-menu" [attr.aria-expanded]="accountMenuOpen()" (click)="toggleAccountMenu()">
          <span>{{activeSectionLabel()}}</span><span class="account-menu-chevron" aria-hidden="true"></span>
        </button>
        <nav id="account-menu" class="account-menu" aria-label="Menú de cuenta" [class.account-menu-open]="accountMenuOpen()">
          @for(item of sections;track item.id){
            @if(item.id==='salir'){
              <button class="account-logout" type="button" (click)="exitDemo()">{{item.label}}</button>
            } @else {
              <button type="button" [class.active]="activeSection()===item.id" [attr.aria-current]="activeSection()===item.id?'page':null" (click)="openSection(item.id)">{{item.label}}</button>
            }
          }
        </nav>
      </aside>
      <div class="account-workspace">
        <div class="account-demo-banner" role="status">
          <strong>Modo demo</strong>
          <span>Todos los datos son ficticios; no corresponden a clientes ni movimientos reales de Laboratorios Centro Médico.</span>
        </div>
        @switch(activeSection()){
          @case('inicio'){
            <section class="account-balance" aria-label="Resumen de demostración">
              <div>
                <p class="account-eyebrow">Programa de referidos + AMIGOS</p>
                <h2>Resumen de referidos</h2>
                <p>Una vista de ejemplo de tu actividad en el programa.</p>
              </div>
              <div class="account-balance-value"><strong>12</strong><span>referidos de ejemplo</span></div>
            </section>
            <div class="account-summary-grid">
              <article class="account-summary-card"><span>Premios de muestra</span><strong>2</strong><small>Solo para ilustrar el diseño</small></article>
              <article class="account-summary-card"><span>Última actividad</span><strong>28 oct 2026</strong><small>Fecha de ejemplo</small></article>
            </div>
            <section class="account-card">
              <div class="account-card-heading"><div><p class="account-eyebrow">Resumen</p><h2>Hola, Usuario de muestra</h2></div></div>
              <h3>Datos de la cuenta de ejemplo</h3>
              <dl class="account-details">
                <div><dt>Correo electrónico</dt><dd>demo@example.com</dd></div>
                <div><dt>Teléfono</dt><dd>0000-0000</dd></div>
                <div><dt>Dirección</dt><dd>Dirección de demostración</dd></div>
                <div><dt>Código de participante</dt><dd>DEMO-0000</dd></div>
              </dl>
            </section>
            <section class="account-card">
              <div class="account-card-heading"><div><p class="account-eyebrow">Actividad de muestra</p><h2>Movimientos recientes</h2></div><button class="account-text-button" type="button" (click)="openSection('movimientos')">Ver todos</button></div>
              <div class="account-table-wrap"><table class="account-table"><thead><tr><th>Código</th><th>Actividad</th><th>Fecha</th><th>Estado</th></tr></thead><tbody>@for(movement of movements.slice(0,3);track movement.code){<tr><td>{{movement.code}}</td><td>{{movement.activity}}</td><td>{{movement.date}}</td><td>{{movement.status}}</td></tr>}</tbody></table></div>
            </section>
          }
          @case('referidos'){
            <section class="account-card">
              <div class="account-card-heading"><div><p class="account-eyebrow">Programa + AMIGOS</p><h2>Mis referidos de ejemplo</h2></div></div>
              <p>Esta lista es ficticia y solo muestra cómo podría verse la sección. Los referidos reales requieren conectar el servicio de cuentas de LCM.</p>
              <div class="account-table-wrap"><table class="account-table"><thead><tr><th>Código</th><th>Referencia</th><th>Fecha</th><th>Estado</th></tr></thead><tbody><tr><td>REF-DEMO-01</td><td>Participante de muestra A</td><td>2026-10-28</td><td>Ejemplo</td></tr><tr><td>REF-DEMO-02</td><td>Participante de muestra B</td><td>2026-10-12</td><td>Ejemplo</td></tr><tr><td>REF-DEMO-03</td><td>Participante de muestra C</td><td>2026-09-30</td><td>Ejemplo</td></tr></tbody></table></div>
            </section>
          }
          @case('movimientos'){
            <section class="account-card">
              <div class="account-card-heading"><div><p class="account-eyebrow">Actividad</p><h2>Movimientos de ejemplo</h2></div></div>
              <p>El historial real y sus filtros requieren consultar los movimientos de una cuenta. Aquí solo se muestran registros ficticios para ilustrar el diseño.</p>
              <div class="account-filter"><label>Desde<input type="date" disabled></label><label>Hasta<input type="date" disabled></label><button class="primary" type="button" disabled>Filtrar</button></div>
              <div class="account-table-wrap"><table class="account-table"><thead><tr><th>Código</th><th>Actividad</th><th>Fecha</th><th>Estado</th></tr></thead><tbody>@for(movement of movements;track movement.code){<tr><td>{{movement.code}}</td><td>{{movement.activity}}</td><td>{{movement.date}}</td><td>{{movement.status}}</td></tr>}</tbody></table></div>
            </section>
          }
          @case('perfil'){
            <section class="account-card">
              <div class="account-card-heading"><div><p class="account-eyebrow">Perfil</p><h2>Actualizar datos</h2></div></div>
              <p>La edición está deshabilitada porque esta demo no guarda cambios ni está conectada a un perfil de cliente.</p>
              <div class="account-form-grid"><label>Nombre<input value="Usuario de muestra" disabled></label><label>Apellido<input value="Ejemplo" disabled></label><label>Dirección<input value="Dirección de demostración" disabled></label><label>Teléfono<input value="0000-0000" disabled></label><label>Correo electrónico<input value="demo@example.com" disabled></label></div>
              <button class="primary account-action" type="button" disabled>Guardar cambios</button>
            </section>
          }
          @case('password'){
            <section class="account-card">
              <div class="account-card-heading"><div><p class="account-eyebrow">Seguridad</p><h2>Cambiar contraseña</h2></div></div>
              <p>No se puede cambiar una contraseña desde esta demo: LCM aún no tiene conectado un servicio de autenticación. No introduzcas aquí una contraseña real.</p>
              <div class="account-form-grid"><label>Contraseña anterior<input type="password" disabled></label><label>Nueva contraseña<input type="password" disabled></label><label>Confirmar contraseña<input type="password" disabled></label></div>
              <button class="primary account-action" type="button" disabled>Guardar</button>
            </section>
          }
          @case('establecimientos'){
            <section class="account-card">
              <div class="account-card-heading"><div><p class="account-eyebrow">Laboratorios Centro Médico</p><h2>Establecimientos</h2></div></div>
              <p>El directorio de establecimientos participantes requiere información confirmada de LCM. No se muestran ubicaciones ficticias como si fueran reales.</p>
              <p class="account-unavailable">Directorio no disponible en esta demo.</p>
            </section>
          }
          @case('premios'){
            <section class="account-card">
              <div class="account-card-heading"><div><p class="account-eyebrow">Programa + AMIGOS</p><h2>Premios</h2></div></div>
              <p>Los premios, requisitos y canjes reales requieren conectar las reglas del programa y el servicio de cuentas. Las cantidades de ejemplo de esta demo no representan beneficios disponibles.</p>
              <a class="account-catalog-link" routerLink="/catalogos">Consultar el catálogo de premios</a>
            </section>
          }
          @case('disponibilidad'){
            <section class="account-card">
              <div class="account-card-heading"><div><p class="account-eyebrow">Sobre esta sección</p><h2>¿Por qué estas opciones no están disponibles?</h2></div></div>
              <p>Esta aplicación no tiene autenticación ni base de datos de clientes conectadas. El modo demo permite revisar la interfaz, no consultar ni modificar información real.</p>
              <ul class="account-availability-list"><li><strong>Inicio de sesión:</strong> no se puede validar una cuenta; la demo no envía ni almacena credenciales.</li><li><strong>Perfil y contraseña:</strong> requieren un servicio seguro para leer y guardar datos personales.</li><li><strong>Referidos, movimientos y premios:</strong> requieren consultar el sistema real del programa + AMIGOS.</li><li><strong>Establecimientos:</strong> requieren información confirmada de Laboratorios Centro Médico.</li></ul>
              <p>Hasta integrar esos servicios, usa el modo demo únicamente para revisar el diseño.</p>
            </section>
          }
        }
      </div>
    </div>
  }
</section>`})
class Account {
  demo=signal(false);
  activeSection=signal<AccountSection>('inicio');
  accountMenuOpen=signal(false);
  sections:AccountNavigationItem[]=[
    {id:'inicio',label:'Inicio'},
    {id:'referidos',label:'Mis referidos'},
    {id:'movimientos',label:'Mis movimientos'},
    {id:'perfil',label:'Actualizar datos'},
    {id:'password',label:'Cambiar contraseña'},
    {id:'establecimientos',label:'Establecimientos'},
    {id:'premios',label:'Premios'},
    {id:'disponibilidad',label:'Disponibilidad'},
    {id:'salir',label:'Salir del modo demo'}
  ];
  movements:DemoMovement[]=[
    {code:'DEMO-1042',activity:'Referido registrado (ejemplo)',date:'2026-10-28',status:'Ejemplo'},
    {code:'DEMO-1038',activity:'Referido registrado (ejemplo)',date:'2026-10-12',status:'Ejemplo'},
    {code:'DEMO-1021',activity:'Premio de muestra',date:'2026-09-30',status:'Ejemplo'},
    {code:'DEMO-1007',activity:'Referido registrado (ejemplo)',date:'2026-09-14',status:'Ejemplo'}
  ];
  activeSectionLabel(){return this.sections.find(item=>item.id===this.activeSection())?.label??'Inicio'}
  toggleAccountMenu(){this.accountMenuOpen.update(open=>!open)}
  enterDemo(){this.activeSection.set('inicio');this.accountMenuOpen.set(false);this.demo.set(true)}
  exitDemo(){this.demo.set(false);this.accountMenuOpen.set(false);this.activeSection.set('inicio')}
  openSection(section:AccountSection){this.activeSection.set(section);this.accountMenuOpen.set(false)}
}
@Component({standalone:true,imports:[FormsModule],template:`<section class="panel"><h1>Registrarse</h1><div class="registration"><form><label for="names">*Nombres</label><input id="names" maxlength="25" autocomplete="given-name" required><label for="surname">*Apellidos</label><input id="surname" maxlength="25" autocomplete="family-name" required><label for="phone">Teléfono</label><input id="phone" maxlength="8" type="tel" autocomplete="tel"><label for="email">*Correo electrónico</label><input id="email" type="email" maxlength="50" autocomplete="email" required><label for="identity">*N.? de documento de identidad</label><input id="identity" maxlength="13" required><fieldset><legend>*Género</legend><label><input type="radio" name="gender" value="Femenino" checked> Femenino</label><label><input type="radio" name="gender" value="Masculino"> Masculino</label></fieldset><label for="birth">Fecha de nacimiento</label><input id="birth" type="date" autocomplete="bday"><label for="department">*Departamento</label><select id="department" disabled><option>Seleccione:</option></select><p class="notice" role="status">El registro está temporalmente fuera de servicio. No se pudo recuperar la lista de departamentos ni el proceso de inscripción del servidor original. Puedes inscribirte de manera presencial.</p><button class="primary" type="button" disabled>Registro no disponible</button></form></div></section>`})
class Register {}
@Component({selector:'app-root',standalone:true,imports:[RouterOutlet,RouterLink,RouterLinkActive],template:`
<a class="skip" href="#contenido">Saltar al contenido</a>
<div class="shell">
  <div class="top"><span>.:: Cliente Referido + AMIGOS ::. | 3.1.25 | <a routerLink="/mi-cuenta">Iniciar sesión</a></span></div>
  <header>
    <a routerLink="/" class="logo"><img src="assets/logo.png" alt="Laboratorios Centro Médico — Inicio"></a>
    <nav id="navigation" aria-label="Navegación principal">
      @for(item of links;track item.path){
        <a [routerLink]="item.path" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" ariaCurrentWhenActive="page" [attr.aria-label]="item.label">
          <span class="nav-icon" aria-hidden="true">
            @switch(item.path){
              @case('/'){<svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7M5.5 9v12h13V9M9 21v-7h6v7"/></svg>}
              @case('/acerca'){<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/></svg>}
              @case('/reglamento'){<svg viewBox="0 0 24 24"><path d="M6 3h9l4 4v14H6zM14 3v5h5M9 12h7m-7 4h7"/></svg>}
              @case('/catalogos'){<svg viewBox="0 0 24 24"><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></svg>}
              @case('/mi-cuenta'){<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>}
              @case('/registro'){<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0m4-11v8m-4-4h8"/></svg>}
            }
          </span>
          <span class="nav-label">{{item.label}}</span>
        </a>
      }
    </nav>
  </header>
  <main id="contenido" tabindex="-1"><router-outlet /></main>
  <footer><p>© Laboratorios Centro Médico 2020</p><img src="assets/DATACODE.png" alt="DATACODE"></footer>
</div>`})
class App {links=[{path:'/',label:'Inicio'},{path:'/acerca',label:'Acerca de'},{path:'/reglamento',label:'Reglamento'},{path:'/catalogos',label:'Catálogos'},{path:'/mi-cuenta',label:'Mi cuenta'},{path:'/registro',label:'Registrarse'}]}
bootstrapApplication(App,{providers:[provideRouter([{path:'',component:Home},{path:'acerca',component:About},{path:'reglamento',component:Rules},{path:'catalogos',component:Catalog},{path:'cuenta',redirectTo:'mi-cuenta',pathMatch:'full'},{path:'mi-cuenta',component:Account},{path:'registro',component:Register},{path:'**',redirectTo:''}])]}).catch(console.error);
