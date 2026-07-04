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
            <div className="flex gap-4">
              <Link href="#" className="text-white/60 hover:text-white"><MessageSquare className="w-5 h-5" /></Link>
              <Link href="#" className="text-white/60 hover:text-white"><Send className="w-5 h-5" /></Link>
              <Link href="#" className="text-white/60 hover:text-white"><Globe className="w-5 h-5" /></Link>
              <Link href="#" className="text-white/60 hover:text-white"><Share2 className="w-5 h-5" /></Link>
              <Link href="#" className="text-white/60 hover:text-white"><Video className="w-5 h-5" /></Link>
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
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
