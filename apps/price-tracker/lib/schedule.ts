/*
 * When to check a product's prices again (plan T3.9): every 12 hours, every 6 for products many
 * people watch or whose price just moved, with jitter so checks of one store don't bunch up, and
 * backing off after failures.
 */

export const hour = 3_600_000;

export type ScheduleInput = {
  /** How many people watch the product. */
  watchers: number;
  /** When its price or stock last changed. */
  lastChangeAt?: number;
  /** Failed checks in a row. */
  failures?: number;
  now: number;
  /** 0–1, for the jitter; `Math.random()` in production. */
  random: number;
};

export function nextCheckDelay({
  watchers,
  lastChangeAt,
  failures = 0,
  now,
  random,
}: ScheduleInput) {
  const busy = watchers >= 10 || (lastChangeAt !== undefined && now - lastChangeAt < 24 * hour);
  const base = busy ? 6 * hour : 12 * hour;
  // Failures back off: 1h, 2h, 4h… up to 48h.
  const delay = failures > 0 ? Math.min(hour * 2 ** (failures - 1), 48 * hour) : base;
  // ±10% jitter.
  return Math.round(delay * (0.9 + 0.2 * random));
}

/**
 * The earliest time a store may be fetched again, keeping at least `gapMs` between requests to
 * one domain (per-domain rate limit).
 */
export function nextDomainSlot(lastRequestAt: number | undefined, now: number, gapMs: number) {
  return lastRequestAt === undefined ? now : Math.max(now, lastRequestAt + gapMs);
}
