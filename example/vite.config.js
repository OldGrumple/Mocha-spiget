import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mocha-spiget/demo',  // Replace 'example' with your repository name
}) 