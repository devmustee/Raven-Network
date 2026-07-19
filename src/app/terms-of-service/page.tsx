"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Scale, ShieldAlert, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-black text-white font-sans py-20 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
        {/* Back navigation */}
        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 text-sm font-semibold group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
            <Scale className="w-6 h-6 text-accent-cyan" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Terms of Service</h1>
            <p className="text-xs text-white/50 mt-1">Last Updated: July 5, 2026</p>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-10 backdrop-blur-xl space-y-8 leading-relaxed text-sm text-white/70">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
              1. Agreement to Terms
            </h2>
            <p>
              These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and **Raven Network Limited** ("we", "us", or "our"), concerning your access to and use of the **Raven Network** contributor platform. 
            </p>
            <p>
              We are a registered business entity in the Federal Republic of Nigeria. By accessing the platform, connecting your Web3 wallet, or completing daily quests, you acknowledge that you have read, understood, and agreed to be bound by all of these Terms. If you do not agree, you are prohibited from using the platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
              2. NFT Gating & Eligibility
            </h2>
            <p>
              Access to the Contributor Hub is strictly restricted to graduates of the **Raven Academy**. 
            </p>
            <p>
              To connect and log in, your Web3 wallet must hold a verified **Raven Academy Graduation NFT** on the TON Blockchain or designated partners' chains. Attempting to bypass these gating parameters, manipulate blockchain assets, or spoof smart contracts constitutes a breach of these Terms and will result in permanent address blacklisting from our Opportunity Engine.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
              3. Contributor Rules & Quest Engine
            </h2>
            <p>
              To maintain the integrity of our Reputation System, all users agree to adhere to strict contribution rules:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Authentic Interaction:</strong> Automating task completions, using bots, or generating low-effort spam (e.g., "nice," "LFG," or copy-pasted messages) on X or Telegram tasks is strictly prohibited.</li>
              <li><strong>Streak Mechanics:</strong> Completing quests inside designated time-windows protects your daily streak multiplier. Missed timeframes will result in streak reductions according to the Streak Engine parameters.</li>
              <li><strong>Leaderboard Integrity:</strong> Modifying reputation standings through sybil schemes (e.g., controlling multiple profiles with separate wallets) is forbidden. Profiles flagged for sybil activities will be stripped of XP and banned.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
              4. Non-Financial Disclaimers
            </h2>
            <p>
              You explicitly acknowledge and agree that:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Reputation XP:</strong> Platform experience points (XP) and reputation metrics are strictly gamified educational tracking tools. They do not constitute shares, securities, financial derivatives, or currency, and hold no monetary value.</li>
              <li><strong>Opportunities:</strong> Active job listings, contests, or hackathons displayed in the Opportunity Hub are matched via smart indicators. We do not guarantee employment, payment stability, or contract execution by third-party partner entities.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
              5. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by the laws of the Federal Republic of Nigeria, Raven Network Limited, its directors, employees, or partners, will not be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages arising from your use of the platform, including lost profits, lost data, or wallet vulnerability exploits.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
              6. Dispute Resolution & Governing Law
            </h2>
            <p>
              These Terms and your use of the platform are governed by and construed in accordance with the laws of the **Federal Republic of Nigeria**. 
            </p>
            <p>
              Any dispute, controversy, or claim arising out of or relating to these Terms, including their validity, invalidity, breach, or termination, shall be referred to and finally resolved by arbitration in **Lagos, Nigeria**, in accordance with the Arbitration and Mediation Act of Nigeria. The language of arbitration shall be English.
            </p>
          </section>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40 font-mono">
            <span>© {new Date().getFullYear()} Raven Network Limited</span>
            <span>Registered in Nigeria</span>
          </div>

        </div>

        <div className="text-center mt-12">
          <Link href="/">
            <Button variant="primary">Return to Contributor Hub</Button>
          </Link>
        </div>

      </div>
    </main>
  );
}
