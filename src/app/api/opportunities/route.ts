import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-helper";
import { getDb, writeDb, Submission } from "@/lib/db";

export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();

  // Get user's submissions
  const userSubmissions = db.submissions.filter((s) => s.userId === user.id);

  return NextResponse.json({
    opportunities: db.opportunities,
    submissions: userSubmissions,
  });
}

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { opportunityId, submissionLink } = await request.json();

    if (!opportunityId || !submissionLink) {
      return NextResponse.json({ error: "Opportunity ID and submission link are required" }, { status: 400 });
    }

    const db = getDb();
    const opportunity = db.opportunities.find((o) => o.id === opportunityId);

    if (!opportunity) {
      return NextResponse.json({ error: "Opportunity not found" }, { status: 404 });
    }

    // Verify reputation gating check
    if (user.reputationXP < opportunity.xpRequired) {
      return NextResponse.json({ error: "Insufficient reputation XP to apply" }, { status: 403 });
    }

    // Check if already submitted
    const alreadySubmitted = db.submissions.some(
      (s) => s.userId === user.id && s.opportunityId === opportunityId
    );

    if (alreadySubmitted) {
      return NextResponse.json({ error: "Submission already received for this listing" }, { status: 400 });
    }

    const newSubmission: Submission = {
      id: "sub-" + Math.random().toString(36).substring(2, 9),
      userId: user.id,
      opportunityId,
      submissionLink,
      isApproved: false,
      submittedAt: new Date().toISOString(),
    };

    db.submissions.push(newSubmission);
    writeDb(db);

    return NextResponse.json({
      success: true,
      submission: newSubmission,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to submit application" }, { status: 500 });
  }
}
