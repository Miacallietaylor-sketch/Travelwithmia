import { escapeHtml } from "@/lib/sanitize";
import { site } from "@/lib/site";
import type { NewLead } from "@/lib/leads/store";
import type { EmailMessage } from "./types";

const privacyUrl =
  process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL || "/privacy";

function detailRows(lead: NewLead): [string, string][] {
  const rows: [string, string][] = [
    ["Enquiry type", lead.enquiryType],
    ["Destination", lead.destination || "Open to ideas"],
    ["Departure", lead.departureAirport],
    ["Dates", lead.departureDate],
    ["Flexibility", lead.dateFlexibility],
    ["Nights", lead.nights],
    ["Travellers", `${lead.adults} adult(s), ${lead.children} child(ren)`],
    ["Children's ages", lead.childrenAges],
    ["Budget", lead.budget],
    ["Board basis", lead.boardBasis],
    ["Holiday style", lead.holidayStyle],
    ["Hotel preference", lead.hotelPreference],
    ["Must-haves", lead.requirements],
    ["Accessibility", lead.accessibilityRequirements],
    ["Best time to contact", lead.bestContactTime],
  ];
  return rows.filter(([, v]) => v && String(v).trim());
}

function table(rows: [string, string][]): string {
  return rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#7E6230;font-weight:600;vertical-align:top">${escapeHtml(
          k
        )}</td><td style="padding:6px 0;color:#14130F">${escapeHtml(v)}</td></tr>`
    )
    .join("");
}

const shell = (inner: string) => `<!doctype html><html><body style="margin:0;background:#FBF8F3;font-family:Arial,Helvetica,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:24px">${inner}
<hr style="border:0;border-top:1px solid #D8CBAE;margin:24px 0"/>
<p style="font-size:12px;color:#7E6230">${escapeHtml(site.legal.tradingName)} · ${escapeHtml(
  site.legal.registeredName
)} · ${escapeHtml(site.legal.companyNumber)}</p>
</div></body></html>`;

/** Notification to Mia when a new enquiry arrives. */
export function miaNotificationEmail(
  lead: NewLead,
  reference: string,
  adminUrl?: string
): EmailMessage {
  const rows = detailRows(lead);
  const consent = `Enquiry consent: yes${
    lead.marketingConsent ? " · Marketing: opted in" : " · Marketing: no"
  }`;
  const html = shell(`
    <p style="font-family:Georgia,serif;font-size:22px;color:#14130F;margin:0 0 4px">New holiday enquiry via MAHDI</p>
    <p style="color:#3A362E;margin:0 0 16px">Reference <strong>${escapeHtml(reference)}</strong> · ${escapeHtml(
      new Date().toLocaleString("en-GB")
    )}</p>
    <p style="margin:0 0 4px"><strong>${escapeHtml(lead.customerName)}</strong></p>
    <p style="margin:0 0 2px">Email: ${escapeHtml(lead.email)}</p>
    <p style="margin:0 0 2px">Phone: ${escapeHtml(lead.phone || "—")}</p>
    <p style="margin:0 0 16px">Preferred contact: ${escapeHtml(lead.preferredContactMethod)}</p>
    <table style="border-collapse:collapse;width:100%">${table(rows)}</table>
    ${
      lead.conversationSummary
        ? `<p style="margin:16px 0 4px;color:#7E6230;font-weight:600">Conversation summary</p><p style="color:#14130F">${escapeHtml(
            lead.conversationSummary
          )}</p>`
        : ""
    }
    <p style="margin:16px 0 0;font-size:13px;color:#3A362E">${escapeHtml(consent)}</p>
    ${adminUrl ? `<p style="margin:16px 0 0"><a href="${escapeHtml(adminUrl)}" style="color:#B08D57">Open in admin →</a></p>` : ""}
  `);
  const text = `New MAHDI enquiry ${reference}
${lead.customerName} · ${lead.email} · ${lead.phone || "no phone"}
Preferred contact: ${lead.preferredContactMethod}
${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}
${lead.conversationSummary ? `\nSummary: ${lead.conversationSummary}` : ""}
${consent}`;
  return {
    to: "", // set by caller
    subject: `New MAHDI holiday enquiry — ${lead.destination || lead.enquiryType}`,
    html,
    text,
    replyTo: lead.email,
  };
}

/** Confirmation to the customer. Makes clear no booking has been made. */
export function customerConfirmationEmail(
  lead: NewLead,
  reference: string
): EmailMessage {
  const rows = detailRows(lead).slice(0, 8);
  const html = shell(`
    <p style="font-family:Georgia,serif;font-size:22px;color:#14130F;margin:0 0 8px">We've received your enquiry</p>
    <p style="color:#3A362E">Hi ${escapeHtml(lead.customerName.split(" ")[0] || "there")}, thank you — your enquiry is with Mia now.</p>
    <p style="color:#3A362E">Your reference is <strong>${escapeHtml(reference)}</strong>. Mia will personally review your requirements and get back to you using your preferred contact method.</p>
    <p style="background:#F3ECDF;border-radius:8px;padding:12px;color:#7E6230"><strong>Please note:</strong> no booking has been made yet. Prices, availability, travel requirements and financial protection are confirmed by Mia before any booking.</p>
    <p style="margin:16px 0 4px;color:#7E6230;font-weight:600">Your enquiry</p>
    <table style="border-collapse:collapse;width:100%">${table(rows)}</table>
    <p style="margin:16px 0 2px;color:#3A362E">Questions in the meantime? Reply to this email or contact ${escapeHtml(
      site.legal.tradingName
    )}.</p>
    <p style="margin:8px 0 0;font-size:12px"><a href="${escapeHtml(
      privacyUrl
    )}" style="color:#B08D57">Privacy Policy</a></p>
  `);
  const text = `We've received your Travel With Mia enquiry (ref ${reference}).
Mia will personally review your requirements and contact you.
Please note: no booking has been made yet. Prices, availability and travel requirements are verified by Mia before booking.
${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}
Privacy: ${privacyUrl}`;
  return {
    to: lead.email,
    subject: "We've received your Travel With Mia enquiry",
    html,
    text,
  };
}
