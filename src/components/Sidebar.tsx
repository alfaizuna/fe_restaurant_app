import React from 'react';
import { useLocation } from 'wouter';

interface SidebarProps {
  userName?: string;
  userAvatar?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  userName = 'John Doe',
  userAvatar = '/figmaAssets/user-avatar.png'
}) => {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    // Add logout logic here
    setLocation('/');
  };

  const handleDeliveryAddress = () => {
    // Add delivery address navigation logic
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0px_0px_20px_0px_rgba(203,202,202,0.25)] p-5 w-60">
      {/* User Profile Section */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={userAvatar}
          alt={userName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <span className="text-lg font-bold text-[#0A0D12]">{userName}</span>
      </div>

      {/* Divider */}
      <hr className="border-[#E9EAEB] mb-6" />

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
  );
};
