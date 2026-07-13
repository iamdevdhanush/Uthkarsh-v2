export const REGISTRATION_MODE = import.meta.env.VITE_REGISTRATION_MODE as string | undefined
export const REGISTRATION_API_URL = import.meta.env.VITE_REGISTRATION_API_URL as string | undefined

export const IS_PRODUCTION = REGISTRATION_MODE === 'production'
export const IS_MOCK = REGISTRATION_MODE === 'mock' || !REGISTRATION_MODE

export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
export const MAX_FILE_SIZE = 5 * 1024 * 1024

export const APP_NAME = 'UTKARSH 26'
