import fs from "fs";
import path from "path";

// Define DB Paths inside workspace to ensure persistence
const DB_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DB_DIR, "db.json");

export interface User {
  id: string;
  walletAddress: string;
  role: "USER" | "ADMIN" | "VALIDATOR";
  name: string;
  avatar: string;
  github: string;
  telegram: string;
  x: string;
  tiktok?: string;
  instagram?: string;
  facebook?: string;
  bio?: string;
  reputationXP: number;
  streakDays: number;
  isGraduated: boolean;
  createdAt: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: "morning" | "evening" | "night" | "goals";
  xpReward: number;
  verificationType: "manual" | "twitter_retweet" | "telegram_join" | "github_commit";
  verificationMeta?: any;
}

export interface QuestLog {
  id: string;
  userId: string;
  questId: string;
  completedAt: string;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: string; // "job" | "hackathon" | "bounty"
  prizePool: string;
  deadline: string;
  xpRequired: number;
  status: "active" | "completed";
}

export interface Submission {
  id: string;
  userId: string;
  opportunityId: string;
  submissionLink: string;
  isApproved: boolean;
  submittedAt: string;
}

export interface FollowerRelation {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  userId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  likes: string[];
  comments: {
    id: string;
    userId: string;
    authorName: string;
    authorAvatar: string;
    content: string;
    createdAt: string;
  }[];
  createdAt: string;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface DatabaseSchema {
  users: User[];
  quests: Quest[];
  questLogs: QuestLog[];
  opportunities: Opportunity[];
  submissions: Submission[];
  followers: FollowerRelation[];
  posts: CommunityPost[];
  messages: DirectMessage[];
}

const DEFAULT_USERS: User[] = [
  {
    id: "user-1",
    walletAddress: "EQD...sage1",
    role: "USER",
    name: "Cryptosage",
    avatar: "/avatars/avatar1.png",
    github: "cryptosage",
    telegram: "cryptosage",
    x: "cryptosage_web3",
    reputationXP: 1240,
    streakDays: 45,
    isGraduated: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "user-3",
    walletAddress: "EQD...aisha3",
    role: "USER",
    name: "Aisha_Builds",
    avatar: "/avatars/avatar2.png",
    github: "aishabuilds",
    telegram: "aisha_dev",
    x: "aisha_builds",
    reputationXP: 780,
    streakDays: 18,
    isGraduated: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "user-4",
    walletAddress: "EQD...chidi4",
    role: "USER",
    name: "Chidi_Dev",
    avatar: "/avatars/avatar3.png",
    github: "chididev",
    telegram: "chidi_dev",
    x: "chidi_codes",
    reputationXP: 650,
    streakDays: 12,
    isGraduated: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "user-5",
    walletAddress: "EQD...nneka5",
    role: "USER",
    name: "Nneka_Creator",
    avatar: "/avatars/avatar4.png",
    github: "nnekacreates",
    telegram: "nneka_c",
    x: "nneka_creator",
    reputationXP: 540,
    streakDays: 8,
    isGraduated: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "user-6",
    walletAddress: "EQD...kofi6",
    role: "USER",
    name: "Kofi_Nodes",
    avatar: "/avatars/avatar5.png",
    github: "kofinodes",
    telegram: "kofi_nodes",
    x: "kofi_nodes",
    reputationXP: 490,
    streakDays: 5,
    isGraduated: true,
    createdAt: new Date().toISOString(),
  },
  // Default Admin Account
  {
    id: "admin-1",
    walletAddress: "EQA_ADMIN_HQ_RAVEN_GATEWAY_AUTHENTICATOR",
    role: "ADMIN",
    name: "Raven HQ Admin",
    avatar: "/logo.png",
    github: "raven-network",
    telegram: "raven_network",
    x: "raven_network",
    reputationXP: 9999,
    streakDays: 365,
    isGraduated: true,
    createdAt: new Date().toISOString(),
  }
];

const DEFAULT_QUESTS: Quest[] = [
  // Morning Quests
  {
    id: "m1",
    title: "On-Chain Checklist",
    description: "Initialize and verify your active node credentials.",
    category: "morning",
    xpReward: 15,
    verificationType: "manual",
  },
  {
    id: "m2",
    title: "Twitter Engagement",
    description: "Like and retweet the latest update announcement from Raven Network.",
    category: "morning",
    xpReward: 15,
    verificationType: "twitter_retweet",
    verificationMeta: { tweetId: "12345" }
  },
  {
    id: "m3",
    title: "Telegram Roll Call",
    description: "Check in with the Raven Community Telegram group.",
    category: "morning",
    xpReward: 15,
    verificationType: "telegram_join",
  },
  // Evening Quests
  {
    id: "e1",
    title: "GitHub Sync",
    description: "Verify your daily contribution commit push to the Raven codebase.",
    category: "evening",
    xpReward: 15,
    verificationType: "github_commit",
  },
  {
    id: "e2",
    title: "Community Q&A",
    description: "Help answer one technical question in the discord support channel.",
    category: "evening",
    xpReward: 15,
    verificationType: "manual",
  },
  // Night Quests
  {
    id: "n1",
    title: "Validator Node Heartbeat",
    description: "Send status logs check to validators node.",
    category: "night",
    xpReward: 15,
    verificationType: "manual",
  },
  // Long-Term Goals
  {
    id: "g1",
    title: "Flock Post Generator Integration",
    description: "Contribute to building or expanding the AI automation suite.",
    category: "goals",
    xpReward: 150,
    verificationType: "github_commit",
  },
  {
    id: "g2",
    title: "Host local Web3 Meetup",
    description: "Organize a physical Web3 builders hack day in your city.",
    category: "goals",
    xpReward: 200,
    verificationType: "manual",
  }
];

const DEFAULT_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-1",
    title: "Junior Smart Contract Auditor",
    description: "Audit core locking and vesting smart contracts on TON. Verify security mechanisms.",
    type: "job",
    prizePool: "$2,200 / Month",
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    xpRequired: 800,
    status: "active"
  },
  {
    id: "opp-2",
    title: "Africa Builders Hackathon",
    description: "Build innovative decentralized consumer applications using TON SDK & Raven payments.",
    type: "hackathon",
    prizePool: "$15,000 USD Pool",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    xpRequired: 200,
    status: "active"
  },
  {
    id: "opp-3",
    title: "Flock Social Media Bot Creation",
    description: "Write an automation script linking AI post generation to Twitter APIs.",
    type: "bounty",
    prizePool: "500 TON",
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    xpRequired: 500,
    status: "active"
  }
];

const DEFAULT_POSTS: CommunityPost[] = [
  {
    id: "post-1",
    userId: "admin-1",
    authorName: "Raven HQ Admin",
    authorAvatar: "/logo.png",
    content: "Welcome to the new Raven Network Contributor Hub! We are excited to launch this community feed. Start sharing your milestones, nodes status, or smart contracts code here! 🐦⬛",
    likes: ["user-3", "user-4"],
    comments: [],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "post-2",
    userId: "user-3",
    authorName: "Aisha_Builds",
    authorAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Aisha",
    content: "Just completed my morning validation node heartbeat checklist! Node is running at 99.8% uptime. Let's build! 🚀 #TON #NodeValidators",
    likes: ["admin-1"],
    comments: [],
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: "post-3",
    userId: "user-4",
    authorName: "Chidi_Dev",
    authorAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Chidi",
    content: "Anyone else working on the new EVM bridging opportunity? The Rust interface looks clean, but I'm encountering a gas optimization issue. Ping me if you'd like to collaborate! ⚙️",
    likes: [],
    comments: [],
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  }
];

export function getDb(): DatabaseSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialDb: DatabaseSchema = {
      users: DEFAULT_USERS,
      quests: DEFAULT_QUESTS,
      questLogs: [],
      opportunities: DEFAULT_OPPORTUNITIES,
      submissions: [],
      followers: [],
      posts: DEFAULT_POSTS,
      messages: [],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), "utf8");
    return initialDb;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    const parsed = JSON.parse(raw) as DatabaseSchema;
    if (!parsed.followers) parsed.followers = [];
    if (!parsed.posts || parsed.posts.length === 0) {
      parsed.posts = DEFAULT_POSTS;
      writeDb(parsed);
    }
    if (!parsed.messages) parsed.messages = [];
    return parsed;
  } catch (err) {
    console.error("Failed to parse database file, rebuilding default:", err);
    const initialDb: DatabaseSchema = {
      users: DEFAULT_USERS,
      quests: DEFAULT_QUESTS,
      questLogs: [],
      opportunities: DEFAULT_OPPORTUNITIES,
      submissions: [],
      followers: [],
      posts: DEFAULT_POSTS,
      messages: [],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), "utf8");
    return initialDb;
  }
}

export function writeDb(data: DatabaseSchema) {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
}
