# Laboratorios Centro Médico — migración local

Angular 22.2.3, TypeScript 6.0 y Node 24. El proyecto es independiente y contiene todos los recursos necesarios para compilar. Los archivos originales se conservan fuera del repositorio en `../lcm-documentacion/`. No se requiere PHP para servir esta versión.

## Ejecutar

Desde esta carpeta con Node 24.15 o posterior de la rama 24:

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd test
npm.cmd run serve
```

Abrir http://localhost:3000. Para desarrollar, mantener el servidor Node en una terminal y ejecutar `npm.cmd start` en otra (http://localhost:4200, API mediante proxy). En PowerShell se usa npm.cmd para evitar la restricción de ejecución de npm.ps1. `PORT` permite cambiar el puerto de Node.

## Alcance y comparación con la web original

Consulta realizada el 28/10/2026 a https://portales-pru.tecnologiatransaccional.com/DEBITO/LEALTAD/HN_LCM_RF/ mediante solicitudes HTTP de lectura, incluidas las peticiones POST de navegación que usa el sitio original. No se enviaron registros ni credenciales al servidor original.

| Sección | Archivos iniciales | Resultado y migración |
|---|---|---|
<<<<<<< Updated upstream
| Inicio | index.html y cuatro banners | Conservados logo, fuente, imágenes, menú, pie y carrusel; controles Angular y pausa accesible |
| Acerca de | Faltaba | Recuperado acerca.php y sus imágenes; contenido trasladado a componente |
| Reglamento | Faltaba | Recuperado politicas.php, imágenes y PDF; enlace local funcional |
| Catálogos | Faltaba | catalogo.php devuelve HTTP 200 pero HTML truncado después de la portada. Portada recuperada; faltan páginas y datos de premios |
| Mi Cuenta | cuenta.html | Formulario conservado. Faltan código PHP, usuarios, sesiones y base de datos; API Node devuelve 503 explícito |
| Registrarse | Faltaba | contacto.php devuelve HTTP 200 pero termina dentro de la lista de departamentos. Campos visibles migrados; envío desactivado y aviso de indisponibilidad |
| Cuenta autenticada | Solo referencias en inbox.js | Perfil, movimientos, cambio de contraseña, establecimientos y premios pendientes: no hay código ni acceso autenticado disponible |
=======
| Inicio | index.html y cuatro banners | Se conservaron el logotipo, la tipografía, las imágenes, el menú, el pie de página y el carrusel; se añadieron controles de Angular y una opción de pausa accesible |
| Acerca de | Faltaba | Se recuperaron acerca.php y sus imágenes; el contenido se trasladó a un componente |
| Reglamento | Faltaba | Se recuperaron politicas.php, las imágenes y el PDF; el enlace local funciona |
| Catálogos | Faltaba | catalogo.php devuelve HTTP 200, pero el HTML está truncado después de la portada. Se recuperó la portada; faltan las páginas y los datos de premios |
| Mi cuenta | cuenta.html | El acceso real está deshabilitado porque faltan el código PHP, los usuarios, las sesiones y la base de datos. Se agregó una demo local con datos ficticios; la API de Node sigue devolviendo HTTP 503 explícitamente |
| Registrarse | Faltaba | contacto.php devuelve HTTP 200, pero el contenido termina en la lista de departamentos. Se migraron los campos visibles; el envío está desactivado y se muestra un aviso de indisponibilidad |
| Cuenta autenticada | Solo hay referencias en inbox.js | No se dispone de una cuenta real ni de sus servicios. La demo de `/mi-cuenta` muestra vistas de resumen, referidos, movimientos, perfil, premios y disponibilidad con datos ficticios que no se envían ni guardan |
>>>>>>> Stashed changes

Las respuestas de referencia se guardaron en `../lcm-documentacion/migration-reference/` y la portada consultada en `../lcm-documentacion/referencia-live.html`. La copia HTTrack no contiene código fuente PHP: descargar una página no recupera lógica de servidor. Los errores 404/500 de la descarga original están en `../lcm-documentacion/hts-log.txt`.

## Apariencia y accesibilidad

La aplicación utiliza una paleta clara fija y conserva el color de los recursos originales. Incluye menú móvil, foco visible, etiquetas de formularios y pausa del carrusel; la reproducción automática respeta movimiento reducido. La demo de cuenta conserva la navegación adaptable y marca sus datos como ficticios. No implica garantía médica de protección ocular.

## Para completar la migración funcional

<<<<<<< Updated upstream
Se necesitan las fuentes PHP originales (incluidos display/, paginascuenta/ y registro), esquema y acceso de prueba a la base de datos, reglas de puntos/premios y una cuenta de prueba autorizada. Con eso se puede implementar autenticación con sesiones seguras, registro, departamentos/municipios, perfil, movimientos y canjes en Node. No se crearon usuarios ficticios ni se almacenan contraseñas. La API actual es una base explícitamente incompleta, no un sistema de cuentas listo para producción.

No se publicó ni se modificó el servidor original. El servidor local escucha solo en loopback. Para hospedar en una subruta se debe configurar `baseHref`, rutas de assets, proxy y reescritura SPA. El contenido y las imágenes originales se conservan con el diseño de lcm-amigos-2. Queda pendiente la comparación de capturas en navegador y de las pantallas privadas.
=======
Se necesitan los archivos fuente originales de PHP (incluidos los directorios display/, paginascuenta/ y registro), el esquema y un acceso de prueba a la base de datos, las reglas de puntos y premios, y una cuenta de prueba autorizada. Con esa información se pueden implementar la autenticación con sesiones seguras, el registro, la gestión de departamentos y municipios, el perfil, los movimientos y los canjes en Node. La demo usa datos sintéticos solo en el navegador; no crea usuarios de backend ni almacena credenciales. La API actual sigue siendo una implementación explícitamente incompleta, no un sistema de cuentas listo para producción.

No se publicó ni se modificó el servidor original. El servidor local escucha solo en loopback. Para alojar la aplicación en una subruta, se deben configurar `baseHref`, las rutas de los recursos estáticos, el proxy y la reescritura SPA. El contenido y las imágenes originales se conservan con el diseño de lcm-amigos-2. La demo de cuenta es solo una vista previa; no reemplaza la integración pendiente del servicio privado.
>>>>>>> Stashed changes

## Repositorio y mantenimiento

Sube únicamente el contenido de esta carpeta como raíz del repositorio GitHub. Incluye src, public, server, scripts, los archivos de configuración y package-lock.json. El .gitignore excluye dependencias y archivos generados. La aplicación no depende de lcm-amigos ni de lcm-documentacion. La copia para Live Server se genera opcionalmente con node scripts/prepare-preview.mjs después de compilar; no forma parte del repositorio.

## Diseño de la aplicación

El proyecto integra el diseño de lcm-amigos-2: ancho completo, cinta de navegación superior en escritorio e iconos de acceso directo siempre visibles en tabletas y móviles, además de formularios adaptables y una paleta clara fija. Angular compila, en este orden, src/styles.css (base), src/amigos.css (componentes y paleta) y src/amigos-2.css (distribución final). Para modificar el diseño actual, edita principalmente src/amigos-2.css. Todos los estilos y recursos están dentro del repositorio; no se requiere ninguna carpeta hermana para compilar o ejecutar.
