import { headers } from "next/headers";
import { getDb, User } from "./db";
import { verifyJWT } from "./jwt";

export async function getAuthUser(): Promise<User | null> {
  try {
    const headersList = await headers();
    const authHeader = headersList.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyJWT(token);

    if (!payload || !payload.userId) {
      return null;
    }

    const db = getDb();
    return db.users.find((u) => u.id === payload.userId) || null;
  } catch {
    return null;
  }
}
