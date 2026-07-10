import { Suspense } from "react";
import type { Metadata } from "next";
import { FlightSearch } from "@/components/FlightSearch";
import { PageHeader } from "@/components/PageHeader";
import { ConciergeNote } from "@/components/ConciergeNote";
import { PersonaStrip } from "@/components/PersonaCard";
import { getPersona } from "@/data/team";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Flight Search",
  description:
    "Search live flight fares from UK airports, then let Mia turn the best option into a fully-protected holiday.",
  path: "/flights",
});

export default function FlightsPage() {
  const ivy = getPersona("ivy");
  return (
    <>
      <PageHeader
        eyebrow="Flight search"
        title="Find the flight — I'll build the holiday around it"
        intro="Search real fares from UK airports. When you spot one you like, send it to me and I'll turn it into a fully-protected, joined-up trip."
      />
      <section className="container-page pb-8">
        {ivy && (
          <div className="mb-6 max-w-xl">
            <PersonaStrip persona={ivy} />
          </div>
        )}
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
