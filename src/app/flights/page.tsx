import { Suspense } from "react";
import type { Metadata } from "next";
import { FlightSearch } from "@/components/FlightSearch";
import { PageHeader } from "@/components/PageHeader";
import { ConciergeNote } from "@/components/ConciergeNote";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Flight Search",
  description:
    "Explore flights and guide prices from UK airports to Europe and beyond, then let Mia turn the best option into a fully-protected holiday.",
  path: "/flights",
});

export default function FlightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Flight search"
        title="Find the flight — I'll build the holiday around it"
        intro="Explore routes and guide prices from UK airports across Europe and beyond. Spot one you like and send it to me — I'll check live availability, find the best price, and turn it into a fully-protected, joined-up trip."
      />
      <section className="container-page pb-8">
        <Suspense fallback={<div className="text-charcoal">Loading…</div>}>
          <FlightSearch />
        </Suspense>
      </section>
      <section className="container-page pb-16">
        <div className="max-w-xl">
          <ConciergeNote>
            Flights are just the start. I&apos;ll match hotels, transfers and the
            little extras — and make sure it&apos;s all financially protected.
          </ConciergeNote>
        </div>
      </section>
    </>
  );
}
