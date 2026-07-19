"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Building2, Target, Eye, Layers, GraduationCap, Wallet, Globe, Users, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white font-sans py-20 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-accent-blue/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
        {/* Back navigation */}
        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 text-sm font-semibold group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Page Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-accent-cyan" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Raven Network Limited</h1>
            <p className="text-xs text-white/50 mt-1">Building Africa&apos;s Web3 Future</p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl leading-relaxed">
          We are a Web3 education and infrastructure company on a mission to connect millions of people across Africa to blockchain opportunities through learning, contribution, and reputation.
        </p>

        {/* Content Sections */}
        <div className="space-y-8">

          {/* Who We Are */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-10 backdrop-blur-xl space-y-5 leading-relaxed text-sm text-white/70">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
              Who We Are
            </h2>
            <p>
              <strong className="text-white">Raven Network Limited</strong> is a technology company registered and headquartered in Africa, dedicated to building the infrastructure that powers Web3 education and talent development across the continent.
            </p>
            <p>
              We operate <strong className="text-white">Raven Network</strong> — a contributor-first ecosystem where individuals learn blockchain technologies, earn verifiable credentials, build on-chain reputation, and access real-world opportunities from global Web3 organizations.
            </p>
            <p>
              Our approach combines structured learning pathways with hands-on contribution, ensuring that every participant doesn&apos;t just gain knowledge — they build a portable, verifiable track record that opens doors to bounties, grants, jobs, and partnerships across the decentralized economy.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-4 leading-relaxed text-sm text-white/70">
              <div className="w-10 h-10 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center mb-2">
                <Target className="w-5 h-5 text-accent-purple" />
              </div>
              <h2 className="text-lg font-bold text-white">Our Mission</h2>
              <p>
                To democratize access to Web3 education and economic opportunity for every person in Africa by building a decentralized contributor network that rewards learning, skill development, and meaningful participation.
              </p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-4 leading-relaxed text-sm text-white/70">
              <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mb-2">
                <Eye className="w-5 h-5 text-accent-cyan" />
              </div>
              <h2 className="text-lg font-bold text-white">Our Vision</h2>
              <p>
                A future where talent is borderless and reputation is portable — where anyone, regardless of geography or background, can build a verified career in the decentralized economy through contribution and learning.
              </p>
            </div>
          </div>

          {/* What We Build */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-10 backdrop-blur-xl space-y-6 leading-relaxed text-sm text-white/70">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
              What We Build
            </h2>
            <p>
              Raven Network Limited develops and maintains the core products that power the Raven ecosystem:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <Layers className="w-5 h-5 text-accent-cyan" />,
                  title: "Raven Network",
                  desc: "The contributor platform — learn, complete quests, earn XP, and climb the leaderboard to unlock real opportunities.",
                },
                {
                  icon: <GraduationCap className="w-5 h-5 text-accent-purple" />,
                  title: "Raven Academy",
                  desc: "Structured Web3 courses and learning pathways with verifiable certificates issued on-chain.",
                },
                {
                  icon: <Wallet className="w-5 h-5 text-accent-blue" />,
                  title: "Raven Wallet",
                  desc: "A multi-chain crypto wallet built for Africa — send, receive, swap, and manage digital assets seamlessly.",
                },
                {
                  icon: <Globe className="w-5 h-5 text-green-400" />,
                  title: "Opportunity Engine",
                  desc: "Connects contributors to bounties, grants, jobs, and partnerships from global Web3 partners.",
                },
              ].map((product) => (
                <div key={product.title} className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 space-y-2 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3 mb-1">
                    {product.icon}
                    <h3 className="font-bold text-white text-sm">{product.title}</h3>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">{product.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-10 backdrop-blur-xl space-y-6 leading-relaxed text-sm text-white/70">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: <Users className="w-5 h-5 text-accent-cyan" />,
                  title: "Community First",
                  desc: "Everything we build starts with the contributor. We grow when our community grows.",
                },
                {
                  icon: <ShieldCheck className="w-5 h-5 text-accent-purple" />,
                  title: "Transparency",
                  desc: "On-chain reputation, open roadmaps, and verifiable credentials. No gatekeeping.",
                },
                {
                  icon: <Globe className="w-5 h-5 text-accent-blue" />,
                  title: "Access for All",
                  desc: "We believe talent is everywhere. We are removing every barrier between people and opportunity.",
                },
              ].map((value) => (
                <div key={value.title} className="text-center space-y-3 p-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
                    {value.icon}
                  </div>
                  <h3 className="font-bold text-white text-sm">{value.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Company Details */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-10 backdrop-blur-xl space-y-4 leading-relaxed text-sm text-white/70">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
              Company Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              <div>
                <span className="text-white/40 text-xs uppercase tracking-wider">Registered Name</span>
                <p className="text-white font-semibold">Raven Network Limited</p>
              </div>
              <div>
                <span className="text-white/40 text-xs uppercase tracking-wider">Type</span>
                <p className="text-white font-semibold">Private Limited Company</p>
              </div>
              <div>
                <span className="text-white/40 text-xs uppercase tracking-wider">Industry</span>
                <p className="text-white font-semibold">Web3 Education & Infrastructure</p>
              </div>
              <div>
                <span className="text-white/40 text-xs uppercase tracking-wider">Headquarters</span>
                <p className="text-white font-semibold">Africa</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <p className="text-white/50 text-sm mb-4">Want to learn more or partner with us?</p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-cyan text-black font-bold text-sm rounded-full hover:bg-accent-cyan/90 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
