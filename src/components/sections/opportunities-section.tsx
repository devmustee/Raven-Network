"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { Button } from "../ui/button";

const opportunities = [
  { role: "Developer", reward: "$5,000", skill: "Smart Contracts", difficulty: "Hard", partner: "TON Foundation" },
  { role: "Community Manager", reward: "$1,200/mo", skill: "Community", difficulty: "Medium", partner: "Mantle" },
  { role: "Content Creator", reward: "$500", skill: "Writing", difficulty: "Easy", partner: "Polygon" },
  { role: "Designer", reward: "$2,000", skill: "UI/UX", difficulty: "Medium", partner: "Arbitrum" },
  { role: "Researcher", reward: "$1,500", skill: "Analysis", difficulty: "Hard", partner: "Optimism" },
  { role: "Growth Lead", reward: "$3,000/mo", skill: "Marketing", difficulty: "Medium", partner: "Base" },
  { role: "Hackathon Participant", reward: "Up to $10k", skill: "Development", difficulty: "Varies", partner: "Solana" },
];

export function OpportunitiesSection() {
  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">The <span className="text-accent-cyan">Opportunity</span> Engine</h2>
            <p className="text-lg text-white/60">
              Your reputation is your resume. Unlock paid roles, bounties, and grants from our global partners.
            </p>
          </div>
          <Button variant="outline">View All Opportunities</Button>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex overflow-x-auto pb-8 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 snap-x snap-mandatory hide-scrollbar">
          {opportunities.map((opp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="min-w-[280px] snap-center"
            >
              <GlassCard className="h-full flex flex-col hover:border-accent-cyan/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-accent-cyan/10 text-accent-cyan text-xs font-semibold rounded-full">
                    {opp.difficulty}
                  </span>
                  <span className="text-sm font-medium text-white/50">{opp.partner}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-1">{opp.role}</h3>
                <p className="text-white/60 text-sm mb-6">{opp.skill}</p>
                
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-white/50 mb-1">Reward</div>
                    <div className="font-bold text-lg text-white">{opp.reward}</div>
                  </div>
                  <Button variant="primary" size="sm">Apply</Button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
