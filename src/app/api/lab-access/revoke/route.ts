import { NextResponse } from "next/server";
import { revoke } from "@/lib/lab-access/storage";
import { verify, RevokePayload } from "@/lib/lab-access/jwt";
import { getToolOrDefault } from "@/lib/lab-access/tools";

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

  const payload = await verify<RevokePayload>(token);
  if (!payload || payload.kind !== "revoke") {
    return htmlPage(
      "Invalid",
      `<h1 class="err">Invalid revoke link</h1><p>This link is not recognized.</p>`
    );
  }

  const tool = getToolOrDefault(payload.tool);

  const wasApproved = await revoke(tool.storageKey, payload.email);
  if (wasApproved) {
    return htmlPage(
      "Revoked",
      `<h1 class="ok">Revoked</h1><p><strong>${payload.email}</strong> no longer has access to ${tool.name}.</p>`
    );
  }
  return htmlPage(
    "Not approved",
    `<h1>Not currently approved</h1><p><strong>${payload.email}</strong> is not on the ${tool.name} approved list (already revoked, or never approved).</p>`
  );
}
