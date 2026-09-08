import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { getJwtConfig } from "../lib/jwt.config";

export type AuthRole = "FOUNDER" | "ADMIN" | "CUSTOMER" | "RELIGIOUS_PARTNER";
const AUTH_ROLES: readonly AuthRole[] = ["FOUNDER", "ADMIN", "CUSTOMER", "RELIGIOUS_PARTNER"];

export interface AuthenticatedRequest extends Request {
  auth?: { id: string; email: string; role: AuthRole };
}

function readBearerToken(req: Request): string | null {
  const header = req.header("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7).trim() || null;
}

export async function optionalAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = readBearerToken(req);
  if (!token) return next();
  try {
    const { secret, issuer, audience } = getJwtConfig();
    const payload = jwt.verify(token, secret, { issuer, audience }) as jwt.JwtPayload & Partial<NonNullable<AuthenticatedRequest["auth"]>>;
    if (
      typeof payload.id !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.exp !== "number" ||
      !AUTH_ROLES.includes(payload.role as AuthRole)
    ) {
      throw new Error("Authentication token payload is invalid");
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true, role: true, isActive: true },
    });
    if (
      !currentUser ||
      !currentUser.isActive ||
      currentUser.email !== payload.email ||
      currentUser.role !== payload.role ||
      !AUTH_ROLES.includes(currentUser.role)
    ) {
      throw new Error("Authentication session is stale or inactive");
    }

    req.auth = { id: currentUser.id, email: currentUser.email, role: currentUser.role };
    return next();
  } catch {
    return res.status(401).json({ success: false, message: "Authentication token is invalid or expired." });
  }
}

export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  return optionalAuth(req, res, () => {
    if (!req.auth) return res.status(401).json({ success: false, message: "Authentication required." });
    return next();
  });
}

export function requireRoles(...roles: AuthRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.auth) return res.status(401).json({ success: false, message: "Authentication required." });
    if (!roles.includes(req.auth.role)) {
      return res.status(403).json({ success: false, message: "You are not authorized for this operation." });
    }
    return next();
  };
}
