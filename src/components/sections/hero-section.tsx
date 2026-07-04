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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
              Building Africa's Largest <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan">
                Web3 Contributor Network.
              </span>
            </h1>
            <p className="text-sm md:text-base text-white/60 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Raven Network connects millions of builders to education, on-chain reputation, and global earning opportunities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-12">
              {walletAddress ? (
                <Link href="#dashboard" className="w-full sm:w-auto">
                  <Button variant="primary" size="md" className="w-full">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Button 
                  variant="primary" 
                  size="md" 
                  className="w-full sm:w-auto"
                  onClick={() => setIsConnectModalOpen(true)}
                >
                  Connect Wallet to Join
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-6 border-t border-white/5">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + (i * 0.05) }}
                  className="flex flex-col gap-0.5"
                >
                  <span className="text-lg md:text-xl font-bold text-white">{stat.value}</span>
                  <span className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest font-bold">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Premium True CSS 3D Orbiting Ecosystem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative h-[380px] md:h-[450px] flex items-center justify-center"
          >
            {/* 3D Viewport container */}
            <div className="relative w-full max-w-[320px] md:max-w-[380px] aspect-square flex items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
              
              {/* Outer soft glowing background */}
              <div className="absolute w-[200px] h-[200px] bg-accent-blue/15 rounded-full blur-[80px] opacity-75 pointer-events-none animate-pulse" />

              {/* Central Glowing Core */}
              <div className="absolute w-24 h-24 md:w-28 md:h-28 bg-gradient-to-tr from-accent-purple/30 to-accent-cyan/30 rounded-full blur-xl opacity-60 animate-pulse pointer-events-none" />
              <div className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 flex flex-col items-center justify-center z-20 glass shadow-[0_0_30px_rgba(147,51,234,0.15)] [transform:translateZ(10px)]">
                <img src="/logo.png" alt="Raven Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain mb-1 animate-bounce" />
                <span className="text-[10px] font-extrabold tracking-widest text-white/80 uppercase">RAVEN</span>
              </div>

              {/* Tilted Orbit Ring */}
              <div className="absolute inset-0 border border-white/5 rounded-full [transform:rotateX(65deg)_rotateY(-15deg)] pointer-events-none shadow-[0_0_20px_rgba(255,255,255,0.02)]" />
              
              {/* Secondary tilted ring for visual complexity */}
              <div className="absolute inset-4 border border-dashed border-white/5 rounded-full [transform:rotateX(-65deg)_rotateY(15deg)] pointer-events-none opacity-40" />

              {/* CSS 3D Orbiting Plane */}
              <div className="absolute inset-0 [transform-style:preserve-3d] [transform:rotateX(65deg)_rotateY(-15deg)] animate-[orbit_24s_linear_infinite]">
                
                {/* Node 1: Learning */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] [transform:rotateZ(0deg)_translateX(140px)] md:[transform:rotateZ(0deg)_translateX(170px)]">
                  <div className="px-3 py-1.5 md:px-4 md:py-2 bg-black/90 border border-accent-purple/40 rounded-xl glass shadow-lg text-[10px] md:text-xs font-semibold text-white whitespace-nowrap animate-[counter-orbit_24s_linear_infinite]">
                    📚 Learning
                  </div>
                </div>

                {/* Node 2: Reputation */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] [transform:rotateZ(90deg)_translateX(140px)] md:[transform:rotateZ(90deg)_translateX(170px)]">
                  <div className="px-3 py-1.5 md:px-4 md:py-2 bg-black/90 border border-accent-blue/40 rounded-xl glass shadow-lg text-[10px] md:text-xs font-semibold text-white whitespace-nowrap animate-[counter-orbit-offset-90_24s_linear_infinite]">
                    🛡️ Reputation
                  </div>
                </div>

                {/* Node 3: Opportunities */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] [transform:rotateZ(180deg)_translateX(140px)] md:[transform:rotateZ(180deg)_translateX(170px)]">
                  <div className="px-3 py-1.5 md:px-4 md:py-2 bg-black/90 border border-accent-cyan/40 rounded-xl glass shadow-lg text-[10px] md:text-xs font-semibold text-white whitespace-nowrap animate-[counter-orbit-offset-180_24s_linear_infinite]">
                    💼 Opportunities
                  </div>
                </div>

                {/* Node 4: Governance */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] [transform:rotateZ(270deg)_translateX(140px)] md:[transform:rotateZ(270deg)_translateX(170px)]">
                  <div className="px-3 py-1.5 md:px-4 md:py-2 bg-black/90 border border-white/20 rounded-xl glass shadow-lg text-[10px] md:text-xs font-semibold text-white whitespace-nowrap animate-[counter-orbit-offset-270_24s_linear_infinite]">
                    🗳️ Governance
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
