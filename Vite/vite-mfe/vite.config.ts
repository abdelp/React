import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/main.tsx", // Your app's entry point
      formats: ["es"], // Required for single-spa
      fileName: () => "microfrontend.js",
    },
  },
});
