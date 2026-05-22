// Dual-mode persistent storage:
//   • Production / Vercel: Upstash Redis (KV_REST_API_URL + KV_REST_API_TOKEN)
//   • Local dev fallback:   JSON file at .lab-access-data.json
//
// Switches automatically based on env presence so the same code runs in both.
//
// Every function takes a `storageKey` (from the tool registry) so each tool
// keeps a fully independent pending/approved namespace:
//   Redis:  `${storageKey}:approved`  (set)   `${storageKey}:pending:<id>` (string, TTL)
//   File:   data[storageKey] = { pending, approved }

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { Redis } from "@upstash/redis";

const PENDING_TTL_SECONDS = 48 * 60 * 60;

const approvedSetKey = (storageKey: string) => `${storageKey}:approved`;
const pendingItemKey = (storageKey: string, requestId: string) =>
  `${storageKey}:pending:${requestId}`;

const VERBOSE = process.env.NODE_ENV !== "production";
function vlog(...args: unknown[]): void {
  if (VERBOSE) console.log(...args);
}

const HAS_KV =
  !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

const redis: Redis | null = HAS_KV
  ? new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  : null;

// ─── File-backed fallback (local dev only) ────────────────────────────────

type ToolData = {
  pending: Record<string, { email: string; createdAt: number }>;
  approved: string[];
};
// Keyed by storageKey so multiple tools share one file.
type Shape = Record<string, ToolData>;

const FILE = resolve(process.cwd(), ".lab-access-data.json");
const PENDING_TTL_MS = PENDING_TTL_SECONDS * 1000;

function emptyToolData(): ToolData {
  return { pending: {}, approved: [] };
}

function fileLoad(): Shape {
  try {
    if (!existsSync(FILE)) return {};
    const parsed = JSON.parse(readFileSync(FILE, "utf-8"));
    if (!parsed || typeof parsed !== "object") return {};
    // Legacy single-tool shape ({ pending, approved }) → migrate under "lab".
    if (Array.isArray(parsed.approved) || (parsed.pending && !parsed.lab)) {
      return {
        lab: {
          pending: parsed.pending ?? {},
          approved: Array.isArray(parsed.approved) ? parsed.approved : [],
        },
      };
    }
    return parsed as Shape;
  } catch (e) {
    console.error("[lab-access/storage] file load failed:", e);
    return {};
  }
}

function fileSave(data: Shape): void {
  try {
    mkdirSync(dirname(FILE), { recursive: true });
    writeFileSync(FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("[lab-access/storage] file save failed:", e);
  }
}

function fileTool(data: Shape, storageKey: string): ToolData {
  if (!data[storageKey]) data[storageKey] = emptyToolData();
  return data[storageKey];
}

// ─── Public API (same signatures for both backends) ───────────────────────

export async function savePending(
  storageKey: string,
  requestId: string,
  email: string
): Promise<void> {
  const lower = email.toLowerCase();
  if (redis) {
    await redis.set(pendingItemKey(storageKey, requestId), lower, { ex: PENDING_TTL_SECONDS });
  } else {
    const data = fileLoad();
    fileTool(data, storageKey).pending[requestId] = { email: lower, createdAt: Date.now() };
    fileSave(data);
  }
  vlog(`[lab-access] pending saved: ${lower} (${storageKey}/${requestId})`);
}

export async function deletePending(storageKey: string, requestId: string): Promise<void> {
  if (redis) {
    await redis.del(pendingItemKey(storageKey, requestId));
  } else {
    const data = fileLoad();
    const tool = data[storageKey];
    if (!tool || !(requestId in tool.pending)) return;
    delete tool.pending[requestId];
    fileSave(data);
  }
  vlog(`[lab-access] pending deleted: ${storageKey}/${requestId}`);
}

export async function consumePending(
  storageKey: string,
  requestId: string
): Promise<string | null> {
  if (redis) {
    const email = await redis.get<string>(pendingItemKey(storageKey, requestId));
    if (!email) return null;
    await redis.del(pendingItemKey(storageKey, requestId));
    vlog(`[lab-access] pending consumed: ${email} (${storageKey})`);
    return email;
  }
  const data = fileLoad();
  const tool = data[storageKey];
  const entry = tool?.pending[requestId];
  if (!entry) return null;
  delete tool.pending[requestId];
  if (Date.now() - entry.createdAt > PENDING_TTL_MS) {
    fileSave(data);
    return null;
  }
  fileSave(data);
  return entry.email;
}

export async function approve(storageKey: string, email: string): Promise<void> {
  const lower = email.toLowerCase();
  if (redis) {
    await redis.sadd(approvedSetKey(storageKey), lower);
  } else {
    const data = fileLoad();
    const tool = fileTool(data, storageKey);
    if (!tool.approved.includes(lower)) {
      tool.approved.push(lower);
      fileSave(data);
    }
  }
  vlog(`[lab-access] approved: ${lower} (${storageKey})`);
}

export async function isApproved(storageKey: string, email: string): Promise<boolean> {
  const lower = email.toLowerCase();
  let result: boolean;
  if (redis) {
    result = (await redis.sismember(approvedSetKey(storageKey), lower)) === 1;
  } else {
    result = fileLoad()[storageKey]?.approved.includes(lower) ?? false;
  }
  vlog(`[lab-access] isApproved(${storageKey}, ${lower}) = ${result}`);
  return result;
}

export async function revoke(storageKey: string, email: string): Promise<boolean> {
  const lower = email.toLowerCase();
  if (redis) {
    const removed = await redis.srem(approvedSetKey(storageKey), lower);
    vlog(`[lab-access] revoked: ${lower} (${storageKey}, removed=${removed})`);
    return removed === 1;
  }
  const data = fileLoad();
  const tool = data[storageKey];
  const idx = tool?.approved.indexOf(lower) ?? -1;
  if (!tool || idx === -1) return false;
  tool.approved.splice(idx, 1);
  fileSave(data);
  vlog(`[lab-access] revoked: ${lower} (${storageKey})`);
  return true;
}
