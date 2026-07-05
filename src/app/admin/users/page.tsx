"use client";

import React, { useEffect, useState } from "react";
import { Search, Edit2, Shield, User as UserIcon, Calendar, Award, Check, X, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  walletAddress: string;
  role: "USER" | "ADMIN" | "VALIDATOR";
  name: string;
  avatar: string;
  github: string;
  telegram: string;
  x: string;
  reputationXP: number;
  streakDays: number;
  isGraduated: boolean;
  createdAt: string;
}

function BadgeIcon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  const badgeMap: Record<string, string> = {
    "Fledgling": "/badges/fledgling.png",
    "Scout": "/badges/scout.png",
    "Vanguard": "/badges/vanguard.png",
    "Shadow": "/badges/shadow.png",
    "Legend": "/badges/legend.png",
  };

  const src = badgeMap[name];
  if (!src) return null;

  return (
    <img src={src} alt={`${name} Badge`} className={`${className} object-contain`} />
  );
}

const getBadgeForUser = (name: string, currentUserStreak: number) => {
  let userStreak = 10;
  if (name === "MustaphaDev") userStreak = 365;
  else if (name === "AfroCoder") userStreak = 120;
  else if (name === "FatimaTON") userStreak = 90;
  else if (name === "KofiWeb3") userStreak = 30;
  else if (name === "Zubairu") userStreak = 15;
  else userStreak = currentUserStreak;

  if (userStreak >= 365) return "Legend";
  if (userStreak >= 180) return "Shadow";
  if (userStreak >= 90) return "Vanguard";
  if (userStreak >= 30) return "Scout";
  if (userStreak >= 7) return "Fledgling";
  return null;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal Edit State
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    role: "USER" as "USER" | "ADMIN" | "VALIDATOR",
    reputationXP: 0,
    streakDays: 0
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: "success" | "error" } | null>(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("raven_admin_token");
      const res = await fetch("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      role: user.role,
      reputationXP: user.reputationXP,
      streakDays: user.streakDays
    });
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setMessage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setSaving(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("raven_admin_token");
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: editingUser.id,
          ...editForm
        })
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ text: "User profile updated successfully!", type: "success" });
        setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...editForm } : u));
        setTimeout(() => {
          closeEditModal();
        }, 1000);
      } else {
        setMessage({ text: data.error || "Failed to update user", type: "error" });
      }
    } catch (err: any) {
      setMessage({ text: err.message || "Network error occurred", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.walletAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.github && user.github.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.telegram && user.telegram.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-white">
        <div className="w-8 h-8 border-2 border-[#00F0FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Users Registry</h2>
          <p className="text-xs text-white/40">Inspect, search, and edit network member credentials and roles</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search name, wallet, social handle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0B0B0C] border border-white/5 hover:border-white/10 focus:border-[#00F0FF]/30 transition-all rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/30 outline-none"
          />
        </div>
      </div>

      {/* Users Table Container */}
      <div className="overflow-x-auto bg-[#0B0B0C] border border-white/5 rounded-2xl shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.01]">
              <th className="px-6 py-4.5 text-[10px] font-bold uppercase tracking-widest text-white/40">Member</th>
              <th className="px-6 py-4.5 text-[10px] font-bold uppercase tracking-widest text-white/40">Wallet Address</th>
              <th className="px-6 py-4.5 text-[10px] font-bold uppercase tracking-widest text-white/40">Role</th>
              <th className="px-6 py-4.5 text-[10px] font-bold uppercase tracking-widest text-white/40">Reputation (XP)</th>
              <th className="px-6 py-4.5 text-[10px] font-bold uppercase tracking-widest text-white/40">Streak</th>
              <th className="px-6 py-4.5 text-[10px] font-bold uppercase tracking-widest text-white/40 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-white/30 font-medium">
                  No members matched your search criteria
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00F0FF]/25 to-[#A060FF]/25 border border-white/5 flex items-center justify-center font-bold text-white/80 overflow-hidden flex-shrink-0">
                      {user.avatar ? (
                        <img src={user.avatar} className="w-full h-full object-cover" alt={user.name} />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-white">{user.name}</span>
                        {(() => {
                          const badgeName = getBadgeForUser(user.name, user.streakDays);
                          return badgeName ? (
                            <BadgeIcon name={badgeName} className="w-3.5 h-3.5" />
                          ) : null;
                        })()}
                      </div>
                      <div className="flex gap-1.5 items-center mt-1">
                        {user.telegram && (
                          <a 
                            href={`https://t.me/${user.telegram}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sky-400 hover:text-sky-300 text-[10px]"
                            title={`Telegram: @${user.telegram}`}
                          >
                            @{user.telegram}
                          </a>
                        )}
                        {user.x && (
                          <a 
                            href={`https://x.com/${user.x.replace('@', '')}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white hover:text-white/80 text-[10px]"
                            title={`X: ${user.x}`}
                          >
                            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          </a>
                        )}
                        {user.github && (
                          <a 
                            href={`https://github.com/${user.github}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white opacity-70 hover:opacity-100"
                            title={`GitHub: ${user.github}`}
                          >
                            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 font-mono text-white/50 text-[11px]">
                      <span className="truncate max-w-[100px]" title={user.walletAddress}>
                        {user.walletAddress}
                      </span>
                      <button 
                        onClick={() => handleCopy(user.walletAddress)}
                        className="text-white/30 hover:text-[#00F0FF] transition-colors"
                        title="Copy Wallet Address"
                      >
                        {copiedAddress === user.walletAddress ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-md text-[9px] font-bold border uppercase tracking-wider ${
                      user.role === "ADMIN" 
                        ? "bg-[#FF0055]/10 border-[#FF0055]/20 text-[#FF0055]" 
                        : user.role === "VALIDATOR"
                        ? "bg-[#A060FF]/10 border-[#A060FF]/20 text-[#A060FF]"
                        : "bg-white/5 border-white/10 text-white/70"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-white">
                    {user.reputationXP} XP
                  </td>
                  <td className="px-6 py-4 text-white/70">
                    🔥 {user.streakDays} Days
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openEditModal(user)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-[#00F0FF]/10 hover:text-[#00F0FF] text-white/60 border border-white/10 transition-colors"
                      title="Edit User Profile"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal Dialog */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0B0B0C] border border-white/10 rounded-2xl p-6 glass shadow-[0_0_50px_rgba(0,240,255,0.1)]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-white">Edit Member Details</h3>
              <button 
                onClick={closeEditModal}
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
              {/* Member Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Member Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-[#00F0FF]/30 transition-all rounded-xl p-3 text-xs text-white placeholder-white/20 outline-none"
                />
              </div>

              {/* Role Select */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Registry Role</label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value as any })}
                  className="w-full bg-[#0B0B0C] border border-white/10 focus:border-[#00F0FF]/30 transition-all rounded-xl p-3 text-xs text-white outline-none"
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="VALIDATOR">VALIDATOR</option>
                </select>
              </div>

              {/* Rep and Streak inputs side-by-side */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Reputation (XP)</label>
                  <input
                    type="number"
                    required
                    value={editForm.reputationXP}
                    onChange={(e) => setEditForm({ ...editForm, reputationXP: Number(e.target.value) })}
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-[#00F0FF]/30 transition-all rounded-xl p-3 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Streak Days</label>
                  <input
                    type="number"
                    required
                    value={editForm.streakDays}
                    onChange={(e) => setEditForm({ ...editForm, streakDays: Number(e.target.value) })}
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-[#00F0FF]/30 transition-all rounded-xl p-3 text-xs text-white outline-none"
                  />
                </div>
              </div>



              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={closeEditModal} 
                  className="flex-1 rounded-xl text-xs py-3.5 h-auto"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={saving}
                  className="flex-1 rounded-xl text-xs py-3.5 h-auto bg-[#00F0FF] text-black font-semibold hover:bg-[#00D0EE]"
                >
                  {saving ? "Saving Updates..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
