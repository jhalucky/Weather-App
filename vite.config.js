import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const isGithub = mode === 'github' || process.env.VITE_DEPLOY_TARGET === 'github'

  return {
    plugins: [react(), tailwindcss()],
    base: isGithub ? '/Weather-App/' : '/',
  }
})
