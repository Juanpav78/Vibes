import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  // Precarga las páginas al pasar el cursor por los enlaces
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // Fuentes auto-hospedadas y precargadas (sin peticiones a Google en runtime)
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Livvic',
      cssVariable: '--font-title',
      weights: [700, 900],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Questrial',
      cssVariable: '--font-text',
      weights: [400],
      fallbacks: ['sans-serif'],
    },
  ],
});
