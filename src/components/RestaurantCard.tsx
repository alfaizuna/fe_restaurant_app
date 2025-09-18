import React from "react";
import { Card, CardContent } from "@/shared/ui";
import { Star, MapPin } from "lucide-react";

interface RestaurantCardProps {
  name: string
  rating: number
  location: string
  image: string
  onClick?: () => void
  isMobile?: boolean
  variant?: 'default' | 'compact'
  'data-testid'?: string
}

export const RestaurantCard = ({
  name,
  rating,
  location,
  image,
  onClick,
  isMobile = false,
  variant = 'default',
  'data-testid': testId
}: RestaurantCardProps) => {
  if (variant === 'compact') {
    return (
      <Card 
        className={`bg-white hover:shadow-md transition-shadow duration-200 cursor-pointer ${
          isMobile ? 'rounded-2xl shadow-md' : ''
        }`} 
        data-testid={testId}
        onClick={onClick}
      >
        <CardContent className={`${isMobile ? 'p-3' : 'p-4'}`}>
          <div className="flex items-center gap-3">
            <div className={`${
              isMobile 
                ? 'w-[90px] h-[90px] bg-white rounded-xl flex-shrink-0 overflow-hidden' 
                : 'w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden'
            }`}>
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className={`${
                isMobile 
                  ? 'font-extrabold text-base text-[#0a0d12] mb-1' 
                  : 'font-text-md-semibold text-[#0a0d12] mb-1'
              }`}>
                {name}
              </h3>
              
              <div className="flex items-center gap-1 mb-1">
                <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                <span className="font-medium text-sm text-[#0a0d12]">{rating}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-[#0a0d12]">
                <span>Jakarta Selatan</span>
                <div className="w-0.5 h-0.5 bg-[#0a0d12] rounded-full"></div>
                <span>2.4 km</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant (larger card)
  return (
    <div 
      className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#0a0d12] mb-2">{name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex items-center mr-4">
            {[...Array(5)].map((_, index) => (
              <Star 
                key={index}
                className={`w-4 h-4 ${
                  index < Math.floor(rating) 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">{rating}</span>
          </div>
        </div>
        <div className="flex items-center text-gray-500">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
      </div>
    </div>
  );
};
