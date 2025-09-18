import React from "react";

interface CategoryCardProps {
  icon: string;
  label: string;
  testId: string;
  isMobile?: boolean;
  onClick?: () => void;
}

export const CategoryCard = ({ 
  icon, 
  label, 
  testId, 
  isMobile = false, 
  onClick 
}: CategoryCardProps) => (
  <div 
    className="flex flex-col items-center text-center cursor-pointer hover:opacity-80 transition-opacity" 
    data-testid={testId}
    onClick={onClick}
  >
    <div className={`${
      isMobile 
        ? 'w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-1 shadow-md' 
        : 'w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm'
    }`}>
      <img 
        src={icon} 
        alt={label} 
        className="w-12 h-12 object-contain"
      />
    </div>
    <span className="text-sm font-bold text-[#0a0d12] text-center">{label}</span>
  </div>
);
