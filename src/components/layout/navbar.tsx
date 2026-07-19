"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Wallet, X, Check, User } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

import { ProfileData } from "../ui/profile-modal";

const navLinks = [
  { name: "Pathways", href: "#pathways" },
  { name: "Leaderboard", href: "#dashboard" },
  { name: "FAQs", href: "#faqs" },
];

interface NavbarProps {
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
  isConnectModalOpen: boolean;
  setIsConnectModalOpen: (open: boolean) => void;
  profile: ProfileData;
  setProfile?: React.Dispatch<React.SetStateAction<ProfileData>>;
  setIsProfileModalOpen: (open: boolean) => void;
}

export function Navbar({
  walletAddress,
  setWalletAddress,
  isConnectModalOpen,
  setIsConnectModalOpen,
  profile,
  setProfile,
  setIsProfileModalOpen,
}: NavbarProps) {
  const [connectingProvider, setConnectingProvider] = useState<string | null>(null);
  const [connectPhase, setConnectPhase] = useState<"social-login" | "social-verifying" | "nft-eligibility" | "nft-verifying" | "blocked">("social-login");
  const [tempSocialData, setTempSocialData] = useState<{ provider: string, username: string } | null>(null);

  const links = walletAddress 
    ? []
    : [
        { name: "Pathways", href: "#pathways" },
        { name: "Partners", href: "#partners" },
        { name: "FAQs", href: "#faqs" }
      ];

  const handleSocialLogin = (provider: string) => {
    setConnectingProvider(provider);
    setConnectPhase("social-verifying");
    
    setTimeout(() => {
      const username = `@user_${Math.floor(Math.random() * 10000)}`;
      const usernameClean = username.replace("@", "");
      const mockAddress = `EQA_SOCIAL_${provider.toUpperCase()}_${usernameClean.toUpperCase()}`;
      
      // Auto authenticate directly after social login
      fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: mockAddress,
          signature: "mock_signature_" + Date.now(),
          walletName: "Raven Wallet" // Default to Raven Wallet to simulate verification
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const token = data.token;
          localStorage.setItem("raven_user_token", token);
          
          const profileUpdates: any = {
            name: usernameClean,
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${usernameClean}`,
            bio: "Active contributor in the Raven ecosystem.",
            skills: [
              { label: "Rust / Move", score: 65, width: "65%", color: "bg-purple-500" },
              { label: "Frontend dev", score: 80, width: "80%", color: "bg-cyan-500" },
              { label: "Smart Contracts", score: 40, width: "40%", color: "bg-blue-500" }
            ]
          };

          if (provider === "Telegram") {
            profileUpdates.telegram = usernameClean;
          } else if (provider === "GitHub") {
            profileUpdates.github = usernameClean;
          }

          fetch("/api/profile", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(profileUpdates)
          })
          .then(async r => {
            if (!r.ok) {
              const text = await r.text();
              throw new Error(text || `HTTP error! status: ${r.status}`);
            }
            return r.json();
          })
          .then(resData => {
            const finalUser = resData.user || resData;
            if (setProfile) {
              setProfile({
                id: finalUser.id,
                name: finalUser.name || usernameClean,
                avatar: finalUser.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${usernameClean}`,
                telegram: finalUser.telegram || "",
                github: finalUser.github || "",
                x: finalUser.x || "",
                tiktok: "",
                instagram: finalUser.instagram || "",
                facebook: finalUser.facebook || "",
                streakDays: finalUser.streakDays || 0,
                isGraduated: true,
              });
            }
            setWalletAddress(finalUser.walletAddress);
            setIsConnectModalOpen(false);
          });
        }
      })
      .catch(err => {
        console.error("Auth verify failed", err);
        setIsConnectModalOpen(false);
      })
      .finally(() => {
        setConnectingProvider(null);
        setConnectPhase("social-login");
      });
    }, 1500);
  };


  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b-0 border-white/5 bg-black/50">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 relative flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Raven Network Logo" 
                className="object-contain w-full h-full group-hover:scale-105 transition-transform" 
              />
            </div>
            <span className="font-extrabold text-xl tracking-tight">Raven <span className="text-white/70 font-medium">Network</span></span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/70 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {walletAddress ? (
              <div className="flex items-center gap-3">
                {/* Connected Wallet Pill */}
                <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-green-500/30 text-xs font-medium text-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
                  <span className="font-mono tracking-wide">{walletAddress.length > 18 ? `${walletAddress.slice(0, 10)}...${walletAddress.slice(-6)}` : walletAddress}</span>
                </div>

                {/* Dedicated Profile Button */}
                <button 
                  onClick={() => setIsProfileModalOpen(true)}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-accent-cyan/40 transition-all overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.02)]"
                  title="Edit Profile"
                >
                  {profile.avatar ? (
                    <img src={profile.avatar} className="w-full h-full object-cover" alt="User Avatar" />
                  ) : (
                    <User className="w-4 h-4 text-white/70" />
                  )}
                </button>

                <button 
                  onClick={() => {
                    localStorage.removeItem("raven_user_token");
                    setWalletAddress(null);
                  }}
                  className="px-3.5 py-1.5 rounded-xl border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 text-red-400 text-xs font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Button 
                variant="primary" 
                size="sm"
                className="flex items-center gap-1.5 font-bold"
                onClick={() => setIsConnectModalOpen(true)}
              >
                <User className="w-3.5 h-3.5" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Wallet Connection Modal */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-black border border-white/10 rounded-2xl p-6 glass shadow-[0_0_50px_rgba(147,51,234,0.15)] overflow-hidden">
            {/* Background glowing orb */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/20 rounded-full blur-2xl pointer-events-none" />

            {connectPhase === "social-login" && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Login to Raven Network</h3>
                  <button 
                    onClick={() => setIsConnectModalOpen(false)}
                    className="p-1 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-xs text-white/50 mb-6 leading-relaxed">
                  Connect your social account to instantly log in and access the Raven Network.
                </p>

                <div className="space-y-3">
                  {/* GitHub */}
                  <button
                    onClick={() => handleSocialLogin("GitHub")}
                    className="w-full flex items-center justify-center gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 text-center transition-all hover:bg-white/[0.08]"
                  >
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    <span className="text-sm font-semibold text-white">Continue with GitHub</span>
                  </button>

                  {/* Telegram */}
                  <button
                    onClick={() => handleSocialLogin("Telegram")}
                    className="w-full flex items-center justify-center gap-3 p-3.5 rounded-xl bg-[#2AABEE]/10 border border-[#2AABEE]/30 hover:border-[#2AABEE]/60 text-center transition-all hover:bg-[#2AABEE]/20"
                  >
                    <svg className="w-5 h-5 text-[#2AABEE]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.96 1.25-5.54 3.67-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.36-.48 1-.74 3.92-1.71 6.53-2.83 7.84-3.38 3.73-1.56 4.5-1.83 5.01-1.84.11 0 .36.03.49.14.11.09.14.22.15.34-.01.07-.01.13-.02.21z"/>
                    </svg>
                    <span className="text-sm font-semibold text-white">Continue with Telegram</span>
                  </button>

                  {/* Google */}
                  <button
                    onClick={() => handleSocialLogin("Google")}
                    className="w-full flex items-center justify-center gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 text-center transition-all hover:bg-white/[0.08]"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="text-sm font-semibold text-white">Continue with Google</span>
                  </button>
                </div>
              </>
            )}

            {connectPhase === "social-verifying" && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-12 h-12 rounded-full border-2 border-accent-purple border-t-transparent animate-spin mb-4" />
                <h3 className="font-bold text-sm text-white mb-2">Authenticating</h3>
                <p className="text-xs text-white/50 max-w-xs leading-relaxed">
                  Connecting securely to {connectingProvider}...
                </p>
              </div>
            )}

            {/* Removed wallet & NFT checks */}

            <div className="mt-8 pt-4 border-t border-white/5 text-[10px] text-white/40 text-center">
              By connecting, you agree to our Terms of Service.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
