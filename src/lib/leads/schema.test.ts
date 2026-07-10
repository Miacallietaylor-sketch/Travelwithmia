import { describe, it, expect } from "vitest";
import { leadSchema } from "./schema";

const base = {
  customerName: "Sam Traveller",
  email: "sam@example.com",
  enquiryConsent: true,
};

describe("leadSchema", () => {
  it("accepts a minimal valid enquiry and defaults marketing to false", () => {
    const parsed = leadSchema.parse(base);
    expect(parsed.marketingConsent).toBe(false);
    expect(parsed.adults).toBe(2);
    expect(parsed.preferredContactMethod).toBe("Email");
  });

  it("requires enquiry consent to be true", () => {
    const r = leadSchema.safeParse({ ...base, enquiryConsent: false });
    expect(r.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const r = leadSchema.safeParse({ ...base, email: "not-an-email" });
    expect(r.success).toBe(false);
  });

  it("rejects an invalid phone but allows empty", () => {
    expect(leadSchema.safeParse({ ...base, phone: "abc" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...base, phone: "" }).success).toBe(true);
    expect(leadSchema.safeParse({ ...base, phone: "+44 7700 900123" }).success).toBe(true);
  });

  it("keeps marketing consent independent of enquiry consent", () => {
    const parsed = leadSchema.parse({ ...base, marketingConsent: true });
    expect(parsed.marketingConsent).toBe(true);
    expect(parsed.enquiryConsent).toBe(true);
  });

  it("allows the honeypot field so the route can silently absorb bots", () => {
    const r = leadSchema.safeParse({ ...base, company: "bot" });
    expect(r.success).toBe(true);
    // The route treats a non-empty `company` as spam and fakes success.
    if (r.success) expect(r.data.company).toBe("bot");
  });
});
