// Best-effort, in-memory rate limiting. Serverless instances don't share
// memory, so this throttles bursts from a single client rather than enforcing
// a hard global limit.

const buckets = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();

  if (buckets.size > 5000) {
    buckets.forEach((bucket, k) => {
      if (bucket.resetAt <= now) buckets.delete(k);
    });
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  bucket.count += 1;
  return bucket.count > limit;
}

export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
