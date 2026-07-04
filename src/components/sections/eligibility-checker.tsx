"use client";

import React, { useState } from "react";
import { GlassCard } from "../ui/glass-card";
import { Button } from "../ui/button";
import { Check, X, Shield, Search } from "lucide-react";

export function EligibilityChecker() {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "eligible" | "ineligible">("idle");

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;

    setStatus("checking");
    setTimeout(() => {
      // Simulate checking: addresses starting with EQA or containing keeper/raven verify successfully
      const trimmed = address.trim().toUpperCase();
      const isEligible = trimmed.startsWith("EQA") || trimmed.includes("KEEPER") || trimmed.includes("RAVEN");
      if (isEligible) {
        setStatus("eligible");
      } else {
        setStatus("ineligible");
      }
    }, 1500);
  };

  return (
    <section className="py-16 relative overflow-hidden border-t border-white/5 bg-black/30">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">Check Graduation Eligibility</h2>
          <p className="text-xs text-white/50 max-w-md mx-auto">
            Input your TON Wallet Address to verify manual graduation and confirm the presence of your Flock NFT.
          </p>
        </div>

        <GlassCard className="p-6 border-white/10 relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

          <form onSubmit={handleCheck} className="relative z-10 space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-white/30" />
                </div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="Enter your TON wallet address (e.g. EQA...)"
                  className="block w-full pl-10 pr-4 py-3 bg-white/[0.02] border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-accent-purple transition-all"
                />
              </div>
              <Button 
                type="submit" 
                variant="primary" 
                disabled={status === "checking" || !address.trim()}
                className="py-3 h-auto md:w-44 text-xs font-bold"
              >
                {status === "checking" ? "Checking Status..." : "Verify NFT Proof"}
              </Button>
            </div>

            {/* Verification status output alerts */}
            {status === "checking" && (
              <div className="flex items-center gap-2 text-xs text-white/50 bg-white/5 border border-white/10 p-3.5 rounded-xl animate-pulse justify-center">
                <Shield className="w-4 h-4 text-accent-cyan animate-spin" />
                <span>Querying TON blockchain collection items for Flock NFT...</span>
              </div>
            )}

            {status === "eligible" && (
              <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-green-400 bg-green-500/10 border border-green-500/20 p-4 rounded-xl justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <span><strong>Graduation Proof Verified!</strong> Your wallet holds the manual Raven Academy Flock NFT.</span>
                </div>
                <span className="text-[10px] text-white/70 font-semibold bg-white/10 px-2 py-1 rounded-lg">
                  Click Connect Wallet to Enter
                </span>
              </div>
            )}

            {status === "ineligible" && (
              <div className="flex items-center gap-3 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <X className="w-3.5 h-3.5 text-red-400" />
                </div>
                <div>
                  <strong>Graduation Proof Not Found.</strong> Manual eligibility verification required. Ensure you holds the Flock NFT on TON.
                </div>
              </div>
            )}
          </form>
        </GlassCard>
      </div>
    </section>
  );
}
