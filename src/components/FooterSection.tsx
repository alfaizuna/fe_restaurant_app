import React from "react";

interface FooterLink {
  label: string;
  href?: string;
}

interface FooterSectionProps {
  title: string
  links: Array<{
    label: string
    href: string
  }>
  variant?: 'mobile' | 'desktop'
}

export const FooterSection = ({ 
  title, 
  links, 
  variant = 'mobile' 
}: FooterSectionProps) => {
  const isDesktop = variant === 'desktop';
  
  return (
    <div className={isDesktop ? "w-[200px]" : "flex-1"}>
      <div className={isDesktop ? "flex flex-col gap-5" : "space-y-4"}>
        <h3 className={`text-[#fdfdfd] font-extrabold ${
          isDesktop ? 'text-base leading-[30px] font-nunito' : 'text-sm'
        }`}>
          {title}
        </h3>
        <div className={isDesktop ? "flex flex-col gap-5" : "space-y-4"}>
          {links.map((link, index) => (
            <a 
              key={index}
              href={link.href || "#"} 
              className={`block text-[#fdfdfd] font-normal hover:text-[#c12116] transition-colors ${
                isDesktop ? 'text-base leading-[30px] font-nunito' : 'text-sm'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
