import React from 'react';
import { Input, Checkbox } from '@/shared/ui';
import { FilterState, filterOptions } from '@/shared/types';

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFiltersChange,
}) => {
  const handleDistanceChange = (value: string, checked: boolean) => {
    const updatedDistance = checked
      ? [...filters.selectedDistance, value]
      : filters.selectedDistance.filter(item => item !== value);
    
    onFiltersChange({
      ...filters,
      selectedDistance: updatedDistance,
    });
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    const updatedRatings = checked
      ? [...filters.selectedRatings, rating]
      : filters.selectedRatings.filter(r => r !== rating);
    
    onFiltersChange({
      ...filters,
      selectedRatings: updatedRatings,
    });
  };

  const handlePriceChange = (field: 'min' | 'max', value: string) => {
    const numValue = value ? parseInt(value, 10) : null;
    onFiltersChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [field]: numValue,
      },
    });
  };

  return (
    <div className="w-[266px] bg-white rounded-xl shadow-lg p-4 space-y-6">
      {/* Filter Title */}
      <div className="px-2">
        <h2 className="text-base font-extrabold text-[#0a0d12] text-center">FILTER</h2>
      </div>

      {/* Distance Filter */}
      <div className="px-2">
        <h3 className="text-lg font-extrabold text-[#0a0d12] mb-3">Distance</h3>
        <div className="space-y-2">
          {filterOptions.distance.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={`desktop-${option.id}`}
                checked={filters.selectedDistance.includes(option.value)}
                onCheckedChange={(checked: boolean) =>
                  handleDistanceChange(option.value, checked)
                }
                className="w-5 h-5"
              />
              <label
                htmlFor={`desktop-${option.id}`}
                className="text-base text-[#0a0d12] leading-7 flex-1"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#d5d7da]" />

      {/* Price Filter */}
      <div className="px-2">
        <h3 className="text-lg font-extrabold text-[#0a0d12] mb-3">Price</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2 p-2 border border-[#d5d7da] rounded-lg">
            <div className="flex items-center justify-center w-9 h-9 bg-[#f5f5f5] rounded">
              <span className="text-base font-bold text-[#0a0d12]">Rp</span>
            </div>
            <Input
              type="number"
              placeholder="Minimum Price"
              value={filters.priceRange.min || ''}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              className="border-0 flex-1 text-base placeholder:text-[#717680]"
            />
          </div>
          <div className="flex items-center space-x-2 p-2 border border-[#d5d7da] rounded-lg">
            <div className="flex items-center justify-center w-9 h-9 bg-[#f5f5f5] rounded">
              <span className="text-base font-bold text-[#0a0d12]">Rp</span>
            </div>
            <Input
              type="number"
              placeholder="Maximum Price"
              value={filters.priceRange.max || ''}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              className="border-0 flex-1 text-base placeholder:text-[#717680]"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#d5d7da]" />

      {/* Rating Filter */}
      <div className="px-2">
        <h3 className="text-lg font-extrabold text-[#0a0d12] mb-3 text-center">Rating</h3>
        <div className="space-y-2">
          {filterOptions.ratings.map((rating) => (
            <div key={rating} className="p-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`desktop-rating-${rating}`}
                  checked={filters.selectedRatings.includes(rating)}
                  onCheckedChange={(checked: boolean) =>
                    handleRatingChange(rating, checked)
                  }
                  className="w-5 h-5"
                />
                <div className="flex items-center space-x-1">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 fill-[#ffab0d]"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <span className="text-base text-[#0a0d12]">{rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
