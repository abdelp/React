import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: ".",
  base: "/",
  define: {
    __APP_VERSION: JSON.stringify("v1.0.0"),
    __API_URL__: "window.__backend_api_url",
  },
  plugins: [react() /*, tailwindcss()*/],
  publicDir: "public",
  cacheDir: "node_modules/.vite",
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    lib: {
      entry: "src/main.tsx", // Your app's entry point
      formats: ["es"], // Required for single-spa
      fileName: () => "microfrontend.js",
    },
  },
});
