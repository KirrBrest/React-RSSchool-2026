import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const swapiProxy = {
  '/swapi': {
    target: 'https://swapi.py4e.com',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/swapi/, '/api'),
  },
};

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: swapiProxy,
  },
  preview: {
    proxy: swapiProxy,
  },
});
