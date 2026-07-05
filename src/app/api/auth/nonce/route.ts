import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  // Generate a simple 6-digit numeric nonce
  const nonce = Math.floor(100000 + Math.random() * 900000).toString();

  // In production, this would be saved to Redis or a session database
  return NextResponse.json({ nonce });
}
