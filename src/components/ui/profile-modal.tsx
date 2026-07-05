"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, User, Lock, Sparkles } from "lucide-react";
import { Button } from "./button";

export interface ProfileData {
  name: string;
  avatar: string;
  github: string;
  telegram: string;
  x: string;
  tiktok: string;
  instagram: string;
  facebook: string;
  streakDays: number;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSave: (data: ProfileData) => void;
}

export function BadgeIcon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
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

export function ProfileModal({ isOpen, onClose, profile, onSave }: ProfileModalProps) {
  const [formData, setFormData] = useState<ProfileData>({ ...profile });
  const [error, setError] = useState<string | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.telegram.trim() || !formData.x.trim()) {
      setError("Telegram and X (Twitter) handles are required.");
      return;
    }
    setError(null);
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-black border border-white/10 rounded-2xl p-6 glass shadow-[0_0_50px_rgba(147,51,234,0.15)] overflow-hidden">
        {/* Background glowing orb */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Edit Contributor Profile</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center justify-center">
            <div 
              onClick={handleAvatarClick}
              className="relative w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer group overflow-hidden"
            >
              {formData.avatar ? (
                <img src={formData.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-white/30" />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            <span className="text-[10px] text-white/40 mt-2">Click to upload custom picture</span>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2">Display Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter display name"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-purple transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2">GitHub Username</label>
                <input 
                  type="text" 
                  name="github"
                  value={formData.github || ""}
                  onChange={handleChange}
                  placeholder="e.g. octocat"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-purple transition-colors"
                />
              </div>
            </div>

            {/* Social Handles */}
            <div className="border-t border-white/5 pt-4">
              <span className="block text-[10px] uppercase tracking-widest text-white/40 font-bold mb-3">Social Handles</span>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Telegram */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs text-white/60 mb-2">
                    <svg className="w-3.5 h-3.5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m22 2-7 20-4-9-9-4Z" />
                      <path d="M22 2 11 13" />
                    </svg>
                    Telegram <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleChange}
                    placeholder="@username"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-purple"
                  />
                </div>

                {/* X */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs text-white/60 mb-2">
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    X (Twitter) <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="x"
                    value={formData.x}
                    onChange={handleChange}
                    placeholder="@username"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-purple"
                  />
                </div>

                {/* TikTok */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs text-white/60 mb-2">
                    <svg className="w-3.5 h-3.5 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95.89 2.24 1.43 3.58 1.49v3.95c-1.74-.08-3.41-.75-4.73-1.89-.13-.11-.26-.22-.39-.34v6.86c.03 2.12-.9 4.19-2.52 5.56-1.92 1.63-4.66 2.1-7.05 1.22C4.5 20.18 2.8 17.55 3.05 14.8c.25-2.78 2.45-5.12 5.23-5.36 1.15-.09 2.3.17 3.3.75v4.06c-.84-.52-1.85-.71-2.8-.52-1.39.26-2.53 1.43-2.77 2.84-.28 1.62.67 3.23 2.25 3.66 1.44.4 3.05-.22 3.73-1.57.19-.38.28-.79.28-1.22V.02z" />
                    </svg>
                    TikTok
                  </label>
                  <input 
                    type="text" 
                    name="tiktok"
                    value={formData.tiktok}
                    onChange={handleChange}
                    placeholder="@username"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-purple"
                  />
                </div>

                {/* Instagram */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs text-white/60 mb-2">
                    <svg className="w-3.5 h-3.5 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    Instagram
                  </label>
                  <input 
                    type="text" 
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="@username"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-purple"
                  />
                </div>

                {/* Facebook */}
                <div className="sm:col-span-2">
                  <label className="flex items-center gap-1.5 text-xs text-white/60 mb-2">
                    <svg className="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    Facebook
                  </label>
                  <input 
                    type="text" 
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    placeholder="profile URL or username"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-purple"
                  />
                </div>
              </div>
            </div>

            {/* Streak Badges Track */}
            <div className="border-t border-white/5 pt-4">
              <div className="flex justify-between items-center mb-3">
                <span className="block text-[10px] uppercase tracking-widest text-white/40 font-bold">Streak Achievements</span>
                <span className="text-[10px] text-accent-cyan font-bold bg-accent-cyan/10 px-2 py-0.5 rounded-full">
                  {formData.streakDays} Day Streak
                </span>
              </div>
              
              <div className="flex justify-between gap-2 overflow-x-auto pb-2">
                {[
                  { name: "Fledgling", days: 7, color: "rgba(192, 132, 252, 0.4)", border: "rgba(192, 132, 252, 0.4)" },
                  { name: "Scout", days: 30, color: "rgba(96, 165, 250, 0.4)", border: "rgba(96, 165, 250, 0.4)" },
                  { name: "Vanguard", days: 90, color: "rgba(34, 211, 238, 0.4)", border: "rgba(34, 211, 238, 0.4)" },
                  { name: "Shadow", days: 180, color: "rgba(168, 85, 247, 0.4)", border: "rgba(168, 85, 247, 0.4)" },
                  { name: "Legend", days: 365, color: "rgba(251, 191, 36, 0.4)", border: "rgba(251, 191, 36, 0.4)" }
                ].map((badge) => {
                  const isUnlocked = formData.streakDays >= badge.days;
                  return (
                    <div 
                      key={badge.name} 
                      className="flex flex-col items-center gap-2 flex-1 min-w-[70px] cursor-pointer group"
                      onClick={() => setSelectedBadge(badge.name)}
                    >
                      <div 
                        className={`relative w-full aspect-square flex items-center justify-center p-1.5 rounded-xl border transition-all duration-300 group-hover:scale-105 group-active:scale-95 ${
                          isUnlocked 
                            ? 'bg-white/5 shadow-lg' 
                            : 'bg-white/[0.01] border-white/5 opacity-40'
                        }`}
                        style={{
                          boxShadow: isUnlocked ? `0 0 20px ${badge.color}` : 'none',
                          borderColor: isUnlocked ? badge.border : 'rgba(255,255,255,0.05)'
                        }}
                      >
                        {!isUnlocked && (
                          <Lock className="absolute top-1.5 right-1.5 w-3 h-3 text-white/30 z-10" />
                        )}
                        <div className={`w-full h-full flex items-center justify-center overflow-hidden transition-all duration-500 ${!isUnlocked && 'grayscale brightness-50'}`}>
                          <BadgeIcon name={badge.name} className="w-full h-full object-contain" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <span className={`text-[12px] font-bold transition-colors ${isUnlocked ? 'text-white group-hover:text-accent-cyan' : 'text-white/40 group-hover:text-white/60'}`}>{badge.name}</span>
                        <span className="text-[10px] text-white/40 font-semibold mt-0.5">{badge.days}D</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-xs font-bold text-center bg-red-500/10 border border-red-500/20 py-2 rounded-xl">
              {error}
            </div>
          )}

          <div className="pt-4 border-t border-white/5 flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              Save Profile
            </Button>
          </div>
        </form>
      </div>

      <AnimatePresence>
        {selectedBadge && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedBadge(null)}
          >
            {(() => {
              const badgeDefs = [
                { name: "Fledgling", days: 7, color: "rgba(192, 132, 252, 0.5)", desc: "A promising start to your journey." },
                { name: "Scout", days: 30, color: "rgba(96, 165, 250, 0.5)", desc: "You're exploring the ecosystem deeply." },
                { name: "Vanguard", days: 90, color: "rgba(34, 211, 238, 0.5)", desc: "Leading the charge. True dedication." },
                { name: "Shadow", days: 180, color: "rgba(168, 85, 247, 0.5)", desc: "A silent force shaping the network." },
                { name: "Legend", days: 365, color: "rgba(251, 191, 36, 0.5)", desc: "An absolute legend. Unmatched." }
              ];
              const badge = badgeDefs.find(b => b.name === selectedBadge)!;
              const isUnlocked = formData.streakDays >= badge.days;

              return (
                <motion.div 
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 20 }}
                  onClick={e => e.stopPropagation()}
                  className="relative w-full max-w-sm bg-black border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center overflow-hidden shadow-2xl"
                  style={{ boxShadow: isUnlocked ? `0 0 100px ${badge.color}` : 'none' }}
                >
                  <button onClick={() => setSelectedBadge(null)} className="absolute top-4 right-4 text-white/40 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>

                  <div className={`w-40 h-40 mb-6 flex items-center justify-center transition-all duration-700 overflow-hidden rounded-2xl ${!isUnlocked && 'grayscale brightness-50'}`}>
                    <BadgeIcon name={badge.name} className={`w-full h-full object-cover rounded-2xl ${isUnlocked ? 'drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]' : ''}`} />
                  </div>
                  
                  <h3 className={`text-3xl font-black mb-2 tracking-tight ${isUnlocked ? 'text-white' : 'text-white/40'}`}>
                    {badge.name}
                  </h3>
                  
                  <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 inline-flex items-center gap-2">
                    {isUnlocked ? <Sparkles className="w-4 h-4 text-yellow-400" /> : <Lock className="w-4 h-4 text-white/30" />}
                    <span className="text-xs font-bold text-white/80">{badge.days} Day Streak Required</span>
                  </div>

                  <p className="text-sm text-white/50 px-4">
                    {isUnlocked 
                      ? badge.desc 
                      : `You need ${badge.days - formData.streakDays} more streak days to unlock this prestigious achievement.`}
                  </p>

                  {isUnlocked && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6 font-mono text-[10px] text-accent-cyan uppercase tracking-widest"
                    >
                      Achievement Unlocked
                    </motion.div>
                  )}
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
