"use client";

import React, { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Shield, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Default to the predefined admin wallet address
  const [walletAddress, setWalletAddress] = useState("EQA_ADMIN_HQ_RAVEN_GATEWAY_AUTHENTICATOR");

  useEffect(() => {
    const savedToken = localStorage.getItem("raven_admin_token");
    if (savedToken) {
      const parts = savedToken.split("_");
      if (parts.length >= 4 && parts[0] === "session" && parts[1] === "token" && parts[3] === "ADMIN") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
    setLoading(false);
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: walletAddress,
          signature: "mock_admin_signature_" + Date.now(),
          walletName: "Raven Wallet"
        })
      });
      
      const data = await res.json();
      
      if (data.success && data.user.role === "ADMIN") {
        localStorage.setItem("raven_admin_token", data.token);
        localStorage.setItem("raven_admin_user", JSON.stringify(data.user));
        setIsAdmin(true);
      } else {
        setError("Invalid credentials or wallet address is not registered as an Admin.");
        setIsAdmin(false);
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please check network connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("raven_admin_token");
    localStorage.removeItem("raven_admin_user");
    setIsAdmin(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black text-[#00F0FF]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#00F0FF] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#00F0FF]/60 animate-pulse">Raven Secure Guard</span>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black text-white p-4">
        <div className="w-full max-w-md bg-obsidian border border-white/10 rounded-2xl p-8 glass shadow-[0_0_50px_rgba(0,240,255,0.15)] relative overflow-hidden">
          {/* Background glowing orb */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F0FF]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 relative flex items-center justify-center mb-6">
              <img 
                src="/logo.png" 
                alt="Raven Network Logo" 
                className="object-contain w-full h-full" 
              />
            </div>
            
            <h2 className="text-xl font-extrabold tracking-tight mb-2">Raven HQ Authentication</h2>
            <p className="text-xs text-white/50 mb-6 leading-relaxed">
              Secure gateway for Raven Network operations. Authenticate using your admin credentials to enter the workspace dashboard.
            </p>

            {error && (
              <div className="w-full bg-[#FF0055]/10 border border-[#FF0055]/20 text-[#FF0055] text-xs py-3 px-4 rounded-xl mb-4 text-left">
                {error}
              </div>
            )}

            <div className="w-full space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Admin Credentials</label>
                <div className="flex items-center gap-2 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-white/70">
                  <Wallet className="w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="bg-transparent border-none outline-none flex-1 text-white placeholder-white/20"
                    placeholder="Enter Admin Wallet Address"
                  />
                </div>
              </div>

              <Button
                onClick={handleLogin}
                className="w-full bg-[#00F0FF] text-black font-semibold hover:bg-[#00D0EE] transition-all py-3 rounded-xl flex items-center justify-center gap-2"
              >
                Connect Wallet
              </Button>

              <a
                href="/"
                className="block text-center text-xs text-white/40 hover:text-white transition-colors pt-2"
              >
                Back to Public Portal
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto bg-black">
        <header className="h-20 border-b border-white/10 px-8 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-lg z-10">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#00F0FF]">Raven HQ Terminal</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-[#00FFCC] animate-pulse" />
              <span className="text-xs font-bold uppercase text-white/70">Secure Connection Established</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-[#FF0055] hover:text-[#FF3377] font-semibold border border-[#FF0055]/20 hover:bg-[#FF0055]/10 px-4 py-2 rounded-xl transition-all"
          >
            Exit Terminal
          </button>
        </header>
        <main className="p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
