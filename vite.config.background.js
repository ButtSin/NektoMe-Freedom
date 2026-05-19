import path from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "#": path.resolve(__dirname, "./"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      input: path.resolve(__dirname, "./src/js/background/background.js"),
      output: {
        format: "iife",
        entryFileNames: "src/background.js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
