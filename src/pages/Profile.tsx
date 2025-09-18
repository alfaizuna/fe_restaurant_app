import React from 'react';
import { Header } from '@/components/Header';
import { FooterSection } from '@/components/FooterSection';
import { Button } from '@/shared/ui/button';
import { useAuthStore } from '@/shared/store';
import { useLocation } from 'wouter';

interface ProfileSidebarProps {
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
  onDeliveryAddress?: () => void;
  onMyOrders?: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  userName = 'John Doe',
  userAvatar = '/figmaAssets/user-avatar.png',
  onLogout,
  onDeliveryAddress,
  onMyOrders
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0px_0px_20px_0px_rgba(203,202,202,0.25)] p-5 w-60 h-fit">
      {/* User Profile Section */}
      <div className="flex items-center gap-2 mb-6">
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
          onClick={onDeliveryAddress}
          className="flex items-center gap-2 text-[#0A0D12] hover:text-[#C12116] transition-colors w-full text-left"
        >
          <img src="/figmaAssets/location-icon.svg" alt="Location" className="w-6 h-6" />
          <span className="text-base font-medium">Delivery Address</span>
        </button>

        {/* My Orders */}
        <button
          onClick={onMyOrders}
          className="flex items-center gap-2 text-[#0A0D12] hover:text-[#C12116] transition-colors w-full text-left"
        >
          <img src="/figmaAssets/file-icon.svg" alt="File" className="w-6 h-6" />
          <span className="text-base font-medium">My Orders</span>
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
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

interface ProfileCardProps {
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  userAvatar?: string;
  onUpdateProfile?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  userName = 'Johndoe',
  userEmail = 'johndoe@email.com',
  userPhone = '081234567890',
  userAvatar = '/figmaAssets/user-avatar.png',
  onUpdateProfile
}) => {
  return (
    <div className="w-full max-w-[524px]">
      <h1 className="text-[32px] font-extrabold text-[#0A0D12] mb-6 font-nunito">Profile</h1>
      
      <div className="bg-white rounded-2xl shadow-[0px_0px_20px_0px_rgba(203,202,202,0.25)] p-5">
        {/* Profile Info Section */}
        <div className="mb-6">
          <div className="flex items-start gap-3 mb-3">
            <img
              src={userAvatar}
              alt={userName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1 space-y-3">
              {/* Name */}
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-[#0A0D12]">Name</span>
                <span className="text-base font-bold text-[#0A0D12]">{userName}</span>
              </div>
              
              {/* Email */}
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-[#0A0D12]">Email</span>
                <span className="text-base font-bold text-[#0A0D12]">{userEmail}</span>
              </div>
              
              {/* Phone */}
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-[#0A0D12]">Nomor Handphone</span>
                <span className="text-base font-bold text-[#0A0D12]">{userPhone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Update Profile Button */}
        <Button
          onClick={onUpdateProfile}
          className="w-full bg-[#C12116] hover:bg-[#A11015] text-white font-bold py-2 px-4 rounded-full"
        >
          Update Profile
        </Button>
      </div>
    </div>
  );
};

export const Profile: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  const handleDeliveryAddress = () => {
    // Navigate to delivery address page
    console.log('Navigate to delivery address');
  };

  const handleMyOrders = () => {
    setLocation('/orders');
  };

  const handleUpdateProfile = () => {
    // Navigate to update profile page or open modal
    console.log('Update profile');
  };

  // Footer data
  const exploreLinks = [
    { label: 'All Food', href: '/categories' },
    { label: 'Nearby', href: '/nearby' },
    { label: 'Discount', href: '/discount' },
    { label: 'Best Seller', href: '/best-seller' },
    { label: 'Delivery', href: '/delivery' },
    { label: 'Lunch', href: '/lunch' }
  ];

  const helpLinks = [
    { label: 'How to Order', href: '/help/order' },
    { label: 'Payment Methods', href: '/help/payment' },
    { label: 'Track My Order', href: '/help/track' },
    { label: 'FAQ', href: '/help/faq' },
    { label: 'Contact Us', href: '/help/contact' }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <Header variant="page" shadowVariant="md" />

      {/* Main Content */}
      <div className="pt-[128px] pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <ProfileSidebar
              userName={user?.name || 'John Doe'}
              userAvatar="/figmaAssets/user-avatar.png"
              onLogout={handleLogout}
              onDeliveryAddress={handleDeliveryAddress}
              onMyOrders={handleMyOrders}
            />

            {/* Profile Content */}
            <ProfileCard
              userName={user?.name || 'Johndoe'}
              userEmail={user?.email || 'johndoe@email.com'}
              userPhone="081234567890"
              userAvatar="/figmaAssets/user-avatar.png"
              onUpdateProfile={handleUpdateProfile}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0A0D12] border-t border-[#D5D7DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex justify-between">
            {/* Logo and Description */}
            <div className="w-[380px]">
              <div className="mb-6">
                <div className="flex items-center gap-[15px] mb-[22px]">
                  <img
                    className="w-[42px] h-[42px]"
                    alt="Logo"
                    src="/figmaAssets/logo-white.svg"
                  />
                  <div className="text-white text-[32px] font-extrabold font-nunito">
                    Foody
                  </div>
                </div>
                <p className="text-[#FDFDFD] text-base leading-[30px] text-center">
                  Enjoy homemade flavors & chef's signature dishes, freshly prepared every day. Order online or visit our nearest branch.
                </p>
              </div>

              {/* Social Media */}
              <div className="flex flex-col justify-center gap-5 w-[196px]">
                <h3 className="text-[#FDFDFD] font-extrabold text-base leading-[30px] text-center">
                  Follow on Social Media
                </h3>
                <div className="flex gap-3">
                  {/* Social Media Icons */}
                  <div className="w-10 h-10 border border-[#252B37] rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-white"></div>
                  </div>
                  <div className="w-10 h-10 border border-[#252B37] rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-white"></div>
                  </div>
                  <div className="w-10 h-10 border border-[#252B37] rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-white"></div>
                  </div>
                  <div className="w-10 h-10 border border-[#252B37] rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-white"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explore Section */}
            <FooterSection
              title="Explore"
              links={exploreLinks}
              variant="desktop"
            />

            {/* Help Section */}
            <FooterSection
              title="Help"
              links={helpLinks}
              variant="desktop"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};
