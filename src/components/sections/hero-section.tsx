"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Shield, Award, Crown, CheckCircle } from "lucide-react";

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
          
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="block text-xs font-black text-accent-cyan tracking-widest uppercase mb-4"
            >
              Raven Contributor Ecosystem
            </motion.span>
            <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-5 leading-tight">
              <span className="block overflow-hidden py-0.5">
                {["Building", "Africa's", "Largest"].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.65, delay: 0.05 * i, ease: [0.2, 0.65, 0.3, 0.9] }}
                    className="inline-block mr-2.5 text-white"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.25, ease: [0.2, 0.65, 0.3, 0.9] }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-cyan"
                >
                  Web3 Contributor Network.
                </motion.span>
              </span>
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="font-sans text-sm md:text-base text-white/50 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Empowering Africa's next generation of digital builders. Translate structured Web3 education into verifiable contribution pipelines and economic opportunities.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex items-center justify-center lg:justify-start gap-5 mb-12"
            >
              {walletAddress ? (
                <Link href="#dashboard">
                  <Button variant="primary" size="md" className="rounded-full px-8 py-3.5 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all hover:scale-105 duration-300 font-semibold text-xs h-auto">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Button 
                  variant="primary" 
                  size="md" 
                  className="rounded-full px-8 py-3.5 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all hover:scale-105 duration-300 font-semibold text-xs h-auto"
                  onClick={() => setIsConnectModalOpen(true)}
                >
                  Get started
                </Button>
              )}
              <Link href="#pathways" className="text-xs font-semibold text-white/50 hover:text-white transition-colors py-2">
                How it works
              </Link>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-8 border-t border-white/10 mt-2 max-w-2xl lg:max-w-3xl">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + (i * 0.05) }}
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
          </div>

          {/* Custom Interactive Mockup Cards representing Profile, Reputation, Badges & Contributions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-4 justify-center relative z-10 w-full max-w-[420px] mx-auto lg:mx-0"
          >
            {/* Ambient background glow rings */}
            <div className="absolute w-[260px] h-[260px] bg-accent-cyan/10 rounded-full blur-[90px] opacity-50 pointer-events-none -top-10 -right-10" />
            <div className="absolute w-[240px] h-[240px] bg-accent-purple/10 rounded-full blur-[80px] opacity-50 pointer-events-none -bottom-10 -left-10" />

            {/* Card 1: Profile Preview Card */}
            <div className="bg-[#0B0B0C]/80 border border-white/5 rounded-2xl p-5 backdrop-blur-xl space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-white/10 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Profile Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00F0FF]/25 to-[#A060FF]/25 border border-white/10 flex items-center justify-center font-black text-white text-xs tracking-wider">
                    DM
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-xs flex items-center gap-1.5">
                      DevMustee
                      <CheckCircle className="w-3.5 h-3.5 text-accent-cyan fill-accent-cyan/10" />
                    </h4>
                    <span className="text-[9px] text-white/40 block mt-0.5">@devmustee • Active contributor</span>
                  </div>
                </div>
                 <div className="flex gap-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[7.5px] font-bold bg-[#F59E0B]/10 border border-[#F59E0B]/25 text-[#F59E0B] uppercase tracking-wider">
                    Legend
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[7.5px] font-bold bg-[#A060FF]/10 border border-[#A060FF]/25 text-[#A060FF] uppercase tracking-wider">
                    Founder
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[7.5px] font-bold bg-[#00F0FF]/10 border border-[#00F0FF]/25 text-[#00F0FF] uppercase tracking-wider">
                    TON OG
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-white/50 leading-relaxed italic">
                "Building decentralized payment gateways and consumer hubs on TON. Dedicated to onboarding African builders."
              </p>
              <div className="space-y-2">
                <div className="flex gap-2 w-full">
                  <a href="https://github.com" target="_blank" className="flex-1 flex items-center justify-center gap-1.5 px-3 h-9 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] font-semibold text-white/60 hover:text-white hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300">
                    <svg className="w-3.5 h-3.5 text-white/70" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                    </svg>
                    GitHub
                  </a>
                  <a href="https://t.me" target="_blank" className="flex-1 flex items-center justify-center gap-1.5 px-3 h-9 rounded-xl bg-[#00F0FF]/5 border border-[#00F0FF]/10 text-[10px] font-semibold text-[#00F0FF] hover:bg-[#00F0FF]/10 hover:border-[#00F0FF]/20 transition-all duration-300">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36 0-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.08-.66.02-.18.28-.36.76-.55 2.97-1.29 4.96-2.14 5.97-2.55 2.85-1.18 3.44-1.38 3.83-1.39.08 0 .27.02.39.12.1.08.13.19.14.28 0 .06.01.12 0 .19z" />
                    </svg>
                    Telegram
                  </a>
                </div>
                <div className="flex gap-2 w-full">
                  {/* X */}
                  <a href="https://x.com" target="_blank" className="group flex-1 flex items-center justify-center h-9 rounded-xl bg-white/[0.02] border border-white/5 text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300">
                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a href="https://facebook.com" target="_blank" className="group flex-1 flex items-center justify-center h-9 rounded-xl bg-white/[0.02] border border-white/5 text-white/40 hover:text-[#1877F2] hover:bg-[#1877F2]/10 hover:border-[#1877F2]/30 transition-all duration-300">
                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://instagram.com" target="_blank" className="group flex-1 flex items-center justify-center h-9 rounded-xl bg-white/[0.02] border border-white/5 text-white/40 hover:text-[#E4405F] hover:bg-[#E4405F]/10 hover:border-[#E4405F]/30 transition-all duration-300">
                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  {/* TikTok */}
                  <a href="https://tiktok.com" target="_blank" className="group flex-1 flex items-center justify-center h-9 rounded-xl bg-white/[0.02] border border-white/5 text-white/40 hover:text-[#00f2fe] hover:bg-[#00f2fe]/10 hover:border-[#00f2fe]/30 transition-all duration-300">
                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2: Reputation Score Card */}
            <div className="bg-[#0B0B0C]/80 border border-white/5 rounded-2xl p-5 backdrop-blur-xl space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-white/10 transition-all duration-300">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Reputation</span>
                <span className="text-sm font-black text-white">
                  <span className="text-[#00F0FF]">88</span> <span className="text-white/20">/ 100</span>
                </span>
              </div>
              <div className="space-y-3">
                {/* Streak Days */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold">
                    <span className="text-white/50">Streak Days</span>
                    <span className="text-white/80">35/365+</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: "10%" }} />
                  </div>
                </div>
                {/* Consistency Score */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold">
                    <span className="text-white/50">Consistency Score</span>
                    <span className="text-white/80">88/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "88%" }} />
                  </div>
                </div>
                {/* Contributions Score */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold">
                    <span className="text-white/50">Contributions Score</span>
                    <span className="text-white/80">85/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
                {/* X Activities */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold">
                    <span className="text-white/50">X Activities</span>
                    <span className="text-white/80">80/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-purple rounded-full" style={{ width: "80%" }} />
                  </div>
                </div>
                {/* Telegram Community Support */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold">
                    <span className="text-white/50">Telegram Community Support</span>
                    <span className="text-white/80">65/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-cyan rounded-full" style={{ width: "65%" }} />
                  </div>
                </div>
                {/* Missed Tasks */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold">
                    <span className="text-white/50">Missed Tasks</span>
                    <span className="text-white/80">5 Tasks</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500/80 rounded-full" style={{ width: "55%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Cards 3 & 4: Grid Row */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Card 3: Badges */}
              <div className="bg-[#0B0B0C]/80 border border-white/5 rounded-2xl p-4 backdrop-blur-xl flex flex-col justify-between h-36 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-white/10 transition-all duration-300">
                <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest block mb-1">Raven Network Badges</span>
                <div className="flex flex-col items-center justify-center flex-1 gap-1.5 mt-1">
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center p-2 border bg-white/5 transition-transform duration-300 hover:scale-110"
                    style={{
                      boxShadow: "0 0 25px rgba(251, 191, 36, 0.25)",
                      borderColor: "rgba(251, 191, 36, 0.55)"
                    }}
                  >
                    <img src="/badges/legend.png" alt="Legend Badge" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]" />
                  </div>
                  <span className="text-[9px] font-extrabold text-amber-400 uppercase tracking-wider mt-0.5">Legend Badge</span>
                </div>
              </div>

              {/* Card 4: Contributions list */}
              <div className="bg-[#0B0B0C]/80 border border-white/5 rounded-2xl p-4 backdrop-blur-xl flex flex-col justify-between h-36 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-white/10 transition-all duration-300">
                <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest block mb-1">Contributions</span>
                <div className="space-y-1 flex-1 mt-1 justify-center flex flex-col">
                  {[
                    "Raven Network",
                    "Raven Wallet",
                    "Raven Academy",
                    "The Flock AI"
                  ].map((repo) => (
                    <div key={repo} className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/[0.01] border border-white/5 text-[8.5px] text-white/60 font-mono overflow-hidden whitespace-nowrap text-ellipsis hover:text-white transition-colors">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 text-white/70" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                      </svg>
                      {repo}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
