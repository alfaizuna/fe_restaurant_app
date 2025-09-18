import { CartRestaurant } from "@/shared/types"
import { CartItemCard } from "./CartItemCard"
import { Button } from "@/shared/ui/button"

interface CartRestaurantSectionProps {
  restaurant: CartRestaurant
  onCheckout: (restaurantId: string) => void
}

export function CartRestaurantSection({ restaurant, onCheckout }: CartRestaurantSectionProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price).replace('IDR', 'Rp')
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 space-y-5">
      {/* Restaurant Header */}
      <div className="flex items-center gap-2">
        <img
          src={restaurant.restaurantLogo || '/figmaAssets/restaurant-logo-cart.png'}
          alt={restaurant.restaurantName}
          className="w-12 h-12 rounded object-cover"
        />
        <h3 className="text-lg font-bold text-gray-900">
          {restaurant.restaurantName}
        </h3>
        <img 
          src="/figmaAssets/chevron-down.svg" 
          alt="Expand" 
          className="h-6 w-6 ml-auto"
        />
      </div>

      {/* Cart Items */}
      <div className="space-y-0">
        {restaurant.items.map((item, index) => (
          <div key={item.id}>
            <CartItemCard item={item} />
            {index < restaurant.items.length - 1 && (
              <hr className="border-gray-200" />
            )}
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-dashed border-gray-300" />

      {/* Total and Checkout */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <span className="text-base font-medium text-gray-900">Total</span>
          <span className="text-xl font-extrabold text-gray-900">
            {formatPrice(restaurant.subtotal)}
          </span>
        </div>
        
        <Button
          onClick={() => onCheckout(restaurant.restaurantId)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 h-12 rounded-full"
        >
          Checkout
        </Button>
      </div>
    </div>
  )
}
