export interface Restaurant {
  id: number
  name: string
  star: number
  place: string
  logo: string
  images: string[]
  reviewCount: number
  menuCount: number
  priceRange: {
    min: number
    max: number
  }
  distance: number
}

// Legacy interface for backward compatibility
export interface RestaurantLegacy {
  id: string
  name: string
  description: string
  imageUrl: string
  rating: number
  category: string
  price: 'low' | 'medium' | 'high'
  deliveryTime: string
  isOpen: boolean
  createdAt: string
  updatedAt: string
}

export interface MenuItem {
  id: string
  restaurantId: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  isAvailable: boolean
  createdAt: string
  updatedAt: string
}
