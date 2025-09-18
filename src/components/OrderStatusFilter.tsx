import React from 'react';

interface OrderStatusFilterProps {
  activeStatus: string;
  onStatusChange: (status: string) => void;
}

const statusOptions = [
  { id: 'preparing', label: 'Preparing', active: false },
  { id: 'onTheWay', label: 'On the Way', active: false },
  { id: 'delivered', label: 'Delivered', active: false },
  { id: 'done', label: 'Done', active: true },
  { id: 'canceled', label: 'Canceled', active: false },
];

export const OrderStatusFilter: React.FC<OrderStatusFilterProps> = ({
  activeStatus,
  onStatusChange
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
      <h3 className="text-base lg:text-lg font-bold text-[#0A0D12] flex-shrink-0">Status</h3>
      <div className="flex flex-wrap gap-2 lg:gap-3">
        {statusOptions.map((status) => (
          <button
            key={status.id}
            onClick={() => onStatusChange(status.id)}
            className={`px-3 py-2 lg:px-4 rounded-full border text-sm lg:text-base font-semibold transition-all ${
              activeStatus === status.id
                ? 'bg-[#FFECEC] border-[#C12116] text-[#C12116] font-bold'
                : 'bg-white border-[#D5D7DA] text-[#0A0D12] hover:border-[#C12116] hover:text-[#C12116]'
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
};
