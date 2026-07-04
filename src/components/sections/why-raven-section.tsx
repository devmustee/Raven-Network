"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { BadgeCheck, Flame, Search, Trophy, Fingerprint, Castle } from "lucide-react";

const features = [
  {
    title: "Verified Reputation",
    desc: "Proof of contribution stored immutably. Your work speaks for itself.",
    icon: BadgeCheck,
  },
  {
    title: "Daily Streaks",
    desc: "Consistency tracking that rewards your dedication and builds trust.",
    icon: Flame,
  },
  {
    title: "Opportunity Engine",
    desc: "Access exclusive jobs, grants, and hackathons tailored to your skills.",
    icon: Search,
  },
  {
    title: "Leaderboard",
    desc: "Compete and get recognized as a top contributor in the ecosystem.",
    icon: Trophy,
  },
  {
    title: "Professional Identity",
    desc: "A unified profile to showcase your skills, courses, and project work.",
    icon: Fingerprint,
  },
  {
    title: "Future DAO",
    desc: "Community-driven governance. Earn the right to shape the network's future.",
    icon: Castle,
  },
];

export function WhyRavenSection() {
  return (
    <section className="py-16 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[100px] opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose <span className="text-accent-blue">Raven</span>?</h2>
          <p className="text-lg text-white/60">
            More than just a learning platform. We provide the infrastructure for your Web3 career.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="h-full group">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-accent-blue/20">
                    <Icon className="w-6 h-6 text-accent-blue group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
