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

  // Format price range
  const formatPrice = (min: number, max: number) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <CardHeader className="p-0">
        <div className="relative">
          <img 
            src={restaurant.images?.[0] || restaurant.logo} 
            alt={restaurant.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Badge 
            className="absolute top-2 right-2"
            variant="default"
          >
            ★ {restaurant.star}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{restaurant.name}</h3>
          <p className="text-gray-600 text-sm">
            {restaurant.place} • {restaurant.distance}km away
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">★</span>
              <span className="text-sm">{restaurant.star}</span>
              <span className="text-sm text-gray-500">({restaurant.reviewCount} reviews)</span>
            </div>
            <Badge variant="outline">
              {restaurant.menuCount} menu items
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="font-medium">
              {formatPrice(restaurant.priceRange.min, restaurant.priceRange.max)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
