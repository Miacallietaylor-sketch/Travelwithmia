import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdmin } from "@/lib/admin/auth";
import { getServiceSupabase } from "@/lib/supabase/server";

const patchSchema = z.object({
  id: z.string().min(1),
  verified: z.boolean(),
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
    return NextResponse.json({ ok: true, persisted: false });
  }

  const { error } = await supabase
    .from("reviews")
    .update({ verified: parsed.data.verified })
    .eq("id", parsed.data.id);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, persisted: true });
}
