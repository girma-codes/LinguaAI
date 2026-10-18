import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    // Vite dev server port (frontend)
    port: 5173,

    proxy: {
      // Any request starting with /api is forwarded to the Express backend.
      // This eliminates CORS issues in development entirely — the browser
      // sees all requests as same-origin (localhost:5173).
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // No rewrite needed — Express routes are mounted at /api already.
      },
    },
  },
})
