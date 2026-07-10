import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/leads/schema";
import { getLeadStore } from "@/lib/leads/store";
import { getEmailProvider } from "@/lib/email";
import {
  miaNotificationEmail,
  customerConfirmationEmail,
} from "@/lib/email/templates";
import { sanitizeText } from "@/lib/sanitize";
import { rateLimit, clientKey } from "@/lib/security/rateLimit";
import { isSameOrigin, tooLarge } from "@/lib/security/request";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const MAX_BYTES = 24 * 1024;

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Blocked." }, { status: 403 });
  }
  if (tooLarge(request, MAX_BYTES)) {
    return NextResponse.json({ ok: false, error: "Request too large." }, { status: 413 });
  }

  const limit = rateLimit(`lead:${clientKey(request)}`, 5, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check your details.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // Honeypot — a filled "company" field means a bot. Pretend success.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true, reference: "TWM-MAHDI-0000-000000" });
  }

  // Sanitise free-text before persistence/email.
  const { company: _company, ...rest } = parsed.data;
  const lead = {
    ...rest,
    destination: sanitizeText(rest.destination, 160),
    requirements: sanitizeText(rest.requirements, 1200),
    accessibilityRequirements: sanitizeText(rest.accessibilityRequirements, 1200),
    conversationSummary: sanitizeText(rest.conversationSummary, 4000),
    customerName: sanitizeText(rest.customerName, 120),
  };

  let saved;
  try {
    saved = await getLeadStore().create(lead);
  } catch (err) {
    console.error("[mahdi:lead] save failed:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json(
      { ok: false, error: "We couldn't save your enquiry. Please try again or contact Mia directly." },
      { status: 500 }
    );
  }

  // Fire notifications (failures don't block the confirmed reference).
  const email = getEmailProvider();
  const notifyTo = process.env.MIA_LEAD_NOTIFICATION_EMAIL;
  const adminUrl = `${site.url}/admin`;
  try {
    if (notifyTo) {
      const miaMsg = miaNotificationEmail(lead, saved.reference, adminUrl);
      await email.send({ ...miaMsg, to: notifyTo });
    }
    await email.send(customerConfirmationEmail(lead, saved.reference));
  } catch (err) {
    console.error("[mahdi:lead] email failed:", err instanceof Error ? err.message : "unknown");
    // Non-fatal — the lead is saved and the reference is valid.
  }

  return NextResponse.json({
    ok: true,
    reference: saved.reference,
    persisted: saved.persisted,
  });
}
