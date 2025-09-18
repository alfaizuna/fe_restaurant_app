import React, { useState, useEffect } from 'react';
import { Button } from '@/shared/ui';
import { useAuthStore } from '@/shared/store';
import { UserProfileDropdown, RestaurantCard } from '@/components';
import { FilterModal } from '@/features/restaurant/components/FilterModal';
import { FilterSidebar } from '@/features/restaurant/components/FilterSidebar';
import { FilterState, defaultFilters } from '@/shared/types';

export const Categories = (): JSX.Element => {
  const { user } = useAuthStore();
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

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

  // Mock restaurant data - replace with actual API call
  const restaurants = Array.from({ length: isMobile ? 5 : 6 }, (_, index) => ({
    id: index + 1,
    name: "Burger King",
    rating: 4.9,
    location: "Jakarta Selatan",
    distance: "2.4 km",
    image: "/figmaAssets/restaurant-card-bg.png"
  }));

  const handleApplyFilters = () => {
    setIsFilterModalOpen(false);
    // Apply filters to restaurant list
    console.log('Applied filters:', filters);
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className={`${
          isMobile 
            ? 'px-4' 
            : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
        }`}>
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="inline-flex items-center gap-[15px]">
              <img
                className={`relative ${isMobile ? 'w-10 h-10' : 'w-[42px] h-[42px]'}`}
                alt="Logo"
                src="/figmaAssets/logo.png"
              />
              {!isMobile && (
                <div className="text-[#0a0d12] text-[32px] font-extrabold leading-[42px]">
                  Foody
                </div>
              )}
            </div>

            {/* Right side - Cart and User Profile */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  {/* Shopping Cart */}
                  <button className="relative p-2 text-[#0a0d12] hover:opacity-80">
                    <img 
                      src="/figmaAssets/bag-icon.svg" 
                      alt="Shopping Bag"
                      className={`${isMobile ? 'w-7 h-7' : 'w-7 h-7'}`}
                    />
                    <span className="absolute -top-2 -right-2 bg-[#c12116] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                      1
                    </span>
                  </button>

                  {/* User Profile */}
                  {isMobile ? (
                    <img
                      className="w-10 h-10 rounded-full"
                      alt="User Avatar"
                      src="/figmaAssets/user-avatar.png"
                    />
                  ) : (
                    <UserProfileDropdown isScrolled={true} isMobile={false} />
                  )}
                </>
              ) : (
                !isMobile && (
                  <>
                    <Button
                      variant="outline"
                      className="border-2 border-[#d5d7da] text-[#0a0d12] bg-white hover:bg-gray-50 rounded-full px-6 py-2 font-bold text-base"
                      onClick={() => window.location.href = '/login?tab=signin'}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="bg-[#0a0d12] text-white hover:bg-[#1a1d22] rounded-full px-6 py-2 font-bold text-base"
                      onClick={() => window.location.href = '/login?tab=signup'}
                    >
                      Sign Up
                    </Button>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </header>

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
            <div className={`${
              isMobile 
                ? 'space-y-4' 
                : 'grid grid-cols-1 md:grid-cols-2 gap-5'
            }`}>
              {restaurants.map((restaurant, index) => (
                <RestaurantCard
                  key={index}
                  name={restaurant.name}
                  rating={restaurant.rating}
                  location={restaurant.location}
                  image={restaurant.image}
                  onClick={() => window.location.href = `/restaurant/${restaurant.id}`}
                  isMobile={isMobile}
                  variant="compact"
                  data-testid={`card-restaurant-${index}`}
                />
              ))}
            </div>
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
