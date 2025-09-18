import React from 'react';
import { X, Star } from 'lucide-react';
import { Button, Input, Checkbox } from '@/shared/ui';
import { FilterState, filterOptions } from '@/shared/types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onApplyFilters: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onApplyFilters,
}) => {
  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex" onClick={onClose}>
      <div className="bg-white w-[280px] h-full shadow-lg overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
                {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-lg font-semibold text-black">FILTER</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-6">
          {/* Distance Filter */}
        {/* Distance Section */}
        <div className="px-6 pb-4 border-b border-gray-200">
          <h3 className="text-base font-semibold mb-4 text-black">Distance</h3>
          <div className="space-y-4">
            {filterOptions.distance.map((option) => (
              <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                <Checkbox
                  checked={filters.selectedDistance.includes(option.value)}
                  onCheckedChange={(checked) => handleDistanceChange(option.value, checked as boolean)}
                  className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 w-5 h-5"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>          {/* Divider */}
          <div className="border-t border-[#d5d7da]" />

          {/* Price Filter */}
                  {/* Price Section */}
        <div className="px-6 pb-4 border-b border-gray-200">
          <h3 className="text-base font-semibold mb-4 text-black">Price</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-sm bg-gray-200 px-3 py-2 rounded-l text-gray-600">Rp</span>
              <input
                type="number"
                placeholder="Minimum Price"
                value={filters.priceRange.min || ''}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="flex-1 px-3 py-2 border border-l-0 rounded-r text-sm placeholder-gray-400"
              />
            </div>
            <div className="flex items-center">
              <span className="text-sm bg-gray-200 px-3 py-2 rounded-l text-gray-600">Rp</span>
              <input
                type="number"
                placeholder="Maximum Price"
                value={filters.priceRange.max || ''}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="flex-1 px-3 py-2 border border-l-0 rounded-r text-sm placeholder-gray-400"
              />
            </div>
          </div>
        </div>

          {/* Divider */}
          <div className="border-t border-[#d5d7da]" />

          {/* Rating Filter */}
          <div>
            <h3 className="text-base font-extrabold text-[#0a0d12] mb-3">Rating</h3>
                    {/* Rating Section */}
        <div className="px-6 py-4">
          <h3 className="text-base font-semibold mb-4 text-black">Rating</h3>
          <div className="space-y-4">
            {filterOptions.ratings.map((rating) => (
              <label key={rating} className="flex items-center space-x-3 cursor-pointer">
                <Checkbox
                  checked={filters.selectedRatings.includes(rating)}
                  onCheckedChange={(checked) => handleRatingChange(rating, checked as boolean)}
                  className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 w-5 h-5"
                />
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-700">{rating}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="p-4 border-t">
          <Button
            onClick={onApplyFilters}
            className="w-full bg-[#c12116] text-white hover:bg-[#a91e13] font-semibold"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};
