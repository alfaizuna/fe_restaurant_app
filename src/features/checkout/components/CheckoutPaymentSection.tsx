import React from 'react';
import { RadioGroup, RadioGroupItem, Label } from '@/shared/ui';

interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
}

const paymentMethods: PaymentMethod[] = [
  { id: 'BNI', name: 'Bank Negara Indonesia', logo: '/figmaAssets/bank-bni.svg' },
  { id: 'BRI', name: 'Bank Rakyat Indonesia', logo: '/figmaAssets/bank-bri.svg' },
  { id: 'BCA', name: 'Bank Central Asia', logo: '/figmaAssets/bank-bca.svg' },
  { id: 'Mandiri', name: 'Mandiri', logo: '/figmaAssets/bank-mandiri.svg' },
];

interface CheckoutPaymentSectionProps {
  selectedPaymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  onBuy: () => void;
}

export const CheckoutPaymentSection: React.FC<CheckoutPaymentSectionProps> = ({
  selectedPaymentMethod,
  onPaymentMethodChange,
  itemCount,
  subtotal,
  deliveryFee,
  serviceFee,
  total,
  onBuy
}) => {
  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-[0px_0px_20px_0px_rgba(203,202,202,0.25)] p-4 lg:py-5 lg:px-0">
        {/* Payment Method Section */}
        <div className="px-0 lg:px-5 mb-4">
          <h3 className="text-base lg:text-lg font-extrabold text-[#0A0D12] mb-3 lg:mb-4">
            Payment Method
          </h3>
          
          <RadioGroup 
            value={selectedPaymentMethod} 
            onValueChange={onPaymentMethodChange}
            className="space-y-0"
          >
            {paymentMethods.map((method, index) => (
              <React.Fragment key={method.id}>
                <div className="flex items-center justify-center gap-2 py-3 lg:py-4">
                  <img 
                    src={method.logo} 
                    alt={method.name}
                    className="w-10 h-10 rounded-lg border border-[#D5D7DA]"
                  />
                  <Label 
                    htmlFor={method.id}
                    className="flex-1 text-sm lg:text-base font-normal text-[#0A0D12] text-center cursor-pointer"
                  >
                    {method.name}
                  </Label>
                  <RadioGroupItem 
                    value={method.id} 
                    id={method.id}
                    className="w-6 h-6 border-2 data-[state=checked]:bg-[#C12116] data-[state=checked]:border-[#C12116]"
                  />
                </div>
                {index < paymentMethods.length - 1 && (
                  <hr className="border-[#E9EAEB]" />
                )}
              </React.Fragment>
            ))}
          </RadioGroup>
        </div>

        {/* Divider */}
        <hr className="border-[#D5D7DA] border-dashed mx-0 lg:mx-5 mb-4" />

        {/* Payment Summary */}
        <div className="px-0 lg:px-5">
          <h3 className="text-base lg:text-lg font-extrabold text-[#0A0D12] mb-3 lg:mb-4">
            Payment Summary
          </h3>
          
          <div className="space-y-3 lg:space-y-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm lg:text-base font-medium text-[#0A0D12]">
                Price ({itemCount} items)
              </span>
              <span className="text-sm lg:text-base font-bold text-[#0A0D12]">
                Rp{subtotal.toLocaleString('id-ID')}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm lg:text-base font-medium text-[#0A0D12]">
                Delivery Fee
              </span>
              <span className="text-sm lg:text-base font-bold text-[#0A0D12]">
                Rp{deliveryFee.toLocaleString('id-ID')}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm lg:text-base font-medium text-[#0A0D12]">
                Service Fee
              </span>
              <span className="text-sm lg:text-base font-bold text-[#0A0D12]">
                Rp{serviceFee.toLocaleString('id-ID')}
              </span>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-base lg:text-lg font-normal text-[#0A0D12]">
                Total
              </span>
              <span className="text-base lg:text-lg font-extrabold text-[#0A0D12]">
                Rp{total.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
          
          <button 
            onClick={onBuy}
            className="w-full bg-[#C12116] hover:bg-[#A01015] text-white font-bold text-base py-2 px-2 rounded-full transition-colors"
          >
            Buy
          </button>
        </div>
      </div>

      {/* Decorative circles - positioned based on the section height */}
      <div className="absolute -left-2.5 top-[296px] w-5 h-5 bg-[#F5F5F5] rounded-full hidden lg:block"></div>
      <div className="absolute -right-2.5 top-[296px] w-5 h-5 bg-[#F5F5F5] rounded-full hidden lg:block"></div>
    </div>
  );
};
