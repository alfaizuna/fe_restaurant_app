import React, { useState } from "react";
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

// Helper function to get initials from restaurant name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2) // Take only first 2 initials
    .join('');
}

// Helper function to generate a background color based on the name
const getInitialsColor = (name: string): string => {
  const colors = [
    'bg-red-500',
    'bg-blue-500', 
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500'
  ];
  
  // Simple hash function to consistently assign colors based on name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
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
  const [imageError, setImageError] = useState(false);
  
  // Reset error state when image prop changes
  React.useEffect(() => {
    setImageError(false);
  }, [image]);

  const handleImageError = () => {
    setImageError(true);
  };

  // Fallback initials component
  const InitialsAvatar = ({ className }: { className: string }) => (
    <div className={`${className} ${getInitialsColor(name)} flex items-center justify-center text-white font-bold`}>
      <span className={isMobile ? 'text-lg' : 'text-xl'}>
        {getInitials(name)}
      </span>
    </div>
  );
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
              {imageError ? (
                <InitialsAvatar 
                  className={`w-full h-full rounded-xl ${isMobile ? 'rounded-xl' : 'rounded-2xl'}`}
                />
              ) : (
                <img 
                  src={image} 
                  alt={name} 
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              )}
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
        {imageError ? (
          <InitialsAvatar className="w-full h-48" />
        ) : (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-48 object-cover"
            onError={handleImageError}
          />
        )}
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
