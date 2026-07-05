"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../ui/glass-card";

const faqs = [
  {
    question: "What is Raven Network?",
    answer: "Raven Network is Africa's largest Web3 contributor network, connecting individuals to education, verifiable reputation, and global opportunities."
  },
  {
    question: "What problem does it solve?",
    answer: "We solve the gap between talent and opportunity by providing a verifiable, on-chain reputation system that proves a contributor's skills and consistency to global employers."
  },
  {
    question: "Why Africa?",
    answer: "Africa has the youngest, fastest-growing digital workforce in the world. By equipping them with Web3 skills and reputation, we can unlock massive economic potential."
  }
];

const journeySteps = [
  { step: "Learn", desc: "Master Web3 skills at Raven Academy." },
  { step: "Contribute", desc: "Build open-source projects." },
  { step: "Earn Reputation", desc: "Track streaks and rank up." },
  { step: "Access Opportunities", desc: "Get hired globally." },
];

export function AboutSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-black/40">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* FAQ / Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8 leading-tight">
              Empowering the Next <br className="hidden sm:block" /> Generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-cyan">Web3 Builders</span>.
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <GlassCard 
                  key={index} 
                  className={`cursor-pointer transition-all border text-left ${
                    activeIndex === index 
                      ? 'border-accent-blue bg-white/[0.05] shadow-[0_0_20px_rgba(0,240,255,0.15)]' 
                      : 'border-white/5 bg-white/[0.01] hover:border-white/20'
                  }`}
                  onClick={() => setActiveIndex(activeIndex === index ? 3 : index)}
                >
                  <h3 className="text-base font-extrabold text-white mb-2 flex items-center justify-between">
                    {faq.question}
                    <span className={`text-xs transition-transform duration-300 ${activeIndex === index ? 'rotate-45 text-accent-cyan' : 'text-white/40'}`}>+</span>
                  </h3>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.p 
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-white/60 text-xs overflow-hidden leading-relaxed"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* Interactive Timeline Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative lg:pl-12"
          >
            {/* Connecting Timeline Line */}
            <div className="absolute left-4 lg:left-16 top-2 bottom-2 w-[2px] bg-gradient-to-b from-accent-purple via-accent-blue to-accent-cyan opacity-20" />
            
            <div className="space-y-12">
              {journeySteps.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <div 
                    key={index} 
                    className={`relative flex items-center gap-8 group transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-[1.02]' : 'opacity-40 hover:opacity-75'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full bg-black border-2 flex items-center justify-center z-10 glass transition-all duration-300 ${
                      isActive 
                        ? 'border-accent-blue shadow-[0_0_15px_rgba(0,152,234,0.4)] scale-110' 
                        : 'border-white/10'
                    }`}>
                      {isActive ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-accent-blue animate-pulse" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                      )}
                    </div>
                    <GlassCard className={`flex-1 border transition-all duration-300 ${
                      isActive ? 'border-accent-blue/30 shadow-[0_0_20px_rgba(0,152,234,0.08)] bg-white/[0.03]' : 'border-white/5'
                    }`}>
                      <h4 className={`text-sm font-extrabold mb-1 ${isActive ? 'text-accent-cyan' : 'text-white/80'}`}>
                        Phase {index + 1}: {item.step}
                      </h4>
                      <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
                    </GlassCard>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
