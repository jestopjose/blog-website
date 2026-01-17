import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: Number(process.env.PORT) || 4321,
    host: '0.0.0.0' // Changed from true to '0.0.0.0'
  },
  vite: {
    server: {
      allowedHosts: [
        'jestopblog.onrender.com',
        '.onrender.com', // This allows any Render subdomain
      ]
    }
  }
});
