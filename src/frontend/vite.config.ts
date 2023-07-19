import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-lodash': ['lodash'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust the value according to your needs
  },
})
