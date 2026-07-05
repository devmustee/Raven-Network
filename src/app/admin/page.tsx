"use client";

import React, { useEffect, useState } from "react";
import { 
  Users, 
  BookOpen, 
  Award, 
  CheckSquare, 
  ArrowUpRight, 
  Clock, 
  Check, 
  X, 
  ShieldCheck 
} from "lucide-react";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  role: string;
}

interface Quest {
  id: string;
  title: string;
}

interface Opportunity {
  id: string;
  title: string;
  status: string;
}

interface Submission {
  id: string;
  userId: string;
  opportunityId: string;
  submissionLink: string;
  isApproved: boolean;
  submittedAt: string;
  userName: string;
  opportunityTitle: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("raven_admin_token");
      const headers = { Authorization: `Bearer ${token}` };

      const [usersRes, questsRes, oppsRes, subsRes] = await Promise.all([
        fetch("/api/admin/users", { headers }),
        fetch("/api/admin/quests", { headers }),
        fetch("/api/admin/opportunities", { headers }),
        fetch("/api/admin/submissions", { headers })
      ]);

      const [usersData, questsData, oppsData, subsData] = await Promise.all([
        usersRes.json(),
        questsRes.json(),
        oppsRes.json(),
        subsRes.json()
      ]);

      setUsers(usersData.users || []);
      setQuests(questsData.quests || []);
      setOpportunities(oppsData.opportunities || []);
      setSubmissions(subsData.submissions || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleApproveSubmission = async (submissionId: string, approve: boolean) => {
    setActionLoading(submissionId);
    try {
      const token = localStorage.getItem("raven_admin_token");
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ submissionId, isApproved: approve })
      });
      const data = await res.json();
      if (data.success) {
        // Refresh local state
        setSubmissions(prev => 
          prev.map(sub => sub.id === submissionId ? { ...sub, isApproved: approve } : sub)
        );
      }
    } catch (err) {
      console.error("Failed to update submission status:", err);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-white">
        <div className="w-8 h-8 border-2 border-[#00F0FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Calculate Metrics
  const totalUsers = users.length;
  const activeQuests = quests.length;
  const activeOpportunities = opportunities.filter(o => o.status === "active").length;
  const pendingSubmissions = submissions.filter(s => !s.isApproved);
  const totalSubmissionsCount = submissions.length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative p-8 rounded-2xl bg-gradient-to-r from-[#0B0B0C] to-[#121214] border border-white/10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#00F0FF]/15 to-[#A060FF]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white mb-2">Welcome Back, Overseer</h2>
            <p className="text-sm text-white/50 leading-relaxed max-w-xl">
              Monitor user metrics, verify proof-of-work contributions, manage quests, and launch opportunities to empower the Raven Network developer community.
            </p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#00FFCC]/10 border border-[#00FFCC]/20 text-xs font-semibold text-[#00FFCC] self-start md:self-auto">
            <ShieldCheck className="w-4 h-4" />
            System Live (Persistent Mode)
          </div>
        </div>
      </div>

      {/* Grid Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Users */}
        <div className="p-6 rounded-2xl bg-[#0B0B0C] border border-white/5 hover:border-white/10 transition-all duration-300 shadow-xl group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/60 group-hover:bg-[#00F0FF]/10 group-hover:text-[#00F0FF] transition-colors">
              <Users className="w-5 h-5" />
            </div>
            <Link href="/admin/users" className="text-white/40 hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <span className="block text-2xl font-black text-white">{totalUsers}</span>
          <span className="block text-xs text-white/40 font-medium mt-1">Total Members</span>
        </div>

        {/* Quests */}
        <div className="p-6 rounded-2xl bg-[#0B0B0C] border border-white/5 hover:border-white/10 transition-all duration-300 shadow-xl group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/60 group-hover:bg-[#A060FF]/10 group-hover:text-[#A060FF] transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <Link href="/admin/quests" className="text-white/40 hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <span className="block text-2xl font-black text-white">{activeQuests}</span>
          <span className="block text-xs text-white/40 font-medium mt-1">Total Quests</span>
        </div>

        {/* Opportunities */}
        <div className="p-6 rounded-2xl bg-[#0B0B0C] border border-white/5 hover:border-white/10 transition-all duration-300 shadow-xl group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/60 group-hover:bg-[#00FFCC]/10 group-hover:text-[#00FFCC] transition-colors">
              <Award className="w-5 h-5" />
            </div>
            <Link href="/admin/opportunities" className="text-white/40 hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <span className="block text-2xl font-black text-white">{activeOpportunities}</span>
          <span className="block text-xs text-white/40 font-medium mt-1">Active Listings</span>
        </div>

        {/* Submissions */}
        <div className="p-6 rounded-2xl bg-[#0B0B0C] border border-white/5 hover:border-white/10 transition-all duration-300 shadow-xl group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/60 group-hover:bg-[#FF0055]/10 group-hover:text-[#FF0055] transition-colors">
              <CheckSquare className="w-5 h-5" />
            </div>
            <Link href="/admin/submissions" className="text-white/40 hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <span className="block text-2xl font-black text-white">{pendingSubmissions.length}</span>
          <span className="block text-xs text-white/40 font-medium mt-1">Pending Proof-of-Work</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Submissions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Pending Proof-of-Work Verification</h3>
              <p className="text-xs text-white/40">Approve or reject developer bounty and job applications</p>
            </div>
            <Link href="/admin/submissions" className="text-xs text-[#00F0FF] hover:underline font-bold">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {pendingSubmissions.length === 0 ? (
              <div className="p-8 rounded-2xl bg-[#0B0B0C] border border-white/5 text-center text-white/40 text-xs">
                All submissions verified! Clean queue.
              </div>
            ) : (
              pendingSubmissions.slice(0, 3).map((sub) => (
                <div key={sub.id} className="p-5 rounded-2xl bg-[#0B0B0C] border border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <span className="inline-flex px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-bold text-[#00F0FF] uppercase">
                      {sub.opportunityTitle}
                    </span>
                    <h4 className="text-sm font-semibold text-white mt-1">Submitted by {sub.userName}</h4>
                    <a 
                      href={sub.submissionLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 text-xs text-[#A060FF] hover:underline font-medium"
                    >
                      View Submission Link
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2 self-end md:self-auto">
                    <button
                      disabled={actionLoading === sub.id}
                      onClick={() => handleApproveSubmission(sub.id, false)}
                      className="p-2.5 rounded-xl border border-white/10 hover:border-[#FF0055]/30 hover:bg-[#FF0055]/10 text-white/60 hover:text-[#FF0055] transition-all disabled:opacity-50"
                      title="Reject Submission"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button
                      disabled={actionLoading === sub.id}
                      onClick={() => handleApproveSubmission(sub.id, true)}
                      className="px-4 py-2 rounded-xl bg-[#00F0FF] text-black font-semibold hover:bg-[#00D0EE] transition-all flex items-center gap-1.5 text-xs disabled:opacity-50"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3px]" />
                      Verify
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* System Activity & Settings */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white">System Status</h3>
            <p className="text-xs text-white/40">Internal registry log tracker</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B0B0C] border border-white/5 space-y-5">
            <div className="flex items-center justify-between text-xs pb-4 border-b border-white/5">
              <span className="text-white/40">Total Submissions Checked</span>
              <span className="font-semibold text-white">{totalSubmissionsCount}</span>
            </div>
            
            <div className="flex items-center justify-between text-xs pb-4 border-b border-white/5">
              <span className="text-white/40">Database persistence</span>
              <span className="font-semibold text-green-400">PERSISTENT (.data/db.json)</span>
            </div>

            <div className="space-y-3.5 pt-1">
              <span className="block text-[10px] uppercase font-bold tracking-widest text-white/40">Active Admins</span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#A060FF] flex items-center justify-center font-black text-[10px] text-black">
                  HQ
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">Raven HQ Admin</span>
                  <span className="block text-[9px] text-[#00F0FF] font-semibold">Active Session</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
