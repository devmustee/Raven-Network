import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-helper";
import { getDb, writeDb, QuestLog } from "@/lib/db";

export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  
  // Filter completions for this user
  const completedQuestIds = db.questLogs
    .filter((log) => log.userId === user.id)
    .map((log) => log.questId);

  return NextResponse.json({
    quests: db.quests,
    completedQuestIds,
  });
}

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { questId } = await request.json();

    if (!questId) {
      return NextResponse.json({ error: "Quest ID is required" }, { status: 400 });
    }

    const db = getDb();
    const quest = db.quests.find((q) => q.id === questId);

    if (!quest) {
      return NextResponse.json({ error: "Quest not found" }, { status: 404 });
    }

    // Check if already completed
    const alreadyCompleted = db.questLogs.some(
      (log) => log.userId === user.id && log.questId === questId
    );

    if (alreadyCompleted) {
      return NextResponse.json({ success: true, message: "Quest already completed", reputationXP: user.reputationXP });
    }

    // Add quest log
    const newLog: QuestLog = {
      id: "log-" + Math.random().toString(36).substring(2, 9),
      userId: user.id,
      questId: questId,
      completedAt: new Date().toISOString(),
    };

    db.questLogs.push(newLog);

    // Update user reputation points
    const dbUser = db.users.find((u) => u.id === user.id);
    if (dbUser) {
      dbUser.reputationXP += quest.xpReward;
    }

    writeDb(db);

    return NextResponse.json({
      success: true,
      xpEarned: quest.xpReward,
      reputationXP: dbUser ? dbUser.reputationXP : user.reputationXP,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to complete quest" }, { status: 500 });
  }
}
