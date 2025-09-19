export interface FilterOptions {
  distance: string[];
  price: {
    min: number | null;
    max: number | null;
  };
  rating: number[];
}

export interface FilterState {
  range: number;
  priceRange: {
    min: number | null;
    max: number | null;
  };
  selectedRatings: number[];
}

export const defaultFilters: FilterState = {
  range: 0,
  priceRange: {
    min: null,
    max: null,
  },
  selectedRatings: [],
};

export const filterOptions = {
  distance: [
    { id: '5', label: 'Within 5 km', value: 5 },
    { id: '10', label: 'Within 10 km', value: 10 },
    { id: '15', label: 'Within 15 km', value: 15 },
    { id: '20', label: 'Within 20 km', value: 20 },
  ],
  ratings: [1, 2, 3, 4, 5],
};
