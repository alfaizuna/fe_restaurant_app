import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { FooterSection } from '@/components/FooterSection';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Card, CardContent } from '@/shared/ui/card';
import { useAuthStore } from '@/shared/store';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

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

interface ProfileFormData {
  name: string;
  email: string;
  phone_number: string;
  current_password: string;
  new_password: string;
  confirm_password: string;
}

interface UpdateProfileCardProps {
  isLoading?: boolean;
  onCancel?: () => void;
}

const UpdateProfileCard: React.FC<UpdateProfileCardProps> = ({
  isLoading = false,
  onCancel
}) => {
  const { user, updateProfile, getProfile } = useAuthStore();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<ProfileFormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone_number: user?.phone_number || '',
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Error",
        description: "Email is required",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.phone_number.trim()) {
      toast({
        title: "Error",
        description: "Phone number is required",
        variant: "destructive"
      });
      return false;
    }

    if (formData.new_password && !formData.current_password) {
      toast({
        title: "Error",
        description: "Current password is required to set new password",
        variant: "destructive"
      });
      return false;
    }

    if (formData.new_password && formData.new_password !== formData.confirm_password) {
      toast({
        title: "Error",
        description: "New password and confirm password do not match",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const updateData: any = {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone_number
      };

      // Only include password fields if user wants to change password
      if (formData.new_password) {
        updateData.current_password = formData.current_password;
        updateData.new_password = formData.new_password;
      }

      await updateProfile(updateData);
      
      // Refresh profile data
      await getProfile();
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      if (onCancel) onCancel();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[524px]">
      <h1 className="text-[32px] font-extrabold text-[#0A0D12] mb-6 font-nunito">Update Profile</h1>
      
      <Card className="rounded-2xl shadow-[0px_0px_20px_0px_rgba(203,202,202,0.25)]">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className="w-full"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                className="w-full"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone_number}
                onChange={(e) => handleInputChange('phone_number', e.target.value)}
                placeholder="Enter your phone number"
                className="w-full"
              />
            </div>

            {/* Password Change Section */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold text-[#0A0D12]">Change Password (Optional)</h3>
              
              {/* Current Password */}
              <div className="space-y-2">
                <Label htmlFor="current_password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current_password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={formData.current_password}
                    onChange={(e) => handleInputChange('current_password', e.target.value)}
                    placeholder="Enter current password"
                    className="w-full pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="new_password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new_password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={formData.new_password}
                    onChange={(e) => handleInputChange('new_password', e.target.value)}
                    placeholder="Enter new password"
                    className="w-full pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-2">
                <Label htmlFor="confirm_password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm_password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirm_password}
                    onChange={(e) => handleInputChange('confirm_password', e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#C12116] hover:bg-[#A11015] text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Profile'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
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
                <span className="text-base font-medium text-[#0A0D12]">Phone Number</span>
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
  const { user, logout, isLoading } = useAuthStore();
  const [, setLocation] = useLocation();
  const [isEditMode, setIsEditMode] = useState(false);

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
    setIsEditMode(true);
  };

  const handleCancelUpdate = () => {
    setIsEditMode(false);
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
            {isEditMode ? (
              <UpdateProfileCard
                isLoading={isLoading}
                onCancel={handleCancelUpdate}
              />
            ) : (
              <ProfileCard
                userName={user?.name || 'Johndoe'}
                userEmail={user?.email || 'johndoe@email.com'}
                userPhone={user?.phone_number || '081234567890'}
                userAvatar="/figmaAssets/user-avatar.png"
                onUpdateProfile={handleUpdateProfile}
              />
            )}
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
