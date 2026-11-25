# Fontanería RIF · prototipo de la nueva web

Astro 5 con salida 100 % estática. No usa ningún framework de JS: hay un único script vanilla de unos 4 KB, minificado e inline. Todo el CSS va inline.

## Verlo

```bash
npm install        # solo la primera vez
npm run build      # genera dist/
npx serve dist     # abre http://localhost:3000
```

> La carpeta tiene ":" en el nombre (`cosas presupuesta: webs…`), y eso rompe `npx astro`. Por eso los scripts de `package.json` llaman a Astro con `node node_modules/astro/astro.js`. Usa siempre `npm run …`.

## Qué hay

| Ruta | Qué es |
|---|---|
| `/` | Home completa: hero, servicios, por qué RIF y sobre nosotros, proceso, antes/después, reseñas, zona, FAQ, contacto |
| `/desatascos-ermua/` | Landing modelo, válida para SEO y para Google Ads (sin menú) |
| `/contacto/` | Contacto con NAP, formulario y mapa |
| `/eu/` | Estructura de la versión en euskera, con textos provisionales |
| `/aviso-legal/`, `/privacidad/` | Plantillas legales con huecos por rellenar (`noindex`) |
| `404.html` | Error útil, con teléfono y enlaces |
| `robots.txt`, `sitemap.xml`, `llms.txt` | En `public/` |
| `docs/jsonld/` | Copia del JSON-LD de cada página para revisarlo (el que cuenta es el que va dentro del HTML) |

Los enlaces a páginas previstas que aún no existen (`/calderas-ermua/`, `/fontanero-eibar/`…) llevan `data-pendiente`. En el prototipo muestran un aviso en lugar de llevar a un 404. Al crear cada página, quítale ese atributo y descomenta su URL en `sitemap.xml`.

## Dónde se cambia cada cosa

- **Datos del negocio (NAP, horario, servicios, zona, reseñas, FAQ):** `src/data/negocio.ts`. Es la única fuente: la web, el JSON-LD y los botones se generan desde aquí.
- **Placeholders:** cualquier texto `[ENTRE CORCHETES]` en `negocio.ts` sale resaltado en ámbar en pantalla y se elimina del JSON-LD. Busca `[` o `tbd` para ver la lista completa.
- **Estilos:** `src/styles/global.css`. **JS:** `src/scripts/app.js`.
- **Euskera:** `EU_LISTO` en `negocio.ts`. Si la versión `/eu/` va a publicarse sin traducir, ponlo a `false`: quita el `hreflang eu-ES` y marca `/eu/` como `noindex`.

## Antes de publicar

1. Rellenar los `[DATOS A CONFIRMAR]`: número de portal, coordenadas exactas, precios orientativos, nº de registro de instalador, textos literales y notas de las reseñas, municipios de la zona, si el móvil tiene WhatsApp, urgencias en fin de semana.
2. Fotos reales: antes/después, equipo y hero (en AVIF/WebP con `srcset`).
3. Formulario: conectar `action` a un endpoint (Netlify Forms, Formspree, Worker…) y lanzar `envio_formulario` solo cuando el envío se confirme (ver `src/scripts/app.js`).
4. Analítica: descomentar el snippet de GTM/GA4 en `cargarAnalitica()` (`src/scripts/app.js`). Solo se carga tras aceptar las cookies.
5. Hosting con HTTPS y compresión gzip/brotli (Cloudflare Pages, Netlify…). Los textos legales los tiene que revisar una asesoría.
6. Google Business Profile: añadir su URL en `sameAs` y en el botón de reseñas.

## Medido en local (Lighthouse 12, móvil, servidor con gzip)

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS | Peso transferido |
|---|---|---|---|---|---|---|---|
| Home | 99 | 100 | 100 | 100 | 1,5 s | 0 | 25 KB |
| Desatascos | 100 | 100 | 100 | 100 | 1,2–1,3 s | 0 | 17 KB |

Ojo: en esta máquina aproximadamente una de cada tres pasadas sale en torno a 78 de rendimiento, por la carga del propio equipo y no por la web. Después de desplegar, conviene confirmar los números con PageSpeed Insights.
