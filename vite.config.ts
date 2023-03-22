import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv'
config({
  path: './.env.local'
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `https://mock.presstime.cn/mock/${process.env.REACT_APP_Mock_Project_ID}`,
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': 'src'
    }
  }
})
