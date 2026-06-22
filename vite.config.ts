import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), enhancedImages(), sveltekit()],
  server: {
    port: 5173,
    strictPort: false,
    host: '127.0.0.1'
  },
  preview: {
    port: 4173,
    strictPort: false
  },
  build: {
    target: 'es2022',
    sourcemap: true
  }
});
