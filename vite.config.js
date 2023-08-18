import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import px2rem from "postcss-px2rem"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    postcss: {
        plugins: [
          px2rem({
            remUnit:192
          })
        ]
    }
  },
  plugins: [vue()],
});
