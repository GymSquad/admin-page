import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import pages from "vite-plugin-pages";

import { fileURLToPath } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    react(),
    pages({
      dirs: [
        {
          dir: "src/app",
          baseRoute: "",
          filePattern: "page.tsx",
        },
      ],
      extendRoute(route: { path: string }) {
        if (route.path.endsWith("page")) {
          return {
            ...route,
            // remove the last `page` word
            path: route.path.replace(/page$/, ""),
          };
        }
      },
    }),
  ],
});
