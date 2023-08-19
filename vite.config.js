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
  server:{
    proxy:{
      '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  plugins: [vue()],
});
