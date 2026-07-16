/**
 * Central site configuration.
 *
 * Real business details are read from environment variables so the site can go
 * live cleanly. Anything not yet provided is left EMPTY and the UI renders an
 * honest, professional fallback instead of a fake value.
 *
 * ⚠️ Legal note: never invent an ATOL/ABTA number — publishing a fabricated
 * financial-protection number is unlawful in the UK. Leave the env var unset
 * until you have the genuine number; the footer shows honest wording meanwhile.
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  // Auto-detect the deployment URL on Vercel so SEO/OG/sitemap are correct
  // even before a custom domain or NEXT_PUBLIC_SITE_URL is configured.
  const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (prod) return `https://${prod}`;
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

const env = (key: string) => {
  const v = process.env[key];
  return v && v.trim() ? v.trim() : "";
};

export const site = {
  name: "Travel With Mia",
  tagline: "Tell me where. I'll do the rest.",
  description:
    "Independent UK travel consultant. One person, one point of contact — Mia personally plans your holiday, from first idea to final itinerary.",
  url: resolveSiteUrl(),
  consultant: "Mia",
  // ── Trader identity (Companies Act / consumer law) ──
  // Empty unless provided; the UI falls back to honest wording.
  legal: {
    tradingName: "Travel With Mia",
    registeredName: env("COMPANY_LEGAL_NAME"),
    companyNumber: env("COMPANY_NUMBER"),
    registeredAddress: env("COMPANY_ADDRESS"),
    atolNumber: env("ATOL_NUMBER"),
    abtaNumber: env("ABTA_NUMBER"),
    vatNumber: env("VAT_NUMBER"),
  },
  contact: {
    // Sensible default on the real domain; override with NEXT_PUBLIC_CONTACT_EMAIL.
    email: env("NEXT_PUBLIC_CONTACT_EMAIL") || "hello@travelwithmia.co.uk",
    phone: env("NEXT_PUBLIC_CONTACT_PHONE"),
    whatsapp: env("NEXT_PUBLIC_MIA_WHATSAPP_NUMBER"),
    hours: "Mon–Fri 9am–6pm, Sat 10am–2pm (UK time)",
  },
  social: {
    instagram: env("NEXT_PUBLIC_INSTAGRAM_URL"),
    facebook: env("NEXT_PUBLIC_FACEBOOK_URL"),
    tiktok: env("NEXT_PUBLIC_TIKTOK_URL"),
  },
} as const;

/** True when a config value is genuinely set (not empty). */
export function has(value: string | undefined | null): value is string {
  return !!value && value.trim().length > 0;
}

export type SiteConfig = typeof site;
