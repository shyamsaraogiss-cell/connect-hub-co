import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/currentUser";

export async function requireRole(
  allowedRoles: string[]
) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!allowedRoles.includes(user.role)) {
    redirect("/login");
  }

  return user;
}

export async function requireFounder() {
  return requireRole(["FOUNDER"]);
}

export async function requireAdmin() {
  return requireRole(["FOUNDER", "ADMIN"]);
}