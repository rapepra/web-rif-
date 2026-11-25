# Fontanería RIF · versión HTML + CSS

Esta rama (`html-estatico`) contiene la web en **HTML, CSS y JavaScript planos**, sin Node, sin compilación y sin dependencias. Se sube tal cual a cualquier hosting (FTP, Cloudflare Pages, Netlify, GitHub Pages…).

La versión con Astro, con los datos centralizados y las plantillas, está en la rama `main`.

## Estructura

```
index.html                  Home
desatascos-ermua/index.html Landing modelo (SEO + Google Ads, sin menú)
contacto/index.html         Contacto
eu/index.html               Versión en euskera (estructura, por traducir)
aviso-legal/ privacidad/    Plantillas legales (noindex)
404.html                    Página de error
css/estilos.css             Todo el CSS (un solo archivo)
js/app.js                   Todo el JS: horario abierto/cerrado, cookies, eventos dataLayer, mapa, formulario, antes/después
robots.txt sitemap.xml llms.txt
favicon.svg logo.svg apple-touch-icon.png og-fontaneria-rif.jpg
docs/jsonld/                Copia del JSON-LD para revisarlo
```

## Verla en local

Los enlaces usan rutas absolutas (`/contacto/`), igual que en producción. Por eso hay que abrirla con un servidor y no con doble clic:

- VS Code: extensión **Live Server**, clic derecho en `index.html` → *Open with Live Server*.
- O en la terminal: `python3 -m http.server 8000` → http://localhost:8000

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
