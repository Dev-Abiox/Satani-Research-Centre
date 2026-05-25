import { NextResponse } from "next/server";
import { isApproved } from "@/lib/lab-access/storage";
import { verify, LaunchPayload } from "@/lib/lab-access/jwt";
import { ALL_TOOLS, getToolOrDefault } from "@/lib/lab-access/tools";

// Origins of every registered tool may call this endpoint cross-origin to
// confirm a launch token is still valid (e.g. not revoked).
const ALLOWED_ORIGINS = new Set(
  ALL_TOOLS.map((t) => {
    try {
      return new URL(t.url).origin;
    } catch {
      return t.url;
    }
  })
);

function isAllowedOrigin(origin: string): boolean {
  if (ALLOWED_ORIGINS.has(origin)) return true;
  // Dev-only: allow any localhost / 127.0.0.1 origin for local tool testing.
  if (process.env.NODE_ENV !== "production" && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
    return true;
  }
  return false;
}

function withCors(res: NextResponse, origin: string | null): NextResponse {
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  res.headers.set("Vary", "Origin");
  if (origin && isAllowedOrigin(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
  }
  return res;
}

export async function OPTIONS(req: Request) {
  return withCors(new NextResponse(null, { status: 204 }), req.headers.get("origin"));
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  try {
    const { token } = await req.json();
    if (typeof token !== "string") {
      return withCors(NextResponse.json({ valid: false, reason: "missing" }), origin);
    }
    const payload = await verify<LaunchPayload>(token);
    if (!payload || payload.kind !== "launch") {
      return withCors(NextResponse.json({ valid: false, reason: "invalid" }), origin);
    }
    const tool = getToolOrDefault(payload.tool);
    if (!(await isApproved(tool.storageKey, payload.email))) {
      return withCors(NextResponse.json({ valid: false, reason: "revoked" }), origin);
    }
    return withCors(
      NextResponse.json({ valid: true, email: payload.email, tool: tool.slug }),
      origin
    );
  } catch (err) {
    console.error("[lab-access/validate]", err);
    return withCors(NextResponse.json({ valid: false, reason: "error" }), origin);
  }
}
