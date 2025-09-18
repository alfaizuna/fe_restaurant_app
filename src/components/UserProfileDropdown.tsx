import React, { useState, useRef, useEffect } from "react";
import { MapPin, FileText, LogOut, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/shared/store";
import { useLocation } from "wouter";

interface UserProfileDropdownProps {
  isScrolled?: boolean;
  isMobile?: boolean;
}

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  isScrolled = false,
  isMobile = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const [, setLocation] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setLocation("/login");
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Profile Button */}
      <button
        onClick={toggleDropdown}
        className={`flex items-center cursor-pointer hover:opacity-80 transition-all duration-300 ${
          isMobile 
            ? 'gap-0 text-white' 
            : `gap-3 ${isScrolled ? 'text-[#0a0d12]' : 'text-white'}`
        }`}
      >
        <img
          src="/figmaAssets/user-avatar.png"
          alt="Profile"
          className={`${
            isMobile 
              ? 'w-8 h-8 rounded-full border-2 border-white' 
              : `w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                  isScrolled ? 'border-gray-300' : 'border-white'
                }`
          }`}
        />
        {!isMobile && (
          <>
            <span className={`font-text-md-medium transition-colors duration-300 ${
              isScrolled ? 'text-[#0a0d12]' : 'text-white'
            }`}>
              {user?.name || 'John Doe'}
            </span>
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              } ${isScrolled ? 'text-[#0a0d12]' : 'text-white'}`}
            />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-[0px_0px_20px_0px_rgba(203,202,202,0.25)] py-4 px-4 z-50 ${
          isMobile ? 'w-[180px]' : 'w-[197px]'
        }`}>
          {/* User Info Section */}
          <div className="flex items-center gap-3 mb-3">
            <img
              src="/figmaAssets/user-avatar.png"
              alt="Profile"
              className="w-9 h-9 rounded-full"
            />
            <span className="font-text-md-bold text-[#0a0d12]">
              {user?.name || 'John Doe'}
            </span>
          </div>

          {/* Separator */}
          <hr className="border-[#E9EAEB] mb-3" />

          {/* Menu Items */}
          <div className="space-y-3">
            {/* Delivery Address */}
            <button 
              className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-1 rounded transition-colors"
              onClick={() => {
                setIsOpen(false);
                // TODO: Navigate to delivery address page
              }}
            >
              <MapPin className="w-5 h-5 text-[#0a0d12]" strokeWidth={1.67} />
              <span className="font-text-sm-medium text-[#0a0d12]">
                Delivery Address
              </span>
            </button>

            {/* My Orders */}
            <button 
              className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-1 rounded transition-colors"
              onClick={() => {
                setIsOpen(false);
                // TODO: Navigate to orders page
              }}
            >
              <FileText className="w-5 h-5 text-[#181D27]" strokeWidth={1.67} />
              <span className="font-text-sm-medium text-[#181D27]">
                My Orders
              </span>
            </button>

            {/* Logout */}
            <button 
              className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-1 rounded transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 text-[#0a0d12]" strokeWidth={1.67} />
              <span className="font-text-sm-medium text-[#0a0d12]">
                Logout
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
