import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // line below REQUIRED to add jsdom to vite
    environment: 'jsdom',
  }
})
