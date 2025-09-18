import React from 'react';
import { useCartStore } from '@/shared/store';

export const CheckoutCartSection: React.FC = () => {
  const { cart, updateQuantity } = useCartStore();

  const handleQuantityChange = (itemId: string, restaurantId: string, newQuantity: number) => {
    updateQuantity(itemId, restaurantId, newQuantity);
  };

  return (
    <div className="bg-white p-4 lg:p-5 rounded-2xl shadow-[0px_0px_20px_0px_rgba(203,202,202,0.25)]">
      {cart.restaurants.map((restaurant) => (
        <div key={restaurant.restaurantId} className="mb-6 last:mb-0">
          {/* Restaurant Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-5 mb-5">
            <div className="flex items-center gap-1 lg:gap-2">
              <img 
                src={restaurant.restaurantLogo || "/figmaAssets/restaurant-logo-cart.png"} 
                alt="Restaurant" 
                className="w-8 h-8 lg:w-12 lg:h-12 rounded"
              />
              <h3 className="text-base lg:text-lg font-bold text-[#0A0D12]">
                {restaurant.restaurantName}
              </h3>
            </div>
            
            <button className="self-start lg:self-auto w-auto lg:w-[120px] h-9 lg:h-10 bg-white border border-[#D5D7DA] rounded-full flex items-center justify-center px-4 lg:px-2 hover:bg-gray-50 transition-colors">
              <span className="text-sm lg:text-base font-bold text-[#0A0D12]">
                Add item
              </span>
            </button>
          </div>

          {/* Cart Items */}
          <div className="space-y-3 lg:space-y-5">
            {restaurant.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 lg:gap-[17px]">
                  <img 
                    src={item.menuItem.imageUrl || "/figmaAssets/menu-item-cart.png"} 
                    alt={item.menuItem.name}
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm lg:text-base font-medium text-[#0A0D12]">
                      {item.menuItem.name}
                    </span>
                    <span className="text-base lg:text-lg font-extrabold text-[#0A0D12]">
                      Rp{item.menuItem.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center lg:py-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleQuantityChange(item.id, restaurant.restaurantId, item.quantity - 1)}
                      className="w-8 h-8 lg:w-9 lg:h-9 rounded-full border border-[#D5D7DA] flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <img src="/figmaAssets/minus-icon.svg" alt="Decrease" className="w-4 h-4" />
                    </button>
                    
                    <span className="text-base lg:text-lg font-semibold text-[#0A0D12] min-w-[24px] text-center">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => handleQuantityChange(item.id, restaurant.restaurantId, item.quantity + 1)}
                      className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-[#C12116] hover:bg-[#A01015] flex items-center justify-center transition-colors"
                    >
                      <img src="/figmaAssets/add-icon.svg" alt="Increase" className="w-4 h-4 filter brightness-0 invert" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
