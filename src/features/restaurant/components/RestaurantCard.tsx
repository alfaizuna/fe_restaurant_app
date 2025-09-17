import { Card, CardContent, CardHeader } from '@/shared/ui'
import { Badge } from '@/shared/ui'
import { formatCurrency } from '@/shared/utils'
import type { Restaurant } from '@/shared/types'

interface RestaurantCardProps {
  restaurant: Restaurant
  onSelect?: (restaurant: Restaurant) => void
}

export function RestaurantCard({ restaurant, onSelect }: RestaurantCardProps) {
  const handleClick = () => {
    onSelect?.(restaurant)
  }

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <CardHeader className="p-0">
        <div className="relative">
          <img 
            src={restaurant.imageUrl} 
            alt={restaurant.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Badge 
            className="absolute top-2 right-2"
            variant={restaurant.isOpen ? "default" : "destructive"}
          >
            {restaurant.isOpen ? 'Open' : 'Closed'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{restaurant.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {restaurant.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">★</span>
              <span className="text-sm">{restaurant.rating}</span>
            </div>
            <Badge variant="outline">
              {restaurant.category}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{restaurant.deliveryTime}</span>
            <span className="font-medium">
              {restaurant.price === 'low' && '$'}
              {restaurant.price === 'medium' && '$$'}
              {restaurant.price === 'high' && '$$$'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
