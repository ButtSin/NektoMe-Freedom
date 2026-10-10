import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toPosix = (p) => p.replace(/\\/g, '/');

export default defineConfig({
  resolve: {
    alias: {
      '@': toPosix(path.resolve(__dirname, './src')),
      '#': toPosix(path.resolve(__dirname, './')),
    },
  },

  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: toPosix(path.resolve(__dirname, './src/app/background/background.js')),
      output: {
        format: 'iife',
        entryFileNames: 'src/background.js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
});
