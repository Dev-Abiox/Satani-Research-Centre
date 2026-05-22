const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX = 3;
const hits = new Map<string, number[]>();

// Rate limit is keyed per tool + IP so a burst of requests on one tool does
// not lock the same visitor out of the others.
export function isRateLimited(tool: string, ip: string): boolean {
  const key = `${tool}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX) return true;
  recent.push(now);
  hits.set(key, recent);
  return false;
}
