"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Award, Briefcase, Code, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: string; // "job" | "hackathon" | "bounty"
  prizePool: string;
  deadline: string;
  xpRequired: number;
  status: "active" | "completed";
}

export default function AdminOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isOpen, setIsOpen] = useState(false);
  const [editingOpp, setEditingOpp] = useState<Opportunity | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "job",
    prizePool: "",
    deadline: "",
    xpRequired: 0,
    status: "active" as "active" | "completed"
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: "success" | "error" } | null>(null);

  const fetchOpportunities = async () => {
    try {
      const token = localStorage.getItem("raven_admin_token");
      const res = await fetch("/api/admin/opportunities", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setOpportunities(data.opportunities || []);
    } catch (err) {
      console.error("Failed to load opportunities", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const openCreateModal = () => {
    setEditingOpp(null);
    setForm({
      title: "",
      description: "",
      type: "job",
      prizePool: "",
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      xpRequired: 100,
      status: "active"
    });
    setIsOpen(true);
  };

  const openEditModal = (opp: Opportunity) => {
    setEditingOpp(opp);
    setForm({
      title: opp.title,
      description: opp.description,
      type: opp.type,
      prizePool: opp.prizePool,
      deadline: opp.deadline,
      xpRequired: opp.xpRequired,
      status: opp.status
    });
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("raven_admin_token");
      const isEdit = !!editingOpp;
      const url = "/api/admin/opportunities";
      const method = isEdit ? "PUT" : "POST";
      
      const payload = {
        ...(isEdit ? { id: editingOpp.id } : {}),
        title: form.title,
        description: form.description,
        type: form.type,
        prizePool: form.prizePool,
        deadline: form.deadline,
        xpRequired: Number(form.xpRequired),
        status: form.status
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ 
          text: `Opportunity ${isEdit ? "updated" : "published"} successfully!`, 
          type: "success" 
        });
        
        if (isEdit) {
          setOpportunities(prev => prev.map(o => o.id === editingOpp.id ? data.opportunity : o));
        } else {
          setOpportunities(prev => [...prev, data.opportunity]);
        }

        setTimeout(() => {
          setIsOpen(false);
          setMessage(null);
        }, 1000);
      } else {
        setMessage({ text: data.error || "Failed to save listing", type: "error" });
      }
    } catch (err: any) {
      setMessage({ text: err.message || "An error occurred", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (oppId: string) => {
    setDeleting(true);
    try {
      const token = localStorage.getItem("raven_admin_token");
      const res = await fetch(`/api/admin/opportunities?id=${oppId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setOpportunities(prev => prev.filter(o => o.id !== oppId));
        setDeletingId(null);
      }
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-white">
        <div className="w-8 h-8 border-2 border-[#00F0FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "job":
        return <Briefcase className="w-4 h-4 text-[#00F0FF]" />;
      case "hackathon":
        return <Code className="w-4 h-4 text-[#A060FF]" />;
      default:
        return <Award className="w-4 h-4 text-[#00FFCC]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Opportunities Board</h2>
          <p className="text-xs text-white/40">Publish developer jobs, launch ecosystem hackathons, or draft bounties</p>
        </div>
        <Button 
          onClick={openCreateModal}
          className="bg-[#00F0FF] text-black font-semibold hover:bg-[#00D0EE] flex items-center gap-1.5 text-xs py-2 px-4 rounded-xl"
        >
          <Plus className="w-4 h-4 stroke-[3px]" />
          New Opportunity
        </Button>
      </div>

      {/* Opportunities List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {opportunities.length === 0 ? (
          <div className="col-span-full p-10 rounded-2xl bg-obsidian border border-white/5 text-xs text-white/30 text-center">
            No active or archived opportunities found on the registry.
          </div>
        ) : (
          opportunities.map((opp) => (
            <div key={opp.id} className="p-6 rounded-2xl bg-obsidian border border-white/5 hover:border-white/10 flex flex-col justify-between transition-all shadow-2xl group relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center border border-white/5">
                      {getIcon(opp.type)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">{opp.type}</span>
                  </div>
                  <span className={`inline-flex px-2 py-0.5 rounded text-[8px] font-bold uppercase border ${
                    opp.status === "active" 
                      ? "bg-[#00FFCC]/10 border-[#00FFCC]/20 text-[#00FFCC]" 
                      : "bg-white/5 border-white/10 text-white/40"
                  }`}>
                    {opp.status}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-white tracking-tight leading-snug">{opp.title}</h4>
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-3">{opp.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="block text-[8px] font-bold uppercase tracking-wider text-white/30">Prize Pool</span>
                    <span className="block text-xs font-extrabold text-[#00F0FF] mt-0.5">{opp.prizePool}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="block text-[8px] font-bold uppercase tracking-wider text-white/30">Required Rank</span>
                    <span className="block text-xs font-extrabold text-[#A060FF] mt-0.5">{opp.xpRequired} XP</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-5 mt-5 border-t border-white/5">
                <span className="text-[9px] text-white/30 font-medium">Deadline: {opp.deadline}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(opp)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-[#00F0FF]/10 text-white/60 hover:text-[#00F0FF] border border-white/10 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeletingId(opp.id)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-[#FF0055]/10 text-white/60 hover:text-[#FF0055] border border-white/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-obsidian border border-white/10 rounded-2xl p-6 glass shadow-2xl">
            <div className="flex items-center gap-3 text-[#FF0055] mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#FF0055]/10 border border-[#FF0055]/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Revoke Opportunity</h4>
                <p className="text-[10px] text-white/40">This action is permanent</p>
              </div>
            </div>
            <p className="text-xs text-white/60 leading-relaxed mb-6">
              Are you sure you want to permanently delete this listing? Registered developers will no longer be able to submit solutions or apply.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setDeletingId(null)}
                className="flex-1 rounded-xl text-xs py-3 h-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(deletingId)}
                disabled={deleting}
                className="flex-1 rounded-xl text-xs py-3 h-auto bg-[#FF0055] text-white font-semibold hover:bg-[#EE0044] transition-all"
              >
                {deleting ? "Decommissioning..." : "Confirm Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Form Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-obsidian border border-white/10 rounded-2xl p-6 glass shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-white">
                {editingOpp ? "Configure Opportunity" : "Launch Opportunity"}
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {message && (
              <div className={`w-full text-xs py-3 px-4 rounded-xl mb-4 ${
                message.type === "success" 
                  ? "bg-[#00FFCC]/10 border border-[#00FFCC]/20 text-[#00FFCC]" 
                  : "bg-[#FF0055]/10 border border-[#FF0055]/20 text-[#FF0055]"
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TON Smart Contract Auditor"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-[#00F0FF]/30 transition-all rounded-xl p-3 text-xs text-white placeholder-white/20 outline-none"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Description</label>
                <textarea
                  required
                  placeholder="Describe opportunity objectives, rewards, and technical deliverables."
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-[#00F0FF]/30 transition-all rounded-xl p-3 text-xs text-white placeholder-white/20 outline-none resize-none"
                />
              </div>

              {/* Type & Status selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-obsidian border border-white/10 focus:border-[#00F0FF]/30 transition-all rounded-xl p-3 text-xs text-white outline-none"
                  >
                    <option value="job">Job</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="bounty">Bounty</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                    className="w-full bg-obsidian border border-white/10 focus:border-[#00F0FF]/30 transition-all rounded-xl p-3 text-xs text-white outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed / Closed</option>
                  </select>
                </div>
              </div>

              {/* Prize Pool & XP Required */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Prize Pool / Compensation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. $15,000 USD Pool"
                    value={form.prizePool}
                    onChange={(e) => setForm({ ...form, prizePool: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-[#00F0FF]/30 transition-all rounded-xl p-3 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Gating Reputation (XP)</label>
                  <input
                    type="number"
                    required
                    value={form.xpRequired}
                    onChange={(e) => setForm({ ...form, xpRequired: Number(e.target.value) })}
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-[#00F0FF]/30 transition-all rounded-xl p-3 text-xs text-white outline-none"
                  />
                </div>
              </div>

              {/* Deadline */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Deadline Date</label>
                <input
                  type="date"
                  required
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className="w-full bg-white/[0.03] border border-[#ffffff15] rounded-xl p-3 text-xs text-white outline-none focus:border-[#00F0FF]/30"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsOpen(false)} 
                  className="flex-1 rounded-xl text-xs py-3.5 h-auto"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={saving}
                  className="flex-1 rounded-xl text-xs py-3.5 h-auto bg-[#00F0FF] text-black font-semibold hover:bg-[#00D0EE]"
                >
                  {saving ? "Publishing..." : (editingOpp ? "Save Settings" : "Publish")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
