import React from "react";

interface SocialMediaIconProps {
  icon: React.ReactNode;
  href?: string;
  ariaLabel?: string;
}

export const SocialMediaIcon = ({ 
  icon, 
  href = "#", 
  ariaLabel 
}: SocialMediaIconProps) => (
  <a 
    href={href}
    className="w-10 h-10 rounded-full border border-[#252b37] flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
    aria-label={ariaLabel}
  >
    {icon}
  </a>
);
