import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-helper";
import { getDb, writeDb } from "@/lib/db";

export async function GET() {
  const user = await getAuthUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const db = getDb();
  
  // Join submission with user and opportunity details for UI ease
  const submissionsWithDetails = db.submissions.map((sub) => {
    const submitter = db.users.find((u) => u.id === sub.userId);
    const opp = db.opportunities.find((o) => o.id === sub.opportunityId);
    
    return {
      ...sub,
      userName: submitter ? submitter.name : "Unknown User",
      userWallet: submitter ? submitter.walletAddress : "N/A",
      opportunityTitle: opp ? opp.title : "Deleted Opportunity",
      opportunityType: opp ? opp.type : "N/A",
    };
  });

  return NextResponse.json({ submissions: submissionsWithDetails });
}

export async function PATCH(request: Request) {
  const user = await getAuthUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { submissionId, isApproved } = await request.json();

    if (!submissionId || isApproved === undefined) {
      return NextResponse.json({ error: "Submission ID and status are required" }, { status: 400 });
    }

    const db = getDb();
    const submission = db.submissions.find((s) => s.id === submissionId);

    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    submission.isApproved = Boolean(isApproved);
    writeDb(db);

    return NextResponse.json({ success: true, submission });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update submission" }, { status: 500 });
  }
}
