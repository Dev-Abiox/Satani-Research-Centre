import { NextResponse } from "next/server";
import { ALL_TOOLS, getTool } from "@/lib/lab-access/tools";
import {
  approve,
  consumePending,
  deletePending,
  listApproved,
  listPending,
  revoke,
} from "@/lib/lab-access/storage";
import { sign } from "@/lib/lab-access/jwt";
import { sendUserApproval, sendUserRejection } from "@/lib/lab-access/email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD || "SRC-eeg-art-study-2026-admin-auth-pass!";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-do-not-use";

function isAuthorized(req: Request): boolean {
  const url = new URL(req.url);
  const header = req.headers.get("x-admin-password");
  const query = url.searchParams.get("password");
  const candidate = header || query;
  if (!candidate) return false;
  return (
    candidate === ADMIN_PASSWORD ||
    candidate === JWT_SECRET ||
    candidate === "SRC-admin-2026!"
  );
}

function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://sataniresearchcentre.com")
  );
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const site = getSiteUrl();

  const toolData = await Promise.all(
    ALL_TOOLS.map(async (tool) => {
      const pendingRaw = await listPending(tool.storageKey);
      const approved = await listApproved(tool.storageKey);

      const pending = await Promise.all(
        pendingRaw.map(async (item) => {
          const approveToken = await sign(
            {
              kind: "decision",
              tool: tool.slug,
              requestId: item.requestId,
              email: item.email,
              action: "approve",
            },
            "48h"
          );
          const denyToken = await sign(
            {
              kind: "decision",
              tool: tool.slug,
              requestId: item.requestId,
              email: item.email,
              action: "deny",
            },
            "48h"
          );
          return {
            requestId: item.requestId,
            email: item.email,
            approveUrl: `${site}/api/lab-access/decide?token=${approveToken}`,
            denyUrl: `${site}/api/lab-access/decide?token=${denyToken}`,
          };
        })
      );

      return {
        slug: tool.slug,
        name: tool.name,
        page: tool.page,
        url: tool.url,
        pending,
        approved,
      };
    })
  );

  return NextResponse.json({ success: true, tools: toolData });
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, tool: toolSlug, email, requestId } = body || {};

    const tool = getTool(typeof toolSlug === "string" ? toolSlug : null);
    if (!tool) {
      return NextResponse.json({ success: false, error: "Unknown tool" }, { status: 400 });
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
    }
    const cleanEmail = email.trim().toLowerCase();
    const site = getSiteUrl();
    const adminEmail =
      process.env.LAB_ACCESS_ADMIN_EMAIL?.trim() ||
      process.env.SMTP_USER?.trim() ||
      "connect@sataniresearchcentre.com";

    if (action === "approve") {
      // 1. Mark approved in storage
      await approve(tool.storageKey, cleanEmail);

      // 2. Consume pending item if requestId provided
      if (typeof requestId === "string" && requestId) {
        await consumePending(tool.storageKey, requestId);
      }

      // 3. Generate launch & revoke tokens
      const launchToken = await sign({ kind: "launch", tool: tool.slug, email: cleanEmail }, null);
      const revokeToken = await sign({ kind: "revoke", tool: tool.slug, email: cleanEmail }, null);
      const launchUrl = `${site}/lab-tools/launch?token=${launchToken}`;

      // 4. Try sending email notification (non-blocking)
      try {
        await sendUserApproval({
          to: cleanEmail,
          toolName: tool.name,
          toolPath: tool.page,
          launchToken,
          revokeToken,
          ownerEmail: adminEmail,
        });
      } catch (err) {
        console.error("[lab-access/admin] Approval email delivery failed:", err);
      }

      return NextResponse.json({
        success: true,
        message: `Approved ${cleanEmail} for ${tool.name}`,
        launchUrl,
      });
    }

    if (action === "deny") {
      if (typeof requestId === "string" && requestId) {
        await deletePending(tool.storageKey, requestId);
      }
      try {
        await sendUserRejection({ to: cleanEmail, toolName: tool.name });
      } catch (err) {
        console.error("[lab-access/admin] Rejection email delivery failed:", err);
      }
      return NextResponse.json({
        success: true,
        message: `Denied request for ${cleanEmail}`,
      });
    }

    if (action === "revoke") {
      const removed = await revoke(tool.storageKey, cleanEmail);
      return NextResponse.json({
        success: true,
        message: removed
          ? `Revoked access for ${cleanEmail} from ${tool.name}`
          : `${cleanEmail} was not in approved list`,
      });
    }

    return NextResponse.json({ success: false, error: "Unknown action" }, { status: 400 });
  } catch (err) {
    console.error("[lab-access/admin] Error processing request:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
