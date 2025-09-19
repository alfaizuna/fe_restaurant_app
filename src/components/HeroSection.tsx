import React from "react";
import { Input } from "@/shared/ui";
import { Search } from "lucide-react";
import { useAuthStore } from "@/shared/store";

interface HeroSectionProps {
  isMobile: boolean;
}

export const HeroSection = ({ isMobile }: HeroSectionProps) => {
  const { user, isAuthenticated } = useAuthStore();
  
  return (
    <div className={`relative h-full flex items-center justify-center text-center text-white ${
      isMobile 
        ? 'px-6 pt-16' 
        : 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'
    }`}>
      <div className={`${isMobile ? 'w-full' : ''}`}>
        <h1 className={`${
          isMobile 
            ? 'text-4xl font-display-lg-extrabold mb-1' 
            : 'text-4xl md:text-5xl lg:text-6xl font-display-lg-extrabold mb-6'
        }`}>
          Explore Culinary Experiences
        </h1>
        <p className={`${
          isMobile 
            ? 'text-lg font-text-lg-bold mb-6 text-white max-w-sm mx-auto' 
            : 'text-lg md:text-xl font-text-lg-regular mb-10 text-white/90 max-w-2xl mx-auto'
        }`}>
          Search and refine your choice to discover the perfect restaurant.
        </p>
        
        {/* Search Bar */}
        <div className={`relative ${isMobile ? 'max-w-sm mx-auto' : 'max-w-2xl mx-auto'}`}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search restaurants, food and drink"
              className={`w-full pl-12 pr-4 ${
                isMobile 
                  ? 'py-2 h-12 text-sm' 
                  : 'py-4 h-14 text-lg'
              } rounded-full border-0 bg-white text-gray-900 placeholder-gray-500 shadow-lg focus:ring-2 focus:ring-[#c12116] focus:border-transparent`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
