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
    //TODO: additionalData вставляется только в корневые файлы, которые не импортируются через use?
    //Пришлось всё импортировать в токены и globals. Либо исправить, либо понять, как всё работает.
    preprocessorOptions: {
      scss: {
        loadPaths: [sharedStylesPath],
        additionalData: `@use "helpers" as *;\n`,
      },
    },
  },
  build: {
    //TODO: Починить минификатор
    cssMinify: false,
    outDir: "dist",
    emptyOutDir: true,
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
