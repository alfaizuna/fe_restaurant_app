import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { CartItem, CartRestaurant, Cart, MenuItem } from '../types'

interface CartState {
  cart: Cart
  isOpen: boolean
}

interface CartActions {
  addItem: (menuItem: MenuItem, restaurantName: string, restaurantLogo?: string) => void
  removeItem: (itemId: string, restaurantId: string) => void
  updateQuantity: (itemId: string, restaurantId: string, quantity: number) => void
  clearCart: () => void
  clearRestaurantCart: (restaurantId: string) => void
  toggleCart: () => void
  setCartOpen: (open: boolean) => void
}

const initialCart: Cart = {
  restaurants: [],
  totalAmount: 0,
  itemCount: 0
}

const calculateCartTotals = (restaurants: CartRestaurant[]): { totalAmount: number; itemCount: number } => {
  let totalAmount = 0
  let itemCount = 0
  
  restaurants.forEach(restaurant => {
    restaurant.items.forEach(item => {
      totalAmount += item.totalPrice
      itemCount += item.quantity
    })
  })
  
  return { totalAmount, itemCount }
}

const calculateRestaurantSubtotal = (items: CartItem[]): number => {
  return items.reduce((subtotal, item) => subtotal + item.totalPrice, 0)
}

export const useCartStore = create<CartState & CartActions>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        cart: initialCart,
        isOpen: false,

        // Actions
        addItem: (menuItem: MenuItem, restaurantName: string, restaurantLogo?: string) => {
          set((state) => {
            const { cart } = state
            const existingRestaurantIndex = cart.restaurants.findIndex(
              (restaurant) => restaurant.restaurantId === menuItem.restaurantId
            )

            let updatedRestaurants = [...cart.restaurants]

            if (existingRestaurantIndex >= 0) {
              // Restaurant exists, check if item exists
              const existingItemIndex = updatedRestaurants[existingRestaurantIndex].items.findIndex(
                (item) => item.menuItem.id === menuItem.id
              )

              if (existingItemIndex >= 0) {
                // Item exists, increase quantity
                updatedRestaurants[existingRestaurantIndex].items[existingItemIndex].quantity += 1
                updatedRestaurants[existingRestaurantIndex].items[existingItemIndex].totalPrice =
                  updatedRestaurants[existingRestaurantIndex].items[existingItemIndex].quantity * menuItem.price
              } else {
                // Item doesn't exist, add new item
                const newCartItem: CartItem = {
                  id: `${menuItem.id}-${Date.now()}`,
                  menuItem,
                  restaurantId: menuItem.restaurantId,
                  restaurantName,
                  restaurantLogo,
                  quantity: 1,
                  totalPrice: menuItem.price
                }
                updatedRestaurants[existingRestaurantIndex].items.push(newCartItem)
              }

              // Update restaurant subtotal
              updatedRestaurants[existingRestaurantIndex].subtotal = calculateRestaurantSubtotal(
                updatedRestaurants[existingRestaurantIndex].items
              )
            } else {
              // New restaurant, add new restaurant with item
              const newCartItem: CartItem = {
                id: `${menuItem.id}-${Date.now()}`,
                menuItem,
                restaurantId: menuItem.restaurantId,
                restaurantName,
                restaurantLogo,
                quantity: 1,
                totalPrice: menuItem.price
              }

              const newRestaurant: CartRestaurant = {
                restaurantId: menuItem.restaurantId,
                restaurantName,
                restaurantLogo,
                items: [newCartItem],
                subtotal: menuItem.price
              }

              updatedRestaurants.push(newRestaurant)
            }

            const { totalAmount, itemCount } = calculateCartTotals(updatedRestaurants)

            return {
              ...state,
              cart: {
                restaurants: updatedRestaurants,
                totalAmount,
                itemCount
              }
            }
          })
        },

        removeItem: (itemId: string, restaurantId: string) => {
          set((state) => {
            const { cart } = state
            let updatedRestaurants = [...cart.restaurants]

            const restaurantIndex = updatedRestaurants.findIndex(
              (restaurant) => restaurant.restaurantId === restaurantId
            )

            if (restaurantIndex >= 0) {
              updatedRestaurants[restaurantIndex].items = updatedRestaurants[restaurantIndex].items.filter(
                (item) => item.id !== itemId
              )

              // Update restaurant subtotal
              updatedRestaurants[restaurantIndex].subtotal = calculateRestaurantSubtotal(
                updatedRestaurants[restaurantIndex].items
              )

              // Remove restaurant if no items left
              if (updatedRestaurants[restaurantIndex].items.length === 0) {
                updatedRestaurants = updatedRestaurants.filter(
                  (restaurant) => restaurant.restaurantId !== restaurantId
                )
              }
            }

            const { totalAmount, itemCount } = calculateCartTotals(updatedRestaurants)

            return {
              ...state,
              cart: {
                restaurants: updatedRestaurants,
                totalAmount,
                itemCount
              }
            }
          })
        },

        updateQuantity: (itemId: string, restaurantId: string, quantity: number) => {
          if (quantity <= 0) {
            get().removeItem(itemId, restaurantId)
            return
          }

          set((state) => {
            const { cart } = state
            const updatedRestaurants = [...cart.restaurants]

            const restaurantIndex = updatedRestaurants.findIndex(
              (restaurant) => restaurant.restaurantId === restaurantId
            )

            if (restaurantIndex >= 0) {
              const itemIndex = updatedRestaurants[restaurantIndex].items.findIndex(
                (item) => item.id === itemId
              )

              if (itemIndex >= 0) {
                updatedRestaurants[restaurantIndex].items[itemIndex].quantity = quantity
                updatedRestaurants[restaurantIndex].items[itemIndex].totalPrice =
                  quantity * updatedRestaurants[restaurantIndex].items[itemIndex].menuItem.price

                // Update restaurant subtotal
                updatedRestaurants[restaurantIndex].subtotal = calculateRestaurantSubtotal(
                  updatedRestaurants[restaurantIndex].items
                )
              }
            }

            const { totalAmount, itemCount } = calculateCartTotals(updatedRestaurants)

            return {
              ...state,
              cart: {
                restaurants: updatedRestaurants,
                totalAmount,
                itemCount
              }
            }
          })
        },

        clearCart: () => {
          set((state) => ({
            ...state,
            cart: initialCart
          }))
        },

        clearRestaurantCart: (restaurantId: string) => {
          set((state) => {
            const { cart } = state
            const updatedRestaurants = cart.restaurants.filter(
              (restaurant) => restaurant.restaurantId !== restaurantId
            )

            const { totalAmount, itemCount } = calculateCartTotals(updatedRestaurants)

            return {
              ...state,
              cart: {
                restaurants: updatedRestaurants,
                totalAmount,
                itemCount
              }
            }
          })
        },

        toggleCart: () => {
          set((state) => ({
            ...state,
            isOpen: !state.isOpen
          }))
        },

        setCartOpen: (open: boolean) => {
          set((state) => ({
            ...state,
            isOpen: open
          }))
        }
      }),
      {
        name: 'cart-storage',
        partialize: (state) => ({ 
          cart: state.cart 
        }),
      }
    ),
    {
      name: 'cart-store',
    }
  )
)
