import { NextResponse } from "next/server";
import { getDb, writeDb, User } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { address, signature, walletName } = await request.json();

    if (!address || !signature) {
      return NextResponse.json({ error: "Address and signature are required" }, { status: 400 });
    }

    const db = getDb();
    let user = db.users.find((u) => u.walletAddress.toLowerCase() === address.toLowerCase());

    // Auto-create user profile if they don't exist in database
    if (!user) {
      const isGraduated = walletName === "Tonkeeper" || walletName === "Raven Wallet";
      const isAdmin = address === "EQA_ADMIN_HQ_RAVEN_GATEWAY_AUTHENTICATOR";

      user = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        walletAddress: address,
        role: isAdmin ? "ADMIN" : "USER",
        name: isAdmin ? "Raven HQ Admin" : "Raven Builder",
        avatar: "",
        github: "",
        telegram: "",
        x: "",
        reputationXP: isAdmin ? 9999 : 820,
        streakDays: isAdmin ? 365 : 35,
        isGraduated: isGraduated,
        createdAt: new Date().toISOString(),
      };

      db.users.push(user);
      writeDb(db);
    }

    // Return mock JWT token containing role and status
    const token = `session_token_${user.id}_${user.role}_${Date.now()}`;

    return NextResponse.json({
      success: true,
      token,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Authentication failed" }, { status: 500 });
  }
}
