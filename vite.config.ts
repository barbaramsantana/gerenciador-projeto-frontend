import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '',
        quietDeps: true, // Ignora avisos de dependências
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom', 
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
})
