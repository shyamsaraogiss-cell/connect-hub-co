import { SignJWT, jwtVerify, JWTPayload } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET!
);

export interface SessionUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export async function createToken(
  user: SessionUser
): Promise<string> {
  return await new SignJWT({ ...user })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(
  token: string
): Promise<SessionUser> {
  const { payload } = await jwtVerify(token, secret);

  return payload as unknown as SessionUser;
}