/**
 * FUENTE ÚNICA DE DATOS DEL NEGOCIO
 * Todo el NAP (nombre, dirección, teléfono), horario, servicios, zona, reseñas y FAQ
 * salen de aquí: la web, el JSON-LD y los CTA usan siempre los mismos datos (consistencia NAP).
 *
 * Convención: cualquier texto entre [CORCHETES] es un dato pendiente de confirmar con el cliente.
 * En pantalla se marca en ámbar (clase .tbd) y en el JSON-LD se elimina automáticamente.
 */

export const SITE = 'https://fontaneriarif.com';

export const negocio = {
  nombre: 'Fontanería RIF',
  marcaDesatascos: 'RIF Desatascos',
  descripcion:
    'Fontaneros en Ermua (Bizkaia) con más de 20 años de experiencia: desatascos, fugas, calderas, calefacción y aerotermia, aire acondicionado, gas y reformas de baño y cocina para particulares y comunidades.',
  direccion: {
    calle: 'C/ Marqués de Valdespina', // [CONFIRMAR número de portal]
    cp: '48260',
    localidad: 'Ermua',
    provincia: 'Bizkaia',
    pais: 'ES',
  },
  direccionTexto: 'C/ Marqués de Valdespina, 48260 Ermua, Bizkaia',
  // Coordenadas APROXIMADAS (Ermua). [CONFIRMAR con la ficha de Google Business Profile]
  geo: { lat: 43.1868, lng: -2.5011 },
  telefono: { display: '605 711 081', e164: '+34605711081' },
  fijo: { display: '943 579 580', e164: '+34943579580' },
  email: 'riffontaneria@gmail.com',
  // [CONFIRMAR que el 605 711 081 tiene WhatsApp]
  whatsapp:
    'https://wa.me/34605711081?text=' +
    encodeURIComponent('Hola, os escribo desde la web. Necesito ayuda con: '),
  // Lunes(1) a viernes(5). Minutos desde medianoche. Festivos no contemplados.
  horario: { dias: [1, 2, 3, 4, 5], tramos: [[540, 780], [900, 1140]] as [number, number][] },
  horarioCorto: 'L–V 9:00–13:00 y 15:00–19:00',
  priceRange: '€€', // [CONFIRMAR rango de precios]
  sameAs: [] as string[], // Añadir: URL de Google Business Profile, Facebook, Instagram…
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Fontanería RIF, C/ Marqués de Valdespina, 48260 Ermua'),
  mapsEmbed:
    'https://www.google.com/maps?q=' +
    encodeURIComponent('Fontanería RIF, Marqués de Valdespina, 48260 Ermua, Bizkaia') +
    '&output=embed',
};

/** true cuando /eu/ tenga contenido traducido. Controla hreflang eu-ES y el noindex de /eu/. */
export const EU_LISTO = true; // Prototipo: true para mostrar la estructura. Antes de publicar sin traducir → false.

/* ───────────────────────── ZONA DE SERVICIO ─────────────────────────
 * PENDIENTE DE VALIDAR CON EL CLIENTE: lista de municipios propuesta para el prototipo.
 * Cada municipio (salvo Ermua) tendrá su página /fontanero-<slug>/.
 */
export const zona = [
  { nombre: 'Ermua', provincia: 'Bizkaia', slug: null },
  { nombre: 'Eibar', provincia: 'Gipuzkoa', slug: 'fontanero-eibar' },
  { nombre: 'Mallabia', provincia: 'Bizkaia', slug: 'fontanero-mallabia' },
  { nombre: 'Zaldibar', provincia: 'Bizkaia', slug: 'fontanero-zaldibar' },
  { nombre: 'Elgeta', provincia: 'Gipuzkoa', slug: 'fontanero-elgeta' },
  { nombre: 'Berriz', provincia: 'Bizkaia', slug: 'fontanero-berriz' },
  { nombre: 'Durango', provincia: 'Bizkaia', slug: 'fontanero-durango' },
  { nombre: 'Elorrio', provincia: 'Bizkaia', slug: 'fontanero-elorrio' },
] as const;

export const zonaTexto = 'Ermua, Eibar, Mallabia, Zaldibar, Elgeta, Berriz, Durango y Elorrio';

/* ───────────────────────── SERVICIOS ─────────────────────────
 * `url` = landing propia. `lista: true` = ya desarrollada en el prototipo.
 * `texto` = respuesta directa citable (qué es, dónde y para quién).
 */
export type Servicio = {
  id: string;
  nombre: string;
  texto: string;
  icono: string;
  url?: string;
  enlace?: string;
  lista?: boolean;
};

export type Grupo = { id: string; nombre: string; intro: string; icono: string; servicios: Servicio[] };

export const grupos: Grupo[] = [
  {
    id: 'urgencias',
    nombre: 'Urgencias y averías',
    intro: 'Atascos, fugas y averías de fontanería en Ermua y alrededores.',
    icono: 'droplet',
    servicios: [
      {
        id: 'desatascos',
        nombre: 'Desatascos',
        texto:
          'Desatascamos fregaderos, inodoros, tuberías y arquetas en Ermua y alrededores, y eliminamos los malos olores. Lo hace RIF Desatascos, nuestra unidad especializada, en pisos, locales y comunidades.',
        icono: 'pipe',
        url: '/desatascos-ermua/',
        enlace: 'Desatascos en Ermua',
        lista: true,
      },
      {
        id: 'fugas',
        nombre: 'Fugas y humedades',
        texto:
          'Buscamos el origen de la fuga o la humedad y la reparamos, junto con los daños que haya dejado en paredes, techos o suelos: tenemos albañiles y pintores en el equipo.',
        icono: 'search',
        url: '/fugas-y-humedades/',
        enlace: 'Fugas y humedades',
      },
      {
        id: 'videoinspeccion',
        nombre: 'Videoinspección de tuberías',
        texto:
          'Revisamos el interior de la tubería con una cámara CCTV robotizada, de 75 a 1200 mm de diámetro, para ver atascos, roturas o raíces sin levantar el suelo.',
        icono: 'camera',
        url: '/videoinspeccion-tuberias/',
        enlace: 'Videoinspección con cámara',
      },
      {
        id: 'fontaneria',
        nombre: 'Fontanería general',
        texto:
          'Reparamos e instalamos grifos, cisternas, tuberías y llaves de paso en viviendas y locales de Ermua y la comarca.',
        icono: 'wrench',
      },
    ],
  },
  {
    id: 'clima',
    nombre: 'Calefacción y clima',
    intro: 'Calderas, termos, aerotermia, aire acondicionado y gas. Somos instaladores autorizados de calderas.',
    icono: 'flame',
    servicios: [
      {
        id: 'calderas',
        nombre: 'Calderas y termos',
        texto:
          'Instalamos, cambiamos y reparamos calderas de gas, gasoil, eléctricas, de condensación y de pellets, y también termos. Somos instaladores autorizados de calderas.',
        icono: 'flame',
        url: '/calderas-ermua/',
        enlace: 'Calderas en Ermua',
      },
      {
        id: 'aerotermia',
        nombre: 'Calefacción y aerotermia',
        texto:
          'La aerotermia calienta la casa y el agua con la energía del aire exterior: hasta un 80 % de la energía que usa es gratuita. Estudiamos si encaja en tu vivienda y la instalamos.',
        icono: 'wind',
        url: '/aerotermia-ermua/',
        enlace: 'Aerotermia en Ermua',
      },
      {
        id: 'aire',
        nombre: 'Aire acondicionado',
        texto:
          'Instalamos aire acondicionado en viviendas y locales. La parte eléctrica la hacen nuestros propios electricistas.',
        icono: 'snow',
      },
      {
        id: 'gas',
        nombre: 'Instalaciones de gas',
        texto:
          'Hacemos instalaciones de gas nuevas y modificaciones en viviendas y locales de Ermua y alrededores. [CONFIRMAR categoría de instalador de gas]',
        icono: 'gauge',
      },
    ],
  },
  {
    id: 'reformas',
    nombre: 'Reformas de baño y cocina',
    intro: 'Un solo equipo de principio a fin: fontanería, albañilería, electricidad y pintura.',
    icono: 'bath',
    servicios: [
      {
        id: 'reformas',
        nombre: 'Reforma integral de baño y cocina',
        texto:
          'Reformamos baños y cocinas completos con nuestro propio equipo, sin que tengas que coordinar gremios. También adaptamos baños para personas con movilidad reducida.',
        icono: 'home',
        url: '/reforma-bano-ermua/',
        enlace: 'Reforma de baño en Ermua',
      },
      {
        id: 'banera',
        nombre: 'Cambio de bañera por plato de ducha',
        texto:
          'Quitamos la bañera y ponemos un plato de ducha: más fácil y seguro para entrar y salir, sobre todo para personas mayores.',
        icono: 'bath',
      },
      {
        id: 'mamparas',
        nombre: 'Mamparas a medida y muebles de baño',
        texto: 'Medimos e instalamos mamparas a medida y muebles de baño para aprovechar bien el espacio.',
        icono: 'ruler',
      },
    ],
  },
  {
    id: 'comunidades',
    nombre: 'Comunidades y edificios',
    intro: 'Para comunidades de propietarios, hoteles, colegios, oficinas y hospitales.',
    icono: 'building',
    servicios: [
      {
        id: 'bajantes',
        nombre: 'Bajantes',
        texto:
          'Reparamos y sustituimos bajantes en comunidades de propietarios, hoteles, colegios, oficinas y hospitales. Con la cámara vemos su estado antes de decidir qué cambiar.',
        icono: 'pipe',
        url: '/bajantes-comunidades/',
        enlace: 'Bajantes para comunidades',
      },
      {
        id: 'mantenimiento',
        nombre: 'Mantenimiento de comunidades',
        texto:
          'Nos ocupamos del mantenimiento del edificio: canalones, impermeabilización de terrazas, chimeneas, tejados y sistemas anti-aves.',
        icono: 'building',
      },
    ],
  },
];

export const servicios = grupos.flatMap((g) => g.servicios);

/* ───────────────────────── RESEÑAS REALES ─────────────────────────
 * Solo las tres reseñas reales facilitadas. Falta el texto literal, la puntuación y la plataforma.
 */
export const resenas = [
  {
    autor: 'Mikel Zuloaga',
    tipo: 'Particular',
    destaca: ['Rapidez', 'Trato', 'Precio', 'Precisión'],
    resumen: 'Destaca la rapidez, el trato, el precio y la precisión del trabajo.',
  },
  {
    autor: 'Raul Aldalur',
    tipo: 'Particular',
    destaca: ['Detección rápida', 'Bajantes'],
    resumen: 'Al cambiar una bajante, detectaron enseguida una fuga.',
  },
  {
    autor: 'Recoex SL',
    tipo: 'Empresa',
    destaca: ['Buen trabajo', 'Precio ajustado'],
    resumen: 'Buen trabajo y precio ajustado.',
  },
];

/* ───────────────────────── FAQ ─────────────────────────
 * Preguntas reales del vecino. La respuesta empieza siempre con la contestación directa.
 */
export type Faq = { q: string; a: string };

const faqPrecioDesatasco: Faq = {
  q: '¿Cuánto cuesta un desatasco en Ermua?',
  a: 'Depende de dónde esté el atasco (no es lo mismo un fregadero que una arqueta) y de si hace falta la cámara para localizarlo. Antes de empezar te decimos el precio, y el presupuesto es sin compromiso. [PRECIO ORIENTATIVO A CONFIRMAR, p. ej. «desde X €»]',
};
const faqFinde: Faq = {
  q: '¿Atendéis urgencias en fin de semana?',
  a: 'Nuestro horario es de lunes a viernes, de 9:00 a 13:00 y de 15:00 a 19:00; sábados y domingos está cerrado. Fuera de horario puedes mandarnos un WhatsApp al 605 711 081 con fotos de la avería y te contestamos al abrir. [CONFIRMAR si hay servicio de urgencias en fin de semana]',
};
const faqZona: Faq = {
  q: '¿En qué localidades trabajáis?',
  a: `Estamos en Ermua y trabajamos en Ermua y alrededores: ${zonaTexto.replace('Ermua, ', '')}.`,
};
const faqComunidades: Faq = {
  q: '¿Trabajáis con comunidades de vecinos?',
  a: 'Sí. Trabajamos con comunidades de propietarios en bajantes, arquetas, desatascos, canalones, impermeabilización de terrazas, tejados, chimeneas y sistemas anti-aves. También con hoteles, colegios, oficinas y hospitales.',
};

export const faqsHome: Faq[] = [
  faqPrecioDesatasco,
  faqFinde,
  {
    q: '¿Merece la pena la aerotermia en Bizkaia?',
    a: 'En muchas casas, sí. La aerotermia saca hasta un 80 % de su energía del aire, y los inviernos suaves de Bizkaia le favorecen. Que compense depende del aislamiento, de si tienes suelo radiante o radiadores y de lo que gastas ahora en calefacción. Lo estudiamos en tu vivienda y te damos presupuesto sin compromiso. [CONFIRMAR ayudas o subvenciones vigentes que se puedan mencionar]',
  },
  {
    q: '¿Gestionáis los permisos de gas?',
    a: 'Somos instaladores autorizados de calderas, así que al terminar te entregamos la documentación que pide la normativa para poner la instalación en marcha. [CONFIRMAR qué trámites gestiona exactamente RIF: certificado de instalación, alta con la distribuidora, inspección…]',
  },
  faqComunidades,
  {
    q: '¿Hacéis la reforma del baño completa o solo la fontanería?',
    a: 'Completa. Tenemos fontaneros, albañiles, electricistas y pintores, así que no tienes que buscar ni coordinar a nadie más. También adaptamos baños para movilidad reducida y cambiamos bañeras por platos de ducha.',
  },
  faqZona,
];

export const faqsDesatascos: Faq[] = [
  faqPrecioDesatasco,
  faqFinde,
  {
    q: '¿Qué hacéis si el atasco vuelve a aparecer?',
    a: 'Si un atasco se repite, casi siempre hay una causa detrás: grasa acumulada, poca pendiente, una rotura o raíces. Con la videoinspección por cámara vemos el interior de la tubería y te explicamos qué conviene reparar para que no vuelva.',
  },
  {
    q: '¿Desatascáis arquetas y bajantes de comunidades?',
    a: 'Sí. Desatascamos arquetas, bajantes y colectores de comunidades de propietarios, y también reparamos o sustituimos la bajante si está dañada.',
  },
  {
    q: '¿Cómo quitáis el olor a alcantarilla?',
    a: 'Primero buscamos de dónde viene: un sifón seco o mal colocado, una arqueta sucia, una ventilación mal resuelta o una tubería rota. Después lo arreglamos en el origen, para que el olor no vuelva.',
  },
  faqZona,
];

/* ───────────────────────── PROYECTOS (antes / después) ───────────────────────── */
export const proyectos = [
  {
    escena: 'bano',
    titulo: 'Cambio de bañera por plato de ducha',
    lugar: '[LOCALIDAD]',
    texto: 'Bañera fuera, plato de ducha y mampara a medida. [Duración y detalles de la obra]',
  },
  {
    escena: 'cocina',
    titulo: 'Reforma integral de cocina',
    lugar: '[LOCALIDAD]',
    texto: 'Fontanería, electricidad, albañilería y pintura con el mismo equipo. [Detalles]',
  },
  {
    escena: 'bajante',
    titulo: 'Sustitución de bajante en comunidad',
    lugar: '[LOCALIDAD]',
    texto: 'Revisión con cámara y cambio del tramo dañado. [Detalles]',
  },
] as const;

/* ───────────────────────── UTILIDADES ───────────────────────── */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Texto → HTML con los [placeholders] resaltados. */
export const marcas = (s: string) =>
  esc(s).replace(/\[([^\]]+)\]/g, '<span class="tbd">[$1]</span>');

/** Texto sin [placeholders], para JSON-LD y metadatos. */
export const limpio = (s: string) => s.replace(/\s*\[[^\]]+\]/g, '').trim();
