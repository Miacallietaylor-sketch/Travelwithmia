import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/quoteSchema";
import { getServiceSupabase } from "@/lib/supabase/server";
import { isSupabaseServerConfigured } from "@/lib/env";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = quoteSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const now = new Date().toISOString();

  const record = {
    holiday_type: data.holidayType,
    destination: data.destination,
    depart_date: data.departDate || null,
    return_date: data.returnDate || null,
    flexible_dates: data.flexibleDates ?? false,
    adults: data.adults,
    children: data.children,
    budget: data.budget,
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    notes: data.notes || null,
    status: "new" as const,
    is_guest: true,
    consent_privacy_at: now,
    consent_marketing_email: data.marketingEmail ?? false,
    consent_marketing_sms: data.marketingSms ?? false,
    consent_marketing_call: data.marketingCall ?? false,
    source: data.source || "website",
    utm_source: data.utmSource || null,
    utm_medium: data.utmMedium || null,
    utm_campaign: data.utmCampaign || null,
  };

  const supabase = getServiceSupabase();

  if (!supabase || !isSupabaseServerConfigured) {
    // Graceful fallback: log to the server so local dev works without keys.
    console.info(
      "[quote] Supabase not configured — enquiry received but not persisted:",
      { ...record, email: "[redacted]" }
    );
    return NextResponse.json({
      ok: true,
      persisted: false,
      message:
        "Thanks — your enquiry was received. (Demo mode: not saved to a database.)",
    });
  }

  const { error } = await supabase.from("quotes").insert(record);

  if (error) {
    console.error("[quote] Failed to insert:", error.message);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Something went wrong saving your enquiry. Please try again or email me directly.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, persisted: true });
}
