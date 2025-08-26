import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/scene': path.resolve(__dirname, 'src/scene'),
      '@/ui': path.resolve(__dirname, 'src/ui'),
      '@/types': path.resolve(__dirname, 'src/types'),
    },
  },
});