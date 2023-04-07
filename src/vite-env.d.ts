/// <reference types="vite/client" />
declare interface ImportMetaEnv {
  VITE_API_BASE_URL: string
  VITE_API_MOCK_URL?: string
  VITE_API_USE_MOCK?: 'false' | 'true'
}
