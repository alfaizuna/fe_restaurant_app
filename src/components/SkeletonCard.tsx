import React from 'react';

interface SkeletonCardProps {
  isMobile?: boolean;
  variant?: 'default' | 'compact';
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ 
  isMobile = false, 
  variant = 'compact' 
}) => {
  if (variant === 'compact') {
    return (
      <div className={`bg-white rounded-2xl shadow-md ${isMobile ? 'p-3' : 'p-4'} animate-pulse`}>
        <div className="flex items-center gap-3">
          {/* Image skeleton */}
          <div className={`${
            isMobile 
              ? 'w-[90px] h-[90px] bg-gray-200 rounded-xl flex-shrink-0' 
              : 'w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0'
          }`} />
          
          {/* Content skeleton */}
          <div className="flex-1 min-w-0">
            {/* Restaurant name */}
            <div className={`bg-gray-200 rounded ${isMobile ? 'h-5 mb-2' : 'h-4 mb-2'}`} />
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="w-8 h-4 bg-gray-200 rounded" />
            </div>
            
            {/* Location */}
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-200 rounded" />
              <div className="w-20 h-3 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 animate-pulse">
      <div className="w-full h-40 bg-gray-200 rounded-lg mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
};
