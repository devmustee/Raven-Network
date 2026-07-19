import { NextResponse } from "next/server";
import { getDb, writeDb, FollowerRelation } from "@/lib/db";
import crypto from "crypto";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const checkRelation = searchParams.get("checkRelation");

    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    // In our mock, token is the walletAddress
    
    const db = getDb();
    const currentUser = db.users.find(u => u.walletAddress === token);
    
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Return specific relation check
    if (checkRelation) {
      const isFollowing = db.followers.some(
        f => f.followerId === currentUser.id && f.followingId === checkRelation
      );
      return NextResponse.json({ isFollowing });
    }

    // Otherwise return follower and following stats for a specific user
    if (userId) {
      const followers = db.followers.filter(f => f.followingId === userId).length;
      const following = db.followers.filter(f => f.followerId === userId).length;
      return NextResponse.json({ followers, following });
    }

    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    
    const db = getDb();
    const currentUser = db.users.find(u => u.walletAddress === token);
    
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { followingId } = await request.json();
    if (!followingId) {
      return NextResponse.json({ error: "Missing followingId" }, { status: 400 });
    }

    if (currentUser.id === followingId) {
      return NextResponse.json({ error: "Cannot follow yourself" }, { status: 400 });
    }

    const existingIndex = db.followers.findIndex(
      f => f.followerId === currentUser.id && f.followingId === followingId
    );

    if (existingIndex >= 0) {
      // Unfollow
      db.followers.splice(existingIndex, 1);
      writeDb(db);
      return NextResponse.json({ success: true, isFollowing: false });
    } else {
      // Follow
      const newRelation: FollowerRelation = {
        id: crypto.randomUUID(),
        followerId: currentUser.id,
        followingId,
        createdAt: new Date().toISOString()
      };
      db.followers.push(newRelation);
      writeDb(db);
      return NextResponse.json({ success: true, isFollowing: true });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
