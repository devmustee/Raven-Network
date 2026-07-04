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
  setIsProfileModalOpen: (open: boolean) => void;
}

export function Navbar({
  walletAddress,
  setWalletAddress,
  isConnectModalOpen,
  setIsConnectModalOpen,
  profile,
  setIsProfileModalOpen,
}: NavbarProps) {
  const [connectingProvider, setConnectingProvider] = useState<string | null>(null);

  const handleConnectMock = (provider: string, type: "ton" | "evm") => {
    setConnectingProvider(provider);
    setTimeout(() => {
      const mockAddress = type === "ton" 
        ? `EQA${Math.random().toString(36).substring(2, 6).toUpperCase()}...${Math.random().toString(36).substring(2, 6).toUpperCase()}`
        : `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`;
      setWalletAddress(mockAddress);
      setConnectingProvider(null);
      setIsConnectModalOpen(false);
    }, 1200);
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
              Sign in with a TON or EVM wallet to unlock contribution portals, view your leaderboard points, and verify your streak power.
            </p>

            <div className="space-y-5">
              {/* TON Network */}
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-white/40 font-bold mb-3">TON Network</span>
                <div className="flex flex-col gap-2.5">
                  {/* Raven Wallet */}
                  <button
                    disabled={connectingProvider !== null}
                    onClick={() => handleConnectMock("Raven Wallet", "ton")}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 text-left transition-all hover:bg-white/[0.04] disabled:opacity-50 group"
                  >
                    <div className="w-5 h-5 flex items-center justify-center bg-white/5 rounded-md p-0.5">
                      <img src="/logo.png" className="w-full h-full object-contain" alt="Raven Logo" />
                    </div>
                    <span className="text-xs font-semibold text-white">
                      {connectingProvider === "Raven Wallet" ? "Connecting..." : "Raven Wallet"}
                    </span>
                  </button>

                  {/* Tonkeeper */}
                  <button
                    disabled={connectingProvider !== null}
                    onClick={() => handleConnectMock("Tonkeeper", "ton")}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 text-left transition-all hover:bg-white/[0.04] disabled:opacity-50 group"
                  >
                    <svg className="w-5 h-5 text-accent-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3h12l4 6-10 12L2 9z" />
                    </svg>
                    <span className="text-xs font-semibold text-white">
                      {connectingProvider === "Tonkeeper" ? "Connecting..." : "Tonkeeper"}
                    </span>
                  </button>

                  {/* Tonhub */}
                  <button
                    disabled={connectingProvider !== null}
                    onClick={() => handleConnectMock("Tonhub", "ton")}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 text-left transition-all hover:bg-white/[0.04] disabled:opacity-50 group"
                  >
                    <svg className="w-5 h-5 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                    </svg>
                    <span className="text-xs font-semibold text-white">
                      {connectingProvider === "Tonhub" ? "Connecting..." : "Tonhub"}
                    </span>
                  </button>
                </div>
              </div>

              {/* EVM Networks */}
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-white/40 font-bold mb-3">EVM Networks</span>
                <div className="flex flex-col gap-2.5">
                  {/* MetaMask */}
                  <button
                    disabled={connectingProvider !== null}
                    onClick={() => handleConnectMock("MetaMask", "evm")}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 text-left transition-all hover:bg-white/[0.04] disabled:opacity-50 group"
                  >
                    <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                    <span className="text-xs font-semibold text-white">
                      {connectingProvider === "MetaMask" ? "Connecting..." : "MetaMask"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 text-[10px] text-white/40 text-center">
              By connecting, you agree to our Terms of Service.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
