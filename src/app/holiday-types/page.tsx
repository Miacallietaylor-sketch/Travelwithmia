import type { Metadata } from "next";
import { HolidayTypeCard } from "@/components/HolidayTypeCard";
import { PageHeader } from "@/components/PageHeader";
import { holidayTypes } from "@/data/holidayTypes";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Holiday Types",
  description:
    "Cruises, Disney, luxury, family, city breaks, honeymoons, tailor-made and multi-centre holidays — all planned personally by Mia.",
  path: "/holiday-types",
});

export default function HolidayTypesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Holiday types"
        title="However you like to travel"
        intro="Every style below is planned personally — with full prices upfront and one point of contact throughout."
      />
      <section className="container-page pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {holidayTypes.map((t) => (
            <HolidayTypeCard key={t.slug} type={t} />
          ))}
        </div>
      </section>
    </>
  );
}
