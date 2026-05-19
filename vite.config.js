import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const base = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "#": path.resolve(__dirname, "./"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/helpers/_index.scss" as *;`,
      },
    },
  },
  build: {
    outDir: "dist",
  },
};

export default defineConfig([
  // Конфиг для страниц (popup, advices) – с React
  {
    ...base,
    plugins: [react()],
    build: {
      ...base.build,
      emptyOutDir: true,
      rollupOptions: {
        input: {
          popup: path.resolve(__dirname, "./src/html/popup/index.html"),
          advices: path.resolve(__dirname, "./src/html/advices/index.html"),
        },
        output: {
          entryFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },
    },
  },
  // Конфиг для background и content – IIFE
  {
    ...base,
    build: {
      ...base.build,
      emptyOutDir: false,
      rollupOptions: {
        input: {
          background: path.resolve(
            __dirname,
            "./src/js/background/background.js",
          ),
          content: path.resolve(__dirname, "./src/js/content/content.js"),
        },
        output: {
          format: "iife",
          entryFileNames: "src/[name].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },
    },
  },
]);
