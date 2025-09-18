import React from 'react';

interface DeliveryAddress {
  address: string;
  phone: string;
}

interface CheckoutDeliveryAddressProps {
  address: DeliveryAddress;
  onChangeAddress: (address: DeliveryAddress) => void;
}

export const CheckoutDeliveryAddress: React.FC<CheckoutDeliveryAddressProps> = ({
  address,
  onChangeAddress
}) => {
  return (
    <div className="bg-white p-4 lg:p-5 rounded-2xl shadow-[0px_0px_20px_0px_rgba(203,202,202,0.25)]">
      <div className="flex flex-col gap-1 lg:gap-4 mb-4 lg:mb-[21px]">
        <div className="flex items-center gap-2">
          <img 
            src="/figmaAssets/map.png" 
            alt="Location" 
            className="w-6 h-6 lg:w-8 lg:h-8"
          />
          <h3 className="text-base lg:text-lg font-extrabold text-[#0A0D12]">
            Delivery Address
          </h3>
        </div>
        <p className="text-sm lg:text-base font-medium text-[#0A0D12] leading-relaxed">
          {address.address}
        </p>
        <p className="text-sm lg:text-base font-medium text-[#0A0D12]">
          {address.phone}
        </p>
      </div>
      
      <button className="w-[120px] h-9 lg:h-10 bg-white border border-[#D5D7DA] rounded-full flex items-center justify-center px-2 hover:bg-gray-50 transition-colors">
        <span className="text-sm lg:text-base font-bold text-[#0A0D12]">
          Change
        </span>
      </button>
    </div>
  );
};
