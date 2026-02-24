import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/sansu-drill/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 3100,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
