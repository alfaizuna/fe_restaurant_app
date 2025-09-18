import React from "react";
import { Button } from "@/shared/ui";
import { useAuthStore, useCartStore } from "@/shared/store";
import { useLocation } from "wouter";
import { UserProfileDropdown } from "./UserProfileDropdown";

interface HeaderProps {
  /** Variant of the header */
  variant?: 'home' | 'page';
  /** Whether the header is in scrolled state (for home variant) */
  isScrolled?: boolean;
  /** Whether the device is mobile */
  isMobile?: boolean;
  /** Custom cart item count (optional, defaults to cart store) */
  cartItemCount?: number;
  /** Custom cart click handler (optional) */
  onCartClick?: () => void;
  /** Custom logo click handler (optional) */
  onLogoClick?: () => void;
  /** Shadow variant for page header */
  shadowVariant?: 'sm' | 'md';
  /** Height variant for header */
  heightVariant?: 16 | 20;
}

export const Header = ({
  variant = 'page',
  isScrolled = false,
  isMobile = false,
  cartItemCount,
  onCartClick,
  onLogoClick,
  shadowVariant = 'sm',
  heightVariant = 16
}: HeaderProps) => {
  const { user } = useAuthStore();
  const { cart } = useCartStore();
  const [, setLocation] = useLocation();

  // Get cart count - use provided count or default to cart store
  const totalCartItems = cartItemCount ?? cart.itemCount;

  // Handle logo click
  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      setLocation('/');
    }
  };

  // Handle cart click
  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    } else {
      setLocation('/cart');
    }
  };

  // Handle auth actions
  const handleSignIn = () => {
    if (variant === 'home') {
      window.location.href = '/login?tab=signin';
    } else {
      setLocation('/login?tab=signin');
    }
  };

  const handleSignUp = () => {
    if (variant === 'home') {
      window.location.href = '/login?tab=signup';
    } else {
      setLocation('/login?tab=signup');
    }
  };

  // Determine header styling based on variant
  const getHeaderClassName = () => {
    if (variant === 'home') {
      return isMobile 
        ? 'absolute top-0 left-0 right-0 z-50 bg-transparent' 
        : `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled 
              ? 'bg-white shadow-lg' 
              : 'bg-transparent'
          }`;
    }
    return `bg-white shadow-${shadowVariant}`;
  };

  // Determine logo source based on variant and state
  const getLogoSource = () => {
    if (variant === 'home') {
      return isMobile 
        ? "/figmaAssets/logo-white.svg"
        : isScrolled 
          ? "/figmaAssets/logo.png" 
          : "/figmaAssets/logo-white.svg";
    }
    return "/figmaAssets/logo.png";
  };

  // Determine text color based on variant and state
  const getTextColor = () => {
    if (variant === 'home') {
      return isScrolled ? 'text-[#0a0d12]' : 'text-white';
    }
    return 'text-[#0a0d12]';
  };

  // Determine button styles based on variant and state
  const getSignInButtonClass = () => {
    const baseClass = "border-2 rounded-full px-6 py-2 font-bold text-base transition-all duration-300";
    
    if (variant === 'home') {
      return `${baseClass} ${
        isScrolled 
          ? 'border-[#d5d7da] text-[#0a0d12] bg-white hover:bg-gray-50' 
          : 'border-white text-white bg-transparent hover:bg-white hover:text-[#0a0d12]'
      }`;
    }
    return `${baseClass} border-[#d5d7da] text-[#0a0d12] bg-white hover:bg-gray-50`;
  };

  const getSignUpButtonClass = () => {
    const baseClass = "rounded-full px-6 py-2 font-bold text-base transition-all duration-300";
    
    if (variant === 'home') {
      return `${baseClass} ${
        isScrolled 
          ? 'bg-[#0a0d12] text-white hover:bg-[#1a1d22]' 
          : 'bg-white text-[#0a0d12] hover:bg-gray-100'
      }`;
    }
    return `${baseClass} bg-[#0a0d12] text-white hover:bg-[#1a1d22]`;
  };

  // Determine cart icon styling
  const getCartIconClass = () => {
    if (variant === 'home') {
      return `${isMobile ? 'w-7 h-7' : 'w-7 h-7'} ${
        isScrolled ? 'brightness-0' : 'brightness-0 invert'
      }`;
    }
    // Special case for MyCart page (height 20)
    if (heightVariant === 20) {
      return 'w-8 h-8 brightness-0';
    }
    return isMobile ? 'w-7 h-7' : 'w-7 h-7';
  };

  return (
    <header className={getHeaderClassName()}>
      <div className={`${
        variant === 'page' && isMobile 
          ? 'px-4' 
          : variant === 'home' && isMobile
            ? 'px-4'
            : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
      }`}>
        <div className={`flex justify-between items-center ${
          isMobile ? 'h-16 py-2' : `h-${heightVariant}`
        }`}>
          {/* Logo */}
          <div 
            className="inline-flex items-center gap-[15px] cursor-pointer"
            onClick={handleLogoClick}
          >
            <img
              className={`relative ${isMobile ? 'w-10 h-10' : 'w-[42px] h-[42px]'}`}
              alt="Logo"
              src={getLogoSource()}
            />
            {!isMobile && (
              <div className={`relative w-fit font-display-md-extrabold font-[number:var(--display-md-extrabold-font-weight)] text-[length:var(--display-md-extrabold-font-size)] tracking-[var(--display-md-extrabold-letter-spacing)] leading-[var(--display-md-extrabold-line-height)] [font-style:var(--display-md-extrabold-font-style)] transition-colors duration-300 ${getTextColor()}`}>
                Foody
              </div>
            )}
          </div>

          {/* Right side - Cart and User Profile / Auth Buttons */}
          <div className="flex items-center gap-6">
            {user ? (
              <>
                {/* Shopping Cart */}
                <button 
                  onClick={handleCartClick}
                  className={`relative ${
                    isMobile 
                      ? 'p-1' 
                      : `p-2 hover:opacity-80 transition-all duration-300`
                  } ${variant === 'home' && isMobile ? 'text-white' : ''}`}
                >
                  <img 
                    src="/figmaAssets/bag-icon.svg" 
                    alt="Shopping Bag"
                    className={getCartIconClass()}
                  />
                  {totalCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#c12116] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                      {totalCartItems}
                    </span>
                  )}
                </button>

                {/* User Profile */}
                {isMobile && variant !== 'home' ? (
                  <img
                    className="w-10 h-10 rounded-full"
                    alt="User Avatar"
                    src="/figmaAssets/user-avatar.png"
                  />
                ) : (
                  <UserProfileDropdown 
                    isScrolled={variant === 'home' ? isScrolled : true} 
                    isMobile={isMobile} 
                  />
                )}
              </>
            ) : (
              !isMobile && (
                <>
                  {/* Sign In Button */}
                  <Button
                    variant="outline"
                    className={getSignInButtonClass()}
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>

                  {/* Sign Up Button */}
                  <Button
                    className={getSignUpButtonClass()}
                    onClick={handleSignUp}
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
  );
};
