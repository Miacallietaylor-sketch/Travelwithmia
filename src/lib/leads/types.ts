export const LEAD_SOURCE = "MAHDI Website Concierge" as const;

export const LEAD_STATUSES = [
  "New",
  "Contact required",
  "Quote in progress",
  "Quote sent",
  "Booked",
  "Closed",
  "Spam",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type ContactMethod = "WhatsApp" | "Email" | "Phone" | "No preference";

export type Lead = {
  id: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
  source: string;
  enquiryType: string;
  destination: string;
  departureAirport: string;
  departureDate: string;
  dateFlexibility: string;
  nights: string;
  adults: number;
  children: number;
  childrenAges: string;
  budget: string;
  boardBasis: string;
  holidayStyle: string;
  hotelPreference: string;
  requirements: string;
  accessibilityRequirements: string;
  customerName: string;
  email: string;
  phone: string;
  preferredContactMethod: ContactMethod;
  bestContactTime: string;
  enquiryConsent: boolean;
  enquiryConsentTimestamp: string | null;
  marketingConsent: boolean;
  marketingConsentTimestamp: string | null;
  conversationSummary: string;
  status: LeadStatus;
  internalNotes: string;
  assignedTo: string;
};

export const BOARD_BASIS_OPTIONS = [
  "Room only",
  "Bed and breakfast",
  "Half board",
  "Full board",
  "All inclusive",
  "Flexible",
] as const;

export const HOLIDAY_STYLE_OPTIONS = [
  "Beach holiday",
  "City break",
  "Luxury escape",
  "Family holiday",
  "Adults only",
  "Cruise",
  "Adventure",
  "Honeymoon",
  "Group holiday",
  "Multi-centre trip",
  "Disney holiday",
  "Open to suggestions",
] as const;
