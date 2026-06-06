import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  server: {
    port: 3000,
    allowedHosts: true,
  },
  plugins: [
    TanStackRouterVite(),
    tailwindcss(),
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    viteReact(),
  ],
})
