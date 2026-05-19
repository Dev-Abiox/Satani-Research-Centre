import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { deletePending, isApproved, savePending } from "@/lib/lab-access/storage";
import { sign } from "@/lib/lab-access/jwt";
import { sendOwnerDecisionRequest } from "@/lib/lab-access/email";
import { isRateLimited } from "@/lib/lab-access/rate-limit";

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

const ADMIN_EMAIL = process.env.LAB_ACCESS_ADMIN_EMAIL || process.env.SMTP_USER!;
const LABCALC_URL = process.env.LABCALC_URL || "https://lab-calc-engine.vercel.app";

// ~10 years; browsers will silently cap to ~400 days but intent is "until revoked"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 10;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, _honeypot, _timestamp } = body || {};

    // Bot checks
    if (_honeypot) return NextResponse.json({ success: true });
    if (_timestamp && Date.now() - _timestamp < 3000) return NextResponse.json({ success: true });

    // Email validation
    if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
    }
    const cleanEmail = email.trim().toLowerCase();

    // Rate limit
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Already approved? Set session cookie and tell client to redirect.
    if (await isApproved(cleanEmail)) {
      const sessionToken = await sign({ kind: "session", email: cleanEmail }, null);
      const res = NextResponse.json({
        success: true,
        approved: true,
        redirectUrl: LABCALC_URL,
      });
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

    // New request → save + email owner with approve/deny links
    const requestId = randomUUID();
    await savePending(requestId, cleanEmail);

    const approveToken = await sign(
      { kind: "decision", requestId, email: cleanEmail, action: "approve" },
      "48h"
    );
    const denyToken = await sign(
      { kind: "decision", requestId, email: cleanEmail, action: "deny" },
      "48h"
    );

    try {
      await sendOwnerDecisionRequest({
        to: ADMIN_EMAIL,
        userEmail: cleanEmail,
        approveToken,
        denyToken,
      });
    } catch (emailErr) {
      // Roll back the pending entry so user can retry without creating duplicates
      await deletePending(requestId);
      console.error("[lab-access/request] owner email failed, rolled back pending:", emailErr);
      return NextResponse.json(
        { success: false, error: "Could not send request. Please try again in a few minutes." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[lab-access/request]", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
