import path from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    outDir: "dist",
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
});
