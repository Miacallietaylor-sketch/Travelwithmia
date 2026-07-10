/**
 * Central site configuration.
 *
 * ⚠️  PLACEHOLDERS — DO NOT SHIP AS-IS.
 * Values wrapped like「[PLACEHOLDER ...]」are NOT real. In particular the
 * ATOL and ABTA numbers, company number and registered address MUST be
 * replaced with the trader's genuine details before going live. Publishing
 * a fabricated ATOL/ABTA number is a false financial-protection claim and
 * is unlawful in the UK.
 */

export const site = {
  name: "Travel With Mia",
  tagline: "Tell me where. I'll do the rest.",
  description:
    "Independent UK travel consultant. One person, one point of contact — Mia personally plans your holiday, from first idea to final itinerary.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  consultant: "Mia",
  // ── Trader identity (COMPANIES ACT / CONSUMER LAW) ──
  legal: {
    tradingName: "Travel With Mia",
    // ⚠️ PLACEHOLDER — replace with the real registered legal entity.
    registeredName: "[PLACEHOLDER — Registered Company Name Ltd]",
    // ⚠️ PLACEHOLDER — replace with the real Companies House number.
    companyNumber: "[PLACEHOLDER — Company No. 00000000]",
    // ⚠️ PLACEHOLDER — replace with the real registered address.
    registeredAddress:
      "[PLACEHOLDER — Registered address, Town, Postcode, United Kingdom]",
    // ⚠️ PLACEHOLDER — replace with the real ATOL number. NEVER invent one.
    atolNumber: "[PLACEHOLDER — ATOL No. 00000]",
    // ⚠️ PLACEHOLDER — replace with the real ABTA number. NEVER invent one.
    abtaNumber: "[PLACEHOLDER — ABTA No. X0000]",
    vatNumber: "[PLACEHOLDER — VAT No. GB000000000]",
  },
  contact: {
    // ⚠️ PLACEHOLDER contact details.
    email: "[PLACEHOLDER — hello@travelwithmia.co.uk]",
    phone: "[PLACEHOLDER — +44 (0)0000 000000]",
    whatsapp: "[PLACEHOLDER — +44 (0)0000 000000]",
    hours: "Mon–Fri 9am–6pm, Sat 10am–2pm (UK time)",
  },
  social: {
    instagram: "https://instagram.com/", // ⚠️ PLACEHOLDER handle
    facebook: "https://facebook.com/", // ⚠️ PLACEHOLDER handle
    tiktok: "https://tiktok.com/", // ⚠️ PLACEHOLDER handle
  },
} as const;

export type SiteConfig = typeof site;
