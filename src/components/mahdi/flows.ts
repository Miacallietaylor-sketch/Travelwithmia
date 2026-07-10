import {
  BOARD_BASIS_OPTIONS,
  HOLIDAY_STYLE_OPTIONS,
} from "@/lib/leads/types";

export type Answers = Record<string, string>;

export type StepType =
  | "text"
  | "number"
  | "date"
  | "select"
  | "chips"
  | "consent";

export type QuoteStep = {
  key: string;
  prompt: string;
  type: StepType;
  options?: readonly string[];
  placeholder?: string;
  optional?: boolean;
  required?: boolean; // for consent
  skipIf?: (a: Answers) => boolean;
  validate?: (value: string, a: Answers) => string | null;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[+()\d\s-]{7,20}$/;

/** The 21-point structured enquiry, asked one question at a time. */
export const quoteSteps: QuoteStep[] = [
  {
    key: "destination",
    prompt: "Where would you like to go? A country, resort, or just say “open to ideas”.",
    type: "text",
    placeholder: "e.g. Tenerife, or open to ideas",
    validate: (v) => (v.trim().length < 2 ? "Tell me a destination or “open to ideas”." : null),
  },
  {
    key: "departureAirport",
    prompt: "Which airport or UK region would you prefer to fly from?",
    type: "text",
    placeholder: "e.g. Manchester, or London area",
  },
  {
    key: "departureDate",
    prompt: "Roughly when would you like to travel?",
    type: "text",
    placeholder: "e.g. 14 September 2026, or “October half-term”",
  },
  {
    key: "dateFlexibility",
    prompt: "How flexible are your dates?",
    type: "chips",
    options: ["Exact dates", "± a few days", "± a week", "Very flexible"],
  },
  {
    key: "nights",
    prompt: "How many nights are you thinking?",
    type: "text",
    placeholder: "e.g. 7 nights",
  },
  {
    key: "adults",
    prompt: "How many adults are travelling?",
    type: "number",
    validate: (v) => (Number(v) < 1 ? "At least one adult." : null),
  },
  {
    key: "children",
    prompt: "How many children are travelling? (Enter 0 if none.)",
    type: "number",
  },
  {
    key: "childrenAges",
    prompt: "What are the children's ages at the time of travel?",
    type: "text",
    placeholder: "e.g. 4 and 9",
    skipIf: (a) => Number(a.children || "0") === 0,
  },
  {
    key: "budget",
    prompt: "What's your approximate total budget? A rough figure is fine.",
    type: "text",
    placeholder: "e.g. £2,000 total, or £1,000pp",
  },
  {
    key: "boardBasis",
    prompt: "Which board basis would you prefer?",
    type: "select",
    options: BOARD_BASIS_OPTIONS,
  },
  {
    key: "holidayStyle",
    prompt: "What kind of holiday is it?",
    type: "select",
    options: HOLIDAY_STYLE_OPTIONS,
  },
  {
    key: "hotelPreference",
    prompt: "Any hotel star preference?",
    type: "chips",
    options: ["3 star", "4 star", "5 star", "No preference"],
  },
  {
    key: "requirements",
    prompt: "Any must-haves? (e.g. pool, kids' club, direct flights, sea view.)",
    type: "text",
    optional: true,
    placeholder: "Optional — anything that matters",
  },
  {
    key: "accessibilityRequirements",
    prompt: "Any accessibility requirements I should note for Mia?",
    type: "text",
    optional: true,
    placeholder: "Optional",
  },
  {
    key: "customerName",
    prompt: "Lovely. What's your full name?",
    type: "text",
    validate: (v) => (v.trim().length < 2 ? "Please enter your name." : null),
  },
  {
    key: "email",
    prompt: "What's the best email for Mia to reach you?",
    type: "text",
    placeholder: "you@example.com",
    validate: (v) => (emailRe.test(v.trim()) ? null : "Please enter a valid email address."),
  },
  {
    key: "phone",
    prompt: "And a phone number? (Optional — helps if WhatsApp or a call suits you.)",
    type: "text",
    optional: true,
    placeholder: "Optional",
    validate: (v) => (!v.trim() || phoneRe.test(v.trim()) ? null : "Please enter a valid phone number."),
  },
  {
    key: "preferredContactMethod",
    prompt: "How would you prefer Mia to contact you?",
    type: "chips",
    options: ["WhatsApp", "Email", "Phone", "No preference"],
  },
  {
    key: "bestContactTime",
    prompt: "When's the best time to reach you?",
    type: "chips",
    options: ["Morning", "Afternoon", "Evening", "Anytime"],
  },
];

export type DiscoveryQuestion = {
  key: string;
  prompt: string;
  type: "text" | "chips";
  options?: readonly string[];
  optional?: boolean;
};

export const discoveryQuestions: DiscoveryQuestion[] = [
  { key: "month", prompt: "When are you hoping to travel? A month or season is fine.", type: "text", placeholder: "e.g. next May" } as DiscoveryQuestion,
  { key: "budget", prompt: "Roughly what budget are we working with?", type: "text" } as DiscoveryQuestion,
  { key: "departure", prompt: "Where would you fly from?", type: "text" } as DiscoveryQuestion,
  { key: "travellers", prompt: "Who's travelling?", type: "chips", options: ["Just me", "Couple", "Family", "Group", "Friends"] },
  { key: "weather", prompt: "What weather are you after?", type: "chips", options: ["Warm", "Mild", "Cold / snow"] },
  { key: "vibe", prompt: "What's the vibe?", type: "chips", options: ["Beach", "City", "Cruise", "Adventure", "Mixed"] },
  { key: "haul", prompt: "How far are you happy to fly?", type: "chips", options: ["Short haul", "Long haul", "Open"] },
  { key: "pace", prompt: "Relaxed or activity-filled?", type: "chips", options: ["Relaxed", "Balanced", "Activity-filled"] },
  { key: "avoid", prompt: "Anywhere you'd like to avoid?", type: "text", optional: true, placeholder: "Optional" } as DiscoveryQuestion,
  { key: "important", prompt: "Anything else that's important to you?", type: "text", optional: true, placeholder: "Optional" } as DiscoveryQuestion,
];

export type Suggestion = {
  name: string;
  why: string;
  flightDuration: string;
  climate: string;
  bestFor: string;
  consideration: string;
  haul: "short" | "long";
  vibe: string[];
};

/** Curated, honest destination ideas. No invented prices. */
const catalogue: Suggestion[] = [
  { name: "Algarve, Portugal", why: "Reliable sunshine, golden beaches and easy short-haul access.", flightDuration: "~2h 45m from the UK", climate: "Warm, dry summers; mild spring and autumn", bestFor: "Families and couples wanting fuss-free beach time", consideration: "Peak July–August gets busy and pricier", haul: "short", vibe: ["Beach", "Mixed", "Relaxed", "Warm"] },
  { name: "Crete, Greece", why: "Big variety — beaches, history and great food on one island.", flightDuration: "~4h from the UK", climate: "Hot, dry summers; pleasant shoulder seasons", bestFor: "Families and couples who like a mix", consideration: "A larger island — a hire car helps you explore", haul: "short", vibe: ["Beach", "Mixed", "Relaxed", "Warm"] },
  { name: "Tenerife, Canary Islands", why: "Year-round warmth, so it works even in winter.", flightDuration: "~4h 30m from the UK", climate: "Mild-to-warm all year", bestFor: "Winter sun seekers and families", consideration: "The south is sunnier; the north is greener and cooler", haul: "short", vibe: ["Beach", "Relaxed", "Warm", "Mixed"] },
  { name: "Dubai, UAE", why: "Five-star value, big skylines and guaranteed winter sun.", flightDuration: "~7h from the UK", climate: "Very hot summers; warm, sunny winters", bestFor: "Luxury lovers and families in winter", consideration: "Midsummer is extremely hot for daytime sightseeing", haul: "long", vibe: ["City", "Beach", "Relaxed", "Warm"] },
  { name: "New York, USA", why: "The ultimate city break — iconic, walkable and endlessly busy.", flightDuration: "~8h from the UK", climate: "Cold winters, warm summers, crisp autumns", bestFor: "City-break fans and shoppers", consideration: "A go-go pace rather than a relaxing one", haul: "long", vibe: ["City", "Activity-filled", "Mild"] },
  { name: "Lapland, Finland", why: "Snow, huskies and the northern lights for a winter wonderland.", flightDuration: "~3h 30m from the UK", climate: "Cold, snowy winters", bestFor: "Families chasing snow and once-in-a-lifetime magic", consideration: "Short daylight hours in deep winter", haul: "short", vibe: ["Cold / snow", "Adventure", "Activity-filled"] },
  { name: "Costa Adeje cruise (W. Med)", why: "See several places while unpacking once.", flightDuration: "Varies by embarkation port", climate: "Warm Mediterranean summers", bestFor: "Cruise-curious travellers and multi-generational groups", consideration: "Port days can feel rushed — plan the excursions you care about", haul: "short", vibe: ["Cruise", "Mixed", "Relaxed", "Warm"] },
  { name: "Costa Rica", why: "Rainforests, wildlife and two coastlines for real adventure.", flightDuration: "~11h from the UK", climate: "Tropical; dry season Dec–Apr", bestFor: "Adventurers and nature lovers", consideration: "Longer travel time and internal transfers", haul: "long", vibe: ["Adventure", "Activity-filled", "Warm", "Mixed"] },
];

export function suggestDestinations(a: Answers): Suggestion[] {
  const vibe = a.vibe || "Mixed";
  const weather = a.weather || "Warm";
  const haul = a.haul || "Open";
  const scored = catalogue
    .map((s) => {
      let score = 0;
      if (s.vibe.includes(vibe)) score += 3;
      if (s.vibe.includes(weather)) score += 2;
      if (haul === "Short haul" && s.haul === "short") score += 2;
      if (haul === "Long haul" && s.haul === "long") score += 2;
      if (a.avoid && s.name.toLowerCase().includes(a.avoid.toLowerCase().trim())) score -= 10;
      return { s, score };
    })
    .sort((x, y) => y.score - x.score)
    .map((x) => x.s);
  return scored.slice(0, 4);
}
