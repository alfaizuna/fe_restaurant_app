export interface FilterOptions {
  distance: string[];
  price: {
    min: number | null;
    max: number | null;
  };
  rating: number[];
}

export interface FilterState {
  selectedDistance: string[];
  priceRange: {
    min: number | null;
    max: number | null;
  };
  selectedRatings: number[];
}

export const defaultFilters: FilterState = {
  selectedDistance: [],
  priceRange: {
    min: null,
    max: null,
  },
  selectedRatings: [],
};

export const filterOptions = {
  distance: [
    { id: 'nearby', label: 'Nearby', value: 'nearby' },
    { id: '1km', label: 'Within 1 km', value: '1' },
    { id: '3km', label: 'Within 3 km', value: '3' },
    { id: '5km', label: 'Within 5 km', value: '5' },
  ],
  ratings: [1, 2, 3, 4, 5],
};
