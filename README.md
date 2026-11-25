# Fontanería RIF · rediseño (HTML + CSS)

Esta rama (`rediseno`) contiene el rediseño con la identidad corporativa de RIF. Como `html-estatico`, contiene la web en **HTML, CSS y JavaScript planos**, sin Node, sin compilación y sin dependencias. Se sube tal cual a cualquier hosting (FTP, Cloudflare Pages, Netlify, GitHub Pages…).

La versión con Astro, con los datos centralizados y las plantillas, está en la rama `main` (con el diseño anterior).

## Sistema de diseño

| | |
|---|---|
| Rojo corporativo | `#E30613` (logotipo) · `#D7141A` (botones y acentos, contraste AA con blanco) |
| Azul corporativo | `#0A2565` (barra superior, sección «Sobre nosotros», pie) |
| Neutros | tinta `#121417`, gris `#474D58`, papel `#F5F4F0`, filetes `#E2E1DC` |
| Tipografía | Archivo (variable, licencia OFL), autoalojada en `fonts/` y recortada a 48 KB. Titulares condensados en mayúsculas; texto en anchura normal |
| Logotipo | La insignia «RIF» redibujada en SVG a partir del logo actual (letras rojas, contorno grafito) |
| Lenguaje gráfico | Filetes en lugar de tarjetas, rojo solo para la acción principal, láminas técnicas dibujadas a mano en SVG en lugar de imágenes de stock |

Los colores están definidos como variables al principio de `css/estilos.css`.

## Estructura

```
index.html                  Home
desatascos-ermua/index.html Landing modelo (SEO + Google Ads, sin menú)
contacto/index.html         Contacto
eu/index.html               Versión en euskera (estructura, por traducir)
aviso-legal/ privacidad/    Plantillas legales (noindex)
404.html                    Página de error
css/estilos.css             Todo el CSS (un solo archivo; colores y medidas en :root)
fonts/                      Archivo (woff2) + copia incrustada solo para doble clic + licencia OFL
js/app.js                   Todo el JS: horario abierto/cerrado, cookies, eventos dataLayer, mapa, formulario, antes/después
robots.txt sitemap.xml llms.txt
favicon.svg logo.svg apple-touch-icon.png og-fontaneria-rif.jpg
docs/jsonld/                Copia del JSON-LD para revisarlo
```

## Verla en local

Basta con **abrir `index.html` con doble clic**. Las rutas son relativas (`css/estilos.css`, `../contacto/`), así que funcionan igual en local y en el hosting. Al abrirla desde el disco (`file://`), `js/app.js` hace que los enlaces a carpetas abran su `index.html`. En el hosting ese ajuste no se aplica y las URLs se quedan limpias (`/contacto/`).

Con doble clic el navegador también bloquea las fuentes web. Por eso, solo en ese caso, `js/app.js` carga `fonts/archivo-rif.js`, que lleva la fuente incrustada. En el hosting se usa el `.woff2` normal.

Excepción: `404.html` usa rutas absolutas (`/css/…`) porque el servidor la muestra en cualquier URL. Para verla bien en local, usa un servidor (`python3 -m http.server 8000` o Live Server en VS Code).

## Editar sin romper nada

Al no haber plantillas, **la cabecera, el pie, la barra móvil y los datos del negocio están repetidos en cada página**. Si cambias el teléfono, el horario o la dirección:

1. Busca y reemplaza en **todos** los `.html` (en VS Code: Ctrl/Cmd + Shift + H).
2. Revisa también el bloque `<script type="application/ld+json">` de cada página, además de `llms.txt` y `js/app.js` (el horario está en `TRAMOS`).

Los datos pendientes aparecen como `<span class="tbd">[…]</span>`. Para ver la lista completa, busca `class="tbd"`.

## Antes de publicar

- Rellenar los `[DATOS A CONFIRMAR]` y poner fotos reales.
- Formulario: conectar el `action` del `<form>` a un servicio de envío (ver `js/app.js`).
- Analítica: descomentar el snippet de GTM/GA4 en `cargarAnalitica()` (`js/app.js`).
- Cada página nueva (`/calderas-ermua/`, `/fontanero-eibar/`…): copiar `desatascos-ermua/index.html`, cambiar los textos, el title, la description, el canonical y el JSON-LD; quitar `data-pendiente` de sus enlaces y descomentar su URL en `sitemap.xml`.
- Si `/eu/` se publica sin traducir: añadir `noindex` en `eu/index.html` y quitar las líneas `hreflang="eu-ES"` de la home y de `sitemap.xml`.
