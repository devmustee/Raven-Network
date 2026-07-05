"use client";

import React, { useEffect, useState } from "react";
import { CheckSquare, ArrowUpRight, Check, X, Clock, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Submission {
  id: string;
  userId: string;
  opportunityId: string;
  submissionLink: string;
  isApproved: boolean;
  submittedAt: string;
  userName: string;
  userWallet: string;
  opportunityTitle: string;
  opportunityType: string;
}

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem("raven_admin_token");
      const res = await fetch("/api/admin/submissions", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch (err) {
      console.error("Failed to load submissions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleVerify = async (submissionId: string, approve: boolean) => {
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
        setSubmissions(prev => 
          prev.map(sub => sub.id === submissionId ? { ...sub, isApproved: approve } : sub)
        );
      }
    } catch (err) {
      console.error("Verification operation failed", err);
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

  const pendingCount = submissions.filter(s => !s.isApproved).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Proof-of-Work Reviews</h2>
          <p className="text-xs text-white/40">Verify developer deliverables, smart contract audit submissions, and project links</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white/70">
          <Clock className="w-4 h-4 text-white/40" />
          <span>{pendingCount} Pending Reviews</span>
        </div>
      </div>

      {/* Submissions Table / Grid */}
      <div className="bg-[#0B0B0C] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        {submissions.length === 0 ? (
          <div className="p-12 text-center text-white/30 text-xs font-medium">
            No developer solutions or applications have been submitted yet.
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="px-6 py-4.5 text-[10px] font-bold uppercase tracking-widest text-white/40">Applicant</th>
                <th className="px-6 py-4.5 text-[10px] font-bold uppercase tracking-widest text-white/40">Opportunity Title</th>
                <th className="px-6 py-4.5 text-[10px] font-bold uppercase tracking-widest text-white/40">Submission Deliverable</th>
                <th className="px-6 py-4.5 text-[10px] font-bold uppercase tracking-widest text-white/40">Submitted On</th>
                <th className="px-6 py-4.5 text-[10px] font-bold uppercase tracking-widest text-white/40">Verification Status</th>
                <th className="px-6 py-4.5 text-[10px] font-bold uppercase tracking-widest text-white/40 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="px-6 py-4.5">
                    <div>
                      <span className="block font-semibold text-white">{sub.userName}</span>
                      <span className="block text-[10px] text-white/40 font-mono tracking-tighter truncate max-w-[120px]">{sub.userWallet}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4.5">
                    <div>
                      <span className="block font-semibold text-white">{sub.opportunityTitle}</span>
                      <span className="block text-[9px] uppercase font-bold text-[#A060FF] mt-0.5">{sub.opportunityType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4.5">
                    <a
                      href={sub.submissionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#00F0FF] hover:underline font-semibold"
                    >
                      Verify Link
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </td>
                  <td className="px-6 py-4.5 text-white/50">
                    {new Date(sub.submittedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </td>
                  <td className="px-6 py-4.5">
                    <span className={`inline-flex items-center gap-1.5 font-bold ${
                      sub.isApproved ? "text-[#00FFCC]" : "text-[#FFCC00]"
                    }`}>
                      {sub.isApproved ? (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          Approved
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4" />
                          Awaiting Review
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4.5 text-right">
                    <div className="flex justify-end gap-1.5">
                      {sub.isApproved ? (
                        <button
                          disabled={actionLoading === sub.id}
                          onClick={() => handleVerify(sub.id, false)}
                          className="px-3 py-1.5 rounded-lg border border-[#FF0055]/20 text-[#FF0055] hover:bg-[#FF0055]/10 font-bold transition-all disabled:opacity-50 text-[10px]"
                        >
                          Revoke Approval
                        </button>
                      ) : (
                        <>
                          <button
                            disabled={actionLoading === sub.id}
                            onClick={() => handleVerify(sub.id, false)}
                            className="p-2 rounded-lg border border-white/5 hover:border-[#FF0055]/30 hover:bg-[#FF0055]/10 text-white/40 hover:text-[#FF0055] transition-all disabled:opacity-50"
                            title="Reject"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <button
                            disabled={actionLoading === sub.id}
                            onClick={() => handleVerify(sub.id, true)}
                            className="px-3 py-1.5 rounded-lg bg-[#00F0FF] text-black font-extrabold hover:bg-[#00D0EE] transition-all disabled:opacity-50 text-[10px] flex items-center gap-1"
                          >
                            <Check className="w-3 h-3 stroke-[3px]" />
                            Approve
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
