"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { PillarsSection } from "@/components/sections/pillars-section";
import { FAQSection } from "@/components/sections/faq-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { OpportunitiesModal } from "@/components/ui/opportunities-modal";
import { ProfileModal, ProfileData } from "@/components/ui/profile-modal";
import { WorkspaceHub } from "@/components/sections/workspace-hub";
import { PartnersSection } from "@/components/sections/partners-section";
import { AboutSection } from "@/components/sections/about-section";
import { TeamSection } from "@/components/sections/founder-section";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isOpportunitiesModalOpen, setIsOpportunitiesModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    avatar: "",
    github: "",
    telegram: "",
    x: "",
    tiktok: "",
    instagram: "",
    facebook: "",
    streakDays: 35,
  });

  React.useEffect(() => {
    const token = localStorage.getItem("raven_user_token");
    if (token) {
      fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setWalletAddress(data.user.walletAddress);
          setProfile({
            name: data.user.name,
            avatar: data.user.avatar || "",
            github: data.user.github || "",
            telegram: data.user.telegram || "",
            x: data.user.x || "",
            tiktok: "",
            instagram: "",
            facebook: "",
            streakDays: data.user.streakDays || 0,
          });
        } else {
          localStorage.removeItem("raven_user_token");
        }
      })
      .catch(() => {
        localStorage.removeItem("raven_user_token");
      });
    }
  }, []);

  return (
    <>
      <Navbar 
        walletAddress={walletAddress} 
        setWalletAddress={setWalletAddress} 
        isConnectModalOpen={isConnectModalOpen}
        setIsConnectModalOpen={setIsConnectModalOpen}
        profile={profile}
        setProfile={setProfile}
        setIsProfileModalOpen={setIsProfileModalOpen}
      />
      
      <main className="flex flex-col flex-1">
        {!walletAddress ? (
          <>
            <HeroSection 
              walletAddress={walletAddress}
              setIsConnectModalOpen={setIsConnectModalOpen}
            />
            <PartnersSection />
            <AboutSection />
            <TeamSection />
            <PillarsSection 
              walletAddress={walletAddress}
              setIsConnectModalOpen={setIsConnectModalOpen}
              setIsOpportunitiesModalOpen={setIsOpportunitiesModalOpen}
            />
            <FAQSection />
            <NewsletterSection />
          </>
        ) : (
          <div className="container mx-auto px-4 pt-28 pb-16">
            <WorkspaceHub 
              walletAddress={walletAddress} 
              profile={profile} 
              setProfile={setProfile}
              setIsProfileModalOpen={setIsProfileModalOpen}
              setWalletAddress={setWalletAddress}
            />
          </div>
        )}
      </main>

      {!walletAddress && <Footer />}

      <OpportunitiesModal 
        isOpen={isOpportunitiesModalOpen} 
        onClose={() => setIsOpportunitiesModalOpen(false)} 
      />

      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        profile={profile} 
        onSave={setProfile} 
      />
    </>
  );
}
