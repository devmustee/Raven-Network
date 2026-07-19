"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { Button } from "../ui/button";
import { ProfileData, BadgeIcon } from "../ui/profile-modal";
import { 
  User, Flame, Trophy, Award, Zap, Briefcase, 
  ExternalLink, CheckSquare, Check, Calendar, Sparkles, X, Clock, Lock, AlertCircle, Bell,
  CheckCircle2, Info, Folder, MessageCircle, Heart, Send, Users, Share2, Bookmark
} from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";

interface WorkspaceHubProps {
  walletAddress: string;
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
  setIsProfileModalOpen: (open: boolean) => void;
  setWalletAddress: (addr: string | null) => void;
}

const initialLeaderboard = [
  { rank: 1, name: "MustaphaDev", reputation: 980, badge: "TON Dev Legend", avatar: "/devmustee.jpg", isUser: false, socials: { x: "@devmustee", telegram: "devmustee", github: "devmustee", tiktok: "", instagram: "mustapha_dev", facebook: "" } },
  { rank: 2, name: "AfroCoder", reputation: 920, badge: "EVM Architect", avatar: "", isUser: false, socials: { github: "afrocoder", telegram: "afrocoder_tg", x: "@afrocoder", tiktok: "", instagram: "", facebook: "" } },
  { rank: 3, name: "FatimaTON", reputation: 875, badge: "TON OG Builder", avatar: "", isUser: false, socials: { telegram: "fatimaton", x: "@fatima_ton", github: "", tiktok: "", instagram: "", facebook: "" } },
  { rank: 5, name: "KofiWeb3", reputation: 790, badge: "Contributor", avatar: "", isUser: false, socials: { github: "kofiweb3", telegram: "", x: "@kofiweb3", tiktok: "", instagram: "", facebook: "" } },
  { rank: 6, name: "Zubairu", reputation: 740, badge: "Academy Graduate", avatar: "", isUser: false, socials: { x: "@zubairu_ton", telegram: "zubairu", github: "", tiktok: "", instagram: "", facebook: "" } }
];

const jobs = [
  { title: "Smart Contract Engineer", company: "AssetChain Labs", salary: "$120k - $165k", type: "Full-Time", location: "Remote" },
  { title: "Community & DevRel Lead", company: "Raven Network", salary: "$80k - $110k", type: "Full-Time", location: "Remote" },
  { title: "Technical Writer (EVM/TON)", company: "Raven Academy", salary: "$5k - $8k / mo", type: "Contract", location: "Remote" }
];

const hackathons = [
  { title: "TON Africa Builders Hackathon", prizePool: "$50,000", dates: "Aug 1 - Aug 20", host: "TON Foundation", status: "active" },
  { title: "EVM Layer-2 Scaling Quest", prizePool: "$30,000", dates: "Sep 5 - Sep 15", host: "AssetChain", status: "active" },
  { title: "Raven Genesis Hackathon", prizePool: "$20,000", dates: "May 1 - May 30", host: "Raven Network", status: "completed" }
];

const contests = [
  { title: "Web3 Educational Article Contest", prizePool: "$5,000", deadline: "Ends in 6 days", participants: "142 entries", status: "active" },
  { title: "Ecosystem Logo Rebrand Design", prizePool: "$3,500", deadline: "Ends in 12 days", participants: "89 entries", status: "active" },
  { title: "Meme Creation Bounty", prizePool: "$1,000", deadline: "Ended 1 month ago", participants: "340 entries", status: "completed" }
];

const ecosystemProjects = [
  { 
    title: "Raven Academy", 
    description: "A comprehensive Web3 learning platform that matches course achievements with on-chain graduation NFTs, equipping African builders for global opportunities.", 
    status: "Production", 
    category: "Education",
    logo: "/academy_logo.jpg",
    link: "#academy",
    reputationRequired: 800,
    tags: ["L2S", "EdTech", "TON NFT"]
  },
  { 
    title: "Raven Wallet", 
    description: "A fast, secure, non-custodial wallet on the TON Blockchain designed specifically for African Web3 micro-contributions and global stablecoin cashouts.", 
    status: "Beta Testing", 
    category: "DeFi / Payments",
    logo: "/wallet_logo.png",
    link: "#wallet",
    reputationRequired: 900,
    tags: ["TON", "Stablecoins", "Payments"]
  },
  { 
    title: "Flock Post Generator AI", 
    description: "An AI-powered social growth and content scheduler tool designed to boost Raven Network contributors' impact across X and Telegram channels.", 
    status: "Live", 
    category: "Social / AI",
    logo: "/flock_logo.jpg",
    link: "https://flock-post-generator.vercel.app/",
    reputationRequired: 850,
    tags: ["AI Tools", "Social Growth", "X.com"]
  }
];

export function WorkspaceHub({ 
  walletAddress, 
  profile, 
  setProfile,
  setIsProfileModalOpen,
  setWalletAddress 
}: WorkspaceHubProps) {
  const [mainTab, setMainTab] = useState<"opportunities" | "projects" | "leaderboard" | "daily" | "community">("opportunities");
  const [opportunitiesTab, setOpportunitiesTab] = useState<"jobs" | "hackathons" | "contests">("jobs");
  const [opportunityFilter, setOpportunityFilter] = useState<"all" | "active" | "completed">("all");
  const [viewingUserProfile, setViewingUserProfile] = useState<any | null>(null);
  
  // Community States
  const [posts, setPosts] = useState<any[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [dmContact, setDmContact] = useState<any | null>(null);
  const [bookmarkedPostIds, setBookmarkedPostIds] = useState<string[]>([]);
  const [expandedCommentsPostId, setExpandedCommentsPostId] = useState<string | null>(null);
  const [newCommentContentMap, setNewCommentContentMap] = useState<Record<string, string>>({});
  const [activeHashtagFilter, setActiveHashtagFilter] = useState<string | null>(null);
  const [feedViewFilter, setFeedViewFilter] = useState<"all" | "bookmarks">("all");
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessageContent, setNewMessageContent] = useState("");
  const [followersCountMap, setFollowersCountMap] = useState<Record<string, {followers: number, following: number, isFollowing: boolean}>>({});
  
  // Daily Tasks state - time-windowed consistency booster
  const [dailyTasks, setDailyTasks] = useState<any[]>([
    { id: 1, text: "Morning: Post GM on X", xp: 10, done: false, start: 6 * 60, end: 12 * 60, step: 0, isTelegramChannel: false, isTelegramCommunity: false, isX: true },
    { id: 2, text: "Morning: Post 2 original tweets", xp: 15, done: false, start: 6 * 60, end: 12 * 60, step: 0, isTelegramChannel: false, isTelegramCommunity: false, isX: true },
    { id: 3, text: "Morning: Write 50 quality replies", xp: 20, done: false, start: 6 * 60, end: 12 * 60, step: 0, isTelegramChannel: false, isTelegramCommunity: false, isX: true },
    { id: 4, text: "Morning: Check Raven Telegram Channel", xp: 10, done: false, start: 6 * 60, end: 12 * 60, step: 0, isTelegramChannel: true, isTelegramCommunity: false, isX: false },
    { id: 5, text: "Morning: Interact with Telegram Community", xp: 15, done: false, start: 6 * 60, end: 12 * 60, step: 0, isTelegramChannel: false, isTelegramCommunity: true, isX: false },
    
    { id: 6, text: "Evening: Post Good Evening on X", xp: 10, done: false, start: 12 * 60, end: 18 * 60, step: 0, isTelegramChannel: false, isTelegramCommunity: false, isX: true },
    { id: 7, text: "Evening: Post 3 original tweets", xp: 15, done: false, start: 12 * 60, end: 18 * 60, step: 0, isTelegramChannel: false, isTelegramCommunity: false, isX: true },
    { id: 8, text: "Evening: Write 50 quality replies", xp: 20, done: false, start: 12 * 60, end: 18 * 60, step: 0, isTelegramChannel: false, isTelegramCommunity: false, isX: true },
    { id: 9, text: "Evening: Check Raven Telegram Channel", xp: 10, done: false, start: 12 * 60, end: 18 * 60, step: 0, isTelegramChannel: true, isTelegramCommunity: false, isX: false },
    { id: 10, text: "Evening: Interact with Telegram Community", xp: 15, done: false, start: 12 * 60, end: 18 * 60, step: 0, isTelegramChannel: false, isTelegramCommunity: true, isX: false },
    
    { id: 11, text: "Night: Post Good Night on X", xp: 10, done: false, start: 18 * 60, end: 24 * 60, step: 0, isTelegramChannel: false, isTelegramCommunity: false, isX: true },
    { id: 12, text: "Night: Post 2 original tweets", xp: 15, done: false, start: 18 * 60, end: 24 * 60, step: 0, isTelegramChannel: false, isTelegramCommunity: false, isX: true },
    { id: 13, text: "Night: Write 50 quality replies", xp: 20, done: false, start: 18 * 60, end: 24 * 60, step: 0, isTelegramChannel: false, isTelegramCommunity: false, isX: true },
    { id: 14, text: "Night: Check Raven Telegram Channel", xp: 10, done: false, start: 18 * 60, end: 24 * 60, step: 0, isTelegramChannel: true, isTelegramCommunity: false, isX: false },
    { id: 15, text: "Night: Interact with Telegram Community", xp: 15, done: false, start: 18 * 60, end: 24 * 60, step: 0, isTelegramChannel: false, isTelegramCommunity: true, isX: false },
    
    { id: 16, text: "Daily Goal: 10 original posts total", xp: 25, done: false, start: 0, end: 24 * 60, step: 0, isTelegramChannel: false, isTelegramCommunity: false, isX: false },
    { id: 17, text: "Daily Goal: 150 quality replies total", xp: 30, done: false, start: 0, end: 24 * 60, step: 0, isTelegramChannel: false, isTelegramCommunity: false, isX: false }
  ]);
  const { addNotification, history, unreadCount, markAllAsRead } = useNotifications();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [selectedDashboardBadge, setSelectedDashboardBadge] = useState<string | null>(null);
  
  const [questFilter, setQuestFilter] = useState<"all" | "morning" | "evening" | "night" | "goals">("all");
  const [floatingXps, setFloatingXps] = useState<{ id: string; text: string; top: number; left: number }[]>([]);

  // Backend Persisted States
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [applyingOppId, setApplyingOppId] = useState<string | null>(null);
  const [submissionLink, setSubmissionLink] = useState("");
  const [submittingOpp, setSubmittingOpp] = useState(false);
  const [reputationXP, setReputationXP] = useState(820);

  // Time Engine
  const [currentMin, setCurrentMin] = useState(() => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  });

  const [unlockedTasks, setUnlockedTasks] = useState<Set<number>>(() => {
    const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
    return new Set(dailyTasks.filter(t => nowMin >= t.start).map(t => t.id));
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentMin(now.getHours() * 60 + now.getMinutes());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 6 && hours < 12) setQuestFilter("morning");
    else if (hours >= 12 && hours < 18) setQuestFilter("evening");
    else if (hours >= 18 && hours < 24) setQuestFilter("night");
    else setQuestFilter("goals");
  }, []);

  const triggerXpAnimation = (text: string, rect?: DOMRect | null) => {
    if (!rect) return;
    const top = rect.top + window.scrollY - 10;
    const left = rect.left + window.scrollX + rect.width / 2;
    const id = Math.random().toString(36).substring(2, 9);
    setFloatingXps(prev => [...prev, { id, text, top, left }]);
    setTimeout(() => {
      setFloatingXps(prev => prev.filter(item => item.id !== id));
    }, 1200);
  };

  React.useEffect(() => {
    const newlyUnlocked = dailyTasks.filter(
      t => currentMin >= t.start && currentMin < t.end && !unlockedTasks.has(t.id)
    );
    if (newlyUnlocked.length > 0) {
      newlyUnlocked.forEach(t => {
        addNotification(`Time to complete: ${t.text}`, { title: "New Task Available", type: "default" });
        setUnlockedTasks(prev => new Set(prev).add(t.id));
      });
    }
  }, [currentMin, dailyTasks, unlockedTasks]);

  // Load data from Backend APIs
  React.useEffect(() => {
    const token = localStorage.getItem("raven_user_token");
    if (!token) return;

    const headers = { Authorization: `Bearer ${token}` };

    // 1. Fetch Profile to get actual XP
    fetch("/api/profile", { headers })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setReputationXP(data.user.reputationXP);
        }
      })
      .catch(err => console.error("Profile fetch failed", err));

    // 2. Fetch Quests and completions
    fetch("/api/quests", { headers })
      .then(res => res.json())
      .then(data => {
        if (data.quests) {
          const mapped = data.quests.map((q: any) => {
            const isX = q.verificationType === "twitter_retweet";
            const isTG = q.verificationType === "telegram_join";
            const isGit = q.verificationType === "github_commit";
            
            let start = 0;
            let end = 24 * 60;
            if (q.category === "morning") { start = 6 * 60; end = 12 * 60; }
            else if (q.category === "evening") { start = 12 * 60; end = 18 * 60; }
            else if (q.category === "night") { start = 18 * 60; end = 24 * 60; }

            return {
              id: q.id,
              text: `${q.category.charAt(0).toUpperCase() + q.category.slice(1)}: ${q.title} - ${q.description}`,
              xp: q.xpReward,
              done: data.completedQuestIds.includes(q.id),
              start,
              end,
              step: 0,
              isTelegramChannel: isTG && q.title.toLowerCase().includes("channel"),
              isTelegramCommunity: isTG && !q.title.toLowerCase().includes("channel"),
              isX,
              isGit,
              rawQuest: q
            };
          });
          setDailyTasks(mapped);
          
          const morningChecklistCompleted = data.completedQuestIds.includes("m1");
          if (morningChecklistCompleted) {
            setHasCheckedIn(true);
          }
        }
      })
      .catch(err => console.error("Quests fetch failed", err));

    // 3. Fetch Opportunities and submissions
    fetch("/api/opportunities", { headers })
      .then(res => res.json())
      .then(data => {
        if (data.opportunities) {
          setOpportunities(data.opportunities);
        }
        if (data.submissions) {
          setSubmissions(data.submissions);
        }
      })
      .catch(err => console.error("Opportunities fetch failed", err));
  }, [walletAddress]);

  // Load Leaderboard on tab activation
  React.useEffect(() => {
    if (mainTab === "leaderboard") {
      fetch("/api/leaderboard")
        .then(res => res.json())
        .then(data => {
          if (data.users) {
            const mapped = data.users.map((u: any) => ({
              rank: u.rank,
              name: u.name,
              reputation: u.reputation,
              badge: getBadgeForUser(u.name, u.streakDays) || "Contributor",
              avatar: u.avatar || "",
              isUser: u.walletAddress === walletAddress,
              socials: { github: u.github, telegram: u.telegram, x: u.x }
            }));
            setLeaderboard(mapped);
          }
        })
        .catch(err => console.error("Leaderboard fetch failed", err));
    } else if (mainTab === "community") {
      const token = localStorage.getItem("raven_user_token");
      if (token) {
        fetch("/api/community", { headers: { Authorization: `Bearer ${token}` } })
          .then(res => res.json())
          .then(data => {
            if (data.posts) setPosts(data.posts);
          });

        // Batch pre-fetch suggested follow relationships
        const suggestedIds = ["user-1", "user-3", "user-4"];
        suggestedIds.forEach(id => {
          fetch(`/api/followers?checkRelation=${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => res.json())
            .then(data => {
              if (data.isFollowing !== undefined) {
                setFollowersCountMap(prev => ({
                  ...prev,
                  [id]: {
                    ...prev[id],
                    isFollowing: data.isFollowing
                  }
                }));
              }
            });
        });
      }
    }
  }, [mainTab, walletAddress]);

  React.useEffect(() => {
    if (dmContact) {
      const token = localStorage.getItem("raven_user_token");
      if (!token) return;
      const fetchMsgs = () => {
        fetch(`/api/messages?contactId=${dmContact.id}`, { headers: { Authorization: `Bearer ${token}` } })
          .then(res => res.json())
          .then(data => {
            if (data.messages) setMessages(data.messages);
          });
      };
      fetchMsgs();
      const interval = setInterval(fetchMsgs, 3000);
      return () => clearInterval(interval);
    }
  }, [dmContact]);

  React.useEffect(() => {
    if (viewingUserProfile && viewingUserProfile.id) {
      const token = localStorage.getItem("raven_user_token");
      if (!token) return;
      
      // Fetch follower count
      fetch(`/api/followers?userId=${viewingUserProfile.id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => {
          if (data.followers !== undefined) {
            setFollowersCountMap(prev => ({
              ...prev,
              [viewingUserProfile.id]: {
                ...prev[viewingUserProfile.id],
                followers: data.followers,
                following: data.following
              }
            }));
          }
        });

      // Fetch whether I'm following them
      fetch(`/api/followers?checkRelation=${viewingUserProfile.id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => {
          if (data.isFollowing !== undefined) {
            setFollowersCountMap(prev => ({
              ...prev,
              [viewingUserProfile.id]: {
                ...prev[viewingUserProfile.id],
                isFollowing: data.isFollowing
              }
            }));
          }
        });
    }
  }, [viewingUserProfile]);

  // Fetch logged-in user follower stats on mount/profile load
  React.useEffect(() => {
    const profileId = profile.id;
    if (profileId) {
      const token = localStorage.getItem("raven_user_token");
      if (!token) return;
      fetch(`/api/followers?userId=${profileId}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => {
          if (data.followers !== undefined) {
            setFollowersCountMap(prev => ({
              ...prev,
              [profileId]: {
                followers: data.followers,
                following: data.following,
                isFollowing: false
              }
            }));
          }
        });
    }
  }, [profile.id, posts]);

  const calculateContributionsScore = () => {
    const userPostsCount = posts.filter(p => p.userId === profile.id).length;
    const userLikesReceived = posts.filter(p => p.userId === profile.id).reduce((sum, p) => sum + (p.likes?.length || 0), 0);
    const userFollowersCount = followersCountMap[profile.id || ""]?.followers || 0;
    const approvedSubmissions = submissions.filter(s => s.isApproved).length;
    const pendingSubmissions = submissions.filter(s => !s.isApproved).length;

    const postsScore = Math.min(45, userPostsCount * 15);
    const likesScore = Math.min(20, userLikesReceived * 5);
    const followersScore = Math.min(20, userFollowersCount * 10);
    const submissionScore = Math.min(15, approvedSubmissions * 15 + pendingSubmissions * 5);
    
    return Math.min(100, 20 + postsScore + likesScore + followersScore + submissionScore);
  };

  const calculateReputationScore = () => {
    const streakScore = Math.max(1, Math.min((profile.streakDays / 365) * 100, 100));
    const consistencyScore = Math.min(100, 75 + profile.streakDays);
    const contribScore = calculateContributionsScore();
    const xScore = 80;
    const tgScore = 65;
    return Math.round((streakScore + consistencyScore + contribScore + xScore + tgScore) / 5);
  };

  const getBadgeForUser = (name: string, currentUserStreak: number) => {
    let userStreak = 10;
    if (name === "MustaphaDev") userStreak = 365;
    else if (name === "AfroCoder") userStreak = 120;
    else if (name === "FatimaTON") userStreak = 90;
    else if (name === "KofiWeb3") userStreak = 30;
    else if (name === "Zubairu") userStreak = 15;
    else userStreak = currentUserStreak;

    if (userStreak >= 365) return "Legend";
    if (userStreak >= 180) return "Shadow";
    if (userStreak >= 120) return "Sentinel";
    if (userStreak >= 90) return "Vanguard";
    if (userStreak >= 60) return "Pathfinder";
    if (userStreak >= 30) return "Scout";
    if (userStreak >= 15) return "Apprentice";
    if (userStreak >= 7) return "Fledgling";
    if (userStreak >= 3) return "Novice";
    return "Initiate";
  };

  const handleDailyCheckIn = (e?: React.MouseEvent) => {
    if (hasCheckedIn) return;
    const rect = e?.currentTarget ? e.currentTarget.getBoundingClientRect() : null;
    
    // Check in is represented by complete morning quest "m1"
    const token = localStorage.getItem("raven_user_token");
    fetch("/api/quests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ questId: "m1" })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setHasCheckedIn(true);
        setReputationXP(data.reputationXP);
        setProfile(p => ({
          ...p,
          streakDays: data.streakDays
        }));
        
        // Mark task done locally
        setDailyTasks(prev => prev.map(t => t.id === "m1" ? { ...t, done: true } : t));
        
        addNotification("Daily Streak claimed successfully! +1 Day added.", { type: "success", title: "Streak Claimed" });
        if (rect) triggerXpAnimation("+1 Streak Day ⚡", rect);
      }
    })
    .catch(err => console.error("Streak check-in failed", err));
  };

  const toggleTask = (id: any, e?: React.MouseEvent) => {
    const task = dailyTasks.find(t => t.id === id);
    if (!task) return;
    const rect = e?.currentTarget ? e.currentTarget.getBoundingClientRect() : null;

    if (task.start > currentMin) {
      addNotification("This task is locked. Come back later!", { type: "warning", title: "Task Locked" });
      return;
    }
    if (currentMin >= task.end && !task.done) {
      addNotification("You missed this task for today!", { type: "warning", title: "Task Missed" });
      return;
    }

    if (task.isX && !task.done) {
      if (task.step === 0) {
        window.open("https://x.com", "_blank");
        setDailyTasks(prev => prev.map(t => t.id === id ? { ...t, step: 1 } : t));
        addNotification("X Opened... Click again to Verify Task!", { type: "default", title: "Step 1/2" });
        return;
      }
    }

    if (task.isTelegramChannel && !task.done) {
      if (task.step === 0) {
        window.open("https://t.me/ravennetw0rk", "_blank");
        setDailyTasks(prev => prev.map(t => t.id === id ? { ...t, step: 1 } : t));
        addNotification("Telegram Channel Opened... Click again to Verify Task!", { type: "default", title: "Step 1/2" });
        return;
      }
    }

    if (task.isTelegramCommunity && !task.done) {
      if (task.step === 0) {
        window.open("https://t.me/ravennetworkcommunity", "_blank");
        setDailyTasks(prev => prev.map(t => t.id === id ? { ...t, step: 1 } : t));
        addNotification("Telegram Community Opened... Click again to Verify Task!", { type: "default", title: "Step 1/2" });
        return;
      }
    }

    const nextState = !task.done;
    if (nextState) {
      const token = localStorage.getItem("raven_user_token");
      fetch("/api/quests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ questId: id })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          addNotification(`+${task.xp} XP Earned! Streak protected.`, { type: "achievement", title: "Task Completed" });
          if (rect) triggerXpAnimation(`+${task.xp} XP`, rect);
          
          setReputationXP(data.reputationXP);
          setProfile(p => ({
            ...p,
            streakDays: data.streakDays
          }));
          setDailyTasks(prev => prev.map(t => t.id === id ? { ...t, done: true } : t));
        }
      })
      .catch(err => console.error("Quest log failed", err));
    }
  };

  // Removed showNotification wrapper


  // Construct current dynamic leaderboard row for the user
  const userRankEntry = {
    rank: 4,
    name: profile.name || "You (Connecting)",
    reputation: reputationXP,
    badge: profile.github ? "Verified Dev" : "Contributor",
    avatar: profile.avatar,
    isUser: true,
    socials: {
      github: profile.github,
      telegram: profile.telegram,
      x: profile.x,
      instagram: profile.instagram,
      facebook: profile.facebook,
      tiktok: profile.tiktok
    }
  };

  // Compile leaderboard list
  const fullLeaderboard = [
    initialLeaderboard[0],
    initialLeaderboard[1],
    initialLeaderboard[2],
    userRankEntry,
    initialLeaderboard[3],
    initialLeaderboard[4]
  ];

  // Filter posts based on bookmark switch and hashtag selection
  const filteredPosts = posts.filter(p => {
    if (feedViewFilter === "bookmarks" && !bookmarkedPostIds.includes(p.id)) return false;
    if (activeHashtagFilter && !p.content.toLowerCase().includes(activeHashtagFilter.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8 relative">

      {/* Dashboard Headline */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">Contributor Hub</h2>
          <p className="text-xs text-white/40 mt-1">Manage your developer profile, daily streaks, and opportunities.</p>
        </div>
        
        {/* Notification Button & Dropdown */}
        <div className="relative z-50">
          <button 
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              if (!isDropdownOpen && unreadCount > 0) markAllAsRead();
            }}
            className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all group"
            title="Notifications"
          >
            <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-purple rounded-full border-2 border-black flex items-center justify-center text-[8px] font-bold text-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-full mt-3 w-80 max-h-[400px] overflow-y-auto bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="p-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-black/90 backdrop-blur-md z-10">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Bell className="w-4 h-4 text-accent-purple" />
                    Notifications
                  </h3>
                  <span className="text-[10px] text-white/40">{history.length} total</span>
                </div>
                
                <div className="p-2 space-y-1">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-white/40 text-xs">
                      No notifications yet.
                    </div>
                  ) : (
                    history.map(notif => (
                      <div key={notif.id} className="p-3 hover:bg-white/5 rounded-xl transition-colors cursor-default flex items-start gap-3">
                        <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          notif.type === "success" ? "bg-green-500/20 text-green-400" :
                          notif.type === "achievement" ? "bg-yellow-500/20 text-yellow-400" :
                          notif.type === "warning" ? "bg-red-500/20 text-red-400" :
                          "bg-accent-cyan/20 text-accent-cyan"
                        }`}>
                          {notif.type === "success" && <CheckCircle2 className="w-3 h-3" />}
                          {notif.type === "achievement" && <Sparkles className="w-3 h-3" />}
                          {notif.type === "warning" && <AlertCircle className="w-3 h-3" />}
                          {notif.type === "default" && <Info className="w-3 h-3" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          {notif.title && <div className="text-xs font-bold text-white mb-0.5">{notif.title}</div>}
                          <div className="text-[10px] text-white/60 leading-tight">{notif.message}</div>
                          <div className="text-[8px] text-white/30 mt-1">
                            {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ================= MAIN TABS ================= */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white/[0.02] border border-white/5 backdrop-blur-2xl rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
        <button 
          onClick={() => setMainTab("opportunities")} 
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${mainTab === "opportunities" ? "bg-accent-purple/15 text-accent-purple border border-accent-purple/30 shadow-[0_0_15px_rgba(147,51,234,0.1)] animate-pulse-subtle" : "border border-transparent text-white/45 hover:text-white/80 hover:bg-white/[0.04]"}`}
        >
          Ecosystem Opportunities
        </button>
        <button 
          onClick={() => setMainTab("projects")} 
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${mainTab === "projects" ? "bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/35 shadow-[0_0_15px_rgba(0,240,255,0.1)] font-black" : "border border-transparent text-white/45 hover:text-white/80 hover:bg-white/[0.04]"}`}
        >
          Ecosystem Projects
        </button>
        <button 
          onClick={() => setMainTab("leaderboard")} 
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${mainTab === "leaderboard" ? "bg-accent-blue/15 text-accent-blue border border-accent-blue/30 shadow-[0_0_15px_rgba(0,152,234,0.1)]" : "border border-transparent text-white/45 hover:text-white/80 hover:bg-white/[0.04]"}`}
        >
          Top Contributors Leaderboard
        </button>
        <button 
          onClick={() => setMainTab("daily")} 
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${mainTab === "daily" ? "bg-orange-500/15 text-orange-400 border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.1)]" : "border border-transparent text-white/45 hover:text-white/80 hover:bg-white/[0.04]"}`}
        >
          Daily Task
        </button>
        <button 
          onClick={() => setMainTab("community")} 
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${mainTab === "community" ? "bg-green-500/15 text-green-400 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]" : "border border-transparent text-white/45 hover:text-white/80 hover:bg-white/[0.04]"}`}
        >
          Community Hub
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-stretch mb-8">
        
        {/* ================= LEFT COLUMN: PROFILE CARD ================= */}
        <div className="lg:col-span-4">
          
          {/* Contributor Profile Card */}
          <GlassCard className="p-6 border border-white/5 relative overflow-hidden h-full group transition-all duration-300 hover:border-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-purple/10 rounded-full blur-xl pointer-events-none" />
            
            {/* Edit Profile Button */}
            <button 
              onClick={() => setIsProfileModalOpen(true)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-accent-cyan/30 transition-all z-10 hover:scale-105 active:scale-95"
              title="Edit Profile"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>

            <div className="flex flex-col items-center text-center">
              <span className="block text-[9px] uppercase tracking-widest text-accent-cyan font-black mb-6">
                Raven Contributor
              </span>
              
              {/* Premium Avatar Container with animated neon gradient ring */}
              <div className="relative w-24 h-24 mb-4 group/avatar">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full blur-md opacity-50 group-hover/avatar:opacity-80 transition duration-500 animate-pulse" />
                <div className="relative w-full h-full rounded-full bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                  {profile.avatar ? (
                    <img src={profile.avatar} className="w-full h-full object-cover group-hover/avatar:scale-110 transition duration-300" alt="User Avatar" />
                  ) : (
                    <User className="w-10 h-10 text-white/40" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mt-1">
                <h3 className="font-bold text-lg text-white tracking-tight">{profile.name || "Unnamed Contributor"}</h3>
                {(() => {
                  const badgeName = getBadgeForUser(profile.name, profile.streakDays);
                  return badgeName ? (
                    <div title={`${badgeName} Badge`} className="flex-shrink-0 cursor-pointer hover:scale-110 transition-transform" onClick={() => setSelectedDashboardBadge(badgeName)}>
                      <BadgeIcon name={badgeName} className="w-4 h-4 shadow-[0_0_10px_currentColor]" />
                    </div>
                  ) : null;
                })()}
              </div>
              
              <span className="text-[10px] text-white/30 font-mono tracking-wider mt-1 px-3 py-1 bg-white/[0.02] border border-white/5 rounded-full">
                {walletAddress && walletAddress.length > 18 ? `${walletAddress.slice(0, 10)}...${walletAddress.slice(-6)}` : walletAddress}
              </span>
              
              {profile.bio && (
                <p className="text-xs text-white/50 mt-4 max-w-[240px] leading-relaxed italic border-t border-white/5 pt-4">
                  "{profile.bio}"
                </p>
              )}
              
              {/* Profile Social indicators */}
              <div className="flex gap-2.5 items-center justify-center mt-5">
                {/* GitHub */}
                <span 
                  title={profile.github ? `GitHub: ${profile.github}` : "GitHub Not Linked"} 
                  className={`p-2 rounded-xl border transition-all duration-300 ${
                    profile.github ? "bg-white/5 border-white/15 text-white hover:border-white/30 hover:scale-105" : "bg-white/[0.01] border-white/5 text-white/20 opacity-30 cursor-default"
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                  </svg>
                </span>

                {/* Telegram */}
                <a 
                  href={profile.telegram ? `https://t.me/${profile.telegram}` : undefined}
                  target="_blank" rel="noopener noreferrer"
                  title={profile.telegram ? `Telegram: ${profile.telegram}` : "Telegram Not Linked"} 
                  className={`block p-2 rounded-xl border transition-all duration-300 ${profile.telegram ? "bg-[#2AABEE]/10 border-[#2AABEE]/30 text-[#2AABEE] hover:border-[#2AABEE]/60 hover:scale-105" : "bg-white/[0.01] border-white/5 text-white/20 opacity-30 cursor-default"}`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </a>

                {/* X */}
                <a 
                  href={profile.x ? `https://x.com/${profile.x}` : undefined}
                  target="_blank" rel="noopener noreferrer"
                  title={profile.x ? `X: ${profile.x}` : "X Not Linked"} 
                  className={`block p-2 rounded-xl border transition-all duration-300 ${profile.x ? "bg-white/5 border-white/15 text-white hover:border-white/35 hover:scale-105" : "bg-white/[0.01] border-white/5 text-white/20 opacity-30 cursor-default"}`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* TikTok */}
                <span 
                  title={profile.tiktok ? `TikTok: ${profile.tiktok}` : "TikTok Not Linked"} 
                  className={`p-2 rounded-xl border transition-all duration-300 ${
                    profile.tiktok ? "bg-pink-500/10 border-pink-500/30 text-pink-500 hover:border-pink-500/60 hover:scale-105" : "bg-white/[0.01] border-white/5 text-white/20 opacity-30 cursor-default"
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95.89 2.24 1.43 3.58 1.49v3.95c-1.74-.08-3.41-.75-4.73-1.89-.13-.11-.26-.22-.39-.34v6.86c.03 2.12-.9 4.19-2.52 5.56-1.92 1.63-4.66 2.1-7.05 1.22C4.5 20.18 2.8 17.55 3.05 14.8c.25-2.78 2.45-5.12 5.23-5.36 1.15-.09 2.3.17 3.3.75v4.06c-.84-.52-1.85-.71-2.8-.52-1.39.26-2.53 1.43-2.77 2.84-.28 1.62.67 3.23 2.25 3.66 1.44.4 3.05-.22 3.73-1.57.19-.38.28-.79.28-1.22V.02z" />
                  </svg>
                </span>

                {/* Instagram */}
                <a 
                  href={profile.instagram ? `https://instagram.com/${profile.instagram}` : undefined}
                  target="_blank" rel="noopener noreferrer"
                  title={profile.instagram ? `Instagram: ${profile.instagram}` : "Instagram Not Linked"} 
                  className={`block p-2 rounded-xl border transition-all duration-300 ${profile.instagram ? "bg-pink-500/10 border-pink-500/30 text-pink-400 hover:border-pink-500/65 hover:scale-105" : "bg-white/[0.01] border-white/5 text-white/20 opacity-30 cursor-default"}`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a 
                  href={profile.facebook ? `https://facebook.com/${profile.facebook}` : undefined}
                  target="_blank" rel="noopener noreferrer"
                  title={profile.facebook ? `Facebook: ${profile.facebook}` : "Facebook Not Linked"} 
                  className={`block p-2 rounded-xl border transition-all duration-300 ${profile.facebook ? "bg-blue-600/10 border-blue-600/30 text-blue-500 hover:border-blue-600/60 hover:scale-105" : "bg-white/[0.01] border-white/5 text-white/20 opacity-30 cursor-default"}`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Reputation metrics overview styled as sub-cards */}
            <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                <span className="block text-sm font-black text-accent-cyan tracking-tight">{userRankEntry.reputation} XP</span>
                <span className="block text-[8px] text-white/40 uppercase font-black tracking-widest mt-0.5">Reputation</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                <span className="block text-sm font-black text-accent-purple tracking-tight">Rank #4</span>
                <span className="block text-[8px] text-white/40 uppercase font-black tracking-widest mt-0.5">Leaderboard</span>
              </div>
            </div>
          </GlassCard>

        </div>

        {/* ================= RIGHT COLUMN: WORKSPACE ENGINE ================= */}
        <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
            
            {/* Streak Engine */}
            <GlassCard className="p-6 border border-white/5 h-full transition-all duration-300 hover:border-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center border border-accent-purple/20 shadow-[0_0_15px_rgba(147,51,234,0.15)]">
                  <Flame className="w-5 h-5 text-accent-purple" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Streak Engine</h3>
                  <p className="text-[9px] text-white/40">Keep your 7-day streak active</p>
                </div>
              </div>

              {/* 7-Day Streak Timeline */}
              <div className="flex justify-between items-center mb-6 mt-4 relative px-2">
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[3px] bg-white/5 rounded-full z-0" />
                {(() => {
                  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                  const today = new Date();
                  const result = [];
                  for (let i = 6; i >= 0; i--) {
                    const d = new Date();
                    d.setDate(today.getDate() - i);
                    result.push({
                      label: daysOfWeek[d.getDay()],
                      slot: 7 - i,
                      isToday: i === 0
                    });
                  }
                  return result.map((dayObj) => {
                    const displayDays = Math.min(profile.streakDays, 7);
                    // Fill rolling streak from the right
                    const isCompleted = (7 - dayObj.slot) < displayDays;
                    return (
                      <div key={dayObj.slot} className="relative z-10 flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-300 ${
                          isCompleted 
                            ? 'bg-accent-purple text-white shadow-[0_0_15px_rgba(147,51,234,0.6)] border border-accent-purple scale-110' 
                            : 'bg-black/80 border border-white/10 text-white/30'
                        } ${dayObj.isToday && !isCompleted ? 'ring-2 ring-accent-purple/40 animate-pulse border-accent-purple' : ''}`}>
                          {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : dayObj.slot}
                        </div>
                        <span className={`text-[8px] font-black uppercase tracking-wider ${isCompleted ? 'text-accent-purple' : 'text-white/30'} ${dayObj.isToday ? 'text-accent-cyan underline underline-offset-4' : ''}`}>
                          {dayObj.label}
                        </span>
                      </div>
                    );
                  });
                })()}
              </div>

              {/* Badges timeline */}
              <div className="mt-6">
                <span className="block text-[9px] uppercase tracking-widest text-white/40 font-black mb-3">Raven Network Badges</span>
                <div className="flex justify-between gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {[
                    { name: "Initiate", days: 1, color: "rgba(192, 132, 252, 0.15)", border: "rgba(192, 132, 252, 0.3)" },
                    { name: "Novice", days: 3, color: "rgba(192, 132, 252, 0.15)", border: "rgba(192, 132, 252, 0.3)" },
                    { name: "Fledgling", days: 7, color: "rgba(192, 132, 252, 0.15)", border: "rgba(192, 132, 252, 0.3)" },
                    { name: "Apprentice", days: 15, color: "rgba(96, 165, 250, 0.15)", border: "rgba(96, 165, 250, 0.3)" },
                    { name: "Scout", days: 30, color: "rgba(96, 165, 250, 0.15)", border: "rgba(96, 165, 250, 0.3)" },
                    { name: "Pathfinder", days: 60, color: "rgba(34, 211, 238, 0.15)", border: "rgba(34, 211, 238, 0.3)" },
                    { name: "Vanguard", days: 90, color: "rgba(34, 211, 238, 0.15)", border: "rgba(34, 211, 238, 0.3)" },
                    { name: "Sentinel", days: 120, color: "rgba(168, 85, 247, 0.15)", border: "rgba(168, 85, 247, 0.3)" },
                    { name: "Shadow", days: 180, color: "rgba(168, 85, 247, 0.15)", border: "rgba(168, 85, 247, 0.3)" },
                    { name: "Legend", days: 365, color: "rgba(251, 191, 36, 0.15)", border: "rgba(251, 191, 36, 0.3)" }
                  ].map((badge) => {
                    const isUnlocked = profile.streakDays >= badge.days;
                    return (
                      <div 
                        key={badge.name} 
                        className="flex flex-col items-center gap-2 flex-1 min-w-[72px] cursor-pointer group"
                        onClick={() => setSelectedDashboardBadge(badge.name)}
                      >
                        <div 
                          className={`relative w-full aspect-square flex items-center justify-center p-2 rounded-2xl border transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1 group-active:scale-95 ${
                            isUnlocked 
                              ? 'bg-white/[0.03] shadow-lg border-white/10 hover:border-white/20' 
                              : 'bg-white/[0.01] border-white/5 opacity-30 hover:opacity-50'
                          }`}
                          style={{
                            boxShadow: isUnlocked ? `0 0 20px ${badge.color}` : 'none',
                            borderColor: isUnlocked ? badge.border : 'rgba(255,255,255,0.05)'
                          }}
                        >
                          {!isUnlocked && (
                            <Lock className="absolute top-1.5 right-1.5 w-3 h-3 text-white/30 z-10" />
                          )}
                          <div className={`w-full h-full flex items-center justify-center overflow-hidden transition-all duration-500 ${!isUnlocked && 'grayscale brightness-50'}`}>
                            <BadgeIcon name={badge.name} className="w-full h-full object-contain" />
                          </div>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <span className={`text-xs font-bold transition-colors ${isUnlocked ? 'text-white group-hover:text-accent-cyan' : 'text-white/30'}`}>{badge.name}</span>
                          <span className="text-[9px] text-white/40 font-black mt-0.5">{badge.days} Days</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Daily check-in button */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <Button 
                  disabled={hasCheckedIn}
                  onClick={(e) => handleDailyCheckIn(e)}
                  variant={hasCheckedIn ? "secondary" : "primary"}
                  className={`w-full text-xs py-2.5 h-auto flex items-center justify-center gap-2 font-black transition-all duration-300 ${!hasCheckedIn && 'shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] bg-gradient-to-r from-accent-purple to-accent-purple hover:scale-[1.01]'}`}
                >
                  <Flame className={`w-4 h-4 ${hasCheckedIn ? 'text-white/30' : 'text-orange-400 animate-bounce'}`} />
                  <span>{hasCheckedIn ? "Checked In Today (+1 Day Streak)" : "Claim Daily Streak Check-in"}</span>
                </Button>
              </div>
            </GlassCard>

            {/* Reputation Scorecard */}
            <GlassCard className="p-6 border border-white/5 transition-all duration-300 hover:border-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20 shadow-[0_0_15px_rgba(0,152,234,0.15)]">
                    <Award className="w-5 h-5 text-accent-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Reputation</h3>
                    <p className="text-[9px] text-white/40">Verified skills distribution</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue">{calculateReputationScore()}</span>
                  <span className="text-[10px] text-white/40 font-bold">/100</span>
                </div>
              </div>

              {/* Progress bars */}
              <div className="space-y-4 mt-4">
                {[
                  { 
                    label: "Streak Days", 
                    score: `${profile.streakDays}/365+`, 
                    width: `${Math.max(1, Math.min((profile.streakDays / 365) * 100, 100))}%`, 
                    color: "bg-orange-500",
                    shadowColor: "rgba(249,115,22,0.3)"
                  },
                  { 
                    label: "Consistency Score", 
                    score: `${Math.min(100, 75 + profile.streakDays)}/100`, 
                    width: `${Math.min(100, 75 + profile.streakDays)}%`, 
                    color: "bg-emerald-500",
                    shadowColor: "rgba(16,185,129,0.3)"
                  },
                  { 
                    label: "Contributions Score", 
                    score: `${calculateContributionsScore()}/100`, 
                    width: `${calculateContributionsScore()}%`, 
                    color: "bg-indigo-500",
                    shadowColor: "rgba(99,102,241,0.3)"
                  },
                  { label: "X Activities", score: "80/100", width: "80%", color: "bg-accent-purple", shadowColor: "rgba(147,51,234,0.3)" },
                  { label: "Telegram Support", score: "65/100", width: "65%", color: "bg-accent-cyan", shadowColor: "rgba(0,240,255,0.3)" },
                  { 
                    label: "Missed Tasks", 
                    score: `${dailyTasks.filter(t => currentMin >= t.end && !t.done).length} Tasks`, 
                    width: `${Math.min(100, (dailyTasks.filter(t => currentMin >= t.end && !t.done).length / Math.max(1, dailyTasks.length)) * 100)}%`, 
                    color: "bg-red-500/80",
                    shadowColor: "rgba(239,68,68,0.2)"
                  }
                ].map((skill, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-black">
                      <span className="text-white/60">{skill.label}</span>
                      <span className="text-white/80 font-mono tracking-wider">{skill.score}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden p-[1px]">
                      <div 
                        className={`h-full rounded-full ${skill.color} transition-all duration-1000`} 
                        style={{ 
                          width: skill.width,
                          boxShadow: `0 0 10px ${skill.shadowColor}`
                        }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>


        </div>
      </div>

      {/* ================= TAB CONTENTS ================= */}
      <div className="min-h-[400px]">
        {mainTab === "community" && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-white to-accent-purple">Raven Community</h2>
                <p className="text-xs text-white/50 mt-1">Connect, share, and grow with fellow Web3 builders.</p>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
                <Users className="w-6 h-6 text-accent-cyan" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Premium Composer */}
                <GlassCard className="p-1 border border-white/10 bg-black/40 backdrop-blur-2xl relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/10 to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="p-5">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full border-2 border-white/10 overflow-hidden shrink-0">
                        {profile.avatar ? <img src={profile.avatar} className="w-full h-full object-cover" /> : <User className="w-full h-full p-2 text-white/50 bg-white/5" />}
                      </div>
                      <div className="flex-1">
                        <textarea 
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          placeholder="Share your latest Web3 milestone..."
                          className="w-full bg-transparent text-white placeholder-white/40 resize-none outline-none text-sm min-h-[80px]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-4 text-[10px] font-medium text-white/40">
                        <span>{newPostContent.length} / 280</span>
                        {newPostContent.length >= 250 && <span className="text-orange-400">Approaching limit</span>}
                      </div>
                      <button 
                        disabled={isPosting || newPostContent.trim().length === 0}
                        onClick={() => {
                          if (!profile.isGraduated) {
                            addNotification("Only TON Graduates can post in the community feed.", { type: "warning" });
                            return;
                          }
                          setIsPosting(true);
                          const token = localStorage.getItem("raven_user_token");
                          fetch("/api/community", {
                            method: "POST",
                            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                            body: JSON.stringify({ content: newPostContent })
                          }).then(res => res.json()).then(data => {
                            setIsPosting(false);
                            if (data.post) {
                              setPosts([data.post, ...posts]);
                              setNewPostContent("");
                              addNotification("Posted successfully!", { type: "success" });
                            } else {
                              addNotification(data.error || "Failed to post", { type: "warning" });
                            }
                          });
                        }}
                        className="px-6 py-2 bg-gradient-to-r from-accent-cyan to-accent-blue hover:from-accent-blue hover:to-accent-purple text-black font-black text-xs rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.4)] disabled:opacity-50 disabled:shadow-none hover:scale-105"
                      >
                        {isPosting ? "Posting..." : "Post Update"}
                      </button>
                    </div>
                  </div>
                </GlassCard>                {/* Feed Header Views Filter */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setFeedViewFilter("all")}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all border ${feedViewFilter === "all" ? 'bg-white/10 text-white border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.03)]' : 'bg-transparent text-white/45 border-transparent hover:text-white/80'}`}
                    >
                      All Feed
                    </button>
                    <button 
                      onClick={() => setFeedViewFilter("bookmarks")}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all border ${feedViewFilter === "bookmarks" ? 'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/25 shadow-[0_0_15px_rgba(0,240,255,0.05)]' : 'bg-transparent text-white/45 border-transparent hover:text-white/80'}`}
                    >
                      Bookmarks ({bookmarkedPostIds.length})
                    </button>
                  </div>

                  {activeHashtagFilter && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/20 text-accent-purple rounded-xl text-[10px] font-bold animate-in fade-in duration-300">
                      <span>Tag: {activeHashtagFilter}</span>
                      <button 
                        onClick={() => {
                          setActiveHashtagFilter(null);
                          addNotification("Feed filter cleared", { type: "default" });
                        }}
                        className="hover:text-white transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Feed */}
                <div className="space-y-4">
                  {filteredPosts.length === 0 && (
                    <div className="p-12 text-center border border-white/5 rounded-2xl bg-white/[0.01] backdrop-blur-md">
                      <Sparkles className="w-8 h-8 text-white/15 mx-auto mb-3" />
                      <p className="text-white/35 text-xs">No posts matched the active filters.</p>
                    </div>
                  )}
                  {filteredPosts.map(post => {
                    const hasLiked = profile.id ? post.likes.includes(profile.id) : false;
                    const isCommentsExpanded = expandedCommentsPostId === post.id;
                    return (
                      <GlassCard key={post.id} className="p-5 border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-white/10 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                        <div className="flex gap-4">
                          <div 
                            className="w-12 h-12 rounded-full border border-white/10 overflow-hidden shrink-0 cursor-pointer relative group-hover:border-accent-cyan/50 transition-colors"
                            onClick={() => {
                              const contactInfo = { id: post.userId, name: post.authorName, avatar: post.authorAvatar, badge: "Contributor", socials: {} };
                              setViewingUserProfile(contactInfo);
                            }}
                          >
                            {post.authorAvatar ? <img src={post.authorAvatar} className="w-full h-full object-cover" /> : <User className="w-full h-full p-3 text-white/50 bg-black/50" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span 
                                  className="text-sm font-bold text-white hover:text-accent-cyan transition-colors cursor-pointer"
                                  onClick={() => setViewingUserProfile({ id: post.userId, name: post.authorName, avatar: post.authorAvatar, badge: "Contributor", socials: {} })}
                                >
                                  {post.authorName}
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/60">Verified</span>
                              </div>
                              <span className="text-[10px] text-white/30">{new Date(post.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <p className="text-sm text-white/80 leading-relaxed mb-4 mt-2">
                              {post.content}
                            </p>
                            <div className="flex items-center gap-6 mt-4 w-full">
                              <button 
                                onClick={() => {
                                  const token = localStorage.getItem("raven_user_token");
                                  const action = hasLiked ? "unlike" : "like";
                                  fetch("/api/community", {
                                    method: "PUT",
                                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                                    body: JSON.stringify({ postId: post.id, action })
                                  }).then(res => res.json()).then(data => {
                                    if (data.success) {
                                      setPosts(posts.map(p => p.id === post.id ? { ...p, likes: data.likes } : p));
                                    }
                                  });
                                }}
                                className={`flex items-center gap-2 text-xs transition-all group/btn ${hasLiked ? 'text-accent-cyan' : 'text-white/40 hover:text-white'}`}
                              >
                                <div className={`p-1.5 rounded-full transition-colors ${hasLiked ? 'bg-accent-cyan/10' : 'group-hover/btn:bg-white/10'}`}>
                                  <Heart className={`w-4 h-4 transition-transform group-hover/btn:scale-110 ${hasLiked ? 'fill-current' : ''}`} />
                                </div>
                                <span className="font-medium">{post.likes.length}</span>
                              </button>

                              {/* Comment toggle button */}
                              <button 
                                onClick={() => setExpandedCommentsPostId(isCommentsExpanded ? null : post.id)}
                                className={`flex items-center gap-2 text-xs transition-all group/btn ${isCommentsExpanded ? 'text-accent-cyan' : 'text-white/40 hover:text-white'}`}
                              >
                                <div className={`p-1.5 rounded-full transition-colors ${isCommentsExpanded ? 'bg-accent-cyan/10' : 'group-hover/btn:bg-white/10'}`}>
                                  <MessageCircle className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                                </div>
                                <span className="font-medium">{post.comments?.length || 0}</span>
                              </button>

                              {/* Bookmark Button */}
                              <button 
                                onClick={() => {
                                  const isBookmarked = bookmarkedPostIds.includes(post.id);
                                  if (isBookmarked) {
                                    setBookmarkedPostIds(bookmarkedPostIds.filter(id => id !== post.id));
                                    addNotification("Post removed from bookmarks.", { type: "warning" });
                                  } else {
                                    setBookmarkedPostIds([...bookmarkedPostIds, post.id]);
                                    addNotification("Post added to bookmarks!", { type: "success" });
                                  }
                                }}
                                className={`flex items-center gap-2 text-xs transition-all group/btn ${bookmarkedPostIds.includes(post.id) ? 'text-accent-cyan' : 'text-white/40 hover:text-white'}`}
                                title={bookmarkedPostIds.includes(post.id) ? "Remove Bookmark" : "Bookmark Post"}
                              >
                                <div className={`p-1.5 rounded-full transition-colors ${bookmarkedPostIds.includes(post.id) ? 'bg-accent-cyan/10' : 'group-hover/btn:bg-white/10'}`}>
                                  <Bookmark className={`w-4 h-4 transition-transform group-hover/btn:scale-110 ${bookmarkedPostIds.includes(post.id) ? 'fill-current' : ''}`} />
                                </div>
                              </button>

                              {/* Share Button */}
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(`${window.location.origin}/community/post/${post.id}`).then(() => {
                                    addNotification("Post link copied to clipboard!", { type: "success" });
                                  });
                                }}
                                className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-all group/btn"
                                title="Share Post"
                              >
                                <div className="p-1.5 rounded-full transition-colors group-hover/btn:bg-white/10">
                                  <Share2 className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                                </div>
                              </button>

                              {/* Direct Message Button */}
                              {profile.id && post.userId !== profile.id && (
                                <button 
                                  onClick={() => {
                                    setDmContact({
                                      id: post.userId,
                                      name: post.authorName,
                                      avatar: post.authorAvatar
                                    });
                                  }}
                                  className="flex items-center gap-2 text-xs text-white/40 hover:text-accent-cyan transition-all group/btn ml-auto"
                                  title={`Message ${post.authorName}`}
                                >
                                  <div className="p-1.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-accent-cyan/30 flex items-center gap-1.5 transition-colors duration-300">
                                    <Send className="w-3.5 h-3.5 transition-transform group-hover/btn:scale-110" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Message</span>
                                  </div>
                                </button>
                              )}
                            </div>

                            {/* Expandable comments thread panel */}
                            {isCommentsExpanded && (
                              <div className="mt-5 pt-5 border-t border-white/5 space-y-4 animate-in fade-in duration-300">
                                {/* Comment composer */}
                                <div className="flex gap-3">
                                  <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden shrink-0">
                                    {profile.avatar ? <img src={profile.avatar} className="w-full h-full object-cover" /> : <User className="w-full h-full p-2 text-white/55 bg-white/5" />}
                                  </div>
                                  <div className="flex-1 flex gap-2">
                                    <input 
                                      type="text" 
                                      placeholder="Write a comment..." 
                                      value={newCommentContentMap[post.id] || ""}
                                      onChange={(e) => setNewCommentContentMap({
                                        ...newCommentContentMap,
                                        [post.id]: e.target.value
                                      })}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter' && (newCommentContentMap[post.id] || "").trim() !== "") {
                                          const commentVal = newCommentContentMap[post.id];
                                          const token = localStorage.getItem("raven_user_token");
                                          fetch("/api/community", {
                                            method: "PUT",
                                            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                                            body: JSON.stringify({ postId: post.id, action: "comment", content: commentVal })
                                          })
                                          .then(res => res.json())
                                          .then(data => {
                                            if (data.success) {
                                              setPosts(posts.map(p => p.id === post.id ? { ...p, comments: data.comments } : p));
                                              setNewCommentContentMap({ ...newCommentContentMap, [post.id]: "" });
                                              addNotification("Comment posted!", { type: "success" });
                                            }
                                          });
                                        }
                                      }}
                                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/30 outline-none focus:border-accent-purple/50"
                                    />
                                    <button 
                                      disabled={!(newCommentContentMap[post.id] || "").trim()}
                                      onClick={() => {
                                        const commentVal = newCommentContentMap[post.id];
                                        const token = localStorage.getItem("raven_user_token");
                                        fetch("/api/community", {
                                          method: "PUT",
                                          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                                          body: JSON.stringify({ postId: post.id, action: "comment", content: commentVal })
                                        })
                                        .then(res => res.json())
                                        .then(data => {
                                          if (data.success) {
                                            setPosts(posts.map(p => p.id === post.id ? { ...p, comments: data.comments } : p));
                                            setNewCommentContentMap({ ...newCommentContentMap, [post.id]: "" });
                                            addNotification("Comment posted!", { type: "success" });
                                          }
                                        });
                                      }}
                                      className="px-3.5 py-1.5 bg-accent-purple hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-colors disabled:opacity-40"
                                    >
                                      Reply
                                    </button>
                                  </div>
                                </div>

                                {/* Comments list */}
                                <div className="space-y-3 pl-3 border-l border-white/5 max-h-[250px] overflow-y-auto pr-1">
                                  {(!post.comments || post.comments.length === 0) ? (
                                    <p className="text-[10px] text-white/30 italic py-2 pl-1">No comments yet. Start the conversation!</p>
                                  ) : (
                                    post.comments.map((comment: any) => (
                                      <div key={comment.id} className="flex gap-2.5 items-start text-xs py-1">
                                        <div className="w-6 h-6 rounded-full border border-white/5 overflow-hidden shrink-0">
                                          {comment.authorAvatar ? <img src={comment.authorAvatar} className="w-full h-full object-cover" /> : <User className="w-full h-full p-1 text-white/40 bg-white/5" />}
                                        </div>
                                        <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-xl p-2.5">
                                          <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold text-white/80 text-[10px]">{comment.authorName}</span>
                                            <span className="text-[8px] text-white/30">{new Date(comment.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                          </div>
                                          <p className="text-[11px] text-white/70 leading-relaxed">{comment.content}</p>
                                        </div>
                                      </div>
                                    ))
                                  )}
                                </div>
                              </div>
                            )}

                          </div>
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar / Info Panel */}
              <div className="hidden lg:block space-y-6">
                <GlassCard className="p-5 border border-white/5 bg-gradient-to-br from-accent-purple/10 to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-accent-purple/20 rounded-lg text-accent-purple">
                      <Award className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white text-sm">Community Guidelines</h4>
                  </div>
                  <ul className="space-y-3 text-xs text-white/60 leading-relaxed">
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" /> Share valuable insights and alpha.</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" /> Support fellow builders with constructive feedback.</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" /> Keep conversations respectful and professional.</li>
                    <li className="flex gap-2 text-orange-400/80"><AlertCircle className="w-4 h-4 shrink-0" /> Spam or low-effort posts will affect your Reputation XP.</li>
                  </ul>
                </GlassCard>

                {/* People You May Know Panel */}
                <GlassCard className="p-5 border border-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-accent-cyan/20 rounded-lg text-accent-cyan">
                      <Users className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-white text-sm">People You May Know</h4>
                  </div>
                  <div className="space-y-4">
                    {[
                      { id: "user-1", name: "Cryptosage", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=cryptosage", role: "Vanguard" },
                      { id: "user-3", name: "Aisha_Builds", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Aisha", role: "Developer" },
                      { id: "user-4", name: "Chidi_Dev", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Chidi", role: "Smart Contract Dev" }
                    ]
                    .filter(u => u.id !== profile.id)
                    .map(suggestedUser => {
                      const relation = followersCountMap[suggestedUser.id];
                      const isFollowing = relation?.isFollowing || false;
                      
                      return (
                        <div key={suggestedUser.id} className="flex items-center justify-between gap-3">
                          <div 
                            className="flex items-center gap-2.5 cursor-pointer"
                            onClick={() => setViewingUserProfile({ id: suggestedUser.id, name: suggestedUser.name, avatar: suggestedUser.avatar, badge: "Contributor", socials: {} })}
                          >
                            <div className="w-9 h-9 rounded-full border border-white/10 overflow-hidden shrink-0 bg-black/50">
                              <img src={suggestedUser.avatar} className="w-full h-full object-cover" />
                            </div>
                            <div className="text-left">
                              <span className="block text-xs font-bold text-white hover:text-accent-cyan transition-colors">{suggestedUser.name}</span>
                              <span className="block text-[9px] text-white/40">{suggestedUser.role}</span>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => {
                              const token = localStorage.getItem("raven_user_token");
                              fetch("/api/followers", {
                                method: "POST",
                                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                                body: JSON.stringify({ followingId: suggestedUser.id })
                              }).then(res => res.json()).then(data => {
                                if (data.success) {
                                  setFollowersCountMap(prev => ({
                                    ...prev,
                                    [suggestedUser.id]: {
                                      ...prev[suggestedUser.id],
                                      isFollowing: data.isFollowing,
                                      followers: (prev[suggestedUser.id]?.followers || 0) + (data.isFollowing ? 1 : -1)
                                    }
                                  }));
                                  addNotification(data.isFollowing ? `You followed ${suggestedUser.name}!` : `You unfollowed ${suggestedUser.name}.`, {
                                    type: data.isFollowing ? "success" : "warning"
                                  });
                                }
                              });
                            }}
                            className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${
                              isFollowing 
                                ? 'bg-white/5 text-white/40 border border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20' 
                                : 'bg-accent-cyan text-black hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.2)] hover:scale-105'
                            }`}
                          >
                            {isFollowing ? "Following" : "Follow"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </GlassCard>
                
                <GlassCard className="p-5 border border-white/5">
                  <h4 className="font-bold text-white text-sm mb-4">Trending Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {["#TON", "#Web3Builders", "#AfricanTech", "#Airdrop", "#SmartContracts", "#EVM"].map(tag => (
                      <span 
                        key={tag} 
                        onClick={() => {
                          setActiveHashtagFilter(tag);
                          addNotification(`Filtering community feed by ${tag}`, { type: "default" });
                        }}
                        className={`px-3 py-1 border rounded-full text-[10px] font-bold cursor-pointer transition-colors ${activeHashtagFilter === tag ? 'bg-accent-purple/20 border-accent-purple text-accent-purple shadow-[0_0_8px_rgba(168,85,247,0.2)]' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        )}

        {mainTab === "opportunities" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Opportunities Hub (Inline Tabbed Panel) */}
          <GlassCard id="pathways" className="p-6 border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-white">Ecosystem Opportunities</h3>
                <p className="text-[10px] text-white/50 mt-0.5">Explore active listings verified through your on-chain reputation</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/5 mb-5">
              {[
                { id: "jobs", label: "Jobs", icon: Briefcase },
                { id: "hackathons", label: "Hackathons", icon: Trophy },
                { id: "contests", label: "Contests", icon: Award }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = opportunitiesTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setOpportunitiesTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-all -mb-px ${
                      isActive 
                        ? "border-accent-purple text-white bg-white/[0.01]" 
                        : "border-transparent text-white/40 hover:text-white/70"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Filter Pill (only for hackathons and contests) */}
            {(opportunitiesTab === "hackathons" || opportunitiesTab === "contests") && (
              <div className="flex items-center gap-2 mt-4 mb-2">
                {["all", "active", "completed"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setOpportunityFilter(f as any)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold capitalize transition-all ${
                      opportunityFilter === f
                        ? 'bg-white/10 text-white'
                        : 'bg-transparent text-white/40 hover:bg-white/5 hover:text-white/80'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}

            {/* Tab Contents */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 mt-4">
              {(() => {
                const filteredOpps = opportunities.filter(opp => {
                  if (opportunitiesTab === "jobs" && opp.type !== "job") return false;
                  if (opportunitiesTab === "hackathons" && opp.type !== "hackathon") return false;
                  if (opportunitiesTab === "contests" && opp.type !== "bounty") return false;
                  if (opportunityFilter !== "all" && opp.status !== opportunityFilter) return false;
                  return true;
                });

                if (filteredOpps.length === 0) {
                  return (
                    <div className="text-center p-8 text-white/30 text-xs">
                      No active or completed listings in this category.
                    </div>
                  );
                }

                return filteredOpps.map((opp) => {
                  const hasApplied = submissions.some(s => s.opportunityId === opp.id);
                  const submission = submissions.find(s => s.opportunityId === opp.id);
                  const isLocked = reputationXP < opp.xpRequired;

                  return (
                    <div key={opp.id} className={`p-4 rounded-xl border flex flex-col gap-3 ${
                      opp.status === "completed" ? "bg-white/[0.005] border-white/5 opacity-60" : "bg-white/[0.01] border-white/5"
                    }`}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                            {opp.title}
                            {isLocked && <Lock className="w-3 h-3 text-red-400" />}
                          </h4>
                          <p className="text-[10px] text-white/50 leading-relaxed mt-1">{opp.description}</p>
                          <span className="text-[9px] text-white/30 block mt-1">Deadline: {opp.deadline}</span>
                          <div className="flex gap-2 mt-2">
                            <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue font-bold">
                              Prize: {opp.prizePool}
                            </span>
                            <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40 font-bold">
                              Rank Required: {opp.xpRequired} XP
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          {isLocked ? (
                            <span className="text-[9px] text-red-400 font-bold flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              Locked
                            </span>
                          ) : submission ? (
                            <span className={`text-[9px] font-bold flex items-center gap-1 ${
                              submission.isApproved ? "text-[#00FFCC]" : "text-[#FFCC00]"
                            }`}>
                              <Check className="w-3.5 h-3.5" />
                              {submission.isApproved ? "Approved" : "Under Review"}
                            </span>
                          ) : opp.status === "completed" ? (
                            <span className="text-[9px] text-white/30 font-bold">Closed</span>
                          ) : applyingOppId === opp.id ? (
                            <button
                              onClick={() => setApplyingOppId(null)}
                              className="text-[9px] text-white/40 hover:text-white"
                            >
                              Cancel
                            </button>
                          ) : (
                            <Button
                              onClick={() => {
                                setApplyingOppId(opp.id);
                                setSubmissionLink("");
                              }}
                              variant="primary"
                              size="sm"
                              className="text-[10px] py-1 px-3 h-auto"
                            >
                              Apply
                            </Button>
                          )}
                        </div>
                      </div>

                      {applyingOppId === opp.id && (
                        <div className="pt-2 border-t border-white/5 space-y-2 animate-in fade-in duration-200">
                          <label className="block text-[8px] font-bold uppercase tracking-wider text-white/40">
                            Submission Link (GitHub, Vercel, or Drive link)
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={submissionLink}
                              onChange={(e) => setSubmissionLink(e.target.value)}
                              placeholder="https://github.com/your-username/project-repo"
                              className="flex-1 bg-white/[0.03] border border-white/10 focus:border-[#00F0FF]/30 transition-all rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/20 outline-none"
                            />
                            <Button
                              disabled={submittingOpp || !submissionLink}
                              onClick={async () => {
                                setSubmittingOpp(true);
                                try {
                                  const token = localStorage.getItem("raven_user_token");
                                  const res = await fetch("/api/opportunities", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                      Authorization: `Bearer ${token}`
                                    },
                                    body: JSON.stringify({
                                      opportunityId: opp.id,
                                      submissionLink
                                    })
                                  });
                                  const data = await res.json();
                                  if (data.success) {
                                    setSubmissions(prev => [...prev, data.submission]);
                                    setApplyingOppId(null);
                                    addNotification("Proof-of-work solution submitted for review!", {
                                      type: "success",
                                      title: "Solution Submitted"
                                    });
                                  } else {
                                    addNotification(data.error || "Failed to submit application", {
                                      type: "warning",
                                      title: "Submission Error"
                                    });
                                  }
                                } catch (err) {
                                  console.error(err);
                                } finally {
                                  setSubmittingOpp(false);
                                }
                              }}
                              variant="secondary"
                              size="sm"
                              className="text-[10px] py-1 px-4 h-auto"
                            >
                              {submittingOpp ? "Sending..." : "Submit"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          </GlassCard>
          </div>
        )}

        {mainTab === "projects" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="grid md:grid-cols-2 gap-6 text-left">
              {ecosystemProjects.map((project, idx) => {
                const userReputation = reputationXP;
                const isLocked = userReputation < project.reputationRequired;

                return (
                  <GlassCard key={idx} className="p-6 border-white/5 flex flex-col justify-between relative overflow-hidden h-full group">
                    {/* Ambient glow */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent-cyan/5 rounded-full blur-xl pointer-events-none" />

                    <div>
                      {/* Header row */}
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <span className="px-2 py-0.5 rounded text-[8px] bg-white/5 border border-white/10 text-white/50 font-bold uppercase tracking-wider">
                          {project.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                          project.status === "Production" || project.status === "Live"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      {/* Title, Logo & Requirements */}
                      <div className="flex items-center gap-3.5 mb-4 mt-1">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {project.logo ? (
                            <img src={project.logo} className="w-full h-full object-cover" alt={project.title} />
                          ) : (
                            <Folder className="w-6 h-6 text-white/40" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5 leading-tight">
                            {project.title}
                            {isLocked && <Lock className="w-3 h-3 text-white/30" />}
                          </h4>
                          <span className="text-[9px] text-white/40 font-medium block mt-0.5">Required Reputation: {project.reputationRequired} XP</span>
                        </div>
                      </div>

                      <p className="text-xs text-white/50 leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-1.5 py-0.5 rounded text-[8px] bg-white/[0.02] border border-white/5 text-white/40 font-semibold">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer action / Gating block */}
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                        {isLocked ? (
                          <>
                            <div className="flex items-center gap-1.5 text-red-400/80 font-bold text-[10px]">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{project.reputationRequired} XP Required</span>
                            </div>
                            <Button disabled variant="secondary" size="sm" className="text-[10px] py-1 h-auto">
                              Locked
                            </Button>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-1.5 text-green-400 font-bold text-[10px]">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Unlocked</span>
                            </div>
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                              <Button variant="primary" size="sm" className="text-[10px] py-1.5 h-auto flex items-center gap-1">
                                Launch App <ExternalLink className="w-3 h-3" />
                              </Button>
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        )}

        {mainTab === "leaderboard" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Leaders board ranking list */}
          <GlassCard id="dashboard" className="p-6 border-white/5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20">
                <Trophy className="w-5 h-5 text-accent-blue" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Top Contributors Leaderboard</h3>
                <p className="text-[9px] text-white/40">Verified on-chain reputation ranking</p>
              </div>
            </div>

            <div className="space-y-2">
              {leaderboard.length === 0 ? (
                <div className="text-center p-8 text-white/30 text-xs">Loading rankings...</div>
              ) : (
                leaderboard.map((user) => {
                  const isUser = user.isUser;
                return (
                  <div 
                    key={user.rank} 
                    onClick={() => setViewingUserProfile(user)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:border-accent-purple/30 transition-all ${
                      isUser 
                        ? 'bg-accent-purple/10 border-accent-purple/40 shadow-[0_0_20px_rgba(147,51,234,0.1)]' 
                        : 'bg-white/[0.01] border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-5 text-xs font-bold text-white/50 text-center">
                        #{user.rank}
                      </div>
                      
                      {/* Avatar */}
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {user.avatar ? (
                          <img src={user.avatar} className="w-full h-full object-cover" alt={user.name} />
                        ) : (
                          <User className="w-4 h-4 text-white/40" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="block text-xs font-bold text-white truncate max-w-[120px] sm:max-w-none">{user.name}</span>
                          {(() => {
                            const badgeName = getBadgeForUser(user.name, profile.streakDays);
                            return badgeName ? (
                              <div title={`${badgeName} Badge`} className="flex-shrink-0">
                                <BadgeIcon name={badgeName} className="w-4 h-4" />
                              </div>
                            ) : null;
                          })()}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="inline-block text-[8px] px-1 py-0.5 rounded bg-white/5 border border-white/10 text-white/50 font-bold">
                            {user.badge}
                          </span>
                          
                          {/* Social handles badges */}
                          <div className="flex gap-1 items-center ml-1">
                            {/* GitHub */}
                            <span 
                              title={user.socials.github ? `GitHub: ${user.socials.github}` : "GitHub Not Linked"} 
                              className={user.socials.github ? "text-white opacity-85" : "text-white/20 opacity-25"}
                            >
                              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                              </svg>
                            </span>
                            {/* Telegram */}
                            <a 
                              href={user.socials.telegram ? `https://t.me/${user.socials.telegram}` : undefined}
                              target="_blank" rel="noopener noreferrer"
                              onClick={(e) => user.socials.telegram && e.stopPropagation()}
                              title={user.socials.telegram ? `Telegram: ${user.socials.telegram}` : "Telegram Not Linked"} 
                              className={user.socials.telegram ? "text-sky-400 hover:scale-110" : "text-white/20 opacity-25 cursor-default"}
                            >
                              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="m22 2-7 20-4-9-9-4Z" />
                                <path d="M22 2 11 13" />
                              </svg>
                            </a>
                            {/* X */}
                            <a 
                              href={user.socials.x ? `https://x.com/${user.socials.x}` : undefined}
                              target="_blank" rel="noopener noreferrer"
                              onClick={(e) => user.socials.x && e.stopPropagation()}
                              title={user.socials.x ? `X: ${user.socials.x}` : "X Not Linked"} 
                              className={user.socials.x ? "text-white opacity-85 hover:scale-110" : "text-white/20 opacity-25 cursor-default"}
                            >
                              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                              </svg>
                            </a>
                            {/* TikTok */}
                            <span 
                              title={user.socials.tiktok ? `TikTok: ${user.socials.tiktok}` : "TikTok Not Linked"} 
                              className={user.socials.tiktok ? "text-pink-500" : "text-white/20 opacity-25"}
                            >
                              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95.89 2.24 1.43 3.58 1.49v3.95c-1.74-.08-3.41-.75-4.73-1.89-.13-.11-.26-.22-.39-.34v6.86c.03 2.12-.9 4.19-2.52 5.56-1.92 1.63-4.66 2.1-7.05 1.22C4.5 20.18 2.8 17.55 3.05 14.8c.25-2.78 2.45-5.12 5.23-5.36 1.15-.09 2.3.17 3.3.75v4.06c-.84-.52-1.85-.71-2.8-.52-1.39.26-2.53 1.43-2.77 2.84-.28 1.62.67 3.23 2.25 3.66 1.44.4 3.05-.22 3.73-1.57.19-.38.28-.79.28-1.22V.02z" />
                              </svg>
                            </span>
                            {/* Instagram */}
                            <a 
                              href={user.socials.instagram ? `https://instagram.com/${user.socials.instagram}` : undefined}
                              target="_blank" rel="noopener noreferrer"
                              onClick={(e) => user.socials.instagram && e.stopPropagation()}
                              title={user.socials.instagram ? `Instagram: ${user.socials.instagram}` : "Instagram Not Linked"} 
                              className={user.socials.instagram ? "text-pink-400 hover:scale-110" : "text-white/20 opacity-25 cursor-default"}
                            >
                              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                              </svg>
                            </a>
                            {/* Facebook */}
                            <a 
                              href={user.socials.facebook ? `https://facebook.com/${user.socials.facebook}` : undefined}
                              target="_blank" rel="noopener noreferrer"
                              onClick={(e) => user.socials.facebook && e.stopPropagation()}
                              title={user.socials.facebook ? `Facebook: ${user.socials.facebook}` : "Facebook Not Linked"} 
                              className={user.socials.facebook ? "text-blue-500 hover:scale-110" : "text-white/20 opacity-25 cursor-default"}
                            >
                              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="block text-xs font-black text-white">{user.reputation}</span>
                      <span className="block text-[8px] text-white/40 uppercase font-semibold">Reputation</span>
                    </div>
                  </div>
                );
              }))}
            </div>
          </GlassCard>
          </div>
        )}

        {mainTab === "daily" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Daily Streak Consistency Tasks */}
          <GlassCard className="p-6 border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                  <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Daily Quest Board</h3>
                  <p className="text-[9px] text-white/45">Complete time-windowed quests to boost your streak</p>
                </div>
              </div>

              {/* RPG Progress Bar */}
              <div className="flex flex-col items-end min-w-[120px] flex-1 sm:flex-initial">
                <div className="flex justify-between w-full text-[9px] font-black text-white/60 mb-1">
                  <span>Quest Progress</span>
                  <span className="text-accent-cyan">
                    {dailyTasks.filter(t => t.done).length}/{dailyTasks.length} Done ({Math.round((dailyTasks.filter(t => t.done).length / dailyTasks.length) * 100)}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-accent-purple via-accent-cyan to-green-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
                    style={{ width: `${(dailyTasks.filter(t => t.done).length / dailyTasks.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quest Filter Tabs */}
            <div className="flex gap-1.5 p-1 rounded-xl bg-white/5 border border-white/5 mb-4 overflow-x-auto">
              {[
                { id: "all", label: "All Quests", icon: Flame },
                { id: "morning", label: "Morning ☀️", icon: Clock },
                { id: "evening", label: "Evening 🌅", icon: Clock },
                { id: "night", label: "Night 🌙", icon: Clock },
                { id: "goals", label: "Goals 🏆", icon: Trophy }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = questFilter === tab.id;
                
                // Compute completions
                let relevant = dailyTasks;
                if (tab.id === "morning") relevant = dailyTasks.filter(t => t.start === 6 * 60);
                else if (tab.id === "evening") relevant = dailyTasks.filter(t => t.start === 12 * 60);
                else if (tab.id === "night") relevant = dailyTasks.filter(t => t.start === 18 * 60);
                else if (tab.id === "goals") relevant = dailyTasks.filter(t => t.start === 0);
                
                const doneCount = relevant.filter(t => t.done).length;
                const totalCount = relevant.length;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setQuestFilter(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap ${
                      isActive 
                        ? 'bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.3)]' 
                        : 'text-white/40 hover:text-white/75 hover:bg-white/5'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-black/20 text-white' : 'bg-white/10 text-white/55'}`}>
                      {doneCount}/{totalCount}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Tasks Checklist */}
            <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
              {(() => {
                const filtered = dailyTasks.filter(t => {
                  if (questFilter === "all") return true;
                  if (questFilter === "morning") return t.start === 6 * 60;
                  if (questFilter === "evening") return t.start === 12 * 60;
                  if (questFilter === "night") return t.start === 18 * 60;
                  if (questFilter === "goals") return t.start === 0;
                  return true;
                });

                if (filtered.length === 0) {
                  return <div className="p-8 text-center text-white/30 text-xs">No quests in this category.</div>;
                }

                return filtered.map(task => {
                  const isLocked = currentMin < task.start;
                  const isMissed = currentMin >= task.end && !task.done;
                  const isActive = currentMin >= task.start && currentMin < task.end && !task.done;
                  
                  const formatTime = (min: number) => {
                    if (min === 24 * 60) return "23:59";
                    const h = Math.floor(min / 60).toString().padStart(2, '0');
                    const m = (min % 60).toString().padStart(2, '0');
                    return `${h}:${m}`;
                  };
                  
                  let containerStyles = "bg-white/[0.01] border-white/5 text-white/60 hover:bg-white/[0.02]";
                  if (task.done) containerStyles = "bg-accent-purple/5 border-accent-purple/20 text-white";
                  else if (isLocked) containerStyles = "bg-black border-white/5 text-white/20 cursor-not-allowed opacity-40";
                  else if (isMissed) containerStyles = "bg-red-500/5 border-red-500/20 text-red-500/50 cursor-not-allowed";
                  else if (isActive) containerStyles = "bg-accent-blue/5 border-accent-blue/30 text-white hover:bg-accent-blue/10 ring-1 ring-accent-blue/20 shadow-[0_0_15px_rgba(0,152,234,0.05)]";

                  return (
                    <div 
                      key={task.id} 
                      onClick={(e) => toggleTask(task.id, e)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all duration-300 transform active:scale-[0.98] ${containerStyles}`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                          task.done ? 'bg-gradient-to-br from-accent-purple to-accent-cyan border-transparent shadow-[0_0_8px_rgba(147,51,234,0.5)]' : 
                          isMissed ? 'bg-red-500/10 border-red-500/30' :
                          isLocked ? 'bg-black border-white/10' :
                          'border-white/20 hover:border-white/40'
                        }`}>
                          {task.done && <Check className="w-3.5 h-3.5 text-white" />}
                          {isMissed && <X className="w-3.5 h-3.5 text-red-500/70" />}
                          {isLocked && <Lock className="w-3 h-3 text-white/20" />}
                        </div>
                        <div className="min-w-0">
                          <span className={`text-[11px] font-semibold truncate block ${task.done ? "line-through text-white/50" : ""}`}>
                            {task.text}
                            {(task.isTelegramChannel || task.isTelegramCommunity) && !task.done && task.step > 0 && (
                              <span className="ml-2 text-[9px] text-accent-blue bg-accent-blue/10 px-1.5 py-0.5 rounded">
                                Step 1/1 completed
                              </span>
                            )}
                            {task.isX && !task.done && task.step > 0 && (
                              <span className="ml-2 text-[9px] text-accent-purple bg-accent-purple/10 px-1.5 py-0.5 rounded">
                                Step 1/1 completed
                              </span>
                            )}
                          </span>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Clock className={`w-2.5 h-2.5 ${isMissed ? 'text-red-500/50' : isActive ? 'text-accent-blue' : 'text-white/30'}`} />
                            <span className={`text-[8px] font-mono ${isMissed ? 'text-red-500/50' : isActive ? 'text-accent-blue' : 'text-white/30'}`}>
                              {formatTime(task.start)} - {formatTime(task.end)}
                            </span>
                            {isActive && <span className="text-[7px] bg-accent-blue text-white px-1 py-0 rounded animate-pulse ml-1">ACTIVE QUEST</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          task.done ? 'bg-accent-purple/20 text-accent-purple' : 
                          isMissed ? 'bg-red-500/10 text-red-500/50' :
                          'bg-white/5 text-white/40'
                        }`}>
                          +{task.xp} XP
                        </span>
                        {isMissed && <span className="text-[7px] text-red-500/60 mt-1 uppercase font-bold">Failed</span>}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Rules and Guidelines */}
            <div className="mt-5 pt-4 border-t border-white/5 space-y-2.5 text-[10px] text-white/50 leading-relaxed text-left">
              <span className="block font-bold text-white uppercase tracking-wider text-[8px]">Rules & Guidelines</span>
              <ul className="list-disc pl-4 space-y-1.5">
                <li>Every reply must add value. Avoid "Nice," "Great," "LFG," or emoji-only replies.</li>
                <li>Every quote repost must include your own opinion or insight.</li>
                <li>Focus on consistency. Support fellow members through meaningful engagement.</li>
                <li>Create conversations instead of chasing likes.</li>
              </ul>
              
              <span className="block font-bold text-white uppercase tracking-wider text-[8px] mt-3">Why Daily Tasks Matter</span>
              <p className="text-[10px] text-white/45 leading-relaxed">
                Consistency is the key metric on social networks. Completing daily sessions trains algorithms to favor your content, accelerates community onboarding, and keeps your streak multiplier active to unlock higher reputation ranking badges.
              </p>

              <div className="text-[9px] text-accent-purple font-semibold bg-accent-purple/5 border border-accent-purple/10 p-2 rounded-lg mt-2">
                "Consistency builds visibility. Visibility creates impressions. Impressions lead to followers, opportunities, and growth."
              </div>
            </div>
          </GlassCard>
          </div>
        )}
      </div>

      {/* Read-Only Profile Preview Modal */}
      {viewingUserProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-sm bg-black border border-white/10 rounded-2xl p-6 glass shadow-[0_0_50px_rgba(147,51,234,0.15)] overflow-hidden text-center animate-in fade-in zoom-in-95 duration-200">
            {/* Background glowing orb */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/20 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button 
              onClick={() => setViewingUserProfile(null)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Avatar */}
            <div className="w-20 h-20 rounded-full bg-white/5 border-2 border-accent-purple/30 mx-auto flex items-center justify-center overflow-hidden mb-4 mt-2">
              {viewingUserProfile.avatar ? (
                <img src={viewingUserProfile.avatar} className="w-full h-full object-cover" alt={viewingUserProfile.name} />
              ) : (
                <User className="w-10 h-10 text-white/40" />
              )}
            </div>

            {/* Profile Info */}
            <div className="flex items-center justify-center gap-1.5">
              <h3 className="font-extrabold text-lg text-white mb-0.5">{viewingUserProfile.name}</h3>
              {(() => {
                const badgeName = getBadgeForUser(viewingUserProfile.name, profile.streakDays);
                return badgeName ? (
                  <div title={`${badgeName} Badge`} className="flex-shrink-0">
                    <BadgeIcon name={badgeName} className="w-5 h-5 mb-0.5" />
                  </div>
                ) : null;
              })()}
            </div>
            <span className="inline-block text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60 font-bold mb-3">
              {viewingUserProfile.badge}
            </span>

            {/* Follow/DM Stats & Actions */}
            {viewingUserProfile.id && (
              <div className="flex flex-col gap-3 mb-4">
                <div className="flex justify-center gap-4 text-xs">
                  <div className="text-white/60"><span className="text-white font-bold">{followersCountMap[viewingUserProfile.id]?.followers || 0}</span> Followers</div>
                  <div className="text-white/60"><span className="text-white font-bold">{followersCountMap[viewingUserProfile.id]?.following || 0}</span> Following</div>
                </div>
                {viewingUserProfile.id !== profile.id && (
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={() => {
                        const token = localStorage.getItem("raven_user_token");
                        fetch("/api/followers", {
                          method: "POST",
                          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                          body: JSON.stringify({ followingId: viewingUserProfile.id })
                        }).then(res => res.json()).then(data => {
                          if (data.success) {
                            setFollowersCountMap(prev => ({
                              ...prev,
                              [viewingUserProfile.id]: {
                                ...prev[viewingUserProfile.id],
                                isFollowing: data.isFollowing,
                                followers: (prev[viewingUserProfile.id]?.followers || 0) + (data.isFollowing ? 1 : -1)
                              }
                            }));
                          }
                        });
                      }}
                      className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all ${followersCountMap[viewingUserProfile.id]?.isFollowing ? "bg-white/10 text-white/80 hover:bg-red-500/20 hover:text-red-400" : "bg-accent-purple text-white hover:bg-purple-500 shadow-[0_0_10px_rgba(160,96,255,0.4)]"}`}
                    >
                      {followersCountMap[viewingUserProfile.id]?.isFollowing ? "Following" : "Follow"}
                    </button>
                    <button 
                      onClick={() => {
                        setDmContact(viewingUserProfile);
                        setViewingUserProfile(null);
                      }}
                      className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] rounded-full transition-colors flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Message
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Social connections list */}
            <div className="mt-4 pt-4 border-t border-white/5">
              <span className="block text-[9px] uppercase tracking-widest text-white/40 font-bold mb-3">Social Connections</span>
              <div className="flex gap-3 items-center justify-center">
                {/* GitHub */}
                <div 
                  title={viewingUserProfile.socials?.github ? `GitHub: ${viewingUserProfile.socials.github}` : "GitHub Not Linked"}
                  className={`p-2 rounded-xl border transition-all ${
                    viewingUserProfile.socials?.github ? "bg-white/5 border-white/10 text-white" : "bg-white/[0.01] border-white/5 text-white/10 opacity-30"
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                  </svg>
                </div>
                {/* Telegram */}
                <a 
                  href={viewingUserProfile.socials?.telegram ? `https://t.me/${viewingUserProfile.socials.telegram}` : undefined}
                  target="_blank" rel="noopener noreferrer"
                  title={viewingUserProfile.socials?.telegram ? `Telegram: ${viewingUserProfile.socials.telegram}` : "Telegram Not Linked"}
                  className={`block p-2 rounded-xl border transition-all ${viewingUserProfile.socials?.telegram ? "bg-white/5 border-white/10 text-sky-400 hover:scale-105" : "bg-white/[0.01] border-white/5 text-white/10 opacity-30 cursor-default"}`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </a>
                {/* X */}
                <a 
                  href={viewingUserProfile.socials?.x ? `https://x.com/${viewingUserProfile.socials.x}` : undefined}
                  target="_blank" rel="noopener noreferrer"
                  title={viewingUserProfile.socials?.x ? `X: ${viewingUserProfile.socials.x}` : "X Not Linked"}
                  className={`block p-2 rounded-xl border transition-all ${viewingUserProfile.socials?.x ? "bg-white/5 border-white/10 text-white hover:scale-105" : "bg-white/[0.01] border-white/5 text-white/10 opacity-30 cursor-default"}`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* TikTok */}
                <div 
                  title={viewingUserProfile.socials?.tiktok ? `TikTok: ${viewingUserProfile.socials.tiktok}` : "TikTok Not Linked"}
                  className={`p-2 rounded-xl border transition-all ${
                    viewingUserProfile.socials?.tiktok ? "bg-white/5 border-white/10 text-pink-500" : "bg-white/[0.01] border-white/5 text-white/10 opacity-30"
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95.89 2.24 1.43 3.58 1.49v3.95c-1.74-.08-3.41-.75-4.73-1.89-.13-.11-.26-.22-.39-.34v6.86c.03 2.12-.9 4.19-2.52 5.56-1.92 1.63-4.66 2.1-7.05 1.22C4.5 20.18 2.8 17.55 3.05 14.8c.25-2.78 2.45-5.12 5.23-5.36 1.15-.09 2.3.17 3.3.75v4.06c-.84-.52-1.85-.71-2.8-.52-1.39.26-2.53 1.43-2.77 2.84-.28 1.62.67 3.23 2.25 3.66 1.44.4 3.05-.22 3.73-1.57.19-.38.28-.79.28-1.22V.02z" />
                  </svg>
                </div>
                {/* Instagram */}
                <a 
                  href={viewingUserProfile.socials?.instagram ? `https://instagram.com/${viewingUserProfile.socials.instagram}` : undefined}
                  target="_blank" rel="noopener noreferrer"
                  title={viewingUserProfile.socials?.instagram ? `Instagram: ${viewingUserProfile.socials.instagram}` : "Instagram Not Linked"}
                  className={`block p-2 rounded-xl border transition-all ${viewingUserProfile.socials?.instagram ? "bg-white/5 border-white/10 text-pink-400 hover:scale-105" : "bg-white/[0.01] border-white/5 text-white/10 opacity-30 cursor-default"}`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  </svg>
                </a>
                {/* Facebook */}
                <a 
                  href={viewingUserProfile.socials?.facebook ? `https://facebook.com/${viewingUserProfile.socials.facebook}` : undefined}
                  target="_blank" rel="noopener noreferrer"
                  title={viewingUserProfile.socials?.facebook ? `Facebook: ${viewingUserProfile.socials.facebook}` : "Facebook Not Linked"}
                  className={`block p-2 rounded-xl border transition-all ${viewingUserProfile.socials?.facebook ? "bg-white/5 border-white/10 text-blue-500 hover:scale-105" : "bg-white/[0.01] border-white/5 text-white/10 opacity-30 cursor-default"}`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Unlocked Badges for this user */}
            <div className="mt-4 pt-4 border-t border-white/5">
              <span className="block text-[8px] uppercase tracking-widest text-white/40 font-bold mb-2.5 text-center">Streak Achievements</span>
              <div className="grid grid-cols-5 gap-1.5 justify-center">
                {[
                  { name: "Initiate", days: 1 },
                  { name: "Novice", days: 3 },
                  { name: "Fledgling", days: 7 },
                  { name: "Apprentice", days: 15 },
                  { name: "Scout", days: 30 },
                  { name: "Pathfinder", days: 60 },
                  { name: "Vanguard", days: 90 },
                  { name: "Sentinel", days: 120 },
                  { name: "Shadow", days: 180 },
                  { name: "Legend", days: 365 }
                ].map((badge) => {
                  let userStreak = 10;
                  if (viewingUserProfile.name === "MustaphaDev") userStreak = 365;
                  else if (viewingUserProfile.name === "AfroCoder") userStreak = 120;
                  else if (viewingUserProfile.name === "FatimaTON") userStreak = 90;
                  else if (viewingUserProfile.name === "KofiWeb3") userStreak = 30;
                  else if (viewingUserProfile.name === "Zubairu") userStreak = 15;
                  else userStreak = profile.streakDays;

                  const isUnlocked = userStreak >= badge.days;
                  return (
                    <div 
                      key={badge.name} 
                      title={`${badge.name} (${badge.days} Days)`}
                      className={`flex flex-col items-center p-1.5 rounded-lg border text-center transition-all ${
                        isUnlocked 
                          ? 'bg-white/5 border-white/10 text-white' 
                          : 'bg-white/[0.01] border-white/5 opacity-20'
                      }`}
                    >
                      <BadgeIcon name={badge.name} className="w-4 h-4 mb-1" />
                      <span className="block text-[5px] font-bold truncate max-w-full text-white/60">{badge.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Performance metrics */}
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/5 text-center">
              <div>
                <span className="block text-sm font-black text-white">{viewingUserProfile.reputation} XP</span>
                <span className="block text-[8px] text-white/40 uppercase font-semibold mt-0.5">Reputation</span>
              </div>
              <div>
                <span className="block text-sm font-black text-white">Rank #{viewingUserProfile.rank}</span>
                <span className="block text-[8px] text-white/40 uppercase font-semibold mt-0.5">Rank</span>
              </div>
            </div>

            <Button onClick={() => setViewingUserProfile(null)} variant="primary" className="w-full mt-6">
              Close Profile
            </Button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {selectedDashboardBadge && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedDashboardBadge(null)}
          >
            {(() => {
              const badgeDefs = [
                { name: "Initiate", days: 1, color: "rgba(192, 132, 252, 0.5)", desc: "Welcome to the network. Keep the spark alive." },
                { name: "Novice", days: 3, color: "rgba(192, 132, 252, 0.5)", desc: "Building consistent momentum day by day." },
                { name: "Fledgling", days: 7, color: "rgba(192, 132, 252, 0.5)", desc: "A promising start to your journey." },
                { name: "Apprentice", days: 15, color: "rgba(96, 165, 250, 0.5)", desc: "Honing your skills and growing your contribution." },
                { name: "Scout", days: 30, color: "rgba(96, 165, 250, 0.5)", desc: "You're exploring the ecosystem deeply." },
                { name: "Pathfinder", days: 60, color: "rgba(34, 211, 238, 0.5)", desc: "Blazing a trail through the Raven ecosystem." },
                { name: "Vanguard", days: 90, color: "rgba(34, 211, 238, 0.5)", desc: "Leading the charge. True dedication." },
                { name: "Sentinel", days: 120, color: "rgba(168, 85, 247, 0.5)", desc: "A guardian protecting your daily streak." },
                { name: "Shadow", days: 180, color: "rgba(168, 85, 247, 0.5)", desc: "A silent force shaping the network." },
                { name: "Legend", days: 365, color: "rgba(251, 191, 36, 0.5)", desc: "An absolute legend. Unmatched." }
              ];
              const badge = badgeDefs.find(b => b.name === selectedDashboardBadge)!;
              const isUnlocked = profile.streakDays >= badge.days;

              return (
                <motion.div 
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 20 }}
                  onClick={e => e.stopPropagation()}
                  className="relative w-full max-w-sm bg-black border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center overflow-hidden shadow-2xl"
                  style={{ boxShadow: isUnlocked ? `0 0 100px ${badge.color}` : 'none' }}
                >
                  <button onClick={() => setSelectedDashboardBadge(null)} className="absolute top-4 right-4 text-white/40 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>

                  <div className={`w-40 h-40 mb-6 flex items-center justify-center transition-all duration-700 overflow-hidden rounded-2xl ${!isUnlocked && 'grayscale brightness-50'}`}>
                    <BadgeIcon name={badge.name} className={`w-full h-full object-cover rounded-2xl ${isUnlocked ? 'drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]' : ''}`} />
                  </div>
                  
                  <h3 className={`text-3xl font-black mb-2 tracking-tight ${isUnlocked ? 'text-white' : 'text-white/40'}`}>
                    {badge.name}
                  </h3>
                  
                  <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 inline-flex items-center gap-2">
                    {isUnlocked ? <Sparkles className="w-4 h-4 text-yellow-400" /> : <Lock className="w-4 h-4 text-white/30" />}
                    <span className="text-xs font-bold text-white/80">{badge.days} Day Streak Required</span>
                  </div>

                  <p className="text-sm text-white/50 px-4">
                    {isUnlocked 
                      ? badge.desc 
                      : `You need ${badge.days - profile.streakDays} more streak days to unlock this prestigious achievement.`}
                  </p>

                  {isUnlocked && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6 font-mono text-[10px] text-accent-cyan uppercase tracking-widest"
                    >
                      Achievement Unlocked
                    </motion.div>
                  )}
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* DM Sliding Drawer */}
      <AnimatePresence>
        {dmContact && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full sm:w-[400px] bg-black border-l border-white/10 z-[9999] flex flex-col shadow-[-10px_0_50px_rgba(0,0,0,0.8)]"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-black/50 border border-white/10">
                    {dmContact.avatar ? <img src={dmContact.avatar} className="w-full h-full object-cover" /> : <User className="w-5 h-5 m-2.5 text-white/50" />}
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{dmContact.name}</h4>
                  <span className="text-[10px] text-white/40">Online</span>
                </div>
              </div>
              <button 
                onClick={() => setDmContact(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
              {messages.map(msg => {
                const isMine = msg.senderId === profile.id;
                return (
                  <div key={msg.id} className={`flex flex-col max-w-[80%] ${isMine ? 'self-end' : 'self-start'}`}>
                    <div className={`p-3 rounded-2xl text-sm ${isMine ? 'bg-accent-purple text-white rounded-br-sm' : 'bg-white/10 text-white border border-white/5 rounded-bl-sm'}`}>
                      {msg.content}
                    </div>
                    <span className={`text-[9px] text-white/30 mt-1 ${isMine ? 'text-right' : 'text-left'}`}>
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })}
              {messages.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-white/30 space-y-3">
                  <MessageCircle className="w-10 h-10 opacity-50" />
                  <p className="text-xs">Start a conversation with {dmContact.name}</p>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-white/10 bg-black">
              <div className="relative flex items-center">
                <input 
                  type="text"
                  placeholder="Type a message..."
                  value={newMessageContent}
                  onChange={(e) => setNewMessageContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isPosting && newMessageContent.trim()) {
                      const token = localStorage.getItem("raven_user_token");
                      if (!profile.isGraduated) {
                        addNotification("Only TON Graduates can send direct messages.", { type: "warning" });
                        return;
                      }
                      setIsPosting(true);
                      fetch("/api/messages", {
                        method: "POST",
                        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                        body: JSON.stringify({ receiverId: dmContact.id, content: newMessageContent })
                      }).then(res => res.json()).then(data => {
                        setIsPosting(false);
                        if (data.message) {
                          setMessages([...messages, data.message]);
                          setNewMessageContent("");
                        } else {
                          addNotification(data.error || "Failed to send message", { type: "warning" });
                        }
                      });
                    }
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-4 pr-12 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent-purple/50 transition-colors"
                />
                <button 
                  disabled={isPosting || !newMessageContent.trim()}
                  onClick={() => {
                    if (!profile.isGraduated) {
                      addNotification("Only TON Graduates can send direct messages.", { type: "warning" });
                      return;
                    }
                    const token = localStorage.getItem("raven_user_token");
                    setIsPosting(true);
                    fetch("/api/messages", {
                      method: "POST",
                      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                      body: JSON.stringify({ receiverId: dmContact.id, content: newMessageContent })
                    }).then(res => res.json()).then(data => {
                      setIsPosting(false);
                      if (data.message) {
                        setMessages([...messages, data.message]);
                        setNewMessageContent("");
                      }
                    });
                  }}
                  className="absolute right-1.5 p-2 bg-accent-purple hover:bg-purple-500 rounded-full text-white transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {floatingXps.map(item => (
        <motion.div
          key={item.id}
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 0, y: -100, scale: 1.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="fixed pointer-events-none z-[9999] text-yellow-400 font-extrabold text-lg select-none drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]"
          style={{ top: item.top, left: item.left, transform: 'translateX(-50%)' }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
}
