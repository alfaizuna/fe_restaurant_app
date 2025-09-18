import React from 'react';
import { Header } from '@/components/Header';
import { FooterSection } from '@/components/FooterSection';
import { useLocation } from 'wouter';

interface PaymentSuccessData {
  date: string;
  paymentMethod: string;
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
}

export const PaymentSuccess: React.FC = () => {
  const [, setLocation] = useLocation();

  // Get checkout data from sessionStorage
  const getPaymentData = (): PaymentSuccessData => {
    const storedData = sessionStorage.getItem('checkoutData');
    if (storedData) {
      const data = JSON.parse(storedData);
      return {
        date: new Date(data.date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        paymentMethod: getPaymentMethodName(data.paymentMethod),
        itemCount: data.itemCount,
        subtotal: data.subtotal,
        deliveryFee: data.deliveryFee,
        serviceFee: data.serviceFee,
        total: data.total,
      };
    }
    
    // Fallback data if no checkout data found
    return {
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      paymentMethod: 'Bank Rakyat Indonesia',
      itemCount: 2,
      subtotal: 100000,
      deliveryFee: 10000,
      serviceFee: 1000,
      total: 111000,
    };
  };

  const getPaymentMethodName = (method: string): string => {
    const methodNames: Record<string, string> = {
      'BNI': 'Bank Negara Indonesia',
      'BRI': 'Bank Rakyat Indonesia',
      'BCA': 'Bank Central Asia',
      'Mandiri': 'Mandiri',
    };
    return methodNames[method] || method;
  };

  const paymentData = getPaymentData();

  const handleSeeMyOrders = () => {
    // Navigate to orders page (you can implement this route later)
    setLocation('/orders');
  };

  const formatCurrency = (amount: number) => {
    return `Rp${amount.toLocaleString('id-ID')}`;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 lg:py-16">
        <div className="w-full max-w-[428px]">
          {/* Logo Section */}
          <div className="flex items-center justify-center gap-3 lg:gap-4 mb-6 lg:mb-7">
            <img 
              src="/figmaAssets/logo.png" 
              alt="Foody" 
              className="w-8 h-8 lg:w-[42px] lg:h-[42px]"
            />
            <h1 className="text-2xl lg:text-[32px] font-extrabold text-[#0A0D12]">
              Foody
            </h1>
          </div>

          {/* Success Card */}
          <div className="bg-white p-4 lg:p-5 rounded-2xl shadow-[0px_0px_20px_0px_rgba(203,202,202,0.25)] relative">
            {/* Decorative Circles - Only show on desktop */}
            <div className="hidden lg:block absolute -left-[9px] top-[158px]">
              <div className="flex gap-[405px]">
                <div className="w-5 h-5 bg-[#F5F5F5] rounded-full"></div>
                <div className="w-5 h-5 bg-[#F5F5F5] rounded-full"></div>
              </div>
            </div>
            
            <div className="hidden lg:block absolute -left-[9px] top-[404px]">
              <div className="flex gap-[405px]">
                <div className="w-5 h-5 bg-[#F5F5F5] rounded-full"></div>
                <div className="w-5 h-5 bg-[#F5F5F5] rounded-full"></div>
              </div>
            </div>

            {/* Header Section */}
            <div className="flex flex-col items-center gap-[2px] mb-4">
              <div className="w-12 h-12 lg:w-16 lg:h-16 mb-1 lg:mb-2">
                <img 
                  src="/figmaAssets/check-success-icon.svg" 
                  alt="Success" 
                  className="w-full h-full"
                />
              </div>
              <h2 className="text-lg lg:text-xl font-extrabold text-[#0A0D12] text-center leading-[1.7]">
                Payment Success
              </h2>
              <p className="text-sm lg:text-base font-normal text-[#0A0D12] text-center leading-[1.875] tracking-[-0.02em]">
                Your payment has been successfully processed.
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-0 border-t border-dashed border-[#D5D7DA] mb-4"></div>

            {/* Payment Details */}
            <div className="space-y-3 lg:space-y-4 mb-4">
              {/* Date */}
              <div className="flex justify-between items-center">
                <span className="text-sm lg:text-base font-medium text-[#0A0D12] leading-[1.875] tracking-[-0.03em]">
                  Date
                </span>
                <span className="text-sm lg:text-base font-bold text-[#0A0D12] leading-[1.875] tracking-[-0.02em] text-right">
                  {paymentData.date}
                </span>
              </div>

              {/* Payment Method */}
              <div className="flex justify-between items-center">
                <span className="text-sm lg:text-base font-medium text-[#0A0D12] leading-[1.875] tracking-[-0.03em]">
                  Payment Method
                </span>
                <span className="text-sm lg:text-base font-bold text-[#0A0D12] leading-[1.875] tracking-[-0.02em] text-right">
                  {paymentData.paymentMethod}
                </span>
              </div>

              {/* Price */}
              <div className="flex justify-between items-center">
                <span className="text-sm lg:text-base font-medium text-[#0A0D12] leading-[1.875] tracking-[-0.03em]">
                  Price ({paymentData.itemCount} items)
                </span>
                <span className="text-sm lg:text-base font-bold text-[#0A0D12] leading-[1.875] tracking-[-0.02em]">
                  {formatCurrency(paymentData.subtotal)}
                </span>
              </div>

              {/* Delivery Fee */}
              <div className="flex justify-between items-center">
                <span className="text-sm lg:text-base font-medium text-[#0A0D12] leading-[1.875] tracking-[-0.03em]">
                  Delivery Fee
                </span>
                <span className="text-sm lg:text-base font-bold text-[#0A0D12] leading-[1.875] tracking-[-0.02em]">
                  {formatCurrency(paymentData.deliveryFee)}
                </span>
              </div>

              {/* Service Fee */}
              <div className="flex justify-between items-center">
                <span className="text-sm lg:text-base font-medium text-[#0A0D12] leading-[1.875] tracking-[-0.03em]">
                  Service Fee
                </span>
                <span className="text-sm lg:text-base font-bold text-[#0A0D12] leading-[1.875] tracking-[-0.02em]">
                  {formatCurrency(paymentData.serviceFee)}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-0 border-t border-dashed border-[#D5D7DA] mb-4"></div>

            {/* Total */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-base lg:text-lg font-normal text-[#0A0D12] leading-[1.778]">
                Total
              </span>
              <span className="text-base lg:text-lg font-extrabold text-[#0A0D12] leading-[1.778] tracking-[-0.02em]">
                {formatCurrency(paymentData.total)}
              </span>
            </div>

            {/* See My Orders Button */}
            <button 
              onClick={handleSeeMyOrders}
              className="w-full bg-[#C12116] text-white text-sm lg:text-base font-bold py-2 px-2 rounded-full hover:bg-[#A01015] transition-colors flex items-center justify-center gap-2 min-h-[36px] lg:min-h-[40px]"
            >
              See My Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
