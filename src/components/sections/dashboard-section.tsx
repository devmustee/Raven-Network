"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { Flame, Trophy, Award, Zap, Lock, User } from "lucide-react";
import { Button } from "../ui/button";
import { ProfileData } from "../ui/profile-modal";

const leaderboardData = [
  { rank: 1, name: "0xAlex...3fA", points: "12,450 XP", streak: "142 days", badge: "Core Dev", avatar: "" },
  { rank: 2, name: "SarahWeb3", points: "10,120 XP", streak: "89 days", badge: "Tech Writer", avatar: "" },
  { rank: 3, name: "MustaphaDev", points: "9,850 XP", streak: "67 days", badge: "Solidity Eng", avatar: "/devmustee.jpg" },
];

interface DashboardSectionProps {
  walletAddress: string | null;
  setIsConnectModalOpen: (open: boolean) => void;
  profile: ProfileData;
}

export function DashboardSection({ walletAddress, setIsConnectModalOpen, profile }: DashboardSectionProps) {
  const activeLeaderboard = [...leaderboardData];
  if (walletAddress) {
    activeLeaderboard.push({
      rank: 4,
      name: profile.name || walletAddress,
      points: "1,500 XP",
      streak: "3 days",
      badge: "You",
      avatar: profile.avatar,
    });
  }

  return (
    <section id="dashboard" className="py-20 relative bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent-purple/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ecosystem Dashboard
          </h2>
          <p className="text-sm md:text-base text-white/50 leading-relaxed">
            Real-time reputation points and streak multiplier tracking. Maintain daily activity to unlock maximum global opportunities.
          </p>
        </div>

        <div className="relative">
          {/* Blur lock overlay for non-connected users */}
          {!walletAddress && (
            <div className="absolute inset-0 z-20 backdrop-blur-xl bg-black/60 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-8 text-center shadow-[0_0_50px_rgba(147,51,234,0.05)]">
              <div className="w-16 h-16 rounded-2xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(147,51,234,0.1)]">
                <Lock className="w-8 h-8 text-accent-purple" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Dashboard Locked</h3>
              <p className="text-sm text-white/60 mb-6 max-w-md leading-relaxed">
                Connect your TON or EVM wallet to view your personalized contribution streaks, reputation points multiplier, and leaderboard status.
              </p>
              <Button 
                variant="primary" 
                size="md"
                onClick={() => setIsConnectModalOpen(true)}
              >
                Connect Wallet to Access
              </Button>
            </div>
          )}

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Streak Engine & Reputation Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 flex flex-col gap-6"
            >
              {/* Streak Engine Card */}
              <GlassCard className="flex flex-col p-6 border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center border border-accent-purple/20">
                    <Flame className="w-5 h-5 text-accent-purple" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Streak Engine</h3>
                    <p className="text-[10px] text-white/40">Consistency boosts reputation multipliers</p>
                  </div>
                </div>

                {/* Visual Multiplier Meter */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {[
                    { range: "1-7 Days", mult: "1.0x", desc: "Base", active: true },
                    { range: "8-30 Days", mult: "1.2x", desc: "Bronze", active: true },
                    { range: "31-90 Days", mult: "1.5x", desc: "Silver", active: false },
                    { range: "91+ Days", mult: "2.0x", desc: "Gold", active: false }
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`p-2.5 rounded-xl border text-center transition-all duration-300 ${
                        item.active 
                          ? 'bg-accent-purple/5 border-accent-purple/30 shadow-[0_0_15px_rgba(147,51,234,0.05)]' 
                          : 'bg-white/[0.02] border-white/5 opacity-55'
                      }`}
                    >
                      <span className="block text-[8px] text-white/40 mb-1">{item.range}</span>
                      <span className={`block text-sm font-bold mb-0.5 ${item.active ? 'text-accent-purple' : 'text-white'}`}>
                        {item.mult}
                      </span>
                      <span className="block text-[8px] text-white/30 tracking-wider uppercase font-semibold">{item.desc}</span>
                    </div>
                  ))}
                </div>

                {/* Active Badges List */}
                <div className="mb-5">
                  <span className="block text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2.5">Active Badge Progress</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Fledgling", days: 7, icon: "🪶" },
                      { name: "Scout", days: 30, icon: "👁️" },
                      { name: "Vanguard", days: 90, icon: "🦅" },
                      { name: "Shadow", days: 180, icon: "🛡️" },
                      { name: "Legend", days: 365, icon: "👑" }
                    ].map((badge) => {
                      const isUnlocked = profile.streakDays >= badge.days;
                      return (
                        <div 
                          key={badge.name} 
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[9px] font-bold transition-all ${
                            isUnlocked 
                              ? 'bg-white/5 border-white/15 text-white shadow-[0_0_10px_rgba(255,255,255,0.02)]' 
                              : 'bg-white/[0.01] border-white/5 text-white/20 select-none opacity-40'
                          }`}
                          title={`${badge.name} Milestone (${badge.days} Days Streak)`}
                        >
                          <span className="text-xs">{badge.icon}</span>
                          <span>{badge.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                  <Zap className="w-5 h-5 text-accent-cyan flex-shrink-0" />
                  <p className="text-[10px] text-white/50 leading-relaxed">
                    <strong>Consistency Rule:</strong> Missing active merges or modules will reset your streak. Maintain activity for 2.0x earning power.
                  </p>
                </div>
              </GlassCard>

              {/* Reputation Scorecard Card */}
              <GlassCard className="flex flex-col p-6 border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20">
                      <Award className="w-5 h-5 text-accent-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base">Reputation Scorecard</h3>
                      <p className="text-[10px] text-white/40">Verified skills distribution</p>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-accent-cyan">88</span>
                    <span className="text-xs text-white/45">/ 100</span>
                  </div>
                </div>

                {/* Progress bars */}
                <div className="space-y-4">
                  {[
                    { label: "Code Contributions (GitHub)", score: "80/100", width: "w-[80%]", color: "bg-accent-purple" },
                    { label: "Academy Modules", score: "90/100", width: "w-[90%]", color: "bg-accent-blue" },
                    { label: "Community Support", score: "65/100", width: "w-[65%]", color: "bg-accent-cyan" }
                  ].map((skill, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-white/60">{skill.label}</span>
                        <span className="text-white/80 tabular-nums">{skill.score}</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                        <div className={`h-full rounded-full ${skill.color} ${skill.width}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

          {/* Right Column: Mini-Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <GlassCard className="h-full flex flex-col p-8 border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20">
                  <Trophy className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Top Contributors</h3>
                  <p className="text-xs text-white/40">Top on-chain reputation ranks</p>
                </div>
              </div>

              {/* Leaderboard Entries */}
              <div className="space-y-4">
                {activeLeaderboard.map((user, idx) => {
                  const isUser = user.rank === 4;
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                        isUser 
                          ? 'bg-accent-purple/10 border-accent-purple/30 shadow-[0_0_20px_rgba(147,51,234,0.08)]' 
                          : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-white/70 border border-white/10">
                          {user.rank}
                        </div>
                        {user.avatar ? (
                          <img src={user.avatar} className="w-9 h-9 rounded-full object-cover border border-white/10" alt={user.name} />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white/40">
                            <User className="w-4.5 h-4.5" />
                          </div>
                        )}
                        <div>
                          <span className="block text-sm font-semibold text-white truncate max-w-[120px] sm:max-w-none">{user.name}</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="inline-block text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 font-medium">
                              {user.badge}
                            </span>
                            {/* User Social links badges if present */}
                            {isUser && (
                              <div className="flex gap-1.5 items-center ml-2">
                                {profile.github && (
                                  <span title={`GitHub: ${profile.github}`}>
                                    <svg className="w-3 h-3 text-white opacity-80" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                                    </svg>
                                  </span>
                                )}
                                {profile.telegram && (
                                  <span title={`Telegram: ${profile.telegram}`}>
                                    <svg className="w-3 h-3 text-sky-400 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                      <path d="m22 2-7 20-4-9-9-4Z" />
                                      <path d="M22 2 11 13" />
                                    </svg>
                                  </span>
                                )}
                                {profile.x && (
                                  <span title={`X: ${profile.x}`}>
                                    <svg className="w-3 h-3 text-white opacity-80" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                  </span>
                                )}
                                {profile.instagram && (
                                  <span title={`Instagram: ${profile.instagram}`}>
                                    <svg className="w-3 h-3 text-pink-400 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    </svg>
                                  </span>
                                )}
                                {profile.facebook && (
                                  <span title={`Facebook: ${profile.facebook}`}>
                                    <svg className="w-3 h-3 text-blue-500 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg>
                                  </span>
                                )}
                                {profile.tiktok && (
                                  <span title={`TikTok: ${profile.tiktok}`}>
                                    <svg className="w-3 h-3 text-pink-500 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95.89 2.24 1.43 3.58 1.49v3.95c-1.74-.08-3.41-.75-4.73-1.89-.13-.11-.26-.22-.39-.34v6.86c.03 2.12-.9 4.19-2.52 5.56-1.92 1.63-4.66 2.1-7.05 1.22C4.5 20.18 2.8 17.55 3.05 14.8c.25-2.78 2.45-5.12 5.23-5.36 1.15-.09 2.3.17 3.3.75v4.06c-.84-.52-1.85-.71-2.8-.52-1.39.26-2.53 1.43-2.77 2.84-.28 1.62.67 3.23 2.25 3.66 1.44.4 3.05-.22 3.73-1.57.19-.38.28-.79.28-1.22V.02z" />
                                    </svg>
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="block text-sm font-bold text-accent-blue">{user.points}</span>
                        <span className="block text-[10px] text-white/40 flex items-center gap-1 justify-end">
                          <Flame className="w-3 h-3 text-orange-500" /> {user.streak}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  );
}
