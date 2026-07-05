"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

const stats = [
  { label: "Members", value: "10,000+" },
  { label: "Opportunities", value: "500+" },
  { label: "Partners", value: "50+" },
  { label: "Reputation Points", value: "1M+" },
  { label: "Countries", value: "20+" },
];

interface HeroSectionProps {
  walletAddress: string | null;
  setIsConnectModalOpen: (open: boolean) => void;
}

export function HeroSection({ walletAddress, setIsConnectModalOpen }: HeroSectionProps) {
  return (
    <section className="relative pt-20 pb-12 md:pt-28 md:pb-20 overflow-hidden">
      {/* Background glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-purple/10 rounded-full blur-[120px] opacity-40 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight drop-shadow-[0_2px_8px_rgba(0,240,255,0.1)]">
              Building Africa's Largest <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan">
                Web3 Contributor Network.
              </span>
            </h1>
            <p className="text-sm md:text-base text-white/60 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {"Raven Network connects millions of builders to education, on-chain reputation, and global earning opportunities."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-12">
              {walletAddress ? (
                <Link href="#dashboard" className="w-full sm:w-auto">
                  <Button variant="primary" size="md" className="w-full shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all hover:scale-105 duration-300">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Button 
                  variant="primary" 
                  size="md" 
                  className="w-full sm:w-auto shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all hover:scale-105 duration-300"
                  onClick={() => setIsConnectModalOpen(true)}
                >
                  Join Now
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-8 border-t border-white/10 mt-2 max-w-2xl lg:max-w-3xl">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + (i * 0.05) }}
                  className="flex flex-col justify-between p-2.5 sm:p-4 rounded-xl bg-white/[0.01] border border-white/5 backdrop-blur-sm hover:border-white/10 transition-all hover:bg-white/[0.03] group"
                >
                  <span className="text-xl sm:text-2xl font-black text-white font-mono tracking-tighter whitespace-nowrap group-hover:text-accent-cyan transition-colors">
                    {stat.value}
                  </span>
                  <span className="text-[7.5px] md:text-[8.5px] text-white/40 uppercase tracking-wider font-extrabold mt-1">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Premium Static Graphic Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative h-[380px] md:h-[450px] flex items-center justify-center"
          >
            {/* Ambient background glow ring */}
            <div className="absolute w-[320px] h-[320px] bg-accent-cyan/10 rounded-full blur-[90px] opacity-60 pointer-events-none animate-pulse-slow" />
            <div className="absolute w-[280px] h-[280px] bg-accent-purple/10 rounded-full blur-[80px] opacity-60 pointer-events-none animate-pulse-slow delay-1000" />

            <div className="relative w-full max-w-[340px] md:max-w-[420px] aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.15)] flex items-center justify-center bg-black/60 backdrop-blur-lg p-3 group">
              
              {/* Corner Cyber Brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-accent-cyan opacity-80 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-accent-cyan opacity-80 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-accent-cyan opacity-80 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-accent-cyan opacity-80 group-hover:scale-110 transition-transform duration-300" />

              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img 
                  src="/ravens-unity.png" 
                  alt="Raven Network Unity" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
