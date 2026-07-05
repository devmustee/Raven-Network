"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, BookOpen, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Quest {
  id: string;
  title: string;
  description: string;
  category: "morning" | "evening" | "night" | "goals";
  xpReward: number;
  verificationType: "manual" | "twitter_retweet" | "telegram_join" | "github_commit";
  verificationMeta?: any;
}

export default function AdminQuestsPage() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modals state
  const [isOpen, setIsOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "morning" as "morning" | "evening" | "night" | "goals",
    xpReward: 15,
    verificationType: "manual" as "manual" | "twitter_retweet" | "telegram_join" | "github_commit",
    verificationMetaJson: "{}"
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: "success" | "error" } | null>(null);

  const fetchQuests = async () => {
    try {
      const token = localStorage.getItem("raven_admin_token");
      const res = await fetch("/api/admin/quests", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setQuests(data.quests || []);
    } catch (err) {
      console.error("Failed to load quests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  const openCreateModal = () => {
    setEditingQuest(null);
    setForm({
      title: "",
      description: "",
      category: "morning",
      xpReward: 15,
      verificationType: "manual",
      verificationMetaJson: "{}"
    });
    setIsOpen(true);
  };

  const openEditModal = (quest: Quest) => {
    setEditingQuest(quest);
    setForm({
      title: quest.title,
      description: quest.description,
      category: quest.category,
      xpReward: quest.xpReward,
      verificationType: quest.verificationType,
      verificationMetaJson: JSON.stringify(quest.verificationMeta || {}, null, 2)
    });
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    let parsedMeta = {};
    try {
      parsedMeta = JSON.parse(form.verificationMetaJson || "{}");
    } catch (err) {
      setMessage({ text: "Verification Meta must be a valid JSON object", type: "error" });
      setSaving(false);
      return;
    }

    try {
      const token = localStorage.getItem("raven_admin_token");
      const isEdit = !!editingQuest;
      const url = "/api/admin/quests";
      const method = isEdit ? "PUT" : "POST";
      
      const payload = {
        ...(isEdit ? { id: editingQuest.id } : {}),
        title: form.title,
        description: form.description,
        category: form.category,
        xpReward: Number(form.xpReward),
        verificationType: form.verificationType,
        verificationMeta: parsedMeta
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
          text: `Quest ${isEdit ? "updated" : "created"} successfully!`, 
          type: "success" 
        });
        
        if (isEdit) {
          setQuests(prev => prev.map(q => q.id === editingQuest.id ? data.quest : q));
        } else {
          setQuests(prev => [...prev, data.quest]);
        }

        setTimeout(() => {
          setIsOpen(false);
          setMessage(null);
        }, 1000);
      } else {
        setMessage({ text: data.error || "Failed to save quest", type: "error" });
      }
    } catch (err: any) {
      setMessage({ text: err.message || "An error occurred", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (questId: string) => {
    setDeleting(true);
    try {
      const token = localStorage.getItem("raven_admin_token");
      const res = await fetch(`/api/admin/quests?id=${questId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setQuests(prev => prev.filter(q => q.id !== questId));
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

  // Group Quests by Category for clear representation
  const categories = [
    { key: "morning", label: "🌅 Morning Checklist" },
    { key: "evening", label: "🌇 Evening Checklist" },
    { key: "night", label: "🌃 Night Checklist" },
    { key: "goals", label: "🚀 Long-Term Objectives" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight font-sans">Quest Deployment</h2>
          <p className="text-xs text-white/40">Manage tasks, reward XP triggers, and verification parameters</p>
        </div>
        <Button 
          onClick={openCreateModal}
          className="bg-[#00F0FF] text-black font-semibold hover:bg-[#00D0EE] flex items-center gap-1.5 text-xs py-2 px-4 rounded-xl"
        >
          <Plus className="w-4 h-4 stroke-[3px]" />
          Launch Quest
        </Button>
      </div>

      {/* Quests Listing Container */}
      <div className="space-y-8">
        {categories.map((cat) => {
          const catQuests = quests.filter(q => q.category === cat.key);
          return (
            <div key={cat.key} className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#00F0FF] px-1">{cat.label}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {catQuests.length === 0 ? (
                  <div className="md:col-span-2 xl:col-span-3 p-6 rounded-2xl bg-[#0B0B0C] border border-white/5 text-xs text-white/30 text-center">
                    No quests deployed in this category yet.
                  </div>
                ) : (
                  catQuests.map((quest) => (
                    <div key={quest.id} className="p-5 rounded-2xl bg-[#0B0B0C] border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all shadow-xl group">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-[#A060FF] uppercase tracking-wider">
                            {quest.verificationType.replace("_", " ")}
                          </span>
                          <span className="text-xs font-black text-[#00FFCC]">{quest.xpReward} XP</span>
                        </div>
                        <h4 className="text-sm font-bold text-white leading-tight">{quest.title}</h4>
                        <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{quest.description}</p>
                      </div>

                      <div className="flex justify-between items-center pt-5 mt-4 border-t border-white/5">
                        <span className="text-[10px] text-white/30 font-mono">ID: {quest.id}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => openEditModal(quest)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-[#00F0FF]/10 text-white/60 hover:text-[#00F0FF] border border-white/10 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeletingId(quest.id)}
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
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-[#0B0B0C] border border-white/10 rounded-2xl p-6 glass shadow-2xl">
            <div className="flex items-center gap-3 text-[#FF0055] mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#FF0055]/10 border border-[#FF0055]/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Decommission Quest</h4>
                <p className="text-[10px] text-white/40">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-xs text-white/60 leading-relaxed mb-6">
              Are you sure you want to permanently delete this quest? Active users will no longer be able to complete or earn XP from this checklist item.
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
          <div className="relative w-full max-w-md bg-[#0B0B0C] border border-white/10 rounded-2xl p-6 glass shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-white">
                {editingQuest ? "Configure Quest Settings" : "Deploy New Quest"}
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
              {/* Quest Title */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Quest Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Host Web3 Meetup"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-[#00F0FF]/30 transition-all rounded-xl p-3 text-xs text-white placeholder-white/20 outline-none"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Description / Directives</label>
                <textarea
                  required
                  placeholder="Provide checklist requirements and instructions for developers."
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-[#00F0FF]/30 transition-all rounded-xl p-3 text-xs text-white placeholder-white/20 outline-none resize-none"
                />
              </div>

              {/* Category & XP reward */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full bg-[#0B0B0C] border border-white/10 focus:border-[#00F0FF]/30 transition-all rounded-xl p-3 text-xs text-white outline-none"
                  >
                    <option value="morning">Morning Checklist</option>
                    <option value="evening">Evening Checklist</option>
                    <option value="night">Night Checklist</option>
                    <option value="goals">Long-term Objectives</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">XP Reward</label>
                  <input
                    type="number"
                    required
                    value={form.xpReward}
                    onChange={(e) => setForm({ ...form, xpReward: Number(e.target.value) })}
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-[#00F0FF]/30 transition-all rounded-xl p-3 text-xs text-white outline-none"
                  />
                </div>
              </div>

              {/* Verification Type */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Verification Type</label>
                <select
                  value={form.verificationType}
                  onChange={(e) => setForm({ ...form, verificationType: e.target.value as any })}
                  className="w-full bg-[#0B0B0C] border border-white/10 focus:border-[#00F0FF]/30 transition-all rounded-xl p-3 text-xs text-white outline-none"
                >
                  <option value="manual">Manual Verification</option>
                  <option value="twitter_retweet">Twitter Engagement (Retweet)</option>
                  <option value="telegram_join">Telegram Verification</option>
                  <option value="github_commit">Github Code Commit</option>
                </select>
              </div>

              {/* Verification Meta (JSON) */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Verification Metadata (JSON)</label>
                  <span className="text-[9px] text-white/30 font-medium">Optional setup parameters</span>
                </div>
                <textarea
                  placeholder='e.g. { "tweetId": "123456" }'
                  rows={2}
                  value={form.verificationMetaJson}
                  onChange={(e) => setForm({ ...form, verificationMetaJson: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-[#00F0FF]/30 transition-all rounded-xl p-3 text-xs font-mono text-white placeholder-white/20 outline-none resize-none"
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
                  {saving ? "Deploying..." : (editingQuest ? "Save Settings" : "Deploy Quest")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
