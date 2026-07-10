/** Client-safe MAHDI config. Only NEXT_PUBLIC_* values are exposed here. */

export const mahdiContact = {
  whatsapp: process.env.NEXT_PUBLIC_MIA_WHATSAPP_NUMBER ?? "",
  email: process.env.NEXT_PUBLIC_MIA_CONTACT_EMAIL ?? "",
  privacyUrl: process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL || "/privacy",
};

export function whatsappLink(): string | null {
  const digits = mahdiContact.whatsapp.replace(/[^\d]/g, "");
  if (!digits) return null;
  const text = encodeURIComponent(
    "Hi Mia, I'd like some help planning a holiday."
  );
  return `https://wa.me/${digits}?text=${text}`;
}

export function emailLink(): string | null {
  if (!mahdiContact.email) return null;
  const subject = encodeURIComponent("Holiday enquiry via travelwithmia.co.uk");
  return `mailto:${mahdiContact.email}?subject=${subject}`;
}

export type QuickAction = {
  id: string;
  label: string;
  kind: "quote" | "discovery" | "chat" | "handover";
  seed?: string; // preset holiday style / opening message
};

export const quickActions: QuickAction[] = [
  { id: "find", label: "Find my next holiday", kind: "discovery" },
  { id: "quote", label: "Request a holiday quote", kind: "quote" },
  { id: "inspo", label: "Destination inspiration", kind: "discovery" },
  { id: "family", label: "Family holiday", kind: "quote", seed: "Family holiday" },
  { id: "cruise", label: "Cruise enquiry", kind: "quote", seed: "Cruise" },
  { id: "honeymoon", label: "Honeymoon", kind: "quote", seed: "Honeymoon" },
  { id: "city", label: "City break", kind: "quote", seed: "City break" },
  { id: "mia", label: "Speak to Mia", kind: "handover" },
];

export const WELCOME_MESSAGE = `Hi, I'm MAHDI 👋

My AI Holiday & Destination Intelligence.

I can help you explore destinations, organise your holiday requirements, answer general travel questions and send a personalised enquiry to Mia.

What would you like help with?`;

export const INSPIRATION_DISCLAIMER =
  "Suggestions are for inspiration only. Prices, availability, booking terms, travel requirements and applicable financial protection must be verified before booking.";

export const FOOTER_DISCLAIMER =
  "MAHDI is an AI assistant and may occasionally make mistakes. Important travel information should always be checked before you make a booking.";

export const CHANGING_INFO_NOTE =
  "Travel rules and supplier policies can change. Mia will verify the latest official information before a booking is confirmed. You should also check the relevant government, airline and supplier guidance.";
