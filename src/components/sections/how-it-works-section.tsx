"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Route, Users, ShieldCheck, Briefcase, Landmark } from "lucide-react";

const steps = [
  { id: 1, title: "Join Raven Academy", desc: "Start your journey by enrolling in premium Web3 courses.", icon: GraduationCap },
  { id: 2, title: "Complete Pathway", desc: "Finish your chosen track (Onboarding, Creator, Builder).", icon: Route },
  { id: 3, title: "Join Raven Network", desc: "Enter the contributor network upon graduation.", icon: Users },
  { id: 4, title: "Build Reputation", desc: "Earn points through consistency and contributions.", icon: ShieldCheck },
  { id: 5, title: "Access Opportunities", desc: "Unlock jobs, grants, and hackathons.", icon: Briefcase },
  { id: 6, title: "Help Govern", desc: "Use your reputation to shape the future of the ecosystem.", icon: Landmark },
];

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="py-16 relative bg-black/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">How It Works</h2>
          <p className="text-lg text-white/60">
            A seamless journey from absolute beginner to verifiable Web3 professional.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative" ref={containerRef}>
          {/* Animated Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 md:-translate-x-1/2 rounded-full" />
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 w-1 bg-gradient-to-b from-accent-purple via-accent-blue to-accent-cyan md:-translate-x-1/2 rounded-full"
            style={{ height }}
          />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 !== 0;
              
              return (
                <div key={step.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Icon Node */}
                  <div className="absolute left-8 md:left-1/2 w-12 h-12 bg-black border-2 border-accent-blue rounded-full flex items-center justify-center z-10 md:-translate-x-1/2 -translate-x-[22px] glass">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  
                  {/* Content */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12 text-left md:text-right'}`}
                  >
                    <div className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                      <div className="text-accent-blue font-bold text-sm mb-2">Step {step.id}</div>
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
