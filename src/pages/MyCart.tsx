import React, { useEffect, useState } from "react";
import { Button } from "@/shared/ui";
import { useCartStore, useAuthStore } from "@/shared/store";
import { UserProfileDropdown, CartRestaurantSection, FooterSection, SocialMediaIcon } from "@/components";
import { useLocation } from "wouter";

export const MyCart = (): JSX.Element => {
  const [location, setLocation] = useLocation();
  const { cart } = useCartStore();
  const { user } = useAuthStore();
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

  const handleCheckout = (restaurantId: string) => {
    // Handle checkout logic here
    console.log(`Checkout for restaurant: ${restaurantId}`);
  };

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
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="inline-flex items-center gap-[15px] cursor-pointer" onClick={() => setLocation('/')}>
              <img
                className="relative w-[42px] h-[42px]"
                alt="Logo"
                src="/figmaAssets/logo.png"
              />
              <div className="relative w-fit font-display-md-extrabold font-[number:var(--display-md-extrabold-font-weight)] text-[length:var(--display-md-extrabold-font-size)] tracking-[var(--display-md-extrabold-letter-spacing)] leading-[var(--display-md-extrabold-line-height)] [font-style:var(--display-md-extrabold-font-style)] text-[#0a0d12]">
                Foody
              </div>
            </div>

            {/* Right side - Cart and User Profile */}
            <div className="flex items-center gap-6">
              {user ? (
                <>
                  {/* Shopping Cart with Badge */}
                  <button className="relative p-2 hover:opacity-80 transition-all duration-300">
                    <img 
                      src="/figmaAssets/bag-icon.svg" 
                      alt="Shopping Bag"
                      className="w-8 h-8 brightness-0"
                    />
                    <div className="absolute -top-1 -right-1 bg-[#c12116] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {cart.itemCount}
                    </div>
                  </button>

                  {/* User Profile Dropdown */}
                  <UserProfileDropdown isScrolled={true} isMobile={isMobile} />
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    className="border-2 border-[#d5d7da] text-[#0a0d12] bg-white hover:bg-gray-50 rounded-full px-6 py-2 font-bold text-base"
                    onClick={() => setLocation('/login?tab=signin')}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="bg-[#0a0d12] text-white hover:bg-[#1a1d22] rounded-full px-6 py-2 font-bold text-base"
                    onClick={() => setLocation('/login?tab=signup')}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">My Cart</h1>
        </div>

        {/* Cart Content */}
        <div className="space-y-5">
          {cart.restaurants.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-4">
                <img 
                  src="/figmaAssets/bag-icon.svg" 
                  alt="Empty Cart"
                  className="w-16 h-16 mx-auto opacity-50"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Start adding some delicious food to your cart!</p>
              <Button
                onClick={() => setLocation('/')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full"
              >
                Browse Restaurants
              </Button>
            </div>
          ) : (
            cart.restaurants.map((restaurant) => (
              <CartRestaurantSection
                key={restaurant.restaurantId}
                restaurant={restaurant}
                onCheckout={handleCheckout}
              />
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0d12] text-white py-20 border-t border-[#d5d7da] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between gap-16">
            {/* Left Section - Brand Info */}
            <div className="w-[380px]">
              <div className="flex flex-col gap-10">
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
        </div>
      </footer>
    </div>
  );
};
