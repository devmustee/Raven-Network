import { NextResponse } from "next/server";
import { getDb, writeDb, DirectMessage } from "@/lib/db";
import crypto from "crypto";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const contactId = searchParams.get("contactId");

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

    if (!contactId) {
      return NextResponse.json({ error: "Missing contactId" }, { status: 400 });
    }

    // Filter messages between current user and contact
    const chatHistory = db.messages.filter(m => 
      (m.senderId === currentUser.id && m.receiverId === contactId) ||
      (m.senderId === contactId && m.receiverId === currentUser.id)
    );

    // Mark unread messages from contact to current user as read
    let updated = false;
    chatHistory.forEach(m => {
      if (m.receiverId === currentUser.id && !m.isRead) {
        m.isRead = true;
        updated = true;
      }
    });

    if (updated) {
      writeDb(db);
    }

    // Sort messages chronologically (oldest first for chat UI)
    chatHistory.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    return NextResponse.json({ messages: chatHistory });
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

    if (!currentUser.isGraduated) {
      return NextResponse.json({ error: "Only TON Graduates can send direct messages." }, { status: 403 });
    }

    const { receiverId, content } = await request.json();
    if (!receiverId || !content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const newMessage: DirectMessage = {
      id: crypto.randomUUID(),
      senderId: currentUser.id,
      receiverId,
      content: content.trim(),
      isRead: false,
      createdAt: new Date().toISOString()
    };

    db.messages.push(newMessage);
    writeDb(db);

    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
