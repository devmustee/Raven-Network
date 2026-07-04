"use client";

import React, { useState, useRef } from "react";
import { X, Camera, User } from "lucide-react";
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
  const gradientId = `badge-grad-modal-${name.toLowerCase()}`;
  if (name === "Fledgling") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
        </defs>
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z" stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="16" y1="8" x2="2" y2="22" stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  if (name === "Scout") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" stroke={`url(#${gradientId})`} strokeWidth="2"/>
        <circle cx="12" cy="12" r="3" fill={`url(#${gradientId})`}/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke={`url(#${gradientId})`} strokeWidth="1.5" strokeDasharray="3 3"/>
      </svg>
    );
  }
  if (name === "Vanguard") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6v12M8 10h8" stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  if (name === "Shadow") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#6B21A8" />
          </linearGradient>
        </defs>
        <path d="M12 2L2 12l10 10 10-10L12 2z" stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6l-6 6 6 6 6-6-6-6z" fill={`url(#${gradientId})`} opacity="0.4"/>
      </svg>
    );
  }
  if (name === "Legend") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" fill={`url(#${gradientId})`} stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 20h18" stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  return null;
}

export function ProfileModal({ isOpen, onClose, profile, onSave }: ProfileModalProps) {
  const [formData, setFormData] = useState<ProfileData>({ ...profile });
  const [error, setError] = useState<string | null>(null);
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
              
              <div className="grid grid-cols-5 gap-2">
                {[
                  { name: "Fledgling", days: 7, icon: "🪶", color: "from-accent-purple/20 to-accent-purple/5 border-accent-purple/20 text-accent-purple" },
                  { name: "Scout", days: 30, icon: "👁️", color: "from-accent-blue/20 to-accent-blue/5 border-accent-blue/20 text-accent-blue" },
                  { name: "Vanguard", days: 90, icon: "🦅", color: "from-accent-cyan/20 to-accent-cyan/5 border-accent-cyan/20 text-accent-cyan" },
                  { name: "Shadow", days: 180, icon: "🛡️", color: "from-purple-900/20 to-purple-900/5 border-purple-900/20 text-purple-400" },
                  { name: "Legend", days: 365, icon: "👑", color: "from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-500" }
                ].map((badge) => {
                  const isUnlocked = formData.streakDays >= badge.days;
                  return (
                    <div 
                      key={badge.name} 
                      className={`relative flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                        isUnlocked 
                          ? `bg-gradient-to-b ${badge.color} shadow-[0_0_15px_rgba(255,255,255,0.02)]`
                          : "bg-white/[0.01] border-white/5 opacity-30 select-none"
                      }`}
                    >
                      <BadgeIcon name={badge.name} className="w-5 h-5 mb-1.5" />
                      <span className="block text-[8px] font-bold text-white truncate max-w-full">{badge.name}</span>
                      <span className="block text-[7px] text-white/45 mt-0.5">{badge.days}D</span>

                      {!isUnlocked && (
                        <div className="absolute top-1 right-1">
                          <svg className="w-2.5 h-2.5 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </div>
                      )}
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
    </div>
  );
}
