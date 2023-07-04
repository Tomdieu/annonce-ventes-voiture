import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import path from "path";
import dotenv from 'dotenv';
// import tsconfigPaths from "vite-tsconfig-paths";
// import nodeResolve from "@rollup/plugin-node-resolve";

// import commonjs from "@rollup/plugin-commonjs";

// https://vitejs.dev/config/
// dotenv.config({
//   path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
// });

export default defineConfig({
  plugins: [react()]
})