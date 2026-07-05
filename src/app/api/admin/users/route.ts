import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-helper";
import { getDb, writeDb } from "@/lib/db";

export async function GET() {
  const user = await getAuthUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const db = getDb();
  return NextResponse.json({ users: db.users });
}

export async function PATCH(request: Request) {
  const user = await getAuthUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { userId, ...updates } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const db = getDb();
    const userToUpdate = db.users.find((u) => u.id === userId);

    if (!userToUpdate) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Apply allowed updates
    if (updates.role !== undefined) {
      if (!["USER", "ADMIN", "VALIDATOR"].includes(updates.role)) {
        return NextResponse.json({ error: "Invalid role value" }, { status: 400 });
      }
      userToUpdate.role = updates.role;
    }
    if (updates.reputationXP !== undefined) {
      userToUpdate.reputationXP = Number(updates.reputationXP);
    }
    if (updates.streakDays !== undefined) {
      userToUpdate.streakDays = Number(updates.streakDays);
    }
    if (updates.isGraduated !== undefined) {
      userToUpdate.isGraduated = Boolean(updates.isGraduated);
    }
    if (updates.name !== undefined) {
      userToUpdate.name = String(updates.name);
    }

    writeDb(db);

    return NextResponse.json({ success: true, user: userToUpdate });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update user" }, { status: 500 });
  }
}
