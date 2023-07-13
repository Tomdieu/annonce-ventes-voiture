import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: false,
    },
    host: true, // needed for the Docker Container port mapping to work
    port: 3000, // you can replace this port with any port
  }
})