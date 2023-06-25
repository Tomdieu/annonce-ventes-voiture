import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
// import tsconfigPaths from "vite-tsconfig-paths";
// import nodeResolve from "@rollup/plugin-node-resolve";

// import commonjs from "@rollup/plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // "@": path.resolve(__dirname, "./src/"),
      // "components": path.resolve(__dirname, "./src/components"),
      // "context": path.resolve(__dirname, "./src/context"),
      // "pages": path.resolve(__dirname, "./src/pages"),
      // "utils": path.resolve(__dirname, "./src/utils"),
      // "assets": path.resolve(__dirname, "./src/assets"),
      // "provider": path.resolve(__dirname, "./src/provider"),
      // "schema": path.resolve(__dirname, "./src/schema"),
      // "types": path.resolve(__dirname, "./src/types"),

    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
}})
  