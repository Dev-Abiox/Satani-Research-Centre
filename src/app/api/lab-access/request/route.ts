import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { deletePending, isApproved, savePending } from "@/lib/lab-access/storage";
import { sign } from "@/lib/lab-access/jwt";
import { sendOwnerDecisionRequest } from "@/lib/lab-access/email";
import { isRateLimited } from "@/lib/lab-access/rate-limit";
import { getTool } from "@/lib/lab-access/tools";

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

// ~10 years; browsers will silently cap to ~400 days but intent is "until revoked"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 10;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, tool: toolSlug, _honeypot, _timestamp } = body || {};

    // Bot checks. The honeypot is the primary defense; the timestamp guard
    // only rejects near-instant programmatic submits. Keep the window short —
    // a real user can fill one email field and submit in well under 3s, and a
    // false positive here silently drops a legitimate request.
    if (_honeypot) return NextResponse.json({ success: true });
    if (_timestamp && Date.now() - _timestamp < 1200) return NextResponse.json({ success: true });

    // Resolve which tool this request is for
    const tool = getTool(typeof toolSlug === "string" ? toolSlug : null);
    if (!tool) {
      return NextResponse.json({ success: false, error: "Unknown tool" }, { status: 400 });
    }

    // Email validation
    if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
    }
    const cleanEmail = email.trim().toLowerCase();

    // Rate limit (per tool + IP)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (isRateLimited(tool.slug, ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Already approved? Set session cookie and tell client to redirect.
    if (await isApproved(tool.storageKey, cleanEmail)) {
      const sessionToken = await sign(
        { kind: "session", tool: tool.slug, email: cleanEmail },
        null
      );
      // The external tool app's AccessGate requires a signed access token in
      // the URL — without it the gate bounces back here and we redirect-loop.
      const accessToken = await sign(
        { kind: "launch", tool: tool.slug, email: cleanEmail },
        "8h"
      );
      const dest = new URL(tool.url);
      dest.searchParams.set("access", accessToken);
      const res = NextResponse.json({
        success: true,
        approved: true,
        redirectUrl: dest.toString(),
      });
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

    // Optional environment flag to auto-approve requests instantly
    if (process.env.AUTO_APPROVE_LAB_ACCESS === "true") {
      await import("@/lib/lab-access/storage").then((m) => m.approve(tool.storageKey, cleanEmail));
      const sessionToken = await sign(
        { kind: "session", tool: tool.slug, email: cleanEmail },
        null
      );
      const accessToken = await sign(
        { kind: "launch", tool: tool.slug, email: cleanEmail },
        "8h"
      );
      const dest = new URL(tool.url);
      dest.searchParams.set("access", accessToken);
      const res = NextResponse.json({
        success: true,
        approved: true,
        redirectUrl: dest.toString(),
      });
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

    // New request → save to persistent pending storage
    const requestId = randomUUID();
    await savePending(tool.storageKey, requestId, cleanEmail);

    const approveToken = await sign(
      { kind: "decision", tool: tool.slug, requestId, email: cleanEmail, action: "approve" },
      "48h"
    );
    const denyToken = await sign(
      { kind: "decision", tool: tool.slug, requestId, email: cleanEmail, action: "deny" },
      "48h"
    );

    const site =
      process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://sataniresearchcentre.com");
    const approveUrl = `${site}/api/lab-access/decide?token=${approveToken}`;

    const adminEmail =
      process.env.LAB_ACCESS_ADMIN_EMAIL?.trim() ||
      process.env.SMTP_USER?.trim() ||
      "connect@sataniresearchcentre.com";

    // Attempt to email owner with approve/deny links
    try {
      await sendOwnerDecisionRequest({
        to: adminEmail,
        userEmail: cleanEmail,
        toolName: tool.name,
        approveToken,
        denyToken,
      });
    } catch (emailErr) {
      // Do NOT delete the pending entry. The user request has been registered
      // successfully in storage and can be approved by the admin via dashboard or direct link.
      console.error("[lab-access/request] owner email notification failed (request preserved in pending):", emailErr);
      console.log(`[lab-access] Manual approve URL for ${cleanEmail} (${tool.name}): ${approveUrl}`);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[lab-access/request]", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
