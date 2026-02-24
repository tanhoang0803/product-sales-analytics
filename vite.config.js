import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Required for GitHub Pages — assets resolve relative to the repo sub-path
  base: '/product-sales-analytics/',
});
