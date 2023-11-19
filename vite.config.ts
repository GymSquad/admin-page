import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
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
