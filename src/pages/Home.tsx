import React, { useEffect, useState } from "react";
import { Button, Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from "@/shared/ui";
import { ShoppingCart, Star, Clock, Users, MapPin, Phone } from "lucide-react";
import { useAuthStore } from "@/shared/store";

export const Home = (): JSX.Element => {
  const { logout, user } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredDishes = [
    {
      id: 1,
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon with herbs and lemon",
      price: "$24.99",
      rating: 4.8,
      image: "/figmaAssets/restaurant-card-bg.png",
      category: "Seafood"
    },
    {
      id: 2,
      name: "Pasta Carbonara",
      description: "Classic Italian pasta with pancetta and parmesan",
      price: "$18.99",
      rating: 4.6,
      image: "/figmaAssets/restaurant-card-bg.png",
      category: "Italian"
    },
    {
      id: 3,
      name: "Beef Tenderloin",
      description: "Premium cut beef with seasonal vegetables",
      price: "$32.99",
      rating: 4.9,
      image: "/figmaAssets/restaurant-card-bg.png",
      category: "Steaks"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Combined Header + Hero Section */}
      <section className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/figmaAssets/hero-background.png')] bg-cover bg-center"></div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* Header */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-lg' 
            : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="inline-flex items-center gap-[15px]">
                <img
                  className="relative w-[42px] h-[42px]"
                  alt="Logo"
                  src={isScrolled ? "/figmaAssets/logo.png" : "/figmaAssets/logo-white.svg"}
                />
                <div className={`relative w-fit font-display-md-extrabold font-[number:var(--display-md-extrabold-font-weight)] text-[length:var(--display-md-extrabold-font-size)] tracking-[var(--display-md-extrabold-letter-spacing)] leading-[var(--display-md-extrabold-line-height)] [font-style:var(--display-md-extrabold-font-style)] transition-colors duration-300 ${
                  isScrolled ? 'text-[#0a0d12]' : 'text-white'
                }`}>
                  Foody
                </div>
              </div>

              {/* Right side - Cart and User Profile / Auth Buttons */}
              <div className="flex items-center gap-6">
                {user ? (
                  <>
                    {/* Shopping Cart */}
                    <button className={`relative p-2 hover:opacity-80 transition-all duration-300 ${
                      isScrolled ? 'text-[#0a0d12]' : 'text-white'
                    }`}>
                      <ShoppingCart className="w-6 h-6" />
                      <span className="absolute -top-2 -right-2 bg-[#c12116] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                        0
                      </span>
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center gap-3 cursor-pointer" onClick={handleLogout}>
                      <img
                        src="/figmaAssets/user-avatar.png"
                        alt="Profile"
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                          isScrolled ? 'border-gray-300' : 'border-white'
                        }`}
                      />
                      <span className={`font-text-md-medium transition-colors duration-300 ${
                        isScrolled ? 'text-[#0a0d12]' : 'text-white'
                      }`}>
                        {user?.name || 'John Doe'}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Sign In Button */}
                    <Button
                      variant="outline"
                      className={`border-2 rounded-full px-6 py-2 font-bold text-base transition-all duration-300 ${
                        isScrolled 
                          ? 'border-[#d5d7da] text-[#0a0d12] bg-white hover:bg-gray-50' 
                          : 'border-white text-white bg-transparent hover:bg-white hover:text-[#0a0d12]'
                      }`}
                      onClick={() => window.location.href = '/login'}
                    >
                      Sign In
                    </Button>

                    {/* Sign Up Button */}
                    <Button
                      className={`rounded-full px-6 py-2 font-bold text-base transition-all duration-300 ${
                        isScrolled 
                          ? 'bg-[#0a0d12] text-white hover:bg-[#1a1d22]' 
                          : 'bg-white text-[#0a0d12] hover:bg-gray-100'
                      }`}
                      onClick={() => window.location.href = '/login'}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display-lg-extrabold mb-6">
              Explore Culinary Experiences
            </h1>
            <p className="text-lg md:text-xl font-text-lg-regular mb-10 text-white/90 max-w-2xl mx-auto">
              Search and refine your choice to discover the perfect restaurant.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <Input
                  type="text"
                  placeholder="Search restaurants, food and drink"
                  className="w-full pl-12 pr-4 py-4 h-14 text-lg rounded-full border-0 bg-white text-gray-900 placeholder-gray-500 shadow-lg focus:ring-2 focus:ring-[#c12116] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            <div className="flex flex-col items-center text-center cursor-pointer hover:opacity-80 transition-opacity" data-testid="category-all-restaurant">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm">
                <img 
                  src="/figmaAssets/category-all-food.png" 
                  alt="All Restaurant" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-sm font-text-sm-medium text-[#0a0d12]">All Restaurant</span>
            </div>
            
            <div className="flex flex-col items-center text-center cursor-pointer hover:opacity-80 transition-opacity" data-testid="category-nearby">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm">
                <img 
                  src="/figmaAssets/category-location.png" 
                  alt="Nearby" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-sm font-text-sm-medium text-[#0a0d12]">Nearby</span>
            </div>
            
            <div className="flex flex-col items-center text-center cursor-pointer hover:opacity-80 transition-opacity" data-testid="category-discount">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm">
                <img 
                  src="/figmaAssets/category-discount.png" 
                  alt="Discount" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-sm font-text-sm-medium text-[#0a0d12]">Discount</span>
            </div>
            
            <div className="flex flex-col items-center text-center cursor-pointer hover:opacity-80 transition-opacity" data-testid="category-best-seller">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm">
                <img 
                  src="/figmaAssets/category-best-seller.png" 
                  alt="Best Seller" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-sm font-text-sm-medium text-[#0a0d12]">Best Seller</span>
            </div>
            
            <div className="flex flex-col items-center text-center cursor-pointer hover:opacity-80 transition-opacity" data-testid="category-delivery">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm">
                <img 
                  src="/figmaAssets/category-delivery.png" 
                  alt="Delivery" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-sm font-text-sm-medium text-[#0a0d12]">Delivery</span>
            </div>
            
            <div className="flex flex-col items-center text-center cursor-pointer hover:opacity-80 transition-opacity" data-testid="category-lunch">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm">
                <img 
                  src="/figmaAssets/category-lunch.png" 
                  alt="Lunch" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-sm font-text-sm-medium text-[#0a0d12]">Lunch</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Restaurants */}
      <section className="py-8 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-text-xl-semibold text-[#0a0d12]">
              Recommended
            </h2>
            <button className="text-[#c12116] font-text-md-medium hover:underline" data-testid="button-see-all">
              See All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 12 }, (_, index) => (
              <Card key={index} className="bg-white hover:shadow-md transition-shadow duration-200 cursor-pointer" data-testid={`card-restaurant-${index}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                      <img 
                        src="/figmaAssets/restaurant-card-bg.png" 
                        alt="Restaurant" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-text-md-semibold text-[#0a0d12] mb-1">
                        Burger King
                      </h3>
                      
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                        <span className="font-text-sm-medium text-[#0a0d12]">4.9</span>
                      </div>
                      
                      <p className="text-sm text-[#6b7280] font-text-sm-regular">
                        Jakarta Selatan • 2.4 km
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              className="bg-white text-[#0a0d12] border-gray-200 hover:bg-gray-50 font-text-md-medium px-8"
              data-testid="button-show-more"
            >
              Show More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0d12] text-white py-20 border-t border-[#d5d7da]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <div className="w-10 h-10 rounded-full border border-[#252b37] flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-[#252b37] flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-[#252b37] flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.958 1.404-5.958s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.fff.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.747-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017.001z"/>
                      </svg>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-[#252b37] flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Middle Section - Explore Menu */}
            <div className="w-[200px]">
              <div className="flex flex-col gap-5">
                <h3 className="text-[#fdfdfd] text-base font-extrabold leading-[30px] font-nunito">
                  Explore
                </h3>
                <div className="flex flex-col gap-5">
                  <a href="#" className="text-[#fdfdfd] text-base font-normal leading-[30px] font-nunito hover:text-[#c12116] transition-colors">
                    All Food
                  </a>
                  <a href="#" className="text-[#fdfdfd] text-base font-normal leading-[30px] font-nunito hover:text-[#c12116] transition-colors">
                    Nearby
                  </a>
                  <a href="#" className="text-[#fdfdfd] text-base font-normal leading-[30px] font-nunito hover:text-[#c12116] transition-colors">
                    Discount
                  </a>
                  <a href="#" className="text-[#fdfdfd] text-base font-normal leading-[30px] font-nunito hover:text-[#c12116] transition-colors">
                    Best Seller
                  </a>
                  <a href="#" className="text-[#fdfdfd] text-base font-normal leading-[30px] font-nunito hover:text-[#c12116] transition-colors">
                    Delivery
                  </a>
                  <a href="#" className="text-[#fdfdfd] text-base font-normal leading-[30px] font-nunito hover:text-[#c12116] transition-colors">
                    Lunch
                  </a>
                </div>
              </div>
            </div>
            
            {/* Right Section - Help Menu */}
            <div className="w-[200px]">
              <div className="flex flex-col gap-5">
                <h3 className="text-[#fdfdfd] text-base font-extrabold leading-[30px] font-nunito">
                  Help
                </h3>
                <div className="flex flex-col gap-5">
                  <a href="#" className="text-[#fdfdfd] text-base font-normal leading-[30px] font-nunito hover:text-[#c12116] transition-colors">
                    How to Order
                  </a>
                  <a href="#" className="text-[#fdfdfd] text-base font-normal leading-[30px] font-nunito hover:text-[#c12116] transition-colors">
                    Payment Methods
                  </a>
                  <a href="#" className="text-[#fdfdfd] text-base font-normal leading-[30px] font-nunito hover:text-[#c12116] transition-colors">
                    Track My Order
                  </a>
                  <a href="#" className="text-[#fdfdfd] text-base font-normal leading-[30px] font-nunito hover:text-[#c12116] transition-colors">
                    FAQ
                  </a>
                  <a href="#" className="text-[#fdfdfd] text-base font-normal leading-[30px] font-nunito hover:text-[#c12116] transition-colors">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};