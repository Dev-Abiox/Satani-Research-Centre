import { NextResponse } from "next/server";
import { verify, LaunchPayload, sign } from "@/lib/lab-access/jwt";
import { isApproved } from "@/lib/lab-access/storage";
import { getToolOrDefault } from "@/lib/lab-access/tools";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 10; // ~10 years

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const origin = url.origin;

  if (!token) {
    return NextResponse.redirect(`${origin}/lab-tools/src-exvivo-spectra?error=missing`);
  }

  const payload = await verify<LaunchPayload>(token);
  if (!payload || payload.kind !== "launch") {
    return NextResponse.redirect(`${origin}/lab-tools/src-exvivo-spectra?error=invalid`);
  }

  const tool = getToolOrDefault(payload.tool);

  if (!(await isApproved(tool.storageKey, payload.email))) {
    return NextResponse.redirect(`${origin}${tool.page}?error=revoked`);
  }

  // Set the session cookie so future tool-page visits skip the form
  const sessionToken = await sign(
    { kind: "session", tool: tool.slug, email: payload.email },
    null
  );

  // Sign a short-lived access token that the external tool app validates
  // (via /api/lab-access/validate) on first load and re-validates every
  // 15 min. Bounding the TTL bounds the tool-app session — and revocation
  // surfaces here too because validate re-checks storage on every call.
  const accessToken = await sign(
    { kind: "launch", tool: tool.slug, email: payload.email },
    "8h"
  );
  const dest = new URL(tool.url);
  dest.searchParams.set("access", accessToken);

  const res = NextResponse.redirect(dest.toString());
  res.cookies.set({
    name: tool.cookieName,
    value: sessionToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/lab-tools",
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}
