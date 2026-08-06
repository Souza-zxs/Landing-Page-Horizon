import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // In local dev, serverless functions run separately via `vercel dev`
      // (see package.json `dev:api`). Running `vercel dev` directly on this
      // app's own port breaks module loading, because its vercel.json SPA
      // rewrite intercepts asset/module requests (e.g. /src/main.tsx) before
      // Vite's dev middleware can serve them, producing a blank page.
      '/api': 'http://localhost:3010',
    },
  },
})
