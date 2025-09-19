import { useState, useEffect } from 'react';
import { restaurantApi } from '@/shared/api';
import type { Restaurant, RestaurantSearchParams, RestaurantListResponse } from '@/shared/types';

interface UseRestaurantsResult {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
  refetch: () => void;
}

export const useRestaurants = (searchParams: RestaurantSearchParams): UseRestaurantsResult => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<UseRestaurantsResult['pagination']>(null);

  const fetchRestaurants = async () => {
    // Don't fetch if no meaningful filters are provided
    const hasFilters = searchParams.range || 
                      searchParams.priceMin || 
                      searchParams.priceMax || 
                      searchParams.rating;
    
    if (!hasFilters) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response: RestaurantListResponse = await restaurantApi.search(searchParams);
      
      if (response.success) {
        setRestaurants(response.data.restaurants);
        setPagination(response.data.pagination);
      } else {
        setError(response.message || 'Failed to fetch restaurants');
      }
    } catch (err) {
      console.error('Error fetching restaurants:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch restaurants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [
    searchParams.range,
    searchParams.priceMin,
    searchParams.priceMax,
    searchParams.rating,
    searchParams.page,
    searchParams.limit,
  ]);

  return {
    restaurants,
    loading,
    error,
    pagination,
    refetch: fetchRestaurants,
  };
};
