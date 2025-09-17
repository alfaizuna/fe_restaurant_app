export const env = {
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Restaurant App',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
} as const

export const isDevelopment = env.NODE_ENV === 'development'
export const isProduction = env.NODE_ENV === 'production'
export const isTest = env.NODE_ENV === 'test'
