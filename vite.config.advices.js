import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toPosix = (p) => p.replace(/\\/g, '/');

const srcDir = toPosix(path.resolve(__dirname, './src'));
const sharedStylesPath = toPosix(path.resolve(__dirname, 'src/shared/styles'));

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-theme-init',
      apply: 'build',
      closeBundle() {
        const root = process.cwd();
        const src = path.resolve(root, 'src/app/advices/theme-init.js');
        const dest = path.resolve(root, 'dist/src/app/advices/theme-init.js');

        if (fs.existsSync(src)) {
          fs.mkdirSync(path.dirname(dest), { recursive: true });
          fs.copyFileSync(src, dest);
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': srcDir,
      '#': toPosix(path.resolve(__dirname, './')),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [sharedStylesPath],
        api: 'modern',

        additionalData: (source, filename) => {
          const normalizedFilename = toPosix(filename);

          if (
            normalizedFilename.includes('/app/styles/') ||
            normalizedFilename.includes('/shared/styles/')
          ) {
            return source;
          }

          return `@use "helpers" as *;\n${source}`;
        },
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        popup: toPosix(path.resolve(__dirname, 'src/app/popup/index.html')),
        advices: toPosix(path.resolve(__dirname, 'src/app/advices/index.html')),
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
});
