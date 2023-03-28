import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// function pathResolve(dir: string) {
//   return resolve(process.cwd(), ".", dir);
// }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(process.cwd(), "src"),
      "~bootstrap": "bootstrap",
    },
  },
  server: {
    port: 4000,
    //开发代理
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
      },
    },
  },
  css: {
    preprocessorOptions: {  //scss前置预处理器
      scss: {
        additionalData: `@import "./src/styles/variables";`,
      },
    },
  },
});
