import { defineConfig, type ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv'
import path from 'path'
import { exec } from 'child_process'
export default defineConfig(({ mode }: ConfigEnv) => {
  config({
    path: path.join(__dirname, `.env.${mode}`)
  })
  const {
    VITE_API_BASE_URL: baseURL,
    VITE_API_USE_MOCK: useMock,
    VITE_API_MOCK_URL: mockURL
  } = process.env
  const isMock = useMock ? useMock!.toLocaleLowerCase()=== 'true' : false
  const isDevelopment = mode === 'development'
  
  // if (isDevelopment && isMock) {
  //   exec('yarn mock')
  // }
  
  return {
    plugins: [react()],
    server: {
      open: false,
      https: false,
      port: 3000,
      proxy: {
        '/api': {
          target: isMock  ? mockURL : baseURL,
          changeOrigin: true
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    define: {
      _author: '"ainuo5213"',
      _siteTitle: '"ainuo的问卷调查"'
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "src/styles/mixin.scss";
          `
        }
      }
    }
  }
})
