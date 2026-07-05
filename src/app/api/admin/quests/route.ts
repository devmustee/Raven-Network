import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-helper";
import { getDb, writeDb, Quest } from "@/lib/db";

export async function GET() {
  const user = await getAuthUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const db = getDb();
  return NextResponse.json({ quests: db.quests });
}

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const questData = await request.json();
    const { title, description, category, xpReward, verificationType, verificationMeta } = questData;

    if (!title || !description || !category || xpReward === undefined || !verificationType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = getDb();
    const newQuest: Quest = {
      id: "q-" + Math.random().toString(36).substring(2, 9),
      title,
      description,
      category,
      xpReward: Number(xpReward),
      verificationType,
      verificationMeta,
    };

    db.quests.push(newQuest);
    writeDb(db);

    return NextResponse.json({ success: true, quest: newQuest });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create quest" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const user = await getAuthUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const questData = await request.json();
    const { id, title, description, category, xpReward, verificationType, verificationMeta } = questData;

    if (!id) {
      return NextResponse.json({ error: "Quest ID is required" }, { status: 400 });
    }

    const db = getDb();
    const quest = db.quests.find((q) => q.id === id);

    if (!quest) {
      return NextResponse.json({ error: "Quest not found" }, { status: 404 });
    }

    if (title !== undefined) quest.title = title;
    if (description !== undefined) quest.description = description;
    if (category !== undefined) quest.category = category;
    if (xpReward !== undefined) quest.xpReward = Number(xpReward);
    if (verificationType !== undefined) quest.verificationType = verificationType;
    if (verificationMeta !== undefined) quest.verificationMeta = verificationMeta;

    writeDb(db);

    return NextResponse.json({ success: true, quest });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update quest" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const user = await getAuthUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Quest ID is required" }, { status: 400 });
    }

    const db = getDb();
    const questIndex = db.quests.findIndex((q) => q.id === id);

    if (questIndex === -1) {
      return NextResponse.json({ error: "Quest not found" }, { status: 404 });
    }

    db.quests.splice(questIndex, 1);
    writeDb(db);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete quest" }, { status: 500 });
  }
}
