import type { Metadata } from "next";
import { DestinationFilter } from "@/components/DestinationFilter";
import { HolidayTypeCard } from "@/components/HolidayTypeCard";
import { PageHeader, SectionHeading } from "@/components/PageHeader";
import { ConciergeNote } from "@/components/ConciergeNote";
import { holidayTypes } from "@/data/holidayTypes";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Holiday Search",
  description:
    "Browse destinations and holiday types, then let Mia do the legwork. Filter by region and style, or just ask.",
  path: "/holiday-search",
});

export default function HolidaySearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Holiday search"
        title="Find the shape of your next trip"
        intro="Browse to spark ideas — then hand it over. The real magic happens once I start planning around you."
      />

      <section className="container-page pb-14">
        <DestinationFilter />
      </section>

      <section className="border-t border-sand bg-paper-2/60 py-14">
        <div className="container-page">
          <SectionHeading eyebrow="By style" title="Or start with a holiday type" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {holidayTypes.map((t) => (
              <HolidayTypeCard key={t.slug} type={t} />
            ))}
          </div>
          <div className="mt-10 max-w-xl">
            <ConciergeNote>
              Can&apos;t see exactly what you want? Good — that&apos;s what
              tailor-made is for. Tell me the dream and I&apos;ll build it.
            </ConciergeNote>
          </div>
        </div>
      </section>
    </>
  );
}
