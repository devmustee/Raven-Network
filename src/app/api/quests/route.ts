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

    // Check if already completed (goals are once-off; others reset daily)
    const todayStr = new Date().toISOString().split("T")[0];
    const alreadyCompleted = db.questLogs.some((log) => {
      const matchesUserAndQuest = log.userId === user.id && log.questId === questId;
      if (!matchesUserAndQuest) return false;
      if (quest.category === "goals") return true; // Ever completed
      return log.completedAt.startsWith(todayStr); // Completed today
    });

    if (alreadyCompleted) {
      const dbUser = db.users.find((u) => u.id === user.id);
      return NextResponse.json({ 
        success: true, 
        message: "Quest already completed today", 
        reputationXP: dbUser ? dbUser.reputationXP : user.reputationXP,
        streakDays: dbUser ? dbUser.streakDays : user.streakDays
      });
    }

    // Add quest log
    const newLog: QuestLog = {
      id: "log-" + Math.random().toString(36).substring(2, 9),
      userId: user.id,
      questId: questId,
      completedAt: new Date().toISOString(),
    };

    db.questLogs.push(newLog);

    // Update user reputation points and check-in streak
    const dbUser = db.users.find((u) => u.id === user.id);
    if (dbUser) {
      dbUser.reputationXP += quest.xpReward;
      
      // Increment streak if completing the daily check-in checklist quest (m1)
      if (questId === "m1") {
        dbUser.streakDays += 1;
      }
    }

    writeDb(db);

    return NextResponse.json({
      success: true,
      xpEarned: quest.xpReward,
      reputationXP: dbUser ? dbUser.reputationXP : user.reputationXP,
      streakDays: dbUser ? dbUser.streakDays : user.streakDays,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to complete quest" }, { status: 500 });
  }
}
