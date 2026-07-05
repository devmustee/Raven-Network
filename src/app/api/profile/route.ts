import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-helper";
import { getDb, writeDb } from "@/lib/db";

export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ user });
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
