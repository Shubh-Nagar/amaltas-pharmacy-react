import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Same "/remote" proxy as vercel.json, so dev/preview behave like production.
const remoteProxy = {
  '/remote': {
    target: 'http://amaltasgroup.co.in',
    changeOrigin: true,
    rewrite: (p) => p.replace(/^\/remote/, '/pharmacy'),
  },
};

// base: './' lets the build run from any folder (e.g. public_html/pharmacy on Hostinger)
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { proxy: remoteProxy },
  preview: { proxy: remoteProxy },
});
