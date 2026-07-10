import { describe, it, expect } from "vitest";
import { miaNotificationEmail, customerConfirmationEmail } from "./templates";
import type { NewLead } from "@/lib/leads/store";

const lead: NewLead = {
  enquiryType: "Honeymoon",
  destination: "Maldives",
  departureAirport: "Manchester",
  departureDate: "14 Sep 2026",
  dateFlexibility: "± a week",
  nights: "7",
  adults: 2,
  children: 0,
  childrenAges: "",
  budget: "£4,000",
  boardBasis: "All inclusive",
  holidayStyle: "Honeymoon",
  hotelPreference: "5 star",
  requirements: "Overwater villa",
  accessibilityRequirements: "",
  customerName: '<script>alert(1)</script> Jo',
  email: "jo@example.com",
  phone: "+44 7700 900123",
  preferredContactMethod: "WhatsApp",
  bestContactTime: "Evening",
  enquiryConsent: true,
  marketingConsent: false,
  conversationSummary: "Honeymoon to the Maldives, 7 nights, all inclusive.",
};

describe("miaNotificationEmail", () => {
  it("uses the destination in the subject and includes the reference", () => {
    const msg = miaNotificationEmail(lead, "TWM-MAHDI-2026-000009");
    expect(msg.subject).toContain("Maldives");
    expect(msg.html).toContain("TWM-MAHDI-2026-000009");
    expect(msg.replyTo).toBe("jo@example.com");
  });
  it("escapes HTML in customer-supplied fields (no XSS)", () => {
    const msg = miaNotificationEmail(lead, "TWM-MAHDI-2026-000009");
    expect(msg.html).not.toContain("<script>alert(1)</script>");
    expect(msg.html).toContain("&lt;script&gt;");
  });
});

describe("customerConfirmationEmail", () => {
  it("has the correct subject and states no booking is made", () => {
    const msg = customerConfirmationEmail(lead, "TWM-MAHDI-2026-000009");
    expect(msg.subject).toBe("We've received your Travel With Mia enquiry");
    expect(msg.text.toLowerCase()).toContain("no booking has been made");
    expect(msg.to).toBe("jo@example.com");
  });
});
