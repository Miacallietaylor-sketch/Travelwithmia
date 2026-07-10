import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms & Booking Conditions",
  description:
    "The terms and booking conditions for arranging travel with Travel With Mia, including financial protection and pricing.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Booking Conditions" updated="10 July 2026">
      <p>
        These terms govern the travel arrangements I make for you as{" "}
        {site.legal.registeredName} (trading as {site.legal.tradingName}).
        Please read them alongside the specific conditions of the tour
        operators and suppliers your booking is made with.
      </p>

      <h2>Financial protection</h2>
      <p>
        When you buy a package that includes a flight, it is protected under the
        ATOL scheme ({site.legal.atolNumber}). Other packages may be protected
        under ABTA ({site.legal.abtaNumber}). You will receive an ATOL
        Certificate where applicable — keep it safe.
      </p>
      <p className="text-sm text-charcoal/70">
        The ATOL and ABTA numbers above are placeholders in this demo and must
        be replaced with genuine registrations before publishing. Never display
        a fabricated financial-protection number.
      </p>

      <h2>Prices</h2>
      <p>
        Prices I quote show the <strong>full price</strong>, including all
        mandatory taxes and fees — no drip pricing. Optional extras are always
        shown separately. Prices are subject to availability and confirmed at the
        time of booking.
      </p>

      <h2>Booking & payment</h2>
      <p>
        A booking is confirmed once your deposit (or full payment) is received
        and I issue a confirmation. All card payments are taken via secure hosted
        payment pages provided by the supplier or a regulated payment provider —
        I never handle or store your card details.
      </p>

      <h2>Changes & cancellations</h2>
      <p>
        Amendments and cancellations are subject to the terms of the relevant
        supplier, which I&apos;ll always explain before you commit. Some fares and
        deposits are non-refundable.
      </p>

      <h2>Your responsibilities</h2>
      <ul>
        <li>Check names match your passport exactly.</li>
        <li>Ensure passports, visas and health requirements are met.</li>
        <li>Arrange suitable travel insurance.</li>
      </ul>

      <h2>Complaints</h2>
      <p>
        If something isn&apos;t right, tell me as soon as possible so I can help.
        Our <Link href="/complaints">Complaints &amp; ADR</Link> page explains the
        process and independent resolution options.
      </p>

      <h2>Law</h2>
      <p>
        These terms are governed by the laws of England and Wales. Nothing here
        affects your statutory rights under the Package Travel and Linked Travel
        Arrangements Regulations 2018 or the Consumer Rights Act 2015.
      </p>
    </LegalPage>
  );
}
