const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX = 3;
const hits = new Map<string, number[]>();

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}
