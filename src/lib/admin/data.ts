import "server-only";
import { getServiceSupabase } from "@/lib/supabase/server";

export type AdminQuote = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  holiday_type: string;
  destination: string;
  depart_date: string | null;
  return_date: string | null;
  adults: number;
  children: number;
  budget: string | null;
  notes: string | null;
  status: string;
  consent_marketing_email: boolean;
  consent_marketing_sms: boolean;
  consent_marketing_call: boolean;
  source: string | null;
  created_at: string;
};

export type AdminReview = {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  title: string | null;
  body: string | null;
  holiday_type: string | null;
  verified: boolean;
  created_at: string;
};

export type AdminSubscriber = {
  id: string;
  email: string;
  consent_at: string;
  source: string | null;
};

export type AdminComplaint = {
  id: string;
  name: string;
  email: string;
  detail: string;
  status: string;
  created_at: string;
};

// ── Demo data (used when Supabase isn't configured) ──
const demoQuotes: AdminQuote[] = [
  {
    id: "Q-1042",
    name: "Sarah Whitfield",
    email: "sarah.w@example.com",
    phone: "+44 7700 900123",
    holiday_type: "honeymoons",
    destination: "Maldives",
    depart_date: "2026-11-14",
    return_date: "2026-11-21",
    adults: 2,
    children: 0,
    budget: "£5,000 total",
    notes: "Overwater villa, celebrating our wedding.",
    status: "quoted",
    consent_marketing_email: true,
    consent_marketing_sms: false,
    consent_marketing_call: false,
    source: "quote-form",
    created_at: "2026-07-08T09:12:00Z",
  },
  {
    id: "Q-1041",
    name: "The Okafor family",
    email: "okafor@example.com",
    phone: "+44 7700 900456",
    holiday_type: "family",
    destination: "Florida",
    depart_date: "2026-08-02",
    return_date: "2026-08-16",
    adults: 2,
    children: 2,
    budget: "£6,500 total",
    notes: "Two kids (6, 9). Disney + a few beach days.",
    status: "contacted",
    consent_marketing_email: true,
    consent_marketing_sms: true,
    consent_marketing_call: false,
    source: "quote-form",
    created_at: "2026-07-09T14:40:00Z",
  },
  {
    id: "Q-1040",
    name: "James Reid",
    email: "j.reid@example.com",
    phone: null,
    holiday_type: "multi-centre",
    destination: "Japan + Singapore",
    depart_date: "2026-10-05",
    return_date: "2026-10-22",
    adults: 2,
    children: 0,
    budget: "£8,000 total",
    notes: "Tokyo, Kyoto then Singapore stopover.",
    status: "new",
    consent_marketing_email: false,
    consent_marketing_sms: false,
    consent_marketing_call: true,
    source: "quote-form",
    created_at: "2026-07-10T07:55:00Z",
  },
];

const demoReviews: AdminReview[] = [
  {
    id: "r-pending-1",
    name: "Chloe Bennett",
    location: "Leeds",
    rating: 5,
    title: "Faultless from start to finish",
    body: "Just back from Santorini — Mia thought of everything. Awaiting verification.",
    holiday_type: "Honeymoons",
    verified: false,
    created_at: "2026-07-09T18:00:00Z",
  },
  {
    id: "r1",
    name: "Sarah & Tom",
    location: "Leeds",
    rating: 5,
    title: "She thought of everything",
    body: "Mia planned our honeymoon to the Maldives and it was flawless.",
    holiday_type: "Honeymoons",
    verified: true,
    created_at: "2026-05-18T10:00:00Z",
  },
];

const demoSubscribers: AdminSubscriber[] = [
  { id: "s1", email: "traveller1@example.com", consent_at: "2026-07-01T10:00:00Z", source: "home" },
  { id: "s2", email: "traveller2@example.com", consent_at: "2026-07-03T12:30:00Z", source: "journal" },
  { id: "s3", email: "traveller3@example.com", consent_at: "2026-07-06T09:15:00Z", source: "about" },
];

const demoComplaints: AdminComplaint[] = [
  {
    id: "c1",
    name: "A. Client",
    email: "client@example.com",
    detail: "Hotel room wasn't ready on arrival — resolved with compensation.",
    status: "resolved",
    created_at: "2026-06-20T16:00:00Z",
  },
];

export async function adminData() {
  const supabase = getServiceSupabase();
  if (!supabase) {
    return {
      live: false,
      quotes: demoQuotes,
      reviews: demoReviews,
      subscribers: demoSubscribers,
      complaints: demoComplaints,
    };
  }

  const [q, r, s, c] = await Promise.all([
    supabase.from("quotes").select("*").order("created_at", { ascending: false }).limit(200),
    supabase.from("reviews").select("*").order("created_at", { ascending: false }).limit(200),
    supabase.from("newsletter_subscribers").select("*").order("consent_at", { ascending: false }).limit(200),
    supabase.from("complaints_log").select("*").order("created_at", { ascending: false }).limit(200),
  ]);

  return {
    live: true,
    quotes: (q.data ?? []) as AdminQuote[],
    reviews: (r.data ?? []) as AdminReview[],
    subscribers: (s.data ?? []) as AdminSubscriber[],
    complaints: (c.data ?? []) as AdminComplaint[],
  };
}
