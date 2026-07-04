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

// Placeholder logos using colored blocks for now
const generateLogos = (count: number) => {
  return Array.from({ length: count }).map((_, i) => (
    <div key={i} className="flex-shrink-0 w-40 h-16 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white/30 font-bold text-lg mx-4 grayscale hover:grayscale-0 transition-all hover:bg-white/10 cursor-pointer">
      PARTNER {i + 1}
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
          {generateLogos(8)}
        </div>
        <div className="absolute top-0 py-4 animate-marquee2 whitespace-nowrap flex items-center">
          {generateLogos(8)}
        </div>
      </div>

      <div className="text-center">
        <Button variant="outline" size="lg">Become a Partner</Button>
      </div>
    </section>
  );
}
