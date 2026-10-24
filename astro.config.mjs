import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://willayy.github.io',
  base: '/personal-webpage-2',
  integrations: [react()],
  output: 'static',
});
