import { apiClient } from './client'
import type { Restaurant, RestaurantLegacy } from '../types/restaurant'
import type { ApiResponse, PaginatedResponse, RecommendedRestaurantsApiResponse, RestaurantListResponse, RestaurantSearchParams } from '../types'

export const restaurantApi = {
  getRecommended: (): Promise<RecommendedRestaurantsApiResponse> =>
    apiClient.get<RecommendedRestaurantsApiResponse>('/resto/recommended'),
    
  // Public version of recommended restaurants (if available)
  getRecommendedPublic: (): Promise<RecommendedRestaurantsApiResponse> =>
    apiClient.get<RecommendedRestaurantsApiResponse>('/resto/recommended/public'),
    
  getById: (id: string): Promise<ApiResponse<RestaurantLegacy>> =>
    apiClient.get<ApiResponse<RestaurantLegacy>>(`/resto/${id}`),
    
  getAll: (params?: {
    page?: number
    limit?: number
    category?: string
    search?: string
  }): Promise<PaginatedResponse<RestaurantLegacy>> =>
    apiClient.get<PaginatedResponse<RestaurantLegacy>>(`/resto${params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : ''}`),
    
  search: (params: RestaurantSearchParams): Promise<RestaurantListResponse> => {
    const searchParams = new URLSearchParams();
    
    if (params.range) searchParams.append('range', params.range.toString());
    if (params.priceMin) searchParams.append('priceMin', params.priceMin.toString());
    if (params.priceMax) searchParams.append('priceMax', params.priceMax.toString());
    if (params.rating) searchParams.append('rating', params.rating.toString());
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    
    return apiClient.get<RestaurantListResponse>(`/resto?${searchParams.toString()}`);
  },
    
  getNearby: (latitude: number, longitude: number, radius?: number): Promise<ApiResponse<RestaurantLegacy[]>> =>
    apiClient.get<ApiResponse<RestaurantLegacy[]>>(`/resto/nearby?lat=${latitude}&lng=${longitude}${radius ? `&radius=${radius}` : ''}`),
}
