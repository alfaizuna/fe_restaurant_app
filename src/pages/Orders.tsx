import React, { useState } from 'react';
import { Header, FooterSection, Sidebar, MobileSidebar, SearchBar, OrderStatusFilter, OrderCard } from '@/components';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for orders
const mockOrders = [
  {
    id: '1',
    restaurantName: 'Burger King',
    restaurantLogo: '/figmaAssets/restaurant-logo.png',
    items: [
      {
        name: 'Whopper Burger',
        quantity: 2,
        price: 50000,
        image: '/figmaAssets/menu-item-1.png'
      }
    ],
    total: 100000,
    status: 'done' as const,
    date: '2024-01-15'
  },
  {
    id: '2',
    restaurantName: 'Burger King',
    restaurantLogo: '/figmaAssets/restaurant-logo.png',
    items: [
      {
        name: 'Classic Burger',
        quantity: 1,
        price: 45000,
        image: '/figmaAssets/menu-item-2.png'
      },
      {
        name: 'French Fries',
        quantity: 2,
        price: 25000,
        image: '/figmaAssets/menu-item-3.png'
      }
    ],
    total: 95000,
    status: 'done' as const,
    date: '2024-01-14'
  }
];

export const Orders: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [activeStatus, setActiveStatus] = useState('done');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  // Filter orders based on search and status
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.restaurantName.toLowerCase().includes(searchValue.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
    const matchesStatus = order.status === activeStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Header */}
      <Header isMobile={isMobile} />
      
      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 px-4 py-8 lg:px-[120px] lg:py-32">
        <div className="max-w-[1200px] mx-auto">
          <div className={`flex gap-8 ${isMobile ? 'flex-col' : 'flex-row'}`}>
            {/* Sidebar - Only show on desktop */}
            {!isMobile && (
              <div className="flex-shrink-0">
                <Sidebar />
              </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 space-y-6">
              {/* Mobile Menu Button & Page Title */}
              <div className="flex items-center justify-between">
                <h1 className="text-2xl lg:text-[32px] font-extrabold text-[#0A0D12]">My Orders</h1>
                {isMobile && (
                  <button
                    onClick={() => setIsMobileSidebarOpen(true)}
                    className="p-2 text-[#0A0D12] hover:text-[#C12116] transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Search and Filters Container */}
              <div className="bg-white rounded-2xl p-6 space-y-5">
                {/* Search Bar */}
                <SearchBar
                  value={searchValue}
                  onChange={setSearchValue}
                  placeholder="Search"
                />

                {/* Status Filter */}
                <OrderStatusFilter
                  activeStatus={activeStatus}
                  onStatusChange={setActiveStatus}
                />

                {/* Orders List */}
                <div className="space-y-5">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <OrderCard
                        key={order.id}
                        restaurantName={order.restaurantName}
                        restaurantLogo={order.restaurantLogo}
                        items={order.items}
                        total={order.total}
                        status={order.status}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-500 mb-4">
                        <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                      <p className="text-gray-500">
                        {searchValue 
                          ? `No orders match your search "${searchValue}"` 
                          : `No orders with status "${activeStatus}" found`
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
