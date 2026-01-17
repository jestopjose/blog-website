import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/server';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
  },
});
