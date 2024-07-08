import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      entryRoot: path.resolve(__dirname, "src/lib/"),
    }),
  ],
  build:
    mode !== "web"
      ? {
          copyPublicDir: false,
          lib: {
            entry: path.resolve(__dirname, "src/lib/index.ts"),
            name: "react-weekview",
            fileName: (format) => `index.${format}.js`,
          },
          rollupOptions: {
            external: ["react", "react-dom", "date-fns"],
            output: {
              globals: {
                react: "React",
                "date-fns": "dateFns",
              },
            },
          },
        }
      : undefined,
}));
