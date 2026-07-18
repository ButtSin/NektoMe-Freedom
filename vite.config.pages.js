import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toPosix = (p) => p.replace(/\\/g, "/");

const srcDir = toPosix(path.resolve(__dirname, "./src"));
const sharedStylesPath = toPosix(path.resolve(__dirname, "src/shared/styles"));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": srcDir,
      "#": toPosix(path.resolve(__dirname, "./")),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [sharedStylesPath],
        api: "modern",

        additionalData: (source, filename) => {
          const normalizedFilename = toPosix(filename);

          if (
            normalizedFilename.includes("/app/styles/") ||
            normalizedFilename.includes("/shared/styles/")
          ) {
            return source;
          }

          return `@use "helpers" as *;\n${source}`;
        },
      },
    },
  },
  build: {
    cssMinify: false,
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        popup: toPosix(path.resolve(__dirname, "src/app/popup/index.html")),
        advices: toPosix(path.resolve(__dirname, "src/app/advices/index.html")),
      },
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
