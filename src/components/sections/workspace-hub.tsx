"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { Button } from "../ui/button";
import { ProfileData } from "../ui/profile-modal";
import { 
  User, Flame, Trophy, Award, Zap, Briefcase, 
  ExternalLink, CheckSquare, Check, Calendar, Sparkles 
} from "lucide-react";

interface WorkspaceHubProps {
  walletAddress: string;
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
  setIsProfileModalOpen: (open: boolean) => void;
  setWalletAddress: (addr: string | null) => void;
}

const initialLeaderboard = [
  { rank: 1, name: "MustaphaDev", reputation: 980, badge: "TON Dev Legend", avatar: "/devmustee.jpg", isUser: false, socials: { x: "@devmustee", telegram: "devmustee" } },
  { rank: 2, name: "AfroCoder", reputation: 920, badge: "EVM Architect", avatar: "", isUser: false, socials: { github: "afrocoder" } },
  { rank: 3, name: "FatimaTON", reputation: 875, badge: "TON OG Builder", avatar: "", isUser: false, socials: { telegram: "fatimaton", x: "@fatima_ton" } },
  { rank: 5, name: "KofiWeb3", reputation: 790, badge: "Contributor", avatar: "", isUser: false, socials: { github: "kofiweb3" } },
  { rank: 6, name: "Zubairu", reputation: 740, badge: "Academy Graduate", avatar: "", isUser: false, socials: { x: "@zubairu_ton" } }
];

const jobs = [
  { title: "Smart Contract Engineer", company: "AssetChain Labs", salary: "$120k - $165k", type: "Full-Time", location: "Remote" },
  { title: "Community & DevRel Lead", company: "Raven Network", salary: "$80k - $110k", type: "Full-Time", location: "Remote" },
  { title: "Technical Writer (EVM/TON)", company: "Raven Academy", salary: "$5k - $8k / mo", type: "Contract", location: "Remote" }
];

const hackathons = [
  { title: "TON Africa Builders Hackathon", prizePool: "$50,000", dates: "Aug 1 - Aug 20", host: "TON Foundation" },
  { title: "EVM Layer-2 Scaling Quest", prizePool: "$30,000", dates: "Sep 5 - Sep 15", host: "AssetChain" }
];

const contests = [
  { title: "Web3 Educational Article Contest", prizePool: "$5,000", deadline: "Ends in 6 days", participants: "142 entries" },
  { title: "Ecosystem Logo Rebrand Design", prizePool: "$3,500", deadline: "Ends in 12 days", participants: "89 entries" }
];

export function WorkspaceHub({ 
  walletAddress, 
  profile, 
  setProfile,
  setIsProfileModalOpen,
  setWalletAddress 
}: WorkspaceHubProps) {
  const [activeTab, setActiveTab] = useState<"jobs" | "hackathons" | "contests">("jobs");
  
  // Daily Tasks state - streak consistency booster
  const [dailyTasks, setDailyTasks] = useState([
    { id: 1, text: "Verify GitHub Merge Proof", xp: 15, done: false },
    { id: 2, text: "Complete 'TON Smart Contract' Quiz", xp: 10, done: false },
    { id: 3, text: "Post in ecosystem dev-chat", xp: 5, done: false },
    { id: 4, text: "Mock Transaction Signature check", xp: 20, done: false }
  ]);
  const [notification, setNotification] = useState<string | null>(null);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  const handleDailyCheckIn = () => {
    if (hasCheckedIn) return;
    setHasCheckedIn(true);
    showNotification("Daily Streak claimed successfully! +1 Day added.");
    setProfile(p => ({
      ...p,
      streakDays: p.streakDays + 1
    }));
  };

  const toggleTask = (id: number) => {
    setDailyTasks(prev => prev.map(task => {
      if (task.id === id) {
        const nextState = !task.done;
        if (nextState) {
          showNotification(`+${task.xp} XP Earned! Streak protected.`);
          setProfile(p => ({
            ...p,
            streakDays: p.streakDays + 1
          }));
        } else {
          setProfile(p => ({
            ...p,
            streakDays: Math.max(35, p.streakDays - 1)
          }));
        }
        return { ...task, done: nextState };
      }
      return task;
    }));
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Construct current dynamic leaderboard row for the user
  const userRankEntry = {
    rank: 4,
    name: profile.name || "You (Connecting)",
    reputation: 820 + (dailyTasks.filter(t => t.done).length * 15),
    badge: profile.github ? "Verified Dev" : "Contributor",
    avatar: profile.avatar,
    isUser: true,
    socials: {
      github: profile.github,
      telegram: profile.telegram,
      x: profile.x,
      instagram: profile.instagram,
      facebook: profile.facebook,
      tiktok: profile.tiktok
    }
  };

  // Compile leaderboard list
  const fullLeaderboard = [
    initialLeaderboard[0],
    initialLeaderboard[1],
    initialLeaderboard[2],
    userRankEntry,
    initialLeaderboard[3],
    initialLeaderboard[4]
  ];

  return (
    <div className="space-y-8 relative">
      {/* Dynamic Action Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-accent-purple/90 to-accent-cyan/90 border border-white/20 px-4 py-2.5 rounded-full text-xs font-bold shadow-2xl backdrop-blur-md text-white"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Headline */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">Contributor Hub</h2>
          <p className="text-xs text-white/50 mt-1">Manage your developer profile, daily streaks, and opportunities.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={() => setIsProfileModalOpen(true)}>
            Edit Profile
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setWalletAddress(null)}>
            Disconnect
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* ================= LEFT COLUMN: PROFILE CARD & DAILY TASKS ================= */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Contributor Profile Card */}
          <GlassCard className="p-6 border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-purple/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden mb-3">
                {profile.avatar ? (
                  <img src={profile.avatar} className="w-full h-full object-cover" alt="User Avatar" />
                ) : (
                  <User className="w-7 h-7 text-white/40" />
                )}
              </div>
              <h3 className="font-bold text-base text-white">{profile.name || "Unnamed Contributor"}</h3>
              <span className="text-[10px] text-white/40 font-mono mt-0.5">{walletAddress}</span>
              
              {/* Profile Social indicators */}
              <div className="flex gap-2.5 items-center justify-center mt-3">
                {profile.github && (
                  <span title={`GitHub: ${profile.github}`} className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                    </svg>
                  </span>
                )}
                {profile.telegram && (
                  <span title={`Telegram: ${profile.telegram}`} className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-sky-400">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="m22 2-7 20-4-9-9-4Z" />
                      <path d="M22 2 11 13" />
                    </svg>
                  </span>
                )}
                {profile.x && (
                  <span title={`X: ${profile.x}`} className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </span>
                )}
              </div>
            </div>

            {/* Reputation metrics overview */}
            <div className="mt-5 pt-4 border-t border-white/5 flex justify-between text-center">
              <div className="flex-1">
                <span className="block text-xs font-bold text-white">{userRankEntry.reputation} XP</span>
                <span className="block text-[8px] text-white/40 uppercase font-semibold mt-0.5">Reputation</span>
              </div>
              <div className="w-px bg-white/5 self-stretch" />
              <div className="flex-1">
                <span className="block text-xs font-bold text-white">Rank #4</span>
                <span className="block text-[8px] text-white/40 uppercase font-semibold mt-0.5">Leaderboard</span>
              </div>
            </div>
          </GlassCard>

          {/* Daily Streak Consistency Tasks */}
          <GlassCard className="p-6 border-white/5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Daily Streak Tasks</h3>
                <p className="text-[9px] text-white/45">Streaks build consistency & earn XP</p>
              </div>
            </div>

            {/* Interactive Tasks Checklist */}
            <div className="space-y-2.5">
              {dailyTasks.map(task => (
                <div 
                  key={task.id} 
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    task.done 
                      ? 'bg-accent-purple/5 border-accent-purple/20 text-white' 
                      : 'bg-white/[0.01] border-white/5 text-white/60 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                      task.done ? 'bg-accent-purple border-accent-purple' : 'border-white/20'
                    }`}>
                      {task.done && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-[11px] font-semibold truncate pr-1">{task.text}</span>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    task.done ? 'bg-accent-purple/20 text-accent-purple' : 'bg-white/5 text-white/40'
                  }`}>
                    +{task.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>

        {/* ================= RIGHT COLUMN: WORKSPACE ENGINE, OPPORTUNITIES & LEADERBOARD ================= */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Double metrics widgets */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Streak Engine */}
            <GlassCard className="p-6 border-white/5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-accent-purple/10 flex items-center justify-center border border-accent-purple/20">
                  <Flame className="w-5 h-5 text-accent-purple" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Streak Engine</h3>
                  <p className="text-[9px] text-white/40">Keep days multiplier active</p>
                </div>
              </div>

              {/* Multiplier grid */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { range: "1-7 D", mult: "1.0x", active: true },
                  { range: "8-30 D", mult: "1.2x", active: true },
                  { range: "31-90 D", mult: "1.5x", active: true },
                  { range: "91+ D", mult: "2.0x", active: false }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      item.active 
                        ? 'bg-accent-purple/5 border-accent-purple/20 text-white' 
                        : 'bg-white/[0.01] border-white/5 opacity-40'
                    }`}
                  >
                    <span className="block text-[7px] text-white/40">{item.range}</span>
                    <span className="block text-xs font-bold mt-0.5 text-accent-purple">{item.mult}</span>
                  </div>
                ))}
              </div>

              {/* Mini-Badges timeline */}
              <div>
                <span className="block text-[8px] uppercase tracking-widest text-white/40 font-bold mb-2">Unlocked Badges</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { name: "Fledgling", days: 7, icon: "🪶" },
                    { name: "Scout", days: 30, icon: "👁️" },
                    { name: "Vanguard", days: 90, icon: "🦅" }
                  ].map((badge) => {
                    const isUnlocked = profile.streakDays >= badge.days;
                    return (
                      <div 
                        key={badge.name} 
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[9px] font-bold ${
                          isUnlocked 
                            ? 'bg-white/5 border-white/10 text-white' 
                            : 'bg-white/[0.01] border-white/5 opacity-30'
                        }`}
                      >
                        <span>{badge.icon}</span>
                        <span>{badge.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Daily check-in button */}
              <div className="mt-5 pt-4 border-t border-white/5">
                <Button 
                  disabled={hasCheckedIn}
                  onClick={handleDailyCheckIn}
                  variant={hasCheckedIn ? "secondary" : "primary"}
                  className="w-full text-xs py-2 h-auto flex items-center justify-center gap-2"
                >
                  <Flame className={`w-4 h-4 ${hasCheckedIn ? 'text-white/45' : 'text-orange-500 animate-bounce'}`} />
                  <span>{hasCheckedIn ? "Checked In Today (+1 Day Streak)" : "Claim Daily Streak Check-in"}</span>
                </Button>
              </div>
            </GlassCard>

            {/* Reputation Scorecard */}
            <GlassCard className="p-6 border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20">
                    <Award className="w-5 h-5 text-accent-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Reputation</h3>
                    <p className="text-[9px] text-white/40">Verified skills distribution</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-accent-cyan">88</span>
                  <span className="text-[10px] text-white/40">/100</span>
                </div>
              </div>

              {/* Progress bars */}
              <div className="space-y-3">
                {[
                  { label: "Code Contributions", score: "80/100", width: "w-[80%]", color: "bg-accent-purple" },
                  { label: "Academy Modules", score: "90/100", width: "w-[90%]", color: "bg-accent-blue" },
                  { label: "Community Support", score: "65/100", width: "w-[65%]", color: "bg-accent-cyan" }
                ].map((skill, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold">
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

          </div>

          {/* Opportunities Hub (Inline Tabbed Panel) */}
          <GlassCard id="pathways" className="p-6 border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-white">Ecosystem Opportunities</h3>
                <p className="text-[10px] text-white/50 mt-0.5">Explore active listings verified through your on-chain reputation</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/5 mb-5">
              {[
                { id: "jobs", label: "Jobs", icon: Briefcase },
                { id: "hackathons", label: "Hackathons", icon: Trophy },
                { id: "contests", label: "Contests", icon: Award }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-all -mb-px ${
                      isActive 
                        ? "border-accent-purple text-white bg-white/[0.01]" 
                        : "border-transparent text-white/40 hover:text-white/70"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
              {activeTab === "jobs" && jobs.map((job, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-white">{job.title}</h4>
                    <span className="text-[10px] text-white/40">{job.company} • {job.location}</span>
                    <div className="flex gap-2 mt-1.5">
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple font-bold">
                        {job.type}
                      </span>
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40 font-bold">
                        {job.salary}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1 text-[10px] py-1 h-auto">
                    Apply <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              ))}

              {activeTab === "hackathons" && hackathons.map((hack, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-white">{hack.title}</h4>
                    <span className="text-[10px] text-white/40">Hosted by {hack.host} • {hack.dates}</span>
                    <div className="mt-1.5">
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue font-bold">
                        Prize: {hack.prizePool}
                      </span>
                    </div>
                  </div>
                  <Button variant="primary" size="sm" className="flex items-center gap-1 text-[10px] py-1 h-auto">
                    Register <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              ))}

              {activeTab === "contests" && contests.map((contest, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-white">{contest.title}</h4>
                    <span className="text-[10px] text-white/40">{contest.participants} • {contest.deadline}</span>
                    <div className="mt-1.5">
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan font-bold">
                        Prize: {contest.prizePool}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1 text-[10px] py-1 h-auto">
                    Submit <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Leaders board ranking list */}
          <GlassCard id="dashboard" className="p-6 border-white/5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20">
                <Trophy className="w-5 h-5 text-accent-blue" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Top Contributors Leaderboard</h3>
                <p className="text-[9px] text-white/40">Verified on-chain reputation ranking</p>
              </div>
            </div>

            <div className="space-y-2">
              {fullLeaderboard.map((user) => {
                const isUser = user.isUser;
                return (
                  <div 
                    key={user.rank} 
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      isUser 
                        ? 'bg-accent-purple/10 border-accent-purple/40 shadow-[0_0_20px_rgba(147,51,234,0.1)]' 
                        : 'bg-white/[0.01] border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-5 text-xs font-bold text-white/50 text-center">
                        #{user.rank}
                      </div>
                      
                      {/* Avatar */}
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {user.avatar ? (
                          <img src={user.avatar} className="w-full h-full object-cover" alt={user.name} />
                        ) : (
                          <User className="w-4 h-4 text-white/40" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <span className="block text-xs font-bold text-white truncate max-w-[120px] sm:max-w-none">{user.name}</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="inline-block text-[8px] px-1 py-0.5 rounded bg-white/5 border border-white/10 text-white/50 font-bold">
                            {user.badge}
                          </span>
                          
                          {/* Social handles badges */}
                          <div className="flex gap-1 items-center ml-1">
                            {user.socials.github && (
                              <span title={`GitHub: ${user.socials.github}`} className="text-white opacity-85">
                                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                                </svg>
                              </span>
                            )}
                            {user.socials.telegram && (
                              <span title={`Telegram: ${user.socials.telegram}`} className="text-sky-400">
                                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <path d="m22 2-7 20-4-9-9-4Z" />
                                  <path d="M22 2 11 13" />
                                </svg>
                              </span>
                            )}
                            {user.socials.x && (
                              <span title={`X: ${user.socials.x}`} className="text-white opacity-85">
                                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="block text-xs font-black text-white">{user.reputation}</span>
                      <span className="block text-[8px] text-white/40 uppercase font-semibold">Reputation</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
}
