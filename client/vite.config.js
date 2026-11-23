import { defineConfig } from 'vite';

const proxy = { '/api': 'http://localhost:3001' };

export default defineConfig({
  server: { proxy },
  preview: { proxy }
});
