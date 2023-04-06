import { defineConfig, type ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  config({
    path: path.join(__dirname, `.env.${mode}`)
  })
  const {
    REACT_APP_MOCK_URL: mockBaseURL,
    REACT_APP_BASE_URL: baseURL,
    REACT_APP_MOCK_PROJECT_ID: mockProjectId,
    REACT_APP_USE_MOCK: useMock
  } = process.env

  return {
    plugins: [react()],
    server: {
      open: false,
      proxy: {
        '/api': {
          target:
            useMock!.toLocaleLowerCase() === 'true' ? `${mockBaseURL}/${mockProjectId}` : baseURL,
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
