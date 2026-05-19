// Dual-mode persistent storage:
//   • Production / Vercel: Upstash Redis (KV_REST_API_URL + KV_REST_API_TOKEN)
//   • Local dev fallback:   JSON file at .lab-access-data.json
//
// Switches automatically based on env presence so the same code runs in both.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { Redis } from "@upstash/redis";

const PENDING_TTL_SECONDS = 48 * 60 * 60;
const APPROVED_SET = "lab:approved";
const PENDING_PREFIX = "lab:pending:";

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

type Shape = {
  pending: Record<string, { email: string; createdAt: number }>;
  approved: string[];
};

const FILE = resolve(process.cwd(), ".lab-access-data.json");
const PENDING_TTL_MS = PENDING_TTL_SECONDS * 1000;

function fileLoad(): Shape {
  try {
    if (!existsSync(FILE)) return { pending: {}, approved: [] };
    const parsed = JSON.parse(readFileSync(FILE, "utf-8"));
    return {
      pending: parsed.pending ?? {},
      approved: Array.isArray(parsed.approved) ? parsed.approved : [],
    };
  } catch (e) {
    console.error("[lab-access/storage] file load failed:", e);
    return { pending: {}, approved: [] };
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

// ─── Public API (same signatures for both backends) ───────────────────────

export async function savePending(requestId: string, email: string): Promise<void> {
  const lower = email.toLowerCase();
  if (redis) {
    await redis.set(`${PENDING_PREFIX}${requestId}`, lower, { ex: PENDING_TTL_SECONDS });
  } else {
    const data = fileLoad();
    data.pending[requestId] = { email: lower, createdAt: Date.now() };
    fileSave(data);
  }
  vlog(`[lab-access] pending saved: ${lower} (${requestId})`);
}

export async function deletePending(requestId: string): Promise<void> {
  if (redis) {
    await redis.del(`${PENDING_PREFIX}${requestId}`);
  } else {
    const data = fileLoad();
    if (!(requestId in data.pending)) return;
    delete data.pending[requestId];
    fileSave(data);
  }
  vlog(`[lab-access] pending deleted: ${requestId}`);
}

export async function consumePending(requestId: string): Promise<string | null> {
  if (redis) {
    const email = await redis.get<string>(`${PENDING_PREFIX}${requestId}`);
    if (!email) return null;
    await redis.del(`${PENDING_PREFIX}${requestId}`);
    vlog(`[lab-access] pending consumed: ${email}`);
    return email;
  }
  const data = fileLoad();
  const entry = data.pending[requestId];
  if (!entry) return null;
  delete data.pending[requestId];
  if (Date.now() - entry.createdAt > PENDING_TTL_MS) {
    fileSave(data);
    return null;
  }
  fileSave(data);
  return entry.email;
}

export async function approve(email: string): Promise<void> {
  const lower = email.toLowerCase();
  if (redis) {
    await redis.sadd(APPROVED_SET, lower);
  } else {
    const data = fileLoad();
    if (!data.approved.includes(lower)) {
      data.approved.push(lower);
      fileSave(data);
    }
  }
  vlog(`[lab-access] approved: ${lower}`);
}

export async function isApproved(email: string): Promise<boolean> {
  const lower = email.toLowerCase();
  let result: boolean;
  if (redis) {
    result = (await redis.sismember(APPROVED_SET, lower)) === 1;
  } else {
    result = fileLoad().approved.includes(lower);
  }
  vlog(`[lab-access] isApproved(${lower}) = ${result}`);
  return result;
}

export async function revoke(email: string): Promise<boolean> {
  const lower = email.toLowerCase();
  if (redis) {
    const removed = await redis.srem(APPROVED_SET, lower);
    vlog(`[lab-access] revoked: ${lower} (removed=${removed})`);
    return removed === 1;
  }
  const data = fileLoad();
  const idx = data.approved.indexOf(lower);
  if (idx === -1) return false;
  data.approved.splice(idx, 1);
  fileSave(data);
  vlog(`[lab-access] revoked: ${lower}`);
  return true;
}
