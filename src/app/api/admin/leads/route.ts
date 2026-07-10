import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdmin } from "@/lib/admin/auth";
import { getLeadStore } from "@/lib/leads/store";
import { LEAD_STATUSES } from "@/lib/leads/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdmin()) {
    return NextResponse.json({ ok: false, error: "Not authorised." }, { status: 401 });
  }
  const leads = await getLeadStore().list();
  return NextResponse.json({ ok: true, leads });
}

const patchSchema = z.object({
  id: z.string().min(1),
  status: z.enum(LEAD_STATUSES).optional(),
  internalNotes: z.string().max(4000).optional(),
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
  const store = getLeadStore();
  if (parsed.data.status) await store.updateStatus(parsed.data.id, parsed.data.status);
  if (parsed.data.internalNotes !== undefined)
    await store.updateNotes(parsed.data.id, parsed.data.internalNotes);
  return NextResponse.json({ ok: true });
}

const delSchema = z.object({ id: z.string().min(1) });

export async function DELETE(request: Request) {
  if (!isAdmin()) {
    return NextResponse.json({ ok: false, error: "Not authorised." }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }
  const parsed = delSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 422 });
  }
  await getLeadStore().anonymise(parsed.data.id);
  return NextResponse.json({ ok: true });
}
