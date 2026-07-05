import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();
    
    // Sort users descending by reputation XP
    const sortedUsers = [...db.users]
      .sort((a, b) => b.reputationXP - a.reputationXP)
      .map((user, index) => ({
        rank: index + 1,
        name: user.name,
        reputation: user.reputationXP,
        avatar: user.avatar,
        walletAddress: user.walletAddress,
        streakDays: user.streakDays,
        github: user.github,
        telegram: user.telegram,
        x: user.x
      }));

    return NextResponse.json({ success: true, users: sortedUsers });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to load leaderboard" }, { status: 500 });
  }
}
