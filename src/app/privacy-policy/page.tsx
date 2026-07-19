"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white font-sans py-20 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
        {/* Back navigation */}
        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 text-sm font-semibold group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-accent-purple" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Privacy Policy</h1>
            <p className="text-xs text-white/50 mt-1">Last Updated: July 5, 2026</p>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-10 backdrop-blur-xl space-y-8 leading-relaxed text-sm text-white/70">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
              1. Introduction
            </h2>
            <p>
              Welcome to the **Raven Network**. We are operated by **Raven Network Limited** ("we", "us", or "our"), a company registered in the Federal Republic of Nigeria. 
            </p>
            <p>
              This Privacy Policy explains how we collect, use, store, and process your personal data when you interact with our contributor platform, connect your wallet, complete tasks, or claim streak rewards. We are committed to safeguarding your privacy in compliance with the **Nigeria Data Protection Act (NDPA) 2023** and the **Nigeria Data Protection Regulation (NDPR) 2019**.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
              2. Data We Collect
            </h2>
            <p>
              To participate in the Raven Network contributor ecosystem, we collect limited personal and technical data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Web3 Wallet Address:</strong> Your public wallet address (e.g., TON or EVM addresses) is collected to verify your graduation NFT and distribute reputation rewards.</li>
              <li><strong>Social Identifiers:</strong> Linked usernames or profiles from third-party social services (such as GitHub, Telegram, and X) used for verification of task completion.</li>
              <li><strong>Profile Information:</strong> Any nickname, profile avatar image, or biography description you choose to upload to customize your Contributor Hub.</li>
              <li><strong>Usage Analytics:</strong> Tracking check-in activity, streak completion intervals, task verification logs, and active status to calculate leaderboard metrics.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
              3. Processing Principles & Legal Basis
            </h2>
            <p>
              In accordance with Section 24 of the NDPA 2023, we process your personal data lawfully, fairly, and in a transparent manner. Our legal bases for processing include:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Consent:</strong> You explicitly grant us permission to collect social link information when editing your profile or logging in.</li>
              <li><strong>Performance of Contract:</strong> We verify task completion and track streaks to allocate reputation points, satisfying your user agreement terms.</li>
              <li><strong>Legitimate Interests:</strong> To detect and prevent sybil attacks, multi-wallet abuses, and verify the integrity of the leaderboard rankings.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
              4. Data Protection Rights
            </h2>
            <p>
              Under the Nigerian Data Protection framework, you hold standard rights regarding your data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Right of Access:</strong> Request details of the personal data we hold about you.</li>
              <li><strong>Right to Rectification:</strong> Edit your profile handles or wallet linkages directly from your Hub dashboard.</li>
              <li><strong>Right to Erasure (Right to be Forgotten):</strong> Request the removal of your linked profile indicators and leaderboard ranking details.</li>
              <li><strong>Right to Data Portability:</strong> Obtain a digital copy of your contribution records and achievements.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact our Data Protection Officer at <strong>legal@ravennetwork.xyz</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
              5. Data Security & Storage
            </h2>
            <p>
              We implement industry-standard technical and organizational security measures to prevent unauthorized access, alteration, disclosure, or accidental destruction of data.
            </p>
            <p>
              All user data is stored within secured cloud servers, and public credentials (like wallet links) are cryptographically stored. We do not store or request private keys or seed phrases under any circumstances.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
              6. Regulatory Authorities
            </h2>
            <p>
              The regulatory authority responsible for supervising data protection rules in Nigeria is the **Nigeria Data Protection Commission (NDPC)**. If you believe your privacy rights have been violated, you have the right to lodge a formal complaint with the NDPC.
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
