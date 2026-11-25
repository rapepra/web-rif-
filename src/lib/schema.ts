/** Generadores de JSON-LD (schema.org). Todo sale de src/data/negocio.ts → NAP idéntico en toda la web. */
import { SITE, negocio, zona, servicios, limpio, type Faq, type Servicio } from '../data/negocio';

export const ID = {
  negocio: `${SITE}/#negocio`,
  web: `${SITE}/#web`,
};

const areaServed = zona.map((z) => ({
  '@type': 'City',
  name: z.nombre,
  containedInPlace: { '@type': 'AdministrativeArea', name: z.provincia },
}));

export const plumber = () => ({
  '@type': 'Plumber',
  '@id': ID.negocio,
  name: negocio.nombre,
  alternateName: negocio.marcaDesatascos,
  description: negocio.descripcion,
  url: `${SITE}/`,
  logo: `${SITE}/logo.svg`,
  image: [`${SITE}/og-fontaneria-rif.jpg`],
  telephone: negocio.telefono.e164,
  email: negocio.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: negocio.direccion.calle,
    addressLocality: negocio.direccion.localidad,
    postalCode: negocio.direccion.cp,
    addressRegion: negocio.direccion.provincia,
    addressCountry: negocio.direccion.pais,
  },
  geo: { '@type': 'GeoCoordinates', latitude: negocio.geo.lat, longitude: negocio.geo.lng },
  hasMap: negocio.mapsUrl,
  openingHoursSpecification: [
    ['09:00', '13:00'],
    ['15:00', '19:00'],
  ].map(([opens, closes]) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens,
    closes,
  })),
  contactPoint: [
    { tel: negocio.telefono.e164, tipo: 'customer service' },
    { tel: negocio.fijo.e164, tipo: 'customer service' },
  ].map((c) => ({
    '@type': 'ContactPoint',
    telephone: c.tel,
    contactType: c.tipo,
    areaServed: 'ES',
    availableLanguage: ['es', 'eu'],
  })),
  areaServed,
  knowsLanguage: ['es', 'eu'],
  priceRange: negocio.priceRange,
  sameAs: negocio.sameAs,
});

export const website = () => ({
  '@type': 'WebSite',
  '@id': ID.web,
  url: `${SITE}/`,
  name: negocio.nombre,
  inLanguage: 'es-ES',
  publisher: { '@id': ID.negocio },
});

export const servicio = (s: Servicio) => ({
  '@type': 'Service',
  '@id': `${SITE}${s.url ?? '/'}#servicio-${s.id}`,
  name: s.nombre,
  serviceType: s.nombre,
  description: limpio(s.texto),
  ...(s.url ? { url: `${SITE}${s.url}` } : {}),
  provider: { '@id': ID.negocio },
  areaServed,
});

export const todosLosServicios = () => servicios.map(servicio);

export const webPage = (o: { path: string; titulo: string; tipo?: string; about?: string }) => ({
  '@type': o.tipo ?? 'WebPage',
  '@id': `${SITE}${o.path}#webpage`,
  url: `${SITE}${o.path}`,
  name: o.titulo,
  inLanguage: 'es-ES',
  isPartOf: { '@id': ID.web },
  about: { '@id': o.about ?? ID.negocio },
});

export const faqPage = (faqs: Faq[], path: string) => ({
  '@type': 'FAQPage',
  '@id': `${SITE}${path}#faq`,
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: limpio(f.a) },
  })),
});

export type Miga = { nombre: string; path: string };

export const breadcrumbs = (migas: Miga[]) => ({
  '@type': 'BreadcrumbList',
  '@id': `${SITE}${migas[migas.length - 1].path}#breadcrumb`,
  itemListElement: migas.map((m, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: m.nombre,
    item: `${SITE}${m.path}`,
  })),
});

export const grafo = (...nodos: object[]) => ({ '@context': 'https://schema.org', '@graph': nodos });
