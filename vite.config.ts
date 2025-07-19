import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@interfaces': '/src/interfaces',
      '@pages': '/src/pages',
      '@components': '/src/components',
      '@services': '/src/services',
      '@hooks': '/src/hooks',
      '@config': '/src/config',
      '@icons': '/src/icons',
      '@utils': '/src/utils',
    },
  },
})
