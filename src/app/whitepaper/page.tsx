"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Search, Printer, Share2, Award, Shield, Cpu, Target, HelpCircle, Layers, Flame, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export default function WhitepaperPage() {
  const [activeSection, setActiveSection] = useState("exec-summary");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Section refs for scroll detection
  const sectionRefs = {
    "exec-summary": useRef<HTMLElement>(null),
    "problem-statement": useRef<HTMLElement>(null),
    "strategy-founder": useRef<HTMLElement>(null),
    "architecture-journey": useRef<HTMLElement>(null),
    "leaderboard-economics": useRef<HTMLElement>(null),
    "tech-security": useRef<HTMLElement>(null),
    "business-sustainability": useRef<HTMLElement>(null),
    "roadmap-governance": useRef<HTMLElement>(null),
    "cta-disclaimer": useRef<HTMLElement>(null)
  };

  // Scroll detection to highlight active sidebar item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const [id, ref] of Object.entries(sectionRefs)) {
        const element = ref.current;
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: keyof typeof sectionRefs) => {
    const element = sectionRefs[id].current;
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Raven Network Whitepaper v1.0",
        text: "Building Africa's Largest Web3 Contributor Ecosystem",
        url: window.location.href
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Whitepaper link copied to clipboard!");
    }
  };

  const sections = [
    {
      id: "exec-summary",
      title: "1. Executive Summary",
      icon: Target,
      content: (
        <div className="space-y-4">
          <p>
            The internet is entering a new era where ownership, transparency, and decentralization are reshaping how people learn, work, collaborate, and create value. Blockchain technology and Web3 have unlocked unprecedented opportunities, yet access to these opportunities remains uneven. Millions of talented individuals, particularly across Africa, face barriers to entry due to fragmented education, limited access to practical experience, weak professional networks, and a lack of trusted pathways into the global digital economy.
          </p>
          <div className="border-l-2 border-[#00F0FF] bg-[#00F0FF]/5 p-4 rounded-r-xl my-6">
            <span className="block font-black text-white text-xs uppercase tracking-wider mb-1">Ecosystem Vision</span>
            <p className="text-xs text-white/80">
              Raven Network was created to transform learning into measurable contribution and contribution into economic opportunity. It provides a structured pathway for individuals to develop Web3 skills, build a verifiable reputation, connect with ecosystem partners, and participate in meaningful work across the decentralized economy.
            </p>
          </div>
          <p>
            Developed and operated by <strong>Raven Learning Systems Ltd</strong>, Raven Network is more than a community platform. It is the infrastructure that connects education, professional identity, reputation, and opportunity into a unified ecosystem designed for long-term growth.
          </p>
          <p>The Raven ecosystem consists of four integrated products:</p>
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
              <span className="block font-bold text-white text-sm mb-1">Raven Academy</span>
              <p className="text-xs text-white/50 leading-relaxed">Delivers structured Web3 education through carefully designed learning pathways (Onboarding, Creator, Builder).</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
              <span className="block font-bold text-white text-sm mb-1">Raven Network</span>
              <p className="text-xs text-white/50 leading-relaxed">Enables contributors to build public profiles, maintain consistency through daily activity, earn reputation, and access opportunities.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
              <span className="block font-bold text-white text-sm mb-1">Raven Wallet</span>
              <p className="text-xs text-white/50 leading-relaxed">Serves as the digital identity layer, allowing members to manage credentials, achievements, and non-custodial blockchain assets.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
              <span className="block font-bold text-white text-sm mb-1">Raven DAO</span>
              <p className="text-xs text-white/50 leading-relaxed">Represents the long-term reputation-based governance model, enabling verified contributors to direct strategic ecosystem funding.</p>
            </div>
          </div>
          <p>
            Unlike traditional education platforms that stop at certification, Raven continues supporting members after graduation by connecting them with employers, blockchain ecosystems, hackathons, grants, ambassador programs, startup opportunities, and collaborative projects.
          </p>
          <p className="font-bold text-white text-base text-center py-4">
            "Knowledge alone does not create opportunity. Consistent contribution does."
          </p>
          <p>
            To reinforce this philosophy, Raven introduces mechanisms such as daily streaks, contributor reputation, verified achievements, and ecosystem leaderboards. These systems encourage continuous learning, active participation, and measurable impact rather than passive membership.
          </p>
        </div>
      )
    },
    {
      id: "problem-statement",
      title: "2. The Problem Statement",
      icon: HelpCircle,
      content: (
        <div className="space-y-4">
          <p>
            Web3 introduces ownership, decentralization, transparency, and programmable digital assets. It gives individuals greater control over their identities, data, finances, and participation in digital economies. Despite this transformation, Web3 remains inaccessible to much of the world's population.
          </p>
          <p>
            The greatest challenge is no longer technology. The challenge is people. Millions want to participate but do not know where to begin, how to gain practical experience, or how to find meaningful opportunities after learning.
          </p>
          <h3 className="text-sm font-bold text-white mt-6 mb-2">The Four Major Challenges:</h3>
          <div className="space-y-4">
            <div>
              <span className="block font-semibold text-white text-xs">1. Education Without Direction</span>
              <p className="text-xs text-white/60">
                Many people enter Web3 through scattered resources, watching random videos, and reading disconnected articles. Without a structured roadmap, clear progression, or measurable milestones, learning becomes overwhelming and many eventually quit.
              </p>
            </div>
            <div>
              <span className="block font-semibold text-white text-xs">2. Learning Without Experience</span>
              <p className="text-xs text-white/60">
                Completing a course does not guarantee practical ability. Employers seek contributors who have demonstrated real experience. Most learners lack portfolio projects, open-source commits, hackathon credentials, or public proof of work.
              </p>
            </div>
            <div>
              <span className="block font-semibold text-white text-xs">3. Communities Without Structure</span>
              <p className="text-xs text-white/60">
                Most Web3 communities focus on chats and announcements. Although valuable, they do not measure long-term contribution. Active builders receive the same recognition as passive spectators.
              </p>
            </div>
            <div>
              <span className="block font-semibold text-white text-xs">4. Opportunities Without Trust</span>
              <p className="text-xs text-white/60">
                Organizations spend significant time identifying trustworthy talent using resumes, referrals, and social media profiles. These methods rarely demonstrate actual capability, making trust expensive to establish.
              </p>
            </div>
          </div>
          <h3 className="text-sm font-bold text-white mt-6 mb-2">The African Opportunity</h3>
          <p>
            Africa possesses one of the world's youngest populations, rapid mobile internet adoption, expanding developer hubs, and mainstream digital payments. These trends position the continent as one of the largest future contributor bases. However, limited access to structured pathways, local mentor gaps, and fragmented networks act as barriers. <strong>Raven Network addresses this infrastructure gap directly.</strong>
          </p>
        </div>
      )
    },
    {
      id: "strategy-founder",
      title: "3. Strategy & Leadership",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p>
            Raven Network is operated by <strong>Raven Learning Systems Ltd</strong>, a technology and education organization building Web3 talent pipelines. The corporate focus spans technical operations, product scaling, compliance frameworks, and developer relations partnerships.
          </p>
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 my-6 flex flex-col sm:flex-row gap-6 items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00F0FF]/30 to-[#A060FF]/30 flex-shrink-0 flex items-center justify-center font-black text-2xl text-white">
              DM
            </div>
            <div>
              <span className="block font-black text-white text-sm">Engr. Mustapha Mohamed (DevMustee)</span>
              <span className="block text-[10px] text-accent-cyan font-bold uppercase tracking-wider mb-2">Founder & Architect</span>
              <p className="text-xs text-white/50 leading-relaxed">
                Software engineer and Web3 ecosystem builder. Experienced in technical onboarding, developer relations, hackathon architecture, and community growth initiatives. DevMustee designed the Raven contributor ecosystem to solve the transition gap between education and verified work.
              </p>
            </div>
          </div>
          <h3 className="text-sm font-bold text-white mt-6 mb-2">Strategic Positioning</h3>
          <p>
            Raven is not positioned as a traditional coding boot camp, a standard social media group, or another generic job board. Instead, it is an **ecosystem infrastructure layer** that maps learning metrics directly to professional on-chain identity and active opportunity queues.
          </p>
        </div>
      )
    },
    {
      id: "architecture-journey",
      title: "4. Contributor Architecture & Journey",
      icon: Layers,
      content: (
        <div className="space-y-4">
          <p>
            Raven Network operates as a structured developer pipeline. It is modeled around four technical subsystems:
          </p>
          <div className="space-y-4 my-6">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="block font-bold text-white text-xs mb-1">1. Relational Identity System</span>
              <p className="text-xs text-white/50">Links a unique contributor ID to verified login anchors (GitHub commits, Telegram IDs, X handles) to maintain a singular, portable professional profile.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="block font-bold text-white text-xs mb-1">2. Consistency Engine (Streaks)</span>
              <p className="text-xs text-white/50">Measures commitment through daily activity tracking. Missing target timelines flags the account and decays active reputation multipliers.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="block font-bold text-white text-xs mb-1">3. Rep Engine (Reputation Score)</span>
              <p className="text-xs text-white/50">Translates completed tasks, hackathon rankings, and peer-reviewed proof-of-work solutions into a single reputation score.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="block font-bold text-white text-xs mb-1">4. Opportunity Dispatch</span>
              <p className="text-xs text-white/50">Gates applications based on reputation brackets. Only verified, reputable builders can access high-tier jobs and bounties.</p>
            </div>
          </div>

          {/* Interactive Flow Diagram */}
          <div className="my-8 p-6 rounded-2xl bg-white/[0.01] border border-white/5 text-center">
            <span className="block text-[10px] text-white/40 uppercase font-bold tracking-widest mb-6">Interactive System Flow</span>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="px-4 py-2.5 rounded-xl bg-accent-purple/10 border border-accent-purple/30 text-accent-purple font-bold text-xs">
                1. Raven Academy
              </div>
              <div className="w-1.5 h-6 md:w-6 md:h-1.5 bg-white/10" />
              <div className="px-4 py-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 font-bold text-xs">
                2. Consistency (Streak)
              </div>
              <div className="w-1.5 h-6 md:w-6 md:h-1.5 bg-white/10" />
              <div className="px-4 py-2.5 rounded-xl bg-accent-blue/10 border border-accent-blue/30 text-accent-blue font-bold text-xs">
                3. Reputation (Rep)
              </div>
              <div className="w-1.5 h-6 md:w-6 md:h-1.5 bg-white/10" />
              <div className="px-4 py-2.5 rounded-xl bg-[#00FFCC]/10 border border-[#00FFCC]/30 text-[#00FFCC] font-bold text-xs">
                4. Opportunity Matching
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "leaderboard-economics",
      title: "5. Opportunities & Leaderboard Economics",
      icon: TrendingUp,
      content: (
        <div className="space-y-4">
          <p>
            The opportunities engine is an active, verified matchmaker for the decentralized economy. Listings include <strong>Remote Jobs</strong>, <strong>Freelance Gigs</strong>, <strong>Ecosystem Bounties</strong>, <strong>Hackathons</strong>, and <strong>Ecosystem Grants</strong>.
          </p>
          <p>
            Instead of resumes, the matching algorithm checks:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-white/60">
            <li><strong>Consistency Score:</strong> History of active streaks.</li>
            <li><strong>Reputation Bracket:</strong> Overall verified reputation XP.</li>
            <li><strong>Proof of Work:</strong> Verifiable project repos and historical approvals.</li>
          </ul>
          <h3 className="text-sm font-bold text-white mt-6 mb-2">Leaderboard Economics</h3>
          <p>
            Ranking on the leaderboard is an economic signal. High-ranking members obtain early access to high-value bounties, priority referral for partner hiring pipelines, and fast-track consideration for ecosystem grants. Incentives are aligned to prevent visibility-based farming and instead reward continuous build quality.
          </p>
        </div>
      )
    },
    {
      id: "tech-security",
      title: "6. Technology Architecture & Security",
      icon: Cpu,
      content: (
        <div className="space-y-4">
          <p>
            Raven Network is engineered as a highly scalable, relational portal.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-white/60">
            <li><strong>Frontend:</strong> Next.js Progressive Web App (PWA) with client-side caching to support low-bandwidth connections.</li>
            <li><strong>Backend API Layer:</strong> REST APIs with strict JWT mock session keys decoded dynamically against the database records.</li>
            <li><strong>Digital Identity & SBTs:</strong> Non-custodial wallet infrastructure (Raven Wallet) supporting cross-chain credentials mapped to non-transferable **Soulbound Tokens (SBTs)** to create a portable, tamper-proof reputation footprint on-chain.</li>
            <li><strong>Cryptographic Verification:</strong> Integrates **EIP-712** typed signature standards for secure off-chain profile links (GitHub/X) and supports **ERC-1271** for multi-signature smart contract wallet logins.</li>
            <li><strong>Anti-Spam Controls:</strong> Daily check-in restrictions, time-bracket validation for task submissions, and server-side verification of commits.</li>
          </ul>
        </div>
      )
    },
    {
      id: "business-sustainability",
      title: "7. Business Model & Sustainability",
      icon: BookOpen,
      content: (
        <div className="space-y-4">
          <p>
            Raven Learning Systems Ltd employs a multi-channel monetization model designed to fund continuous platform improvements without sacrificing open accessibility:
          </p>
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
              <span className="block font-bold text-white text-xs mb-1">Corporate Talent Pipelines</span>
              <p className="text-[11px] text-white/50">Hiring matching fees, candidate placement commissions, and custom developer relations sourcing options for global protocols.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
              <span className="block font-bold text-white text-xs mb-1">Ecosystem Sponsorships</span>
              <p className="text-[11px] text-white/50">Sponsored developer onboarding quests, protocol-specific academies, and paid ecosystem hackathons.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
              <span className="block font-bold text-white text-xs mb-1">Premium Platform Services</span>
              <p className="text-[11px] text-white/50">Advanced trading tools inside Raven Wallet, institutional dashboard access for partners, and premium tracks.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
              <span className="block font-bold text-white text-xs mb-1">Foundation Grants</span>
              <p className="text-[11px] text-white/50">Strategic public-goods funding from blockchain networks to accelerate localized talent onboarding.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "roadmap-governance",
      title: "8. Roadmap & Governance",
      icon: Flame,
      content: (
        <div className="space-y-4">
          <p>
            Raven Network is built for multi-phase progression:
          </p>
          <div className="space-y-4 my-6">
            <div>
              <span className="block font-bold text-white text-xs">Phase 1: Foundation (2026)</span>
              <p className="text-xs text-white/50">Launch of Raven Academy, MVP Network, and basic reputation tracking. Onboard first 10,000 African contributors.</p>
            </div>
            <div>
              <span className="block font-bold text-white text-xs">Phase 2: Expansion (2027)</span>
              <p className="text-xs text-white/50">Deploy partner dashboards, advanced reputation matching, and launch regional developer outreach across East and West Africa.</p>
            </div>
            <div>
              <span className="block font-bold text-white text-xs">Phase 3: Infrastructure (2028)</span>
              <p className="text-xs text-white/50">Full wallet launch, multi-chain identity anchoring, and institutional enterprise hiring integrations.</p>
            </div>
            <div>
              <span className="block font-bold text-white text-xs">Phase 4: Decentralization (2029+)</span>
              <p className="text-xs text-white/50">Activate Raven DAO. Voting weight is strictly mapped to contributor reputation scores rather than financial stake.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "cta-disclaimer",
      title: "9. Disclaimer & Legal Terms",
      icon: Shield,
      content: (
        <div className="space-y-4 text-xs text-white/50">
          <p>
            <strong>Ecosystem Contact:</strong> Raven Learning Systems Ltd, Nigeria. Email and official digital directories are available upon platform request.
          </p>
          <p>
            <strong>Legal Notice:</strong> This whitepaper is presented solely for educational and informational purposes. It does not constitute a solicitation of investments, an offering of financial securities, or guaranteed career employment. Forward-looking targets reflect strategic vision and are subject to engineering adjustments and protocol variations.
          </p>
          <p>
            <strong>Intellectual Property:</strong> All system architectures, branding design tokens, and product concepts described herein remain the exclusive property of Raven Learning Systems Ltd.
          </p>
        </div>
      )
    }
  ];

  const filteredSections = sections.filter(sec => 
    sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sec.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white font-sans py-20 relative overflow-x-clip">
      {/* Background glowing gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Back Navigation & Quick Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 border-b border-white/5 pb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-semibold group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-3">
            <Button 
              onClick={handlePrint}
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1.5 text-xs py-2 px-4 h-auto border-white/10 hover:border-white/20 text-white/70 hover:text-white"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </Button>
            <Button 
              onClick={handleShare}
              variant="primary" 
              size="sm" 
              className="flex items-center gap-1.5 text-xs py-2 px-4 h-auto text-black font-semibold"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share Link
            </Button>
          </div>
        </div>

        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-purple/10 text-accent-purple font-semibold text-xs mb-4 border border-accent-purple/20 uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 animate-pulse" />
            Whitepaper v1.0
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            RAVEN NETWORK
          </h1>
          <p className="text-base text-white/60 leading-relaxed">
            Building Africa's Largest Web3 Contributor Ecosystem
          </p>
          <span className="block text-xs text-white/30 font-medium mt-4">
            Developed by Raven Learning Systems Ltd • 2026
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-12">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search whitepaper sections, key terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-obsidian border border-white/5 hover:border-white/10 focus:border-[#00F0FF]/30 transition-all rounded-xl py-3.5 pl-11 pr-4 text-xs text-white placeholder-white/30 outline-none"
          />
        </div>

        {/* Grid Layout: Sidebar TOC + Main Reading Card */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Table of Contents Sidebar */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-4 self-start h-fit">
            <GlassCard className="p-4 border-white/5 bg-black/45">
              <span className="block text-[9px] font-bold uppercase tracking-widest text-white/40 mb-3 px-3">
                Table of Contents
              </span>
              <nav className="space-y-1">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id as any)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-bold rounded-lg transition-all ${
                        isActive
                          ? "bg-accent-purple/10 text-white border-l-2 border-accent-purple"
                          : "text-white/45 hover:text-white/70 hover:bg-white/[0.01]"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? "text-accent-purple" : "text-white/30"}`} />
                      {sec.title.substring(3)}
                    </button>
                  );
                })}
              </nav>
            </GlassCard>
          </div>

          {/* Main Reading Card */}
          <div className="lg:col-span-8 space-y-8">
            <GlassCard className="p-6 md:p-12 border-white/5 backdrop-blur-xl">
              <div className="space-y-12">
                {filteredSections.length === 0 ? (
                  <div className="text-center py-12 text-white/30 text-sm">
                    No matching sections found for "{searchQuery}"
                  </div>
                ) : (
                  filteredSections.map((sec) => {
                    const Icon = sec.icon;
                    return (
                      <section 
                        key={sec.id}
                        id={sec.id}
                        ref={sectionRefs[sec.id as keyof typeof sectionRefs]}
                        className="space-y-5 scroll-mt-28 border-b border-white/5 pb-10 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-accent-purple" />
                          </div>
                          <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
                            {sec.title}
                          </h2>
                        </div>
                        <div className="leading-relaxed text-sm text-white/70 space-y-4">
                          {sec.content}
                        </div>
                      </section>
                    );
                  })
                )}
              </div>
            </GlassCard>
          </div>

        </div>

      </div>
    </main>
  );
}
