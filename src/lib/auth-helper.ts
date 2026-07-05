import { headers } from "next/headers";
import { getDb, User } from "./db";

export async function getAuthUser(): Promise<User | null> {
  try {
    const headersList = await headers();
    const authHeader = headersList.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.split(" ")[1];
    const parts = token.split("_");

    // Expected format: session_token_{id}_{role}_{timestamp}
    if (parts.length < 4 || parts[0] !== "session" || parts[1] !== "token") {
      return null;
    }

    const userId = parts[2];
    const db = getDb();
    return db.users.find((u) => u.id === userId) || null;
  } catch {
    return null;
  }
}
