import { NextResponse } from "next/server";
import { isApproved } from "@/lib/lab-access/storage";
import { verify, LaunchPayload } from "@/lib/lab-access/jwt";

const ALLOWED_ORIGIN = process.env.LABCALC_URL || "https://lab-calc-engine.vercel.app";

function withCors(res: NextResponse): NextResponse {
  res.headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
}

export async function OPTIONS() {
  return withCors(new NextResponse(null, { status: 204 }));
}

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    if (typeof token !== "string") {
      return withCors(NextResponse.json({ valid: false, reason: "missing" }));
    }
    const payload = await verify<LaunchPayload>(token);
    if (!payload || payload.kind !== "launch") {
      return withCors(NextResponse.json({ valid: false, reason: "invalid" }));
    }
    if (!isApproved(payload.email)) {
      return withCors(NextResponse.json({ valid: false, reason: "revoked" }));
    }
    return withCors(NextResponse.json({ valid: true, email: payload.email }));
  } catch (err) {
    console.error("[lab-access/validate]", err);
    return withCors(NextResponse.json({ valid: false, reason: "error" }));
  }
}
