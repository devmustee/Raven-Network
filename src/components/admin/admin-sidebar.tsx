"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Users, 
  BookOpen, 
  Award, 
  CheckSquare, 
  LayoutDashboard, 
  Shield, 
  Home
} from "lucide-react";
import { cn } from "@/components/ui/button";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/quests", label: "Quests", icon: BookOpen },
  { href: "/admin/opportunities", label: "Opportunities", icon: Award },
  { href: "/admin/submissions", label: "Submissions", icon: CheckSquare },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0B0B0C] border-r border-white/10 flex flex-col h-screen sticky top-0">
      {/* Brand Logo / Title */}
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#A060FF] flex items-center justify-center shadow-lg shadow-[#00F0FF]/25">
          <Shield className="w-4 h-4 text-black font-bold" />
        </div>
        <div>
          <h1 className="font-bold text-white tracking-wide text-sm">RAVEN HQ</h1>
          <span className="text-[10px] text-[#00F0FF] font-semibold tracking-widest uppercase">Admin Panel</span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                isActive 
                  ? "bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20" 
                  : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <Icon className={cn(
                "w-4 h-4 transition-transform duration-200 group-hover:scale-110",
                isActive ? "text-[#00F0FF]" : "text-white/40 group-hover:text-white/60"
              )} />
              {link.label}
              
              {isActive && (
                <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-lg shadow-[#00F0FF]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 border border-transparent"
        >
          <Home className="w-4 h-4 text-white/40" />
          Back to Portal
        </Link>
      </div>
    </aside>
  );
}
