import { MenuItem } from './restaurant'

export interface CartItem {
  id: string
  menuItem: MenuItem
  restaurantId: string
  restaurantName: string
  restaurantLogo?: string
  quantity: number
  totalPrice: number
}

export interface CartRestaurant {
  restaurantId: string
  restaurantName: string
  restaurantLogo?: string
  items: CartItem[]
  subtotal: number
}

export interface Cart {
  restaurants: CartRestaurant[]
  totalAmount: number
  itemCount: number
}
