"use client";

import React from "react";
import { motion } from "framer-motion";

const leaderboardData = [
  { rank: 1, member: "0xAlex...3fA", streak: 142, reputation: "12,450", country: "🇳🇬" },
  { rank: 2, member: "SarahWeb3", streak: 128, reputation: "11,200", country: "🇰🇪" },
  { rank: 3, member: "DevMustee_Fan", streak: 115, reputation: "10,850", country: "🇿🇦" },
  { rank: 4, member: "CryptoNerd", streak: 94, reputation: "9,100", country: "🇬🇭" },
  { rank: 5, member: "BuildAfrica", streak: 88, reputation: "8,950", country: "🇷🇼" },
];

export function LeaderboardPreview() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Global <span className="text-accent-purple">Leaderboard</span></h2>
          <p className="text-lg text-white/60">
            Top contributors earn exclusive rewards, direct introductions to partners, and governance rights.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 text-sm font-semibold text-white/50 w-16 text-center">Rank</th>
                  <th className="p-4 text-sm font-semibold text-white/50">Member</th>
                  <th className="p-4 text-sm font-semibold text-white/50">Streak</th>
                  <th className="p-4 text-sm font-semibold text-white/50">Reputation</th>
                  <th className="p-4 text-sm font-semibold text-white/50 text-center">Country</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((row, index) => {
                  const isTopThree = index < 3;
                  return (
                    <motion.tr 
                      key={row.member}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${isTopThree ? 'bg-gradient-to-r from-accent-purple/10 to-transparent' : ''}`}
                    >
                      <td className="p-4 text-center">
                        {index === 0 && <span className="text-2xl">🥇</span>}
                        {index === 1 && <span className="text-2xl">🥈</span>}
                        {index === 2 && <span className="text-2xl">🥉</span>}
                        {index > 2 && <span className="text-white/50 font-medium">{row.rank}</span>}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs ${isTopThree ? 'border border-accent-purple/50' : ''}`}>
                            {row.member.substring(0, 2).toUpperCase()}
                          </div>
                          <span className={`font-medium ${isTopThree ? 'text-white' : 'text-white/80'}`}>{row.member}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 text-orange-400">
                          🔥 <span className="font-semibold">{row.streak}</span>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-accent-purple font-semibold">
                        {row.reputation}
                      </td>
                      <td className="p-4 text-center text-xl">
                        {row.country}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
