import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
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
