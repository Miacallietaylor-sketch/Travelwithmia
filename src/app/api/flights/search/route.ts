import { NextResponse } from "next/server";
import { z } from "zod";
import { searchFlights } from "@/lib/flights/amadeus";

const schema = z.object({
  origin: z.string().trim().min(3).max(3),
  destination: z.string().trim().min(3).max(3),
  departDate: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  returnDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .or(z.literal("")),
  adults: z.coerce.number().int().min(1).max(9).default(1),
  children: z.coerce.number().int().min(0).max(9).default(0),
  travelClass: z
    .enum(["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"])
    .optional(),
  nonStop: z.boolean().optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid search." },
      { status: 422 }
    );
  }

  const d = parsed.data;
  if (d.returnDate && d.returnDate < d.departDate) {
    return NextResponse.json(
      { ok: false, error: "Return date can't be before departure." },
      { status: 422 }
    );
  }

  const result = await searchFlights({
    origin: d.origin,
    destination: d.destination,
    departDate: d.departDate,
    returnDate: d.returnDate || undefined,
    adults: d.adults,
    children: d.children,
    travelClass: d.travelClass,
    nonStop: d.nonStop,
    currency: "GBP",
    max: 8,
  });

  return NextResponse.json({ ok: true, ...result });
}
