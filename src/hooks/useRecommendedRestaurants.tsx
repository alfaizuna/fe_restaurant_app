import { useState, useEffect } from 'react'
import { restaurantApi } from '@/shared/api'
import type { RecommendedRestaurant } from '@/shared/types'

interface UseRecommendedRestaurantsReturn {
  restaurants: RecommendedRestaurant[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

// Fallback mock data for unauthenticated users or API failures
const mockRecommendedRestaurants: RecommendedRestaurant[] = [
  {
    id: 1,
    name: "Burger King",
    star: 4.9,
    place: "Jakarta Selatan",
    logo: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'200'%20height%3D'200'%3E%0A%20%20%20%20%20%20%3Crect%20width%3D'100%25'%20height%3D'100%25'%20rx%3D'24'%20fill%3D'%23C12116'%2F%3E%0A%20%20%20%20%20%20%3Ctext%20x%3D'50%25'%20y%3D'54%25'%20font-family%3D'Inter%2CArial%2Csans-serif'%20font-size%3D'88'%20text-anchor%3D'middle'%20fill%3D'white'%20font-weight%3D'700'%3EBK%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E",
    images: ["/figmaAssets/restaurant-card-bg.png"],
    reviewCount: 124,
    sampleMenus: [],
    isFrequentlyOrdered: true
  },
  {
    id: 2,
    name: "Pizza Hut",
    star: 4.7,
    place: "Jakarta Pusat",
    logo: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'200'%20height%3D'200'%3E%0A%20%20%20%20%20%20%3Crect%20width%3D'100%25'%20height%3D'100%25'%20rx%3D'24'%20fill%3D'%23F59E0B'%2F%3E%0A%20%20%20%20%20%20%3Ctext%20x%3D'50%25'%20y%3D'54%25'%20font-family%3D'Inter%2CArial%2Csans-serif'%20font-size%3D'88'%20text-anchor%3D'middle'%20fill%3D'white'%20font-weight%3D'700'%3EPH%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E",
    images: ["https://broken-image-url.com/broken.jpg"], // Intentionally broken to test initials fallback
    reviewCount: 89,
    sampleMenus: [],
    isFrequentlyOrdered: false
  },
  {
    id: 3,
    name: "McDonald's",
    star: 4.5,
    place: "Jakarta Utara",
    logo: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'200'%20height%3D'200'%3E%0A%20%20%20%20%20%20%3Crect%20width%3D'100%25'%20height%3D'100%25'%20rx%3D'24'%20fill%3D'%23EF4444'%2F%3E%0A%20%20%20%20%20%20%3Ctext%20x%3D'50%25'%20y%3D'54%25'%20font-family%3D'Inter%2CArial%2Csans-serif'%20font-size%3D'88'%20text-anchor%3D'middle'%20fill%3D'white'%20font-weight%3D'700'%3EMD%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E",
    images: ["/figmaAssets/restaurant-card-bg.png"],
    reviewCount: 67,
    sampleMenus: [],
    isFrequentlyOrdered: false
  },
  {
    id: 4,
    name: "KFC",
    star: 4.6,
    place: "Jakarta Barat",
    logo: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'200'%20height%3D'200'%3E%0A%20%20%20%20%20%20%3Crect%20width%3D'100%25'%20height%3D'100%25'%20rx%3D'24'%20fill%3D'%23111827'%2F%3E%0A%20%20%20%20%20%20%3Ctext%20x%3D'50%25'%20y%3D'54%25'%20font-family%3D'Inter%2CArial%2Csans-serif'%20font-size%3D'88'%20text-anchor%3D'middle'%20fill%3D'white'%20font-weight%3D'700'%3EKF%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E",
    images: ["/figmaAssets/restaurant-card-bg.png"],
    reviewCount: 92,
    sampleMenus: [],
    isFrequentlyOrdered: false
  },
  {
    id: 5,
    name: "Starbucks",
    star: 4.8,
    place: "Jakarta Selatan",
    logo: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'200'%20height%3D'200'%3E%0A%20%20%20%20%20%20%3Crect%20width%3D'100%25'%20height%3D'100%25'%20rx%3D'24'%20fill%3D'%2314B8A6'%2F%3E%0A%20%20%20%20%20%20%3Ctext%20x%3D'50%25'%20y%3D'54%25'%20font-family%3D'Inter%2CArial%2Csans-serif'%20font-size%3D'88'%20text-anchor%3D'middle'%20fill%3D'white'%20font-weight%3D'700'%3ESB%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E",
    images: ["/figmaAssets/restaurant-card-bg.png"],
    reviewCount: 156,
    sampleMenus: [],
    isFrequentlyOrdered: true
  },
  {
    id: 6,
    name: "Domino's Pizza",
    star: 4.4,
    place: "Jakarta Timur",
    logo: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'200'%20height%3D'200'%3E%0A%20%20%20%20%20%20%3Crect%20width%3D'100%25'%20height%3D'100%25'%20rx%3D'24'%20fill%3D'%230EA5E9'%2F%3E%0A%20%20%20%20%20%20%3Ctext%20x%3D'50%25'%20y%3D'54%25'%20font-family%3D'Inter%2CArial%2Csans-serif'%20font-size%3D'88'%20text-anchor%3D'middle'%20fill%3D'white'%20font-weight%3D'700'%3EDP%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E",
    images: ["/figmaAssets/restaurant-card-bg.png"],
    reviewCount: 73,
    sampleMenus: [],
    isFrequentlyOrdered: false
  }
]

export const useRecommendedRestaurants = (): UseRecommendedRestaurantsReturn => {
  const [restaurants, setRestaurants] = useState<RecommendedRestaurant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRecommendedRestaurants = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      console.log('🔄 Fetching recommended restaurants...')
      
      // Try authenticated endpoint first
      let response
      try {
        response = await restaurantApi.getRecommended()
        console.log('📥 Authenticated API Response received:', response)
      } catch (authError) {
        console.log('🔓 Authenticated endpoint failed, trying public endpoint...')
        // If authenticated endpoint fails, try public endpoint
        try {
          response = await restaurantApi.getRecommendedPublic()
          console.log('📥 Public API Response received:', response)
        } catch (publicError) {
          console.log('📥 Public endpoint also failed, will use fallback data')
          throw authError // Throw original error
        }
      }
      
      if (response && response.success && response.data && response.data.recommendations) {
        console.log(`✅ Successfully fetched ${response.data.recommendations.length} recommended restaurants`)
        setRestaurants(response.data.recommendations)
      } else {
        console.error('❌ Invalid API response structure:', response)
        throw new Error(response?.message || 'Failed to fetch recommended restaurants')
      }
    } catch (err) {
      console.log('⚠️ All API calls failed, using fallback data')
      console.error('Error details:', err)
      
      // Check if it's an authentication error (401) or network error
      const isAuthError = err instanceof Error && (
        err.message.includes('401') || 
        err.message.includes('Unauthorized') ||
        err.message.includes('HTTP error! status: 401') ||
        err.message.includes('Access token required')
      )
      
      if (isAuthError) {
        console.log('🔓 Using fallback data for unauthenticated user')
        setError(null) // Don't show error for unauthenticated users
      } else {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch recommended restaurants'
        setError(errorMessage)
      }
      
      // Always show mock data for better user experience
      // Whether user is unauthenticated or there's a network issue
      setRestaurants(mockRecommendedRestaurants)
    } finally {
      setIsLoading(false)
    }
  }

  const refetch = () => {
    setError(null)
    fetchRecommendedRestaurants()
  }

  useEffect(() => {
    fetchRecommendedRestaurants()
  }, [])

  return {
    restaurants,
    isLoading,
    error,
    refetch
  }
}
