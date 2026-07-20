"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { MessageSquare, Share2, Globe } from "lucide-react";

const teamMembers = [
  {
    name: "Engr. Mustapha Mohamed",
    alias: "DevMustee",
    role: "Founder & Chief Executive Officer (CEO)",
    bio: "Software engineer | AI/ML Engineer | Web3 Key opinion Leader | EX TON Syndicate | contributor to Bitrus.",
    badges: ["AI/ML", "Web3 KOL", "TON Syndicate", "Bitrus"],
    avatar: "/devmustee.jpg",
    github: "https://github.com/devmustee",
    x: "https://x.com/devmustee"
  },
  {
    name: "Mr. Bosun Adeneyi",
    role: "Co-founder & Chief Operating Officer (COO)",
    bio: "Ex-Techstars Accelerator operations lead. Focuses on scaling institutional talent networks, project pipelines, and corporate partnerships.",
    badges: ["Co-founder", "Operations", "Partnerships"],
    avatar: "/bosun.jpg"
  },
  {
    name: "Engr. Abduleasheed Ibrahim",
    role: "Co-founder & Chief Technology Officer (CTO)",
    bio: "Senior Software Engineer | AI/ML Engineer | Python (CPython) Contributor.",
    badges: ["Co-founder", "AI/ML", "CPython"],
    avatar: "/abdul.jpg"
  },
  {
    name: "Jerry Gomna",
    role: "Chief Marketing Officer (CMO)",
    bio: "Ex TON Syndicate, Web3 Key opinion Leader!",
    badges: ["Ex TON Syndicate", "KOL", "Marketing"],
    avatar: "/jerry.jpg"
  },
  {
    name: "Elena Rostov",
    role: "Chief Financial Officer (CFO)",
    bio: "Ecosystem treasury strategist. Coordinates tokenomics audits, stablecoin liquidity pool tracking, and community grant budgets.",
    badges: ["Finance", "Treasury", "Compliance"],
    avatar: "ER"
  },
  {
    name: "Amina Diallo",
    role: "Head of Community",
    bio: "Coordinates community relations, local university developer chapters, quest verification moderation, and builder support networks.",
    badges: ["Community Lead", "DevRel", "Moderation"],
    avatar: "AD"
  }
];

export function TeamSection() {
  return (
    <section id="team" className="py-24 relative overflow-hidden bg-black/40 border-y border-white/5">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block text-xs font-black text-accent-cyan tracking-widest uppercase mb-4"
          >
            Core Leadership
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-none"
          >
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-white to-accent-purple">Ecosystem Team</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm text-white/50 leading-relaxed"
          >
            Meet the visionaries, engineers, and ecosystem builders driving Web3 education, verifiable reputation, and digital opportunities across Africa.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <GlassCard className="h-full flex flex-col p-6 hover:-translate-y-2 transition-transform duration-300 relative z-10 bg-black/80 group">
                <div className="flex items-center gap-4 mb-5">
                  {member.avatar.endsWith(".jpg") ? (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 flex-shrink-0">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden absolute inset-0 bg-white/5 flex items-center justify-center text-xl font-bold">
                        {member.alias?.substring(0, 2)}
                      </div>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan flex-shrink-0 flex items-center justify-center text-xl font-bold text-white shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                      {member.avatar}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-white text-sm group-hover:text-accent-cyan transition-colors leading-tight">
                      {member.name}
                    </h3>
                    <span className="text-[10px] text-accent-cyan font-bold tracking-wider uppercase block mt-1">
                      {member.role}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-white/50 leading-relaxed mb-6 flex-1 text-left">
                  {member.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6 justify-start">
                  {member.badges.map((badge) => (
                    <span key={badge} className="px-2 py-0.5 bg-white/5 border border-white/5 rounded text-[8px] font-semibold text-white/60">
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noreferrer" className="text-white/45 hover:text-white transition-colors text-[10px] font-bold">
                        GitHub
                      </a>
                    )}
                    {member.x && (
                      <a href={member.x} target="_blank" rel="noreferrer" className="text-white/45 hover:text-white transition-colors text-[10px] font-bold">
                        X.com
                      </a>
                    )}
                    {!member.github && <span className="text-[10px] text-white/30">Active Leadership</span>}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
