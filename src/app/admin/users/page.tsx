"use client";

import React, { useEffect, useState } from "react";
import { Search, Edit2, Shield, User as UserIcon, Calendar, Award, Check, X } from "lucide-react";
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

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal Edit State
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    role: "USER" as "USER" | "ADMIN" | "VALIDATOR",
    reputationXP: 0,
    streakDays: 0,
    isGraduated: false
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
      streakDays: user.streakDays,
      isGraduated: user.isGraduated
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
              <th className="px-6 py-4.5 text-[10px] font-bold uppercase tracking-widest text-white/40">Graduation Status</th>
              <th className="px-6 py-4.5 text-[10px] font-bold uppercase tracking-widest text-white/40 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-white/30 font-medium">
                  No members matched your search criteria
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00F0FF]/25 to-[#A060FF]/25 border border-white/5 flex items-center justify-center font-bold text-white/80">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="block font-semibold text-white">{user.name}</span>
                      <span className="block text-[10px] text-white/40">@{user.telegram || "no_handle"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-white/50 text-[11px] max-w-[150px] truncate" title={user.walletAddress}>
                    {user.walletAddress}
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
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 ${
                      user.isGraduated ? "text-[#00FFCC]" : "text-white/30"
                    } font-semibold`}>
                      {user.isGraduated ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Graduated
                        </>
                      ) : (
                        "Academy In-Progress"
                      )}
                    </span>
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

              {/* Graduation Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div>
                  <span className="block text-xs font-bold text-white">Academy Graduate</span>
                  <span className="block text-[9px] text-white/40">Has verified graduation Flock NFT</span>
                </div>
                <input
                  type="checkbox"
                  checked={editForm.isGraduated}
                  onChange={(e) => setEditForm({ ...editForm, isGraduated: e.target.checked })}
                  className="w-4 h-4 border border-white/20 bg-transparent rounded outline-none checked:bg-[#00F0FF] checked:border-[#00F0FF]"
                />
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
