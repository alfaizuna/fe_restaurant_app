import React from 'react';

interface OrderCardProps {
  restaurantName: string;
  restaurantLogo: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total: number;
  status: 'done' | 'preparing' | 'onTheWay' | 'delivered' | 'canceled';
  onGiveReview?: (restaurantName: string) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  restaurantName,
  restaurantLogo,
  items,
  total,
  status,
  onGiveReview
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price).replace('IDR', 'Rp');
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0px_0px_20px_0px_rgba(203,202,202,0.25)] p-4 lg:p-5 w-full">
      {/* Restaurant Header */}
      <div className="flex items-center gap-3 lg:gap-4 mb-4">
        <img
          src={restaurantLogo}
          alt={restaurantName}
          className="w-6 h-6 lg:w-8 lg:h-8 rounded object-cover"
        />
        <h3 className="text-base lg:text-lg font-bold text-[#0A0D12]">{restaurantName}</h3>
      </div>

      {/* Order Items */}
      <div className="space-y-3 lg:space-y-4 mb-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3 lg:gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm lg:text-base font-medium text-[#0A0D12] mb-1 truncate">{item.name}</h4>
              <p className="text-sm lg:text-base font-extrabold text-[#0A0D12]">
                {item.quantity} x {formatPrice(item.price)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-[#D5D7DA] my-4" />

      {/* Footer with Total and Button */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col">
          <span className="text-sm lg:text-base font-medium text-[#0A0D12]">Total</span>
          <span className="text-lg lg:text-xl font-extrabold text-[#0A0D12]">{formatPrice(total)}</span>
        </div>
        <button 
          onClick={() => onGiveReview?.(restaurantName)}
          className="bg-[#C12116] text-white px-6 py-3 lg:py-2 rounded-full font-bold hover:bg-[#A01015] transition-colors w-full lg:w-auto lg:min-w-[240px] lg:h-12"
        >
          Give Review
        </button>
      </div>
    </div>
  );
};
