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
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <section id="about" className="py-16 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* FAQ / Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Empowering the Next Generation of <span className="text-accent-blue">Web3 Builders</span>.
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <GlassCard 
                  key={index} 
                  className={`cursor-pointer transition-all ${activeFaq === index ? 'border-accent-blue/50 bg-white/10' : ''}`}
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.p 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="text-white/70 overflow-hidden"
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
            <div className="absolute left-8 lg:left-20 top-0 bottom-0 w-px bg-gradient-to-b from-accent-purple via-accent-blue to-accent-cyan opacity-30" />
            
            <div className="space-y-12">
              {journeySteps.map((item, index) => (
                <div key={index} className="relative flex items-center gap-8 group">
                  <div className="w-8 h-8 rounded-full bg-black border-2 border-accent-blue flex items-center justify-center z-10 glass transition-transform group-hover:scale-125">
                    <div className="w-2 h-2 rounded-full bg-accent-blue" />
                  </div>
                  <GlassCard className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-1">Phase {index + 1}: {item.step}</h4>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </GlassCard>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
