import React from 'react';
import { X, Star } from 'lucide-react';
import { Button, Input, Checkbox } from '@/shared/ui';
import { FilterState, filterOptions, defaultFilters } from '@/shared/types';

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

  const handleRangeChange = (range: number, checked: boolean) => {
    onFiltersChange({
      ...filters,
      range: checked ? range : 0,
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
          <div className="flex items-center gap-2">
            <button
              onClick={() => onFiltersChange(defaultFilters)}
              className="text-sm text-[#c12116] hover:text-[#a91e13] font-medium px-2 py-1"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="space-y-0">
          {/* Distance Range Section */}
          <div className="px-6 pb-4 border-b border-gray-200">
            <h3 className="text-base font-semibold mb-4 text-black">Distance Range</h3>
            <div className="space-y-4">
              {filterOptions.distance.map((option) => (
                <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                  <Checkbox
                    checked={filters.range === option.value}
                    onCheckedChange={(checked) =>
                      handleRangeChange(option.value, checked as boolean)
                    }
                    className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 w-5 h-5"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

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
