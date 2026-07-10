import "server-only";
import { getServiceSupabase } from "@/lib/supabase/server";
import { formatReference } from "./reference";
import { LEAD_SOURCE, type Lead, type LeadStatus } from "./types";
import type { LeadInput } from "./schema";

export type NewLead = Omit<LeadInput, "company">;

export type SavedLead = { id: string; reference: string; persisted: boolean };

/** Replaceable persistence interface — swap Supabase for any backend. */
export interface LeadStore {
  create(input: NewLead): Promise<SavedLead>;
  list(): Promise<Lead[]>;
  updateStatus(id: string, status: LeadStatus): Promise<void>;
  updateNotes(id: string, notes: string): Promise<void>;
  anonymise(id: string): Promise<void>;
}

const snake = (input: NewLead, now: string) => ({
  source: LEAD_SOURCE,
  enquiry_type: input.enquiryType,
  destination: input.destination,
  departure_airport: input.departureAirport,
  departure_date: input.departureDate,
  date_flexibility: input.dateFlexibility,
  nights: input.nights,
  adults: input.adults,
  children: input.children,
  children_ages: input.childrenAges,
  budget: input.budget,
  board_basis: input.boardBasis,
  holiday_style: input.holidayStyle,
  hotel_preference: input.hotelPreference,
  requirements: input.requirements,
  accessibility_requirements: input.accessibilityRequirements,
  customer_name: input.customerName,
  email: input.email,
  phone: input.phone || null,
  preferred_contact_method: input.preferredContactMethod,
  best_contact_time: input.bestContactTime,
  enquiry_consent: input.enquiryConsent,
  enquiry_consent_timestamp: input.enquiryConsent ? now : null,
  marketing_consent: input.marketingConsent,
  marketing_consent_timestamp: input.marketingConsent ? now : null,
  conversation_summary: input.conversationSummary,
  status: "New" as LeadStatus,
  internal_notes: "",
  assigned_to: "",
});

function fromRow(r: any): Lead {
  return {
    id: r.id,
    reference: r.reference,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
    source: r.source,
    enquiryType: r.enquiry_type,
    destination: r.destination,
    departureAirport: r.departure_airport,
    departureDate: r.departure_date,
    dateFlexibility: r.date_flexibility,
    nights: r.nights,
    adults: r.adults,
    children: r.children,
    childrenAges: r.children_ages,
    budget: r.budget,
    boardBasis: r.board_basis,
    holidayStyle: r.holiday_style,
    hotelPreference: r.hotel_preference,
    requirements: r.requirements,
    accessibilityRequirements: r.accessibility_requirements,
    customerName: r.customer_name,
    email: r.email,
    phone: r.phone ?? "",
    preferredContactMethod: r.preferred_contact_method,
    bestContactTime: r.best_contact_time,
    enquiryConsent: r.enquiry_consent,
    enquiryConsentTimestamp: r.enquiry_consent_timestamp,
    marketingConsent: r.marketing_consent,
    marketingConsentTimestamp: r.marketing_consent_timestamp,
    conversationSummary: r.conversation_summary,
    status: r.status,
    internalNotes: r.internal_notes ?? "",
    assignedTo: r.assigned_to ?? "",
  };
}
class SupabaseLeadStore implements LeadStore {
  constructor(private db: any) {}

  async create(input: NewLead): Promise<SavedLead> {
    const now = new Date().toISOString();
    const { data, error } = await this.db
      .from("mahdi_leads")
      .insert(snake(input, now))
      .select("id, seq")
      .single();
    if (error) throw new Error(error.message);
    const reference = formatReference(Number(data.seq));
    await this.db.from("mahdi_leads").update({ reference }).eq("id", data.id);
    return { id: data.id, reference, persisted: true };
  }

  async list(): Promise<Lead[]> {
    const { data, error } = await this.db
      .from("mahdi_leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return (data ?? []).map(fromRow);
  }

  async updateStatus(id: string, status: LeadStatus) {
    await this.db
      .from("mahdi_leads")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
  }

  async updateNotes(id: string, notes: string) {
    await this.db
      .from("mahdi_leads")
      .update({ internal_notes: notes, updated_at: new Date().toISOString() })
      .eq("id", id);
  }

  async anonymise(id: string) {
    await this.db
      .from("mahdi_leads")
      .update({
        customer_name: "[erased]",
        email: "erased@example.com",
        phone: null,
        requirements: "[erased]",
        accessibility_requirements: "[erased]",
        conversation_summary: "[erased]",
        internal_notes: "[erased on request]",
        status: "Closed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
  }
}

/** In-memory fallback so the flow works end-to-end with no database. */
class MemoryLeadStore implements LeadStore {
  private items: Lead[] = [];
  private seq = 0;

  async create(input: NewLead): Promise<SavedLead> {
    this.seq += 1;
    const now = new Date().toISOString();
    const id = `mem-${this.seq}`;
    const reference = formatReference(this.seq);
    const row = snake(input, now);
    this.items.unshift(
      fromRow({ id, reference, created_at: now, updated_at: now, ...row })
    );
    return { id, reference, persisted: false };
  }
  async list() {
    return this.items;
  }
  async updateStatus(id: string, status: LeadStatus) {
    const l = this.items.find((x) => x.id === id);
    if (l) l.status = status;
  }
  async updateNotes(id: string, notes: string) {
    const l = this.items.find((x) => x.id === id);
    if (l) l.internalNotes = notes;
  }
  async anonymise(id: string) {
    const l = this.items.find((x) => x.id === id);
    if (l) {
      l.customerName = "[erased]";
      l.email = "erased@example.com";
      l.phone = "";
      l.requirements = "[erased]";
      l.conversationSummary = "[erased]";
      l.status = "Closed";
    }
  }
}

// A single shared memory store so demo leads persist within the running process.
const memoryStore = new MemoryLeadStore();

export function getLeadStore(): LeadStore {
  const db = getServiceSupabase();
  return db ? new SupabaseLeadStore(db) : memoryStore;
}
