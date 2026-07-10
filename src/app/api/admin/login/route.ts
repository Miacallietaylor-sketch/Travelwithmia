import { NextResponse } from "next/server";
import { checkAccessCode, createAdminSession } from "@/lib/admin/auth";

export async function POST(request: Request) {
  let body: { code?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }
  if (!body.code || !checkAccessCode(body.code)) {
    return NextResponse.json(
      { ok: false, error: "That access code isn't right." },
      { status: 401 }
    );
  }
  createAdminSession();
  return NextResponse.json({ ok: true });
}
