import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-helper";
import { getDb, writeDb, Opportunity } from "@/lib/db";

export async function GET() {
  const user = await getAuthUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const db = getDb();
  return NextResponse.json({ opportunities: db.opportunities });
}

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const oppData = await request.json();
    const { title, description, type, prizePool, deadline, xpRequired } = oppData;

    if (!title || !description || !type || !prizePool || !deadline || xpRequired === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = getDb();
    const newOpp: Opportunity = {
      id: "opp-" + Math.random().toString(36).substring(2, 9),
      title,
      description,
      type,
      prizePool,
      deadline,
      xpRequired: Number(xpRequired),
      status: "active",
    };

    db.opportunities.push(newOpp);
    writeDb(db);

    return NextResponse.json({ success: true, opportunity: newOpp });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create opportunity" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const user = await getAuthUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const oppData = await request.json();
    const { id, title, description, type, prizePool, deadline, xpRequired, status } = oppData;

    if (!id) {
      return NextResponse.json({ error: "Opportunity ID is required" }, { status: 400 });
    }

    const db = getDb();
    const opp = db.opportunities.find((o) => o.id === id);

    if (!opp) {
      return NextResponse.json({ error: "Opportunity not found" }, { status: 404 });
    }

    if (title !== undefined) opp.title = title;
    if (description !== undefined) opp.description = description;
    if (type !== undefined) opp.type = type;
    if (prizePool !== undefined) opp.prizePool = prizePool;
    if (deadline !== undefined) opp.deadline = deadline;
    if (xpRequired !== undefined) opp.xpRequired = Number(xpRequired);
    if (status !== undefined) {
      if (!["active", "completed"].includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      opp.status = status;
    }

    writeDb(db);

    return NextResponse.json({ success: true, opportunity: opp });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update opportunity" }, { status: 500 });
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
      return NextResponse.json({ error: "Opportunity ID is required" }, { status: 400 });
    }

    const db = getDb();
    const oppIndex = db.opportunities.findIndex((o) => o.id === id);

    if (oppIndex === -1) {
      return NextResponse.json({ error: "Opportunity not found" }, { status: 404 });
    }

    db.opportunities.splice(oppIndex, 1);
    writeDb(db);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete opportunity" }, { status: 500 });
  }
}
