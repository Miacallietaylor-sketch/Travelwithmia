import { describe, it, expect } from "vitest";
import { formatReference } from "./reference";

describe("formatReference", () => {
  it("zero-pads to six digits and includes the year", () => {
    expect(formatReference(1, 2026)).toBe("TWM-MAHDI-2026-000001");
    expect(formatReference(42, 2026)).toBe("TWM-MAHDI-2026-000042");
    expect(formatReference(123456, 2026)).toBe("TWM-MAHDI-2026-123456");
  });

  it("uses the current year by default", () => {
    const ref = formatReference(7);
    expect(ref).toMatch(/^TWM-MAHDI-\d{4}-000007$/);
  });
});
