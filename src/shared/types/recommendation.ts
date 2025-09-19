export interface SampleMenu {
  id: number
  foodName: string
  price: number
  type: string
  image: string
}

export interface RecommendedRestaurant {
  id: number
  name: string
  star: number
  place: string
  logo: string
  images: string[]
  reviewCount: number
  sampleMenus: SampleMenu[]
  isFrequentlyOrdered: boolean
}

export interface RecommendationsData {
  recommendations: RecommendedRestaurant[]
  message: string
}

export interface RecommendedRestaurantsApiResponse {
  success: boolean
  message: string
  data: RecommendationsData
}
