import { headers } from "next/headers";

interface RateLimitRecord {
  timestamps: number[];
}

// In-memory sliding log rate limiter
const store = new Map<string, RateLimitRecord>();

// Clean up expired entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupExpired(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, record] of store.entries()) {
    const validTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);
    if (validTimestamps.length === 0) {
      store.delete(key);
    } else {
      store.set(key, { timestamps: validTimestamps });
    }
  }
}

export interface RateLimitOptions {
  keyPrefix?: string;
  limit: number;      // Maximum requests allowed within windowMs
  windowMs: number;   // Time window in milliseconds
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetInSeconds: number;
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions
): RateLimitResult {
  const { keyPrefix = "rl", limit, windowMs } = options;
  const key = `${keyPrefix}:${identifier}`;
  const now = Date.now();

  cleanupExpired(windowMs);

  const record = store.get(key) || { timestamps: [] };
  // Keep only timestamps within window
  const validTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (validTimestamps.length >= limit) {
    const oldestTimestamp = validTimestamps[0];
    const resetInSeconds = Math.max(1, Math.ceil((oldestTimestamp + windowMs - now) / 1000));
    return {
      success: false,
      remaining: 0,
      resetInSeconds,
    };
  }

  validTimestamps.push(now);
  store.set(key, { timestamps: validTimestamps });

  return {
    success: true,
    remaining: limit - validTimestamps.length,
    resetInSeconds: Math.ceil(windowMs / 1000),
  };
}

export async function getClientIp(): Promise<string> {
  try {
    const headersList = await headers();
    const forwarded = headersList.get("x-forwarded-for");
    if (forwarded) {
      const firstIp = forwarded.split(",")[0].trim();
      if (firstIp) return firstIp;
    }
    const realIp = headersList.get("x-real-ip");
    if (realIp?.trim()) {
      return realIp.trim();
    }
    const cfConnectingIp = headersList.get("cf-connecting-ip");
    if (cfConnectingIp?.trim()) {
      return cfConnectingIp.trim();
    }
  } catch {
    // If called outside an active request context
  }
  return "127.0.0.1";
}
