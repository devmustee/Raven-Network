"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What is Raven Network?",
    answer: "Raven Network is an ecosystem designed to build Africa's largest Web3 contributor network. It connects education (Raven Academy), reputation tracking (Raven Network), and digital identity (Raven Wallet) to provide global opportunities."
  },
  {
    question: "How do I join?",
    answer: "You can start by joining Raven Academy for free. Complete a learning pathway (Onboarding, Creator, or Builder) to earn your entry into the Raven Network where you can start building reputation."
  },
  {
    question: "Is Raven Academy free?",
    answer: "Yes, the core pathways in Raven Academy are completely free to ensure equitable access to Web3 education for everyone."
  },
  {
    question: "What is the streak system?",
    answer: "The streak system tracks your daily learning and contribution activity. Maintaining a streak gives you a multiplier on the reputation points you earn, proving your consistency and dedication to partners."
  },
  {
    question: "How is reputation calculated?",
    answer: "Reputation is calculated based on completed courses, merged pull requests, published content, and community help, multiplied by your daily streak factor. It is stored immutably."
  },
  {
    question: "How do I earn opportunities?",
    answer: "As your reputation score increases, you unlock access to our Opportunity Engine, which matches your verified skills with paid jobs, bounties, and hackathons from our global partners."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="py-24 relative overflow-hidden bg-black">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-white/60">
            Everything you need to know about the Raven ecosystem.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <GlassCard 
              key={index} 
              className={`cursor-pointer transition-all border-white/10 ${openIndex === index ? 'bg-white/10' : 'hover:bg-white/5'}`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180 bg-accent-blue text-white' : 'text-white/50'}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-white/60 pt-4 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
