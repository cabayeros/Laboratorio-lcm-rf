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

Abre http://localhost:3000. Para desarrollar, mantén el servidor Node en una terminal y ejecuta `npm.cmd start` en otra (http://localhost:4200, con la API mediante proxy). En PowerShell se usa npm.cmd para evitar la restricción de ejecución de npm.ps1. `PORT` permite cambiar el puerto de Node.

## Alcance y comparación con la web original

Se consultó el sitio original el 28/10/2026 mediante solicitudes HTTP, incluidas las peticiones POST utilizadas para navegar. No se enviaron registros ni credenciales al servidor original.

| Sección | Archivos iniciales | Resultado y migración |
|---|---|---|
| Inicio | index.html y cuatro banners | Se conservaron el logotipo, la tipografía, las imágenes, el menú, el pie de página y el carrusel; se añadieron controles de Angular y una opción de pausa accesible |
| Acerca de | Faltaba | Se recuperaron acerca.php y sus imágenes; el contenido se trasladó a un componente |
| Reglamento | Faltaba | Se recuperaron politicas.php, las imágenes y el PDF; el enlace local funciona |
| Catálogos | Faltaba | catalogo.php devuelve HTTP 200, pero el HTML está truncado después de la portada. Se recuperó la portada; faltan las páginas y los datos de premios |
| Mi cuenta | cuenta.html | Se conservó el formulario. Faltan el código PHP, los usuarios, las sesiones y la base de datos; la API de Node devuelve HTTP 503 explícitamente |
| Registrarse | Faltaba | contacto.php devuelve HTTP 200, pero el contenido termina en la lista de departamentos. Se migraron los campos visibles; el envío está desactivado y se muestra un aviso de indisponibilidad |
| Cuenta autenticada | Solo hay referencias en inbox.js | No se dispone del código ni de acceso autenticado; quedan pendientes el perfil, los movimientos, el cambio de contraseña, los establecimientos y los premios |

Las respuestas de referencia se guardaron en `../lcm-documentacion/migration-reference/` y la portada consultada, en `../lcm-documentacion/referencia-live.html`. La copia de HTTrack no contiene código fuente PHP: descargar una página no recupera la lógica del servidor. Los errores 404/500 de la descarga original están en `../lcm-documentacion/hts-log.txt`.

## Apariencia y accesibilidad

La aplicación utiliza una paleta clara fija y conserva el color de los recursos originales. Incluye menú móvil, foco visible, etiquetas de formularios y pausa del carrusel; la reproducción automática respeta movimiento reducido. No implica garantía médica de protección ocular.

## Para completar la migración funcional

Se necesitan los archivos fuente originales de PHP (incluidos los directorios display/, paginascuenta/ y registro), el esquema y un acceso de prueba a la base de datos, las reglas de puntos y premios, y una cuenta de prueba autorizada. Con esa información se pueden implementar la autenticación con sesiones seguras, el registro, la gestión de departamentos y municipios, el perfil, los movimientos y los canjes en Node. No se han creado usuarios ficticios ni se almacenan contraseñas. La API actual es una implementación explícitamente incompleta, no un sistema de cuentas listo para producción.

No se publicó ni se modificó el servidor original. El servidor local escucha solo en loopback. Para alojar la aplicación en una subruta, se deben configurar `baseHref`, las rutas de los recursos estáticos, el proxy y la reescritura SPA. El contenido y las imágenes originales se conservan con el diseño de lcm-amigos-2. Queda pendiente comparar capturas en el navegador y revisar las pantallas privadas.

## Repositorio y mantenimiento

Sube únicamente el contenido de esta carpeta como raíz del repositorio de GitHub. Incluye las carpetas src, public y server, los archivos de configuración y package-lock.json. El archivo .gitignore excluye las dependencias y los archivos generados. La aplicación no depende de lcm-amigos ni de lcm-documentacion. `npm run build` compila la aplicación con Angular 22 y deja los archivos listos para desplegar en `dist/lcm/browser`.

## Diseño de la aplicación

El proyecto integra el diseño de lcm-amigos-2: ancho completo, cinta de navegación superior en escritorio e íconos de acceso directo siempre visibles en tabletas y móviles, además de formularios adaptables y una paleta clara fija. Angular compila, en este orden, src/styles.css (base), src/amigos.css (componentes y paleta) y src/amigos-2.css (distribución final). Para modificar el diseño actual, edita principalmente src/amigos-2.css. Todos los estilos y recursos están dentro del repositorio; no se requiere ninguna carpeta hermana para compilar o ejecutar.
