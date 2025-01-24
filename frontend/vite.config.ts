import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows access from other machines (default: 'localhost')
    port: 5173, // Port on which the server will run (default: 5173)
    strictPort: true, // Prevents Vite from automatically trying another port if the specified one is taken
    open: true, // Opens the browser automatically when Vite starts (default: false)
    hmr: true, // Enables Hot Module Replacement (default: true)
  }
})
