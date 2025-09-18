import { useCartStore } from "@/shared/store"
import { MenuItem } from "@/shared/types"

export const useSampleCart = () => {
  const { addItem } = useCartStore()

  const addSampleData = () => {
    // Sample menu items
    const sampleMenuItems: MenuItem[] = [
      {
        id: "1",
        restaurantId: "burger-king-1",
        name: "Whopper Burger",
        description: "Flame-grilled beef patty with fresh ingredients",
        price: 50000,
        imageUrl: "/figmaAssets/menu-item-1.png",
        category: "Burgers",
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "2", 
        restaurantId: "burger-king-1",
        name: "Chicken Burger",
        description: "Crispy fried chicken with special sauce",
        price: 45000,
        imageUrl: "/figmaAssets/menu-item-2.png", 
        category: "Burgers",
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "3",
        restaurantId: "pizza-hut-1", 
        name: "Margherita Pizza",
        description: "Classic pizza with fresh tomatoes and mozzarella",
        price: 75000,
        imageUrl: "/figmaAssets/menu-item-3.png",
        category: "Pizza", 
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "4",
        restaurantId: "pizza-hut-1",
        name: "Pepperoni Pizza", 
        description: "Delicious pizza with pepperoni and cheese",
        price: 85000,
        imageUrl: "/figmaAssets/menu-item-1.png",
        category: "Pizza",
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]

    // Add items to cart
    addItem(sampleMenuItems[0], "Burger King", "/figmaAssets/restaurant-logo.png")
    addItem(sampleMenuItems[1], "Burger King", "/figmaAssets/restaurant-logo.png") 
    addItem(sampleMenuItems[2], "Pizza Hut", "/figmaAssets/restaurant-logo.png")
    addItem(sampleMenuItems[3], "Pizza Hut", "/figmaAssets/restaurant-logo.png")
  }

  return { addSampleData }
}
