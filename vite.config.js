import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// `base` must match the GitHub repository name for GitHub Pages deployment.
export default defineConfig({
  plugins: [react()],
  base: '/paradise-nursery/',
})
