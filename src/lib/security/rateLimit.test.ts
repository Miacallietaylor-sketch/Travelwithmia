import { describe, it, expect } from "vitest";
import { rateLimit } from "./rateLimit";

describe("rateLimit", () => {
  it("allows up to the limit then blocks", () => {
    const key = `test-${Math.random()}`;
    expect(rateLimit(key, 3, 1000).ok).toBe(true);
    expect(rateLimit(key, 3, 1000).ok).toBe(true);
    expect(rateLimit(key, 3, 1000).ok).toBe(true);
    const blocked = rateLimit(key, 3, 1000);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it("tracks remaining count", () => {
    const key = `test-${Math.random()}`;
    expect(rateLimit(key, 2, 1000).remaining).toBe(1);
    expect(rateLimit(key, 2, 1000).remaining).toBe(0);
  });

  it("resets after the window elapses", async () => {
    const key = `test-${Math.random()}`;
    expect(rateLimit(key, 1, 20).ok).toBe(true);
    expect(rateLimit(key, 1, 20).ok).toBe(false);
    await new Promise((r) => setTimeout(r, 30));
    expect(rateLimit(key, 1, 20).ok).toBe(true);
  });
});
