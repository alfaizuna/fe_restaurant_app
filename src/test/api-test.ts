import { restaurantApi } from '../shared/api/restaurant.api'

// Simple test function to verify API integration
export const testRecommendedAPI = async () => {
  try {
    console.log('Testing recommended restaurants API...')
    const response = await restaurantApi.getRecommended()
    console.log('API Response:', response)
    
    if (response.success && response.data && response.data.recommendations) {
      console.log(`✅ Successfully fetched ${response.data.recommendations.length} recommended restaurants`)
      response.data.recommendations.forEach((restaurant, index) => {
        console.log(`${index + 1}. ${restaurant.name} - ${restaurant.star} stars - ${restaurant.place}`)
      })
    } else {
      console.error('❌ API response does not contain expected data structure')
    }
  } catch (error) {
    console.error('❌ Failed to fetch recommended restaurants:', error)
  }
}

// Call this function to test the API
// testRecommendedAPI()
