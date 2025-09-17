export interface Restaurant {
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
