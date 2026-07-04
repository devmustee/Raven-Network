"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { MessageSquare, Share2, Globe } from "lucide-react";

export function FounderSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent-blue/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <GlassCard className="p-8 md:p-12">
            <div className="grid md:grid-cols-5 gap-8 items-center">
              
              <div className="md:col-span-2 flex justify-center">
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple to-accent-cyan opacity-20" />
                  <img 
                    src="/devmustee.jpg" 
                    alt="Engr. Mustapha Mohamed" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  {/* Fallback avatar */}
                  <div className="hidden absolute inset-0 bg-white/5 flex items-center justify-center text-4xl font-bold">
                    MM
                  </div>
                </div>
              </div>

              <div className="md:col-span-3 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Engr. Mustapha Mohamed</h2>
                <div className="text-accent-cyan font-medium mb-1">Founder and CEO (DevMustee)</div>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6 text-xs text-white/50">
                  <span className="px-2 py-1 bg-white/5 rounded">Software Engineer</span>
                  <span className="px-2 py-1 bg-white/5 rounded">Web3 Ecosystem Builder</span>
                  <span className="px-2 py-1 bg-white/5 rounded">TON Contributor</span>
                </div>
                
                <p className="text-white/70 mb-6 leading-relaxed">
                  "Our mission is to build Africa's largest Web3 contributor network. We are moving beyond just teaching concepts; we are building a verifiable reputation system that connects raw talent to global opportunities."
                </p>

                <div className="flex justify-center md:justify-start gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-accent-blue transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-accent-blue transition-colors">
                    <Share2 className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-accent-blue transition-colors">
                    <Globe className="w-5 h-5" />
                  </a>
                </div>
              </div>

            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
