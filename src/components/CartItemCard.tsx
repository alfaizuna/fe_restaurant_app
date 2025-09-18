import { CartItem } from "@/shared/types"
import { QuantityControl } from "./QuantityControl"
import { useCartStore } from "@/shared/store"

interface CartItemCardProps {
  item: CartItem
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeItem } = useCartStore()

  const handleIncrease = () => {
    updateQuantity(item.id, item.restaurantId, item.quantity + 1)
  }

  const handleDecrease = () => {
    updateQuantity(item.id, item.restaurantId, item.quantity - 1)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price).replace('IDR', 'Rp')
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img
          src={item.menuItem.imageUrl || '/figmaAssets/menu-item-cart.png'}
          alt={item.menuItem.name}
          className="w-20 h-20 rounded-xl object-cover bg-gray-100"
        />
        
        <div className="flex flex-col">
          <h4 className="text-base font-medium text-gray-900">
            {item.menuItem.name}
          </h4>
          <p className="text-lg font-extrabold text-gray-900">
            {formatPrice(item.totalPrice)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 py-6">
        <QuantityControl
          quantity={item.quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
      </div>
    </div>
  )
}
