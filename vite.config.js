import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#': path.resolve(__dirname, './'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/helpers/_index.scss" as *;
        `,
      },
    },
  },

  build: {
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, './src/html/popup/index.html'),
        advices: path.resolve(__dirname, './src/html/advices/index.html'),
        background: path.resolve(__dirname, './src/js/background/background.js'),
        content: path.resolve(__dirname, './src/js/content/content.js'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'background' || chunkInfo.name === 'content') {
            return 'src/[name].js';
          }

          return 'assets/[name]-[hash].js';
        },
      },
    },
  },
});
