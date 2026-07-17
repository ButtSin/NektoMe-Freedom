import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Функция для гарантии прямых слешей (критично для Windows)
const toPosix = (p) => p.replace(/\\/g, "/");

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": toPosix(path.resolve(__dirname, "./src")),
      "#": toPosix(path.resolve(__dirname, "./")),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [toPosix(path.resolve(__dirname, "src/shared/styles"))],
        additionalData: `@use "helpers" as *;\n`,
        api: "modern",
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: toPosix(path.resolve(__dirname, "./src/app/popup/index.html")),
        advices: toPosix(
          path.resolve(__dirname, "./src/app/advices/index.html"),
        ),
      },
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
