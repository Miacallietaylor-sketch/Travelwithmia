import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { ConciergeNote } from "@/components/ConciergeNote";
import { deals } from "@/data/deals";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Travel Deals",
  description:
    "Handpicked holiday deals with full prices upfront — flights, transfers and taxes included. No drip pricing, no surprises.",
  path: "/deals",
});

export default function DealsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Travel deals"
        title="Handpicked, honestly priced"
        intro="A rotating pick of trips I rate right now. Every price shown is the full price per person including mandatory fees — what you see is what you pay."
      />

      <section className="container-page pb-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((d) => (
            <article key={d.id} className="group card overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={d.image}
                  alt={d.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                />
                <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-wide text-gold-ink">
                  {d.holidayType}
                </span>
              </div>
              <div className="p-5">
                <h2 className="font-display text-xl font-semibold text-ink">
                  {d.title}
                </h2>
                <p className="mt-1 text-sm text-charcoal">
                  {d.destination} · {d.nights} nights · {d.board}
                </p>
                <p className="text-xs text-charcoal/60">Departing {d.departing}</p>
                <div className="mt-3 flex items-baseline gap-2">
                  {d.wasPrice && (
                    <span className="text-sm text-charcoal/50 line-through">
                      {d.wasPrice}
                    </span>
                  )}
                  <span className="font-display text-2xl font-semibold text-gold-ink">
                    {d.price}
                  </span>
                  <span className="text-xs text-charcoal/60">per person</span>
                </div>
                <p className="mt-1 text-xs text-charcoal/70">{d.perksNote}</p>
                <Link
                  href={`/quote?destination=${encodeURIComponent(d.destination)}&type=${d.holidayType
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="btn-ghost mt-4 w-full"
                >
                  Enquire about this
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="max-w-xl">
          <ConciergeNote>
            Don&apos;t see your dates? These are just a taste. Tell me what you
            want and I&apos;ll hunt down something better than any banner ad.
          </ConciergeNote>
        </div>
        <p className="mt-6 max-w-2xl text-xs text-charcoal/60">
          Prices are per person based on the party and dates shown, subject to
          availability, and correct at the time of listing. All mandatory taxes
          and fees are included. Optional extras are shown separately. Full
          booking conditions apply — see our{" "}
          <Link href="/terms" className="text-gold-ink underline">
            Terms &amp; Booking Conditions
          </Link>
          .
        </p>
      </section>
    </>
  );
}
