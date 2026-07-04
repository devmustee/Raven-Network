"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Wallet, X, Check, User } from "lucide-react";

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
  const [connectPhase, setConnectPhase] = useState<"choose" | "verifying" | "blocked" | "telegram">("choose");
  const [tempAddress, setTempAddress] = useState<string | null>(null);
  const [telegramInput, setTelegramInput] = useState("@");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleConnectMock = (provider: string, type: "ton" | "evm") => {
    setConnectingProvider(provider);
    setConnectPhase("verifying");
    
    setTimeout(() => {
      setConnectingProvider(null);
      // Gating logic: Tonkeeper & Raven Wallet hold the Flock NFT. Tonhub and MetaMask do not.
      const isGraduate = provider === "Raven Wallet" || provider === "Tonkeeper";
      
      if (!isGraduate) {
        setConnectPhase("blocked");
      } else {
        const mockAddress = `EQA${Math.random().toString(36).substring(2, 6).toUpperCase()}...${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
        setTempAddress(mockAddress);
        setConnectPhase("telegram");
      }
    }, 1800);
  };

  const handleTelegramSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!telegramInput.trim() || telegramInput === "@" || telegramInput.length < 3) {
      setValidationError("Please enter a valid Telegram username.");
      return;
    }
    
    // Save state
    if (setProfile) {
      setProfile(p => ({
        ...p,
        telegram: telegramInput,
        name: p.name || telegramInput.replace("@", "")
      }));
    }
    
    setWalletAddress(tempAddress);
    setValidationError(null);
    setIsConnectModalOpen(false);
    
    // Reset modal phase
    setTimeout(() => {
      setConnectPhase("choose");
      setTelegramInput("@");
    }, 500);
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
            {navLinks.map((link) => (
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
            {walletAddress ? (
              <div className="flex items-center gap-3">
                {/* Connected Wallet Pill */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/75">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  {walletAddress}
                </div>

                {/* Dedicated Profile Button */}
                <button 
                  onClick={() => setIsProfileModalOpen(true)}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all overflow-hidden"
                  title="Edit Profile"
                >
                  {profile.avatar ? (
                    <img src={profile.avatar} className="w-full h-full object-cover" alt="User Avatar" />
                  ) : (
                    <User className="w-4 h-4 text-white/70" />
                  )}
                </button>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setWalletAddress(null)}
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button 
                variant="primary" 
                className="flex items-center gap-2"
                onClick={() => setIsConnectModalOpen(true)}
              >
                <Wallet className="w-4 h-4" />
                Connect Wallet
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

            {connectPhase === "choose" && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Connect Web3 Wallet</h3>
                  <button 
                    onClick={() => setIsConnectModalOpen(false)}
                    className="p-1 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-xs text-white/50 mb-6 leading-relaxed">
                  Connect your TON wallet to verify your Raven Academy Graduation status. Only manually verified graduates holding the graduation Flock NFT on TON can log in.
                </p>

                <div className="space-y-5">
                  {/* TON Network */}
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-white/40 font-bold mb-3">TON Network (Graduates ONLY)</span>
                    <div className="flex flex-col gap-2.5">
                      {/* Raven Wallet */}
                      <button
                        onClick={() => handleConnectMock("Raven Wallet", "ton")}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent-purple/30 text-left transition-all hover:bg-white/[0.04] group"
                      >
                        <div className="w-5 h-5 flex items-center justify-center bg-white/5 rounded-md p-0.5">
                          <img src="/logo.png" className="w-full h-full object-contain" alt="Raven Logo" />
                        </div>
                        <div className="flex-1">
                          <span className="block text-xs font-semibold text-white">Raven Wallet</span>
                          <span className="block text-[8px] text-green-400 font-bold mt-0.5">Holds Flock NFT (Verified)</span>
                        </div>
                      </button>

                      {/* Tonkeeper */}
                      <button
                        onClick={() => handleConnectMock("Tonkeeper", "ton")}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent-purple/30 text-left transition-all hover:bg-white/[0.04] group"
                      >
                        <svg className="w-5 h-5 text-accent-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 3h12l4 6-10 12L2 9z" />
                        </svg>
                        <div className="flex-1">
                          <span className="block text-xs font-semibold text-white">Tonkeeper</span>
                          <span className="block text-[8px] text-green-400 font-bold mt-0.5">Holds Flock NFT (Verified)</span>
                        </div>
                      </button>

                      {/* Tonhub */}
                      <button
                        onClick={() => handleConnectMock("Tonhub", "ton")}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-red-500/20 text-left transition-all hover:bg-white/[0.04] group"
                      >
                        <svg className="w-5 h-5 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="4" />
                          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                        </svg>
                        <div className="flex-1">
                          <span className="block text-xs font-semibold text-white">Tonhub</span>
                          <span className="block text-[8px] text-red-400 font-bold mt-0.5">No NFT Found (Unregistered)</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* EVM Networks */}
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-white/40 font-bold mb-3">EVM Networks</span>
                    <div className="flex flex-col gap-2.5">
                      {/* MetaMask */}
                      <button
                        onClick={() => handleConnectMock("MetaMask", "evm")}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-red-500/20 text-left transition-all hover:bg-white/[0.04] group"
                      >
                        <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 12l10 5 10-5" />
                        </svg>
                        <div className="flex-1">
                          <span className="block text-xs font-semibold text-white">MetaMask</span>
                          <span className="block text-[8px] text-red-400 font-bold mt-0.5">No NFT Found (Unregistered)</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {connectPhase === "verifying" && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-12 h-12 rounded-full border-2 border-accent-purple border-t-transparent animate-spin mb-4" />
                <h3 className="font-bold text-sm text-white mb-2">Verifying Graduation Status</h3>
                <p className="text-xs text-white/50 max-w-xs leading-relaxed">
                  Querying TON blockchain collection items for verified Raven Academy Graduation Flock NFT...
                </p>
              </div>
            )}

            {connectPhase === "blocked" && (
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="font-bold text-base text-white mb-2">Access Blocked</h3>
                <p className="text-xs text-white/50 max-w-sm leading-relaxed mb-6">
                  Raven Academy Graduation Flock NFT not found on TON for this wallet address. Only manually verified graduates holding the NFT can connect.
                </p>
                <div className="flex gap-3 w-full">
                  <Button variant="outline" onClick={() => setConnectPhase("choose")} className="flex-1">
                    Try Another Wallet
                  </Button>
                  <Button variant="secondary" onClick={() => setIsConnectModalOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {connectPhase === "telegram" && (
              <form onSubmit={handleTelegramSubmit} className="space-y-5 py-2">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">TON Graduation Verified!</h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Verify ownership of the Flock NFT successful. Connect your Telegram account to bind your contributor profile.
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2">Telegram Username</label>
                  <input 
                    type="text" 
                    value={telegramInput}
                    onChange={(e) => {
                      setTelegramInput(e.target.value);
                      if (validationError) setValidationError(null);
                    }}
                    placeholder="@username"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-purple transition-colors"
                  />
                  {validationError && (
                    <span className="block text-[10px] text-red-400 font-bold mt-1.5">{validationError}</span>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => {
                    setConnectPhase("choose");
                    setTelegramInput("@");
                  }} className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" variant="primary" className="flex-1">
                    Enter Dashboard
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-8 pt-4 border-t border-white/5 text-[10px] text-white/40 text-center">
              By connecting, you agree to our Terms of Service.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
