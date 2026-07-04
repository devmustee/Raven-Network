"use client";

import React, { useState } from "react";
import { GlassCard } from "../ui/glass-card";
import { Button } from "../ui/button";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    // Mock API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-black border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl">
        <GlassCard className="p-8 md:p-12 text-center border-accent-cyan/20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Join the Future of <span className="text-accent-cyan">Web3</span></h2>
          <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
            Get the latest opportunities, platform updates, and Web3 insights delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 h-12 rounded-full bg-white/5 border border-white/20 focus:outline-none focus:border-accent-cyan text-white placeholder:text-white/40 transition-colors"
              required
              disabled={status === "loading" || status === "success"}
            />
            <Button 
              type="submit" 
              variant="primary" 
              className="h-12 px-8"
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading" ? "Joining..." : status === "success" ? "Subscribed!" : "Join"}
            </Button>
          </form>
          {status === "success" && (
            <p className="text-accent-cyan text-sm mt-4">Welcome to the network! Keep an eye on your inbox.</p>
          )}
        </GlassCard>
      </div>
    </section>
  );
}
