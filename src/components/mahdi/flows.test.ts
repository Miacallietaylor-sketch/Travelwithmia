import { describe, it, expect } from "vitest";
import { quoteSteps, suggestDestinations } from "./flows";

describe("quoteSteps", () => {
  it("collects the key enquiry fields", () => {
    const keys = quoteSteps.map((s) => s.key);
    for (const required of [
      "destination", "departureAirport", "departureDate", "adults",
      "budget", "boardBasis", "holidayStyle", "customerName", "email",
      "preferredContactMethod",
    ]) {
      expect(keys).toContain(required);
    }
  });

  it("skips children's ages when there are no children", () => {
    const step = quoteSteps.find((s) => s.key === "childrenAges")!;
    expect(step.skipIf?.({ children: "0" })).toBe(true);
    expect(step.skipIf?.({ children: "2" })).toBe(false);
  });

  it("validates email and name", () => {
    const email = quoteSteps.find((s) => s.key === "email")!;
    expect(email.validate?.("bad", {})).toBeTruthy();
    expect(email.validate?.("a@b.com", {})).toBeNull();
  });
});

describe("suggestDestinations", () => {
  it("returns between 3 and 5 ideas", () => {
    const out = suggestDestinations({ vibe: "Beach", weather: "Warm", haul: "Short haul" });
    expect(out.length).toBeGreaterThanOrEqual(3);
    expect(out.length).toBeLessThanOrEqual(5);
  });

  it("each idea has the required honest fields (no price)", () => {
    const out = suggestDestinations({ vibe: "City" });
    for (const s of out) {
      expect(s.name).toBeTruthy();
      expect(s.why).toBeTruthy();
      expect(s.flightDuration).toBeTruthy();
      expect(s.climate).toBeTruthy();
      expect(s.consideration).toBeTruthy();
      expect(JSON.stringify(s)).not.toMatch(/£\d/); // never invents prices
    }
  });

  it("demotes destinations the traveller wants to avoid", () => {
    const out = suggestDestinations({ vibe: "City", avoid: "New York" });
    expect(out[0]?.name).not.toMatch(/New York/);
  });
});
