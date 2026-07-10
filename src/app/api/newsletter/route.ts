import { NextResponse } from "next/server";
import { z } from "zod";
import { getServiceSupabase } from "@/lib/supabase/server";
import { isSupabaseServerConfigured } from "@/lib/env";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please tick the box to subscribe." }),
  }),
  source: z.string().optional().default("website"),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 422 }
    );
  }

  const record = {
    email: parsed.data.email,
    consent_at: new Date().toISOString(),
    source: parsed.data.source,
  };

  const supabase = getServiceSupabase();
  if (!supabase || !isSupabaseServerConfigured) {
    console.info("[newsletter] Not configured — subscriber not persisted.");
    return NextResponse.json({ ok: true, persisted: false });
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .upsert(record, { onConflict: "email" });

  if (error) {
    console.error("[newsletter] insert failed:", error.message);
    return NextResponse.json(
      { ok: false, error: "Couldn't subscribe right now. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, persisted: true });
}
