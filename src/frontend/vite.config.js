import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
// import tsconfigPaths from "vite-tsconfig-paths";
// import nodeResolve from "@rollup/plugin-node-resolve";

// import commonjs from "@rollup/plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})
  