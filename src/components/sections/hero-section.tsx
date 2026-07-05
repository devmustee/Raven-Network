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

          {/* Premium Static Graphic Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative h-[380px] md:h-[450px] flex items-center justify-center animate-pulse-slow"
          >
            {/* Ambient background glow */}
            <div className="absolute w-[250px] h-[250px] bg-accent-purple/15 rounded-full blur-[80px] opacity-70 pointer-events-none" />

            <div className="relative w-full max-w-[340px] md:max-w-[420px] aspect-square rounded-2xl overflow-hidden glass border border-white/10 shadow-[0_0_50px_rgba(147,51,234,0.15)] flex items-center justify-center bg-black/40 backdrop-blur-md">
              <img 
                src="/ravens-unity.png" 
                alt="Raven Network Unity" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
