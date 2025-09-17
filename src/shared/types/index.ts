export * from './auth'
export * from './restaurant'

// Common types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
