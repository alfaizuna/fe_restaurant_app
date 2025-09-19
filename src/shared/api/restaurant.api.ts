import { apiClient } from './client'
import type { Restaurant } from '../types/restaurant'
import type { ApiResponse, PaginatedResponse, RecommendedRestaurantsApiResponse } from '../types'

export const restaurantApi = {
  getRecommended: (): Promise<RecommendedRestaurantsApiResponse> =>
    apiClient.get<RecommendedRestaurantsApiResponse>('/resto/recommended'),
    
  // Public version of recommended restaurants (if available)
  getRecommendedPublic: (): Promise<RecommendedRestaurantsApiResponse> =>
    apiClient.get<RecommendedRestaurantsApiResponse>('/resto/recommended/public'),
    
  getById: (id: string): Promise<ApiResponse<Restaurant>> =>
    apiClient.get<ApiResponse<Restaurant>>(`/resto/${id}`),
    
  getAll: (params?: {
    page?: number
    limit?: number
    category?: string
    search?: string
  }): Promise<PaginatedResponse<Restaurant>> =>
    apiClient.get<PaginatedResponse<Restaurant>>(`/resto${params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : ''}`),
    
  getNearby: (latitude: number, longitude: number, radius?: number): Promise<ApiResponse<Restaurant[]>> =>
    apiClient.get<ApiResponse<Restaurant[]>>(`/resto/nearby?lat=${latitude}&lng=${longitude}${radius ? `&radius=${radius}` : ''}`),
}
