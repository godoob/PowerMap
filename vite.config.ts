import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // MapLibre alone is ~1 MB minified; it is lazy-loaded in its own chunk,
    // so raise the limit just enough to keep that expected chunk from warning.
    chunkSizeWarningLimit: 1200,
  },
})
