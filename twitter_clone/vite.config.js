import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/tweets": "http://localhost:5000",
      "/users": "http://localhost:5000"
    }
  }
})
