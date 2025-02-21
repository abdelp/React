import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs, { readFileSync } from "fs";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import resolve from "@rollup/plugin-node-resolve";
// import { exec } from "child_process";

const spaConfig = JSON.parse(readFileSync(path.resolve("spa.config"), "utf8"));

const projectConfig = {
  port: spaConfig?.port || 3000,
  host: "localhost",
  sourceMap: true,
  minify: false,
};

export default async () => {
  const serverConfig = {
    port: projectConfig.port,
    strictPort: true,
    open: false,
    host: projectConfig.host,
  };

  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
      },
    },
    build: {
      cssCodeSplit: false,
      watch: {
        exclude: ["node_modules"],
      },
      emptyOutDir: true,
      rollupOptions: {
        cache: true,
        treeshake: {
          preset: "smallest",
        },
        input: "src/main.tsx",
        preserveEntrySignatures: "strict",
        plugins: [
          resolve(),
          // {
          //   name: "run-after-build",
          //   buildEnd() {
          //     const postcssPath = path.join(
          //       __dirname,
          //       "node_modules",
          //       ".bin",
          //       "postcss"
          //     );
          //     exec(postcssPath, (err, stdout, stderr) => {
          //       if (err) {
          //         console.error(err);
          //         return;
          //       }
          //       if (stderr) {
          //         console.error(stderr);
          //         return;
          //       }
          //       console.log(stdout);
          //     });
          //   },
          // },
        ],
        output: {
          format: "systemjs",
          entryFileNames: "microfrontend.js",
          assetFileNames: "microfrontend.[ext]",
          chunkFileNames: () => {
            return "[name].[hash].js";
          },
        },
      },
      minify: projectConfig.minify,
      sourcemap: projectConfig.sourceMap,
    },
    preview: serverConfig,
  });
};
