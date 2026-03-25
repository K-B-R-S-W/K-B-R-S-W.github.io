import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // Change to '/repo-name/' if deploying to a project page (not username.github.io)
})
