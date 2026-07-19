"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { BookOpen, Award, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";

const pillars = [
  {
    title: "1. Learn",
    desc: "Master Web3 skills through two premium structured onboarding pathways at Raven Academy.",
    details: ["Creator & Content Strategy", "Developer & Builder Track"],
    icon: BookOpen,
    color: "group-hover:border-accent-purple/30",
    glow: "bg-accent-purple/10",
    iconColor: "text-accent-purple",
    cta: "Go to Academy"
  },
  {
    title: "2. Contribute",
    desc: "Proof-of-work in action. Build your on-chain reputation by helping the ecosystem grow.",
    details: ["Submit Git Pull Requests", "Create Educational Content", "Moderate & Help Community"],
    icon: Award,
    color: "group-hover:border-accent-blue/30",
    glow: "bg-accent-blue/10",
    iconColor: "text-accent-blue",
    cta: "Start Contributing"
  },
  {
    title: "3. Earn",
    desc: "Unlock global bounties, paid jobs, and hackathons based on your verified reputation.",
    details: ["Access Opportunity Engine", "Direct Match with Partners", "Earn in Crypto & Stablecoins"],
    icon: TrendingUp,
    color: "group-hover:border-accent-cyan/30",
    glow: "bg-accent-cyan/10",
    iconColor: "text-accent-cyan",
    cta: "View Opportunities"
  }
];

interface PillarsSectionProps {
  walletAddress: string | null;
  setIsConnectModalOpen: (open: boolean) => void;
  setIsOpportunitiesModalOpen: (open: boolean) => void;
}

export function PillarsSection({
  walletAddress,
  setIsConnectModalOpen,
  setIsOpportunitiesModalOpen,
}: PillarsSectionProps) {
  return (
    <section id="pathways" className="py-20 relative bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent-blue/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            The Contribution Loop
          </h2>
          <p className="text-sm md:text-base text-white/50 leading-relaxed">
            A simple, self-sustaining loop. Learn skills, build verifiable reputation, and unlock paid opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Soft backdrop glow on hover */}
                <div className={`absolute inset-0 rounded-2xl ${pillar.glow} blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none`} />
                
                <GlassCard className={`h-full flex flex-col p-8 transition-all duration-500 border-white/5 ${pillar.color}`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                      <Icon className={`w-6 h-6 ${pillar.iconColor}`} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                  <p className="text-sm text-white/60 mb-6 leading-relaxed">
                    {pillar.desc}
                  </p>

                  <ul className="space-y-3 mb-8 mt-auto">
                    {pillar.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-white/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      if (index === 2) {
                        if (walletAddress) {
                          setIsOpportunitiesModalOpen(true);
                        } else {
                          setIsConnectModalOpen(true);
                        }
                      } else if (index === 1) {
                        if (walletAddress) {
                          const el = document.getElementById("dashboard");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        } else {
                          setIsConnectModalOpen(true);
                        }
                      } else {
                        // Go to Academy - mock link/navigation
                        window.open("https://academy.ravennetwork.io", "_blank");
                      }
                    }}
                  >
                    {pillar.cta}
                  </Button>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
