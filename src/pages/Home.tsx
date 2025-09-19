import React, { useEffect, useState } from "react";
import { Button, Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from "@/shared/ui";
import { ShoppingCart, Star, Clock, Users, MapPin, Phone, Search } from "lucide-react";
import { useAuthStore, useCartStore } from "@/shared/store";
import { useLocation } from "wouter";
import { useSampleCart } from "@/hooks/useSampleCart";
import { useRecommendedRestaurants } from "@/hooks/useRecommendedRestaurants";
import { 
  Header,
  CategoryCard, 
  RestaurantCard, 
  HeroSection, 
  SocialMediaIcon, 
  FooterSection,
  SkeletonCard 
} from "@/components";

export const Home = (): JSX.Element => {
  const { user } = useAuthStore();
  const { cart } = useCartStore();
  const { addSampleData } = useSampleCart();
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { restaurants: recommendedRestaurants, isLoading, error, refetch } = useRecommendedRestaurants();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Categories data
  const categories = [
    { 
      icon: "/figmaAssets/category-all-food.png", 
      label: "All Restaurant", 
      testId: "category-all-restaurant",
      href: "/categories"
    },
    { 
      icon: "/figmaAssets/category-location.png", 
      label: "Nearby", 
      testId: "category-nearby" 
    },
    { 
      icon: "/figmaAssets/category-discount.png", 
      label: "Discount", 
      testId: "category-discount" 
    },
    { 
      icon: "/figmaAssets/category-best-seller.png", 
      label: "Best Seller", 
      testId: "category-best-seller" 
    },
    { 
      icon: "/figmaAssets/category-delivery.png", 
      label: "Delivery", 
      testId: "category-delivery" 
    },
    { 
      icon: "/figmaAssets/category-lunch.png", 
      label: "Lunch", 
      testId: "category-lunch" 
    }
  ];

  // Get restaurants from API or fallback to mock data
  const restaurants = recommendedRestaurants.length > 0 
    ? recommendedRestaurants.slice(0, isMobile ? 5 : 12).map(restaurant => ({
        id: restaurant.id.toString(),
        name: restaurant.name,
        rating: restaurant.star,
        location: restaurant.place,
        distance: "2.4 km", // Mock distance - you may want to calculate this based on user location
        image: restaurant.images[0] || "/figmaAssets/restaurant-card-bg.png"
      }))
    : Array.from({ length: isMobile ? 5 : 12 }, (_, index) => ({
        id: index.toString(),
        name: "Burger King",
        rating: 4.9,
        location: "Jakarta Selatan",
        distance: "2.4 km",
        image: "/figmaAssets/restaurant-card-bg.png"
      }));

  // Footer links data
  const exploreLinks = [
    { label: "All Food", href: "#" },
    { label: "Nearby", href: "#" },
    { label: "Discount", href: "#" },
    { label: "Best Seller", href: "#" },
    { label: "Delivery", href: "#" },
    { label: "Lunch", href: "#" }
  ];

  const helpLinks = [
    { label: "How to Order", href: "#" },
    { label: "Payment Methods", href: "#" },
    { label: "Track My Order", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Contact Us", href: "#" }
  ];

  const socialMediaLinks = [
    {
      href: '#',
      icon: (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Combined Header + Hero Section */}
      <section className={`relative ${isMobile ? 'h-[648px]' : 'h-screen'}`}>
        {/* Background Image */}
        <div className={`absolute inset-0 ${
          isMobile 
            ? "bg-[url('/figmaAssets/hero-mobile-bg.png')] bg-cover bg-center" 
            : "bg-[url('/figmaAssets/hero-background.png')] bg-cover bg-center"
        }`}></div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* Header */}
        <Header 
          variant="home"
          isScrolled={isScrolled}
          isMobile={isMobile}
          onCartClick={() => setLocation('/cart')}
        />
        
        {/* Hero Content */}
        <HeroSection isMobile={isMobile} />
      </section>

      {/* Categories Section */}
      <section className="py-6 bg-white">
        <div className={`${
          isMobile 
            ? 'px-4' 
            : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
        }`}>
          <div className={`${
            isMobile 
              ? 'grid grid-cols-3 gap-4' 
              : 'grid grid-cols-3 md:grid-cols-6 gap-6'
          }`}>
            {categories.map((category, index) => (
              <CategoryCard 
                key={index}
                icon={category.icon}
                label={category.label}
                testId={category.testId}
                isMobile={isMobile}
                onClick={() => category.href && (window.location.href = category.href)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Restaurants */}
      <section className={`${isMobile ? 'pb-12 pt-6' : 'py-8'} bg-white`}>
        <div className={`${
          isMobile 
            ? 'px-4' 
            : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className={`${
                isMobile 
                  ? 'text-2xl font-extrabold text-[#0a0d12]' 
                  : 'text-2xl font-text-xl-semibold text-[#0a0d12]'
              }`}>
                {user ? 'Recommended' : 'Recommended'}
              </h2>
              {!user && (
                <p className="text-gray-500 text-sm mt-1">
                  Discover popular restaurants in your area
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button className="text-[#c12116] font-extrabold hover:underline" data-testid="button-see-all"  onClick={() => setLocation('/categories')}>
                See All
              </button>
            </div>
          </div>
          
          {/* Loading State */}
          {isLoading && (
            <div className={`${
              isMobile 
                ? 'space-y-3' 
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            }`}>
              {Array.from({ length: isMobile ? 5 : 6 }).map((_, index) => (
                <SkeletonCard 
                  key={index} 
                  isMobile={isMobile} 
                  variant="compact"
                />
              ))}
            </div>
          )}

          {/* Error State - Only show if there are no restaurants to display */}
          {error && !isLoading && restaurants.length === 0 && (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">Failed to load recommended restaurants</p>
              <p className="text-gray-500 mb-4 text-sm">{error}</p>
              <div className="space-x-3">
                <Button 
                  variant="outline" 
                  onClick={refetch}
                  className="px-6 py-2"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* Show info message for unauthenticated users when showing fallback data */}
          {!error && !isLoading && restaurants.length > 0 && !user && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-blue-700 text-sm">
                    <span className="font-medium">💡 Guest User:</span> You're seeing popular restaurants. Login for personalized recommendations!
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLocation('/login')}
                  className="ml-4 bg-white border-blue-300 text-blue-600 hover:bg-blue-50 text-xs px-3 py-1"
                >
                  Login
                </Button>
              </div>
            </div>
          )}

          {/* Restaurant List */}
          {!isLoading && !error && (
            <>
              <div className={`${
                isMobile 
                  ? 'space-y-3' 
                  : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
              }`}>
                {restaurants.map((restaurant, index) => (
                  <RestaurantCard
                    key={restaurant.id}
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
              
              <div className="text-center mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setLocation('/categories')}
                  className={`${
                    isMobile 
                      ? 'w-40 h-10 bg-white text-[#0a0d12] border border-[#d5d7da] hover:bg-gray-50 font-bold text-sm rounded-full' 
                      : 'bg-white text-[#0a0d12] border-gray-200 hover:bg-gray-50 font-text-md-medium px-8'
                  }`}
                  data-testid="button-show-more"
                >
                  Show More
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0d12] text-white py-10 border-t border-[#d5d7da]">
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
                  {socialMediaLinks.map((social, index) => (
                    <SocialMediaIcon
                      key={index}
                      href={social.href}
                      icon={social.icon}
                    />
                  ))}
                </div>
              </div>

              {/* Navigation Menus */}
              <div className="flex justify-between gap-4">
                <FooterSection title="Explore" links={exploreLinks} />
                <FooterSection title="Help" links={helpLinks} />
              </div>
            </div>
          ) : (
            /* Desktop Footer Layout */
            <div className="flex justify-between gap-16">
              {/* Left Section - Brand Info */}
              <div className="w-[380px]">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-6">
                    <div className="inline-flex items-center gap-[15px]">
                      <img
                        className="relative w-[42px] h-[42px]"
                        alt="Logo"
                        src="/figmaAssets/logo.png"
                      />
                      <div className="text-white text-[32px] font-extrabold leading-[42px] font-nunito">
                        Foody
                      </div>
                    </div>
                    <p className="text-[#fdfdfd] text-base font-normal leading-[30px] tracking-[-0.32px] font-nunito">
                      Enjoy homemade flavors & chef's signature dishes, freshly prepared every day. Order online or visit our nearest branch.
                    </p>
                  </div>
                  
                  {/* Social Media Section */}
                  <div className="flex flex-col gap-5 w-[196px]">
                    <h3 className="text-[#fdfdfd] text-base font-extrabold leading-[30px] font-nunito">
                      Follow on Social Media
                    </h3>
                    <div className="flex gap-3">
                      {socialMediaLinks.map((social, index) => (
                        <SocialMediaIcon
                          key={index}
                          href={social.href}
                          icon={social.icon}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Middle Section - Explore Menu */}
              <FooterSection title="Explore" links={exploreLinks} variant="desktop" />
              
              {/* Right Section - Help Menu */}
              <FooterSection title="Help" links={helpLinks} variant="desktop" />
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};