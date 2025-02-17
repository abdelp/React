import { defineConfig, createLogger } from "vite";
import react from "@vitejs/plugin-react-swc";
// import tailwindcss from "@tailwindcss/vite";

const logger = createLogger();
const loggerWarn = logger.warn;

logger.warn = (msg, options) => {
  if (msg.includes("vite:css") && msg.includes(" is empty")) return;
  loggerWarn(msg, options);
};

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
      "@": "/src", // needs to be an absolute path?
    },
    dedupe: ["react", "react-dom"],
    conditions: ["module", "browser", "development|production"],
  },
  css: {
    devSourcemap: true,
    transformer: "postcss",
  },
  json: {
    namedExports: true,
    stringify: "auto",
  },
  build: {
    cssCodeSplit: false,
    emptyOutDir: true,
    minify: true,
    rollupOptions: {
      input: "src/main.tsx",
    },
  },
  logLevel: "info", // less verbose for production
  customLogger: logger,
  clearScreen: true,
  envDir: ".", // customize depending of environment
  envPrefix: "VITE_", // expose to client via import.meta.env. Should not be set as ''
  appType: "spa",
});
