export function isDevelopment() {
  return import.meta.env.DEV
}

export function isMock() {
  return isDevelopment() && import.meta.env.VITE_USE_MOCK === 'true'
}