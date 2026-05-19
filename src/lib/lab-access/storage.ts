// File-based storage so state survives Next.js HMR and dev restarts.
// For production: swap this module for Vercel KV (same function signatures).

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";

type Shape = {
  pending: Record<string, { email: string; createdAt: number }>;
  approved: string[];
};

const FILE = resolve(process.cwd(), ".lab-access-data.json");
const PENDING_TTL_MS = 48 * 60 * 60 * 1000; // 48h

// Only log PII (emails) in development. Production logs are searchable
// and PII shouldn't end up in them.
const VERBOSE = process.env.NODE_ENV !== "production";
function vlog(...args: unknown[]): void {
  if (VERBOSE) console.log(...args);
}

function load(): Shape {
  try {
    if (!existsSync(FILE)) return { pending: {}, approved: [] };
    const raw = readFileSync(FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return {
      pending: parsed.pending ?? {},
      approved: Array.isArray(parsed.approved) ? parsed.approved : [],
    };
  } catch (e) {
    console.error("[lab-access/storage] load failed, resetting:", e);
    return { pending: {}, approved: [] };
  }
}

function save(data: Shape): void {
  try {
    mkdirSync(dirname(FILE), { recursive: true });
    writeFileSync(FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("[lab-access/storage] save failed:", e);
  }
}

export function savePending(requestId: string, email: string): void {
  const data = load();
  data.pending[requestId] = { email: email.toLowerCase(), createdAt: Date.now() };
  save(data);
  vlog(`[lab-access] pending saved: ${email} (${requestId})`);
}

export function deletePending(requestId: string): void {
  const data = load();
  if (!(requestId in data.pending)) return;
  delete data.pending[requestId];
  save(data);
  vlog(`[lab-access] pending deleted: ${requestId}`);
}

export function consumePending(requestId: string): string | null {
  const data = load();
  const entry = data.pending[requestId];
  if (!entry) return null;
  delete data.pending[requestId];
  if (Date.now() - entry.createdAt > PENDING_TTL_MS) {
    save(data);
    vlog(`[lab-access] pending expired: ${requestId}`);
    return null;
  }
  save(data);
  vlog(`[lab-access] pending consumed: ${entry.email}`);
  return entry.email;
}

export function approve(email: string): void {
  const data = load();
  const lower = email.toLowerCase();
  if (!data.approved.includes(lower)) {
    data.approved.push(lower);
    save(data);
  }
  vlog(`[lab-access] approved: ${lower}`);
}

export function isApproved(email: string): boolean {
  const data = load();
  const lower = email.toLowerCase();
  const result = data.approved.includes(lower);
  vlog(`[lab-access] isApproved(${lower}) = ${result}`);
  return result;
}

export function revoke(email: string): boolean {
  const data = load();
  const lower = email.toLowerCase();
  const idx = data.approved.indexOf(lower);
  if (idx === -1) return false;
  data.approved.splice(idx, 1);
  save(data);
  vlog(`[lab-access] revoked: ${lower}`);
  return true;
}
