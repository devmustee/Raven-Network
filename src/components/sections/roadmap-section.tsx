"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";

const roadmapData = [
  {
    year: "2026",
    goals: [
      "Launch Raven Academy",
      "Launch Raven Network",
      "Launch PWA",
      "10,000 Members"
    ],
    status: "current"
  },
  {
    year: "2027",
    goals: [
      "100,000 Members",
      "Partner Marketplace",
      "Reputation Engine API"
    ],
    status: "upcoming"
  },
  {
    year: "2028",
    goals: [
      "Raven Wallet Launch",
      "DAO Governance Setup",
      "Enterprise Partnerships"
    ],
    status: "future"
  },
  {
    year: "2029+",
    goals: [
      "Global Expansion",
      "One Million Contributors",
      "Decentralized Network Protocol"
    ],
    status: "future"
  }
];

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-24 bg-black relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">The <span className="text-accent-cyan">Roadmap</span></h2>
          <p className="text-lg text-white/60">
            Our vision for building Africa's largest Web3 contributor network.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/5 -translate-y-1/2 hidden lg:block" />
          
          <div className="grid lg:grid-cols-4 gap-6 relative z-10">
            {roadmapData.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline Dot (Desktop) */}
                <div className={`hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 ${
                  item.status === 'current' ? 'bg-accent-cyan border-accent-cyan shadow-[0_0_15px_rgba(6,182,212,0.5)]' :
                  item.status === 'upcoming' ? 'bg-black border-accent-cyan' :
                  'bg-black border-white/20'
                } z-20`} />
                
                <div className={`lg:pt-24 ${index % 2 !== 0 ? 'lg:pt-0 lg:pb-24' : ''}`}>
                  <GlassCard className={`h-full border-t-4 ${
                    item.status === 'current' ? 'border-t-accent-cyan' :
                    item.status === 'upcoming' ? 'border-t-accent-purple' :
                    'border-t-white/20'
                  }`}>
                    <h3 className="text-3xl font-black mb-4 font-mono tracking-tighter opacity-80">{item.year}</h3>
                    <ul className="space-y-3">
                      {item.goals.map((goal, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                          <span className="text-accent-cyan mt-1">•</span>
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
