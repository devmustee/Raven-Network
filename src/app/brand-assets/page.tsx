"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Palette, Image as ImageIcon } from "lucide-react";

const brandAssets = [
  {
    name: "Raven Network",
    description: "The primary logo for the Raven Network ecosystem — used across the website, app, and marketing materials.",
    logo: "/logo.png",
    bgClass: "bg-black",
    accent: "accent-cyan",
  },
  {
    name: "Raven Academy",
    description: "The education arm of Raven Network — used for courses, certifications, and learning-related content.",
    logo: "/academy_logo.jpg",
    bgClass: "bg-black",
    accent: "accent-purple",
  },
  {
    name: "Raven Wallet",
    description: "The multi-chain crypto wallet built for Africa — used for wallet app interfaces and promotional assets.",
    logo: "/wallet_logo.png",
    bgClass: "bg-black",
    accent: "accent-blue",
  },
];

const baseNfts = [
  { name: "Cyber Raven", trait: "Legendary" },
  { name: "Pharaoh Raven", trait: "Mythic" },
  { name: "Frost King", trait: "Rare" },
  { name: "Inferno Raven", trait: "Epic" },
  { name: "Samurai Raven", trait: "Legendary" },
  { name: "Synthwave Raven", trait: "Rare" },
  { name: "Steampunk Raven", trait: "Epic" },
  { name: "Cosmic Raven", trait: "Mythic" },
  { name: "Diamond Raven", trait: "Legendary" },
  { name: "African Warrior", trait: "Mythic" },
  { name: "Matrix Hacker", trait: "Epic" },
  { name: "Deep Sea Raven", trait: "Rare" },
  { name: "Royal King", trait: "Legendary" },
  { name: "Northern Lights", trait: "Rare" },
  { name: "Astronaut Raven", trait: "Legendary" },
  { name: "Zen Master", trait: "Epic" },
  { name: "Gilded Marble", trait: "Mythic" },
  { name: "Vaporwave Retro", trait: "Rare" },
  { name: "Viking Chieftain", trait: "Legendary" },
  { name: "Cybernetic Android", trait: "Mythic" },
];

const adjectives = [
  "Nexus", "Genesis", "Quantum", "Obsidian", "Vortex", "Aether", "Solaris", 
  "Specter", "Astral", "Prismatic", "Nova", "Titan", "Crystalline", "Echo", 
  "Glitch", "Hyper", "Voodoo", "Shadow", "Rogue", "Zenith", "Cosmic", "Galactic",
  "Solar", "Lunar", "Phantom", "Spectral", "Divine", "Abyssal", "Chrono", "Volcanic",
  "Matrix", "Holographic", "Steampunk", "Synthwave", "Cybernetic", "Stardust"
];

const traits = ["Mythic", "Legendary", "Epic", "Rare"];

const allNfts = Array.from({ length: 1000 }, (_, i) => {
  const idStr = String(i + 1).padStart(3, '0');
  if (i < 20) {
    return {
      id: idStr,
      baseId: String(i + 1).padStart(2, '0'),
      name: baseNfts[i].name,
      trait: baseNfts[i].trait,
      hueShift: 0,
      saturate: 100,
    };
  }

  const baseIndex = i % 20;
  const adjIndex = Math.floor(i / 5) % adjectives.length;
  const trait = traits[(i * 7) % traits.length];
  
  // Calculate deterministic hue shifts and color saturation for uniqueness
  const hueShift = ((i - 19) * 23) % 360;
  const saturate = 100 + ((i % 4) * 25); // 100%, 125%, 150%, 175%

  return {
    id: idStr,
    baseId: String(baseIndex + 1).padStart(2, '0'),
    name: `${adjectives[adjIndex]} ${baseNfts[baseIndex].name.split(' ')[0]}`,
    trait: trait,
    hueShift: hueShift,
    saturate: saturate,
  };
});

export default function BrandAssetsPage() {
  const [visibleCount, setVisibleCount] = useState(16);
  return (
    <main className="min-h-screen bg-black text-white font-sans py-20 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
        {/* Back navigation */}
        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 text-sm font-semibold group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Page Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
            <Palette className="w-6 h-6 text-accent-cyan" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Brand Assets</h1>
            <p className="text-xs text-white/50 mt-1">Raven Network Limited</p>
          </div>
        </div>

        <p className="text-lg text-white/60 mb-12 max-w-2xl leading-relaxed">
          Official logos and brand marks for the Raven ecosystem. Use these assets when representing our products in media, partnerships, and integrations.
        </p>

        {/* Usage Guidelines */}
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl mb-10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
            Usage Guidelines
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              Use the logos in their original proportions
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              Maintain adequate spacing around the logo
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">✗</span>
              Do not alter colors or distort the logos
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">✗</span>
              Do not place logos on busy or clashing backgrounds
            </li>
          </ul>
        </div>

        {/* Logo Cards */}
        <div className="space-y-8">
          {brandAssets.map((asset) => (
            <div
              key={asset.name}
              className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl hover:border-white/10 transition-colors"
            >
              {/* Logo Preview */}
              <div className={`${asset.bgClass} relative flex items-center justify-center py-16 px-8 border-b border-white/5`}>
                {/* Subtle grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                  }}
                />
                <img
                  src={asset.logo}
                  alt={`${asset.name} Logo`}
                  className="max-h-32 max-w-[280px] object-contain relative z-10 drop-shadow-2xl"
                />
              </div>

              {/* Info & Actions */}
              <div className="p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">{asset.name}</h3>
                  <p className="text-sm text-white/50 max-w-lg leading-relaxed">{asset.description}</p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <a
                    href={asset.logo}
                    download={`${asset.name.toLowerCase().replace(/\s+/g, "-")}-logo.png`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    PNG
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Twitter/X Cover Images */}
        <div className="mt-12 space-y-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
              Twitter / X Cover Images
            </h2>
            <p className="text-sm text-white/50 mb-6">Official banner images optimized for Twitter/X profiles (1500×500px).</p>
          </div>

          {[
            {
              name: "Raven Network",
              tagline: "Learn. Contribute. Build. Earn.",
              image: "/raven-network-cover.png",
              accent: "accent-cyan",
            },
            {
              name: "Raven Academy",
              tagline: "Master Web3. Earn Credentials.",
              image: "/raven-academy-cover.png",
              accent: "accent-purple",
            },
            {
              name: "Raven Wallet",
              tagline: "Your Gateway to Digital Assets.",
              image: "/raven-wallet-cover.png",
              accent: "accent-blue",
            },
          ].map((cover) => (
            <div
              key={cover.name}
              className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl hover:border-white/10 transition-colors"
            >
              {/* Cover Preview */}
              <div className="relative border-b border-white/5">
                <img
                  src={cover.image}
                  alt={`${cover.name} Twitter Cover`}
                  className="w-full object-cover"
                />
              </div>

              {/* Info & Download */}
              <div className="p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-white">{cover.name}</h3>
                  <p className="text-xs text-white/50">{cover.tagline}</p>
                </div>
                <a
                  href={cover.image}
                  download={`${cover.name.toLowerCase().replace(/\s+/g, "-")}-twitter-cover.png`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-white hover:bg-white/10 transition-colors shrink-0"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* NFT Collection */}
        <div className="mt-12 space-y-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
              Raven NFT Collection
            </h2>
            <p className="text-sm text-white/50">1,000 unique collectible Raven NFT artworks. Generate and collect your favorite traits.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {allNfts.slice(0, visibleCount).map((nft) => (
              <div
                key={nft.id}
                className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl hover:border-white/15 transition-all group hover:scale-[1.02]"
              >
                <div className="relative aspect-square overflow-hidden bg-black/40">
                  <img
                    src={`/nfts/raven-nft-${nft.id}.png`}
                    alt={nft.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      nft.trait === "Mythic" ? "bg-purple-500/80 text-white" :
                      nft.trait === "Legendary" ? "bg-amber-500/80 text-black" :
                      nft.trait === "Epic" ? "bg-rose-500/80 text-white" :
                      "bg-cyan-500/80 text-black"
                    }`}>
                      {nft.trait}
                    </span>
                  </div>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white truncate max-w-[100px]">{nft.name}</p>
                    <p className="text-[10px] text-white/40">#{nft.id} / 1000</p>
                  </div>
                  <a
                    href={`/nfts/raven-nft-${nft.id}.png`}
                    download={`raven-nft-${nft.id}.png`}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <Download className="w-3 h-3 text-white/70" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < allNfts.length && (
            <div className="flex justify-center pt-6">
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + 16, allNfts.length))}
                className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105"
              >
                Load More NFTs ({allNfts.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>

        {/* Color Palette */}
        <div className="mt-12 bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-10 backdrop-blur-xl">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
            Brand Colors
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { name: "Obsidian Black", hex: "#0b0b0c", ring: "ring-white/20" },
              { name: "Raven Cyan", hex: "#06b6d4", ring: "ring-cyan-400/30" },
              { name: "Raven Purple", hex: "#9333ea", ring: "ring-purple-400/30" },
              { name: "Raven Blue", hex: "#2563eb", ring: "ring-blue-400/30" },
              { name: "Pure White", hex: "#ffffff", ring: "ring-white/20" },
            ].map((color) => (
              <div key={color.name} className="space-y-2">
                <div
                  className={`w-full aspect-square rounded-2xl ring-1 ${color.ring}`}
                  style={{ backgroundColor: color.hex }}
                />
                <p className="text-xs font-semibold text-white">{color.name}</p>
                <p className="text-xs text-white/40 font-mono uppercase">{color.hex}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center py-12">
          <p className="text-white/50 text-sm mb-4">Need a specific format or have questions about brand usage?</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-cyan text-black font-bold text-sm rounded-full hover:bg-accent-cyan/90 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
