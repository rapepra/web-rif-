// @ts-check
import { defineConfig } from 'astro/config';

// Salida 100 % estática, CSS inline en cada página y URLs limpias con barra final
// (/desatascos-ermua/ → dist/desatascos-ermua/index.html), que funcionan en cualquier hosting.
export default defineConfig({
  site: 'https://fontaneriarif.com',
  trailingSlash: 'always',
  compressHTML: true,
  build: { format: 'directory', inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
});
