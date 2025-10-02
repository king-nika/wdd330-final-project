import { resolve } from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  base: "/wdd330-final-project/",

  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        watchlist: resolve(__dirname, "src/watchlist/index.html"),
        movie: resolve(__dirname, "src/movie/index.html"),
      },
    },
  },
});
