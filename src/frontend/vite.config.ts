import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   minify: true, // Enable or disable minification
  //   cssMinify: true, // Enable or disable CSS minification
  //   chunkSizeWarningLimit: 1000, // Adjust the value according to your needs
  //   // outDir: '../backend/frontend/build/',
  //   assetsDir: 'static',
  // },
  
})
