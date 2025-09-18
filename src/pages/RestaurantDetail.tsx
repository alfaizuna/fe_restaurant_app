import React, { useState, useEffect } from "react";
import { Button, Badge, Card, CardContent, Input } from "@/shared/ui";
import { Star, Minus, Plus, Share2, ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/shared/store";
import { Header } from "@/components";

interface MenuItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  comment: string;
}

export const RestaurantDetail = (): JSX.Element => {
  const { user } = useAuthStore();
  const [activeCategory, setActiveCategory] = useState('All Menu');
  const [cartItems, setCartItems] = useState<MenuItem[]>([]);
  const [isMobile, setIsMobile] = useState(false);

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

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: "Burger Special",
      price: "Rp65.000",
      image: "/figmaAssets/menu-item-1.png",
      quantity: 0,
    },
    {
      id: 2,
      name: "Chicken Wings",
      price: "Rp45.000",
      image: "/figmaAssets/menu-item-2.png",
      quantity: 2,
    },
    {
      id: 3,
      name: "Beef Steak",
      price: "Rp85.000",
      image: "/figmaAssets/menu-item-3.png",
      quantity: 1,
    },
    {
      id: 4,
      name: "Fish & Chips",
      price: "Rp55.000",
      image: "/figmaAssets/menu-item-1.png",
      quantity: 0,
    },
    {
      id: 5,
      name: "Pasta Carbonara",
      price: "Rp48.000",
      image: "/figmaAssets/menu-item-2.png",
      quantity: 0,
    },
    {
      id: 6,
      name: "Grilled Salmon",
      price: "Rp75.000",
      image: "/figmaAssets/menu-item-3.png",
      quantity: 0,
    },
    {
      id: 7,
      name: "Caesar Salad",
      price: "Rp35.000",
      image: "/figmaAssets/menu-item-1.png",
      quantity: 0,
    },
    {
      id: 8,
      name: "BBQ Ribs",
      price: "Rp95.000",
      image: "/figmaAssets/menu-item-2.png",
      quantity: 0,
    },
  ]);

  const reviews: Review[] = [
    {
      id: 1,
      name: "Michael Brown",
      date: "25 August 2025, 13:38",
      rating: 5,
      comment: "What a fantastic place! The food was delicious, and the ambiance was delightful. A must-visit for anyone looking for a great time!",
    },
    {
      id: 2,
      name: "Sarah Davis",
      date: "25 August 2025, 13:38",
      rating: 5,
      comment: "I can't say enough good things! The service was exceptional, and the menu had so many great options. Definitely a five-star experience!",
    },
    {
      id: 3,
      name: "David Wilson",
      date: "25 August 2025, 13:38",
      rating: 5,
      comment: "This place exceeded my expectations! The staff were welcoming, and the vibe was just right. I'll be returning soon!",
    },
    {
      id: 4,
      name: "Emily Johnson",
      date: "25 August 2025, 13:38",
      rating: 5,
      comment: "Absolutely loved my visit! The staff were friendly and attentive, making sure everything was just right. Can't wait to come back!",
    },
    {
      id: 5,
      name: "Jessica Taylor",
      date: "25 August 2025, 13:38",
      rating: 5,
      comment: "A wonderful experience overall! The food was exquisite, and the service was impeccable. Highly recommend for a special night out!",
    },
    {
      id: 6,
      name: "Alex Smith",
      date: "25 August 2025, 13:38",
      rating: 5,
      comment: "I had an amazing experience! The service was top-notch, and the atmosphere was perfect for a relaxing evening. Highly recommend!",
    },
  ];

  const getTotalCartItems = () => {
    return menuItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalCartPrice = () => {
    return menuItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^\d]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const updateItemQuantity = (itemId: number, action: 'add' | 'remove') => {
    setMenuItems(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            quantity: action === 'add' 
              ? item.quantity + 1 
              : Math.max(0, item.quantity - 1) 
          }
        : item
    ));
  };

  const categories = ['All Menu', 'Food', 'Drink'];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header 
        variant="page"
        isMobile={isMobile}
        cartItemCount={getTotalCartItems()}
        shadowVariant="md"
      />

      {/* Main Content */}
      <div className={`${
        isMobile 
          ? 'px-4 py-6' 
          : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'
      } ${getTotalCartItems() > 0 ? (isMobile ? 'pb-20' : 'pb-24') : ''}`}>
        {/* Restaurant Images & Info Section */}
        <div className={`${
          isMobile 
            ? 'flex flex-col gap-4 mb-6' 
            : 'flex gap-5 mb-8'
        }`}>
          {isMobile ? (
            /* Mobile Layout - Single Column */
            <>
              {/* Main Image */}
              <div className="w-full h-[250px]">
                <img
                  src="/figmaAssets/restaurant-hero-1.png"
                  alt="Restaurant Main"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              
              {/* Image Grid */}
              <div className="grid grid-cols-3 gap-2 h-[120px]">
                <img
                  src="/figmaAssets/restaurant-hero-2.png"
                  alt="Restaurant Interior"
                  className="w-full h-full object-cover rounded-lg"
                />
                <img
                  src="/figmaAssets/restaurant-hero-3.png"
                  alt="Restaurant Food"
                  className="w-full h-full object-cover rounded-lg"
                />
                <img
                  src="/figmaAssets/restaurant-hero-4.png"
                  alt="Restaurant Ambiance"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </>
          ) : (
            /* Desktop Layout - Two Column */
            <>
              {/* Left - Main Image */}
              <div className="w-[651px] h-[470px]">
                <img
                  src="/figmaAssets/restaurant-hero-1.png"
                  alt="Restaurant Main"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Right - Image Grid & Info */}
              <div className="flex-1 flex flex-col gap-5">
                {/* Top Image */}
                <div className="h-[302px]">
                  <img
                    src="/figmaAssets/restaurant-hero-2.png"
                    alt="Restaurant Interior"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>

                {/* Bottom Images Grid */}
                <div className="flex gap-5 h-[148px]">
                  <div className="flex-1">
                    <img
                      src="/figmaAssets/restaurant-hero-3.png"
                      alt="Restaurant Food"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                  <div className="flex-1">
                    <img
                      src="/figmaAssets/restaurant-hero-4.png"
                      alt="Restaurant Ambiance"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Restaurant Info Section */}
        <div className={`${
          isMobile 
            ? 'flex flex-col gap-4 mb-6' 
            : 'flex items-center justify-between mb-8'
        }`}>
          <div className={`${
            isMobile 
              ? 'flex flex-col gap-3' 
              : 'flex items-center gap-4'
          }`}>
            {/* Restaurant Logo */}
            <div className={`${
              isMobile 
                ? 'w-20 h-20 rounded-full overflow-hidden mx-auto' 
                : 'w-[120px] h-[120px] rounded-full overflow-hidden'
            }`}>
              <img
                src="/figmaAssets/restaurant-logo.png"
                alt="Restaurant Logo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Restaurant Details */}
            <div className={`${
              isMobile 
                ? 'flex flex-col gap-1 text-center' 
                : 'flex flex-col gap-1'
            }`}>
              <h1 className={`${
                isMobile 
                  ? 'text-2xl font-extrabold text-[#0a0d12]' 
                  : 'text-[36px] font-extrabold text-[#0a0d12] leading-[44px]'
              }`}>
                Burger King
              </h1>
              
              <div className={`flex items-center gap-1 ${
                isMobile ? 'justify-center' : ''
              }`}>
                <Star className="w-6 h-6 fill-[#FFAB0D] text-[#FFAB0D]" />
                <span className="text-lg font-semibold text-[#0a0d12]">4.9</span>
              </div>
              
              <div className={`flex items-center gap-2 text-lg font-medium text-[#0a0d12] ${
                isMobile ? 'justify-center' : ''
              }`}>
                <span>Jakarta Selatan</span>
                <div className="w-0.5 h-0.5 bg-[#181D27] rounded-full"></div>
                <span>2.4 km</span>
              </div>
            </div>
          </div>

          {/* Share Button */}
          <Button 
            variant="outline"
            className={`flex items-center gap-3 px-4 py-3 border border-[#D5D7DA] rounded-full hover:bg-gray-50 ${
              isMobile ? 'self-center' : ''
            }`}
          >
            <Share2 className="w-5 h-5" />
            <span className="font-bold text-[#0a0d12]">Share</span>
          </Button>
        </div>

        {/* Divider */}
        <div className={`w-full h-px bg-[#D5D7DA] ${isMobile ? 'mb-6' : 'mb-8'}`}></div>

        {/* Menu Section */}
        <div className={isMobile ? 'mb-6' : 'mb-8'}>
          <div className={`${
            isMobile 
              ? 'flex flex-col gap-4 mb-4' 
              : 'flex justify-between items-center mb-6'
          }`}>
            <h2 className={`${
              isMobile 
                ? 'text-2xl font-extrabold text-[#0a0d12] text-center' 
                : 'text-[36px] font-extrabold text-[#0a0d12] leading-[44px]'
            }`}>
              Menu
            </h2>
            
            {/* Category Tabs */}
            <div className={`flex items-center gap-3 ${
              isMobile ? 'justify-center overflow-x-auto pb-2' : ''
            }`}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full font-bold text-base transition-all duration-200 whitespace-nowrap ${
                    activeCategory === category
                      ? 'bg-[#FFECEC] text-[#C12116] border border-[#C12116]'
                      : 'bg-white text-[#0a0d12] border border-[#D5D7DA] hover:bg-gray-50'
                  } ${isMobile ? 'text-sm' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <div className={`grid gap-4 ${
            isMobile ? 'grid-cols-2 mb-6' : 'grid-cols-4 gap-5 mb-8'
          }`}>
            {menuItems.map((item) => (
              <Card key={item.id} className="bg-white shadow-md rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  {/* Food Image */}
                  <div className={isMobile ? 'h-[140px]' : 'h-[285px]'}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Food Info */}
                  <div className={`${
                    isMobile 
                      ? 'p-3 flex flex-col gap-2' 
                      : 'p-4 flex justify-between items-center'
                  }`}>
                    <div className={`flex flex-col ${isMobile ? 'mb-2' : ''}`}>
                      <h3 className={`font-medium text-[#0a0d12] mb-1 ${
                        isMobile ? 'text-sm' : 'text-base'
                      }`}>
                        {item.name}
                      </h3>
                      <p className={`font-extrabold text-[#0a0d12] ${
                        isMobile ? 'text-sm' : 'text-lg'
                      }`}>
                        {item.price}
                      </p>
                    </div>

                    {/* Add/Quantity Controls */}
                    <div className={`flex ${isMobile ? 'justify-center w-full' : 'justify-end'}`}>
                      {item.quantity === 0 ? (
                        <Button
                          onClick={() => updateItemQuantity(item.id, 'add')}
                          className={`bg-[#C12116] hover:bg-[#A01E13] text-white rounded-full font-bold ${
                            isMobile 
                              ? 'px-4 py-1.5 text-xs w-full h-8' 
                              : 'px-4 py-2 text-base w-20 h-10'
                          }`}
                        >
                          Add
                        </Button>
                      ) : (
                        <div className={`flex items-center justify-center ${
                          isMobile ? 'gap-2' : 'gap-4'
                        }`}>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateItemQuantity(item.id, 'remove')}
                            className={`rounded-full border border-[#D5D7DA] p-0 hover:bg-gray-50 flex items-center justify-center ${
                              isMobile ? 'w-7 h-7' : 'w-8 h-8'
                            }`}
                          >
                            <Minus className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-[#0a0d12]`} />
                          </Button>
                          <span className={`font-semibold text-[#0a0d12] min-w-[20px] text-center ${
                            isMobile ? 'text-sm' : 'text-lg'
                          }`}>
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            onClick={() => updateItemQuantity(item.id, 'add')}
                            className={`rounded-full bg-[#C12116] hover:bg-[#A01E13] text-white p-0 flex items-center justify-center ${
                              isMobile ? 'w-7 h-7' : 'w-8 h-8'
                            }`}
                          >
                            <Plus className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-white`} />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Show More Button */}
          <div className="text-center">
            <Button 
              variant="outline"
              className={`bg-white text-[#0a0d12] border border-[#D5D7DA] hover:bg-gray-50 font-bold rounded-full ${
                isMobile ? 'w-32 h-10 text-sm' : 'w-40 h-12'
              }`}
            >
              Show More
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className={`w-full h-px bg-[#D5D7DA] ${isMobile ? 'mb-6' : 'mb-8'}`}></div>

        {/* Reviews Section */}
        <div className={isMobile ? 'mb-6' : 'mb-8'}>
          <div className={`${
            isMobile 
              ? 'flex flex-col gap-4 mb-4' 
              : 'flex justify-between items-center mb-6'
          }`}>
            <div className={`flex flex-col gap-3 ${
              isMobile ? 'text-center' : ''
            }`}>
              <h2 className={`font-extrabold text-[#0a0d12] ${
                isMobile 
                  ? 'text-2xl' 
                  : 'text-[36px] leading-[44px]'
              }`}>
                Review
              </h2>
              <div className={`flex items-center gap-1 ${
                isMobile ? 'justify-center' : ''
              }`}>
                <Star className={`fill-[#FFAB0D] text-[#FFAB0D] ${
                  isMobile ? 'w-6 h-6' : 'w-8 h-8'
                }`} />
                <span className={`font-extrabold text-[#0a0d12] ${
                  isMobile ? 'text-lg' : 'text-xl'
                }`}>
                  4.9 (24 Ulasan)
                </span>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className={`grid gap-5 ${
            isMobile ? 'grid-cols-1 mb-6' : 'grid-cols-2 mb-8'
          }`}>
            {reviews.map((review) => (
              <Card key={review.id} className="bg-white shadow-md rounded-2xl">
                <CardContent className={isMobile ? 'p-3' : 'p-4'}>
                  {/* Reviewer Info */}
                  <div className={`flex items-center gap-3 ${
                    isMobile ? 'mb-3' : 'mb-4'
                  }`}>
                    <div className={`bg-gray-300 rounded-full overflow-hidden ${
                      isMobile ? 'w-12 h-12' : 'w-16 h-16'
                    }`}>
                      <img
                        src="/figmaAssets/user-avatar.png"
                        alt={review.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h4 className={`font-extrabold text-[#0a0d12] ${
                        isMobile ? 'text-base' : 'text-lg'
                      }`}>
                        {review.name}
                      </h4>
                      <p className={`text-[#0a0d12] ${
                        isMobile ? 'text-sm' : 'text-base'
                      }`}>
                        {review.date}
                      </p>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="flex flex-col gap-2">
                    {/* Rating Stars */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`${
                            isMobile ? 'w-4 h-4' : 'w-6 h-6'
                          } ${
                            i < review.rating 
                              ? 'fill-[#FFAB0D] text-[#FFAB0D]' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className={`text-[#0a0d12] ${
                      isMobile 
                        ? 'text-sm leading-6' 
                        : 'text-base leading-[30px]'
                    }`}>
                      {review.comment}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Show More Reviews Button */}
          <div className="text-center">
            <Button 
              variant="outline"
              className={`bg-white text-[#0a0d12] border border-[#D5D7DA] hover:bg-gray-50 font-bold rounded-full ${
                isMobile ? 'w-32 h-10 text-sm' : 'w-40 h-12'
              }`}
            >
              Show More
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`bg-[#0a0d12] text-white border-t border-[#d5d7da] ${
        isMobile ? 'py-10' : 'py-20'
      } ${getTotalCartItems() > 0 ? (isMobile ? 'pb-24' : 'pb-32') : ''}`}>
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
                  <div className="w-10 h-10 rounded-full border border-[#252b37] flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-[#252b37] flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-[#252b37] flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-[#252b37] flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Navigation Menus */}
              <div className="flex justify-between gap-4">
                {/* Explore Menu */}
                <div className="flex-1">
                  <div className="space-y-4">
                    <h3 className="text-[#fdfdfd] text-sm font-extrabold">
                      Explore
                    </h3>
                    <div className="space-y-4">
                      <a href="#" className="block text-[#fdfdfd] text-sm font-normal hover:text-[#c12116] transition-colors">
                        All Food
                      </a>
                      <a href="#" className="block text-[#fdfdfd] text-sm font-normal hover:text-[#c12116] transition-colors">
                        Nearby
                      </a>
                      <a href="#" className="block text-[#fdfdfd] text-sm font-normal hover:text-[#c12116] transition-colors">
                        Discount
                      </a>
                      <a href="#" className="block text-[#fdfdfd] text-sm font-normal hover:text-[#c12116] transition-colors">
                        Best Seller
                      </a>
                      <a href="#" className="block text-[#fdfdfd] text-sm font-normal hover:text-[#c12116] transition-colors">
                        Delivery
                      </a>
                      <a href="#" className="block text-[#fdfdfd] text-sm font-normal hover:text-[#c12116] transition-colors">
                        Lunch
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Help Menu */}
                <div className="flex-1">
                  <div className="space-y-4">
                    <h3 className="text-[#fdfdfd] text-sm font-extrabold">
                      Help
                    </h3>
                    <div className="space-y-4">
                      <a href="#" className="block text-[#fdfdfd] text-sm font-normal hover:text-[#c12116] transition-colors">
                        How to Order
                      </a>
                      <a href="#" className="block text-[#fdfdfd] text-sm font-normal hover:text-[#c12116] transition-colors">
                        Payment Methods
                      </a>
                      <a href="#" className="block text-[#fdfdfd] text-sm font-normal hover:text-[#c12116] transition-colors">
                        Track My Order
                      </a>
                      <a href="#" className="block text-[#fdfdfd] text-sm font-normal hover:text-[#c12116] transition-colors">
                        FAQ
                      </a>
                      <a href="#" className="block text-[#fdfdfd] text-sm font-normal hover:text-[#c12116] transition-colors">
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
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
          )}
        </div>
      </footer>

      {/* Floating Cart Widget */}
      {getTotalCartItems() > 0 && (
        <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-[#d5d7da] ${
          isMobile ? 'px-4 py-3' : 'px-8 py-4'
        }`}>
          <div className={`${
            isMobile 
              ? 'flex justify-between items-center' 
              : 'max-w-7xl mx-auto flex justify-between items-center'
          }`}>
            <div className="flex items-center gap-2">
              <img 
                src="/figmaAssets/bag-icon.svg" 
                alt="Shopping Bag"
                className={isMobile ? 'w-6 h-6' : 'w-8 h-8'}
              />
              <span className={`text-[#0a0d12] ${
                isMobile ? 'text-base' : 'text-lg'
              }`}>
                {getTotalCartItems()} Items
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className={`font-extrabold text-[#0a0d12] ${
                isMobile ? 'text-lg' : 'text-xl'
              }`}>
                Rp{getTotalCartPrice().toLocaleString('id-ID')}
              </span>
              <Button
                className={`bg-[#C12116] hover:bg-[#A01E13] text-white rounded-full font-bold ${
                  isMobile 
                    ? 'px-6 py-2 text-sm' 
                    : 'px-8 py-3 text-base'
                }`}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
