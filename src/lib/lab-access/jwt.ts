import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret-do-not-use");

export type DecisionPayload = {
  kind: "decision";
  requestId: string;
  email: string;
  action: "approve" | "deny";
};

export type LaunchPayload = {
  kind: "launch";
  email: string;
};

export type SessionPayload = {
  kind: "session";
  email: string;
};

export type RevokePayload = {
  kind: "revoke";
  email: string;
};

export type AnyPayload = DecisionPayload | LaunchPayload | SessionPayload | RevokePayload;

export async function sign(payload: AnyPayload, expiresIn: string | null): Promise<string> {
  const jwt = new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt();
  if (expiresIn) jwt.setExpirationTime(expiresIn);
  return jwt.sign(SECRET);
}

export async function verify<T extends AnyPayload>(token: string): Promise<T | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as T;
  } catch {
    return null;
  }
}
