import { cookies } from "next/headers";
import { verify, SessionPayload } from "./jwt";
import { isApproved } from "./storage";
import { LabTool, DEFAULT_TOOL_SLUG, LEGACY_SLUG_MAP } from "./tools";

/**
 * Resolve the signed-in email for a given tool from its session cookie.
 * Returns null if there's no cookie, the cookie is invalid, it was issued for
 * a different tool, or the email is no longer approved (e.g. revoked).
 */
export async function getSessionEmail(tool: LabTool): Promise<string | null> {
  const cookie = cookies().get(tool.cookieName);
  if (!cookie?.value) return null;

  const payload = await verify<SessionPayload>(cookie.value);
  if (!payload || payload.kind !== "session") return null;

  // A session is only valid for the tool it was issued for. Legacy cookies
  // signed before multi-tool support carry no `tool` → treat as the default
  // tool. Cookies signed with the pre-rename slugs (labcalc-engine,
  // src-comparison, src-cbc) are normalized through LEGACY_SLUG_MAP so
  // existing sessions keep working after the URL rename.
  const rawTool = payload.tool || DEFAULT_TOOL_SLUG;
  const cookieTool = LEGACY_SLUG_MAP[rawTool] ?? rawTool;
  if (cookieTool !== tool.slug) return null;

  if (!(await isApproved(tool.storageKey, payload.email))) return null;
  return payload.email;
}
