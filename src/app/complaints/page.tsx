import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Complaints & ADR",
  description:
    "How to raise a complaint with Travel With Mia, and the independent Alternative Dispute Resolution options available to you.",
  path: "/complaints",
});

export default function ComplaintsPage() {
  return (
    <LegalPage title="Complaints & ADR" updated="10 July 2026">
      <p>
        I want every trip to go smoothly — but if something falls short, I want
        to put it right. Here&apos;s how to raise a concern and the independent
        options available if we can&apos;t resolve it together.
      </p>

      <h2>While you&apos;re away</h2>
      <p>
        Please tell me (or the supplier&apos;s local representative) straight
        away, so there&apos;s a chance to fix it there and then. Keep any relevant
        paperwork or photos.
      </p>

      <h2>After you&apos;re home</h2>
      <p>
        If it isn&apos;t resolved, put your complaint in writing within 28 days of
        returning. Email {site.contact.email} or write to{" "}
        {site.legal.registeredName}, {site.legal.registeredAddress}. Include your
        booking reference and what you&apos;d like to happen. I&apos;ll acknowledge
        within a few working days and aim to resolve it promptly.
      </p>

      <h2>Alternative Dispute Resolution (ADR)</h2>
      <p>
        If we can&apos;t reach agreement, you may be entitled to use an
        independent ADR scheme. Where your booking is ABTA-protected
        ({site.legal.abtaNumber}), ABTA&apos;s scheme provides low-cost,
        independent resolution — details at abta.com. Other schemes may apply
        depending on your booking; I&apos;ll point you to the right one.
      </p>

      <h2>Financial protection claims</h2>
      <p>
        If a supplier fails, your financial protection (ATOL{" "}
        {site.legal.atolNumber} / ABTA {site.legal.abtaNumber}) explains how to
        claim. I&apos;ll help you through it.
      </p>

      <p className="text-sm text-charcoal/70">
        The ATOL/ABTA numbers and address shown are placeholders in this demo
        and must be replaced with genuine details before publishing.
      </p>
    </LegalPage>
  );
}
