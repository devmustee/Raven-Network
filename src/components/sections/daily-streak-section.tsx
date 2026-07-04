"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { GlassCard } from "../ui/glass-card";

const streakNodes = [
  { day: "Day 1", multiplier: "1x", delay: 0 },
  { day: "Day 2", multiplier: "1.1x", delay: 0.2 },
  { day: "Day 3", multiplier: "1.2x", delay: 0.4 },
  { day: "30 Days", multiplier: "2x", delay: 0.6 },
  { day: "100 Days", multiplier: "5x", delay: 0.8 },
];

export function DailyStreakSection() {
  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 font-semibold text-sm mb-6 border border-orange-500/20">
              <Flame className="w-4 h-4" />
              Proof of Consistency
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Build Trust, <span className="text-orange-500">Day by Day</span>.</h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              In the decentralized world, trust is earned through verifiable action. 
              Our daily streak system tracks your learning and contribution consistency. 
              The longer your streak, the higher your reputation multiplier, making you 
              stand out to global employers and partners.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/5 -translate-y-1/2 hidden md:block" />
            <motion.div 
              className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-400 -translate-y-1/2 hidden md:block"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 relative z-10">
              {streakNodes.map((node, index) => (
                <motion.div
                  key={node.day}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: node.delay }}
                  className="flex flex-col items-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-black border-2 border-orange-500/30 flex items-center justify-center mb-4 glass group-hover:border-orange-500 transition-colors relative">
                    <Flame className={`w-8 h-8 ${index === streakNodes.length - 1 ? 'text-yellow-400 animate-pulse' : 'text-orange-500'}`} />
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-orange-500 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
                  </div>
                  <div className="font-bold text-white mb-1">{node.day}</div>
                  <div className="text-xs text-orange-400 font-mono bg-orange-500/10 px-2 py-0.5 rounded">
                    {node.multiplier} Rep
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
