import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-helper";
import { getDb, writeDb } from "@/lib/db";

export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const dbUser = db.users.find((u) => u.id === user.id);
  
  if (dbUser) {
    // Streak Decay Engine: Decay streak if last activity was > 36h ago
    const userLogs = db.questLogs.filter(log => log.userId === dbUser.id);
    if (userLogs.length > 0) {
      const sortedLogs = [...userLogs].sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
      const lastLogTime = new Date(sortedLogs[0].completedAt).getTime();
      const now = Date.now();
      const diffMs = now - lastLogTime;
      const diffHours = diffMs / (1000 * 60 * 60);

      if (diffHours > 36) {
        const decayDays = Math.floor((diffHours - 12) / 24);
        const oldStreak = dbUser.streakDays;
        dbUser.streakDays = Math.max(0, dbUser.streakDays - decayDays);
        if (oldStreak !== dbUser.streakDays) {
          writeDb(db);
        }
      }
    }
  }

  return NextResponse.json({ user: dbUser || user });
}

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const db = getDb();
    const dbUser = db.users.find((u) => u.id === user.id);

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update permissible fields
    if (typeof body.name === "string") dbUser.name = body.name;
    if (typeof body.avatar === "string") dbUser.avatar = body.avatar;
    if (typeof body.github === "string") dbUser.github = body.github;
    if (typeof body.telegram === "string") dbUser.telegram = body.telegram;
    if (typeof body.x === "string") dbUser.x = body.x;

    writeDb(db);

    return NextResponse.json({ success: true, user: dbUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update profile" }, { status: 500 });
  }
}
