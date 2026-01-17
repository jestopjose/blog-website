import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: Number(process.env.PORT) || 4321,
    host: '0.0.0.0'
  },
  vite: {
    plugins: [tailwind()],
    server: {
      allowedHosts: [
        'jestopblog.onrender.com',
        '.onrender.com', // This allows any Render subdomain
      ]
    }
  }
});
