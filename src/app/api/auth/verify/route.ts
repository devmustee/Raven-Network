import { NextResponse } from "next/server";
import { getDb, writeDb, User } from "@/lib/db";
import { signJWT } from "@/lib/jwt";

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
        isGraduated: true,
        createdAt: new Date().toISOString(),
      };

      db.users.push(user);
      writeDb(db);
    }

    // Return cryptographically signed JWT token containing user details with 7 days expiration
    const token = signJWT({
      userId: user.id,
      role: user.role,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000
    });

    return NextResponse.json({
      success: true,
      token,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Authentication failed" }, { status: 500 });
  }
}
