"use client";

import React from "react";
import { Button } from "../ui/button";

const partnerCategories = [
  {
    name: "Blockchain Networks",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="5" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="19" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 7.5V12M12 12L6.5 17M12 12L17.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: "Wallets",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 10H22" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="17" cy="15" r="1.5" fill="currentColor"/>
        <path d="M6 6V5C6 3.895 6.895 3 8 3H16C17.105 3 18 3.895 18 5V6" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: "Exchanges",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 8H17L14 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 16H7L10 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3"/>
      </svg>
    ),
  },
  {
    name: "Infrastructure",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="15" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="6.5" cy="6" r="1" fill="currentColor"/>
        <circle cx="6.5" cy="18" r="1" fill="currentColor"/>
        <path d="M12 9V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    name: "Universities",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L2 9L12 15L22 9L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M6 11.5V17.5L12 21L18 17.5V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 9V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Accelerators",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 2 13.5 5 13.5 9C13.5 13 12 16 12 16C12 16 10.5 13 10.5 9C10.5 5 12 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 16L8 20H10V22H14V20H16L12 16Z" fill="currentColor"/>
        <path d="M8 11C6 12 5 14 5 14L9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 11C18 12 19 14 19 14L15 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const generateLogos = () => {
  const brands = [
    { name: "TON Foundation", color: "text-white", icon: (
      <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM7.902 6.697h8.196c1.505 0 2.462 1.628 1.705 2.94l-5.059 8.765a.86.86 0 0 1-1.488 0L6.199 9.637c-.758-1.314.197-2.94 1.703-2.94zm4.844 1.496v7.58l1.102-2.128 2.656-4.756a.465.465 0 0 0-.408-.696h-3.35zM7.9 8.195a.464.464 0 0 0-.408.694l2.658 4.754 1.102 2.13V8.195H7.9z" fill="#0098EA"/>
      </svg>
    )},
    { name: "Telegram", color: "text-white", icon: (
      <img src="/telegram_logo.png" className="w-6 h-6 mr-3 object-contain rounded" alt="Telegram" />
    )},
    { name: "Bitget Exchange", color: "text-white", icon: (
      <img src="/bitget_logo.png" className="w-6 h-6 mr-3 object-contain rounded" alt="Bitget" />
    )},
    { name: "CNGN", color: "text-white", icon: (
      <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L21 7V10H18V8.5L12 5L6 8.5V10H3V7L12 2Z" fill="#5A2DCC"/>
        <path d="M12 22L3 17V14H6V15.5L12 19L18 15.5V14H21V17L12 22Z" fill="#5A2DCC"/>
        <rect x="3" y="11" width="3" height="2" fill="#5A2DCC"/>
        <rect x="18" y="11" width="3" height="2" fill="#5A2DCC"/>
        <path d="M8 6V18L16 6V18" stroke="#5A2DCC" strokeWidth="3" strokeLinejoin="miter"/>
      </svg>
    )}
  ];

  return brands.concat(brands).map((brand, i) => (
    <div key={i} className="flex-shrink-0 w-56 h-14 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-center text-white/50 font-bold text-xs mx-4 transition-all hover:bg-white/[0.04] hover:border-white/10 cursor-pointer group">
      <span className="transition-transform group-hover:scale-110">{brand.icon}</span>
      <span className="text-white/80 font-semibold tracking-wide text-sm">{brand.name}</span>
    </div>
  ));
};

export function PartnersSection() {
  return (
    <section id="partners" className="py-24 relative overflow-hidden bg-white/5 border-y border-white/10">
      <div className="container mx-auto px-4 md:px-6 mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Trusted by the Best</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {partnerCategories.map((category) => (
            <span key={category.name} className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 border border-white/10 rounded-full text-sm text-white/70">
              {category.icon}
              {category.name}
            </span>
          ))}
        </div>
      </div>

      {/* Marquee Animation */}
      <div className="relative flex overflow-x-hidden group mb-16">
        <div className="py-4 animate-marquee whitespace-nowrap flex items-center">
          {generateLogos()}
        </div>
        <div className="absolute top-0 py-4 animate-marquee2 whitespace-nowrap flex items-center">
          {generateLogos()}
        </div>
      </div>

      <div className="text-center">
        <Button variant="outline" size="lg">Become a Partner</Button>
      </div>
    </section>
  );
}
