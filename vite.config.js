import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' lets the build run from any folder (e.g. public_html/pharmacy on Hostinger)
export default defineConfig({
  plugins: [react()],
  base: './',
});
