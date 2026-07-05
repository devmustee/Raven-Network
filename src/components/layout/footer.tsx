import React from "react";
import Link from "next/link";
import { MessageSquare, Globe, Share2, Video, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 relative flex items-center justify-center">
                <img src="/logo.png" alt="Raven Network Logo" className="object-contain w-full h-full" />
              </div>
              <span className="font-extrabold text-xl tracking-tight">Raven <span className="text-white/70 font-medium">Network</span></span>
            </Link>
            <p className="text-white/60 mb-6 max-w-sm">
              Build your Web3 career through contribution. Join Africa's largest contributor network today.
            </p>
            <div className="flex gap-4 items-center">
              {/* X (Twitter) */}
              <a href="https://x.com/Raven_netw0rk" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" title="Follow us on X">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Telegram Community */}
              <a href="https://t.me/ravennetworkcommunity" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-sky-400 transition-colors" title="Join Telegram Community">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </a>
              {/* Telegram Channel */}
              <a href="https://t.me/ravennetw0rk" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-sky-400 transition-colors" title="Join Telegram Channel">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0z" />
                  <path d="m15 9-6 6" />
                  <path d="m9 15 2.5-7.5L15 9l-7.5 2.5Z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Ecosystem</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li><Link href="#academy" className="hover:text-white transition-colors">Raven Academy</Link></li>
              <li><Link href="#wallet" className="hover:text-white transition-colors">Raven Wallet</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li><Link href="#pathways" className="hover:text-white transition-colors">Pathways</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li><Link href="#" className="hover:text-white transition-colors">Whitepaper</Link></li>
              <li><Link href="#faqs" className="hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/40">
          <p>© {new Date().getFullYear()} Raven Learning Systems Ltd. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
