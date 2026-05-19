import { NextResponse } from "next/server";
import { approve, consumePending } from "@/lib/lab-access/storage";
import { sign, verify, DecisionPayload } from "@/lib/lab-access/jwt";
import {
  sendUserApproval,
  sendUserRejection,
} from "@/lib/lab-access/email";

const ADMIN_EMAIL = process.env.LAB_ACCESS_ADMIN_EMAIL || process.env.SMTP_USER!;

function htmlPage(title: string, body: string): Response {
  return new NextResponse(
    `<!doctype html>
<html><head><meta charset="utf-8"><title>${title}</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{font-family:system-ui,-apple-system,sans-serif;max-width:520px;margin:80px auto;padding:24px;color:#111}h1{margin-top:0}p{line-height:1.6;color:#555}.ok{color:#0a7c2f}.err{color:#cc0000}</style>
</head><body>${body}</body></html>`,
    { headers: { "content-type": "text/html; charset=utf-8" } }
  );
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  if (!token) return htmlPage("Missing token", `<h1 class="err">Missing token</h1>`);

  const payload = await verify<DecisionPayload>(token);
  if (!payload || payload.kind !== "decision") {
    return htmlPage("Invalid", `<h1 class="err">Invalid or expired link</h1><p>This decision link is no longer valid.</p>`);
  }

  // Validate action BEFORE consuming the pending entry — so unknown actions
  // don't silently drop the request.
  if (payload.action !== "approve" && payload.action !== "deny") {
    return htmlPage("Unknown action", `<h1 class="err">Unknown action</h1>`);
  }

  const email = consumePending(payload.requestId);
  if (!email) {
    return htmlPage(
      "Already handled",
      `<h1>Already handled</h1><p>This request was already approved/denied, or it expired.</p>`
    );
  }

  if (payload.action === "approve") {
    approve(email);
    const launchToken = await sign({ kind: "launch", email }, null);
    const revokeToken = await sign({ kind: "revoke", email }, null);
    try {
      await sendUserApproval({
        to: email,
        launchToken,
        revokeToken,
        ownerEmail: ADMIN_EMAIL,
      });
    } catch (e) {
      console.error("[lab-access/decide] email failed", e);
    }
    return htmlPage(
      "Approved",
      `<h1 class="ok">✅ Approved</h1><p><strong>${email}</strong> has been notified and granted access to LabCalc Engine.</p><p>You'll also receive a separate email with a permanent revoke link in case you need to remove their access later.</p>`
    );
  }

  // action === "deny" (the only remaining valid value)
  try {
    await sendUserRejection({ to: email });
  } catch (e) {
    console.error("[lab-access/decide] rejection email failed", e);
  }
  return htmlPage(
    "Denied",
    `<h1>❌ Denied</h1><p><strong>${email}</strong> has been notified that their request was not approved.</p>`
  );
}
