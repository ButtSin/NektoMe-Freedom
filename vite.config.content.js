import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#': path.resolve(__dirname, './'),
    },
  },

  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: path.resolve(__dirname, './src/app/content/content.js'),
      output: {
        format: 'iife',
        entryFileNames: 'src/content.js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
});
