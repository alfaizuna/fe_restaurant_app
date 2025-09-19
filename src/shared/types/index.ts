export * from './auth'
export * from './restaurant'
export * from './filters'
export * from './cart'
export * from './recommendation'

import type { Restaurant } from './restaurant'

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

export interface RestaurantListResponse {
  success: boolean
  message: string
  data: {
    restaurants: Restaurant[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
    }
    filters: {
      location: string
      range: number
      priceMin: number
      priceMax: number
      rating: number
    }
  }
}

export interface RestaurantSearchParams {
  range?: number
  priceMin?: number
  priceMax?: number
  rating?: number
  page?: number
  limit?: number
}
