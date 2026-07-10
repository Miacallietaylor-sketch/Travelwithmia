import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdmin } from "@/lib/admin/auth";
import { getServiceSupabase } from "@/lib/supabase/server";

const patchSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["new", "contacted", "quoted", "booked", "lost"]),
});

export async function PATCH(request: Request) {
  if (!isAdmin()) {
    return NextResponse.json({ ok: false, error: "Not authorised." }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 422 });
  }

  const supabase = getServiceSupabase();
  if (!supabase) {
    // Demo mode: acknowledge without persistence.
    return NextResponse.json({ ok: true, persisted: false });
  }

  const { error } = await supabase
    .from("quotes")
    .update({ status: parsed.data.status, updated_at: new Date().toISOString() })
    .eq("id", parsed.data.id);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, persisted: true });
}
