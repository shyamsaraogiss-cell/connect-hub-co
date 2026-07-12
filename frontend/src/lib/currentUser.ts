import { cookies } from "next/headers";
import { verifyToken, SessionUser } from "@/lib/auth";

export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("connecthub_session")?.value;

    if (!token) {
      return null;
    }

    return await verifyToken(token);
  } catch {
    return null;
  }
}