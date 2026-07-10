import { z } from "zod";

const ukPhone = /^[+()\d\s-]{7,20}$/;

/**
 * Validation for a MAHDI lead submission. Mirrors the Lead type. Consent to
 * the enquiry is REQUIRED; marketing consent is a SEPARATE optional flag that
 * must default to false (never auto-subscribe).
 */
export const leadSchema = z.object({
  enquiryType: z.string().trim().max(60).default("Holiday enquiry"),
  destination: z.string().trim().max(160).default(""),
  departureAirport: z.string().trim().max(120).default(""),
  departureDate: z.string().trim().max(60).default(""),
  dateFlexibility: z.string().trim().max(60).default(""),
  nights: z.string().trim().max(40).default(""),
  adults: z.coerce.number().int().min(1).max(30).default(2),
  children: z.coerce.number().int().min(0).max(30).default(0),
  childrenAges: z.string().trim().max(120).default(""),
  budget: z.string().trim().max(80).default(""),
  boardBasis: z.string().trim().max(60).default(""),
  holidayStyle: z.string().trim().max(60).default(""),
  hotelPreference: z.string().trim().max(60).default(""),
  requirements: z.string().trim().max(1200).default(""),
  accessibilityRequirements: z.string().trim().max(1200).default(""),
  customerName: z.string().trim().min(2, "Please give your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(160),
  phone: z
    .string()
    .trim()
    .regex(ukPhone, "Please enter a valid phone number.")
    .max(40)
    .optional()
    .or(z.literal("")),
  preferredContactMethod: z
    .enum(["WhatsApp", "Email", "Phone", "No preference"])
    .default("Email"),
  bestContactTime: z.string().trim().max(80).default(""),

  // Consent — enquiry required, marketing separate & optional (default false)
  enquiryConsent: z.literal(true, {
    errorMap: () => ({ message: "Please agree so Mia can respond to your enquiry." }),
  }),
  marketingConsent: z.boolean().default(false),

  conversationSummary: z.string().trim().max(4000).default(""),

  // Anti-spam honeypot — real users never fill this. The route silently
  // accepts (fake success) when it's non-empty, so bots get no useful signal.
  company: z.string().max(200).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;
