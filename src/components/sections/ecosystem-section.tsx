"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { BookOpen, Network, Wallet, Building2 } from "lucide-react";

const products = [
  {
    title: "Raven Learning Systems Ltd",
    desc: "The company building products that accelerate Web3 education, contributor growth, and digital opportunity.",
    icon: Building2,
    color: "from-gray-500 to-gray-700",
    link: "#"
  },
  {
    title: "Raven Academy",
    desc: "Learn Web3. Three pathways: Web3 Onboarding, Creator, Builder.",
    icon: BookOpen,
    color: "from-accent-purple to-pink-500",
    link: "#academy"
  },
  {
    title: "Raven Network",
    desc: "Build reputation. Track streaks. Access opportunities. Compete on leaderboards.",
    icon: Network,
    color: "from-accent-blue to-cyan-500",
    link: "#network"
  },
  {
    title: "Raven Wallet",
    desc: "Digital identity. Credentials. Future rewards.",
    icon: Wallet,
    color: "from-accent-cyan to-teal-500",
    link: "#wallet"
  }
];

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="py-16 bg-black relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            The Raven <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-cyan">Ecosystem</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60"
          >
            An interconnected suite of products designed to take you from a curious learner to a highly sought-after Web3 contributor.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Animated Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan opacity-20 -translate-y-1/2" />
          
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <GlassCard className="h-full flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 relative z-10 bg-black/80">
                  <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${product.color}`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{product.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">
                    {product.desc}
                  </p>
                  <a href={product.link} className="text-sm font-semibold text-white/80 hover:text-white flex items-center gap-2 group">
                    Explore
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
