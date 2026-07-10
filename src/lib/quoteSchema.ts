import { z } from "zod";
import { holidayTypes } from "@/data/holidayTypes";

const holidaySlugs = holidayTypes.map((t) => t.slug) as [string, ...string[]];

/**
 * Quote submission schema. Mirrors the `quotes` table.
 * Consent is intentionally granular: `agreePrivacy` is REQUIRED; each
 * marketing channel is a SEPARATE optional opt-in — never bundled.
 */
export const quoteSchema = z.object({
  // Step 1
  holidayType: z.enum(holidaySlugs, {
    errorMap: () => ({ message: "Please choose a holiday type." }),
  }),
  // Step 2
  destination: z
    .string()
    .trim()
    .min(2, "Please tell me where you'd like to go.")
    .max(120),
  departDate: z.string().trim().optional().or(z.literal("")),
  returnDate: z.string().trim().optional().or(z.literal("")),
  flexibleDates: z.boolean().optional().default(false),
  adults: z.coerce.number().int().min(1, "At least one adult.").max(20),
  children: z.coerce.number().int().min(0).max(20).default(0),
  // Step 3
  budget: z.string().trim().min(1, "Please give a rough budget."),
  name: z.string().trim().min(2, "Please tell me your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),

  // Consent — separate, unticked by default
  agreePrivacy: z.literal(true, {
    errorMap: () => ({
      message: "Please agree to the Privacy Policy so I can respond.",
    }),
  }),
  marketingEmail: z.boolean().optional().default(false),
  marketingSms: z.boolean().optional().default(false),
  marketingCall: z.boolean().optional().default(false),

  // Attribution (hidden)
  source: z.string().optional().default("website"),
  utmSource: z.string().optional().default(""),
  utmMedium: z.string().optional().default(""),
  utmCampaign: z.string().optional().default(""),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
