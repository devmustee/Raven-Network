"use client";

import React from "react";
import { Button } from "../ui/button";

const partnerCategories = [
  "Blockchain Networks",
  "Wallets",
  "Exchanges",
  "Infrastructure",
  "Universities",
  "Accelerators"
];

const generateLogos = () => {
  const brands = [
    { name: "TON Foundation", color: "text-accent-blue", icon: (
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M6 3h12l4 6-10 12L2 9z" />
      </svg>
    )},
    { name: "AssetChain", color: "text-accent-cyan", icon: (
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    )},
    { name: "Flock Network", color: "text-accent-purple", icon: (
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    )},
    { name: "Tonkeeper", color: "text-sky-400", icon: (
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
      </svg>
    )},
    { name: "MetaMask", color: "text-orange-500", icon: (
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
      </svg>
    )},
    { name: "Raven Academy", color: "text-white", icon: (
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
      </svg>
    )}
  ];

  return brands.concat(brands).map((brand, i) => (
    <div key={i} className="flex-shrink-0 w-48 h-14 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-center text-white/50 font-bold text-xs mx-4 transition-all hover:bg-white/[0.04] hover:border-white/10 cursor-pointer group">
      <span className={`${brand.color} transition-transform group-hover:scale-110`}>{brand.icon}</span>
      <span className="text-white/70 font-semibold tracking-wide">{brand.name}</span>
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
            <span key={category} className="px-4 py-2 bg-black/50 border border-white/10 rounded-full text-sm text-white/70">
              {category}
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
