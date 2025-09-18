import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { FooterSection } from '@/components/FooterSection';
import { useCartStore } from '@/shared/store';
import { CheckoutDeliveryAddress } from '../features/checkout/components/CheckoutDeliveryAddress';
import { CheckoutCartSection } from '../features/checkout/components/CheckoutCartSection';
import { CheckoutPaymentSection } from '../features/checkout/components/CheckoutPaymentSection';
import { useLocation } from 'wouter';

export const Checkout: React.FC = () => {
  const { cart, addItem, clearCart } = useCartStore();
  const [, setLocation] = useLocation();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('BNI');
  const [deliveryAddress, setDeliveryAddress] = useState({
    address: 'Jl. Sudirman No. 25, Jakarta Pusat, 10220',
    phone: '0812-3456-7890'
  });

  const deliveryFee = 10000;
  const serviceFee = 1000;
  const totalWithFees = cart.totalAmount + deliveryFee + serviceFee;

  // Add dummy data if cart is empty
  const addDummyData = () => {
    // Sample menu items
    const dummyItems = [
      {
        id: 'item-1',
        restaurantId: 'rest-1',
        name: 'Nasi Gudeg Yogya',
        description: 'Traditional Yogyakarta jackfruit curry with rice',
        price: 25000,
        imageUrl: '/figmaAssets/menu-item-1.png',
        category: 'Indonesian',
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'item-2', 
        restaurantId: 'rest-1',
        name: 'Ayam Geprek',
        description: 'Fried chicken with spicy sambal',
        price: 18000,
        imageUrl: '/figmaAssets/menu-item-2.png',
        category: 'Indonesian',
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'item-3',
        restaurantId: 'rest-2', 
        name: 'Sate Ayam',
        description: 'Grilled chicken skewers with peanut sauce',
        price: 22000,
        imageUrl: '/figmaAssets/menu-item-3.png',
        category: 'Indonesian',
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // Add items to different restaurants
    addItem(dummyItems[0], 'Warung Gudeg Mbah Lindu', '/figmaAssets/restaurant-logo.png');
    addItem(dummyItems[1], 'Warung Gudeg Mbah Lindu', '/figmaAssets/restaurant-logo.png');
    addItem(dummyItems[2], 'Sate Khas Madura', '/figmaAssets/restaurant-logo-cart.png');
  };

  // Load dummy data on component mount if cart is empty
  useEffect(() => {
    if (cart.itemCount === 0) {
      addDummyData();
    }
  }, []);

  const handleBuy = () => {
    // Store checkout data in sessionStorage for the success page
    const checkoutData = {
      paymentMethod: selectedPaymentMethod,
      itemCount: cart.itemCount,
      subtotal: cart.totalAmount,
      deliveryFee: deliveryFee,
      serviceFee: serviceFee,
      total: totalWithFees,
      date: new Date().toISOString(),
    };
    
    sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    
    // Clear the cart after successful checkout
    clearCart();
    
    // Navigate to success page
    setLocation('/payment-success');
  };

  if (cart.itemCount === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#0A0D12] mb-4">Your cart is empty</h2>
            <p className="text-[#0A0D12] mb-8">Add some items to your cart before checkout</p>
            <a 
              href="/" 
              className="inline-block bg-[#C12116] text-white px-8 py-3 rounded-full font-bold hover:bg-[#A01015] transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        </div>
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
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Header />
      <div className="flex-1 w-full max-w-[1000px] mx-auto px-4 lg:px-0 py-8 lg:py-16">
        <div className="flex items-center justify-between mb-8 lg:mb-12">
          <div className="flex items-center gap-3 lg:gap-4">
            <h1 className="text-2xl lg:text-4xl font-extrabold text-[#0A0D12]">
              Checkout
            </h1>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left Column - Address and Cart */}
          <div className="flex flex-col gap-5 flex-1">
            <CheckoutDeliveryAddress 
              address={deliveryAddress}
              onChangeAddress={setDeliveryAddress}
            />
            <CheckoutCartSection />
          </div>
          
          {/* Right Column - Payment */}
          <div className="lg:w-[390px]">
            <CheckoutPaymentSection
              selectedPaymentMethod={selectedPaymentMethod}
              onPaymentMethodChange={setSelectedPaymentMethod}
              itemCount={cart.itemCount}
              subtotal={cart.totalAmount}
              deliveryFee={deliveryFee}
              serviceFee={serviceFee}
              total={totalWithFees}
              onBuy={handleBuy}
            />
          </div>
        </div>
      </div>
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
