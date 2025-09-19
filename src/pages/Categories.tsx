import React, { useState, useEffect } from 'react';
import { Button } from '@/shared/ui';
import { useAuthStore } from '@/shared/store';
import { Header, RestaurantCard } from '@/components';
import { FilterModal } from '@/features/restaurant/components/FilterModal';
import { FilterSidebar } from '@/features/restaurant/components/FilterSidebar';
import { FilterState, defaultFilters, RestaurantSearchParams } from '@/shared/types';
import { useRestaurants } from '@/hooks/useRestaurants';

export const Categories = (): JSX.Element => {
  const { user } = useAuthStore();
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Build search parameters from filters
  const searchParams: RestaurantSearchParams = {
    range: filters.range || undefined,
    priceMin: filters.priceRange.min || undefined,
    priceMax: filters.priceRange.max || undefined,
    rating: filters.selectedRatings.length > 0 ? Math.min(...filters.selectedRatings) : undefined,
    page: currentPage,
    limit: isMobile ? 5 : 6,
  };

  // Use the custom hook to fetch restaurants
  const { restaurants, loading, error, pagination, refetch } = useRestaurants(searchParams);

  // Check if any filters are applied
  const hasActiveFilters = filters.range || 
                          filters.priceRange.min || 
                          filters.priceRange.max || 
                          filters.selectedRatings.length > 0;

  const handleApplyFilters = () => {
    setIsFilterModalOpen(false);
    setCurrentPage(1); // Reset to first page when filters change
    refetch();
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header 
        variant="page"
        isMobile={isMobile}
        cartItemCount={1}
      />

      {/* Main Content */}
      <main className={`${
        isMobile ? 'px-4 py-4' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'
      }`}>
        {/* Page Title and Filter Button */}
        <div className={`${isMobile ? 'space-y-4' : 'flex justify-between items-center'} mb-6`}>
          <h1 className={`${
            isMobile 
              ? 'text-2xl font-extrabold text-[#0a0d12]' 
              : 'text-2xl font-extrabold text-[#0a0d12]'
          }`}>
            All Restaurant
          </h1>
          
          {isMobile && (
            <div className="bg-white rounded-xl shadow-md px-4 py-3 flex items-center justify-between border border-gray-200">
              <span className="text-sm font-bold text-black tracking-wide">FILTER</span>
              <button
                onClick={() => setIsFilterModalOpen(true)}
                className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <img 
                  src="/figmaAssets/filter-lines.svg" 
                  alt="Filter"
                  className="w-5 h-5"
                />
              </button>
            </div>
          )}
        </div>

        {/* Content Layout */}
        <div className={`${isMobile ? 'space-y-4' : 'flex gap-10'}`}>
          {/* Desktop Filter Sidebar */}
          {!isMobile && (
            <div className="flex-shrink-0">
              <FilterSidebar 
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>
          )}

          {/* Restaurant Grid */}
          <div className="flex-1">
            {!hasActiveFilters ? (
              /* No filters applied - show welcome message */
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="mb-6">
                    <svg className="mx-auto w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Discover Great Restaurants</h3>
                    <p className="text-gray-600 mb-6">
                      Use the filter options to find restaurants by location, distance, price range, and rating.
                    </p>
                  </div>
                  
                  {isMobile && (
                    <Button
                      onClick={() => setIsFilterModalOpen(true)}
                      className="bg-[#c12116] hover:bg-[#a91e13] text-white px-6 py-2 rounded-lg"
                    >
                      Apply Filters
                    </Button>
                  )}
                  
                  {!isMobile && (
                    <div className="text-sm text-gray-500">
                      👈 Use the filter panel on the left to start searching
                    </div>
                  )}
                </div>
              </div>
            ) : loading ? (
              <div className={`${
                isMobile 
                  ? 'space-y-4' 
                  : 'grid grid-cols-1 md:grid-cols-2 gap-5'
              }`}>
                {Array.from({ length: isMobile ? 5 : 6 }).map((_, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl shadow-md p-3 animate-pulse"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`${
                        isMobile 
                          ? 'w-[90px] h-[90px]' 
                          : 'w-16 h-16'
                      } bg-gray-300 rounded-xl flex-shrink-0`}></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded mb-1 w-20"></div>
                        <div className="h-3 bg-gray-300 rounded w-32"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">{error}</p>
                <Button onClick={refetch}>Try Again</Button>
              </div>
            ) : (
              <div className={`${
                isMobile 
                  ? 'space-y-4' 
                  : 'grid grid-cols-1 md:grid-cols-2 gap-5'
              }`}>
                {restaurants.map((restaurant, index) => (
                  <RestaurantCard
                    key={restaurant.id}
                    name={restaurant.name}
                    rating={restaurant.star}
                    location={restaurant.place}
                    image={restaurant.images?.[0] || restaurant.logo}
                    onClick={() => window.location.href = `/restaurant/${restaurant.id}`}
                    isMobile={isMobile}
                    variant="compact"
                    data-testid={`card-restaurant-${index}`}
                  />
                ))}
                
                {restaurants.length === 0 && hasActiveFilters && (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No restaurants found with the current filters.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setFilters(defaultFilters);
                        setCurrentPage(1);
                      }}
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1 || loading}
                >
                  Previous
                </Button>
                
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {pagination.totalPages}
                </span>
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                  disabled={currentPage === pagination.totalPages || loading}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onApplyFilters={handleApplyFilters}
      />

      {/* Footer - same as Home page */}
      <footer className="bg-[#0a0d12] text-white py-10 border-t border-[#d5d7da] mt-12">
        <div className={`${
          isMobile 
            ? 'px-4' 
            : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
        }`}>
          {isMobile ? (
            /* Mobile Footer Layout */
            <div className="space-y-6">
              {/* Brand Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    className="w-11 h-11"
                    alt="Logo"
                    src="/figmaAssets/logo.png"
                  />
                  <div className="text-white text-[32px] font-extrabold leading-[42px]">
                    Foody
                  </div>
                </div>
                <p className="text-[#fdfdfd] text-sm font-normal leading-7">
                  Enjoy homemade flavors & chef's signature dishes, freshly prepared every day. Order online or visit our nearest branch.
                </p>
              </div>

              {/* Social Media Section */}
              <div className="space-y-5 w-[196px]">
                <h3 className="text-[#fdfdfd] text-sm font-extrabold">
                  Follow on Social Media
                </h3>
                <div className="flex gap-3">
                  {/* Social media icons */}
                </div>
              </div>

              {/* Navigation Menus */}
              <div className="flex justify-between gap-4">
                <div>
                  <h3 className="text-[#fdfdfd] text-sm font-extrabold mb-4">Explore</h3>
                  <div className="space-y-4">
                    <a href="#" className="block text-[#fdfdfd] text-sm">All Food</a>
                    <a href="#" className="block text-[#fdfdfd] text-sm">Nearby</a>
                    <a href="#" className="block text-[#fdfdfd] text-sm">Discount</a>
                  </div>
                </div>
                <div>
                  <h3 className="text-[#fdfdfd] text-sm font-extrabold mb-4">Help</h3>
                  <div className="space-y-4">
                    <a href="#" className="block text-[#fdfdfd] text-sm">How to Order</a>
                    <a href="#" className="block text-[#fdfdfd] text-sm">Payment Methods</a>
                    <a href="#" className="block text-[#fdfdfd] text-sm">Contact Us</a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Desktop Footer Layout */
            <div className="flex justify-between gap-16">
              {/* Brand Info */}
              <div className="w-[380px]">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-[15px]">
                    <img
                      className="w-[42px] h-[42px]"
                      alt="Logo"
                      src="/figmaAssets/logo.png"
                    />
                    <div className="text-white text-[32px] font-extrabold leading-[42px]">
                      Foody
                    </div>
                  </div>
                  <p className="text-[#fdfdfd] text-base leading-[30px]">
                    Enjoy homemade flavors & chef's signature dishes, freshly prepared every day. Order online or visit our nearest branch.
                  </p>
                  
                  {/* Social Media */}
                  <div className="w-[196px]">
                    <h3 className="text-[#fdfdfd] text-base font-extrabold mb-5">
                      Follow on Social Media
                    </h3>
                    <div className="flex gap-3">
                      {/* Social media icons */}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation Menus */}
              <div className="flex gap-16">
                <div>
                  <h3 className="text-[#fdfdfd] text-base font-extrabold mb-5">Explore</h3>
                  <div className="space-y-5">
                    <a href="#" className="block text-[#fdfdfd] text-base">All Food</a>
                    <a href="#" className="block text-[#fdfdfd] text-base">Nearby</a>
                    <a href="#" className="block text-[#fdfdfd] text-base">Discount</a>
                  </div>
                </div>
                <div>
                  <h3 className="text-[#fdfdfd] text-base font-extrabold mb-5">Help</h3>
                  <div className="space-y-5">
                    <a href="#" className="block text-[#fdfdfd] text-base">How to Order</a>
                    <a href="#" className="block text-[#fdfdfd] text-base">Payment Methods</a>
                    <a href="#" className="block text-[#fdfdfd] text-base">Contact Us</a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
