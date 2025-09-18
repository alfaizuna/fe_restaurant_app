import React from 'react';
import { useLocation } from 'wouter';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userAvatar?: string;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  onClose,
  userName = 'John Doe',
  userAvatar = '/figmaAssets/user-avatar.png'
}) => {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    // Add logout logic here
    setLocation('/');
    onClose();
  };

  const handleDeliveryAddress = () => {
    // Add delivery address navigation logic
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden transform transition-transform">
        <div className="p-5 space-y-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* User Profile Section */}
          <div className="flex items-center gap-4 pt-8">
            <img
              src={userAvatar}
              alt={userName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-lg font-bold text-[#0A0D12]">{userName}</span>
          </div>

          {/* Divider */}
          <hr className="border-[#E9EAEB]" />

          {/* Menu Items */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <button
              onClick={handleDeliveryAddress}
              className="flex items-center gap-2 text-[#0A0D12] hover:text-[#C12116] transition-colors w-full text-left"
            >
              <img src="/figmaAssets/location-icon.svg" alt="Location" className="w-6 h-6" />
              <span className="text-base font-medium">Delivery Address</span>
            </button>

            {/* My Orders - Active */}
            <div className="flex items-center gap-2 text-[#C12116]">
              <img src="/figmaAssets/file-icon.svg" alt="File" className="w-6 h-6" />
              <span className="text-base font-medium">My Orders</span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[#0A0D12] hover:text-[#C12116] transition-colors w-full text-left"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-base font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
