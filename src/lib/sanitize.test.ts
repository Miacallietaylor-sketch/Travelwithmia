import { describe, it, expect } from "vitest";
import { sanitizeText, escapeHtml } from "./sanitize";

describe("sanitizeText", () => {
  it("strips HTML tags", () => {
    expect(sanitizeText("<script>alert(1)</script>hello")).toBe("alert(1)hello");
    expect(sanitizeText("<b>bold</b>")).toBe("bold");
  });
  it("trims and caps length", () => {
    expect(sanitizeText("  hi  ")).toBe("hi");
    expect(sanitizeText("a".repeat(50), 10)).toHaveLength(10);
  });
  it("returns empty string for non-strings", () => {
    expect(sanitizeText(null)).toBe("");
    expect(sanitizeText(42)).toBe("");
  });
});

describe("escapeHtml", () => {
  it("neutralises XSS payloads", () => {
    expect(escapeHtml('<img src=x onerror="alert(1)">')).toBe(
      "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;"
    );
    expect(escapeHtml("a & b")).toBe("a &amp; b");
  });
});
