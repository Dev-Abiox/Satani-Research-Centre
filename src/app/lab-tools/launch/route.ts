import { NextResponse } from "next/server";
import { verify, LaunchPayload, sign } from "@/lib/lab-access/jwt";
import { isApproved } from "@/lib/lab-access/storage";

const LABCALC_URL = process.env.LABCALC_URL || "https://lab-calc-engine.vercel.app";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 10; // ~10 years

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const origin = url.origin;

  if (!token) {
    return NextResponse.redirect(`${origin}/lab-tools?error=missing`);
  }

  const payload = await verify<LaunchPayload>(token);
  if (!payload || payload.kind !== "launch") {
    return NextResponse.redirect(`${origin}/lab-tools?error=invalid`);
  }
  if (!isApproved(payload.email)) {
    return NextResponse.redirect(`${origin}/lab-tools?error=revoked`);
  }

  // Set the session cookie so future /lab-tools visits skip the form
  const sessionToken = await sign({ kind: "session", email: payload.email }, null);
  const res = NextResponse.redirect(LABCALC_URL);
  res.cookies.set({
    name: "lab_access",
    value: sessionToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/lab-tools",
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}
