"use client";

import React, { useState } from "react";
import { X, Briefcase, Trophy, Award, ExternalLink } from "lucide-react";
import { Button } from "./button";
import { GlassCard } from "./glass-card";

interface OpportunitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export function OpportunitiesModal({ isOpen, onClose }: OpportunitiesModalProps) {
  const [activeTab, setActiveTab] = useState<"jobs" | "hackathons" | "contests">("jobs");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-black border border-white/10 rounded-2xl p-6 glass shadow-[0_0_50px_rgba(147,51,234,0.15)] overflow-hidden">
        {/* Background glowing orb */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Ecosystem Opportunities</h3>
            <p className="text-xs text-white/50 mt-0.5">Explore active listings verified through your on-chain reputation</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Custom Tab Bar */}
        <div className="flex border-b border-white/5 mb-6">
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
                className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all -mb-px ${
                  isActive 
                    ? "border-accent-purple text-white bg-white/[0.02]" 
                    : "border-transparent text-white/45 hover:text-white/70"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
          {activeTab === "jobs" && (
            <div className="space-y-3">
              {jobs.map((job, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">{job.title}</h4>
                    <span className="text-xs text-white/50">{job.company} • {job.location}</span>
                    <div className="flex gap-2 mt-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple font-medium">
                        {job.type}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 font-medium">
                        {job.salary}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5 self-start sm:self-center">
                    Apply Now <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "hackathons" && (
            <div className="space-y-3">
              {hackathons.map((hack, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">{hack.title}</h4>
                    <span className="text-xs text-white/50">Hosted by {hack.host} • {hack.dates}</span>
                    <div className="mt-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue font-bold">
                        Prize Pool: {hack.prizePool}
                      </span>
                    </div>
                  </div>
                  <Button variant="primary" size="sm" className="flex items-center gap-1.5 self-start sm:self-center">
                    Register <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "contests" && (
            <div className="space-y-3">
              {contests.map((contest, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">{contest.title}</h4>
                    <span className="text-xs text-white/50">{contest.participants} submitted</span>
                    <div className="flex gap-2 mt-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan font-bold">
                        Prize: {contest.prizePool}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40 font-medium">
                        {contest.deadline}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5 self-start sm:self-center">
                    Submit Entry <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 text-[10px] text-white/40 text-center leading-relaxed">
          *Some opportunities require specific on-chain reputation scores to apply. Verify your developer metrics in the dashboard.
        </div>
      </div>
    </div>
  );
}
