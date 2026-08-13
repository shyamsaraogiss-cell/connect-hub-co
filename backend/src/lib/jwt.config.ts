import "dotenv/config";

export interface JwtConfig {
  secret: string;
  issuer: string;
  audience: string;
}

export function getJwtConfig(): JwtConfig {
  const secret = process.env.JWT_SECRET?.trim();
  const issuer = process.env.JWT_ISSUER?.trim();
  const audience = process.env.JWT_AUDIENCE?.trim();

  if (!secret || !issuer || !audience) {
    throw new Error("Required JWT configuration is missing");
  }

  return { secret, issuer, audience };
}
