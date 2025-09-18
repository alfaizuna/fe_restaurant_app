import React from 'react';
import { Header } from '@/components/Header';
import { FooterSection } from '@/components/FooterSection';
import { useLocation } from 'wouter';

export const Orders: React.FC = () => {
  const [, setLocation] = useLocation();

  const handleBackToHome = () => {
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 lg:py-16">
        <div className="w-full max-w-lg text-center">
          <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-[0px_0px_20px_0px_rgba(203,202,202,0.25)]">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0A0D12] mb-4">
              My Orders
            </h1>
            <p className="text-base lg:text-lg text-[#0A0D12] mb-6">
              This is where your order history will be displayed.
            </p>
            <p className="text-sm lg:text-base text-gray-600 mb-8">
              Feature coming soon! For now, you can return to the homepage to continue shopping.
            </p>
            
            <button 
              onClick={handleBackToHome}
              className="w-full bg-[#C12116] text-white font-bold text-base py-3 px-4 rounded-full hover:bg-[#A01015] transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#0A0D12] py-10 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-[120px]">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-[69px]">
            {/* Brand Section */}
            <div className="flex flex-col gap-4 lg:gap-10 lg:w-[380px]">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <img src="/figmaAssets/logo-white.svg" alt="Foody" className="w-10 h-10 lg:w-[42px] lg:h-[42px]" />
                  <span className="text-2xl lg:text-[32px] font-extrabold text-white">Foody</span>
                </div>
                <p className="text-sm lg:text-base text-[#FDFDFD]">
                  Enjoy homemade flavors & chef's signature dishes, freshly prepared every day. 
                  Order online or visit our nearest branch.
                </p>
              </div>
              
              <div className="flex flex-col gap-5">
                <span className="text-sm lg:text-base font-extrabold text-[#FDFDFD]">Follow on Social Media</span>
                <div className="flex gap-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 border border-[#252B37] rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 bg-[#FDFDFD] rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 lg:flex-1">
              <FooterSection 
                title="Explore"
                links={[
                  { label: "All Food", href: "#" },
                  { label: "Nearby", href: "#" },
                  { label: "Discount", href: "#" },
                  { label: "Best Seller", href: "#" },
                  { label: "Delivery", href: "#" },
                  { label: "Lunch", href: "#" }
                ]}
                variant="desktop"
              />
              <FooterSection 
                title="Help"
                links={[
                  { label: "How to Order", href: "#" },
                  { label: "Payment Methods", href: "#" },
                  { label: "Track My Order", href: "#" },
                  { label: "FAQ", href: "#" },
                  { label: "Contact Us", href: "#" }
                ]}
                variant="desktop"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
